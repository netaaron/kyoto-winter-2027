/* 京都冬旅 2027 — renders every section from window.TRIP and keeps one viewer's progress in localStorage. */
{
const T = window.TRIP, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const P = T.places, DAYC = ['', 'var(--d1)', 'var(--d2)', 'var(--d3)'];
const KEY = 'kyoto-winter-2027-v3';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ntd = n => 'NT$' + Math.round(n).toLocaleString('en-US');
const yen = n => '¥' + Math.round(n).toLocaleString('en-US');
const STAT = { v: ['v', '已查證'], e: ['e', '估算'], c: ['c', '出發前確認'] };
const tag = s => s && STAT[s] ? `<span class="tag ${STAT[s][0]}">${STAT[s][1]}</span>` : '';
const gmap = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
const gdir = (o, d, m = 'transit') => 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(o) + '&destination=' + encodeURIComponent(d) + '&travelmode=' + m;
const PHT = T.photos, PV = T.photoVer || {}, psrc = (n, w) => `assets/photos/${n}-${w}.webp${PV[n] ? '?v=' + PV[n] : ''}`;
const pic = (n, alt, sizes = '100vw', eager) => { const s = PHT[n]; if (!s) return ''; const big = s[s.length - 1];
  return `<img src="${psrc(n, s[0][0])}" srcset="${s.map(([w]) => `${psrc(n, w)} ${w}w`).join(', ')}" sizes="${sizes}" width="${big[0]}" height="${big[1]}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async">`; };
const ptitle = n => { const g = T.gallery.find(x => x.photo === n); return g ? g.t : ''; };

/* ---------- icons ---------- */
const IC = {
  plane: 'M21 15.5 13.5 12V5.5a1.5 1.5 0 0 0-3 0V12L3 15.5V17l7.5-2v4L8 20.5V22l4-1 4 1v-1.5L13.5 19v-4L21 17z',
  train: 'M7 3h10a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM4 11h16M8 21l2-3M16 21l-2-3M8 14.5h.01M16 14.5h.01',
  bus: 'M6 3h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM4 11h16M7 19v2M17 19v2M7.5 15h.01M16.5 15h.01',
  walk: 'M13 4.5a1.5 1.5 0 1 0 0-.01M10 21l2-6 3 3v3M9 13l1-5 4 1 2 3 2 1M10 8l-3 2v3',
  taxi: 'M5 16v-5l2-5h10l2 5v5M3 16h18v3H3zM7 19v2M17 19v2M7 13h.01M17 13h.01M9 4h6',
  bag: 'M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2',
  food: 'M3 11h18a9 9 0 0 1-18 0zM8 20h8M14 3l-4 6M19 3l-5 6',
  temple: 'M3 9h18M5 9l2-4h10l2 4M6 9v11M18 9v11M4 20h16M10 20v-6h4v6',
  torii: 'M3 5c6 1.5 12 1.5 18 0M5 9h14M7 6v15M17 6v15M12 6v3',
  tea: 'M4 10h14v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6zM18 11h1.5a2 2 0 0 1 0 4H18M8 3c0 2 2 2 2 4M12 3c0 2 2 2 2 4',
  kimono: 'M8 3l4 4 4-4 5 4-3 3-2-1v12H8V9l-2 1-3-3zM8 13h8',
  calendar: 'M4 6h16v15H4zM4 10h16M9 3v5M15 3v5',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a6 6 0 0 1 12 0M16 11a3 3 0 1 0-1-5.8M21 20a6 6 0 0 0-4-5.7',
  bed: 'M3 19V6M3 14h18v5M21 14v-3a3 3 0 0 0-3-3h-7v6M7 11.5a1.5 1.5 0 1 0 0-.01',
  coin: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9 7.5l3 4 3-4M12 11.5v5M9.5 12.5h5M9.5 15h5',
  pin: 'M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  nav: 'M3 11l18-8-8 18-2-8z',
  check: 'M5 12.5l4.5 4.5L19 7',
  chev: 'M6 9l6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14',
  arrow: 'M4 12h16M14 6l6 6-6 6',
  copy: 'M8 8h12v12H8zM4 16V4h12',
  ext: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
  share: 'M12 15V3M7 8l5-5 5 5M5 12v8h14v-8',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  talk: 'M4 5h16v11H9l-5 4z'
};
const ic = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[n] || ''}"/></svg>`;

/* ---------- state ---------- */
let S = { done: {}, check: {}, plan: {}, extra: [], removed: [], exp: [], rate: T.budget.rate, names: ['旅伴 A', '旅伴 B'], day: 1, mapDay: 0, mapSel: 'hotel', cur: 'JPY' };
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };

/* ---------- dates ---------- */
const today = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const daysUntil = () => Math.round((parse(T.start) - today()) / 864e5);
const tripDay = () => { const i = T.days.findIndex(d => parse(d.date).getTime() === today().getTime()); return i < 0 ? 0 : i + 1; };

/* ---------- overview ---------- */
function renderOverview() {
  const h = T.hotel, dd = daysUntil();
  const facts = [
    ['calendar', '日期', '1月28日至30日', '三天兩夜，週四到週六'],
    ['plane', '航線', `${T.flight.fromName} ⇄ ${T.flight.toName}`, `${T.flight.from}, ${T.flight.to}, Kyoto`],
    ['people', '旅伴', T.travelers.label, T.travelers.en],
    ['bed', '住宿', h.name, `${h.en}, ${h.area}`],
    ['coin', '預算', `每人 ${ntd(T.budget.target)}`, 'All in, per person']
  ];
  $('#overviewBox').innerHTML = `<dl class="facts">${facts.map(([i, k, v, e]) => `<div class="fact">${ic(i)}<dt>${k}</dt><dd>${esc(v)}<small>${esc(e)}</small></dd></div>`).join('')}</dl>
    <p class="count">${dd > 0 ? `距離出發還有 <b>${dd}</b> 天` : dd === 0 ? '<b>今天出發</b>，一路順風' : tripDay() ? `旅行第 <b>${tripDay()}</b> 天，打開旅途模式看下一站` : '旅程已結束，記帳紀錄仍保留在這支手機'}</p>`;
}

