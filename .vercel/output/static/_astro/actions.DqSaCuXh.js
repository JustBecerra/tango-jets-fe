import{R as I}from"./index.CqbGxsOR.js";const $=e=>{let t;const r=new Set,s=(i,p)=>{const g=typeof i=="function"?i(t):i;if(!Object.is(g,t)){const m=t;t=p??(typeof g!="object"||g===null)?g:Object.assign({},t,g),r.forEach(d=>d(t,m))}},a=()=>t,u={setState:s,getState:a,getInitialState:()=>h,subscribe:i=>(r.add(i),()=>r.delete(i))},h=t=e(s,a,u);return u},O=e=>e?$(e):$,P=e=>e;function j(e,t=P){const r=I.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return I.useDebugValue(r),r}const T=e=>{const t=O(e),r=s=>j(t,s);return Object.assign(r,t),r},F=e=>e?T(e):T;function E(e,t){let r;try{r=e()}catch{return}return{getItem:a=>{var o;const f=h=>h===null?null:JSON.parse(h,void 0),u=(o=r.getItem(a))!=null?o:null;return u instanceof Promise?u.then(f):f(u)},setItem:(a,o)=>r.setItem(a,JSON.stringify(o,void 0)),removeItem:a=>r.removeItem(a)}}const b=e=>t=>{try{const r=e(t);return r instanceof Promise?r:{then(s){return b(s)(r)},catch(s){return this}}}catch(r){return{then(s){return this},catch(s){return b(s)(r)}}}},k=(e,t)=>(r,s,a)=>{let o={storage:E(()=>localStorage),partialize:n=>n,version:0,merge:(n,S)=>({...S,...n}),...t},f=!1;const u=new Set,h=new Set;let i=o.storage;if(!i)return e((...n)=>{console.warn(`[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`),r(...n)},s,a);const p=()=>{const n=o.partialize({...s()});return i.setItem(o.name,{state:n,version:o.version})},g=a.setState;a.setState=(n,S)=>{g(n,S),p()};const m=e((...n)=>{r(...n),p()},s,a);a.getInitialState=()=>m;let d;const w=()=>{var n,S;if(!i)return;f=!1,u.forEach(c=>{var l;return c((l=s())!=null?l:m)});const v=((S=o.onRehydrateStorage)==null?void 0:S.call(o,(n=s())!=null?n:m))||void 0;return b(i.getItem.bind(i))(o.name).then(c=>{if(c)if(typeof c.version=="number"&&c.version!==o.version){if(o.migrate){const l=o.migrate(c.state,c.version);return l instanceof Promise?l.then(y=>[!0,y]):[!0,l]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,c.state];return[!1,void 0]}).then(c=>{var l;const[y,H]=c;if(d=o.merge(H,(l=s())!=null?l:m),r(d,!0),y)return p()}).then(()=>{v?.(d,void 0),d=s(),f=!0,h.forEach(c=>c(d))}).catch(c=>{v?.(void 0,c)})};return a.persist={setOptions:n=>{o={...o,...n},n.storage&&(i=n.storage)},clearStorage:()=>{i?.removeItem(o.name)},getOptions:()=>o,rehydrate:()=>w(),hasHydrated:()=>f,onHydrate:n=>(u.add(n),()=>{u.delete(n)}),onFinishHydration:n=>(h.add(n),()=>{h.delete(n)})},o.skipHydration||w(),d||m},_=k,R=F(_(e=>({flights:[],updateFlights:t=>e({flights:t}),airships:[],updateAirships:t=>e({airships:t}),clients:[],updateClients:t=>e({clients:t})}),{name:"data-storage",storage:E(()=>sessionStorage)}));async function J(){try{const e=await fetch("https://vuelos-be.onrender.com/flights");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);return await e.json()}catch(e){throw console.error("Error fetching flights:",e),e}}async function N({id:e,phase:t}){try{const r=await fetch(`https://vuelos-be.onrender.com/flight/phase/${e}/${t}`,{method:"PUT"});if(!r.ok)throw new Error(`Failed to complete phase: ${r.statusText}`);return r.ok}catch(r){return console.error("error completing phase",r),{error:r}}}async function C(e){try{const t=await fetch(`https://vuelos-be.onrender.com/flight/${e}`);if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return await t.json()}catch(t){throw console.error(`Error fetching flight #${e}`,t),t}}async function D(e){try{const t=await fetch("https://vuelos-be.onrender.com/flight",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);const r=await t.text();return r?JSON.parse(r):{}}catch(t){throw console.error("Error adding flight:",t),t}}export{D as a,C as b,J as g,N as p,R as u};