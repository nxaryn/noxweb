const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[data-page-transition]').forEach(link=>link.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.target==='_blank'||reducedMotion)return;
 const url=new URL(link.href,location.href);
 if(url.origin!==location.origin)return;
 event.preventDefault();
 document.body.classList.add('page-leaving');
 window.setTimeout(()=>location.assign(url.href),180);
}));