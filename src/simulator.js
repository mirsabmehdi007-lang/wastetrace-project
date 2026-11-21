import * as THREE from 'three';
export function initSimulator(){
let kd,stop=false;
const T=THREE,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const wrap=$('#v'),R=new T.WebGLRenderer({antialias:true,alpha:true});R.setPixelRatio(Math.min(devicePixelRatio,2));wrap.appendChild(R.domElement);
const S=new T.Scene(),C=new T.PerspectiveCamera(45,1,.1,300);
S.add(new T.HemisphereLight(0xffffff,0x556677,.95));const dl=new T.DirectionalLight(0xffffff,.8);dl.position.set(10,25,15);S.add(dl);
const grid=new T.GridHelper(44,44,0x8899aa,0x8899aa);grid.material.transparent=true;grid.material.opacity=.25;grid.position.y=-.5;S.add(grid);
const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.6,metalness:.1},o));
const box=(w,h,d,c,x,y,z,p,o)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(c,o));m.position.set(x,y,z);p&&p.add(m);return m};
const cyl=(r,h,c,x,y,z,p)=>{const m=new T.Mesh(new T.CylinderGeometry(r,r,h,24),M(c));m.position.set(x,y,z);p.add(m);return m};
const A={},labs=[],pinL=[];
function lab(t,s,bg){const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');x.fillStyle=bg||'#0b1520e8';x.fillRect(0,0,256,64);x.fillStyle='#fff';x.font='bold 30px sans-serif';x.textAlign='center';x.fillText(t,128,44);
 const sp=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(c),depthTest:false,transparent:true}));sp.scale.set(s*4,s,1);sp.renderOrder=9;return sp}
function pin(g,id,x,y,z,t,nm){box(.14,.6,.14,0xd4af37,x,y+.25,z,g);const o=new T.Object3D();o.position.set(x,y+.6,z);g.add(o);o.userData.t=nm+' '+t;A[id]=o;
 if(id.startsWith('uno')&&!WU.has(id))return;const s=lab(t,.3);s.position.set(x,y+1.1,z);g.add(s);pinL.push(s)}
