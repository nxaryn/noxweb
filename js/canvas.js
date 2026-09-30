const sh=$('#frame').attachShadow({mode:'open'});
sh.innerHTML='<style>*{box-sizing:border-box}[data-id]{cursor:default}.dr{cursor:grab}.pv .dr{cursor:default}.sel{outline:2px solid #4FD1C5!important;outline-offset:-2px}.pv .sel{outline:0!important}body,div{margin:0}.field input,.field textarea{pointer-events:none;padding:8px;background:var(--nwx-surface);color:inherit;border:1px solid var(--nwx-border);border-radius:4px;font:inherit}.field select{pointer-events:none;padding:8px;background:var(--nwx-surface);color:inherit;border:1px solid var(--nwx-border);border-radius:4px;font:inherit}.field input[type=checkbox],.field input[type=radio]{pointer-events:none;padding:0;background:none;border:0}.field label{display:flex;gap:6px;align-items:center;margin:2px 0}.hd{position:absolute;width:10px;height:10px;background:#4FD1C5;border:1px solid #050607;pointer-events:auto;touch-action:none}#ov{position:absolute;pointer-events:none;display:none}#di,#gd{position:absolute;pointer-events:none;display:none}#lb{position:absolute;top:-19px;left:0;white-space:nowrap;background:#4FD1C5;color:#050607;font:10px system-ui;padding:1px 5px}</style><style id="fxs"></style><style id="gcs"></style><div id="r" style="font-family:system-ui,sans-serif"></div><div id="ov"><div id="lb"></div><div class="hd" data-h="x" style="right:-5px;top:calc(50% - 5px);cursor:ew-resize"></div><div class="hd" data-h="y" style="bottom:-5px;left:calc(50% - 5px);cursor:ns-resize"></div><div class="hd" data-h="xy" style="right:-5px;bottom:-5px;cursor:nwse-resize"></div></div><div id="di"></div><div id="gd"></div>';
const rootEl=sh.getElementById('r'),OV=sh.getElementById('ov'),DI=sh.getElementById('di'),GD=sh.getElementById('gd');
let SC=1,RS=null,DR=null,CG=null,suppressClick=false;
function ovl(){const e=sel&&els()[sel],t=e&&e.parent&&!document.body.classList.contains('pv')&&sh.querySelector(`[data-id="${sel}"]`);
 if(!t){OV.style.display='none';return}
 const h=$('#frame').getBoundingClientRect(),b=t.getBoundingClientRect();
 OV.querySelectorAll('.hd').forEach(h=>h.style.display=e.type==='instance'?'none':'');Object.assign(OV.style,{display:'block',left:(b.left-h.left)/SC-1+'px',top:(b.top-h.top)/SC-1+'px',width:b.width/SC+'px',height:b.height/SC+'px'});
 sh.getElementById('lb').textContent=Math.round(b.width/SC)+' × '+Math.round(b.height/SC)}
OV.addEventListener('pointerdown',ev=>{const h=ev.target.dataset&&ev.target.dataset.h;if(!h||!sel)return;
 const b=sh.querySelector(`[data-id="${sel}"]`).getBoundingClientRect();ev.target.setPointerCapture(ev.pointerId);H.key=null;
 RS={h,x:ev.clientX,y:ev.clientY,w:b.width/SC,ht:b.height/SC};ev.preventDefault()});
OV.addEventListener('pointermove',ev=>{if(!RS)return;const dx=(ev.clientX-RS.x)/SC,dy=(ev.clientY-RS.y)/SC,k='rs'+sel;
 if(RS.h.includes('x'))cStyle(sel,'width',Math.max(8,Math.round(RS.w+dx))+'px',k);
 if(RS.h.includes('y'))cStyle(sel,'height',Math.max(8,Math.round(RS.ht+dy))+'px',k)});
