import{_ as v,r as y,b as _,e as m,f as l,b5 as b,p as h,u as w,o as x}from"./index-yErA5vTz.js";const k={class:"page-cell flex-cc"},$={class:"mac-window"},H=["innerHTML"],S=`const developer = {
  name: 'jiangwen',
  role: '前端工程师',
  skill: ['HTML', 'JS', 'CSS'],
  sayHello() {
    return '欢迎来到我的代码实验室🧪'
  }
}

console.log(developer.__proto__ === Bug.prototype) // 输出：true
`,z={__name:"Home",setup(B){const e=y(null),i=[-10,10],u=[-10,10],c={keyword:"#cba6f7",attr:"#a6e3a1",string:"#f9e2af",func:"#89dceb"};function p(t){const s=o=>o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),r=new RegExp([/(\/\/[^\n]*)/.source,/('[^']*')/.source,/("[^"]*")/.source,/(`[^`]*`)/.source,/\b(const|let|var|return|function|if|else|for|while|import|export|from|class|new|this|async|await|of|in)\b/.source,/\b(\d+)\b/.source,/\b([a-zA-Z_$][\w$]*)(?=\s*\()/.source,/\b([a-zA-Z_$][\w$]*)(?=\s*:)/.source].join("|"),"g"),n=["comment","string","string","string","keyword","number","func","attr"];return s(t).replace(r,(...o)=>{for(let a=0;a<n.length;a++)if(o[a+1]!==void 0)return`<span class="${n[a]}">${o[a+1]}</span>`;return o[0]})}const f=p(S),d=(t,s,r)=>s/r*(t[1]-t[0])+t[0];return _(()=>{e.value.onmousemove=t=>{const{offsetX:s,offsetY:r}=t,{offsetWidth:n,offsetHeight:o}=e.value,a=-d(i,s,n),g=d(u,r,o);e.value.style.setProperty("--rx",`${g}deg`),e.value.style.setProperty("--ry",`${a}deg`)},e.value.onmouseleave=()=>{e.value.style.setProperty("--rx","0deg"),e.value.style.setProperty("--ry","0deg")}}),(t,s)=>(x(),m("div",k,[l("div",{class:"card",ref_key:"card",ref:e},[l("div",$,[s[0]||(s[0]=b('<div class="title-bar" data-v-d5c5c788><div class="traffic-lights" data-v-d5c5c788><span class="dot red" data-v-d5c5c788></span><span class="dot yellow" data-v-d5c5c788></span><span class="dot green" data-v-d5c5c788></span></div><span class="title-text" data-v-d5c5c788>about.js</span></div>',1)),l("div",{class:"code-body",style:h({"--keyword":c.keyword,"--attr":c.attr,"--string":c.string,"--func":c.func})},[l("pre",{innerHTML:w(f)},null,8,H)],4)])],512)]))}},P=v(z,[["__scopeId","data-v-d5c5c788"]]);export{P as default};
