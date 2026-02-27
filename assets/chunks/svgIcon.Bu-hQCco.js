import{f as u,u as v,i as d,b as f,a as S,t as y}from"./custom-element.CqqzorC7.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:u},w=(t=b,e,r)=>{const{kind:o,metadata:s}=r;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){const{name:n}=r;return{set(a){const p=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,p,t,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(o==="setter"){const{name:n}=r;return function(a){const p=this[n];e.call(this,a),this.requestUpdate(n,p,t,!0,a)}}throw Error("Unsupported decorator location: "+o)};function h(t){return(e,r)=>typeof r=="object"?w(t,e,r):((o,s,i)=>{const n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function m(t){return h({...t,state:!0,attribute:!1})}var z=Object.defineProperty,O=Object.getOwnPropertyDescriptor,l=(t,e,r,o)=>{for(var s=o>1?void 0:o?O(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&z(e,r,s),s};const g={basePath:""};function P(t){Object.assign(g,t)}let c=class extends d{constructor(){super(...arguments),this.name="",this.src="",this.svg="",this.size="1rem",this.color="currentColor",this.currentSvgNode=null}updated(t){if(super.updated(t),(t.has("svg")||t.has("src")||t.has("name"))&&this.loadSvg(),t.has("size")){const e=/^\d+(\.\d+)?$/.test(this.size)?`${this.size}px`:this.size;this.style.setProperty("--icon-size",e)}t.has("color")&&this.style.setProperty("--icon-color",this.color)}loadSvg(){if(this.svg)this.parseSvgString(this.svg);else if(this.src)this.fetchSvg(this.src);else if(this.name&&g.basePath){const t=`${g.basePath.replace(/\/$/,"")}/${this.name}.svg`;this.fetchSvg(t)}else this.currentSvgNode=null}parseSvgString(t){const r=new DOMParser().parseFromString(t,"image/svg+xml");this.currentSvgNode=r.querySelector("svg")}async fetchSvg(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status}`);const r=await e.text();this.parseSvgString(r)}catch(e){console.warn(`[g1-svg-icon] Failed to fetch SVG: ${t}`,e),this.currentSvgNode=null}}render(){return f`<div part="wrapper" class="icon-wrapper">
      ${this.currentSvgNode}
    </div>`}};c.styles=S`
    :host {
      display: inline-block;
      width: var(--icon-size);
      height: var(--icon-size);
      box-sizing: border-box;
    }
    .icon-wrapper svg {
      width: 100%;
      height: 100%;
      color: var(--g1-icon-color, var(--icon-color));
      transition: color 0.3s ease;
      will-change: color;
    }
  `;l([h({type:String})],c.prototype,"name",2);l([h({type:String})],c.prototype,"src",2);l([h({type:String})],c.prototype,"svg",2);l([h({type:String})],c.prototype,"size",2);l([h({type:String})],c.prototype,"color",2);l([m()],c.prototype,"currentSvgNode",2);c=l([y("g1-svg-icon")],c);const $=Object.freeze(Object.defineProperty({__proto__:null,get SvgIcon(){return c},configureSvgIcon:P},Symbol.toStringTag,{value:"Module"}));export{h as n,m as r,$ as s};
