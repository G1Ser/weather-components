(function(c,$){typeof exports=="object"&&typeof module<"u"?$(exports):typeof define=="function"&&define.amd?define(["exports"],$):(c=typeof globalThis<"u"?globalThis:c||self,$(c.G1Components={}))})(this,(function(c){"use strict";const $=globalThis,j=$.ShadowRoot&&($.ShadyCSS===void 0||$.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),J=new WeakMap;let K=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(j&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=J.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&J.set(e,t))}return t}toString(){return this.cssText}};const ft=r=>new K(typeof r=="string"?r:r+"",void 0,B),L=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new K(e,r,B)},gt=(r,t)=>{if(j)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=$.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Q=j?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ft(e)})(r):r;const{is:$t,defineProperty:vt,getOwnPropertyDescriptor:_t,getOwnPropertyNames:mt,getOwnPropertySymbols:yt,getPrototypeOf:St}=Object,k=globalThis,tt=k.trustedTypes,At=tt?tt.emptyScript:"",wt=k.reactiveElementPolyfillSupport,P=(r,t)=>r,H={toAttribute(r,t){switch(t){case Boolean:r=r?At:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},V=(r,t)=>!$t(r,t),et={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:V};Symbol.metadata??=Symbol("metadata"),k.litPropertyMetadata??=new WeakMap;let E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=et){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&vt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=_t(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){const h=i?.call(this);n?.call(this,o),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??et}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=St(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const e=this.properties,s=[...mt(e),...yt(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Q(i))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return gt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(s.converter?.toAttribute!==void 0?s.converter:H).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),o=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:H;this._$Em=i;const h=o.fromAttribute(e,n.type);this[i]=h??this._$Ej?.get(i)??h,this._$Em=null}}requestUpdate(t,e,s,i=!1,n){if(t!==void 0){const o=this.constructor;if(i===!1&&(n=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??V)(n,e)||s.useDefault&&s.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),n!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[i,n]of this._$Ep)this[i]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,n]of s){const{wrapped:o}=n,h=this[i];o!==!0||this._$AL.has(i)||h===void 0||this.C(i,void 0,n,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[P("elementProperties")]=new Map,E[P("finalized")]=new Map,wt?.({ReactiveElement:E}),(k.reactiveElementVersions??=[]).push("2.1.2");const G=globalThis,st=r=>r,z=G.trustedTypes,it=z?z.createPolicy("lit-html",{createHTML:r=>r}):void 0,rt="$lit$",v=`lit$${Math.random().toFixed(9).slice(2)}$`,nt="?"+v,bt=`<${nt}>`,m=document,O=()=>m.createComment(""),T=r=>r===null||typeof r!="object"&&typeof r!="function",W=Array.isArray,Et=r=>W(r)||typeof r?.[Symbol.iterator]=="function",q=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ot=/-->/g,at=/>/g,y=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,lt=/"/g,ct=/^(?:script|style|textarea|title)$/i,Ct=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),F=Ct(1),C=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),dt=new WeakMap,S=m.createTreeWalker(m,129);function pt(r,t){if(!W(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return it!==void 0?it.createHTML(t):t}const xt=(r,t)=>{const e=r.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",o=U;for(let h=0;h<e;h++){const a=r[h];let p,u,l=-1,g=0;for(;g<a.length&&(o.lastIndex=g,u=o.exec(a),u!==null);)g=o.lastIndex,o===U?u[1]==="!--"?o=ot:u[1]!==void 0?o=at:u[2]!==void 0?(ct.test(u[2])&&(i=RegExp("</"+u[2],"g")),o=y):u[3]!==void 0&&(o=y):o===y?u[0]===">"?(o=i??U,l=-1):u[1]===void 0?l=-2:(l=o.lastIndex-u[2].length,p=u[1],o=u[3]===void 0?y:u[3]==='"'?lt:ht):o===lt||o===ht?o=y:o===ot||o===at?o=U:(o=y,i=void 0);const _=o===y&&r[h+1].startsWith("/>")?" ":"";n+=o===U?a+bt:l>=0?(s.push(p),a.slice(0,l)+rt+a.slice(l)+v+_):a+v+(l===-2?h:_)}return[pt(r,n+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class M{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const h=t.length-1,a=this.parts,[p,u]=xt(t,e);if(this.el=M.createElement(p,s),S.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=S.nextNode())!==null&&a.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(rt)){const g=u[o++],_=i.getAttribute(l).split(v),R=/([.?@])?(.*)/.exec(g);a.push({type:1,index:n,name:R[2],strings:_,ctor:R[1]==="."?Ot:R[1]==="?"?Tt:R[1]==="@"?Ut:I}),i.removeAttribute(l)}else l.startsWith(v)&&(a.push({type:6,index:n}),i.removeAttribute(l));if(ct.test(i.tagName)){const l=i.textContent.split(v),g=l.length-1;if(g>0){i.textContent=z?z.emptyScript:"";for(let _=0;_<g;_++)i.append(l[_],O()),S.nextNode(),a.push({type:2,index:++n});i.append(l[g],O())}}}else if(i.nodeType===8)if(i.data===nt)a.push({type:2,index:n});else{let l=-1;for(;(l=i.data.indexOf(v,l+1))!==-1;)a.push({type:7,index:n}),l+=v.length-1}n++}}static createElement(t,e){const s=m.createElement("template");return s.innerHTML=t,s}}function x(r,t,e=r,s){if(t===C)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl;const n=T(t)?void 0:t._$litDirective$;return i?.constructor!==n&&(i?._$AO?.(!1),n===void 0?i=void 0:(i=new n(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=x(r,i._$AS(r,t.values),i,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??m).importNode(e,!0);S.currentNode=i;let n=S.nextNode(),o=0,h=0,a=s[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new N(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Mt(n,this,t)),this._$AV.push(p),a=s[++h]}o!==a?.index&&(n=S.nextNode(),o++)}return S.currentNode=m,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=x(this,t,e),T(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Et(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(m.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=M.createElement(pt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const n=new Pt(i,this),o=n.u(this.options);n.p(e),this.T(o),this._$AH=n}}_$AC(t){let e=dt.get(t.strings);return e===void 0&&dt.set(t.strings,e=new M(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new N(this.O(O()),this.O(O()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=st(t).nextSibling;st(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class I{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(n===void 0)t=x(this,t,e,0),o=!T(t)||t!==this._$AH&&t!==C,o&&(this._$AH=t);else{const h=t;let a,p;for(t=n[0],a=0;a<n.length-1;a++)p=x(this,h[s+a],e,a),p===C&&(p=this._$AH[a]),o||=!T(p)||p!==this._$AH[a],p===d?t=d:t!==d&&(t+=(p??"")+n[a+1]),this._$AH[a]=p}o&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ot extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class Tt extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Ut extends I{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=x(this,t,e,0)??d)===C)return;const s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){x(this,t)}}const Nt=G.litHtmlPolyfillSupport;Nt?.(M,N),(G.litHtmlVersions??=[]).push("3.3.2");const Dt=(r,t,e)=>{const s=e?.renderBefore??t;let i=s._$litPart$;if(i===void 0){const n=e?.renderBefore??null;s._$litPart$=i=new N(t.insertBefore(O(),n),n,void 0,e??{})}return i._$AI(r),i};const X=globalThis;class A extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Dt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return C}}A._$litElement$=!0,A.finalized=!0,X.litElementHydrateSupport?.({LitElement:A});const kt=X.litElementPolyfillSupport;kt?.({LitElement:A}),(X.litElementVersions??=[]).push("4.2.2");const Y=r=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(r,t)}):customElements.define(r,t)};const Ht={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:V},zt=(r=Ht,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),n.set(e.name,r),s==="accessor"){const{name:o}=e;return{set(h){const a=t.get.call(this);t.set.call(this,h),this.requestUpdate(o,a,r,!0,h)},init(h){return h!==void 0&&this.C(o,void 0,r,h),h}}}if(s==="setter"){const{name:o}=e;return function(h){const a=this[o];t.call(this,h),this.requestUpdate(o,a,r,!0,h)}}throw Error("Unsupported decorator location: "+s)};function f(r){return(t,e)=>typeof e=="object"?zt(r,t,e):((s,i,n)=>{const o=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),o?Object.getOwnPropertyDescriptor(i,n):void 0})(r,t,e)}function ut(r){return f({...r,state:!0,attribute:!1})}var It=Object.getOwnPropertyDescriptor,Rt=(r,t,e,s)=>{for(var i=s>1?void 0:s?It(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=o(i)||i);return i};c.Skeleton=class extends A{render(){return F`<div class="skeleton-item"></div>`}},c.Skeleton.styles=L`
    :host {
      display: block;
      box-sizing: border-box;
    }
    .skeleton-item {
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: inherit;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    .skeleton-item::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.05),
        rgba(0, 0, 0, 0)
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }
  `,c.Skeleton=Rt([Y("g1-skeleton")],c.Skeleton);var jt=Object.defineProperty,Bt=Object.getOwnPropertyDescriptor,w=(r,t,e,s)=>{for(var i=s>1?void 0:s?Bt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&jt(t,e,i),i};const Z={basePath:""};function Lt(r){Object.assign(Z,r)}c.SvgIcon=class extends A{constructor(){super(...arguments),this.name="",this.src="",this.svg="",this.size="1rem",this.color="currentColor",this.currentSvgNode=null}updated(t){if(super.updated(t),(t.has("svg")||t.has("src")||t.has("name"))&&this.loadSvg(),t.has("size")){const e=/^\d+(\.\d+)?$/.test(this.size)?`${this.size}px`:this.size;this.style.setProperty("--icon-size",e)}t.has("color")&&this.style.setProperty("--icon-color",this.color)}loadSvg(){if(this.svg)this.parseSvgString(this.svg);else if(this.src)this.fetchSvg(this.src);else if(this.name&&Z.basePath){const t=`${Z.basePath.replace(/\/$/,"")}/${this.name}.svg`;this.fetchSvg(t)}else this.currentSvgNode=null}parseSvgString(t){const s=new DOMParser().parseFromString(t,"image/svg+xml");this.currentSvgNode=s.querySelector("svg")}async fetchSvg(t){try{const e=await fetch(t);if(!e.ok)throw new Error(`HTTP ${e.status}`);const s=await e.text();this.parseSvgString(s)}catch(e){console.warn(`[g1-svg-icon] Failed to fetch SVG: ${t}`,e),this.currentSvgNode=null}}render(){return F`<div part="wrapper" class="icon-wrapper">
      ${this.currentSvgNode}
    </div>`}},c.SvgIcon.styles=L`
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
  `,w([f({type:String})],c.SvgIcon.prototype,"name",2),w([f({type:String})],c.SvgIcon.prototype,"src",2),w([f({type:String})],c.SvgIcon.prototype,"svg",2),w([f({type:String})],c.SvgIcon.prototype,"size",2),w([f({type:String})],c.SvgIcon.prototype,"color",2),w([ut()],c.SvgIcon.prototype,"currentSvgNode",2),c.SvgIcon=w([Y("g1-svg-icon")],c.SvgIcon);const Vt=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1768320099105"
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4632" width="14"
    height="14" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path
        d="M597.333333 213.333333c0 46.933333-38.4 85.333333-85.333333 85.333334s-85.333333-38.4-85.333333-85.333334 38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333333 85.333333zM597.333333 810.666667c0 46.933333-38.4 85.333333-85.333333 85.333333s-85.333333-38.4-85.333333-85.333333v-341.333334c0-46.933333 38.4-85.333333 85.333333-85.333333s85.333333 38.4 85.333333 85.333333v341.333334z"
        fill="#1890ff" p-id="4633"></path>
</svg>`,Gt=`<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767871993491"
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1646"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">
    <path
        d="M122.28096 536.623104c-9.940992-9.925632-11.548672-25.360384-2.78528-36.407296l20.487168-25.828352c8.397824-10.58816 24.108032-13.246464 35.211264-5.835776l177.3312 118.35904c9.353216 6.243328 25.452544 5.430272 34.185216-1.654784l468.5824-380.16c10.532864-8.54528 27.030528-7.817216 36.261888 1.400832l11.542528 11.52512c10.04544 10.03008 9.314304 25.951232-1.215488 36.465664l-502.92736 502.183936c-15.64672 15.624192-41.337856 14.94016-57.445376-1.142784l-219.22816-218.9056z"
        fill="#52c41a" p-id="1647"></path>
</svg>`,Wt=`<?xml version="1.0" standalone="no"?>\r
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767872123766"\r
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6243"\r
    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">\r
    <path d="M265.28 310.72a32 32 0 0 1 45.44-45.44l448 448a32 32 0 0 1-45.44 45.44z" p-id="6244" fill="#ff4d4f"></path>\r
    <path d="M713.28 265.28a32 32 0 0 1 45.44 45.44l-448 448a32 32 0 0 1-45.44-45.44z" p-id="6245" fill="#ff4d4f">\r
    </path>\r
</svg>`;var qt=Object.defineProperty,Ft=Object.getOwnPropertyDescriptor,D=(r,t,e,s)=>{for(var i=s>1?void 0:s?Ft(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&qt(t,e,i),i};const Xt={info:Vt,success:Gt,error:Wt};let b=class extends A{constructor(){super(...arguments),this.message="",this.type="info",this.duration=2e3,this.leaving=!1}connectedCallback(){super.connectedCallback(),setTimeout(()=>this.close(),this.duration)}close(){this.leaving=!0,setTimeout(()=>this.remove(),300)}render(){return F`
      <div
        class="toast-container toast-container--${this.type} ${this.leaving?"toast-leave":"toast-enter"}"
      >
        <g1-svg-icon .svg="${Xt[this.type]}" size="20"></g1-svg-icon>
        <span class="toast-message">${this.message}</span>
      </div>
    `}};b.styles=L`
    .toast-container {
      position: fixed;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      padding: 12px 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast-container--success {
      background-color: #163b34;
      border: 1px solid #348353;
    }
    .toast-container--info {
      background-color: #003a8c;
      border: 1px solid #096dd9;
    }
    .toast-container--error {
      background-color: #4f0d0e;
      border: 1px solid #a7363a;
    }
    .toast-message {
      font-size: 12px;
      color: var(--toast-text-color, #f5f7f9);
    }
    .toast-enter {
      animation: toast-in 0.5s ease-out;
    }
    .toast-leave {
      animation: toast-out 0.3s ease-in forwards;
    }
    @keyframes toast-in {
      from {
        top: 10px;
        opacity: 0;
      }
      to {
        top: 30px;
        opacity: 1;
      }
    }
    @keyframes toast-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `,D([f({type:String})],b.prototype,"message",2),D([f({type:String})],b.prototype,"type",2),D([f({type:Number})],b.prototype,"duration",2),D([ut()],b.prototype,"leaving",2),b=D([Y("g1-toast")],b);function Yt(r,t="info",e=2e3){const s=document.createElement("g1-toast");s.message=r,s.type=t,s.duration=e,document.body.appendChild(s)}c.configureSvgIcon=Lt,c.showToast=Yt,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})}));
