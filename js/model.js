const KEY='noxweb.project.v1';
const DEF={
 section:{tag:'section',name:'Section',styles:{display:'flex',flexDirection:'column',gap:'16px',padding:'64px 48px',background:'var(--nwx-surface)'}},
 div:{tag:'div',name:'Container',styles:{display:'flex',flexDirection:'row',gap:'16px',padding:'16px'}},
 heading:{tag:'h2',name:'Heading',text:'Heading',styles:{fontSize:'48px',fontWeight:'700',margin:'0',color:'var(--nwx-text)'}},
 paragraph:{tag:'p',name:'Paragraph',text:'Write something here.',styles:{fontSize:'16px',color:'var(--nwx-muted)',margin:'0',lineHeight:'1.5'}},
 button:{tag:'button',name:'Button',text:'Button',styles:{padding:'12px 20px',background:'var(--nwx-primary)',color:'var(--nwx-background)',border:'0',borderRadius:'4px',fontSize:'14px',fontWeight:'600'}},
 checkbox:{tag:'input',name:'Checkbox',label:'I agree',styles:{display:'flex',flexDirection:'row',alignItems:'center',gap:'8px',color:'var(--nwx-text)',fontSize:'14px'}},
 radio:{tag:'input',name:'Radio group',label:'Choose one',options:'Option 1\nOption 2',styles:{display:'flex',flexDirection:'column',gap:'4px',color:'var(--nwx-text)',fontSize:'14px'}},
 select:{tag:'select',name:'Select',label:'Choose one',options:'Option 1\nOption 2\nOption 3',styles:{display:'flex',flexDirection:'column',gap:'4px',color:'var(--nwx-text)',fontSize:'14px'}},
 file:{tag:'input',name:'File upload',label:'Upload a file',styles:{display:'flex',flexDirection:'column',gap:'4px',color:'var(--nwx-text)',fontSize:'14px'}},
 html:{tag:'div',name:'Custom HTML',code:'<p>Custom HTML</p>',styles:{width:'100%',minHeight:'80px'}},
 form:{tag:'form',name:'Form',styles:{display:'flex',flexDirection:'column',gap:'12px',padding:'16px',maxWidth:'420px'}},
 input:{tag:'input',name:'Input',label:'Label',placeholder:'',inputType:'text',styles:{display:'flex',flexDirection:'column',gap:'4px',color:'var(--nwx-text)',fontSize:'14px'}},
 textarea:{tag:'textarea',name:'Textarea',label:'Message',placeholder:'',styles:{display:'flex',flexDirection:'column',gap:'4px',color:'var(--nwx-text)',fontSize:'14px'}},
 submit:{tag:'button',name:'Submit',text:'Submit',styles:{padding:'12px 20px',background:'var(--nwx-primary)',color:'var(--nwx-background)',border:'0',borderRadius:'4px',fontSize:'14px',fontWeight:'600'}},
 image:{tag:'img',name:'Image',alt:'',styles:{width:'100%',maxWidth:'480px',height:'200px',objectFit:'cover',borderRadius:'4px'}}
};
const GROUPS=[
 ['Layout',[['display','s',['block','flex','grid','none']],['flexDirection','s',['row','column']],['justifyContent','s',['flex-start','center','flex-end','space-between','space-around','space-evenly']],['alignItems','s',['flex-start','center','flex-end','stretch','baseline']],['position','s',['relative','absolute','fixed','sticky']],['left'],['top'],['gap'],['padding'],['margin'],['width'],['height']]],
 ['Grid',[['gridTemplateColumns'],['gridTemplateRows'],['gridColumn'],['gridRow'],['justifyItems','s',['stretch','start','center','end']],['alignContent','s',['stretch','start','center','end','space-between','space-around']]]],
 ['Typography',[['fontFamily','s',()=>fontOpts()],['fontSize'],['fontWeight','s',['300','400','500','600','700','800']],['textAlign','s',['left','center','right']],['lineHeight'],['letterSpacing'],['textTransform','s',['none','uppercase','lowercase','capitalize']],['textDecoration','s',['none','underline','line-through']]]],
 ['Color',[['color','c'],['background','c'],['opacity']]],
 ['Border',[['borderRadius'],['border']]]];
const DEVS={desktop:1440,tablet:768,mobile:375};
const TK0={primary:'#4FD1C5',secondary:'#00FFEA',background:'#050607',surface:'#0D1114',text:'#E8F1F2',muted:'#8B9A9E',border:'#1A2227'};
const IXK=['hScale','hY','hOpacity','hBg','anim','dur','delay'];
let tokens={...TK0},gcss='',comps=[],comments=[],log=[],assets=[],bps={tablet:991,mobile:767},lastPg=null,clip=null,pages=[],cur=null,sel=null,bp='desktop',H={st:[],i:-1,key:null,t:0};
const IK='noxweb.index',PK=id=>'noxweb.p.'+id,mem={};let idx=[],pid=null;
const rd=k=>{if(k in mem)return mem[k];try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}};
const wr=(k,v)=>{mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){return false}};
function mkEl(t,parent){const d=DEF[t]||{};return{id:uid(),type:t,name:d.name||'Body',parent,children:[],styles:{...(d.styles||{})},responsive:{tablet:{},mobile:{}},text:d.text,alt:d.alt,label:d.label,placeholder:d.placeholder,inputType:d.inputType,code:d.code,options:d.options,vmsg:''}}
function mkPage(name,slug){const r=mkEl('body',null);r.styles={background:'var(--nwx-background)',minHeight:'700px',position:'relative'};r.name='Body';return{id:uid(),name,slug,title:name,desc:'',robots:'index,follow',root:r.id,els:{[r.id]:r}}}
const page=()=>pages.find(p=>p.id===cur)||comps.flatMap(c=>[c,...(c.variants||[])]).find(c=>c.id===cur),els=()=>page().els;
function seed(){const p=mkPage('Home','/');pages=[p];cur=p.id;const E=p.els;
 const mk=(t,par,text)=>{const e=mkEl(t,par);if(text)e.text=text;E[e.id]=e;E[par].children.push(e.id);return e};
 const s=mk('section',p.root);s.name='Hero';
 mk('heading',s.id,'Build the web your way.').level='1';mk('paragraph',s.id,'A visual website builder with the control of code.');mk('button',s.id,'Get started')}
const snap=()=>JSON.stringify({pages,cur,tokens,comps,gcss,comments,bps});
function load(j){const o=JSON.parse(j);pages=o.pages;cur=o.cur;tokens=o.tokens||{...TK0};comps=o.comps||[];gcss=o.gcss||'';comments=o.comments||[];bps=o.bps||{tablet:991,mobile:767};if(!page())cur=pages[0].id;if(sel&&!els()[sel])sel=null}
const ser=(E,id)=>{const e=E[id];return{...JSON.parse(JSON.stringify({...e,children:[],parent:null,id:null})),kids:e.children.map(c=>ser(E,c))}};
function ins(E,o,par){const e={...o,id:uid(),parent:par,children:[]};delete e.kids;E[e.id]=e;if(par)E[par].children.push(e.id);o.kids.forEach(k=>ins(E,k,e.id));return e.id}
const cRes=e=>{const c=comps.find(x=>x.id===e.comp);if(!c)return null;return(e.variant&&(c.variants||[]).find(x=>x.id===e.variant))||c};
const isPage=()=>pages.includes(page());