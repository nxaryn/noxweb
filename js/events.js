document.addEventListener('click',ev=>{const t=ev.target;CM.style.display='none';if(t.dataset&&t.dataset.cx)cact(t.dataset.cx);
 if(t.dataset.t){document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b===t));['ly','pg','in','tk','cd','as'].forEach(k=>$('#p-'+k).hidden=k!==t.dataset.t);codetab()}
 const l=t.closest('[data-l]');if(l){sel=l.dataset.l;renderAll()}
 const g=t.closest('[data-pg]');if(g&&g.dataset.pg!==cur)switchEditorPage(g.dataset.pg)
 if(t.dataset.dp)cDelPage(t.dataset.dp);
 if(t.id==='ap'){const v=$('#np').value.trim();if(v)cPage(v)}
 if(t.id==='s3')openEx();
 if(t.dataset.ac){const[a,id]=t.dataset.ac.split(':');dact(a,id)}
 if(t.dataset.ins)cAdd(t.dataset.ins);
 if(t.dataset.ci)cInst(t.dataset.ci);
 if(t.dataset.cv)cVariant(t.dataset.cv);
 if(t.dataset.ce)switchEditorPage(t.dataset.ce,()=>{if(isPage())lastPg=cur});
 if(t.dataset.back)switchEditorPage(pages.some(p=>p.id===lastPg)?lastPg:pages[0].id)
 if(t.dataset.a){const f={up:()=>cMove(sel,-1),dn:()=>cMove(sel,1),dup:()=>cDup(sel),del:()=>cDel(sel),detach:()=>cDetach(sel),comp:()=>cMakeComp(sel),free:()=>cFree(sel)};f[t.dataset.a]()}
 if(t.dataset.r)cStyle(sel,t.dataset.r,'');
 if(t.dataset.xr)cXProp(sel,t.dataset.xr,'');
 if(t.dataset.cr)cResolve(t.dataset.cr);
 if(t.dataset.cp){const v=$('#cm').value;if(v.trim()&&sel)cComment(sel,v)}
 if(t.id==='shx')$('#shr').classList.remove('on');
 if(t.id==='impgo')doImport();
 if(t.id==='ga')applyCode();
 if(t.dataset.as){const[a,id]=t.dataset.as.split(':');aact(a,id)}
 if(t.dataset.dev){bp=t.dataset.dev;devUI();renderAll()}
});
document.addEventListener('input',ev=>{const t=ev.target;
 if(t.dataset.bp)cBp(t.dataset.bp,t.value);
 else if(t.dataset.tok)cToken(t.dataset.tok,t.value);
 else if(t.dataset.tk&&sel)cStyle(sel,t.dataset.tk,t.value?`var(--nwx-${t.value})`:'');
 else if(t.dataset.p&&sel)cStyle(sel,t.dataset.p,t.value.trim(),'s'+sel+t.dataset.p);
 else if(t.dataset.xp&&sel)cXProp(sel,t.dataset.xp,t.value,'x'+sel+t.dataset.xp);
 else if(t.dataset.n&&sel)cProp(sel,t.dataset.n,t.type==='checkbox'?t.checked:t.value);
 else if(t.dataset.pf)cPageField(t.dataset.pf,t.value);
 else if(t.id==='gc')cGcss(t.value);
 else if(t.id==='gh')ghDirty=true;
 else if(t.id==='asq')atab();
 else if(t.id==='pn')save()});
document.addEventListener('change',ev=>{const t=ev.target;if(t.dataset.p||t.dataset.n||t.dataset.xp)insp();if(t.dataset.pf)ptab();
 if(t.id==='asf'){addAssets(t.files);t.value=''}
 if(t.id==='asr'){addAssets(t.files,repT);t.value=''}
 if(t.id==='vw'){const v=Math.round(+t.value);if(v>=240&&v<=2400){DEVS[bp]=v;render()}else t.value=DEVS[bp]}
 if(t.id==='xe')fillEx();
 if(t.dataset.an){const a=assets.find(x=>x.id===t.dataset.an);if(a&&t.value.trim()){a.name=t.value.trim();save();renderAll()}}
 if(t.id==='impf'&&t.files[0]){const fr=new FileReader();fr.onload=()=>{$('#imp').value=String(fr.result).slice(0,500000)};fr.readAsText(t.files[0])}
 if(t.dataset.rn){const m=idx.find(x=>x.id===t.dataset.rn);if(m&&t.value.trim()){m.name=t.value.trim();const d=rd(PK(m.id));if(d){d.name=m.name;wr(PK(m.id),d)}wr(IK,idx)}ren=null;dash()}});