/* ---------- itinerary ---------- */
function dayProgress(d) { const n = d.items.length, k = d.items.filter(i => S.done[i.id]).length; return [k, n]; }
function evHTML(it, d, compact) {
  const done = !!S.done[it.id], pl = P[it.place] || {};
  const from = it.from && P[it.from] ? P[it.from].q : T.hotel.en;
  const rows = it.detail.map(r => `<div class="drow"><dt>${esc(r.k)}</dt><dd>${esc(r.t)} ${tag(r.s)}</dd></div>`).join('');
  return `<li class="ev${done ? ' done' : ''}${it.suggested ? ' sug' : ''}" data-id="${it.id}">
    <div class="evrow">
      <button class="chk" type="button" aria-pressed="${done}" aria-label="${done ? '取消完成' : '標記完成'}：${esc(it.title)}"><span><svg viewBox="0 0 24 24"><path d="${IC.check}"/></svg></span></button>
      <time><b>${it.start}</b><small>–${it.end}</small></time>
      <div><p class="evt">${esc(it.title)}</p><p class="eve">${esc(it.en)}</p></div>
      <button class="exp" type="button" aria-expanded="false" aria-controls="det-${compact ? 't' : ''}${it.id}" aria-label="展開細節">${ic('chev')}</button>
    </div>
    <div class="det" id="det-${compact ? 't' : ''}${it.id}"><div><div class="detin"><dl style="margin:0">${rows}</dl>
      <div class="dbtn"><a class="link" href="${gmap(pl.q || it.title)}" target="_blank" rel="noopener">${ic('pin')}Google 地圖</a>
      ${it.from ? `<a class="link" href="${gdir(from, pl.q)}" target="_blank" rel="noopener">${ic('nav')}路線導航</a>` : ''}</div></div></div></div>
  </li>`;
}
function renderItinerary() {
  const box = $('#itBox'), d = T.days[S.day - 1];
  const [k, n] = dayProgress(d);
  box.innerHTML = `<div class="tabs" role="tablist" aria-label="選擇日期">${T.days.map(x => {
      const [a, b] = dayProgress(x);
      return `<button class="tab" role="tab" id="tab${x.n}" aria-controls="dayp" aria-selected="${x.n === S.day}" tabindex="${x.n === S.day ? 0 : -1}" data-day="${x.n}" style="--c:${DAYC[x.n]}"><b>第${'一二三'[x.n - 1]}日</b><span class="l">${x.label}</span><span class="s">${x.label.replace(' 星期', '（').replace(/(.)$/, '$1）')}</span><i>完成 ${a}/${b}</i></button>`; }).join('')}</div>
    <div class="dayp" id="dayp" role="tabpanel" aria-labelledby="tab${d.n}" style="--c:${DAYC[d.n]}">
      <figure class="dayfig" style="margin:0"><div class="ph main">${pic(d.photo, ptitle(d.photo), '(max-width:820px) 92vw, 42vw')}<span class="cart${d.n === 1 ? ' r' : ''}">第${'一二三'[d.n - 1]}日</span></div>
        <div class="strip">${d.strip.map(n => `<div class="ph">${pic(n, ptitle(n), '20vw')}<span class="cap">${esc(ptitle(n))}</span></div>`).join('')}</div></figure>
      <div>
        <div class="dayhead"><h3>${esc(d.title)}</h3><p class="en">${esc(d.enTitle)}</p><p class="dt">${d.label}　${d.en}</p></div>
        <div class="prog"><span>完成 ${k} / ${n}</span><div class="bar" style="--p:${n ? k / n * 100 : 0}%"><i></i></div></div>
        <div class="legendtags"><span class="tag v">已查證</span><span class="tag e">估算</span><span class="tag c">出發前確認</span><span>資料查核：${T.verifiedOn}</span></div>
        <ol class="tl">${d.items.map(it => evHTML(it, d)).join('')}</ol>
      </div>
    </div>`;
}
function toggleDone(id) {
  S.done[id] = !S.done[id]; if (!S.done[id]) delete S.done[id]; save();
  $$(`.ev[data-id="${id}"]`).forEach(li => {
    li.classList.toggle('done', !!S.done[id]);
    const b = $('.chk', li); b.setAttribute('aria-pressed', !!S.done[id]);
  });
  const d = T.days.find(x => x.items.some(i => i.id === id)), [k, n] = dayProgress(d);
  const tabI = $(`#tab${d.n} i`); if (tabI) tabI.textContent = `完成 ${k}/${n}`;
  if (d.n === S.day) { const p = $('#dayp .prog'); if (p) { p.firstElementChild.textContent = `完成 ${k} / ${n}`; p.querySelector('.bar').style.setProperty('--p', (k / n * 100) + '%'); } }
  if (!$('#travel').hidden) renderTravel();
}
document.addEventListener('click', e => {
  const c = e.target.closest('.chk'); if (c) { toggleDone(c.closest('.ev').dataset.id); return; }
  const x = e.target.closest('.exp'); if (x) { const open = x.getAttribute('aria-expanded') !== 'true'; x.setAttribute('aria-expanded', open); $('#' + x.getAttribute('aria-controls')).classList.toggle('open', open); return; }
  const t = e.target.closest('.tab'); if (t) { S.day = +t.dataset.day; save(); renderItinerary(); $('#tab' + S.day).focus(); }
});
document.addEventListener('keydown', e => {
  const t = e.target.closest && e.target.closest('.tab'); if (!t) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { S.day = e.key === 'ArrowRight' ? S.day % 3 + 1 : (S.day + 1) % 3 + 1; save(); renderItinerary(); $('#tab' + S.day).focus(); e.preventDefault(); }
});

