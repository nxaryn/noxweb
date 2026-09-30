function gen(embed=true){let rv=0,used=0,c=0,css='',m={tablet:'',mobile:''},files='',vm=0;
 const rule=(cl,o)=>Object.keys(o).length?`.${cl}{${Object.entries(o).map(([k,v])=>kebab(k)+':'+v).join(';')}}\n`:'';
 const so=o=>Object.fromEntries(Object.entries(o).filter(([k])=>!IXK.includes(k)));
 pages.forEach(pg=>{const E=pg.els;
  const h=(id,d,E=pg.els)=>{const e=E[id];if(e.type==='instance'){const c=cRes(e);return c?h(c.root,d,c.els):''}const cl=`nwx-${e.type}-${++c}`,pad='  '.repeat(d);
   css+=rule(cl,e.styles);css+=fx(e,'.'+cl,'desktop');if(hasAnim(e))used=1;const K=(e.cls?' '+esc(e.cls.replace(/[^\w\- ]/g,'')):'')+(e.reveal?(rv=1,' nwx-reveal'):'');if((e.css||'').trim())css+=`.${cl}{${e.css.replace(/[<>]/g,'')}}\n`;m.tablet+=rule(cl,so(e.responsive.tablet))+fx(e,'.'+cl,'tablet');m.mobile+=rule(cl,so(e.responsive.mobile))+fx(e,'.'+cl,'mobile');
   const tag=e.type==='body'?'body':e.type==='heading'?'h'+(e.level||2):DEF[e.type].tag;
   if(e.type==='html')return`${pad}<div class="${cl}${K}">${e.code||''}</div>\n`;
   const fl={vm:0},fh=fieldHtml(e,cl,K,pad,fl);if(fl.vm)vm=1;if(fh)return fh;
   if(e.type==='image')return`${pad}<img class="${cl}${K}" src="${esc(aOut(e,embed))}" alt="${esc(e.alt)}" loading="lazy">\n`;
   const T=tag==='button'&&e.type==='button'&&e.href?'a':tag;
   return`${pad}<${T} class="${cl}${K}"${e.anchorId?` id="${esc(e.anchorId.replace(/[^\w-]/g,''))}"`:''}${T==='a'?` href="${esc(e.href)}"`:tag==='button'?(e.type==='submit'?' type="submit"':' type="button"'):tag==='form'?` action="${esc(e.action)}" method="post"`:''}>${esc(e.text)}${e.children.length?'\n'+e.children.map(x=>h(x,d+1,E)).join('')+pad:''}</${T}>\n`};
  files+=`<!-- ${pg.slug==='/'?'index':pg.slug.slice(1)}.html -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${esc(pg.title||pg.name)}</title>\n<meta name="description" content="${esc(pg.desc)}">\n<meta name="robots" content="${esc(pg.robots||'index,follow')}">\n${pg.canonical?`<link rel="canonical" href="${esc(pg.canonical)}">\n`:''}<meta property="og:title" content="${esc(pg.ogTitle||pg.title||pg.name)}">\n<meta property="og:description" content="${esc(pg.ogDesc||pg.desc)}">\n<link rel="stylesheet" href="css/styles.css">\n</head>\n${(t=>{if(rv)t=t.replace(/<\/body>\n$/,RVS+'</body>\n');if(vm)t=t.replace(/<\/body>\n$/,VMS+'</body>\n');return t})(h(pg.root,0))}</html>\n\n`});
 css=':root{'+Object.entries(tokens).map(([k,v])=>`--nwx-${k}:${v}`).join(';')+'}\n'+fontCss(embed)+'body{margin:0;font-family:system-ui,sans-serif}\n*{box-sizing:border-box}\n.nwx-field input,.nwx-field textarea,.nwx-field select{padding:8px;background:var(--nwx-surface);color:inherit;border:1px solid var(--nwx-border);border-radius:4px;font:inherit}\n.nwx-field input[type=checkbox],.nwx-field input[type=radio]{padding:0;width:auto}\n.nwx-field fieldset{border:1px solid var(--nwx-border);border-radius:4px;padding:8px 12px;margin:0}\n.nwx-field fieldset legend{padding:0 4px}\n.nwx-field fieldset label{display:flex;gap:6px;align-items:center}\na[class^="nwx-button"]{text-decoration:none;display:inline-block}\n'+(used?KF:'')+(rv?RV:'')+css+(m.tablet?`@media (max-width:${bps.tablet}px){\n${m.tablet}}\n`:'')+(m.mobile?`@media (max-width:${bps.mobile}px){\n${m.mobile}}\n`:'')+(gcss.trim()?'/* custom css */\n'+gcss+'\n':'');
 const seo='<!-- sitemap.xml -->\n<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+pages.filter(p=>!/noindex/i.test(p.robots||'')).map(p=>`  <url><loc>${esc(p.canonical||p.slug)}</loc></url>\n`).join('')+'</urlset>\n\n# robots.txt\nUser-agent: *\nAllow: /\nSitemap: /sitemap.xml\n';
 return{files,css,seo}}
