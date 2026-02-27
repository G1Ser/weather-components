import{ag as g,a0 as l}from"./framework.D4gD1YR5.js";import{f as d,u as h,i as _,b as m,a as f,t as y}from"./custom-element.CqqzorC7.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:d},S=(t=b,s,r)=>{const{kind:o,metadata:e}=r;let i=globalThis.litPropertyMetadata.get(e);if(i===void 0&&globalThis.litPropertyMetadata.set(e,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){const{name:n}=r;return{set(a){const v=s.get.call(this);s.set.call(this,a),this.requestUpdate(n,v,t,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(o==="setter"){const{name:n}=r;return function(a){const v=this[n];s.call(this,a),this.requestUpdate(n,v,t,!0,a)}}throw Error("Unsupported decorator location: "+o)};function u(t){return(s,r)=>typeof r=="object"?S(t,s,r):((o,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O(t){return u({...t,state:!0,attribute:!1})}var P=Object.defineProperty,w=Object.getOwnPropertyDescriptor,p=(t,s,r,o)=>{for(var e=o>1?void 0:o?w(s,r):s,i=t.length-1,n;i>=0;i--)(n=t[i])&&(e=(o?n(s,r,e):n(e))||e);return o&&e&&P(s,r,e),e};let c=class extends _{constructor(){super(...arguments),this.name="",this.size="1rem",this.color="currentColor",this.currentSvgNode=null}connectedCallback(){super.connectedCallback()}updated(t){if(super.updated(t),t.has("name")&&this.loadSvg(),t.has("size")){const s=/^\d+(\.\d+)?$/.test(this.size)?`${this.size}px`:this.size;this.style.setProperty("--icon-size",s)}t.has("color")&&this.style.setProperty("--icon-color",this.color)}async loadSvg(){if(!this.name){this.currentSvgNode=null;return}const t=await g(Object.assign({"../../assets/svgs/error.svg":()=>l(()=>import("./error.BLAh9Kze.js"),[]),"../../assets/svgs/home.svg":()=>l(()=>import("./home.DQVepCD8.js"),[]),"../../assets/svgs/info.svg":()=>l(()=>import("./info.DTxWTx-3.js"),[]),"../../assets/svgs/success.svg":()=>l(()=>import("./success.D1uXvGBK.js"),[]),"../../assets/svgs/thumb.svg":()=>l(()=>import("./thumb.BnWCI_DA.js"),[])}),`../../assets/svgs/${this.name}.svg`,5),s=typeof t=="string"?t:t.default,e=new DOMParser().parseFromString(s,"image/svg+xml").querySelector("svg");this.currentSvgNode=e}render(){return m` <div class="icon-wrapper">${this.currentSvgNode}</div> `}};c.styles=f`
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
    }
  `;p([u({type:String})],c.prototype,"name",2);p([u({type:String})],c.prototype,"size",2);p([u({type:String})],c.prototype,"color",2);p([O()],c.prototype,"currentSvgNode",2);c=p([y("g1-svg-icon")],c);const D=Object.freeze(Object.defineProperty({__proto__:null,get SvgIcon(){return c}},Symbol.toStringTag,{value:"Module"}));export{u as n,O as r,D as s};
