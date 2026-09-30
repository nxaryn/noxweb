const entry=document.body;
if(entry.classList.contains('page-enter')){
 const clear=()=>entry.classList.remove('page-enter');
 entry.addEventListener('animationend',clear,{once:true});
 window.setTimeout(clear,500);
}