const RV='@media (scripting:enabled){.nwx-reveal{opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s}.nwx-reveal.in{opacity:1;transform:none}}\n';
const RVS='<script>const o=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");o.unobserve(x.target)}}));document.querySelectorAll(".nwx-reveal").forEach(e=>o.observe(e))<\/script>\n';
const VMS='<script>document.querySelectorAll("[data-vmsg]").forEach(x=>{x.addEventListener("invalid",()=>x.setCustomValidity(x.dataset.vmsg));x.addEventListener("input",()=>x.setCustomValidity(""));x.addEventListener("change",()=>x.setCustomValidity(""))})<\/script>\n';
const KF='@keyframes nwx-fade{from{opacity:0}}@keyframes nwx-slide{from{opacity:0;transform:translateY(24px)}}@keyframes nwx-scale{from{opacity:0;transform:scale(.92)}}\n';
function ixProps(e,bp){const o={};IXK.forEach(k=>{if(e[k]!==undefined&&e[k]!=='')o[k]=e[k]});
 if(bp==='tablet'||bp==='mobile')for(const k in e.responsive.tablet)if(IXK.includes(k)&&e.responsive.tablet[k]!=='')o[k]=e.responsive.tablet[k];
 if(bp==='mobile')for(const k in e.responsive.mobile)if(IXK.includes(k)&&e.responsive.mobile[k]!=='')o[k]=e.responsive.mobile[k];
 return o}
function fxRules(p,S){let o='';const t=[],v=[];
 if(+p.hScale)t.push(`scale(${p.hScale})`);if(+p.hY)t.push(`translateY(${p.hY}px)`);
 if(t.length)v.push('transform:'+t.join(' '));if(p.hOpacity!==undefined&&p.hOpacity!=='')v.push('opacity:'+p.hOpacity);if(p.hBg)v.push('background:'+p.hBg);
 if(v.length)o+=`${S}{transition:all .2s ease}\n${S}:hover{${v.join(';')}}\n`;
 if(p.anim&&p.anim!=='none')o+=`${S}{animation:nwx-${p.anim} ${+p.dur||500}ms ease ${+p.delay||0}ms both}\n`;return o}
function fx(e,S,bp){if(bp&&bp!=='desktop'&&!IXK.some(k=>(e.responsive[bp]||{})[k]!==undefined&&e.responsive[bp][k]!==''))return'';return fxRules(ixProps(e,bp||'desktop'),S)}
function hasAnim(e){return['desktop','tablet','mobile'].some(b=>{const p=ixProps(e,b);return p.anim&&p.anim!=='none'})}
function efx(e){return ixProps(e,bp)}
const cx=e=>esc((e.cls||'').replace(/[^\w\- ]/g,''));
function cssInfo(t){if(!t.trim())return'';let d=0;for(const c of t){if(c==='{')d++;if(c==='}')d--;if(d<0)break}
 let n=0;try{const ss=new CSSStyleSheet();ss.replaceSync(t);n=ss.cssRules.length}catch(e){return'⚠ '+e.message}
 return d!==0?'⚠ Unbalanced braces':'✓ '+n+' rule'+(n===1?'':'s')+' parsed'}