/* ---------- map ---------- */
function mapStops(day) {
  if (!day) return [...new Set(T.days.flatMap(d => d.route))];
  return T.days[day - 1].route.filter((v, i, a) => a.indexOf(v) === i);
}
function placeDays(id) { return T.days.filter(d => d.route.includes(id) || d.items.some(i => i.place === id || (P[i.place] && P[i.place].same === id))).map(d => d.n); }
function renderMap() {
  const box = $('#mapBox'), m = T.maps.find(x => x.day === S.mapDay) || T.maps[0];
  box.innerHTML = `<div class="chips" role="group" aria-label="篩選日期">
      <button class="chip" type="button" data-md="0" aria-pressed="${S.mapDay === 0}">全部路線</button>
      ${T.days.map(d => `<button class="chip" type="button" data-md="${d.n}" style="--c:${DAYC[d.n]}" aria-pressed="${S.mapDay === d.n}"><i></i>第${'一二三'[d.n - 1]}日</button>`).join('')}
    </div>
    <div class="mapw"><div><button class="mapbox" type="button" data-map="${m.day}" aria-label="放大地圖：${esc(m.t)}">${pic(m.photo, m.t, '(max-width:860px) 92vw, 54vw', true)}<span class="zoom">${ic('plus')}放大</span></button>
      <p class="mapnote">手繪風格的示意地圖，路線順序以圓圈編號為準；實際走法請用右邊的 Google 地圖導航。關西機場在地圖外，西南方約 50 公里。</p></div>
      <div><div class="mpanel" id="mpanel" aria-live="polite"></div><ul class="mlist" id="mlist"></ul></div></div>`;
  renderMapPanel();
}
$('#mapBox').addEventListener('click', e => {
  const ch = e.target.closest('.chip'); if (ch) { S.mapDay = +ch.dataset.md; const st = mapStops(S.mapDay); if (!st.includes(S.mapSel)) S.mapSel = st[0]; save(); renderMap(); return; }
  const z = e.target.closest('[data-map]'); if (z) { openLB('map', T.maps.findIndex(x => x.day === +z.dataset.map), z); return; }
  const m = e.target.closest('[data-sel]'); if (m) { S.mapSel = m.dataset.sel; save(); renderMapPanel(); }
});
function renderMapPanel() {
  const id = S.mapSel, p = P[id], a = T.attractions.find(x => x.place === id), days = placeDays(id);
  const items = T.days.flatMap(d => d.items.filter(i => i.place === id || (P[i.place] && P[i.place].same === id)).map(i => ({ d, i })));
  const desc = id === 'hotel' ? T.hotel.highlights.join('；') + '。' : a ? a.desc : (p.en === 'Ninenzaka' ? '從清水寺往北下坡的石板路，接著走到八坂塔與祇園。' : p.en === 'Pontocho' ? '鴨川西岸的窄巷，第二天晚餐的地方，離飯店步行約 5 分鐘。' : '');
  $('#mpanel').innerHTML = (p.photo ? `<div class="ph">${pic(p.photo, ptitle(p.photo) || p.name, '(max-width:860px) 92vw, 38vw')}</div>` : '') + `<div class="mpin"><h3>${p.name}</h3><p class="en">${p.en}</p>
    <div class="dchips" style="margin-top:8px">${days.map(n => `<span class="dchip" style="--c:${DAYC[n]}">第${'一二三'[n - 1]}日</span>`).join('')}</div>
    ${desc ? `<p>${esc(desc)}</p>` : ''}
    ${items.length ? `<div class="when">${items.map(({ d, i }) => `<div><b style="--c:${DAYC[d.n]};color:${DAYC[d.n]}">${d.label.slice(0, 5)} ${i.start}</b>　${esc(i.title)}</div>`).join('')}</div>` : ''}
    <div class="btns"><a class="btn sm solid" href="${gmap(p.q)}" target="_blank" rel="noopener">${ic('pin')}Google 地圖</a>
    ${id !== 'hotel' ? `<a class="btn sm" href="${gdir(T.hotel.en, p.q)}" target="_blank" rel="noopener">${ic('nav')}從飯店出發</a>` : ''}
    ${a ? `<a class="btn sm" href="#place-${id}">景點介紹</a>` : ''}</div></div>`;
  const stops = mapStops(S.mapDay);
  const off = stops[0] === 'hotel' ? 1 : 0;
  $('#mlist').innerHTML = stops.map((sid, i) => `<li><button type="button" data-sel="${sid}" aria-current="${sid === id}" style="--c:${S.mapDay ? (sid === 'hotel' && off ? 'var(--shu)' : DAYC[S.mapDay]) : (sid === 'hotel' ? 'var(--shu)' : DAYC[placeDays(sid)[0] || 1])}"><span class="n">${S.mapDay ? (sid === 'hotel' && off ? '宿' : i + 1 - off) : (sid === 'hotel' ? '宿' : '')}</span><b>${P[sid].name}</b><small>${P[sid].en}</small></button></li>`).join('');
}

/* ---------- places ---------- */
function renderPlaces() {
  $('#placesBox').innerHTML = `<div class="pgrid">${T.attractions.map(a => { const p = P[a.place]; return `<article class="pcard${a.span ? ' w2' : ''}" id="place-${a.place}">
    <div class="ph">${pic(a.photo, ptitle(a.photo) || p.name, a.span ? '(max-width:980px) 92vw, 62vw' : '(max-width:560px) 92vw, (max-width:980px) 46vw, 30vw')}</div>
    <div class="dchips">${a.days.map(n => `<span class="dchip" style="--c:${DAYC[n]}">第${'一二三'[n - 1]}日</span>`).join('')}</div>
    <h3>${p.name}<i>${p.en}</i></h3><p>${esc(a.desc)}</p>
    <dl class="pmeta"><dt>停留</dt><dd>${esc(a.stay)}</dd><dt>推薦時段</dt><dd>${esc(a.best)}</dd></dl>
    <a class="link" href="${gmap(p.q)}" target="_blank" rel="noopener">${ic('pin')}Google 地圖</a></article>`; }).join('')}</div>`;
}

/* ---------- food ---------- */
function renderFood() {
  $('#foodBox').innerHTML = `<div class="fgrid">${T.food.map(f => `<article class="fcard"><div class="ph">${pic(f.photo, f.name, '(max-width:820px) 132px, 30vw')}</div>
    <div><h3>${esc(f.name)}<i>${esc(f.en)}</i></h3><p>${esc(f.t)} ${tag(f.s)}</p><div class="dchips">${f.days.map(n => `<span class="dchip" style="--c:${DAYC[n]}">第${'一二三'[n - 1]}日</span>`).join('')}</div></div></article>`).join('')}</div>`;
}

/* ---------- stay ---------- */
function renderStay() {
  const h = T.hotel;
  $('#stayBox').innerHTML = `<div class="stay"><figure class="ph">${pic(h.photo, '京都風格的飯店雙床房，情境示意', '(max-width:820px) 92vw, 42vw')}<span class="ai">情境示意，非飯店實景</span></figure>
    <div><div class="sh"><h2 id="h-stay">住宿</h2><span>Stay in Kyoto</span></div>
      <p class="hname">${h.name}<i>${h.en}</i></p><p class="addr">${h.address}<br>${h.addressJa}　電話 ${h.tel}</p>
      <ul class="hl">${h.highlights.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <dl class="kv">${h.facts.map(f => `<dt>${f.k}</dt><dd>${esc(f.t)} ${tag(f.s)}</dd>`).join('')}</dl>
      <div class="btns"><a class="btn solid" href="${h.link}" target="_blank" rel="noopener">${ic('ext')}查看飯店</a>
        <a class="btn" href="${gmap(h.en)}" target="_blank" rel="noopener">${ic('pin')}Google 地圖</a>
        <a class="btn" href="#map" data-near="1">${ic('nav')}附近景點</a></div></div></div>`;
  $('#stayBox [data-near]').addEventListener('click', () => { S.mapDay = 0; S.mapSel = 'hotel'; save(); renderMap(); });
}

/* ---------- budget ---------- */
const cats = () => T.budget.categories.filter(c => !S.removed.includes(c.id)).map(c => ({ ...c, amount: S.plan[c.id] ?? c.amount })).concat(S.extra);
const toNTD = e => e.cur === 'JPY' ? e.amt * S.rate : e.amt;
function spend() {
  const per = [0, 0], byCat = {}; let total = 0;
  let net = 0;
  S.exp.forEach(e => { const v = toNTD(e); total += v; byCat[e.cat] = (byCat[e.cat] || 0) + v;
    if (e.who === 2) { per[0] += v / 2; per[1] += v / 2; if (e.pay === 0 || e.pay === 1) net += e.pay === 0 ? v / 2 : -v / 2; } else per[e.who] += v; });
  return { per, byCat, total, net };
}
/* net > 0: B owes A; net < 0: A owes B. Only shared items with a named payer count. */
const settleText = sp => Math.abs(sp.net) < 1 ? '目前兩人互不相欠' : `${S.names[sp.net > 0 ? 1 : 0]} 應給 ${S.names[sp.net > 0 ? 0 : 1]} ${ntd(Math.abs(sp.net))}`;
const whoOpts = () => { const d = 's' + (S.lastPay || 0);
  return [['s0', `兩人平分・${S.names[0]} 付`], ['s1', `兩人平分・${S.names[1]} 付`], ['o0', `只算 ${S.names[0]}`], ['o1', `只算 ${S.names[1]}`]]
    .map(([v, t]) => `<option value="${v}"${v === d ? ' selected' : ''}>${esc(t)}</option>`).join(''); };