OV.addEventListener('pointerup',()=>{if(RS){RS=null;H.key=null;insp()}});
function eff(e){const s={...e.styles};if(bp!=='desktop')for(const k in e.responsive.tablet)if(!IXK.includes(k))s[k]=e.responsive.tablet[k];if(bp==='mobile')for(const k in e.responsive.mobile)if(!IXK.includes(k))s[k]=e.responsive.mobile[k];return s}
function ch(id,E=els(),as=null,inn=false){const e=E[id];if(e.type==='instance'){const c=cRes(e);return c?ch(c.root,c.els,inn?null:id,inn):''}const did=as||id,st=Object.entries(eff(e)).map(([k,v])=>kebab(k)+':'+v).join(';')+';'+(e.css||'').replace(/[<>]/g,''),c=(!inn&&sel===did?'sel':'')+(e.parent?' dr':''),mk=inn?'':`data-id="${did}"`;
 const tag=e.type==='body'?'div':e.type==='heading'?'h'+(e.level||2):DEF[e.type].tag;
 if(e.type==='checkbox')return`<label ${mk} class="${c} field n-${id} ${cx(e)}" style="${esc(st)}"><input type="checkbox"${e.required?' required':''}><span>${esc(e.label)}${e.required?' *':''}</span></label>`;
 if(e.type==='radio')return`<div ${mk} class="${c} field n-${id} ${cx(e)}" style="${esc(st)}"><span>${esc(e.label)}${e.required?' *':''}</span>${(e.options||'').split('\n').filter(x=>x.trim()).map(x=>`<label><input type="radio" name="n-${id}"><span>${esc(x.trim())}</span></label>`).join('')}</div>`;
 if(e.type==='file')return`<label ${mk} class="${c} field n-${id} ${cx(e)}" style="${esc(st)}"><span>${esc(e.label)}${e.required?' *':''}</span><input type="file"></label>`;
 if(e.type==='select')return`<label ${mk} class="${c} field n-${id} ${cx(e)}" style="${esc(st)}"><span>${esc(e.label)}${e.required?' *':''}</span><select>${(e.options||'').split('\n').filter(x=>x.trim()).map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>`;
 if(e.type==='html')return`<iframe ${mk} class="${c} n-${id} ${cx(e)}" sandbox srcdoc="${esc(e.code)}" style="${esc(st)};border:0;pointer-events:none"></iframe>`;
 if(e.type==='input'||e.type==='textarea'){const q=`placeholder="${esc(e.placeholder)}"${e.required?' required':''}`,ctl=e.type==='input'?`<input type="${esc(e.inputType||'text')}" ${q}>`:`<textarea rows="4" ${q}></textarea>`;
  return`<label ${mk} class="${c} field n-${id} ${cx(e)}" style="${esc(st)}"><span>${esc(e.label)}${e.required?' *':''}</span>${ctl}</label>`}
 if(e.type==='image')return`<img ${mk} class="${c} n-${id} ${cx(e)}" src="${esc(assetSrc(e))}" alt="${esc(e.alt)}" style="${esc(st)}">`;
 return`<${tag} ${mk} class="${c} n-${id} ${cx(e)}" style="${esc(st)}">${esc(e.text)}${e.children.map(k=>ch(k,E,null,as?true:inn)).join('')}</${tag}>`}
sh.addEventListener('click',ev=>{if(suppressClick){suppressClick=false;return}ev.preventDefault();if(ev.target.dataset&&ev.target.dataset.h)return;const t=ev.target.closest&&ev.target.closest('[data-id]');
 if(document.body.classList.contains('pv')){const e=t&&els()[t.dataset.id];if(e&&e.act==='page'&&e.href){const pg=pages.find(p=>(p.slug==='/'?'index.html':p.slug.slice(1)+'.html')===e.href);if(pg)switchEditorPage(pg.id)}
  else if(e&&e.act==='scroll'&&e.href){const a=Object.values(els()).find(x=>x.anchorId&&'#'+x.anchorId===e.href),n=a&&sh.querySelector('[data-id="'+a.id+'"]');if(n)n.scrollIntoView({behavior:'smooth'})}
  else if(e&&e.act==='url'&&e.href)window.open(e.href,'_blank');return}
 sel=t?t.dataset.id:null;renderAll()});
sh.addEventListener('contextmenu',ev=>{const t=ev.target.closest&&ev.target.closest('[data-id]');if(t)ctx(ev,t.dataset.id)});
function fit(){const w=DEVS[bp],avail=$('#cv').clientWidth-40,sc=Math.min(1,avail/w),f=$('#frame'),wr=$('#wrap');
 f.style.width=w+'px';f.style.transform=`scale(${sc})`;wr.style.width=w*sc+'px';wr.style.height=f.offsetHeight*sc+'px';return sc}
