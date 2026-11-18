const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');
const delay = ms => new Promise(r => setTimeout(r, ms));
const out = path.resolve('docs/revision-e4');
fs.mkdirSync(out, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-portfolio-e4-'));
const server = spawn(process.execPath, ['dist/portafolio-web/server/server.mjs'], {env:{...process.env,PORT:'4198'},windowsHide:true,stdio:'ignore'});
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--disable-gpu','--no-first-run','--disable-extensions','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'], {windowsHide:true,stdio:'ignore'});
let socket;
(async () => {
  let port;
  for(let i=0;i<100 && !port;i++){try{port=fs.readFileSync(path.join(profile,'DevToolsActivePort'),'utf8').split('\n')[0];}catch{await delay(150);}}
  assert(port,'Chrome debugging port unavailable');
  for(let i=0;i<100;i++){try{if((await fetch('http://localhost:4198')).ok)break;}catch{}await delay(100);}
  const pages=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  socket=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
  await new Promise(r=>socket.addEventListener('open',r,{once:true}));
  const pending=new Map(), errors=[];
  let id=0;
  socket.addEventListener('message',e=>{const msg=JSON.parse(e.data);if(msg.id){const p=pending.get(msg.id);if(p){clearTimeout(p.timer);pending.delete(msg.id);msg.error?p.reject(msg.error):p.resolve(msg.result);}}if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails);if(msg.method==='Log.entryAdded'&&msg.params.entry.level==='error')errors.push(msg.params.entry.text);});
  const command=(method,params={})=>new Promise((resolve,reject)=>{const n=++id;pending.set(n,{resolve,reject,timer:setTimeout(()=>reject(Error(method+' timeout')),12000)});socket.send(JSON.stringify({id:n,method,params}));});
  const evaluate=async expression=>{const r=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
  await command('Page.enable');await command('Runtime.enable');await command('Log.enable');
  const ready=async route=>{for(let i=0;i<100;i++){if(await evaluate(`location.pathname===${JSON.stringify(route.split('?')[0].split('#')[0])} && !!document.querySelector('main h1')`)){await delay(180);return;}await delay(100);}throw Error('Route not ready: '+route);};
  const navigate=async route=>{await command('Page.navigate',{url:'http://localhost:4198'+route});await ready(route);};
  const viewport=async width=>{await command('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:false});await delay(120);};
  const screenshot=async name=>{const r=await command('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(path.join(out,name+'.png'),Buffer.from(r.data,'base64'));};
  const scrollTo=async selector=>{await evaluate(`scrollTo({top:document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect().top+scrollY-24,behavior:'instant'})`);await delay(100);};
  const checks=[];
  for(const route of ['/','/sobre-mi','/formacion','/experiencia','/habilidades','/proyectos','/servicios','/contacto']){
    await navigate(route);
    for(const width of [320,375,390,768,1024,1440]){
      await viewport(width);
      const r=await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,main:document.querySelectorAll('main').length,h1:document.querySelectorAll('main h1').length})`);
      assert(r.scrollWidth<=width+1,route+' overflow '+width);assert.equal(r.main,1);assert.equal(r.h1,1);checks.push({route,...r});
      if(['/servicios','/contacto'].includes(route)&&[390,1440].includes(width)){await evaluate(`scrollTo({top:0,behavior:'instant'})`);await screenshot(route.slice(1)+(width===390?'-movil':'-escritorio'));}
    }
  }
  const planChecks=[];
  for(const [plan,price] of [['emprendedor','₡75.000'],['profesional','₡120.000'],['personalizado','₡180.000']]){
    await navigate('/servicios');
    await command('Page.bringToFront');await command('Emulation.setFocusEmulationEnabled',{enabled:true});
    await evaluate(`document.querySelector('a[href="/contacto?plan=${plan}#cotizar"]').focus()`);
    await command('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',windowsVirtualKeyCode:13,text:'\r',unmodifiedText:'\r'});
    await command('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    await ready('/contacto');await delay(900);
    const r=await evaluate(`({url:location.pathname+location.search+location.hash,plan:document.querySelector('.selected-plan')?.textContent,whatsapp:document.querySelector('#cotizar a[href^="https://wa.me/"]').href,email:document.querySelector('#cotizar a[href^="mailto:"]').href,top:document.querySelector('#cotizar').getBoundingClientRect().top})`);
    assert.equal(r.url,`/contacto?plan=${plan}#cotizar`);assert(r.plan.includes(price));assert(new URL(r.whatsapp).searchParams.get('text').toLowerCase().includes('plan '+plan));assert(decodeURIComponent(r.email).toLowerCase().includes('consulta del plan '+plan));assert(Math.abs(r.top)<40);planChecks.push(r);
  }
  await screenshot('consulta-plan-escritorio');
  await viewport(390);await scrollTo('#cotizar');await screenshot('consulta-plan-movil');
  await evaluate(`document.querySelector('#cotizar a[href="/contacto#cotizar"]').click()`);await delay(600);
  assert.equal(await evaluate(`document.querySelector('.selected-plan')`),null);
  assert.equal(await evaluate('location.search'),'');
  await navigate('/contacto?plan=%3Cscript%3Ealert(1)%3C/script%3E');
  assert.equal(await evaluate(`document.querySelector('.selected-plan')`),null);
  const contacts=await evaluate(`({employment:document.querySelector('#oportunidad-laboral a[href^="mailto:"]').href,quote:document.querySelector('#cotizar a[href^="mailto:"]').href,email:document.querySelector('.contact-email').textContent,external:[...document.querySelectorAll('main a[target="_blank"]')].map(a=>({href:a.href,rel:a.rel,label:a.textContent})),forms:document.querySelectorAll('main form').length})`);
  assert(decodeURIComponent(contacts.employment).includes('Oportunidad laboral'));assert(decodeURIComponent(contacts.quote).includes('Cotización de proyecto'));assert.equal(contacts.email,'juanparojasc1999@gmail.com');assert.equal(contacts.forms,0);
  for(const link of contacts.external){assert(link.rel.includes('noopener')&&link.rel.includes('noreferrer'));assert(link.label.includes('abre en otra pestaña'));}
  const textZoom=[];
  for(const route of ['/servicios','/contacto']){await navigate(route);await viewport(1440);await evaluate(`document.documentElement.style.fontSize='200%'`);await delay(200);const r=await evaluate(`({route:location.pathname,width:innerWidth,scrollWidth:document.documentElement.scrollWidth})`);assert(r.scrollWidth<=1441);textZoom.push(r);await evaluate(`document.documentElement.style.fontSize=''`);}
  await navigate('/servicios');await viewport(1440);await scrollTo('.plans-grid');await screenshot('planes-escritorio');await viewport(390);await scrollTo('.plans-grid');await screenshot('planes-movil');
  await navigate('/contacto');await viewport(1440);await scrollTo('.contact-details');await screenshot('canales-escritorio');await viewport(390);await scrollTo('.contact-details');await screenshot('canales-movil');
  const cv=await fetch('http://localhost:4198/assets/documents/CV_Juan_Pablo_Rojas_Contreras.pdf');assert.equal(cv.status,200);
  assert.equal(errors.length,0,JSON.stringify(errors));
  const report={date:new Date().toISOString(),checks,planChecks,keyboardPlanNavigation:true,resetPlan:true,unknownPlanIgnored:true,contacts,textZoom200Percent:textZoom,cvStatus:cv.status,consoleErrors:errors};
  fs.writeFileSync(path.join(out,'verificacion.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({responsiveChecks:checks.length,planChecks:planChecks.length,keyboard:true,textZoomChecks:textZoom.length,cvStatus:cv.status,consoleErrors:errors}));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{if(socket)socket.close();chrome.kill();server.kill();});