const parseWho = v => v[0] === 's' ? { who: 2, pay: +v[1] } : { who: +v[1], pay: +v[1] };
const whoLabel = e => e.who === 2 ? (e.pay === 0 || e.pay === 1 ? `兩人平分・${S.names[e.pay]} 付` : '兩人平分') : S.names[e.who];
const ledgerText = () => { const sp = spend(); return `京都冬旅 2027 記帳結算\n兩人合計 ${ntd(sp.total)}（共 ${S.exp.length} 筆）\n${S.names[0]} 已花 ${ntd(sp.per[0])}｜${S.names[1]} 已花 ${ntd(sp.per[1])}\n結算：${settleText(sp)}`; };
const copyText = (txt, h, ok) => { const fail = () => { h.className = 'hint err'; h.textContent = '無法自動複製，請改用分享或截圖。'; };
  try { navigator.clipboard.writeText(txt).then(() => { h.className = 'hint'; h.textContent = ok; }, fail); } catch (err) { fail(); } };
const b64u = str => { let bin = ''; new TextEncoder().encode(str).forEach(b => { bin += String.fromCharCode(b); }); return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = str => new TextDecoder().decode(Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)));
const syncURL = () => location.origin + location.pathname + '#sync=' + b64u(JSON.stringify({ v: 1, n: S.names, e: S.exp.map(e => [e.id, e.name, e.amt, e.cur, e.cat, e.who, e.day, e.ts, e.pay ?? -1]) }));
function renderBudget() {
  const box = $('#budgetBox'), cs = cats(), planned = cs.reduce((a, c) => a + (+c.amount || 0), 0), tgt = T.budget.target, diff = tgt - planned;
  const C = 2 * Math.PI * 70; let off = 0;
  const arcs = cs.map(c => { const len = planned ? (c.amount / planned) * C : 0; const s = `<circle cx="90" cy="90" r="70" fill="none" stroke="${c.color}" stroke-width="22" stroke-dasharray="${Math.max(0, len - 1.5).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}"/>`; off += len; return s; }).join('');
  const sp = spend(), opts = cs.map(c => `<option value="${c.id}"${c.id === 'food' ? ' selected' : ''}>${esc(c.name)}</option>`).join('') + '<option value="other">其他</option>';
  box.innerHTML = `<div class="bgrid">
    <div><p class="bsub">每人預算<i>Planned, per person</i></p>
      <div class="donut"><div class="ring"><svg viewBox="0 0 180 180" role="img" aria-label="預算分配圓環圖"><circle cx="90" cy="90" r="70" fill="none" stroke="var(--line)" stroke-width="22"/>${arcs}</svg><p><b>${Math.round(planned).toLocaleString('en-US')}</b>NT$ / 人</p></div>
      <div class="bstat"><div><span>目標</span><b>${ntd(tgt)}</b></div><div><span>已分配</span><b>${ntd(planned)}</b></div><div class="${diff < 0 ? 'over' : 'ok'}"><span>${diff < 0 ? '超出目標' : '尚可分配'}</span><b>${ntd(Math.abs(diff))}</b></div></div></div>
      <ul class="plan">${cs.map(c => `<li style="--k:${c.color}"><span class="sw"></span><span class="pn">${esc(c.name)}<small>${Math.round(planned ? c.amount / planned * 100 : 0)}%${c.en ? '　' + esc(c.en) : ''}</small></span>
        <label class="money"><span>NT$</span><input type="number" inputmode="numeric" min="0" step="100" value="${c.amount}" data-cat="${c.id}" aria-label="${esc(c.name)}預算"></label>
        <button class="iconbtn" type="button" data-rm="${c.id}" aria-label="移除${esc(c.name)}">${ic('trash')}</button></li>`).join('')}</ul>
      <div class="addrow"><input type="text" id="newCat" placeholder="新增項目，例如：伴手禮寄送" aria-label="新增預算項目名稱"><label class="money"><span>NT$</span><input type="number" id="newAmt" inputmode="numeric" min="0" step="100" placeholder="0" aria-label="新增項目金額"></label><button class="btn sm" type="button" id="addCat">${ic('plus')}新增</button></div>
      <div class="row2"><button class="link" type="button" id="resetPlan" style="border:0;background:none;cursor:pointer;padding:0">還原原始預算</button><span>機票、住宿等金額為估算，以實際訂購為準 <span class="tag e">估算</span></span></div>
    </div>
    <div class="ledger"><p class="bsub">旅途記帳<i>Spending tracker</i></p>
      <div class="who">${[0, 1].map(i => { const left = tgt - sp.per[i], pct = Math.min(100, sp.per[i] / tgt * 100); return `<div class="person"><label for="nm${i}">旅伴名稱</label><input type="text" id="nm${i}" value="${esc(S.names[i])}" data-nm="${i}">
          <div class="num">${ntd(sp.per[i])}<small>已花</small></div><div class="meter${left < 0 ? ' hot' : ''}" style="--p:${pct}%"><i></i></div>
          <div class="hint">${left >= 0 ? `剩 ${ntd(left)}` : `超出 ${ntd(-left)}`}</div></div>`; }).join('')}</div>
      <div class="form" id="expForm">
        <input class="f-name" type="text" id="eName" placeholder="品項，例如：錦市場玉子燒" aria-label="品項">
        <input class="f-amt" type="number" id="eAmt" inputmode="decimal" min="0" placeholder="金額" aria-label="金額">
        <div class="f-cur seg" role="group" aria-label="幣別"><button type="button" data-cur="JPY" aria-pressed="${S.cur === 'JPY'}">¥</button><button type="button" data-cur="TWD" aria-pressed="${S.cur === 'TWD'}">NT$</button></div>
        <select class="f-cat" id="eCat" aria-label="類別">${opts}</select>
        <select class="f-who" id="eWho" aria-label="誰付錢、怎麼分">${whoOpts()}</select>
        <select class="f-day" id="eDay" aria-label="哪一天">${T.days.map(d => `<option value="${d.n}"${(tripDay() || 1) === d.n ? ' selected' : ''}>第${'一二三'[d.n - 1]}日</option>`).join('')}<option value="0">行前</option></select>
        <button class="f-go btn solid" type="button" id="eAdd">${ic('plus')}記一筆</button>
      </div>
      <p class="hint" id="eHint"></p>
      <div class="row2"><label for="rate">匯率：1 日圓 = NT$</label><input type="number" id="rate" step="0.001" min="0" value="${S.rate}" style="width:7em;height:38px"><span>${esc(T.budget.rateNote)}</span></div>
      ${S.exp.length ? `<ul class="cats">${cs.concat([{ id: 'other', name: '其他', color: '#8C9097', amount: 0 }]).filter(c => sp.byCat[c.id] || c.amount).map(c => { const act = (sp.byCat[c.id] || 0) / 2, p = c.amount ? Math.min(100, act / c.amount * 100) : 100; return `<li style="--k:${c.color}"><span>${esc(c.name)}</span><span class="v">${ntd(act)} <small>/ ${c.amount ? ntd(c.amount) : '未編列'}，每人平均</small></span><div class="twin${c.amount && act > c.amount ? ' over' : ''}" style="--p:${p}%"><i></i></div></li>`; }).join('')}</ul>
        <div class="bstat" style="margin-top:16px"><div><span>兩人合計已花</span><b>${ntd(sp.total)}</b></div><div><span>每人平均</span><b>${ntd(sp.total / 2)}</b></div><div class="${tgt - sp.total / 2 < 0 ? 'over' : 'ok'}"><span>每人平均剩餘</span><b>${ntd(tgt - sp.total / 2)}</b></div></div>
        <div class="settle"><p class="st"><span>結算</span><b>${esc(settleText(sp))}</b></p><p class="sn">只計算「兩人平分」並標明誰付錢的項目，日圓依上面的匯率換算。</p>
          <div class="sbtns"><button class="btn sm" type="button" id="copySettle">${ic('copy')}複製結算</button><button class="btn sm solid" type="button" id="shareLedger">${ic('share')}把記帳傳給旅伴</button></div>
          <p class="hint" id="settleHint"></p></div>
        <ul class="elist">${S.exp.slice().reverse().map(e => { const c = cs.find(x => x.id === e.cat) || { name: '其他' }; return `<li><span class="en1">${esc(e.name)}<small>${e.day ? '第' + '一二三'[e.day - 1] + '日' : '行前'}　${esc(c.name)}　${esc(whoLabel(e))}</small></span><span class="amt">${e.cur === 'JPY' ? yen(e.amt) : ntd(e.amt)}${e.cur === 'JPY' ? `<small>${ntd(toNTD(e))}</small>` : ''}</span><button class="iconbtn" type="button" data-del="${e.id}" aria-label="刪除 ${esc(e.name)}">${ic('trash')}</button></li>`; }).join('')}</ul>
        <div class="confirm" id="clearBox"><button class="link" type="button" id="clearAsk" style="border:0;background:none;cursor:pointer;padding:0">清除全部記帳</button></div>`
      : `<div class="empty">還沒有記帳。第一筆可以先記機票或住宿，<br>出發後每吃一餐、買一樣東西就記一下。<br><button class="btn sm" type="button" id="demo">填入示範資料看看</button></div>`}
    </div></div>`;
}
function addExpense(name, amt, cur, cat, who, day, hintEl) {
  if (!name.trim()) { hintEl.textContent = '請輸入品項名稱。'; hintEl.className = 'hint err'; return false; }
  if (!(amt > 0)) { hintEl.textContent = '請輸入大於 0 的金額。'; hintEl.className = 'hint err'; return false; }
  const w = typeof who === 'string' ? parseWho(who) : { who };
  if (w.who === 2 && w.pay !== undefined) S.lastPay = w.pay;
  S.exp.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name: name.trim(), amt, cur, cat, who: w.who, ...(w.pay !== undefined ? { pay: w.pay } : {}), day, ts: Date.now() }); save();
  return true;
}
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.cat) { const v = Math.max(0, +t.value || 0), ex = S.extra.find(x => x.id === t.dataset.cat); if (ex) ex.amount = v; else S.plan[t.dataset.cat] = v; save(); renderBudget(); }
  if (t.dataset.nm) { S.names[+t.dataset.nm] = t.value.trim() || ['旅伴 A', '旅伴 B'][+t.dataset.nm]; save(); renderBudget(); }
  if (t.id === 'rate') { S.rate = Math.max(0, +t.value || T.budget.rate); save(); renderBudget(); }
  if (t.matches('.clg input')) { S.check[t.id] = t.checked; if (!t.checked) delete S.check[t.id]; save(); clCounts(); }
});
document.addEventListener('click', e => {
  const t = e.target.closest('button,a'); if (!t) return;
  if (t.dataset.rm) { const ex = S.extra.findIndex(x => x.id === t.dataset.rm); if (ex > -1) S.extra.splice(ex, 1); else S.removed.push(t.dataset.rm); save(); renderBudget(); }
  if (t.id === 'addCat') { const n = $('#newCat').value.trim(), a = +$('#newAmt').value || 0; if (n) { S.extra.push({ id: 'x' + Date.now().toString(36), name: n, amount: a, color: ['#5E7A8C', '#9A7330', '#6E5A8A', '#3F6B5A'][S.extra.length % 4] }); save(); renderBudget(); } else $('#newCat').focus(); }
  if (t.id === 'resetPlan') { S.plan = {}; S.extra = []; S.removed = []; save(); renderBudget(); }
  if (t.dataset.cur) { S.cur = t.dataset.cur; save(); $$('[data-cur]', t.parentNode).forEach(b => b.setAttribute('aria-pressed', b === t)); }
  if (t.id === 'eAdd') { if (addExpense($('#eName').value, +$('#eAmt').value, S.cur, $('#eCat').value, $('#eWho').value, +$('#eDay').value, $('#eHint'))) { renderBudget(); const h = $('#eHint'); h.className = 'hint'; h.textContent = '已記下。'; $('#eName').focus(); } }
  if (t.dataset.del) { S.exp = S.exp.filter(x => x.id !== t.dataset.del); save(); renderBudget(); if (!$('#travel').hidden) renderTravel(); }
  if (t.id === 'demo') { [['錦市場玉子燒與豆乳甜甜圈', 1600, 'JPY', 'food', 's0', 1], ['京都拉麵晚餐', 2400, 'JPY', 'food', 's1', 1], ['HARUKA 單程優惠票（兩張）', 5400, 'JPY', 'transit', 's0', 1], ['藥妝店', 3200, 'JPY', 'shop', 'o0', 1]].forEach(([n, a, c, k, w, d]) => addExpense(n, a, c, k, w, d, $('#eHint') || document.createElement('p'))); renderBudget(); }
  if (t.id === 'clearAsk') { $('#clearBox').innerHTML = `<span>確定清除 ${S.exp.length} 筆記帳？這個動作無法復原。</span><button class="btn sm shu" type="button" id="clearYes">清除</button><button class="btn sm" type="button" id="clearNo">取消</button>`; }
  if (t.id === 'clearYes') { S.exp = []; save(); renderBudget(); }
  if (t.id === 'clearNo') renderBudget();
  if (t.id === 'copySettle') copyText(ledgerText(), $('#settleHint'), '已複製結算，可以貼到 LINE。');
  if (t.id === 'shareLedger') { const url = syncURL(), txt = ledgerText() + '\n\n點這個連結，把我的記帳合併到你的手機：', h = $('#settleHint');
    if (navigator.share) navigator.share({ title: '京都冬旅記帳', text: txt, url }).catch(() => {});
    else copyText(txt + '\n' + url, h, '已複製結算與連結，貼到 LINE 傳給旅伴。'); }
});

