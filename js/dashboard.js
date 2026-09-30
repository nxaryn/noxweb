const D=$('#dash');let dtab='projects',ren=null;
function proj(fn){const p=mkPage('Home','/'),E=p.els;
 const add=(t,par,o={})=>{const e=mkEl(t,par),{styles,tablet,mobile,...rest}=o;Object.assign(e,rest);Object.assign(e.styles,styles);Object.assign(e.responsive.tablet,tablet);Object.assign(e.responsive.mobile,mobile);E[e.id]=e;E[par].children.push(e.id);return e.id};
 fn(add,p.root);return{pages:[p],cur:p.id,tokens:{...TK0},comps:[],gcss:''}}
const cardS={flex:'1',flexDirection:'column',background:'var(--nwx-surface)',border:'1px solid var(--nwx-border)',borderRadius:'6px',padding:'20px'};
const TPL={
 blank:{name:'Blank',desc:'An empty page.',build:()=>proj(()=>{})},
 portfolio:{name:'Portfolio',desc:'Intro, selected work and a contact button.',build:()=>proj((add,R)=>{
  const hero=add('section',R,{name:'Hero',styles:{padding:'96px 48px'},mobile:{padding:'48px 20px'}});
  add('heading',hero,{text:"Hi, I'm Alex.",level:'1',styles:{fontSize:'64px'},mobile:{fontSize:'36px'}});
  add('paragraph',hero,{text:'Designer and developer building thoughtful things for the web.',styles:{maxWidth:'560px',fontSize:'18px'}});
  add('button',hero,{text:'Get in touch',href:'mailto:hello@example.com'});
  const work=add('section',R,{name:'Work',styles:{background:'var(--nwx-background)',padding:'48px'},mobile:{padding:'32px 20px'}});
  add('heading',work,{text:'Selected work',styles:{fontSize:'32px'}});
  const row=add('div',work,{name:'Projects',mobile:{flexDirection:'column'}});
  ['Project One','Project Two','Project Three'].forEach(n=>{const c=add('div',row,{name:'Card',styles:cardS});add('heading',c,{text:n,level:'3',styles:{fontSize:'20px'}});add('paragraph',c,{text:'A short description of the project and what you did.'})})})},
 saas:{name:'SaaS landing page',desc:'Navigation, hero, three features and a call to action.',build:()=>proj((add,R)=>{
  const nav=add('div',R,{name:'Navigation',styles:{justifyContent:'space-between',alignItems:'center',padding:'16px 48px',borderBottom:'1px solid var(--nwx-border)'},mobile:{padding:'16px 20px'}});
  add('heading',nav,{text:'Acme',level:'3',styles:{fontSize:'20px'}});add('button',nav,{text:'Sign up',href:'#'});
  const hero=add('section',R,{name:'Hero',styles:{alignItems:'center',textAlign:'center',padding:'112px 48px',background:'var(--nwx-background)'},mobile:{padding:'56px 20px'}});
  add('heading',hero,{text:'Ship faster with Acme',level:'1',styles:{fontSize:'64px',maxWidth:'760px'},tablet:{fontSize:'48px'},mobile:{fontSize:'36px'}});
  add('paragraph',hero,{text:'The all-in-one platform for teams that build products.',styles:{fontSize:'18px',maxWidth:'560px'}});
  add('button',hero,{text:'Start free trial',href:'#'});
  const feat=add('section',R,{name:'Features'});add('heading',feat,{text:'Everything you need',styles:{fontSize:'32px'}});
  const row=add('div',feat,{name:'Feature row',mobile:{flexDirection:'column'}});
  [['Fast','Built for speed from the ground up.'],['Simple','A clean interface that stays out of your way.'],['Secure','Privacy and security by default.']].forEach(([t,d])=>{const c=add('div',row,{name:'Feature card',styles:{...cardS,background:'var(--nwx-background)'}});add('heading',c,{text:t,level:'3',styles:{fontSize:'20px'}});add('paragraph',c,{text:d})});
  const cta=add('section',R,{name:'CTA',styles:{alignItems:'center',textAlign:'center'}});
  add('heading',cta,{text:'Ready to get started?',styles:{fontSize:'32px'}});add('button',cta,{text:'Create your account',href:'#'})})}};
