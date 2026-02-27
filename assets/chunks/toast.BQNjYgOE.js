import{i as l,b as d,a as m,t as f}from"./custom-element.CqqzorC7.js";import{n as c,r as u}from"./svgIcon.tOr_DqM2.js";import"./framework.D4gD1YR5.js";var g=Object.defineProperty,y=Object.getOwnPropertyDescriptor,r=(i,s,a,t)=>{for(var e=t>1?void 0:t?y(s,a):s,n=i.length-1,p;n>=0;n--)(p=i[n])&&(e=(t?p(s,a,e):p(e))||e);return t&&e&&g(s,a,e),e};let o=class extends l{constructor(){super(...arguments),this.message="",this.type="info",this.duration=2e3,this.leaving=!1}connectedCallback(){super.connectedCallback(),setTimeout(()=>this.close(),this.duration)}close(){this.leaving=!0,setTimeout(()=>this.remove(),300)}render(){return d`
      <div
        class="toast-container toast-container--${this.type} ${this.leaving?"toast-leave":"toast-enter"}"
      >
        <g1-svg-icon name="${this.type}" size="20"></g1-svg-icon>
        <span class="toast-message">${this.message}</span>
      </div>
    `}};o.styles=m`
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
  `;r([c({type:String})],o.prototype,"message",2);r([c({type:String})],o.prototype,"type",2);r([c({type:Number})],o.prototype,"duration",2);r([u()],o.prototype,"leaving",2);o=r([f("g1-toast")],o);function h(i,s="info",a=2e3){const t=document.createElement("g1-toast");t.message=i,t.type=s,t.duration=a,document.body.appendChild(t)}export{o as Toast,h as showToast};