const WD=[],add=(g,a,b,c,n)=>WD.push([g,a,b,c,n]);
const KC=['#e53935','#fb8c00','#fdd835','#43a047','#1e88e5','#8e24aa','#8d6e63'];
['R1','R2','R3','R4','C1','C2','C3'].forEach((p,i)=>add('Keypad','kp.'+p,'uno.D'+(i+2),KC[i],(i<4?'Row ':'Column ')+p[1]+' scan line (D'+(i+2)+')'));
[['SDA','D10','#ec407a','SPI chip-select. Level-shift to 3.3 V'],['SCK','D13','#26c6da','SPI clock. Level-shift'],['MOSI','D11','#ab47bc','Uno to RC522 data. Level-shift'],['MISO','D12','#7cb342','RC522 to Uno data'],['RST','D9','#ffa726','Reset line. Level-shift']].forEach(a=>add('RFID','rc.'+a[0],'uno.'+a[1],a[2],a[3]));
add('RFID','rc.3V3','uno.3V3','#ff1744','Power 3.3 V only, never 5 V');add('RFID','rc.GND','uno.GND','#37474f','Ground');
add('LCD','lcd.GND','uno.GND','#37474f','Ground');add('LCD','lcd.VCC','uno.5V','#ff1744','5 V power');add('LCD','lcd.SDA','uno.A4','#29b6f6','I2C data');add('LCD','lcd.SCL','uno.A5','#ffee58','I2C clock');
for(let i=1;i<4;i++){add('Servo signal','s'+i+'.SIG','uno.A'+(i-1),'#ff9800','Servo '+i+' control (A'+(i-1)+')');add('Servo power','ps.5V','s'+i+'.VCC','#ff1744','External 5 V');add('Servo power','ps.GND','s'+i+'.GND','#6d4c41','External ground')}
add('Servo power','ps.GND','uno.GND2','#37474f','Common ground: supply GND to Uno GND');add('Buzzer','bz.+','uno.A3','#ff5252','Buzzer signal (A3)');add('Buzzer','bz.-','uno.GND','#37474f','Ground');
const WU=new Set();WD.forEach(w=>w.slice(1,3).forEach(i=>i.startsWith('uno')&&WU.add(i)));
function comp(k,t,d,x,y,z,ry){const g=new T.Group();g.position.set(x,y,z);g.rotation.y=ry||0;g.userData.info={k,t,d};S.add(g);const l=lab(t,.8);l.position.set(0,3.4,0);g.add(l);labs.push(l);return g}
box(40,.4,30,0xb98f58,0,-.3,3,S);
// Arduino Uno
const uno=comp('uno','Arduino Uno R3','ATmega328P controller: 16 MHz, 32 KB flash, 2 KB SRAM, 1 KB EEPROM. 5 V logic. Runs the menu, checks IDs and cards, saves records and drives outputs.',0,0,-4);
box(6.9,.15,5.3,0x0b6fa4,0,.1,0,uno);box(1.7,1.1,1.3,0xc0c4c8,-3,.7,-1,uno);box(1.5,1.2,1.4,0x222,-3.1,.7,1.5,uno);box(3.2,.3,.9,0x111,.8,.35,.5,uno);cyl(.25,.3,0xd32f2f,-2,.3,-.2,uno);cyl(.5,.3,0xb0b0b0,2.6,.3,1,uno);
['GND','D13','D12','D11','D10','D9','D8',0,'D7','D6','D5','D4','D3','D2','D1','D0'].forEach((n,i)=>{if(n){const x=-2.9+i*.38;box(.3,.4,.3,0x111,x,.35,-2.4,uno);pin(uno,'uno.'+n,x,.15,-2.4,n,'Uno')}});
['3V3','5V','GND','GND2','VIN',0,'A0','A1','A2','A3','A4','A5'].forEach((n,i)=>{if(n){const x=-1.9+i*.38;box(.3,.4,.3,0x111,x,.35,2.4,uno);pin(uno,'uno.'+n,x,.15,2.4,n==='GND2'?'GND':n,'Uno')}});
// RC522
const rc=comp('rc','RC522 RFID reader','13.56 MHz MIFARE reader on SPI. Reads the 4-byte card UID. Powered from 3.3 V. The UID identifies a card, it does not prove ownership.',-12,0,-5);
box(5.6,.15,4,0x1558a8,0,.1,0,rc);box(3.2,.05,2.3,0xe8eef5,-.2,.25,-.2,rc);box(1,.3,1,0x222,1.8,.3,-.5,rc);
['SDA','SCK','MOSI','MISO','IRQ',0,'GND','RST','3V3'].forEach((n,i)=>{if(n)pin(rc,'rc.'+n,-2.2+i*.55,.15,1.85,n,'RC522')});
const ring=new T.Mesh(new T.TorusGeometry(1.2,.08,8,32),new T.MeshBasicMaterial({color:0x00e676,transparent:true,opacity:0}));ring.rotation.x=Math.PI/2;ring.position.set(0,1.2,0);rc.add(ring);
// Keypad
const kp=comp('kp','4x4 Keypad (4x3 used)','Matrix keypad scanned by rows R1-R4 and columns C1-C3. Row and column lines connect to D2-D8. A / B / C choose modes, * cancels, # confirms.',12,0,-5);
box(6.4,.3,6.4,0x2d3340,0,.15,0,kp);
{const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle='#2d3340';x.fillRect(0,0,256,256);x.font='bold 34px sans-serif';x.textAlign='center';
 '123A456B789C*0#D'.split('').forEach((k,i)=>{const X=(i%4)*62+10,Y=Math.floor(i/4)*62+10;x.fillStyle=/\d/.test(k)?'#2f6fd8':'#d33';x.fillRect(X,Y,54,54);x.fillStyle='#fff';x.fillText(k,X+27,Y+38)});
 const p=new T.Mesh(new T.PlaneGeometry(5.6,5.6),new T.MeshBasicMaterial({map:new T.CanvasTexture(c)}));p.rotation.x=-Math.PI/2;p.position.set(0,.32,-.3);kp.add(p)}