function canvas(){{const fc=fontCss(true);if(FFD.textContent!==fc)FFD.textContent=fc}sh.getElementById('gcs').textContent=gcss;sh.getElementById('fxs').textContent=document.body.classList.contains('pv')?KF+[page().els,...comps.map(c=>c.els)].flatMap(E=>Object.values(E)).map(e=>fx(e,'.n-'+e.id,bp)).join(''):'';rootEl.style.cssText='font-family:system-ui,sans-serif;'+Object.entries(tokens).map(([k,v])=>`--nwx-${k}:${v}`).join(';');rootEl.innerHTML=ch(page().root);const sc=fit();SC=sc;
 $('#s2').textContent=`${isPage()?'':'Component · '}${page().name} · ${bp} ${DEVS[bp]}px · zoom ${Math.round(sc*100)}%`;ovl()}
function startDrag(ev,id){const e=els()[id];if(!e||!e.parent)return;
 const ef=eff(e),free=ef.position==='absolute'||ef.position==='fixed';
 const t=sh.querySelector(`[data-id="${id}"]`);if(!t)return;
 t.setPointerCapture(ev.pointerId);
 const f=$('#frame').getBoundingClientRect(),b=t.getBoundingClientRect();
 const rect={left:(b.left-f.left)/SC,top:(b.top-f.top)/SC,width:b.width/SC,height:b.height/SC};
 if(free){
  const op=t.offsetParent||sh.getElementById('r'),ob=op.getBoundingClientRect();
  CG={id,x:ev.clientX,y:ev.clientY,mode:'free',pos:{left:(b.left-ob.left)/SC,top:(b.top-ob.top)/SC},moved:false};
 }else{
  const g=t.cloneNode(true);g.classList.remove('sel');g.id='ghost';
  const inline=g.style.cssText;
  g.style.cssText=`position:absolute;left:${rect.left}px;top:${rect.top}px;opacity:.55;pointer-events:none;z-index:40;${inline}`;
  g.style.width=rect.width+'px';g.style.height=rect.height+'px';
  sh.appendChild(g);
  CG={id,x:ev.clientX,y:ev.clientY,mode:'flow',rect,ox:0,oy:0,moved:false,drop:null};
 }
 ev.preventDefault()}
function dropTarget(cx,cy){const el=sh.elementFromPoint(cx,cy),n=el&&el.closest&&el.closest('[data-id]');
 if(!n)return null;
 const id=n.dataset.id,e=els()[id];if(!e)return null;
 for(let p=id;p;p=els()[p].parent)if(p===CG.id)return null;
 const f=$('#frame').getBoundingClientRect(),b=n.getBoundingClientRect();
 const r={left:(b.left-f.left)/SC,top:(b.top-f.top)/SC,width:b.width/SC,height:b.height/SC};
 const pe=els()[e.parent],pd=pe?eff(pe):null,dir=pd?(pd.display==='grid'||(pd.flexDirection||'column').startsWith('row')?'row':'column'):'column';
 const fx=(cx-b.left)/b.width,fy=(cy-b.top)/b.height;
 let mode;
 if(e.type==='body')mode='in';
 else if(['section','div','form'].includes(e.type)&&fx>.25&&fx<.75&&fy>.25&&fy<.75)mode='in';
 else if(dir==='row')mode=fx<.5?'before':'after';
 else mode=fy<.5?'before':'after';
 return{id,mode,rect:r,dir}}
function showDrop(dt){if(!dt){DI.style.display='none';return}
 const r=dt.rect;
 if(dt.mode==='in'){DI.style.cssText=`display:block;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;border:2px dashed #4FD1C5;background:rgba(79,209,197,.08)`;return}
 const row=dt.dir==='row';
 if(dt.mode==='before')DI.style.cssText=row?`display:block;left:${r.left-1}px;top:${r.top}px;width:2px;height:${r.height}px;background:#4FD1C5`:`display:block;left:${r.left}px;top:${r.top-1}px;width:${r.width}px;height:2px;background:#4FD1C5`;
 else DI.style.cssText=row?`display:block;left:${r.left+r.width-1}px;top:${r.top}px;width:2px;height:${r.height}px;background:#4FD1C5`:`display:block;left:${r.left}px;top:${r.top+r.height-1}px;width:${r.width}px;height:2px;background:#4FD1C5`}
