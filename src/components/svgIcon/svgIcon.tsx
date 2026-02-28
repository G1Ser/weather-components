import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

// ==========================================
// 全局配置
// ==========================================

export interface SvgIconConfig {
  /**
   * SVG 文件根路径（运行时 URL），配置后 name 属性自动拼接路径并 fetch。
   * @example
   * configureSvgIcon({ basePath: '/icons' })
   * // 之后使用: <g1-svg-icon name="home" />
   * // 运行时自动请求: /icons/home.svg
   */
  basePath: string;
}

const _config: SvgIconConfig = {
  basePath: "",
};

export function configureSvgIcon(config: Partial<SvgIconConfig>) {
  Object.assign(_config, config);
}

// ==========================================
// 组件定义
// ==========================================

@customElement("g1-svg-icon")
export class SvgIcon extends LitElement {
  // --- 对外暴露的属性 ---

  /** 图标名称，需配合 configureSvgIcon({ basePath }) 使用 */
  @property({ type: String }) name = "";
  /** SVG 文件的完整 URL，运行时自动 fetch */
  @property({ type: String }) src = "";
  /** 原始 SVG 字符串，消费者用 import icon from './icon.svg?raw' 后传入 */
  @property({ type: String }) svg = "";

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
      will-change: color;
    }
  `;

  // ==========================================
  // Lit 生命周期钩子
  // ==========================================

  updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (
      changedProperties.has("svg") ||
      changedProperties.has("src") ||
      changedProperties.has("name")
    ) {
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

  /**
   * 按优先级加载 SVG：
   * 1. svg prop（原始字符串，直接解析，无网络请求）
   * 2. src prop（完整 URL，运行时 fetch）
   * 3. name + basePath（运行时 fetch）
   */
  private loadSvg() {
    if (this.svg) {
      this.parseSvgString(this.svg);
    } else if (this.src) {
      this.fetchSvg(this.src);
    } else if (this.name && _config.basePath) {
      const url = `${_config.basePath.replace(/\/$/, "")}/${this.name}.svg`;
      this.fetchSvg(url);
    } else {
      this.currentSvgNode = null;
    }
  }

  private parseSvgString(svgString: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    this.currentSvgNode = doc.querySelector("svg");
  }

  private async fetchSvg(url: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      this.parseSvgString(text);
    } catch (e) {
      console.warn(`[g1-svg-icon] Failed to fetch SVG: ${url}`, e);
      this.currentSvgNode = null;
    }
  }

  render() {
    return html`<div part="wrapper" class="icon-wrapper">
      ${this.currentSvgNode}
    </div>`;
  }
}
