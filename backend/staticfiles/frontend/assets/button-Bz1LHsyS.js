import{a as o,j as v,d as V,m as R,c as P}from"./index-CKQpsmit.js";/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),S=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(n,t,r)=>r?r.toUpperCase():t.toLowerCase()),y=e=>{const n=S(e);return n.charAt(0).toUpperCase()+n.slice(1)},k=(...e)=>e.filter((n,t,r)=>!!n&&n.trim()!==""&&r.indexOf(n)===t).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var O={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=o.forwardRef(({color:e="currentColor",size:n=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:s="",children:i,iconNode:a,...u},d)=>o.createElement("svg",{ref:d,...O,width:n,height:n,stroke:e,strokeWidth:r?Number(t)*24/Number(n):t,className:k("lucide",s),...u},[...a.map(([l,c])=>o.createElement(l,c)),...Array.isArray(i)?i:[i]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=(e,n)=>{const t=o.forwardRef(({className:r,...s},i)=>o.createElement(W,{ref:i,iconNode:n,className:k(`lucide-${A(y(e))}`,`lucide-${e}`,r),...s}));return t.displayName=y(e),t};function x(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function E(...e){return n=>{let t=!1;const r=e.map(s=>{const i=x(s,n);return!t&&typeof i=="function"&&(t=!0),i});if(t)return()=>{for(let s=0;s<r.length;s++){const i=r[s];typeof i=="function"?i():x(e[s],null)}}}}function H(...e){return o.useCallback(E(...e),e)}var h=o.forwardRef((e,n)=>{const{children:t,...r}=e,s=o.Children.toArray(t),i=s.find($);if(i){const a=i.props.children,u=s.map(d=>d===i?o.Children.count(a)>1?o.Children.only(null):o.isValidElement(a)?a.props.children:null:d);return v.jsx(g,{...r,ref:n,children:o.isValidElement(a)?o.cloneElement(a,void 0,u):null})}return v.jsx(g,{...r,ref:n,children:t})});h.displayName="Slot";var g=o.forwardRef((e,n)=>{const{children:t,...r}=e;if(o.isValidElement(t)){const s=D(t),i=B(r,t.props);return t.type!==o.Fragment&&(i.ref=n?E(n,s):s),o.cloneElement(t,i)}return o.Children.count(t)>1?o.Children.only(null):null});g.displayName="SlotClone";var _=({children:e})=>v.jsx(v.Fragment,{children:e});function $(e){return o.isValidElement(e)&&e.type===_}function B(e,n){const t={...n};for(const r in n){const s=e[r],i=n[r];/^on[A-Z]/.test(r)?s&&i?t[r]=(...u)=>{i(...u),s(...u)}:s&&(t[r]=s):r==="style"?t[r]={...s,...i}:r==="className"&&(t[r]=[s,i].filter(Boolean).join(" "))}return{...e,...t}}function D(e){var r,s;let n=(r=Object.getOwnPropertyDescriptor(e.props,"ref"))==null?void 0:r.get,t=n&&"isReactWarning"in n&&n.isReactWarning;return t?e.ref:(n=(s=Object.getOwnPropertyDescriptor(e,"ref"))==null?void 0:s.get,t=n&&"isReactWarning"in n&&n.isReactWarning,t?e.props.ref:e.props.ref||e.ref)}var L=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],I=L.reduce((e,n)=>{const t=o.forwardRef((r,s)=>{const{asChild:i,...a}=r,u=i?h:n;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),v.jsx(u,{...a,ref:s})});return t.displayName=`Primitive.${n}`,{...e,[n]:t}},{});function K(e,n){e&&V.flushSync(()=>e.dispatchEvent(n))}const C=e=>typeof e=="boolean"?`${e}`:e===0?"0":e,w=R,z=(e,n)=>t=>{var r;if((n==null?void 0:n.variants)==null)return w(e,t==null?void 0:t.class,t==null?void 0:t.className);const{variants:s,defaultVariants:i}=n,a=Object.keys(s).map(l=>{const c=t==null?void 0:t[l],m=i==null?void 0:i[l];if(c===null)return null;const f=C(c)||C(m);return s[l][f]}),u=t&&Object.entries(t).reduce((l,c)=>{let[m,f]=c;return f===void 0||(l[m]=f),l},{}),d=n==null||(r=n.compoundVariants)===null||r===void 0?void 0:r.reduce((l,c)=>{let{class:m,className:f,...j}=c;return Object.entries(j).every(N=>{let[b,p]=N;return Array.isArray(p)?p.includes({...i,...u}[b]):{...i,...u}[b]===p})?[...l,m,f]:l},[]);return w(e,a,d,t==null?void 0:t.class,t==null?void 0:t.className)},U=z("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",{variants:{variant:{default:"bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",destructive:"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",outline:"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",secondary:"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2 has-[>svg]:px-3",sm:"h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",lg:"h-10 rounded-md px-6 has-[>svg]:px-4",icon:"size-9"}},defaultVariants:{variant:"default",size:"default"}});function T({className:e,variant:n,size:t,asChild:r=!1,...s}){const i=r?h:"button";return v.jsx(i,{"data-slot":"button",className:P(U({variant:n,size:t,className:e})),...s})}export{T as B,I as P,h as S,_ as a,z as b,F as c,K as d,E as e,H as u};