['R1','R2','R3','R4','C1','C2','C3','C4'].forEach((n,i)=>{if(i<7)pin(kp,'kp.'+n,-2.1+i*.6,.15,3.3,n,'Keypad')});
// LCD
const lc=comp('lcd','16x2 I2C LCD','HD44780 character display with an I2C backpack (address often 0x27 or 0x3F). Only 4 wires: GND, VCC, SDA, SCL. Shows menus, IDs and results.',0,0,5.5);
box(8,.15,3.6,0x0a6b35,0,.1,0,lc);box(6.6,.12,2.6,0x1a2b17,0,.25,-.1,lc);box(2.8,.35,.8,0x0b2540,0,.3,1.5,lc);
const LC=document.createElement('canvas');LC.width=400;LC.height=100;const LT=new T.CanvasTexture(LC);const scr=new T.Mesh(new T.PlaneGeometry(6,1.9),new T.MeshBasicMaterial({map:LT}));scr.rotation.x=-Math.PI/2;scr.position.set(0,.33,-.1);lc.add(scr);
['GND','VCC','SDA','SCL'].forEach((n,i)=>pin(lc,'lcd.'+n,-.9+i*.6,.15,-1.6,n,'LCD'));
// Buzzer & PSU
const bz=comp('bz','Active buzzer','Beeps when given 5 V. Driven from A3: short beep for success, long low tone for ACCESS DENIED.',-10,0,6);
const bzm=cyl(1.1,1,0x111,0,.5,0,bz);pin(bz,'bz.+',-.4,.1,1.5,'+','Buzzer');pin(bz,'bz.-',.4,.1,1.5,'-','Buzzer');
const ps=comp('ps','External 5 V supply','Separate regulated 5 V supply for the 3 servos (SG90 stall current is high). Its GND must be tied to Uno GND.',12,0,6);
box(5,2,3,0x263238,0,1,0,ps);box(1.6,.2,.8,0xe53935,-1,2.05,0,ps);pin(ps,'ps.5V',-.5,.1,1.9,'+5V','Supply');pin(ps,'ps.GND',.5,.1,1.9,'GND','Supply');
// Lockers
const encl=new T.Group();encl.position.set(0,0,14);S.add(encl);const doors=[],horns=[],items=[],W5=5.8,H=4.6,D=4.6;
for(let i=0;i<3;i++){const cx=(i-1)*6.2,w=0xc9a26b;
 box(W5,.15,D,w,cx,.08,0,encl);box(W5,.15,D,w,cx,H,0,encl);box(W5,H,.15,w,cx,H/2,-D/2,encl);box(.15,H,D,w,cx-W5/2,H/2,0,encl);box(.15,H,D,w,cx+W5/2,H/2,0,encl);
 const pv=new T.Group();pv.position.set(cx-W5/2,0,D/2);encl.add(pv);box(W5-.1,H-.1,.12,0x6fb7ff,W5/2,H/2,.08,pv,{transparent:true,opacity:.45});doors.push(pv);
 items.push(box(1.6,.9,1.3,0xff7043,cx,.7,-.5,encl));
 const sv=new T.Group();sv.userData.info={k:'s'+(i+1),t:'SG90 servo '+(i+1),d:'Moves the latch for compartment '+(i+1)+'. 3 wires: signal (A'+i+'), +5 V and GND from the external supply. 0-180 degrees.'};sv.position.set(cx,H+.9,0);encl.add(sv);
 box(2.3,1.4,1.2,0x1e4d8c,0,0,0,sv);box(.6,.4,.6,0x1e4d8c,-1.4,.1,0,sv);const hg=new T.Group();hg.position.set(0,.9,0);sv.add(hg);cyl(.3,.3,0xeee,0,0,0,hg);box(1.6,.1,.3,0xeee,.7,.1,0,hg);horns.push(hg);
 const l=lab('Servo '+(i+1),.7);l.position.set(0,2,0);sv.add(l);labs.push(l);
 const l2=lab('SLOT '+(i+1),.7,'#1b5e20ee');l2.position.set(cx,H+.2-4.9,D/2+.5);l2.position.y=H+3.4;encl.add(l2);
 [['SIG',-.5],['VCC',0],['GND',.5]].forEach(([n,x])=>pin(sv,'s'+(i+1)+'.'+n,x,-.7,-.6,n,'Servo'+(i+1)));}
doors.forEach(d=>d.userData.x=0);
// Wires
const WM=[],hide=new Set(),sel=new Set();let ex=0;
function wires(){WM.forEach(m=>S.remove(m));WM.length=0;S.updateMatrixWorld(true);const th=$('#th').value/100,v=new T.Vector3();
 WD.forEach((d,i)=>{const a=A[d[1]].getWorldPosition(new T.Vector3()),b=A[d[2]].getWorldPosition(new T.Vector3()),h=1.6+(i%12)*.4+a.distanceTo(b)*.1,up=y=>new T.Vector3(0,y,0);
  const p=[a,a.clone().add(up(.6)),a.clone().lerp(b,.3).add(up(h)),a.clone().lerp(b,.7).add(up(h)),b.clone().add(up(.6)),b];
  const m=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(p),48,th,6),M(d[3],{transparent:true}));m.userData.wi=i;S.add(m);WM.push(m)});paint()}