function alignGuides(l,t,w,h){const f=$('#frame').getBoundingClientRect(),TH=6;
 const R={l,t,r:l+w,b:t+h,cx:l+w/2,cy:t+h/2};
 let sx=0,sy=0,bx=TH,by=TH;
 const lines=[];
 Object.values(els()).forEach(e=>{if(e.id===CG.id)return;
  const n=sh.querySelector(`[data-id="${e.id}"]`);if(!n)return;
  const b=n.getBoundingClientRect();
  const r={l:(b.left-f.left)/SC,t:(b.top-f.top)/SC,r:(b.right-f.left)/SC,b:(b.bottom-f.top)/SC,cx:(b.left+b.right)/2/SC-f.left/SC,cy:(b.top+b.bottom)/2/SC-f.top/SC};
  [[R.l,r.l],[R.cx,r.cx],[R.r,r.r]].forEach(([a,c])=>{const d=a-c;if(Math.abs(d)<TH){const y1=Math.min(R.t,r.t),y2=Math.max(R.b,r.b);lines.push({v:1,x:c,y1,y2});if(Math.abs(d)<bx){bx=Math.abs(d);sx=-d}}});
  [[R.t,r.t],[R.cy,r.cy],[R.b,r.b]].forEach(([a,c])=>{const d=a-c;if(Math.abs(d)<TH){const x1=Math.min(R.l,r.l),x2=Math.max(R.r,r.r);lines.push({v:0,y:c,x1,x2});if(Math.abs(d)<by){by=Math.abs(d);sy=-d}}})});
 GD.innerHTML=lines.map(L=>L.v?`<div style="position:absolute;left:${L.x}px;top:${L.y1}px;width:1px;height:${L.y2-L.y1}px;background:#4FD1C5"></div>`:`<div style="position:absolute;left:${L.x1}px;top:${L.y}px;width:${L.x2-L.x1}px;height:1px;background:#4FD1C5"></div>`).join('');
 GD.style.display=lines.length?'block':'none';
 return{sx,sy}}
function moveDrag(ev){if(!CG)return;
 const dx=(ev.clientX-CG.x)/SC,dy=(ev.clientY-CG.y)/SC;
 if(!CG.moved&&Math.hypot(dx,dy)<2)return;
 CG.moved=true;
 if(CG.mode==='free'){
  const k='mv'+CG.id;
  cStyle(CG.id,'left',Math.round(CG.pos.left+dx)+'px',k);
  cStyle(CG.id,'top',Math.round(CG.pos.top+dy)+'px',k);
 }else{
  const s=alignGuides(CG.rect.left+dx,CG.rect.top+dy,CG.rect.width,CG.rect.height);
  CG.ox=dx+s.sx;CG.oy=dy+s.sy;
  const g=sh.getElementById('ghost');
  if(g){g.style.left=(CG.rect.left+CG.ox)+'px';g.style.top=(CG.rect.top+CG.oy)+'px'}
  const dt=dropTarget(ev.clientX,ev.clientY);
  CG.drop=dt;
  showDrop(dt)}}
function endDrag(){if(!CG)return;const d=CG;CG=null;
 const g=sh.getElementById('ghost');if(g)g.remove();
 DI.style.display='none';GD.style.display='none';
 if(!d.moved)return;
 suppressClick=true;
 if(d.mode==='flow'&&d.drop)cMoveTo(d.id,d.drop.id,d.drop.mode);
 else{sel=d.id;renderAll()}}
sh.addEventListener('pointerdown',ev=>{suppressClick=false;if(document.body.classList.contains('pv'))return;
 if(ev.target.dataset&&ev.target.dataset.h)return;
 const t=ev.target.closest&&ev.target.closest('[data-id]');if(!t)return;
 const tag=ev.target.tagName;if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'||tag==='IFRAME')return;
 startDrag(ev,t.dataset.id)});
sh.addEventListener('pointermove',ev=>{if(CG)moveDrag(ev)});
sh.addEventListener('pointerup',()=>{if(CG)endDrag()});