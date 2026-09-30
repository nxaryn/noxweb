function run(fn,key,soft){fn();commit(key,soft)}
function commit(key,soft){const s=snap(),n=Date.now();
 if(key&&key===H.key&&n-H.t<900&&H.i>0)H.st[H.i]=s;else{H.st=H.st.slice(0,H.i+1);H.st.push(s);H.i++;logAct()}
 H.key=key;H.t=n;save();soft?render():renderAll()}
function cAdd(t){const E=els(),id=uid();let p=page().root;
 p=tgt();
 run(()=>{const e=mkEl(t,p);e.id=id;E[id]=e;E[p].children.push(id);sel=id})}
function killTree(E,id){E[id].children.forEach(c=>killTree(E,c));delete E[id]}
function cDel(id){const E=els(),e=E[id];if(!e||!e.parent)return;
 run(()=>{E[e.parent].children=E[e.parent].children.filter(c=>c!==id);killTree(E,id);sel=null})}
function cloneTree(E,id,par){const o=E[id],n=JSON.parse(JSON.stringify(o));n.id=uid();n.parent=par;n.children=o.children.map(c=>cloneTree(E,c,n.id));E[n.id]=n;return n.id}
function cDup(id){const E=els(),e=E[id];if(!e||!e.parent)return;
 run(()=>{const n=cloneTree(E,id,e.parent),a=E[e.parent].children;a.splice(a.indexOf(id)+1,0,n);a.pop();a.splice(a.indexOf(id)+1,0,n);sel=n})}
function cMove(id,d){const E=els(),e=E[id];if(!e||!e.parent)return;const a=E[e.parent].children,i=a.indexOf(id),j=i+d;if(j<0||j>=a.length)return;
 run(()=>{a.splice(i,1);a.splice(j,0,id)})}
function cStyle(id,p,v,key){const e=els()[id],t=bp==='desktop'?e.styles:e.responsive[bp];
 run(()=>{v===''||v==null?delete t[p]:t[p]=v;
  if(p==='position'&&(v==='absolute'||v==='fixed')&&e.parent){const pe=els()[e.parent],pt=bp==='desktop'?pe.styles:pe.responsive[bp];if(!pt.position||pt.position==='static')pt.position='relative'}},key,!!key)}
function cXProp(id,n,v,key){const e=els()[id],t=bp==='desktop'?e:e.responsive[bp];
 run(()=>{v===''||v==null?delete t[n]:t[n]=v},key,!!key)}
function cProp(id,n,v){const e=els()[id];run(()=>{e[n]=v},'n'+id+n,true)}
function cFree(id){const e=els()[id];if(!e||!e.parent)return;
 const t=bp==='desktop'?e.styles:e.responsive[bp];
 const isFree=t.position==='absolute'||t.position==='fixed';
 run(()=>{if(isFree)delete t.position;
  else{t.position='absolute';const pe=els()[e.parent],pt=bp==='desktop'?pe.styles:pe.responsive[bp];if(!pt.position||pt.position==='static')pt.position='relative'}},'free'+id,false)}
function cPage(name){const p=mkPage(name,'/'+(name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'page'));transitionCanvas(()=>run(()=>{pages.push(p);cur=p.id;sel=null}))}
function cDelPage(id){if(pages.length<2)return;const remove=()=>run(()=>{pages=pages.filter(p=>p.id!==id);if(cur===id)cur=pages[0].id;sel=null});if(cur===id)transitionCanvas(remove);else remove()}
function cPageField(f,v){run(()=>{page()[f]=v},'pf'+f,true)}
const tgt=()=>{const E=els(),e=sel&&E[sel];return e?(['section','div','form'].includes(e.type)||!e.parent?sel:e.parent):page().root};
function cInst(cid){const E=els(),c=comps.find(x=>x.id===cid);if(!c||!isPage())return;const p=tgt();
 run(()=>{const e=mkEl('instance',p);e.name=c.name;e.comp=cid;E[e.id]=e;E[p].children.push(e.id);sel=e.id})}