function paint(){WM.forEach((m,i)=>{const d=WD[i];m.visible=!hide.has(d[0]);m.material.opacity=sel.size&&!sel.has(i)?.1:1})}
// Simulation
const CATS=['USB','Calculator','Keys','Wallet','Other'],CC=[0xff7043,0x8e24aa,0xfdd835,0x6d4c41,0x26a69a],UIDS=['04 A1 2B 7C','9C 3F 70 11','D2 58 0E 6A'];
let rec,nid,st='menu',buf='',tp='',cur=null,fails=0,busy=0,want=[0,0,0],cu=[0,0,0],hid=0,mask=0;
function load(){try{const j=JSON.parse(localStorage.getItem('wt')||'null');if(j){rec=j.r;nid=j.n;return}}catch(e){}rec=[0,1,2].map(i=>({n:i+1,s:'EMPTY'}));nid=1}
function save(){try{localStorage.setItem('wt',JSON.stringify({r:rec,n:nid}))}catch(e){}sl()}
function lcd(a,b){a=(a||'').padEnd(16).slice(0,16);b=(b||'').padEnd(16).slice(0,16);$('#lcd').textContent=a+'\n'+b;const x=LC.getContext('2d');x.fillStyle='#9bc23a';x.fillRect(0,0,400,100);x.fillStyle='#1c3300';x.font='bold 40px monospace';x.fillText(a,12,42);x.fillText(b,12,88);LT.needsUpdate=true}
function log(m){const l=$('#log');l.innerHTML='<div>'+new Date().toLocaleTimeString()+' '+m+'</div>'+l.innerHTML}
let ac;function tone(f,d){bzm.scale.set(1.2,1.3,1.2);setTimeout(()=>bzm.scale.set(1,1,1),d*1000);if(!$('#sn').checked)return;try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();const o=ac.createOscillator(),g=ac.createGain();o.frequency.value=f;g.gain.value=.05;o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+d)}catch(e){}}
function menu(){st='menu';buf='';cur=null;lcd('A:Dep B:Claim','C:Admin *:Back')}
function show(){lcd(tp,mask?'*'.repeat(buf.length):buf)}
function flash(a,b,ok,ms){busy=1;lcd(a,b);tone(ok?1200:200,ok?.12:.5);log(a+' '+b);setTimeout(()=>{busy=0;menu()},ms||1600)}
const pad=n=>String(n).padStart(3,'0'),find=id=>rec.find(r=>r.id===id&&r.s!=='EMPTY');
function key(k){if(busy)return;tone(900,.04);
 if(k==='*'){if(st==='dconf'){nid--;cur.s='EMPTY'}want=[0,0,0];return menu()}
 if(st==='menu'){if(k==='A'){cur=rec.find(r=>r.s==='EMPTY');if(!cur)return flash('LOCKER FULL','No free slot');st='dcat';lcd('Category 1-5','1US 2CA 3KY 4WA 5O')}
  else if(k==='B'){st='cid';buf='';mask=0;tp='CLAIM item ID:';show()}else if(k==='C'){st='apin';buf='';mask=1;tp='ADMIN PIN:';show()}else flash('INVALID OPTION','');return}
 if(st==='dcat'){const n=+k;if(n>=1&&n<=5){cur.cat=CATS[n-1];cur.id=nid++;cur.s='TEMP';want[cur.n-1]=1;st='dconf';lcd('ID '+pad(cur.id)+' SLOT '+cur.n,'Put item, press #');log('Latch '+cur.n+' open for '+cur.cat);refresh()}return}
 if(st==='dconf'){if(k==='#'){want[cur.n-1]=0;cur.s='PENDING';save();flash('DEPOSIT SAVED','Tell admin ID '+pad(cur.id),1)}return}
 if(st==='cconf'){if(k==='#'){want[cur.n-1]=0;log('Item '+pad(cur.id)+' RECOVERED');const n=cur.n;rec[n-1]={n,s:'EMPTY'};save();flash('RECOVERED','Slot free',1)}return}
 if(st==='apin'||st==='aid'||st==='cid'){if(/\d/.test(k)&&buf.length<(st==='apin'?4:3)){buf+=k;show()}else if(k==='#')submit();return}}