/* ---------- merge a companion's ledger from a #sync= link ---------- */
let syncAdd = null, syncNames = null;
function syncIn() {
  const m = location.hash.match(/^#sync=([\w-]+)/), box = $('#syncDlg'); if (!m) return;
  let p = null; try { p = JSON.parse(unb64u(m[1])); } catch (err) {}
  if (!p || !Array.isArray(p.e)) {
    syncAdd = null; box.innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="syncT"><h2 id="syncT">無法讀取這個連結</h2><p>連結可能被截斷了。請旅伴再傳一次完整的連結。</p><div class="sbtns"><button class="btn solid" type="button" id="syncNo">關閉</button></div></div>`;
  } else {
    const have = new Set(S.exp.map(e => e.id)), inc = p.e.map(a => ({ id: a[0], name: a[1], amt: a[2], cur: a[3], cat: a[4], who: a[5], day: a[6], ts: a[7], ...(a[8] === 0 || a[8] === 1 ? { pay: a[8] } : {}) }));
    syncAdd = inc.filter(e => !have.has(e.id)); syncNames = p.n;
    const same = S.names[0] === p.n[0] && S.names[1] === p.n[1];
    box.innerHTML = `<div class="dlg" role="dialog" aria-modal="true" aria-labelledby="syncT"><h2 id="syncT">合併旅伴的記帳</h2>
      <p>連結裡有 ${inc.length} 筆記帳，其中 <b>${syncAdd.length} 筆</b>是這支手機還沒有的。合併只會新增，不會刪除這支手機上的記錄。</p>
      ${same ? '' : `<p class="sn">對方設定的旅伴是「${esc(p.n[0])}」與「${esc(p.n[1])}」，這支手機是「${esc(S.names[0])}」與「${esc(S.names[1])}」。兩支手機的順序要一樣，結算才會正確。</p>`}
      <div class="sbtns">${syncAdd.length ? `<button class="btn solid" type="button" id="syncYes">合併 ${syncAdd.length} 筆</button>` : ''}<button class="btn" type="button" id="syncNo">${syncAdd.length ? '不要合併' : '關閉'}</button></div></div>`;
  }
  box.hidden = false; document.body.style.overflow = 'hidden'; const f = $('#syncYes') || $('#syncNo'); if (f) f.focus();
}
function syncClose(merged) {
  $('#syncDlg').hidden = true; document.body.style.overflow = '';
  history.replaceState(null, '', location.pathname + (merged ? '#budget' : ''));
  if (merged) $('#budget').scrollIntoView();
}
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.id === 'syncYes' && syncAdd) {
    const def = ['旅伴 A', '旅伴 B'];
    if (S.names[0] === def[0] && S.names[1] === def[1] && syncNames) S.names = syncNames.slice(0, 2);
    S.exp.push(...syncAdd); S.exp.sort((a, b) => (a.ts || 0) - (b.ts || 0)); save(); renderBudget(); syncClose(true);
  }
  if (t.id === 'syncNo') syncClose(false);
});

/* ---------- transport ---------- */
function renderTransport() {
  const mi = { plane: 'plane', train: 'train', bus: 'bus', walk: 'walk', taxi: 'taxi' };
  $('#trBox').innerHTML = `<div class="legendtags"><span class="tag v">已查證</span><span class="tag e">估算</span><span>時間與票價查核：${T.verifiedOn}，以當天公告為準</span></div>
    <ul class="legs">${T.transport.map(l => `<li class="leg"><div><div class="ft2">${esc(l.from)}${ic('arrow')}${esc(l.to)}</div><div class="modes">${l.modes.map(m => ic(mi[m])).join('')}</div></div>
      <div class="tm"><b>${esc(l.time)}</b>${esc(l.fare)} ${tag(l.s)}</div><div class="nt">${esc(l.note)}</div>
      <div>${l.dir ? `<a class="link" href="${gdir(l.dir[0], l.dir[1], l.mode || 'transit')}" target="_blank" rel="noopener">${ic('nav')}導航</a>` : ''}</div></li>`).join('')}</ul>`;
}

/* ---------- smart ---------- */
function renderSmart() {
  const t = T.tips;
  $('#smartBox').innerHTML = `<div class="tips">
    <article class="tip"><div class="ph">${pic(t.icoca.photo, '戴手套的手拿手機靠近剪票口感應器', '(max-width:900px) 92vw, 30vw')}</div><h3>手機 ICOCA ${tag(t.icoca.s)}<i>Mobile ICOCA</i></h3><ol>${t.icoca.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol><p>${esc(t.icoca.note)}</p></article>
    <article class="tip"><div class="ph">${pic(t.weather.photo, '羽絨外套、毛衣、圍巾、手套與防水靴的平鋪照', '(max-width:900px) 92vw, 30vw')}</div><h3>冬季洋蔥式穿搭 ${tag(t.weather.s)}<i>Winter layering</i></h3><div class="temp"><span>2°C</span><div class="scale"></div><span>9°C</span></div><ul>${t.weather.layers.map(x => `<li>${esc(x)}</li>`).join('')}</ul><p>${esc(t.weather.range)}，${esc(t.weather.note)}</p></article>
    <article class="tip"><div class="fig" role="img" aria-label="退稅門檻：同一店家同一天未稅滿 5,000 日圓"><b>¥5,000</b><span>同一店家、同一天、未稅</span><small>退稅門檻，2026年11月起</small></div><h3>退稅新制 ${tag(t.taxfree.s)}<i>Tax-free shopping</i></h3><ol>${t.taxfree.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol></article>
  </div>
  <div class="extra">${t.extra.map(x => `<div><b>${esc(x.k)} ${tag(x.s)}</b>${esc(x.t)}</div>`).join('')}</div>
  <div class="sources" id="sources"><h3>資料來源（查核：${T.verifiedOn}）</h3><ul>${T.sources.map(s => `<li><a href="${s.u}" target="_blank" rel="noopener">${esc(s.t)}</a></li>`).join('')}</ul></div>`;
}

/* ---------- gallery + lightbox ---------- */
let lbI = 0, lbSet = 'gal', lbReturn = null;
const lbList = () => lbSet === 'map' ? T.maps : T.gallery;
function renderGallery() {
  $('#galBox').innerHTML = `<div class="gal">${T.gallery.map((g, i) => `<button type="button" data-g="${i}" aria-label="放大：${esc(g.t)}">${pic(g.photo, g.t, '(max-width:700px) 92vw, 31vw')}<span>${esc(g.t)}</span></button>`).join('')}</div>`;
}
const lb = $('#lb');
function lbShow(i) { const L = lbList(); lbI = (i + L.length) % L.length; const g = L[lbI], s = PHT[g.photo]; $('#lbImg').src = psrc(g.photo, s[s.length - 1][0]); $('#lbImg').alt = g.t; $('#lbCap').textContent = `${g.t}　${lbI + 1} / ${L.length}`; }
function openLB(set, i, from) { lbSet = set; lbReturn = from; lbShow(i); lb.hidden = false; $('#lbClose').focus(); document.body.style.overflow = 'hidden'; }
document.addEventListener('click', e => { const g = e.target.closest('[data-g]'); if (g) openLB('gal', +g.dataset.g, g); });
const lbClose = () => { lb.hidden = true; document.body.style.overflow = ''; if (lbReturn) lbReturn.focus(); };
$('#lbClose').addEventListener('click', lbClose);
$('#lbPrev').addEventListener('click', () => lbShow(lbI - 1));
$('#lbNext').addEventListener('click', () => lbShow(lbI + 1));
lb.addEventListener('click', e => { if (e.target === lb) lbClose(); });
let tx = null; lb.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) lbShow(lbI + (dx < 0 ? 1 : -1)); tx = null; });
document.addEventListener('keydown', e => { if (lb.hidden) return; if (e.key === 'Escape') lbClose(); if (e.key === 'ArrowLeft') lbShow(lbI - 1); if (e.key === 'ArrowRight') lbShow(lbI + 1); });

/* ---------- checklist ---------- */
function renderChecklist() {
  $('#clBox').innerHTML = `<p class="clsum" id="clsum"></p><div class="cl">${T.checklist.map(g => `<div class="clg"><h3>${g.name}<small id="cs-${g.id}"></small></h3><ul>${g.items.map((it, i) => { const id = `cl-${g.id}-${i}`; return `<li><label><input type="checkbox" id="${id}"${S.check[id] ? ' checked' : ''}><span>${esc(it)}</span></label></li>`; }).join('')}</ul></div>`).join('')}</div>`;
  clCounts();
}
function clCounts() {
  let a = 0, b = 0;
  T.checklist.forEach(g => { const n = g.items.length, k = g.items.filter((_, i) => S.check[`cl-${g.id}-${i}`]).length; a += k; b += n; const el = $('#cs-' + g.id); if (el) el.textContent = `${k} / ${n}`; });
  const s = $('#clsum'); if (s) s.textContent = a === b ? `全部 ${b} 項都準備好了。` : `已完成 ${a} / ${b} 項，勾選結果會記在這支手機。`;
}

/* ---------- travel mode ---------- */
function renderTravel() {
  const td = tripDay(), dd = daysUntil();
  if (!S.tvDay) S.tvDay = td || 1;
  const d = T.days[S.tvDay - 1], next = d.items.find(i => !S.done[i.id]), pl = next && P[next.place];
  const sp = spend(), todays = S.exp.filter(e => e.day === d.n).reduce((a, e) => a + toNTD(e), 0);
  $('#travel').innerHTML = `<div class="wrap">
    <div class="tvhead"><h1>旅途模式</h1><p>${td ? `今天是旅行第 ${td} 天` : dd > 0 ? `距離出發還有 ${dd} 天，先預覽` : '旅程已結束'}　<a class="link" href="#top">回到旅行手帳</a></p><p class="offl">${offlineNote()}</p></div>
    <div class="daysw" role="group" aria-label="選擇日期">${T.days.map(x => `<button type="button" data-tv="${x.n}" aria-pressed="${x.n === d.n}" style="--c:${DAYC[x.n]}">第${'一二三'[x.n - 1]}日<small>${x.label.slice(0, 5)}</small></button>`).join('')}</div>
    <div class="tvgrid"><div>
      <div class="next" style="--c:${DAYC[d.n]}">${next && (next.photo || pl.photo) ? `<div class="bgp">${pic(next.photo || pl.photo, '', '(max-width:860px) 92vw, 56vw', true)}</div>` : ''}<div class="nextin">${next ? `<div class="lbl">下一站</div><time>${next.start}</time><h2>${esc(next.title)}</h2><p class="en">${esc(next.en)}　至 ${next.end}</p>
        <div class="nb"><a class="btn shu" href="${gdir('', pl.q).replace('origin=&', '')}" target="_blank" rel="noopener">${ic('nav')}導航過去</a><button class="btn" type="button" data-doneid="${next.id}">${ic('check')}完成，下一站</button></div>
        <p class="tip1">${esc((next.detail.find(r => r.k === '交通' || r.k === '時間' || r.k === '原因') || next.detail[0]).t)}</p>`
      : `<div class="alldone">第${'一二三'[d.n - 1]}日的行程都完成了。${d.n < 3 ? '明天見。' : '一路順風回台灣。'}</div>`}</div></div>
      <ol class="tl" style="margin-top:18px;--c:${DAYC[d.n]}">${d.items.map(it => evHTML(it, d, true)).join('')}</ol>
    </div><div>
      <div class="tvbox"><h3>快速記帳</h3>
        <div class="qform"><input type="text" id="qName" placeholder="品項" aria-label="品項"><input type="number" id="qAmt" inputmode="decimal" placeholder="金額" aria-label="金額">
          <div class="seg" role="group" aria-label="幣別"><button type="button" data-cur="JPY" aria-pressed="${S.cur === 'JPY'}">¥</button><button type="button" data-cur="TWD" aria-pressed="${S.cur === 'TWD'}">NT$</button></div>
          <select id="qCat" aria-label="類別">${cats().map(c => `<option value="${c.id}"${c.id === 'food' ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}<option value="other">其他</option></select>
          <select id="qWho" aria-label="誰付錢、怎麼分">${whoOpts()}</select>
          <button class="btn solid" type="button" id="qAdd">${ic('plus')}記一筆</button></div>
        <p class="hint" id="qHint"></p>
        <div class="qsum"><span>這天兩人合計</span><b>${ntd(todays)}</b></div><div class="qsum"><span>每人平均剩餘</span><b>${ntd(T.budget.target - sp.total / 2)}</b></div><div class="qsum"><span>結算</span><b class="sm">${esc(settleText(sp))}</b></div></div>
      <div class="tvbox"><h3>給店員看的日文</h3><p class="tvnote">點一下放大，直接把手機轉給對方看。</p>
        <div class="phrs">${T.phrases.map((x, i) => `<button type="button" class="phb" data-phr="${i}">${esc(x.k)}</button>`).join('')}</div></div>
      <div class="tvbox"><h3>飯店</h3><div class="copyrow"><p>${T.hotel.name}<br>${T.hotel.addressJa}<br>電話 ${T.hotel.tel}</p><button class="btn sm" type="button" id="copyAddr">${ic('copy')}複製地址</button></div><p class="hint" id="copyHint"></p>
        <a class="link" href="${gdir('', T.hotel.en).replace('origin=&', '')}" target="_blank" rel="noopener">${ic('nav')}回飯店</a></div>
      <div class="tvbox"><h3>天氣</h3><p class="tvnote">預報出發前一週最準；當天早上再看一次要不要帶傘。</p><a class="link" href="${T.weatherUrl}" target="_blank" rel="noopener">${ic('sun')}京都市天氣預報（tenki.jp）</a></div>
      <div class="tvbox"><h3>緊急電話</h3><p style="margin:0;font:15px/1.7 var(--sans)">警察 110　消防與救護車 119</p></div>
    </div></div></div>`;
}
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.dataset.tv) { S.tvDay = +t.dataset.tv; save(); renderTravel(); }
  if (t.dataset.doneid) { if (!S.done[t.dataset.doneid]) toggleDone(t.dataset.doneid); }
  if (t.id === 'qAdd') { const wv = $('#qWho').value; if (addExpense($('#qName').value, +$('#qAmt').value, S.cur, $('#qCat').value, wv, S.tvDay, $('#qHint'))) { renderTravel(); renderBudget(); const h = $('#qHint'); h.className = 'hint'; h.textContent = '已記下：' + whoLabel(parseWho(wv)) + '。'; } }
  if (t.dataset.phr) showPhrase(+t.dataset.phr, t);
  if (t.id === 'copyAddr') { const h = $('#copyHint'); try { navigator.clipboard.writeText(T.hotel.addressJa).then(() => { h.textContent = '已複製日文地址，可以貼給計程車司機看。'; }, () => { h.textContent = '無法自動複製，請長按地址選取。'; }); } catch (err) { h.textContent = '無法自動複製，請長按地址選取。'; } }
});

/* ---------- offline note ---------- */
function offlineNote() {
  const sw = 'serviceWorker' in navigator && navigator.serviceWorker.controller, app = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if (!/github\.io$/.test(location.hostname)) return '';
  return (sw ? '已存在這支手機：看過的內容沒有網路也能打開。' : '打開一次後會存到這支手機，之後沒有網路也能看。') + (app ? '' : 'iPhone 可在 Safari 按「分享」→「加入主畫面」，像 App 一樣打開。');
}

/* ---------- phrase cards: show Japanese to staff ---------- */
let phI = 0, phFrom = null;
const phDlg = $('#phrDlg');
function showPhrase(i, from) {
  const L = T.phrases; phI = (i + L.length) % L.length; if (from) phFrom = from; const x = L[phI];
  phDlg.innerHTML = `<div class="phin" role="dialog" aria-modal="true" aria-label="${esc(x.k)}">
    <p class="ja" lang="ja">${esc(x.ja)}</p>${x.addr ? `<p class="jaaddr" lang="ja">${esc(T.hotel.nameJa)}<br>${esc(T.hotel.addressJa).replace('区', '区<br>')}<br>TEL ${T.hotel.tel}</p>` : ''}
    <p class="ro">${esc(x.ro)}</p><p class="zhm">${esc(x.zh)}</p>
    <div class="phnav"><button class="btn" type="button" id="phPrev" aria-label="上一句">上一句</button><button class="btn solid" type="button" id="phClose">關閉</button><button class="btn" type="button" id="phNext" aria-label="下一句">下一句</button></div></div>`;
  phDlg.hidden = false; document.body.style.overflow = 'hidden'; $('#phClose').focus();
}
const phClose = () => { phDlg.hidden = true; document.body.style.overflow = ''; if (phFrom) phFrom.focus(); };
phDlg.addEventListener('click', e => { const t = e.target.closest('button'); if (!t) return; if (t.id === 'phClose') phClose(); if (t.id === 'phPrev') showPhrase(phI - 1); if (t.id === 'phNext') showPhrase(phI + 1); });
document.addEventListener('keydown', e => { if (!phDlg.hidden && e.key === 'Escape') phClose(); if (!$('#syncDlg').hidden && e.key === 'Escape') syncClose(false); });

/* ---------- routing: journal / travel ---------- */
function route() {
  const tv = location.hash === '#travel';
  $('#journal').hidden = tv; $('#travel').hidden = !tv;
  $('#modeBtn').textContent = tv ? '旅行手帳' : '旅途模式'; $('#modeBtn').setAttribute('href', tv ? '#top' : '#travel');
  if (tv) { navLinks.forEach(x => x.classList.remove('on')); renderTravel(); window.scrollTo(0, 0); }
  if (location.hash.startsWith('#sync=')) syncIn();
}
window.addEventListener('hashchange', route);

/* ---------- nav: burger, active section, to-top ---------- */
const burger = $('#burger'), menu = $('#menu');
burger.addEventListener('click', () => { const o = !menu.classList.contains('open'); menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? '關閉選單' : '開啟選單'); });
menu.addEventListener('click', e => { if (e.target.closest('a')) { menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); } });
const navLinks = $$('#menu a');
const secObs = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.dataset.s === en.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
['overview', 'itinerary', 'map', 'places', 'stay', 'budget', 'transport', 'smart', 'gallery', 'checklist'].forEach(id => secObs.observe($('#' + id)));
const totop = $('#totop');
window.addEventListener('scroll', () => totop.classList.toggle('show', scrollY > 900), { passive: true });
totop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); });