function declInfo(t){const a=(t||'').split(';').map(x=>x.trim()).filter(Boolean);if(!a.length)return'';const d=document.createElement('div').style;let ok=0;a.forEach(x=>{d.cssText='';d.cssText=x;if(d.length)ok++});return ok===a.length?'✓ '+ok+' valid':'⚠ '+ok+' of '+a.length+' valid'}
function fieldHtml(e,cl,K,pad,fl){const nm=esc((e.label||e.type).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_|_$/g,'')||e.type),rq=e.required?' required':'',vmsg=e.vmsg?(fl&&(fl.vm=1),` data-vmsg="${esc(e.vmsg)}"`):'';
 switch(e.type){
  case'checkbox':return`${pad}<label class="${cl}${K} nwx-field"><input type="checkbox" name="${nm}"${rq}${vmsg}><span>${esc(e.label)}</span></label>\n`;
  case'select':return`${pad}<label class="${cl}${K} nwx-field"><span>${esc(e.label)}${e.required?' *':''}</span><select name="${nm}"${rq}${vmsg}>${(e.options||'').split('\n').filter(x=>x.trim()).map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>\n`;
  case'radio':return`${pad}<fieldset class="${cl}${K} nwx-field"><legend>${esc(e.label)}${e.required?' *':''}</legend>${(e.options||'').split('\n').filter(x=>x.trim()).map(x=>`<label><input type="radio" name="${nm}" value="${esc(x.trim())}"${rq}${vmsg}><span>${esc(x.trim())}</span></label>`).join('')}</fieldset>\n`;
  case'input':case'textarea':case'file':{const ctl=e.type==='textarea'?`<textarea rows="4" name="${nm}" placeholder="${esc(e.placeholder)}"${rq}${vmsg}></textarea>`:e.type==='file'?`<input type="file" name="${nm}"${rq}${vmsg}>`:`<input type="${esc(e.inputType||'text')}" name="${nm}" placeholder="${esc(e.placeholder)}"${rq}${vmsg}>`;
   return`${pad}<label class="${cl}${K} nwx-field"><span>${esc(e.label)}${e.required?' *':''}</span>${ctl}</label>\n`}
 }
 return null}
function pageHtml(pg){let c=0,rv=0,vm=0;
 const h=(id,d,E=pg.els)=>{const e=E[id];if(e.type==='instance'){const c=cRes(e);return c?h(c.root,d,c.els):''}const cl=`nwx-${e.type}-${++c}`,pad='  '.repeat(d);
  const K=(e.cls?' '+esc(e.cls.replace(/[^\w\- ]/g,'')):'')+(e.reveal?(rv=1,' nwx-reveal'):'');
  const tag=e.type==='body'?'body':e.type==='heading'?'h'+(e.level||2):DEF[e.type].tag;
  if(e.type==='html')return`${pad}<div class="${cl}${K}">${e.code||''}</div>\n`;
  const fl={vm:0},fh=fieldHtml(e,cl,K,pad,fl);if(fl.vm)vm=1;if(fh)return fh;
  if(e.type==='image')return`${pad}<img class="${cl}${K}" src="${esc(aOut(e,false))}" alt="${esc(e.alt)}" loading="lazy">\n`;
  const T=tag==='button'&&e.type==='button'&&e.href?'a':tag;
  return`${pad}<${T} class="${cl}${K}"${e.anchorId?` id="${esc(e.anchorId.replace(/[^\w-]/g,''))}"`:''}${T==='a'?` href="${esc(e.href)}"`:tag==='button'?(e.type==='submit'?' type="submit"':' type="button"'):tag==='form'?` action="${esc(e.action)}" method="post"`:''}>${esc(e.text)}${e.children.length?'\n'+e.children.map(x=>h(x,d+1,E)).join('')+pad:''}</${T}>\n`};
 let body=h(pg.root,0);
 if(rv)body=body.replace(/<\/body>\n$/,RVS+'</body>\n');
 if(vm)body=body.replace(/<\/body>\n$/,VMS+'</body>\n');
 return`<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${esc(pg.title||pg.name)}</title>\n<meta name="description" content="${esc(pg.desc)}">\n<meta name="robots" content="${esc(pg.robots||'index,follow')}">\n${pg.canonical?`<link rel="canonical" href="${esc(pg.canonical)}">\n`:''}<meta property="og:title" content="${esc(pg.ogTitle||pg.title||pg.name)}">\n<meta property="og:description" content="${esc(pg.ogDesc||pg.desc)}">\n<link rel="stylesheet" href="css/styles.css">\n</head>\n${body}</html>\n`}
let codePg=null,ghDirty=false;
function codetab(){if($('#p-cd').hidden)return;const pg=page();
 if(codePg!==pg.id){ghDirty=false;codePg=pg.id}
 if(!ghDirty)$('#gh').value=pageHtml(pg);
 $('#ghp').textContent=pg.name+' ('+(isPage()?pg.slug:'component')+')';
 $('#gs').textContent=cssInfo(gcss)}