function submit(){if(st==='apin'){if(buf===$('#pin').value){st='aid';buf='';mask=0;tp='Item ID:';show()}else flash('WRONG PIN','Access denied')}
 else{const r=find(+buf);if(st==='aid'){if(r&&r.s!=='RECOVERED'){cur=r;st='acard';lcd('Tap claimant','card on reader')}else flash('INVALID ID','')}
  else if(!r||r.s!=='STORED')flash('ITEM NOT AVAIL',r&&r.s==='PENDING'?'Not verified':'Unknown ID');else{cur=r;st='ccard';lcd('Tap your card','Item '+pad(r.id))}}}
function tap(i){ring.material.opacity=1;log('Card '+'ABC'[i]+' UID '+UIDS[i]);if(busy)return;
 if(st==='acard'){cur.uid=UIDS[i];cur.s='STORED';save();flash('CLAIMANT','REGISTERED',1)}
 else if(st==='ccard'){if(cur.uid===UIDS[i]){fails=0;want[cur.n-1]=1;st='cconf';lcd('COLLECT ITEM','Press # when done');tone(1200,.12);log('Latch '+cur.n+' open')}
  else if(++fails>=3){fails=0;flash('TOO MANY TRIES','LOCKED 5 SEC',0,5000)}else flash('ACCESS DENIED','Tries '+fails+'/3',0)}}
function sl(){$('#sl').innerHTML='<tr><th>Slot</th><th>ID</th><th>Item</th><th>Status</th><th>Owner UID</th></tr>'+rec.map(r=>'<tr><td>'+r.n+'</td><td>'+(r.id?pad(r.id):'-')+'</td><td>'+(r.cat||'-')+'</td><td>'+r.s+'</td><td>'+(r.uid||'-')+'</td></tr>').join('');refresh()}
function refresh(){items.forEach((m,i)=>{const r=rec[i];m.visible=r.s!=='EMPTY';if(r.cat)m.material.color.setHex(CC[CATS.indexOf(r.cat)])})}
// UI
'123A456B789C*0#D'.split('').forEach(k=>{const b=document.createElement('button');b.textContent=k;if(/[A-D*#]/.test(k))b.className='f';b.onclick=()=>key(k);$('#kp').appendChild(b)});
UIDS.forEach((u,i)=>{const b=document.createElement('button');b.textContent='Card '+'ABC'[i];b.title=u;b.onclick=()=>tap(i);$('#cards').appendChild(b)});
window.addEventListener('keydown',kd=e=>{if(e.target.tagName==='INPUT')return;const k=e.key.toUpperCase();if('0123456789ABC*#'.includes(k)&&k.length===1)key(k);if(e.key==='Enter')key('#');if(e.key==='Escape')key('*')});
$('#pc').onclick=()=>{want=[0,0,0];busy=1;lcd('Booting...','Loading EEPROM');log('Power-cycle: SRAM cleared, EEPROM kept');load();sl();setTimeout(()=>{busy=0;menu()},1200)};
$('#rs').onclick=()=>{try{localStorage.removeItem('wt')}catch(e){}load();want=[0,0,0];sl();menu();log('EEPROM erased')};
$$('nav button').forEach(b=>b.onclick=()=>{$$('nav button').forEach(x=>x.classList.toggle('on',x===b));$$('.tab').forEach(t=>t.hidden=t.id!==b.dataset.t)});
function wl(){const g=[...new Set(WD.map(d=>d[0]))];$('#gr').innerHTML='';g.forEach(n=>{const b=document.createElement('button');b.className='on';b.textContent=n;b.onclick=()=>{hide.has(n)?hide.delete(n):hide.add(n);b.classList.toggle('on');paint()};$('#gr').appendChild(b)});
 $('#wl').innerHTML=WD.map((d,i)=>'<div class="w" data-i="'+i+'"><span class="sw" style="background:'+d[3]+'"></span><span><b>'+A[d[1]].userData.t+'</b> to <b>'+A[d[2]].userData.t+'</b><br><span class="mu">'+d[4]+'</span></span></div>').join('');
 $$('.w').forEach(r=>r.onclick=()=>pick(+r.dataset.i))}
function pick(i){const was=sel.size===1&&sel.has(i);sel.clear();if(!was&&i!=null)sel.add(i);$$('.w').forEach(r=>r.classList.toggle('s',sel.has(+r.dataset.i)));paint()}
function pickK(k,info){sel.clear();WD.forEach((d,i)=>{if(d[1].split('.')[0]===k||d[2].split('.')[0]===k)sel.add(i)});$$('.w').forEach(r=>r.classList.toggle('s',sel.has(+r.dataset.i)));paint();$('#info').innerHTML='<b>'+info.t+'</b><br>'+info.d+'<br>Wires: '+sel.size}
['ca','oa'].forEach(id=>$('#'+id).oninput=e=>$('#'+id+'v').textContent=e.target.value);$('#th').oninput=wires;
// Camera
let th=.35,ph=1,di=40,tg=new T.Vector3(0,2,4),pt=new Map(),pd=0,mv=0;
const V={iso:[.35,1,40,0,2,4],top:[0,.15,44,0,0,5],front:[0,1.4,32,0,3,5],encl:[.3,1.15,17,0,2,14]};
$$('[data-v]').forEach(b=>b.onclick=()=>{const v=V[b.dataset.v];th=v[0];ph=v[1];di=v[2];tg.set(v[3],v[4],v[5])});
const el=R.domElement;el.style.touchAction='none';
el.onpointerdown=e=>{el.setPointerCapture(e.pointerId);pt.set(e.pointerId,[e.clientX,e.clientY]);mv=0};
el.onpointermove=e=>{if(!pt.has(e.pointerId))return;const o=pt.get(e.pointerId);pt.set(e.pointerId,[e.clientX,e.clientY]);
 if(pt.size===1){th-=(e.clientX-o[0])*.008;ph=Math.max(.12,Math.min(1.5,ph-(e.clientY-o[1])*.008));mv+=Math.abs(e.clientX-o[0])+Math.abs(e.clientY-o[1])}
 else if(pt.size===2){const a=[...pt.values()],d=Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]);if(pd)di=Math.max(8,Math.min(80,di*pd/d));pd=d;mv=99}};
el.onpointerup=e=>{pt.delete(e.pointerId);pd=0;if(mv<5)click(e)};el.onpointercancel=e=>{pt.delete(e.pointerId);pd=0};
el.onwheel=e=>{e.preventDefault();di=Math.max(8,Math.min(80,di*(1+e.deltaY*.001)))};
const ray=new T.Raycaster();
function click(e){const r=el.getBoundingClientRect();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),C);
 const hit=ray.intersectObjects(S.children,true).find(h=>h.object.visible&&h.object.type==='Mesh'&&!(h.object.material.opacity<.5&&h.object.material.transparent&&h.object.userData.wi==null&&h.object.parent.userData.x==null&&false));
 if(!hit){sel.clear();paint();$$('.w').forEach(r=>r.classList.remove('s'));return}
 let o=hit.object;if(o.userData.wi!=null){const d=WD[o.userData.wi];pick(o.userData.wi);$('#info').innerHTML='<b>'+A[d[1]].userData.t+' to '+A[d[2]].userData.t+'</b><br>'+d[4];return}
 while(o&&!o.userData.info)o=o.parent;if(o)pickK(o.userData.info.k,o.userData.info)}
