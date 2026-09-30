function importHtml(src){const doc=new DOMParser().parseFromString(src,'text/html'),p=mkPage('Home','/'),E=p.els,skip={},k={img:0,a:0,fmt:0};let n=0,cut=false;
 E[p.root].styles.color='var(--nwx-text)';
 const SK=['script','noscript','template','svg','canvas','iframe','video','audio','object','embed','picture','map','select','table','dialog'],
  SEC=['section','header','footer','main','nav','article','aside'],INL=['b','i','em','strong','span','a','br','small','code','u','mark','sub','sup','abbr','time','s','del','ins'],
  IGN=['style','link','meta','title','head','br','hr','base'];
 const cl=el=>(el.getAttribute('class')||'').replace(/[^\w\- ]/g,'').trim();
 const sty=el=>{const o={};(el.getAttribute('style')||'').split(';').forEach(d=>{const i=d.indexOf(':');if(i<1)return;const a=d.slice(0,i).trim(),v=d.slice(i+1).trim();
  if(!v||!/^[a-z-]+$/i.test(a)||/url\(|expression|javascript:/i.test(v))return;o[a.replace(/-([a-z])/g,(m,c)=>c.toUpperCase())]=v});return o};
 const txt=el=>{if(el.children.length)k.fmt++;return el.textContent.replace(/\s+/g,' ').trim()};
 const flat=el=>[...el.children].every(c=>INL.includes(c.tagName.toLowerCase()));
 const add=(t,par,props,st,keep)=>{if(!par)return null;if(n>=500){cut=true;return null}const e=mkEl(t,par);Object.assign(e,props);e.styles=keep?{...e.styles,...st}:{...st};E[e.id]=e;E[par].children.push(e.id);n++;return e.id};
 const href=v=>/^(https?:|mailto:|tel:|#|\/|\.)/i.test(v||'')?v:'';
 const ctl=(c,par,label)=>{const ty=(c.getAttribute('type')||'text').toLowerCase(),ph=c.getAttribute('placeholder')||'',req=c.hasAttribute('required');
  if(c.tagName==='TEXTAREA')return add('textarea',par,{label:label||ph||c.getAttribute('name')||'Message',placeholder:ph,required:req,cls:cl(c)},sty(c),true);
  if(ty==='hidden')return;
  if(ty==='submit'||ty==='button')return add('submit',par,{text:c.getAttribute('value')||'Submit',cls:cl(c)},sty(c),true);
  if(ty==='radio')return add('radio',par,{label:label||c.getAttribute('aria-label')||'Choose one',options:c.getAttribute('value')||'Option 1',required:req,cls:cl(c)},sty(c),true);
  if(ty==='file')return add('file',par,{label:label||c.getAttribute('aria-label')||ph||c.getAttribute('name')||'Upload',required:req,cls:cl(c)},sty(c),true);
  return add('input',par,{label:label||c.getAttribute('aria-label')||ph||c.getAttribute('name')||'Field',placeholder:ph,inputType:['text','email','password','number','tel'].includes(ty)?ty:'text',required:req,cls:cl(c)},sty(c),true)};
 const kids=(el,par)=>{if(!par)return;el.childNodes.forEach(x=>{if(x.nodeType===1)walk(x,par);else if(x.nodeType===3&&x.textContent.trim())add('paragraph',par,{text:x.textContent.replace(/\s+/g,' ').trim()},{})})};
 const walk=(el,par)=>{const t=el.tagName.toLowerCase(),st=sty(el),cls=cl(el);
  if(SK.includes(t)){skip[t]=(skip[t]||0)+1;return}
  if(IGN.includes(t))return;
  if(/^h[1-6]$/.test(t)&&flat(el))return void add('heading',par,{text:txt(el),level:t[1],cls},st);
  if(t==='img'){k.img++;return void add('image',par,{alt:el.getAttribute('alt')||'',cls},{maxWidth:'100%',height:'auto',...st})}
  if(t==='label'){const c=el.querySelector('input,textarea');if(c)return void ctl(c,par,txt(el))}
  if(t==='input'||t==='textarea')return void ctl(el,par);
  if(t==='form')return kids(el,add('form',par,{action:el.getAttribute('action')||'',cls},st));
  if((t==='a'||t==='button')&&flat(el)&&el.textContent.trim()){if(t==='a')k.a++;return void add('button',par,{text:txt(el),href:t==='a'?href(el.getAttribute('href')):'',cls},st,true)}
  if(flat(el)&&el.textContent.trim())return void add('paragraph',par,{text:txt(el),cls},st);
  if(!el.children.length)return;
  kids(el,add(SEC.includes(t)?'section':'div',par,{cls},st))};
 kids(doc.body,p.root);
 const css=[...doc.querySelectorAll('style')].map(x=>x.textContent).join('\n').replace(/@import[^;]+;/g,'').replace(/<\/style/gi,'').slice(0,20000);
 p.title=doc.title||'Home';const md=doc.querySelector('meta[name=description]');p.desc=md?md.getAttribute('content')||'':'';
 const notes=[];
 if(k.img)notes.push(k.img+' image'+(k.img>1?'s use':' uses')+' a placeholder; image files are not imported.');
 if(k.a)notes.push('Links were converted to buttons, keeping their URLs.');
 if(k.fmt)notes.push('Bold, italic and other inline formatting inside text was flattened to plain text.');
 if(css.trim())notes.push('<style> rules were added to Global CSS. They match your class names, but selectors for html or body only apply in the export.');
 if(cut)notes.push('The import stopped at 500 elements.');
 return{name:doc.title||'Imported site',n,skip,notes,state:{pages:[p],cur:p.id,tokens:{...TK0},comps:[],gcss:css}}}
function openImport(){$('#shr').innerHTML=`<div><p><b>Import HTML</b></p><p><i>Imports structure, text, links, simple forms, inline styles and &lt;style&gt; rules as a new project. Scripts, tables, embeds and media are skipped and listed afterwards.</i></p><input type="file" id="impf" accept=".html,.htm,text/html"><label>Or paste HTML<textarea id="imp" spellcheck="false" style="min-height:160px;font:11px monospace"></textarea></label><div class="bt"><button class="pri" id="impgo">Import as new project</button><button id="shx">Cancel</button></div></div>`;$('#shr').classList.add('on')}
function doImport(){const src=$('#imp').value;if(!src.trim())return;let R;
 try{R=importHtml(src)}catch(e){$('#shr').querySelector('p i').textContent='Could not read that HTML: '+e.message;return}
 const id=uid();wr(PK(id),{name:R.name,...R.state});idx.push({id,name:R.name,edited:Date.now(),pages:1});wr(IK,idx);openP(id);
 const sk=Object.entries(R.skip).map(([a,v])=>`&lt;${a}&gt; × ${v}`).join(', ');
 $('#shr').innerHTML=`<div><p><b>Imported ${R.n} element${R.n===1?'':'s'}</b></p><p>${sk?'Skipped: '+sk+'.':'Nothing was skipped.'}</p><ul style="color:var(--t2);padding-left:18px">${R.notes.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="bt"><button class="pri" id="shx">Start editing</button></div></div>`}