import{j as s,r as c,u as Ee,a as he}from"./index-v5rmserg.js";import{s as W}from"./supabase-Dl3d4qHd.js";import{m as E,A as Te}from"./index-DpMrWxnu.js";function Fe({t:e,lastName:t,setLastName:a,inputRef:n,loading:o,suggestions:r,activeSuggestion:i,handleKeyDown:l,setSuggestions:d,setActiveSuggestion:u,firstOptions:m,selectedFirst:p,setSelectedFirst:x,setSelectedGuest:v,setShowInvitation:D}){return s.jsxs(E.div,{className:"card",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.5},children:[s.jsx("h1",{className:"title",children:e("title")}),s.jsx("p",{className:"subtitle",children:e("subtitle")}),s.jsxs("div",{className:"form-row",children:[s.jsx("label",{children:e("lastName")}),s.jsx("input",{ref:n,value:t,onChange:h=>a(h.target.value),onKeyDown:l,placeholder:e("enterLastName")}),o&&s.jsx("div",{className:"loading",children:e("searching")}),r.length>0&&s.jsx("div",{className:"suggestions-list",children:r.map((h,j)=>s.jsx("div",{className:`suggestion-item ${j===i?"active":""}`,onClick:()=>{a(h.last_name),d([]),u(-1)},children:h.last_name},h.last_name))})]}),m.length>0&&s.jsxs("div",{className:"form-row",children:[s.jsx("label",{children:e("firstName")}),s.jsxs("select",{value:p,onChange:h=>{const j=m.find(g=>g.id===h.target.value);x(h.target.value),v(j)},children:[s.jsx("option",{value:"",children:e("select")}),m.map(h=>s.jsx("option",{value:h.id,children:h.first_name},h.id))]})]}),p&&s.jsx("div",{className:"actions",children:s.jsx("button",{className:"gold-btn",onClick:()=>D(!0),children:e("viewInvitation")})})]},"search-form")}let De={data:""},Ie=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||De,Le=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,Me=/\/\*[^]*?\*\/|  +/g,pe=/\n+/g,H=(e,t)=>{let a="",n="",o="";for(let r in e){let i=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+i+";":n+=r[1]=="f"?H(i,r):r+"{"+H(i,r[1]=="k"?"":t)+"}":typeof i=="object"?n+=H(i,t?t.replace(/([^,])+/g,l=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,d=>/&/.test(d)?d.replace(/&/g,l):l?l+" "+d:d)):r):i!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=H.p?H.p(r,i):r+":"+i+";")}return a+(t&&o?t+"{"+o+"}":o)+n},A={},fe=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+fe(e[a]);return t}return e},Re=(e,t,a,n,o)=>{let r=fe(e),i=A[r]||(A[r]=(d=>{let u=0,m=11;for(;u<d.length;)m=101*m+d.charCodeAt(u++)>>>0;return"go"+m})(r));if(!A[i]){let d=r!==e?e:(u=>{let m,p,x=[{}];for(;m=Le.exec(u.replace(Me,""));)m[4]?x.shift():m[3]?(p=m[3].replace(pe," ").trim(),x.unshift(x[0][p]=x[0][p]||{})):x[0][m[1]]=m[2].replace(pe," ").trim();return x[0]})(e);A[i]=H(o?{["@keyframes "+i]:d}:d,a?"":"."+i)}let l=a&&A.g?A.g:null;return a&&(A.g=A[i]),((d,u,m,p)=>{p?u.data=u.data.replace(p,d):u.data.indexOf(d)===-1&&(u.data=m?d+u.data:u.data+d)})(A[i],t,n,l),i},Ae=(e,t,a)=>e.reduce((n,o,r)=>{let i=t[r];if(i&&i.call){let l=i(a),d=l&&l.props&&l.props.className||/^go/.test(l)&&l;i=d?"."+d:l&&typeof l=="object"?l.props?"":H(l,""):l===!1?"":l}return n+o+(i??"")},"");function ie(e){let t=this||{},a=e.call?e(t.p):e;return Re(a.unshift?a.raw?Ae(a,[].slice.call(arguments,1),t.p):a.reduce((n,o)=>Object.assign(n,o&&o.call?o(t.p):o),{}):a,Ie(t.target),t.g,t.o,t.k)}let ge,ce,de;ie.bind({g:1});let P=ie.bind({k:1});function Pe(e,t,a,n){H.p=t,ge=e,ce=a,de=n}function B(e,t){let a=this||{};return function(){let n=arguments;function o(r,i){let l=Object.assign({},r),d=l.className||o.className;a.p=Object.assign({theme:ce&&ce()},l),a.o=/ *go\d+/.test(d),l.className=ie.apply(a,n)+(d?" "+d:"");let u=e;return e[0]&&(u=l.as||e,delete l.as),de&&u[0]&&de(l),ge(u,l)}return t?t(o):o}}var qe=e=>typeof e=="function",ae=(e,t)=>qe(e)?e(t):e,Oe=(()=>{let e=0;return()=>(++e).toString()})(),xe=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),ze=20,me="default",ve=(e,t)=>{let{toastLimit:a}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,a)};case 1:return{...e,toasts:e.toasts.map(i=>i.id===t.toast.id?{...i,...t.toast}:i)};case 2:let{toast:n}=t;return ve(e,{type:e.toasts.find(i=>i.id===n.id)?1:0,toast:n});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(i=>i.id===o||o===void 0?{...i,dismissed:!0,visible:!1}:i)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(i=>i.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let r=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(i=>({...i,pauseDuration:i.pauseDuration+r}))}}},te=[],ye={toasts:[],pausedAt:void 0,settings:{toastLimit:ze}},M={},be=(e,t=me)=>{M[t]=ve(M[t]||ye,e),te.forEach(([a,n])=>{a===t&&n(M[t])})},je=e=>Object.keys(M).forEach(t=>be(e,t)),He=e=>Object.keys(M).find(t=>M[t].toasts.some(a=>a.id===e)),ne=(e=me)=>t=>{be(t,e)},Be={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ve=(e={},t=me)=>{let[a,n]=c.useState(M[t]||ye),o=c.useRef(M[t]);c.useEffect(()=>(o.current!==M[t]&&n(M[t]),te.push([t,n]),()=>{let i=te.findIndex(([l])=>l===t);i>-1&&te.splice(i,1)}),[t]);let r=a.toasts.map(i=>{var l,d,u;return{...e,...e[i.type],...i,removeDelay:i.removeDelay||((l=e[i.type])==null?void 0:l.removeDelay)||(e==null?void 0:e.removeDelay),duration:i.duration||((d=e[i.type])==null?void 0:d.duration)||(e==null?void 0:e.duration)||Be[i.type],style:{...e.style,...(u=e[i.type])==null?void 0:u.style,...i.style}}});return{...a,toasts:r}},We=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||Oe()}),Y=e=>(t,a)=>{let n=We(t,e,a);return ne(n.toasterId||He(n.id))({type:2,toast:n}),n.id},k=(e,t)=>Y("blank")(e,t);k.error=Y("error");k.success=Y("success");k.loading=Y("loading");k.custom=Y("custom");k.dismiss=(e,t)=>{let a={type:3,toastId:e};t?ne(t)(a):je(a)};k.dismissAll=e=>k.dismiss(void 0,e);k.remove=(e,t)=>{let a={type:4,toastId:e};t?ne(t)(a):je(a)};k.removeAll=e=>k.remove(void 0,e);k.promise=(e,t,a)=>{let n=k.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(o=>{let r=t.success?ae(t.success,o):void 0;return r?k.success(r,{id:n,...a,...a==null?void 0:a.success}):k.dismiss(n),o}).catch(o=>{let r=t.error?ae(t.error,o):void 0;r?k.error(r,{id:n,...a,...a==null?void 0:a.error}):k.dismiss(n)}),e};var Qe=1e3,Ue=(e,t="default")=>{let{toasts:a,pausedAt:n}=Ve(e,t),o=c.useRef(new Map).current,r=c.useCallback((p,x=Qe)=>{if(o.has(p))return;let v=setTimeout(()=>{o.delete(p),i({type:4,toastId:p})},x);o.set(p,v)},[]);c.useEffect(()=>{if(n)return;let p=Date.now(),x=a.map(v=>{if(v.duration===1/0)return;let D=(v.duration||0)+v.pauseDuration-(p-v.createdAt);if(D<0){v.visible&&k.dismiss(v.id);return}return setTimeout(()=>k.dismiss(v.id,t),D)});return()=>{x.forEach(v=>v&&clearTimeout(v))}},[a,n,t]);let i=c.useCallback(ne(t),[t]),l=c.useCallback(()=>{i({type:5,time:Date.now()})},[i]),d=c.useCallback((p,x)=>{i({type:1,toast:{id:p,height:x}})},[i]),u=c.useCallback(()=>{n&&i({type:6,time:Date.now()})},[n,i]),m=c.useCallback((p,x)=>{let{reverseOrder:v=!1,gutter:D=8,defaultPosition:h}=x||{},j=a.filter(y=>(y.position||h)===(p.position||h)&&y.height),g=j.findIndex(y=>y.id===p.id),N=j.filter((y,C)=>C<g&&y.visible).length;return j.filter(y=>y.visible).slice(...v?[N+1]:[0,N]).reduce((y,C)=>y+(C.height||0)+D,0)},[a]);return c.useEffect(()=>{a.forEach(p=>{if(p.dismissed)r(p.id,p.removeDelay);else{let x=o.get(p.id);x&&(clearTimeout(x),o.delete(p.id))}})},[a,r]),{toasts:a,handlers:{updateHeight:d,startPause:l,endPause:u,calculateOffset:m}}},Ye=P`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ke=P`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Je=P`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Ze=B("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Ye} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ke} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Je} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Xe=P`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Ge=B("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Xe} 1s linear infinite;
`,es=P`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ss=P`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ts=B("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${es} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ss} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,as=B("div")`
  position: absolute;
`,is=B("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ns=P`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,rs=B("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ns} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,os=({toast:e})=>{let{icon:t,type:a,iconTheme:n}=e;return t!==void 0?typeof t=="string"?c.createElement(rs,null,t):t:a==="blank"?null:c.createElement(is,null,c.createElement(Ge,{...n}),a!=="loading"&&c.createElement(as,null,a==="error"?c.createElement(Ze,{...n}):c.createElement(ts,{...n})))},ls=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,cs=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ds="0%{opacity:0;} 100%{opacity:1;}",ms="0%{opacity:1;} 100%{opacity:0;}",us=B("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ps=B("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,hs=(e,t)=>{let a=e.includes("top")?1:-1,[n,o]=xe()?[ds,ms]:[ls(a),cs(a)];return{animation:t?`${P(n)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${P(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},fs=c.memo(({toast:e,position:t,style:a,children:n})=>{let o=e.height?hs(e.position||t||"top-center",e.visible):{opacity:0},r=c.createElement(os,{toast:e}),i=c.createElement(ps,{...e.ariaProps},ae(e.message,e));return c.createElement(us,{className:e.className,style:{...o,...a,...e.style}},typeof n=="function"?n({icon:r,message:i}):c.createElement(c.Fragment,null,r,i))});Pe(c.createElement);var gs=({id:e,className:t,style:a,onHeightUpdate:n,children:o})=>{let r=c.useCallback(i=>{if(i){let l=()=>{let d=i.getBoundingClientRect().height;n(e,d)};l(),new MutationObserver(l).observe(i,{subtree:!0,childList:!0,characterData:!0})}},[e,n]);return c.createElement("div",{ref:r,className:t,style:a},o)},xs=(e,t)=>{let a=e.includes("top"),n=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:xe()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...n,...o}},vs=ie`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=16,ys=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:n,children:o,toasterId:r,containerStyle:i,containerClassName:l})=>{let{toasts:d,handlers:u}=Ue(a,r);return c.createElement("div",{"data-rht-toaster":r||"",style:{position:"fixed",zIndex:9999,top:ee,left:ee,right:ee,bottom:ee,pointerEvents:"none",...i},className:l,onMouseEnter:u.startPause,onMouseLeave:u.endPause},d.map(m=>{let p=m.position||t,x=u.calculateOffset(m,{reverseOrder:e,gutter:n,defaultPosition:t}),v=xs(p,x);return c.createElement(gs,{id:m.id,key:m.id,onHeightUpdate:u.updateHeight,className:m.visible?vs:"",style:v},m.type==="custom"?ae(m.message,m):o?o(m):c.createElement(fs,{toast:m,position:p}))}))},se=k;const bs=()=>{const e=new Date;return e.getMonth()===6&&e.getDate()===24};function js({t:e,rsvpData:t}){const a=Ee(),n=bs();return s.jsxs(E.div,{className:"rsvp-form-container",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0},children:[s.jsx(ys,{position:"bottom-center",toastOptions:{duration:5e3,style:{position:"sticky",top:0,maxWidth:"90vw",width:"auto",minWidth:"300px",margin:"0 auto 20px",padding:"16px 24px",background:"linear-gradient(135deg, #fffaf0, #fff5f8)",color:"#5a3e36",fontFamily:"'Playfair Display', serif",fontSize:"16px",fontWeight:500,letterSpacing:"0.5px",borderRadius:"20px",border:"2px solid rgba(218, 165, 32, 0.3)",boxShadow:"0 8px 20px rgba(218, 165, 32, 0.15)",textAlign:"center",backdropFilter:"blur(4px)"},success:{style:{background:"linear-gradient(135deg, #fff1e6, #ffe6f0)",color:"#a76f46",border:"2px solid rgba(255, 215, 0, 0.3)"},iconTheme:{primary:"#f7c948",secondary:"#fffaf0"}},error:{style:{background:"linear-gradient(135deg, #fff0f0, #ffe6eb)",color:"#d85c5c",border:"2px solid rgba(255, 99, 71, 0.3)"},iconTheme:{primary:"#e74c3c",secondary:"#fff0f0"}}}}),s.jsx("div",{className:"rsvp-form",children:t.confirmed===!0?s.jsxs(s.Fragment,{children:[s.jsx("h2",{className:"rsvp-form-title",children:e("welcome")}),t.alreadyResponded?s.jsxs("div",{className:"contact-info",children:[s.jsx("h3",{className:"contact-title",children:e("alreadyConfirmed")}),s.jsx("p",{children:e("contactChanges")}),s.jsxs("div",{className:"contact-details",children:[s.jsxs("div",{className:"contact-item",children:[s.jsx("span",{children:"📧"}),s.jsx("span",{children:"marius.adrian97@gmail.com"})]}),s.jsxs("div",{className:"contact-item",children:[s.jsx("span",{children:"📱"}),s.jsx("span",{children:"+40 730 327 146"})]})]}),s.jsxs("div",{className:"menu-options",children:[s.jsxs(E.div,{className:`menu-option ${n?"":"disabled"}`,whileHover:n?{scale:1.05}:{},whileTap:n?{scale:.95}:{},onClick:()=>{if(!n){se("Funcția de fotografii este disponibilă doar pe 24 iulie.");return}a("/photos")},children:[s.jsx("h3",{className:"menu-option-title",children:e("takePhoto")}),s.jsx("p",{className:"menu-option-description",children:e("takePhotoDesc")})]}),s.jsxs(E.div,{className:"menu-option",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>se(e("menuNotReady")),children:[s.jsx("h3",{className:"menu-option-title",children:e("restaurantMenu")}),s.jsx("p",{className:"menu-option-description",children:e("viewMenu")})]}),s.jsxs(E.div,{className:"menu-option",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>window.open("https://maps.app.goo.gl/26SqD4Qux6zUrSaf8","_blank"),children:[s.jsx("h3",{className:"menu-option-title",children:e("location")}),s.jsx("p",{className:"menu-option-description",children:e("findLocation")})]})]})]}):s.jsxs(s.Fragment,{children:[s.jsx("p",{className:"invitation-message",children:e("thankYouAccept")}),s.jsxs("div",{className:"menu-options",children:[s.jsxs(E.div,{className:`menu-option ${n?"":"disabled"}`,whileHover:n?{scale:1.05}:{},whileTap:n?{scale:.95}:{},onClick:()=>{if(!n){se("Photo feature is only available on July 24th");return}a("/photos")},children:[s.jsx("h3",{className:"menu-option-title",children:e("takePhoto")}),s.jsx("p",{className:"menu-option-description",children:e("takePhotoDesc")})]}),s.jsxs(E.div,{className:"menu-option",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>se(e("menuNotReady")),children:[s.jsx("h3",{className:"menu-option-title",children:e("restaurantMenu")}),s.jsx("p",{className:"menu-option-description",children:e("viewMenu")})]}),s.jsxs(E.div,{className:"menu-option",whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>window.open("https://maps.app.goo.gl/26SqD4Qux6zUrSaf8","_blank"),children:[s.jsx("h3",{className:"menu-option-title",children:e("location")}),s.jsx("p",{className:"menu-option-description",children:e("findLocation")})]})]})]})]}):s.jsxs(s.Fragment,{children:[s.jsx("h2",{className:"rsvp-form-title",children:e("thankYou")}),s.jsx("p",{className:"invitation-message",children:e("thankYouDecline")}),s.jsx("p",{children:e("contactChanges")}),s.jsxs("div",{className:"contact-details",children:[s.jsxs("div",{className:"contact-item",children:[s.jsx("span",{children:"📧"}),s.jsx("a",{className:"email-contact",href:"mailto:marius.adrian97@gmail.com",children:"marius.adrian97@gmail.com"})]}),s.jsxs("div",{className:"contact-item",children:[s.jsx("span",{children:"📱"}),s.jsx("span",{children:"+40 730 327 146"})]})]})]})})]})}const Ns=()=>s.jsx("div",{className:"floating-hearts",children:[...Array(6)].map((e,t)=>s.jsx("div",{className:"heart",style:{animationDelay:`${t*.5}s`},children:s.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"currentColor",children:s.jsx("path",{d:"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"})})},t))}),ws=({guestName:e,onConfirm:t,message:a,bride:n,groom:o,venueLink:r,venueName:i,t:l,members:d,household:u})=>s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"header-flourish",children:s.jsxs("svg",{viewBox:"0 0 300 50",className:"flourish-svg",children:[s.jsx("path",{d:"M0,25 Q75,8 150,25 T300,25",stroke:"currentColor",strokeWidth:"1.5",fill:"none",opacity:"0.4"}),s.jsx("path",{d:"M50,30 Q150,12 250,30",stroke:"currentColor",strokeWidth:"0.8",fill:"none",opacity:"0.3"}),s.jsx("circle",{cx:"150",cy:"25",r:"3",fill:"currentColor",opacity:"0.6"}),s.jsx("path",{d:"M140,25 L160,25 M150,15 L150,35",stroke:"currentColor",strokeWidth:"1",opacity:"0.5"})]})}),s.jsxs("div",{className:"invitation-title",children:[s.jsx("h2",{className:"title-text",children:l("invitation.title")}),s.jsx("div",{className:"title-underline"})]}),s.jsxs("div",{className:"together-wrapper",children:[s.jsx("span",{className:"decorative-line left"}),s.jsx("div",{className:"dance-container",children:s.jsx("img",{className:"dance-image",src:"/assets/dance.gif",alt:"Celebration"})}),s.jsx("span",{className:"decorative-line right"})]}),s.jsxs("div",{className:"invitation-main",children:[s.jsx("p",{className:"honor-text",children:l("invitation.honorText")}),s.jsx("p",{className:"presence-text",children:l("invitation.presenceText")}),s.jsx("div",{className:"couple-names-wrapper",children:s.jsxs("h1",{className:"couple-names",children:[s.jsx("span",{className:"bride-name",children:n}),s.jsxs("div",{className:"ampersand-wrapper",children:[s.jsx("span",{className:"ampersand-decoration left-decoration",children:"𓆩❤︎𓆪"}),s.jsx("span",{className:"ampersand",children:l("invitation.and")}),s.jsx("span",{className:"ampersand-decoration right-decoration",children:"𓆩❤︎𓆪"})]}),s.jsx("span",{className:"groom-name",children:o})]})}),s.jsx("div",{className:"story-wrapper",children:s.jsxs("p",{className:"story-text",children:["Cu binecuvântarea părinților și alături de nașii noștri",s.jsx("br",{}),s.jsx("span",{className:"story-names",children:"Mihai & Bianca"}),s.jsx("br",{}),"Am decis să pornim împreună pe drumul vieții și să vă invităm cu mult drag să ne fiți alături în cea mai importantă zi din viața noastră.",s.jsx("br",{}),"Vă așteaptăm în data de"]})}),s.jsxs("div",{className:"date-wrapper",children:[s.jsx("div",{className:"date-ornament",children:"✦"}),s.jsx("div",{className:"date-content",children:s.jsx("p",{className:"date-text",children:l("invitation.date")})}),s.jsx("div",{className:"date-ornament",children:"✦"})]}),s.jsxs("div",{className:"details-section",children:[s.jsxs("div",{className:"time-wrapper",children:[s.jsxs("svg",{className:"icon-clock",width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:[s.jsx("circle",{cx:"12",cy:"12",r:"10",strokeWidth:"1.5"}),s.jsx("path",{d:"M12 6v6l4 2",strokeWidth:"1.5"})]}),s.jsx("p",{className:"time",children:l("invitation.time")})]}),s.jsxs("a",{href:r,target:"_blank",rel:"noopener noreferrer",className:"venue-wrapper",children:[s.jsxs("svg",{className:"icon-location",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",children:[s.jsx("path",{d:"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",strokeWidth:"1.5"}),s.jsx("circle",{cx:"12",cy:"9",r:"2.5",strokeWidth:"1.5"})]}),s.jsx("p",{className:"venue",children:i})]})]}),s.jsxs("div",{className:"message-wrapper",children:[s.jsx("span",{className:"quote-mark left",children:'"'}),s.jsx("p",{className:"invitation-message",children:a}),s.jsx("span",{className:"quote-mark right",children:'"'})]}),s.jsx("div",{className:"ps-wrapper",children:s.jsx("p",{className:"honor-text animate-fade-in",children:l("invitation.psText")})})]}),s.jsxs("div",{className:"rsvp-section",children:[s.jsx("div",{className:"rsvp-divider",children:s.jsx("span",{className:"divider-ornament"})}),e&&s.jsx("div",{className:"guest-section",children:s.jsxs("p",{className:"guest-name",children:[s.jsx("span",{className:"guest-prefix",children:"Pentru"}),s.jsx("span",{className:"guest-name-text",children:e})]})}),s.jsxs("button",{className:"confirm-btn",onClick:t,children:[s.jsx("span",{className:"btn-text",children:l("invitation.confirmButton")}),s.jsx("span",{className:"btn-decoration",children:"♡"})]})]}),s.jsx("div",{className:"footer-flourish",children:s.jsx("svg",{viewBox:"0 0 200 30",className:"flourish-svg",children:s.jsx("path",{d:"M20,15 Q100,5 180,15",stroke:"currentColor",strokeWidth:"0.5",fill:"none",opacity:"0.2"})})})]});function _s({guestName:e,onConfirm:t,message:a=null,bride:n="Adelina",groom:o="Marius",venueLink:r="https://maps.app.goo.gl/26SqD4Qux6zUrSaf8",venueName:i="Imperial Palace",members:l=null,household:d=null}){const{t:u}=he(),[m,p]=c.useState(!1);c.useEffect(()=>{p(!0)},[]);const x=a||u("invitation.message");return s.jsx(E.div,{className:`luxury-invitation-wrapper ${m?"visible":""}`,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{duration:.8},children:s.jsxs("div",{className:"invitation-card",children:[s.jsx("div",{className:"feather-top","aria-hidden":"true"}),s.jsx(Ns,{}),s.jsx("div",{className:"invitation-content",children:s.jsx(ws,{guestName:e,onConfirm:t,message:x,bride:n,groom:o,venueLink:r,venueName:i,t:u,members:l,household:d})}),s.jsx("div",{className:"feather-bottom","aria-hidden":"true"})]})})}function ks({t:e,selectedGuest:t,lastName:a,showRsvpForm:n,rsvpData:o,handleRsvpChange:r,submit:i,submitRsvpForm:l,householdConfirm:d,setHouseholdConfirm:u}){const[m,p]=c.useState(null),[x,v]=c.useState(null);c.useEffect(()=>{let h=!0;async function j(){if(p(null),v(null),!(!t||!t.household_id)){console.debug("InvitationFlow: selectedGuest has household_id",t);try{const g=t.household_id,{data:N,error:y}=await W.from("households").select("id, last_name, first_names, member_ids, display_name").eq("id",g).limit(1).single();if(y||!N||!h)return;v(N);const C=N.member_ids||[];if(C.length){const{data:K}=await W.from("guests").select("id, first_name, last_name").in("id",C);if(K&&h){const q=C.map(V=>K.find(I=>I.id===V)).filter(V=>V);if(p(q),u){const V=q.filter(I=>I.id!==(t==null?void 0:t.id)).map(I=>I.id);u(V)}console.debug("InvitationFlow: loaded household members in order",q)}}}catch(g){console.error("Failed to load household members",g)}}}return j(),()=>{h=!1}},[t]);const D=()=>{if(!t)return"";if(m&&m.length>1){const h=m.map(g=>g.last_name);if(h.every(g=>g===h[0])){const g=m.map(y=>y.first_name),N=m[0].last_name;if(g.length===2)return`${g[0]} si ${g[1]} ${N}`;{const y=g.slice(0,-1).join(", "),C=g[g.length-1];return`${y} si ${C} ${N}`}}else return m.map(N=>`${N.first_name} ${N.last_name}`).join(" si ")}return`${t==null?void 0:t.first_name} ${a}`};return s.jsx(E.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},transition:{duration:.8},children:n?s.jsx(E.div,{className:"rsvp-form-container",initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},children:s.jsxs("div",{className:"rsvp-form",children:[s.jsx("h2",{className:"rsvp-form-title",children:e("withPleasure")}),s.jsxs("form",{onSubmit:l,children:[s.jsxs("div",{className:"rsvp-form-group",children:[s.jsx("label",{className:"rsvp-form-label",children:e("willYouJoin")}),s.jsxs("select",{className:"rsvp-form-select",name:"attending",value:o.attending,onChange:r,required:!0,children:[s.jsx("option",{value:"",children:e("pleaseChoose")}),s.jsx("option",{value:"yes",children:e("yesAnswer")}),s.jsx("option",{value:"no",children:e("noAnswer")})]})]}),o.attending==="yes"&&s.jsxs("div",{className:"rsvp-form-group",children:[s.jsx("label",{className:"rsvp-form-label",children:e("bringingGuests")}),s.jsxs("select",{className:"rsvp-form-select",name:"bringing_guests",value:o.bringing_guests,onChange:r,required:!0,children:[s.jsx("option",{value:"",children:e("pleaseChoose")}),s.jsx("option",{value:"yes",children:e("yesBringGuests")}),s.jsx("option",{value:"no",children:e("noBringGuests")})]}),o.bringing_guests==="yes"&&s.jsxs("div",{className:"guests-input-container visible",children:[s.jsx("label",{className:"rsvp-form-label",children:e("guestNames")}),s.jsx("input",{type:"text",className:"rsvp-form-input",name:"guest_names",value:o.guest_names,onChange:r,placeholder:e("enterGuestNames"),required:!0})]})]}),o.attending==="yes"&&s.jsxs("div",{className:"rsvp-form-group",children:[s.jsx("label",{className:"rsvp-form-label",children:e("songRequest")}),s.jsx("input",{type:"text",className:"rsvp-form-input",name:"song_request",value:o.song_request,onChange:r,placeholder:e("shareSong")})]}),m&&m.length>1&&s.jsxs("div",{className:"rsvp-form-group household-confirm-group",children:[s.jsx("label",{className:"rsvp-form-label",children:e("confirmForHousehold")}),s.jsx("div",{className:"household-members-list",children:m.filter(h=>h.id!==(t==null?void 0:t.id)).map(h=>{const j=(d==null?void 0:d.includes(h.id))||!1;return s.jsxs("label",{className:"household-member-checkbox",children:[s.jsx("input",{type:"checkbox",checked:j,onChange:g=>{u&&(g.target.checked?u(N=>[...N,h.id]):u(N=>N.filter(y=>y!==h.id)))}}),s.jsxs("span",{className:"household-member-name",children:[h.first_name," ",h.last_name]})]},h.id)})})]}),s.jsx("button",{type:"submit",className:"rsvp-submit-btn",children:e("sendResponse")})]})]})}):s.jsx(_s,{guestName:D(),members:m,household:x||(t!=null&&t.household_id?{display_name:t!=null&&t.last_name?`Familia ${t.last_name}`:void 0,last_name:t==null?void 0:t.last_name}:void 0),onConfirm:i,message:t==null?void 0:t.message})},"invitation")}function Es(){const{t:e}=he(),t=c.useRef(null),[a,n]=c.useState(!1),[o,r]=c.useState(!0),[i,l]=c.useState(!1),[d,u]=c.useState(!1),[m,p]=c.useState(!1),[x,v]=c.useState(!1),[D,h]=c.useState(!1),[j,g]=c.useState(""),[N,y]=c.useState([]),[C,K]=c.useState(""),[q,V]=c.useState(null),[I,L]=c.useState([]),[re,Q]=c.useState(-1),[Ne,J]=c.useState(!1),[T,oe]=c.useState({attending:"",bringing_guests:"",guest_names:"",song_request:"",confirmed:null,alreadyResponded:!1}),[Z,we]=c.useState([]);c.useEffect(()=>{if(!d)return;const w=1200,f=500,S=setTimeout(()=>{l(!0)},w),R=setTimeout(()=>{r(!1),n(!0)},w+f);return()=>{clearTimeout(S),clearTimeout(R)}},[d]),c.useEffect(()=>{var w;(w=document.querySelector(".invite-root"))==null||w.classList.add("revealed")},[]),c.useEffect(()=>{const w=_=>_.replace(/\s+/g," ").trim(),f=_=>{try{return _.normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"")}catch{return _.normalize?_.normalize("NFD").replace(/[\u0300-\u036f]/g,""):_}};if(j){const _=w(j);if(_!==j){g(_);return}}const S=j?f(j):"",R=setTimeout(async()=>{if(S.length<3){y([]),L([]),J(!1);return}J(!0);try{const{data:_}=await W.from("guests").select("id, first_name, message, last_name, household_id").order("last_name, first_name");if(_){const $=_.filter(b=>f(b.last_name.toLowerCase()).startsWith(S.toLowerCase())),O=new Set,F=$.map(b=>b.last_name).filter(b=>{const z=f(b.toLowerCase());return O.has(z)?!1:(O.add(z),!0)}).map(b=>({last_name:b}));if(F.length===0&&S.length>3){for(let b=S.length-1;b>=3;b--){const z=S.substring(0,b),le=_.filter(X=>f(X.last_name.toLowerCase()).startsWith(z.toLowerCase()));if(le.length>0){const X=new Set,G=le.map(U=>U.last_name).find(U=>{const ue=f(U.toLowerCase());return X.has(ue)?!1:(X.add(ue),!0)});if(G){g(G),L([{last_name:G}]),y(le.filter(U=>f(U.last_name.toLowerCase())===f(G.toLowerCase()))),J(!1);return}}}L([]),y([])}else{if(L(F),F.length===1){const b=F[0].last_name;g(b),L([])}else if(F.length>0){const b=F[0].last_name;f(j.toLowerCase())===f(b.toLowerCase())&&g(b)}y($)}}else y([]),L([])}catch(_){console.error("Search error:",_),y([]),L([])}finally{J(!1)}},300);return()=>clearTimeout(R)},[j]);const _e=w=>{if(I.length)switch(w.key){case"ArrowDown":w.preventDefault(),Q(f=>f<I.length-1?f+1:f);break;case"ArrowUp":w.preventDefault(),Q(f=>f>0?f-1:0);break;case"Enter":re>=0&&(w.preventDefault(),g(I[re].last_name),L([]),Q(-1));break;case"Escape":L([]),Q(-1);break}},ke=()=>{l(!0),setTimeout(()=>{r(!1),n(!0)},500)},Se=w=>{const{name:f,value:S}=w.target;oe(R=>({...R,[f]:S}))},Ce=async()=>{if(!C)return alert(e("pleaseSelectFirstName"));const w=N.find(R=>R.id===C);if(!w)return alert(e("pleaseSelectValidGuest"));const{data:f,error:S}=await W.from("guests").select("confirmed, bringing_guests, guest_names, song_request").eq("id",w.id).single();if(S)return console.error("Error checking RSVP status:",S);if(f.confirmed!==null){oe({attending:f.confirmed?"yes":"no",bringing_guests:f.bringing_guests?"yes":"no",guest_names:f.guest_names||"",song_request:f.song_request||"",confirmed:f.confirmed,alreadyResponded:!0}),v(!1),p(!1),h(!0);return}v(!0)},$e=async w=>{w.preventDefault();const f=N.find($=>$.id===C);if(!f)return;const S=T.attending==="yes",{error:R}=await W.from("guests").update({confirmed:S,bringing_guests:T.bringing_guests==="yes",guest_names:T.guest_names,song_request:T.song_request,telegram_notified:!0}).eq("id",f.id);if(R)return alert("Failed to confirm RSVP");let _=[];if(Z.length>0){const{data:$}=await W.from("guests").select("id, first_name, last_name").in("id",Z),{error:O}=await W.from("guests").update({confirmed:S,telegram_notified:!0}).in("id",Z);O?console.error("Failed to confirm household members:",O):$&&(_=$.map(F=>`${F.first_name} ${F.last_name}`))}try{const $="8431124097:AAFH7hvQzhSRV8rbiM2RlEqi3iCummVWxFQ",O="2081487409,7920065032".split(",").filter(Boolean);if(!$||O.length===0)throw new Error("Telegram env vars missing");const F=S?"✅ CONFIRMĂ":"❌ NU PARTICIPĂ";let b=`🎉 <b>RSVP Nou!</b>

`;b+=`👤 <b>Invitat:</b> ${f.first_name} ${f.last_name}
`,b+=`📋 <b>Status:</b> ${F}
`,S&&(T.bringing_guests==="yes"&&T.guest_names&&(b+=`👥 <b>Vine cu:</b> ${T.guest_names}
`),T.song_request&&(b+=`🎵 <b>Melodie:</b> ${T.song_request}
`)),_.length>0&&(b+=`
👨‍👩‍👧‍👦 <b>Confirmat și pentru:</b>
`,_.forEach(z=>b+=`  • ${z}
`)),b+=`
⏰ ${new Date().toLocaleString("ro-RO",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Europe/Bucharest"})}`;for(const z of O)await fetch(`https://api.telegram.org/bot${$}/sendMessage`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:z,text:b,parse_mode:"HTML"})})}catch($){console.warn("Telegram notification failed:",$)}oe($=>({...$,confirmed:S,alreadyResponded:!0})),v(!1),p(!1),h(!0)};return s.jsxs(s.Fragment,{children:[o&&s.jsx("div",{className:`envelope-overlay ${i?"fade-out":""}`,onClick:ke,role:"button","aria-label":"Deschide invitația",children:s.jsx("img",{src:"/assets/envelope-overlay.gif",alt:"Envelope opening",className:"envelope-gif",style:{opacity:d?1:0},onLoad:()=>u(!0)})}),s.jsxs(E.div,{className:"invite-root",initial:{opacity:0},animate:{opacity:a?1:0},transition:{duration:.8,delay:.2},style:{visibility:a?"visible":"hidden"},children:[s.jsx("video",{className:"bg-video",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,children:s.jsx("source",{src:"/assets/bride-groom.mp4",type:"video/mp4"})}),s.jsx("div",{className:"overlay"}),s.jsx(Te,{mode:"wait",children:D?s.jsx(js,{t:e,rsvpData:T}):m?s.jsx(ks,{selectedGuest:q,lastName:j,submit:Ce,message:q==null?void 0:q.message,showRsvpForm:x,submitRsvpForm:$e,rsvpData:T,handleRsvpChange:Se,householdConfirm:Z,setHouseholdConfirm:we,t:e}):s.jsx(Fe,{t:e,lastName:j,setLastName:g,inputRef:t,loading:Ne,suggestions:I,activeSuggestion:re,handleKeyDown:_e,setSuggestions:L,setActiveSuggestion:Q,firstOptions:N,selectedFirst:C,setSelectedFirst:K,setSelectedGuest:V,setShowInvitation:p})})]})]})}export{Es as default};