function size(){const w=wrap.clientWidth,h=wrap.clientHeight;R.setSize(w,h);C.aspect=w/h;C.updateProjectionMatrix()}const ro=new ResizeObserver(size);ro.observe(wrap);
function tick(){if(stop)return;requestAnimationFrame(tick);if($('#ar').checked&&!pt.size)th+=.003;
 C.position.set(tg.x+di*Math.sin(ph)*Math.sin(th),tg.y+di*Math.cos(ph),tg.z+di*Math.sin(ph)*Math.cos(th));C.lookAt(tg);
 const cl=+$('#ca').value,op=+$('#oa').value,sp=$('#sp').value/100;grid.visible=$('#gd').checked;labs.forEach(l=>l.visible=$('#cl').checked);pinL.forEach(l=>l.visible=$('#pl').checked);ring.material.opacity*=.93;
 for(let i=0;i<3;i++){const t=want[i]?op:cl;cu[i]+=(t-cu[i])*sp;horns[i].rotation.y=cu[i]*Math.PI/180;const k=(cu[i]-cl)/((op-cl)||1);doors[i].rotation.y=-k*1.7;doors[i].visible=$('#en').checked}
 R.render(S,C)}
load();sl();menu();size();wires();wl();tick();

return()=>{stop=true;window.removeEventListener('keydown',kd);ro.disconnect();R.dispose();R.domElement.remove()}
}