const card=m=>`<div class="pc"><div>${ren===m.id?`<input data-rn="${m.id}" value="${esc(m.name)}">`:`<b>${esc(m.name)}</b>`}</div><i>Edited ${ago(m.edited)} · ${m.pages} page${m.pages===1?'':'s'}</i><div class="bt">${m.trashed?`<button data-ac="res:${m.id}">Restore</button><button data-ac="purge:${m.id}">Delete forever</button>`:`<button class="pri" data-ac="open:${m.id}">Open</button><button data-ac="ren:${m.id}">Rename</button><button data-ac="dup:${m.id}">Duplicate</button><button data-ac="exp:${m.id}">Export</button><button data-ac="del:${m.id}">Delete</button>`}</div></div>`;
function dash(){D.classList.add('on');
 const L=idx.filter(m=>!!m.trashed===(dtab==='trash')).sort((a,b)=>b.edited-a.edited);
 const tb=[['projects','Projects'],['templates','Templates'],['trash','Trash']].map(([k,l])=>`<button data-ac="tab:${k}" class="${dtab===k?'on':''}">${l}</button>`).join('');
 let b;
 if(dtab==='templates')b='<div class="pg2">'+Object.entries(TPL).map(([k,T])=>`<div class="pc"><b>${T.name}</b><i>${T.desc}</i><div class="bt"><button class="pri" data-ac="tpl:${k}">Use template</button></div></div>`).join('')+'</div>';
 else b=(dtab==='projects'?'<div class="bt" style="margin:0 0 16px"><button class="pri" data-ac="tpl:blank">Start blank</button><button data-ac="tab:templates">Choose a template</button><button data-ac="imp:x">Import HTML</button></div>':'')+(L.length?'<div class="pg2">'+L.map(card).join('')+'</div>':`<p class="em">${dtab==='trash'?'Trash is empty.':'No projects yet. Create your first project to start building.'}</p>`);
 D.innerHTML=`<div class="dh"><a class="logo home-link" href="../index.html" title="Back to NoxWeb home"><b>NX</b>NOXWEB</a><div class="dtb">${tb}</div><span class="sp"></span>${pid?'<button data-ac="back:x">Back to editor</button>':''}</div><div class="db">${b}</div>`}
function openP(id){const d=rd(PK(id));if(!d)return;pid=id;pages=d.pages;cur=d.cur;tokens=d.tokens||{...TK0};comps=d.comps||[];gcss=d.gcss||'';comments=d.comments||[];log=d.log||[];assets=d.assets||[];bps=d.bps||{tablet:991,mobile:767};if(!page())cur=pages[0].id;
 $('#pn').value=d.name||'Untitled';sel=null;bp='desktop';ren=null;H={st:[snap()],i:0,key:null,t:0};devUI();D.classList.remove('on');renderAll();
 const m=idx.find(x=>x.id===id);if(m){m.edited=Date.now();wr(IK,idx)}$('#st').textContent='Saved';$('#st').className=''}
function newP(key){const T=TPL[key],id=uid(),st=T.build(),name=key==='blank'?'Untitled':T.name;wr(PK(id),{name,...st});idx.push({id,name,edited:Date.now(),pages:st.pages.length});wr(IK,idx);openP(id)}
function dact(a,id){const m=idx.find(x=>x.id===id);
 if(a==='open')openP(id);else if(a==='ren'){ren=id;dash()}
 else if(a==='dup'&&m){const d=rd(PK(id)),n=uid();d.name=m.name+' copy';wr(PK(n),JSON.parse(JSON.stringify(d)));idx.push({id:n,name:d.name,edited:Date.now(),pages:m.pages});wr(IK,idx);dash()}
 else if(a==='exp'){openP(id);openEx()}
 else if(a==='del'&&m){m.trashed=true;if(id===pid)pid=null;wr(IK,idx);dash()}
 else if(a==='res'&&m){delete m.trashed;wr(IK,idx);dash()}
 else if(a==='purge'){idx=idx.filter(x=>x.id!==id);delete mem[PK(id)];try{localStorage.removeItem(PK(id))}catch(e){}if(id===pid)pid=null;wr(IK,idx);dash()}
 else if(a==='imp')openImport();else if(a==='tpl')newP(id);else if(a==='tab'){dtab=id;dash()}else if(a==='back')D.classList.remove('on')}