/* ---------- hero snow ---------- */
const hero = $('.hero'), cv = $('#snow');
if (cv && cv.getContext && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ctx = cv.getContext('2d'); let W = 0, H = 0, fl = [], on = true;
  const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    fl = Array.from({ length: Math.round(W * H / 9000) }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.9 + .7, v: Math.random() * .55 + .25, a: Math.random() * 6.3, s: Math.random() * .015 + .004 })); };
  const frame = () => { if (!on) return; ctx.clearRect(0, 0, W, H); ctx.fillStyle = 'rgba(255,255,255,.85)';
    for (const f of fl) { f.y += f.v * (1 + f.r * .35); f.a += f.s; f.x += Math.sin(f.a) * .35; if (f.y > H + 4) { f.y = -4; f.x = Math.random() * W; } ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill(); }
    requestAnimationFrame(frame); };
  const cro = new ResizeObserver(size); cro.observe(cv); size(); hero.classList.add('anim');
  const hio = new IntersectionObserver(e => { const v = e[0].isIntersecting && !$('#journal').hidden; if (v && !on) { on = true; frame(); } else on = v; }); hio.observe(hero); frame();
}

/* ---------- boot ---------- */
$('#photoNote').textContent = T.photoNote;
renderOverview(); renderItinerary(); renderMap(); renderPlaces(); renderFood(); renderStay(); renderBudget(); renderTransport(); renderSmart(); renderGallery(); renderChecklist();
route();
if ('serviceWorker' in navigator && /github\.io$/.test(location.hostname)) navigator.serviceWorker.register('sw.js').catch(() => {});
}