function applyCode(){const src=$('#gh').value,pg=page();if(!pg)return;
 let doc;try{doc=new DOMParser().parseFromString(src,'text/html')}catch(e){$('#gs2').textContent='⚠ '+e.message;return}
 if(!doc.body){$('#gs2').textContent='⚠ No <body> found';return}
 const E=pg.els,st={add:0,del:0};
 if(isPage()){
  pg.title=doc.title||pg.name;
  const md=doc.querySelector('meta[name=description]');pg.desc=md?md.getAttribute('content')||'':'';
  const rb=doc.querySelector('meta[name=robots]');pg.robots=rb?rb.getAttribute('content')||'index,follow':'index,follow';
  const cn=doc.querySelector('link[rel=canonical]');pg.canonical=cn?cn.getAttribute('href')||'':'';
  const og=doc.querySelector('meta[property="og:title"]');pg.ogTitle=og?og.getAttribute('content')||'':'';
  const ogd=doc.querySelector('meta[property="og:description"]');pg.ogDesc=ogd?ogd.getAttribute('content')||'':'';
 }
 const rootDom=E[pg.root].type==='body'?doc.body:doc.body.firstElementChild;
 if(!rootDom){$('#gs2').textContent='⚠ No content found';return}
 ghDirty=false;
 try{run(()=>{syncNode(rootDom,pg.root,E,st)},'code',false)}catch(err){$('#gs2').textContent='⚠ '+err.message;return}
 $('#gs2').textContent='✓ Applied'+(st.add||st.del?` — +${st.add} added, −${st.del} removed`:'')}
function syncNode(dom,mid,E,st){const e=E[mid];if(!e)return;
 updateProps(e,dom);
 if(e.type==='html'){e.code=dom.innerHTML;return}
 if(e.type==='instance'){const c=cRes(e);if(c)syncChildren(dom,c.root,c.els,st);return}
 if(e.children.length)syncChildren(dom,mid,E,st)}
function syncChildren(dom,mid,E,st){const e=E[mid],domKids=[...dom.children].filter(n=>n.nodeType===1),nc=[];let j=0;
 for(let i=0;i<domKids.length;i++){const dn=domKids[i];
  if(j<e.children.length&&matches(dn,e.children[j],E)){syncNode(dn,e.children[j],E,st);nc.push(e.children[j]);j++}
  else{let k=j+1;while(k<e.children.length&&!matches(dn,e.children[k],E))k++;
   if(k<e.children.length){syncNode(dn,e.children[k],E,st);nc.push(e.children[k]);j=k+1}
   else{const nid=createFromDom(dn,mid,E,st);if(nid)nc.push(nid)}}}
 for(;j<e.children.length;j++){killTree(E,e.children[j]);st.del++}
 e.children=nc}
function matches(dn,cid,E){const e=E[cid];if(!e)return false;const tag=dn.tagName.toLowerCase();
 switch(e.type){
  case'checkbox':case'select':case'input':case'textarea':case'file':return tag==='label';
  case'radio':return tag==='fieldset';
  case'html':return tag==='div';
  case'body':return tag==='body';
  case'heading':return /^h[1-6]$/.test(tag);
  case'button':case'submit':return tag==='button'||tag==='a';
  default:return tag===DEF[e.type].tag}}
function createFromDom(dn,par,E,st){const tag=dn.tagName.toLowerCase(),cls=(dn.getAttribute('class')||'').split(/\s+/).find(x=>x.startsWith('nwx-')),t=cls?cls.split('-')[1]:null;
 let type=t&&DEF[t]?t:inferType(tag);
 if(tag==='button'&&dn.getAttribute('type')==='submit')type='submit';
 if(!type||!DEF[type])return null;
 const e=mkEl(type,par);e.id=uid();E[e.id]=e;st.add++;
 syncNode(dn,e.id,E,st);
 return e.id}
function inferType(tag){switch(tag){
 case'body':return'body';
 case'h1':case'h2':case'h3':case'h4':case'h5':case'h6':return'heading';
 case'p':return'paragraph';
 case'button':case'a':return'button';
 case'img':return'image';
 case'form':return'form';
 case'label':return'input';
 case'fieldset':return'radio';
 case'select':return'select';
 case'textarea':return'textarea';
 case'section':case'div':case'header':case'footer':case'main':case'nav':case'article':case'aside':return'div';
 default:return null}}
