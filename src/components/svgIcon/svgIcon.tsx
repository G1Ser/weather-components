import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("g1-svg-icon")
export class SvgIcon extends LitElement {
  // --- 对外暴露的属性 ---
  @property({ type: String }) name = "";
  @property({ type: String }) size = "1rem";
  @property({ type: String }) color = "currentColor";

  // --- 内部状态 ---
  @state() private currentSvgNode: SVGElement | null = null;

  static styles = css`
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
  `;

  // ==========================================
  // Lit 生命周期钩子
  // ==========================================

  /**
   * 1. connectedCallback (挂载阶段)
   */
  connectedCallback() {
    super.connectedCallback();
  }

  /**
   * 2. updated (更新阶段 - 核心响应式逻辑)
   * @param changedProperties 包含了发生变化的属性名和它们对应的旧值。
   */
  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has("name")) {
      this.loadSvg();
    }
    if (changedProperties.has("size")) {
      const size = /^\d+(\.\d+)?$/.test(this.size)
        ? `${this.size}px`
        : this.size;
      this.style.setProperty("--icon-size", size);
    }
    if (changedProperties.has("color")) {
      this.style.setProperty("--icon-color", this.color);
    }
  }

  // ==========================================
  // 核心业务逻辑
  // ==========================================

  // 加载并解析 SVG
  async loadSvg() {
    if (!this.name) {
      this.currentSvgNode = null;
      return;
    }
    // 注意：这里必须保持 `@/assets/svgs/` 作为静态前缀，打包工具才能识别
    const svgModule = await import(`@/assets/svgs/${this.name}.svg?raw`);
    // 提取源码字符串（兼容不同构建工具的默认导出格式）
    const svgString =
      typeof svgModule === "string" ? svgModule : svgModule.default;
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svgElement = doc.querySelector("svg");
    this.currentSvgNode = svgElement;
  }

  /**
   * 3. render (渲染阶段)
   */
  render() {
    return html` <div class="icon-wrapper">${this.currentSvgNode}</div> `;
  }
}
