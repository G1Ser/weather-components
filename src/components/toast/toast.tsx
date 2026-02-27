import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "@/components/svgIcon/svgIcon";
import infoSvg from "@/assets/svgs/info.svg?raw";
import successSvg from "@/assets/svgs/success.svg?raw";
import errorSvg from "@/assets/svgs/error.svg?raw";

type ToastType = "success" | "error" | "info";

const ICONS: Record<ToastType, string> = {
  info: infoSvg,
  success: successSvg,
  error: errorSvg,
};

@customElement("g1-toast")
class Toast extends LitElement {
  @property({ type: String }) message = "";
  @property({ type: String }) type: ToastType = "info";
  @property({ type: Number }) duration = 2000;

  @state() private leaving = false;

  static styles = css`
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

  connectedCallback() {
    super.connectedCallback();
    setTimeout(() => this.close(), this.duration);
  }

  close() {
    this.leaving = true;
    setTimeout(() => this.remove(), 300);
  }

  render() {
    return html`
      <div
        class="toast-container toast-container--${this.type} ${this.leaving
          ? "toast-leave"
          : "toast-enter"}"
      >
        <g1-svg-icon .svg="${ICONS[this.type]}" size="20"></g1-svg-icon>
        <span class="toast-message">${this.message}</span>
      </div>
    `;
  }
}

// ==========================================
// 命令式调用
// ==========================================

export function showToast(
  message: string,
  type: ToastType = "info",
  duration = 2000,
): void {
  const toast = document.createElement("g1-toast") as Toast;
  toast.message = message;
  toast.type = type;
  toast.duration = duration;
  document.body.appendChild(toast);
}
