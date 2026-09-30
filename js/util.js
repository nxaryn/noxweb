const $=s=>document.querySelector(s);
const uid=()=>'el_'+Math.random().toString(36).slice(2,7);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const kebab=k=>k.replace(/[A-Z]/g,c=>'-'+c.toLowerCase());
const PH='data:image/svg+xml;utf8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="480" height="200"><rect width="100%" height="100%" fill="#1A2227"/><path d="M0 200L160 90l90 70 70-50 160 90z" fill="#007C8A"/></svg>');
const ago=t=>{const m=Math.round((Date.now()-t)/60000);return m<1?'just now':m<60?m+' min ago':m<1440?Math.round(m/60)+' h ago':Math.round(m/1440)+' d ago'};
const kb=n=>n>=1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB';
const fam=a=>a.name.replace(/\.[^.]+$/,'').replace(/[^\w -]/g,'');