document.addEventListener('keydown',ev=>{if(D.classList.contains('on'))return;const f=/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName),m=ev.ctrlKey||ev.metaKey,k=ev.key.toLowerCase();
 if(ev.key==='Escape'){CM.style.display='none';if($('#shr').classList.contains('on'))return $('#shr').classList.remove('on');if($('#mdl').classList.contains('on'))return $('#xx').click();if(document.body.classList.contains('pv'))return pv(false);sel=null;renderAll()}
 if(f)return;
 if(ev.key==='?'){openKeys();return}
 if(m&&k==='z'){ev.preventDefault();ev.shiftKey?redo():undo()}
 else if(m&&k==='d'&&sel){ev.preventDefault();cDup(sel)}
 else if(m&&k==='c'&&sel&&els()[sel].parent)clip=ser(els(),sel);
 else if(m&&k==='x'&&sel&&els()[sel].parent){clip=ser(els(),sel);cDel(sel)}
 else if(m&&k==='v'&&clip){ev.preventDefault();cPaste()}
 else if(m&&k==='s'){ev.preventDefault();save()}
 else if(m&&k==='p'){ev.preventDefault();pv(!document.body.classList.contains('pv'))}
 else if((ev.key==='Delete'||ev.key==='Backspace')&&sel){ev.preventDefault();cDel(sel)}});
addEventListener('resize',()=>{fit();CM.style.display='none'});$('#cv').addEventListener('scroll',()=>CM.style.display='none');
const dtClr=()=>document.querySelectorAll('.dt').forEach(x=>x.classList.remove('dt')),rowOf=ev=>ev.target.closest&&ev.target.closest('[data-l]');
const dmode=(ev,row)=>{const r=row.getBoundingClientRect(),y=(ev.clientY-r.top)/r.height;return['section','div','form','body'].includes(row.dataset.ty)?(y<.25?'before':y>.75?'after':'in'):(y<.5?'before':'after')};
document.addEventListener('dragstart',ev=>{const l=rowOf(ev);if(l){DR=l.dataset.l;ev.dataTransfer.setData('text/plain',DR)}});
document.addEventListener('dragover',ev=>{const l=rowOf(ev);dtClr();if(l&&DR){ev.preventDefault();l.classList.add('dt')}});
document.addEventListener('drop',ev=>{const l=rowOf(ev);dtClr();if(l&&DR){ev.preventDefault();cMoveTo(DR,l.dataset.l,dmode(ev,l))}DR=null});
document.addEventListener('dragend',()=>{DR=null;dtClr()});
const CM=document.createElement('div');CM.id='ctx';document.body.appendChild(CM);
function ctx(ev,id){ev.preventDefault();if(document.body.classList.contains('pv')||D.classList.contains('on'))return;sel=id;renderAll();
 const e=els()[id],p=!!e.parent,it=[['Duplicate','dup',p],['Copy','copy',p],['Cut','cut',p],['Paste','paste',!!clip],['Move up','up',p],['Move down','dn',p],['Create component','comp',p&&e.type!=='instance'&&isPage()],['Delete','del',p]].filter(x=>x[2]);
 if(!it.length){CM.style.display='none';return}
 CM.innerHTML=it.map(([l,a])=>`<button data-cx="${a}">${l}</button>`).join('');CM.style.display='block';
 CM.style.left=Math.min(ev.clientX,innerWidth-190)+'px';CM.style.top=Math.max(4,Math.min(ev.clientY,innerHeight-CM.offsetHeight-8))+'px'}
function cact(a){if(!sel)return;const E=els(),e=E[sel];
 if(a==='dup')cDup(sel);else if(a==='copy'&&e.parent)clip=ser(E,sel);else if(a==='cut'&&e.parent){clip=ser(E,sel);cDel(sel)}
 else if(a==='paste')cPaste();else if(a==='up')cMove(sel,-1);else if(a==='dn')cMove(sel,1);else if(a==='comp')cMakeComp(sel);else if(a==='del')cDel(sel)}