function cMakeComp(id){const E=els(),e=E[id];if(!e||!e.parent||e.type==='instance'||!isPage())return;
 run(()=>{const C={id:uid(),name:e.name,els:{}};C.root=ins(C.els,ser(E,id),null);comps.push(C);
  const n=mkEl('instance',e.parent);n.name=e.name;n.comp=C.id;E[n.id]=n;const a=E[e.parent].children;a[a.indexOf(id)]=n.id;killTree(E,id);sel=n.id})}
function cDetach(id){const E=els(),e=E[id],c=cRes(e);if(!c)return;
 run(()=>{const n=ins(E,ser(c.els,c.root),e.parent),a=E[e.parent].children;a.pop();a.splice(a.indexOf(id),1,n);delete E[id];sel=n})}
const LB={cAdd:'Added an element',cDel:'Deleted an element',cDup:'Duplicated an element',cMove:'Reordered an element',cMoveTo:'Moved an element',cStyle:'Changed a style',cProp:'Edited element content',cPage:'Created a page',cDelPage:'Deleted a page',cPageField:'Edited page settings',cMakeComp:'Created a component',cInst:'Inserted a component',cDetach:'Detached a component instance',cToken:'Changed a design token',cGcss:'Edited global CSS',cPaste:'Pasted an element',cComment:'Added a comment',cResolve:'Changed a comment'};
function logAct(){const m=(new Error().stack||'').match(/\bc[A-Z]\w*/g)||[],k=m.find(x=>LB[x]);log.push({t:Date.now(),who:'local',what:LB[k]||'Edited the project'});if(log.length>100)log=log.slice(-100)}
function cComment(id,text){if(text.trim())run(()=>{comments.push({id:uid(),el:id,text:text.trim(),who:'local',t:Date.now(),done:false})})}
function cResolve(cid){const c=comments.find(x=>x.id===cid);if(c)run(()=>{c.done=!c.done})}
function cGcss(v){run(()=>{gcss=v},'gcss',true)}
function cToken(k,v){run(()=>{tokens[k]=v},'t'+k,true)}
function cPaste(){if(!clip)return;const E=els();let p=page().root;p=tgt();run(()=>{sel=ins(E,clip,p)})}
function cMoveTo(id,tid,mode){const E=els(),e=E[id],t=E[tid];if(!e||!e.parent||id===tid)return;
 for(let n=tid;n;n=E[n].parent)if(n===id)return;
 const np=mode==='in'?tid:t.parent;if(!np)return;
 const a=E[e.parent].children,ai=a.indexOf(id),ti=a.indexOf(tid),ni=mode==='in'?a.length:ti+(mode==='after'?1:0);
 if(e.parent===np&&ai===ni)return;
 run(()=>{a.splice(ai,1);const b=E[np].children;b.splice(mode==='in'?b.length:b.indexOf(tid)+(mode==='after'?1:0),0,id);e.parent=np;sel=id})}
function cVariant(cid){const c=comps.find(x=>x.id===cid);if(!c)return;run(()=>{const v={id:uid(),name:'Variant '+((c.variants||[]).length+1),els:{}};v.root=ins(v.els,ser(c.els,c.root),null);(c.variants=c.variants||[]).push(v)})}
function cBp(k,v){v=Math.round(+v);if(!(v>=320&&v<=2000)||(k==='mobile'&&v>=bps.tablet)||(k==='tablet'&&v<=bps.mobile))return;run(()=>{bps[k]=v},'bp'+k,true)}
function undo(){if(H.i>0){H.i--;load(H.st[H.i]);H.key=null;save();renderAll()}}
function redo(){if(H.i<H.st.length-1){H.i++;load(H.st[H.i]);H.key=null;save();renderAll()}}
function save(){const st=$('#st');if(!pid)return;st.textContent='Saving...';
 const m=idx.find(x=>x.id===pid),name=$('#pn').value;
 const ok=wr(PK(pid),{name,pages,cur,tokens,comps,gcss,comments,log,assets,bps,members:[{id:'local',name:'You',role:'owner'}]});
 if(m){m.name=name;m.edited=Date.now();m.pages=pages.length}wr(IK,idx);
 st.textContent=ok?'Saved':'Unsaved — storage unavailable, use Export to keep your work';st.className=ok?'':'bad'}