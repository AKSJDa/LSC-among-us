// ===== Utilidades compartidas =====
const $=s=>document.querySelector(s);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const NSKIN=30,pad=n=>String(n).padStart(2,'0');
const shuffle=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
const head=p=>`<img class="crew" src="img/h${pad(p.skin)}.png" alt="">`;
const body=p=>`<img class="crew" src="img/p${pad(p.skin)}.png" alt="">`;
const anon=()=>'<img class="crew" src="img/anon.png" alt="">';
// jugadores de la partida -> lista ordenada [{id,name,skin,alive,ord}]
function plist(g){return g&&g.players?Object.entries(g.players).map(([id,p])=>({id,...p})).sort((a,b)=>(a.ord||0)-(b.ord||0)):[]}
// ===== Conexión a Firebase =====
let db;
function connect(){
  const bad=typeof firebase==='undefined'||typeof FIREBASE_CONFIG==='undefined'||!FIREBASE_CONFIG.databaseURL||/PEGA/.test(FIREBASE_CONFIG.databaseURL);
  if(bad){document.body.innerHTML='<div class="err">Falta configurar Firebase.<br>Abre <b>firebase-config.js</b> y pega tus datos (mira LEEME.txt).</div>';throw new Error('sin-config')}
  firebase.initializeApp(FIREBASE_CONFIG);db=firebase.database();return db;
}
// ===== Tablet de votación =====
function cardsHTML(list){
  return `<div class="grid" style="grid-auto-rows:6.4cqw;--rh:6.4cqw">`+list.map(p=>`<div class="card ${p.alive?'':'dead'}" data-id="${p.id}">${head(p)}<span class="name">${esc(p.name)}</span><div class="slot"></div></div>`).join('')+'</div>';
}
function tabletHTML(list,extra=''){return `<div class="tablet"><img src="img/tablet.png" alt=""><div class="screen"><h1>¿Quién es impostor?</h1>${cardsHTML(list)}<div class="foot" id="foot"></div></div>${extra}</div>`}
