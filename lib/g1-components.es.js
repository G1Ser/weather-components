const H = globalThis, L = H.ShadowRoot && (H.ShadyCSS === void 0 || H.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, V = /* @__PURE__ */ Symbol(), J = /* @__PURE__ */ new WeakMap();
let ht = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== V) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (L && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = J.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && J.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (r) => new ht(typeof r == "string" ? r : r + "", void 0, V), W = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new ht(e, r, V);
}, ft = (r, t) => {
  if (L) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = H.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, K = L ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return $t(e);
})(r) : r;
const { is: gt, defineProperty: vt, getOwnPropertyDescriptor: _t, getOwnPropertyNames: mt, getOwnPropertySymbols: yt, getPrototypeOf: At } = Object, R = globalThis, Q = R.trustedTypes, wt = Q ? Q.emptyScript : "", St = R.reactiveElementPolyfillSupport, P = (r, t) => r, z = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? wt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, G = (r, t) => !gt(r, t), tt = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: G };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), R.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let b = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = tt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && vt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = _t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const h = i?.call(this);
      o?.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? tt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(P("elementProperties"))) return;
    const t = At(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(P("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(P("properties"))) {
      const e = this.properties, s = [...mt(e), ...yt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(K(i));
    } else t !== void 0 && e.push(K(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ft(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (s.converter?.toAttribute !== void 0 ? s.converter : z).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), n = typeof o.converter == "function" ? { fromAttribute: o.converter } : o.converter?.fromAttribute !== void 0 ? o.converter : z;
      this._$Em = i;
      const h = n.fromAttribute(e, o.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    if (t !== void 0) {
      const n = this.constructor;
      if (i === !1 && (o = this[t]), s ??= n.getPropertyOptions(t), !((s.hasChanged ?? G)(o, e) || s.useDefault && s.reflect && o === this._$Ej?.get(t) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, o] of this._$Ep) this[i] = o;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, o] of s) {
        const { wrapped: n } = o, h = this[i];
        n !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, o, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[P("elementProperties")] = /* @__PURE__ */ new Map(), b[P("finalized")] = /* @__PURE__ */ new Map(), St?.({ ReactiveElement: b }), (R.reactiveElementVersions ??= []).push("2.1.2");
const q = globalThis, et = (r) => r, k = q.trustedTypes, st = k ? k.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, lt = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + v, bt = `<${ct}>`, A = document, O = () => A.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", F = Array.isArray, Et = (r) => F(r) || typeof r?.[Symbol.iterator] == "function", B = `[ 	
\f\r]`, C = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, rt = />/g, _ = RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, nt = /"/g, pt = /^(?:script|style|textarea|title)$/i, xt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), X = xt(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), p = /* @__PURE__ */ Symbol.for("lit-nothing"), at = /* @__PURE__ */ new WeakMap(), m = A.createTreeWalker(A, 129);
function dt(r, t) {
  if (!F(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return st !== void 0 ? st.createHTML(t) : t;
}
const Ct = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = C;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, d, l = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, d = n.exec(a), d !== null); ) u = n.lastIndex, n === C ? d[1] === "!--" ? n = it : d[1] !== void 0 ? n = rt : d[2] !== void 0 ? (pt.test(d[2]) && (i = RegExp("</" + d[2], "g")), n = _) : d[3] !== void 0 && (n = _) : n === _ ? d[0] === ">" ? (n = i ?? C, l = -1) : d[1] === void 0 ? l = -2 : (l = n.lastIndex - d[2].length, c = d[1], n = d[3] === void 0 ? _ : d[3] === '"' ? nt : ot) : n === nt || n === ot ? n = _ : n === it || n === rt ? n = C : (n = _, i = void 0);
    const g = n === _ && r[h + 1].startsWith("/>") ? " " : "";
    o += n === C ? a + bt : l >= 0 ? (s.push(c), a.slice(0, l) + lt + a.slice(l) + v + g) : a + v + (l === -2 ? h : g);
  }
  return [dt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class U {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [c, d] = Ct(t, e);
    if (this.el = U.createElement(c, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(lt)) {
          const u = d[n++], g = i.getAttribute(l).split(v), D = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: D[2], strings: g, ctor: D[1] === "." ? Ot : D[1] === "?" ? Tt : D[1] === "@" ? Ut : j }), i.removeAttribute(l);
        } else l.startsWith(v) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if (pt.test(i.tagName)) {
          const l = i.textContent.split(v), u = l.length - 1;
          if (u > 0) {
            i.textContent = k ? k.emptyScript : "";
            for (let g = 0; g < u; g++) i.append(l[g], O()), m.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[u], O());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ct) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(v, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += v.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(r, t, e = r, s) {
  if (t === E) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const o = T(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== o && (i?._$AO?.(!1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = x(r, i._$AS(r, t.values), i, s)), t;
}
class Pt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? A).importNode(e, !0);
    m.currentNode = i;
    let o = m.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new N(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new Nt(o, this, t)), this._$AV.push(c), a = s[++h];
      }
      n !== a?.index && (o = m.nextNode(), n++);
    }
    return m.currentNode = A, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = x(this, t, e), T(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Et(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== p && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = U.createElement(dt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const o = new Pt(i, this), n = o.u(this.options);
      o.p(e), this.T(n), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = at.get(t.strings);
    return e === void 0 && at.set(t.strings, e = new U(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new N(this.O(O()), this.O(O()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = et(t).nextSibling;
      et(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = p;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = x(this, t, e, 0), n = !T(t) || t !== this._$AH && t !== E, n && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = x(this, h[s + a], e, a), c === E && (c = this._$AH[a]), n ||= !T(c) || c !== this._$AH[a], c === p ? t = p : t !== p && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ot extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Tt extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Ut extends j {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? p) === E) return;
    const s = this._$AH, i = t === p && s !== p || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== p && (s === p || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const Mt = q.litHtmlPolyfillSupport;
Mt?.(U, N), (q.litHtmlVersions ??= []).push("3.3.2");
const Dt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = e?.renderBefore ?? null;
    s._$litPart$ = i = new N(t.insertBefore(O(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const Y = globalThis;
class y extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Dt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
y._$litElement$ = !0, y.finalized = !0, Y.litElementHydrateSupport?.({ LitElement: y });
const Ht = Y.litElementPolyfillSupport;
Ht?.({ LitElement: y });
(Y.litElementVersions ??= []).push("4.2.2");
const Z = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
const zt = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: G }, kt = (r = zt, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, r, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, r, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function f(r) {
  return (t, e) => typeof e == "object" ? kt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
function ut(r) {
  return f({ ...r, state: !0, attribute: !1 });
}
var Rt = Object.getOwnPropertyDescriptor, jt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Rt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = n(i) || i);
  return i;
};
let I = class extends y {
  render() {
    return X`<div class="skeleton-item"></div>`;
  }
};
I.styles = W`
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
  `;
I = jt([
  Z("g1-skeleton")
], I);
var Bt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, S = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? It(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Bt(t, e, i), i;
};
const Lt = {
  basePath: ""
};
let $ = class extends y {
  constructor() {
    super(...arguments), this.name = "", this.src = "", this.svg = "", this.size = "1rem", this.color = "currentColor", this.currentSvgNode = null;
  }
  // ==========================================
  // Lit 生命周期钩子
  // ==========================================
  updated(r) {
    if (super.updated(r), (r.has("svg") || r.has("src") || r.has("name")) && this.loadSvg(), r.has("size")) {
      const t = /^\d+(\.\d+)?$/.test(this.size) ? `${this.size}px` : this.size;
      this.style.setProperty("--icon-size", t);
    }
    r.has("color") && this.style.setProperty("--icon-color", this.color);
  }
  // ==========================================
  // 核心业务逻辑
  // ==========================================
  /**
   * 按优先级加载 SVG：
   * 1. svg prop（原始字符串，直接解析，无网络请求）
   * 2. src prop（完整 URL，运行时 fetch）
   * 3. name + basePath（运行时 fetch）
   */
  loadSvg() {
    this.svg ? this.parseSvgString(this.svg) : this.src ? this.fetchSvg(this.src) : this.name && Lt.basePath || (this.currentSvgNode = null);
  }
  parseSvgString(r) {
    const e = new DOMParser().parseFromString(r, "image/svg+xml");
    this.currentSvgNode = e.querySelector("svg");
  }
  async fetchSvg(r) {
    try {
      const t = await fetch(r);
      if (!t.ok) throw new Error(`HTTP ${t.status}`);
      const e = await t.text();
      this.parseSvgString(e);
    } catch (t) {
      console.warn(`[g1-svg-icon] Failed to fetch SVG: ${r}`, t), this.currentSvgNode = null;
    }
  }
  render() {
    return X`<div part="wrapper" class="icon-wrapper">
      ${this.currentSvgNode}
    </div>`;
  }
};
$.styles = W`
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
  `;
S([
  f({ type: String })
], $.prototype, "name", 2);
S([
  f({ type: String })
], $.prototype, "src", 2);
S([
  f({ type: String })
], $.prototype, "svg", 2);
S([
  f({ type: String })
], $.prototype, "size", 2);
S([
  f({ type: String })
], $.prototype, "color", 2);
S([
  ut()
], $.prototype, "currentSvgNode", 2);
$ = S([
  Z("g1-svg-icon")
], $);
const Vt = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1768320099105"
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4632" width="14"
    height="14" xmlns:xlink="http://www.w3.org/1999/xlink">
    <path
        d="M597.333333 213.333333c0 46.933333-38.4 85.333333-85.333333 85.333334s-85.333333-38.4-85.333333-85.333334 38.4-85.333333 85.333333-85.333333 85.333333 38.4 85.333333 85.333333zM597.333333 810.666667c0 46.933333-38.4 85.333333-85.333333 85.333333s-85.333333-38.4-85.333333-85.333333v-341.333334c0-46.933333 38.4-85.333333 85.333333-85.333333s85.333333 38.4 85.333333 85.333333v341.333334z"
        fill="#1890ff" p-id="4633"></path>
</svg>`, Wt = `<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767871993491"
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1646"
    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">
    <path
        d="M122.28096 536.623104c-9.940992-9.925632-11.548672-25.360384-2.78528-36.407296l20.487168-25.828352c8.397824-10.58816 24.108032-13.246464 35.211264-5.835776l177.3312 118.35904c9.353216 6.243328 25.452544 5.430272 34.185216-1.654784l468.5824-380.16c10.532864-8.54528 27.030528-7.817216 36.261888 1.400832l11.542528 11.52512c10.04544 10.03008 9.314304 25.951232-1.215488 36.465664l-502.92736 502.183936c-15.64672 15.624192-41.337856 14.94016-57.445376-1.142784l-219.22816-218.9056z"
        fill="#52c41a" p-id="1647"></path>
</svg>`, Gt = `<?xml version="1.0" standalone="no"?>\r
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1767872123766"\r
    class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6243"\r
    xmlns:xlink="http://www.w3.org/1999/xlink" width="14" height="14">\r
    <path d="M265.28 310.72a32 32 0 0 1 45.44-45.44l448 448a32 32 0 0 1-45.44 45.44z" p-id="6244" fill="#ff4d4f"></path>\r
    <path d="M713.28 265.28a32 32 0 0 1 45.44 45.44l-448 448a32 32 0 0 1-45.44-45.44z" p-id="6245" fill="#ff4d4f">\r
    </path>\r
</svg>`;
var qt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, M = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ft(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && qt(t, e, i), i;
};
const Xt = {
  info: Vt,
  success: Wt,
  error: Gt
};
let w = class extends y {
  constructor() {
    super(...arguments), this.message = "", this.type = "info", this.duration = 2e3, this.leaving = !1;
  }
  connectedCallback() {
    super.connectedCallback(), setTimeout(() => this.close(), this.duration);
  }
  close() {
    this.leaving = !0, setTimeout(() => this.remove(), 300);
  }
  render() {
    return X`
      <div
        class="toast-container toast-container--${this.type} ${this.leaving ? "toast-leave" : "toast-enter"}"
      >
        <g1-svg-icon .svg="${Xt[this.type]}" size="20"></g1-svg-icon>
        <span class="toast-message">${this.message}</span>
      </div>
    `;
  }
};
w.styles = W`
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
  `;
M([
  f({ type: String })
], w.prototype, "message", 2);
M([
  f({ type: String })
], w.prototype, "type", 2);
M([
  f({ type: Number })
], w.prototype, "duration", 2);
M([
  ut()
], w.prototype, "leaving", 2);
w = M([
  Z("g1-toast")
], w);
function Jt(r, t = "info", e = 2e3) {
  const s = document.createElement("g1-toast");
  s.message = r, s.type = t, s.duration = e, document.body.appendChild(s);
}
export {
  I as Skeleton,
  $ as SvgIcon,
  Jt as showToast
};
