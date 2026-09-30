$('#insg').innerHTML=Object.entries(DEF).map(([k,d])=>`<button data-ins="${k}">${d.name}</button>`).join('');
idx=rd(IK)||[];
const old=rd('noxweb.project.v1');if(!idx.length&&old&&old.pages&&old.pages.length){const id=uid();wr(PK(id),old);idx=[{id,name:old.name||'My Website',edited:Date.now(),pages:old.pages.length}];wr(IK,idx)}
seed();
H.st=[snap()];H.i=0;devUI();renderAll();dash();
$('#un').onclick=undo;$('#re').onclick=redo;
$('#pvb').onclick=()=>pv(!document.body.classList.contains('pv'));
$('#ex').onclick=openEx;
$('#xx').onclick=()=>$('#mdl').classList.remove('on');
const cp=(id,b)=>$(b).onclick=()=>{const t=$(id);t.select();try{document.execCommand('copy');$(b).textContent='Copied'}catch(e){$(b).textContent='Select + copy manually'}};
cp('#xh','#cp1');cp('#xc','#cp2');
$('#pj').onclick=()=>{save();dash()};
$('#shb').onclick=openShare;$('#kb').onclick=openKeys;