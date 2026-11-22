/* 京都冬旅 2027 — keeps the site usable offline.
   Pages, scripts and styles: network first, cached copy when offline or slow.
   Photos and fonts: cached after the first view, so anything already seen opens without a connection. */
const VER = 'kyoto-2027-2f1d1826a8';
const CORE = [
  './', 'index.html', 'manifest.webmanifest',
  'assets/css/style.css', 'assets/js/data.js', 'assets/js/app.js',
  'assets/fonts/chiron-sung-sub.woff2', 'assets/fonts/newsreader-sub.woff2',
  'assets/fonts/newsreader-italic-sub.woff2', 'assets/fonts/mashanzheng-kyoto.woff2',
  'assets/icons/icon-192.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('kyoto-2027-') && k !== VER).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

const put = (req, res) => { if (res && res.ok) { const copy = res.clone(); caches.open(VER).then(c => c.put(req, copy)); } return res; };
const within = (p, ms) => new Promise((ok, no) => { const t = setTimeout(no, ms); p.then(v => { clearTimeout(t); ok(v); }, e => { clearTimeout(t); no(e); }); });

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const root = new URL('./', self.registration.scope).pathname;
  const fresh = req.mode === 'navigate' || /\.(html|js|css|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  if (fresh) {
    const net = fetch(req).then(res => put(req, res));
    e.respondWith(within(net, 4000).catch(() => caches.match(req, { ignoreSearch: true })
      .then(hit => hit || (url.pathname === root || url.pathname === root + 'index.html' ? caches.match('./') : undefined))
      .then(hit => hit || net)));
  } else {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => put(req, res))));
  }
});
