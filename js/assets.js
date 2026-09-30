const FFD=document.createElement('style');document.head.appendChild(FFD);
const AT=['png','jpg','jpeg','webp','svg','avif','gif'],FT=['woff','woff2','ttf','otf'];let repT=null;
const fontOpts=()=>['system-ui, sans-serif','Arial, sans-serif','Georgia, serif','ui-monospace, monospace',...assets.filter(a=>a.type==='font').map(a=>`'${fam(a)}', sans-serif`)];
const assetSrc=e=>{const a=assets.find(x=>x.id===e.asset);return a?a.data:PH};
const aOut=(e,em)=>{const a=assets.find(x=>x.id===e.asset);return !a?PH:em?a.data:'assets/'+a.name};
const fontCss=em=>assets.filter(a=>a.type==='font').map(a=>`@font-face{font-family:'${fam(a)}';src:url(${em?a.data:'assets/'+a.name})}\n`).join('');
function addAssets(files,rep){const m=$('#asm');m.textContent='';[...files].forEach(f=>{const x=f.name.split('.').pop().toLowerCase(),k=AT.includes(x)?'image':FT.includes(x)?'font':null;
 if(!k){m.textContent='Unsupported file: '+f.name+'. Use images (PNG, JPG, WEBP, SVG, AVIF, GIF) or fonts (WOFF, WOFF2, TTF, OTF).';return}
 if(f.size>1.5e6){m.textContent=f.name+' is over 1.5 MB. Please compress it first.';return}
 const fr=new FileReader();fr.onload=()=>{const a=rep&&assets.find(z=>z.id===rep);
  if(a)Object.assign(a,{data:fr.result,size:f.size,type:k});else assets.push({id:uid(),name:f.name,type:k,size:f.size,data:fr.result});
  save();renderAll()};fr.readAsDataURL(f)})}
function aact(a,id){const A=assets.find(x=>x.id===id);if(!A)return;
 if(a==='del'){assets=assets.filter(x=>x.id!==id);save();renderAll()}
 else if(a==='rep'){repT=id;$('#asr').click()}
 else if(a==='use'){const E=els();if(!(sel&&E[sel]&&E[sel].type==='image')){if(!isPage())return;cAdd('image')}cProp(sel,'asset',id);insp()}}
function atab(){const q=$('#asq').value.toLowerCase();$('#asl').innerHTML=assets.filter(a=>a.name.toLowerCase().includes(q)).map(a=>`<div class="pc" style="margin:6px 0"><div style="display:flex;gap:8px;align-items:center">${a.type==='image'?`<img src="${esc(a.data)}" alt="" style="width:36px;height:36px;object-fit:cover;border:1px solid var(--bd)">`:'<span style="width:36px;text-align:center;font-size:18px">Aa</span>'}<div style="min-width:0"><input data-an="${a.id}" value="${esc(a.name)}"><i>${a.type==='font'?'FONT':esc(a.name.split('.').pop().toUpperCase())} · ${kb(a.size)}</i></div></div><div class="bt">${a.type==='image'?`<button data-as="use:${a.id}">Use</button>`:''}<button data-as="rep:${a.id}">Replace</button><button data-as="del:${a.id}">Delete</button></div></div>`).join('')||'<p class="em">No assets yet. Upload images or fonts above.</p>'}