function updateProps(e,dom){const cls=(dom.getAttribute('class')||'').split(/\s+/).filter(x=>x&&!x.startsWith('nwx-')).join(' ');
 e.cls=cls;e.reveal=(dom.getAttribute('class')||'').includes('nwx-reveal');
 const aid=dom.getAttribute('id');e.anchorId=aid&&!aid.startsWith('nwx-')?aid:'';
 const tag=dom.tagName.toLowerCase();
 switch(e.type){
  case'heading':{e.text=dom.textContent;const m=tag.match(/^h([1-6])$/);if(m)e.level=m[1];break}
  case'button':case'submit':{e.text=dom.textContent;
   if(tag==='a')e.href=dom.getAttribute('href')||'';
   else{const ty=dom.getAttribute('type');if(ty==='submit'&&e.type==='button')e.type='submit';else if(ty==='button'&&e.type==='submit')e.type='button';if(e.type==='button')e.href=''}
   break}
  case'paragraph':e.text=dom.textContent;break;
  case'form':e.action=dom.getAttribute('action')||'';break;
  case'image':e.alt=dom.getAttribute('alt')||'';break;
  case'checkbox':{const sp=dom.querySelector('span');if(sp)e.label=sp.textContent;const ip=dom.querySelector('input');if(ip){e.required=ip.hasAttribute('required');e.vmsg=ip.getAttribute('data-vmsg')||''}break}
  case'select':{const sp=dom.querySelector('span');if(sp)e.label=sp.textContent.replace(/\s*\*$/,'');const sl=dom.querySelector('select');if(sl){e.required=sl.hasAttribute('required');e.vmsg=sl.getAttribute('data-vmsg')||'';e.options=[...sl.querySelectorAll('option')].map(o=>o.textContent).join('\n')}break}
  case'radio':{const lg=dom.querySelector('legend');if(lg)e.label=lg.textContent.replace(/\s*\*$/,'');const ips=[...dom.querySelectorAll('input[type=radio]')];if(ips.length){e.required=ips.some(i=>i.hasAttribute('required'));e.vmsg=ips[0].getAttribute('data-vmsg')||'';e.options=ips.map(i=>i.getAttribute('value')||(i.parentElement.querySelector('span')||{}).textContent||'').join('\n')}break}
  case'input':case'textarea':case'file':{const sp=dom.querySelector('span');if(sp)e.label=sp.textContent.replace(/\s*\*$/,'');const ctl=dom.querySelector('input,textarea');if(ctl){e.required=ctl.hasAttribute('required');e.vmsg=ctl.getAttribute('data-vmsg')||'';if(e.type==='input'){e.inputType=ctl.getAttribute('type')||'text';e.placeholder=ctl.getAttribute('placeholder')||''}else if(e.type==='textarea'){e.placeholder=ctl.getAttribute('placeholder')||''}}break}
 }}
function checks(){const out=[];
 const walk=(E,id,lab,st)=>{const e=E[id];
  if(e.type==='image'&&!(e.alt||'').trim())out.push(`${lab}: image "${e.name}" is missing alt text.`);
  if((e.type==='button'||e.type==='submit')&&!(e.text||'').trim())out.push(`${lab}: button "${e.name}" has no label.`);
  if(['input','textarea','checkbox','select','radio','file'].includes(e.type)&&!(e.label||'').trim())out.push(`${lab}: field "${e.name}" has no label.`);
  if(e.type==='heading'){const l=+e.level||2;if(st.l&&l>st.l+1)out.push(`${lab}: heading jumps from H${st.l} to H${l}.`);if(l===1)st.h1++;st.l=l}
  e.children.forEach(c=>walk(E,c,lab,st))};
 pages.forEach(pg=>{const st={l:0,h1:0};walk(pg.els,pg.root,pg.name,st);if(!st.h1)out.push(`${pg.name}: no H1 heading.`);if(st.h1>1)out.push(`${pg.name}: more than one H1 heading.`)});
 comps.forEach(c=>walk(c.els,c.root,'Component '+c.name,{l:0,h1:0}));return out}
function openEx(){fillEx();$('#mdl').classList.add('on')}
function fillEx(){const emb=$('#xe').checked,g=gen(emb),k=checks();$('#xh').value=g.files;$('#xc').value=g.css;$('#xs').value=g.seo;
 $('#xk').innerHTML='<div class="sec">Pre-publish checks</div>'+(k.length?'<ul style="margin:4px 0;padding-left:18px;color:#f0a060">'+k.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul><i>Warnings never block export.</i>':'<p style="color:var(--ac)">No issues found.</p>')+(!emb&&assets.length?'<p><i>Put these files in an assets/ folder: '+assets.map(a=>esc(a.name)).join(', ')+'</i></p>':'');}