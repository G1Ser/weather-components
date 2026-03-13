import{i as p,b as l,a as v,t as S}from"./custom-element.CqqzorC7.js";import{n,r as u}from"./state.Cip0nMly.js";var f=Object.defineProperty,y=Object.getOwnPropertyDescriptor,i=(t,s,r,c)=>{for(var o=c>1?void 0:c?y(s,r):s,a=t.length-1,h;a>=0;a--)(h=t[a])&&(o=(c?h(s,r,o):h(o))||o);return c&&o&&f(s,r,o),o};const g={basePath:""};function w(t){Object.assign(g,t)}let e=class extends p{constructor(){super(...arguments),this.name="",this.src="",this.svg="",this.size="1rem",this.color="currentColor",this.currentSvgNode=null}updated(t){if(super.updated(t),(t.has("svg")||t.has("src")||t.has("name"))&&this.loadSvg(),t.has("size")){const s=/^\d+(\.\d+)?$/.test(this.size)?`${this.size}px`:this.size;this.style.setProperty("--icon-size",s)}t.has("color")&&this.style.setProperty("--icon-color",this.color)}loadSvg(){if(this.svg)this.parseSvgString(this.svg);else if(this.src)this.fetchSvg(this.src);else if(this.name&&g.basePath){const t=`${g.basePath.replace(/\/$/,"")}/${this.name}.svg`;this.fetchSvg(t)}else this.currentSvgNode=null}parseSvgString(t){const r=new DOMParser().parseFromString(t,"image/svg+xml");this.currentSvgNode=r.querySelector("svg")}async fetchSvg(t){try{const s=await fetch(t);if(!s.ok)throw new Error(`HTTP ${s.status}`);const r=await s.text();this.parseSvgString(r)}catch(s){console.warn(`[g1-svg-icon] Failed to fetch SVG: ${t}`,s),this.currentSvgNode=null}}render(){return l`<div part="wrapper" class="icon-wrapper">
      ${this.currentSvgNode}
    </div>`}};e.styles=v`
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
  `;i([n({type:String})],e.prototype,"name",2);i([n({type:String})],e.prototype,"src",2);i([n({type:String})],e.prototype,"svg",2);i([n({type:String})],e.prototype,"size",2);i([n({type:String})],e.prototype,"color",2);i([u()],e.prototype,"currentSvgNode",2);e=i([S("g1-svg-icon")],e);export{e as SvgIcon,w as configureSvgIcon};
