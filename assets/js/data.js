/* 京都冬旅 2027 — single source of truth.
   Every fact that could change carries a status:  v = 已查證（2026年11月）  e = 估算  c = 出發前需再確認
   Change dates, budget or hotel here and every section of the site follows. */
window.TRIP = {
  name: '京都冬旅',
  title: 'Kyoto, Winter Journey',
  subtitle: '京都三天兩夜・冬日輕旅行',
  start: '2027-01-28', end: '2027-01-30', nights: 2,
  travelers: { count: 2, label: '大學同學兩人', en: 'Two university classmates' },
  flight: { from: 'TPE', fromName: '桃園機場', to: 'KIX', toName: '關西機場', note: '航班時間依機票為準' },
  verifiedOn: '2026年11月',
  photos: {"gion":[[960,640],[1536,1024]],"hero-night":[[1024,683],[1536,1024]],"hero-pagoda":[[1024,683],[1536,1024]],"hotel-room":[[640,960],[1024,1536]],"icoca-gate":[[640,640],[1200,1200]],"inari":[[640,960],[1024,1536]],"kamo-pontocho":[[960,640],[1536,1024]],"kimono-friends":[[640,960],[1024,1536]],"kiyomizu":[[640,960],[1024,1536]],"kyoto-station":[[960,640],[1536,1024]],"matcha":[[640,640],[1200,1200]],"nishiki":[[640,960],[1024,1536]],"nishiki-snacks":[[640,640],[1200,1200]],"ramen":[[640,640],[1200,1200]],"sannenzaka":[[960,640],[1536,1024]],"winter-layers":[[640,640],[1200,1200]]},
  photoNote: '照片為 AI 生成的情境示意圖，不是實地拍攝；京都一月底不一定會下雪。',

  hotel: {
    id: 'hotel', name: '京都十字飯店', en: 'Cross Hotel Kyoto', area: '河原町・三條',
    address: '京都市中京區河原町通三條下ル大黑町 71-1', addressJa: '京都府京都市中京区河原町通三条下る大黒町71-1', tel: '075-231-8831',
    checkin: '15:00', checkout: '11:00', perPerson: 6000,
    facts: [
      { k: '入住／退房', t: '15:00 起入住，11:00 前退房', s: 'v' },
      { k: '車站', t: '地鐵京都市役所前站、京阪三條站步行約 4 分鐘；阪急京都河原町站約 7 分鐘', s: 'v' },
      { k: '步行可到', t: '先斗町、木屋町、三條大橋約 1 分鐘；祇園約 9 分鐘', s: 'v' },
      { k: '行李', t: '提供行李寄放，入住前、退房後都能先寄', s: 'v' },
      { k: '住宿稅', t: '每人每晚依房價課稅：¥6,000–19,999 為 ¥400，兩晚每人約 ¥800，於飯店現場支付', s: 'v' },
      { k: '房價', t: '每人兩晚 NT$6,000 為預算估算，實際以訂房為準', s: 'e' }
    ],
    highlights: ['京町家格子意象的外觀與木質客室', '河原町、錦市場、先斗町都在步行範圍', '三條、京都市役所前兩個車站都在 5 分鐘內'],
    link: 'https://www.booking.com/hotel/jp/cross-hotel-kyoto.html',
    photo: 'hotel-room'
  },

  places: {
    kix:        { name: '關西機場', en: 'Kansai International Airport', q: 'Kansai International Airport', lat: 34.4347, lng: 135.2440, offmap: true },
    'kyoto-st': { name: '京都車站', en: 'Kyoto Station', q: 'Kyoto Station', lat: 34.9858, lng: 135.7588, photo: 'kyoto-station' },
    hotel:      { name: '京都十字飯店', en: 'Cross Hotel Kyoto', q: 'Cross Hotel Kyoto', lat: 35.0081, lng: 135.7699, photo: 'hotel-room' },
    nishiki:    { name: '錦市場', en: 'Nishiki Market', q: 'Nishiki Market Kyoto', lat: 35.0050, lng: 135.7646, photo: 'nishiki' },
    kawaramachi:{ name: '河原町', en: 'Kawaramachi', q: 'Shijo Kawaramachi Kyoto', lat: 35.0037, lng: 135.7689, photo: 'kamo-pontocho' },
    kiyomizu:   { name: '清水寺', en: 'Kiyomizu-dera', q: 'Kiyomizu-dera', lat: 34.9949, lng: 135.7850, photo: 'kiyomizu' },
    sannenzaka: { name: '三年坂', en: 'Sannenzaka', q: 'Sannenzaka Kyoto', lat: 34.9962, lng: 135.7811, photo: 'sannenzaka' },
    ninenzaka:  { name: '二年坂', en: 'Ninenzaka', q: 'Ninenzaka Kyoto', lat: 34.9983, lng: 135.7806, photo: 'kimono-friends' },
    gion:       { name: '祇園', en: 'Gion', q: 'Hanamikoji Street Kyoto', lat: 35.0036, lng: 135.7755, photo: 'gion' },
    pontocho:   { name: '先斗町', en: 'Pontocho', q: 'Pontocho Kyoto', lat: 35.0058, lng: 135.7709, photo: 'kamo-pontocho' },
    inari:      { name: '伏見稻荷大社', en: 'Fushimi Inari Taisha', q: 'Fushimi Inari Taisha', lat: 34.9671, lng: 135.7727, photo: 'inari' },
    ramen:      { name: '京都拉麵小路', en: 'Kyoto Ramen Koji', q: 'Kyoto Ramen Koji', lat: 34.9852, lng: 135.7580, same: 'kyoto-st', photo: 'ramen' }
  },

  days: [
    { n: 1, date: '2027-01-28', label: '1月28日 星期四', en: 'Thursday, 28 January', title: '抵達京都，錦市場與河原町', enTitle: 'Arrival and a downtown food walk',
      photo: 'nishiki', strip: ['nishiki-snacks', 'kamo-pontocho'], route: ['kyoto-st', 'hotel', 'nishiki', 'kawaramachi'],
      items: [
        { id: 'd1a', start: '07:30', end: '11:30', title: '桃園飛關西機場', en: 'TPE to KIX', place: 'kix', icon: 'plane',
          detail: [ { k: '說明', t: '依機票實際航班為準。抵達後入境、領行李通常要 30–60 分鐘。', s: 'e' },
                    { k: '費用', t: '來回機票每人 NT$12,500（預算）', s: 'e' } ] },
        { id: 'd1b', start: '12:30', end: '13:45', title: '搭 Haruka 特急到京都', en: 'JR Haruka to Kyoto', place: 'kyoto-st', from: 'kix', icon: 'train',
          detail: [ { k: '交通', t: '關西機場站搭 JR 特急 Haruka 直達京都車站，不用轉車，約 75–80 分鐘。', s: 'v' },
                    { k: '票價', t: '外國旅客 HARUKA 單程優惠票 ¥2,700（2026年11月起，需護照）；一般自由席 ¥3,060。', s: 'v' },
                    { k: '注意', t: 'ICOCA 只能付乘車券部分，特急券要另外買。', s: 'v' } ] },
        { id: 'd1x', start: '14:00', end: '14:45', title: '到飯店寄放行李', en: 'Drop bags at the hotel', place: 'hotel', from: 'kyoto-st', icon: 'bag', suggested: true,
          detail: [ { k: '原因', t: '飯店 15:00 才能入住，先寄行李再去錦市場最順。', s: 'v' },
                    { k: '交通', t: '京都車站前搭市巴士 4、17、205 號到「河原町三條」，約 20–30 分鐘；或搭計程車約 15 分鐘。', s: 'e' },
                    { k: '費用', t: '市巴士 ¥230（京都市計畫 2027 年度起對非市民調漲，出發前再確認）。', s: 'c' } ] },
        { id: 'd1c', start: '15:00', end: '16:30', title: '錦市場美食探索', en: 'Nishiki Market', place: 'nishiki', from: 'hotel', icon: 'food',
          detail: [ { k: '地點', t: '四百多年歷史的「京都廚房」，窄長拱廊裡一百多家店：漬物、玉子燒、豆漿甜點、海鮮串。', s: '' },
                    { k: '時間', t: '各店自訂營業時間，多數 17:00–18:00 收；週三不少店公休，這天是週四。', s: 'v' },
                    { k: '停留', t: '建議 1.5–2 小時。', s: 'e' },
                    { k: '費用', t: '邊吃邊逛每人約 ¥2,000–3,000。', s: 'e' },
                    { k: '禮節', t: '市場請遊客不要邊走邊吃，在店前吃完再往前走。', s: '' },
                    { k: '拍照', t: '從寺町通那端入口拍彩色天窗與長長的拱廊。', s: '' } ] },
        { id: 'd1d', start: '17:00', end: '21:00', title: '河原町逛街，京都拉麵晚餐', en: 'Kawaramachi shopping and ramen', place: 'kawaramachi', from: 'nishiki', icon: 'bag', photo: 'ramen',
          detail: [ { k: '地點', t: '四條河原町一帶是京都最熱鬧的商圈，百貨、藥妝與巷弄餐廳集中。', s: '' },
                    { k: '費用', t: '拉麵一碗約 ¥1,000–1,500。', s: 'e' },
                    { k: '拍照', t: '晚上走到四條大橋，拍鴨川與先斗町的燈火。', s: '' } ] }
      ] },
    { n: 2, date: '2027-01-29', label: '1月29日 星期五', en: 'Friday, 29 January', title: '和服、清水寺與祇園抹茶', enTitle: 'Kimono, Kiyomizu-dera and Gion',
      photo: 'kiyomizu', strip: ['kimono-friends', 'matcha'], route: ['hotel', 'kiyomizu', 'sannenzaka', 'ninenzaka', 'gion', 'pontocho', 'hotel'],
      items: [
        { id: 'd2a', start: '09:30', end: '10:45', title: '和服租借與妝髮', en: 'Kimono rental and hair', place: 'kiyomizu', from: 'hotel', icon: 'kimono', photo: 'kimono-friends',
          detail: [ { k: '建議', t: '選清水寺或祇園附近的店，換好直接走上清水坂。請先線上預約。', s: '' },
                    { k: '停留', t: '換裝與妝髮約 60–75 分鐘。', s: 'e' },
                    { k: '費用', t: '預算每人 NT$1,500（和服＋髮型）。冬天可加購披肩或羽織。', s: 'e' },
                    { k: '交通', t: '從飯店搭計程車到清水寺一帶約 10–15 分鐘。', s: 'e' } ] },
        { id: 'd2b', start: '11:00', end: '12:45', title: '清水寺（世界遺產）', en: 'Kiyomizu-dera', place: 'kiyomizu', icon: 'temple',
          detail: [ { k: '地點', t: '建在音羽山山腰，懸空的清水舞台以木柱與橫樑架起；屬世界遺產「古都京都的文化財」。', s: '' },
                    { k: '時間', t: '6:00 開門，一般 18:00 關門（特別夜間參拜期間延長）。', s: 'v' },
                    { k: '費用', t: '參拜費成人 ¥500。', s: 'v' },
                    { k: '停留', t: '1.5–2 小時。', s: 'e' },
                    { k: '拍照', t: '往奧之院方向走，回頭就能拍到舞台全景。', s: '' } ] },
        { id: 'd2c', start: '13:00', end: '15:00', title: '三年坂、二年坂，買伴手禮', en: 'Sannenzaka and Ninenzaka', place: 'sannenzaka', from: 'kiyomizu', icon: 'walk',
          detail: [ { k: '地點', t: '通往清水寺的石板坡道，兩旁是町家老店與茶屋，坡下看得到八坂塔。', s: '' },
                    { k: '注意', t: '雪天石階容易滑，穿和服走慢一點。', s: '' },
                    { k: '拍照', t: '八坂通從坡上往下拍八坂塔，是最經典的京都畫面。', s: '' } ] },
        { id: 'd2d', start: '15:30', end: '17:30', title: '祇園散策與抹茶甜點', en: 'Gion and matcha', place: 'gion', from: 'ninenzaka', icon: 'tea', photo: 'matcha',
          detail: [ { k: '地點', t: '花見小路的茶屋、白川沿岸的柳樹與八坂神社；傍晚燈籠陸續亮起。', s: '' },
                    { k: '費用', t: '抹茶甜點約 ¥1,200–2,000。', s: 'e' },
                    { k: '禮節', t: '部分私人巷弄禁止進入與拍照，看告示；不要追拍藝妓、舞妓。', s: '' },
                    { k: '拍照', t: '白川巽橋一帶，黃昏燈光最好。', s: '' } ] },
        { id: 'd2e', start: '18:00', end: '20:30', title: '先斗町京都特色晚餐（可選）', en: 'Dinner in Pontocho, optional', place: 'pontocho', from: 'gion', icon: 'food',
          detail: [ { k: '地點', t: '鴨川西岸的窄巷，餐廳一家接一家，巷口掛著千鳥燈籠。', s: '' },
                    { k: '交通', t: '從祇園走過四條大橋約 10 分鐘；吃完走回飯店約 5 分鐘。', s: 'e' },
                    { k: '費用', t: '晚餐每人約 ¥3,000–6,000，熱門店建議先訂位。', s: 'e' } ] }
      ] },
    { n: 3, date: '2027-01-30', label: '1月30日 星期六', en: 'Saturday, 30 January', title: '伏見稻荷、拉麵小路，返台', enTitle: 'Fushimi Inari, ramen and the flight home',
      photo: 'inari', strip: ['kyoto-station', 'ramen'], route: ['hotel', 'inari', 'kyoto-st'],
      items: [
        { id: 'd3a', start: '08:30', end: '09:00', title: '退房、寄放行李', en: 'Check out and store luggage', place: 'hotel', icon: 'bag',
          detail: [ { k: '時間', t: '11:00 前退房。', s: 'v' },
                    { k: '建議', t: '行李寄在飯店的話，去車站前要繞回河原町；也可以一早把行李帶到京都車站的置物櫃。', s: 'e' } ] },
        { id: 'd3b', start: '09:15', end: '11:30', title: '伏見稻荷大社千本鳥居', en: 'Fushimi Inari Taisha', place: 'inari', from: 'hotel', icon: 'torii',
          detail: [ { k: '地點', t: '全日本稻荷神社的總本宮，上千座朱紅鳥居沿稻荷山往上排列。', s: '' },
                    { k: '時間', t: '24 小時開放，參拜免費；早上人最少。', s: 'v' },
                    { k: '交通', t: '京阪三條站搭京阪本線到伏見稻荷站，約 10–20 分鐘，出站步行約 5 分鐘。', s: 'e' },
                    { k: '停留', t: '千本鳥居一帶約 1 小時；登頂繞一圈約 2–3 小時。', s: 'e' },
                    { k: '拍照', t: '越往上走鳥居越密、人越少；四ツ辻可眺望京都市區。', s: '' } ] },
        { id: 'd3c', start: '12:00', end: '13:30', title: '京都拉麵小路（車站 10F）', en: 'Kyoto Ramen Koji', place: 'ramen', from: 'inari', icon: 'food',
          detail: [ { k: '交通', t: 'JR 稻荷站搭奈良線到京都站，約 5 分鐘、¥150。', s: 'v' },
                    { k: '時間', t: '11:00–22:00（21:30 最後點餐），在京都車站大樓 10 樓，搭大階段旁的手扶梯上去。', s: 'v' },
                    { k: '費用', t: '一碗約 ¥1,000–1,500，多數店先在售票機買券。', s: 'e' },
                    { k: '拍照', t: '吃完到同層的空中徑路，看京都塔。', s: '' } ] },
        { id: 'd3d', start: '13:30', end: '15:45', title: '京都車站最後採買', en: 'Last shopping at Kyoto Station', place: 'kyoto-st', icon: 'bag',
          detail: [ { k: '地點', t: '車站大樓、伊勢丹與地下街都有伴手禮。', s: '' },
                    { k: '退稅', t: '結帳先付含稅價，同一店家同一天未稅滿 ¥5,000 才能退稅，要出示護照正本。', s: 'v' } ] },
        { id: 'd3e', start: '16:00', end: '21:30', title: 'Haruka 到關西機場，搭機返台', en: 'JR Haruka to KIX, flight home', place: 'kix', from: 'kyoto-st', icon: 'plane',
          detail: [ { k: '交通', t: '京都車站搭 Haruka 到關西機場，約 75–80 分鐘。', s: 'v' },
                    { k: '退稅', t: '有退稅商品的話，報到前先到機場海關出示商品辦理，請預留時間。', s: 'v' },
                    { k: '航班', t: '以機票為準；國際線建議起飛前 2 小時到機場。', s: 'e' } ] }
      ] }
  ],

  attractions: [
    { place: 'kyoto-st', photo: 'kyoto-station', span: 2, days: [1, 3], desc: 'Haruka 的終點，JR、地下鐵、近鐵與巴士的總站。車站大樓 10 樓有拉麵小路，對面就是京都塔。', stay: '第三天約 3.5 小時', best: '傍晚，空中徑路可看京都塔亮燈' },
    { place: 'nishiki', photo: 'nishiki', days: [1], desc: '四百多年歷史的「京都廚房」，一百多家店擠在窄長的拱廊裡。', stay: '1.5–2 小時', best: '下午；多數店 17:00–18:00 收' },
    { place: 'kawaramachi', photo: 'kamo-pontocho', days: [1, 2], desc: '京都最熱鬧的街區，往東過四條大橋就是鴨川、先斗町與祇園。', stay: '自由安排', best: '傍晚到晚上' },
    { place: 'kiyomizu', photo: 'kiyomizu', days: [2], desc: '音羽山山腰的古寺與懸空的清水舞台，世界遺產。', stay: '1.5–2 小時', best: '早上人少，6:00 開門' },
    { place: 'sannenzaka', photo: 'sannenzaka', days: [2], desc: '通往清水寺的石板坡道，町家老店與茶屋林立，坡下就是八坂塔。', stay: '1.5–2 小時', best: '上午或傍晚' },
    { place: 'gion', photo: 'gion', days: [2], desc: '花見小路的茶屋、白川的柳樹與八坂神社，京都最有名的花街。', stay: '約 2 小時', best: '黃昏點燈時' },
    { place: 'inari', photo: 'inari', span: 2, days: [3], desc: '全日本稻荷神社的總本宮，上千座朱紅鳥居沿山而上。', stay: '1–3 小時', best: '早上 9 點前，24 小時開放' }
  ],

  budget: {
    target: 30000,
    categories: [
      { id: 'flight', name: '來回機票', en: 'Flights', amount: 12500, color: '#24395E' },
      { id: 'hotel', name: '兩晚住宿', en: 'Hotel', amount: 6000, color: '#7A4A30' },
      { id: 'food', name: '餐飲與門票', en: 'Food and fees', amount: 4500, color: '#C8452B' },
      { id: 'shop', name: '購物伴手禮', en: 'Souvenirs', amount: 4300, color: '#C2954A' },
      { id: 'kimono', name: '和服體驗', en: 'Kimono', amount: 1500, color: '#C98A8F' },
      { id: 'transit', name: 'Haruka 與市內交通', en: 'Transport', amount: 1200, color: '#8C9097' }
    ],
    rate: 0.20,
    rateNote: '1 日圓兌新台幣的預設值，請依出發時銀行匯率修改'
  },

  transport: [
    { from: '桃園機場', to: '關西機場', modes: ['plane'], time: '依航班', fare: '機票預算 NT$12,500', s: 'e', note: '航班與時間以機票為準。', dir: null },
    { from: '關西機場', to: '京都車站', modes: ['train'], time: '約 75–80 分', fare: 'HARUKA 單程優惠票 ¥2,700／一般自由席 ¥3,060', s: 'v', note: '不用轉車；優惠票需出示護照。', dir: ['Kansai International Airport', 'Kyoto Station'] },
    { from: '京都車站', to: '飯店（河原町三條）', modes: ['bus', 'taxi'], time: '巴士約 20–30 分／計程車約 15 分', fare: '市巴士 ¥230', s: 'e', note: '市巴士 4、17、205 號到「河原町三條」。巴士票價 2027 年度起可能調整。', dir: ['Kyoto Station', 'Cross Hotel Kyoto'] },
    { from: '飯店', to: '錦市場、河原町', modes: ['walk'], time: '步行約 10 分', fare: '免費', s: 'e', note: '沿河原町通往南走到四條。', dir: ['Cross Hotel Kyoto', 'Nishiki Market Kyoto'], mode: 'walking' },
    { from: '飯店', to: '清水寺', modes: ['taxi', 'bus'], time: '計程車約 10–15 分', fare: '依里程', s: 'e', note: '穿和服出發的話計程車最省力；回程經二年坂、祇園一路走回來。', dir: ['Cross Hotel Kyoto', 'Kiyomizu-dera'] },
    { from: '飯店', to: '祇園', modes: ['walk'], time: '步行約 9 分', fare: '免費', s: 'v', note: '過三條大橋或四條大橋就是東山一側。', dir: ['Cross Hotel Kyoto', 'Hanamikoji Street Kyoto'], mode: 'walking' },
    { from: '飯店', to: '伏見稻荷大社', modes: ['train', 'walk'], time: '約 10–20 分＋步行 5 分', fare: '京阪電車約 ¥210', s: 'e', note: '京阪三條站上車，伏見稻荷站下車。', dir: ['Cross Hotel Kyoto', 'Fushimi Inari Taisha'] },
    { from: '伏見稻荷', to: '京都車站', modes: ['train'], time: '約 5 分', fare: 'JR 奈良線 ¥150', s: 'v', note: 'JR 稻荷站就在神社門口。', dir: ['Inari Station Kyoto', 'Kyoto Station'] },
    { from: '京都車站', to: '關西機場', modes: ['train'], time: '約 75–80 分', fare: 'HARUKA 單程優惠票 ¥2,700', s: 'v', note: '有退稅商品要在報到前去海關。', dir: ['Kyoto Station', 'Kansai International Airport'] }
  ],

  tips: {
    icoca: { photo: 'icoca-gate', s: 'v', steps: ['iPhone 8 以後機型、iOS 16 以上，Apple ID 需開啟雙重認證', '錢包 App 按「＋」，選「交通卡」，再選 ICOCA', '用已加入錢包的信用卡儲值', '進出站、搭巴士、在便利商店結帳都是靠一下就好'], note: 'Haruka 的特急券不能只用 ICOCA 付，要另外買票。' },
    weather: { photo: 'winter-layers', s: 'e', range: '約 2–9°C', note: '這是 1 月底的歷年平均，不是天氣預報；出發前一週再看預報。', layers: ['發熱衣與發熱褲', '毛衣或刷毛', '羽絨外套', '手套、圍巾、毛帽', '防滑、好走的鞋'] },
    taxfree: { s: 'v', steps: ['2026年11月1日起改為退稅制：結帳先付含稅價', '同一店家同一天未稅滿 ¥5,000 才適用', '購物時出示護照正本', '離境時在機場海關（報到前）出示商品', '海關確認後才退稅，認明 Japan Tax-Free Shop 標誌'] },
    extra: [
      { k: '住宿稅', t: '京都 2026年3月起調整：每人每晚房價 ¥6,000–19,999 課 ¥400，在飯店付。', s: 'v' },
      { k: '市巴士', t: '目前單一票價 ¥230；京都市計畫 2027 年度起對非市民調漲，出發前再確認。', s: 'c' },
      { k: '緊急電話', t: '警察 110，消防與救護車 119。', s: 'v' }
    ]
  },

  checklist: [
    { id: 'pre', name: '出發前', items: ['護照（效期足夠）', '電子機票與登機證', '飯店訂房確認', '和服租借預約：1月29日 09:30', '旅遊平安險與不便險', '日圓現金（部分小店只收現金）', '信用卡（開通海外刷卡）', '網路：eSIM 或 Wi-Fi 分享器'] },
    { id: 'pack', name: '行李', items: ['羽絨外套', '發熱衣與發熱褲', '毛衣', '手套', '圍巾', '防滑好走的鞋', '充電器', '行動電源（只能放隨身行李）'] },
    { id: 'digital', name: '手機準備', items: ['Google 地圖下載京都離線區域', '翻譯 App', 'iPhone 錢包加入 ICOCA', '航班資訊截圖', '飯店日文地址存在手機', 'HARUKA 車票（線上購買）'] }
  ],

  food: [
    { photo: 'nishiki-snacks', name: '錦市場小吃', en: 'Nishiki street food', days: [1], t: '玉子燒、豆乳甜甜圈、醬燒扇貝、章魚串，一攤吃一樣，每人約 ¥2,000–3,000。', s: 'e' },
    { photo: 'ramen', name: '京都拉麵', en: 'Kyoto ramen', days: [1, 3], t: '醬油豚骨湯頭配大把九條蔥。第一天晚上在河原町吃，第三天中午到京都車站 10 樓的拉麵小路，一碗約 ¥1,000–1,500。', s: 'e' },
    { photo: 'matcha', name: '抹茶與和菓子', en: 'Matcha and wagashi', days: [2], t: '走完清水寺和二年坂，到祇園坐下來喝一碗抹茶，配一個季節和菓子，約 ¥1,200–2,000。', s: 'e' }
  ],

  gallery: [
    { photo: 'hero-pagoda', t: '雪中的八坂塔' },
    { photo: 'nishiki', t: '錦市場的拱廊' },
    { photo: 'kiyomizu', t: '雪中的清水舞台' },
    { photo: 'ramen', t: '一碗京都拉麵' },
    { photo: 'inari', t: '千本鳥居' },
    { photo: 'gion', t: '花見小路的黃昏' },
    { photo: 'kimono-friends', t: '穿和服走二年坂' },
    { photo: 'kamo-pontocho', t: '鴨川與先斗町的夜' },
    { photo: 'matcha', t: '抹茶與和菓子' },
    { photo: 'sannenzaka', t: '三年坂的石階' },
    { photo: 'nishiki-snacks', t: '錦市場小吃' },
    { photo: 'kyoto-station', t: '黃昏的京都塔' },
    { photo: 'hotel-room', t: '京都風格的客房（示意）' },
    { photo: 'hero-night', t: '雪夜的八坂塔' }
  ],

  sources: [
    { t: '日本觀光廳：退稅新制（2026年11月起）', u: 'https://www.mlit.go.jp/kankocho/tax-free/page01_000001_00028.html' },
    { t: '京都市觀光協會：住宿稅調整', u: 'https://kyoto.travel/en/news/tax-change/' },
    { t: '清水寺：參拜時間', u: 'https://kiyomizudera.or.jp/en/location' },
    { t: 'Apple：在錢包加入 ICOCA', u: 'https://support.apple.com/en-us/HT207155' },
    { t: 'Ekitan：特急 HARUKA 票價與時刻', u: 'https://ekitan.com/zh-tw/article/haruka-jikoku-ryoukin' },
    { t: '京都市交通局：市巴士票價', u: 'https://www2.city.kyoto.lg.jp/kotsu/webguide/en/fare/fare_bus.html' },
    { t: '京都觀光：前往伏見稻荷', u: 'https://kyoto.travel/en/info/transportation/fushimi_inari.html' },
    { t: '錦市場商店街：常見問題', u: 'https://kyoto-nishiki.or.jp/en/contact' },
    { t: '京都拉麵小路', u: 'http://www.kyoto-ramen-koji.com/chinese_traditional/' }
  ]
};
