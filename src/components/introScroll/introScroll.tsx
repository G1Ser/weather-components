import { css, html, LitElement } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import {
  Scene,
  PerspectiveCamera,
  Mesh,
  Points,
  Timer,
  PlaneGeometry,
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  AdditiveBlending,
  AmbientLight,
  DirectionalLight,
  MeshBasicNodeMaterial,
  PointsNodeMaterial,
  WebGPURenderer,
} from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/addons/renderers/CSS3DRenderer.js";
import { uniform } from "three/tsl";
import {
  createAgedPaperTexture,
  buildScrollShaders,
  buildParticleShaders,
} from "./shaders";

/** 卷轴平面宽度（Three.js 世界单位） */
const GEO_W = 2.4;
/** 卷轴平铺（未卷曲）区域高度（Three.js 世界单位） */
const FLAT_H = 1.5;

/**
 * CSS3DObject 元素宽度（CSS 像素）。
 * CSS3D_SCALE 将 CSS px 映射到 Three.js 世界单位：
 *   CONTENT_W × CSS3D_SCALE = GEO_W（视觉上与卷轴等宽）
 */
const CONTENT_W = 500;
const CONTENT_H = Math.round((CONTENT_W * FLAT_H) / GEO_W); // ≈ 346
const CSS3D_SCALE = GEO_W / CONTENT_W; // 0.0052

/** initThreeJS 初始化后挂载到 this.ctx 的场景资源集合 */
type ThreeCtx = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGPURenderer;
  css3dRenderer: CSS3DRenderer;
  controls: OrbitControls;
  /** TSL uniform：燃烧进度（0 → 未燃，≥1.32 → 视为烧尽） */
  burnProgress: ReturnType<typeof uniform>;
  clock: Timer;
  /** 是否已触发燃烧（由 ignite() 设置） */
  startBurn: boolean;
  particleSystem?: Points;
  ambientLight: AmbientLight;
};

@customElement("g1-intro-scroll")
export class IntroScroll extends LitElement {
  /** 燃烧蔓延速度（burnProgress 每秒增量，默认 0.46） */
  @property({ type: Number }) burnSpeed = 0.46;

  /** 是否启用鼠标/触摸轨道旋转控制（默认 true） */
  @property({ type: Boolean }) enableControls = true;

  // ── 内部状态 ──────────────────────────────────────────────────────────────

  /** 是否处于燃烧状态（触发后驱动 CSS burning 类以淡出 slot 内容） */
  @state() private isBurning = false;

  /** ignite() 在 Three.js 初始化完成前被调用时的缓冲标志 */
  private _pendingIgnite = false;

  private ctx: ThreeCtx | null = null;

  /**
   * 轨道控制事件中继处理器。
   * 将插槽内容区域的拖拽 pointerdown 转发给 WebGL canvas，
   * 使 OrbitControls 可在卷轴内容区域正常响应旋转操作。
   */
  private _orbitRelayHandler: ((e: PointerEvent) => void) | null = null;

  // ── DOM 查询 ──────────────────────────────────────────────────────────────
  @query("#webgl-canvas") private canvasContainer!: HTMLElement;
  @query("#css3d-canvas") private css3dCanvas!: HTMLElement;
  @query(".slot-container") private slotContainer!: HTMLElement;

  static styles = css`
    :host {
      --g1-scroll-bg: radial-gradient(
        ellipse at 50% 40%,
        rgba(20, 11, 3, 0.45) 0%,
        rgba(3, 1, 0, 0.8) 60%
      );

      position: fixed;
      inset: 0;
      z-index: 9999;
      margin: auto;
      background: var(--g1-scroll-bg);
      /* 燃烧结束后整体淡出 */
      transition: opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* 燃烧结束 → 添加 [closing] 属性 → 整体淡出 */
    :host([closing]) {
      opacity: 0;
    }

    .scroll-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    #webgl-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    #css3d-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
    }

    .slot-container {
      position: absolute;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transition:
        opacity 0.6s ease,
        filter 0.9s ease;
      will-change: transform, opacity;
    }

    .slot-container.css3d-ready {
      opacity: 1;
    }

    .slot-container.burning {
      opacity: 0;
      filter: blur(5px) brightness(150%) drop-shadow(0 0 12px #c0680099);
    }

    .header-area {
      flex-shrink: 0;
    }

    .main-area {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      scrollbar-width: none;
    }

    .footer-area {
      flex-shrink: 0;
    }
  `;

  render() {
    return html`
      <div class="scroll-wrapper" role="dialog" aria-modal="true">
        <div id="webgl-canvas"></div>
        <div id="css3d-canvas"></div>
        <div class="slot-container ${this.isBurning ? "burning" : ""}">
          <header class="header-area">
            <slot name="header"></slot>
          </header>
          <main class="main-area">
            <slot></slot>
          </main>
          <footer class="footer-area">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `;
  }

  ignite() {
    if (this.isBurning) return;
    this.isBurning = true;
    if (this.ctx) {
      this.ctx.startBurn = true;
    } else {
      this._pendingIgnite = true;
    }
  }

  reset() {
    this.isBurning = false;
    this.removeAttribute("closing");
    if (this.ctx) {
      this.ctx.burnProgress.value = 0.0;
      this.ctx.startBurn = false;
      this.ctx.scene.position.z = 0;
      void this.initThreeJS();
    }
  }
  // lit生命周期
  async firstUpdated() {
    // 等待自定义字体加载，避免首帧字体闪烁
    if ("fonts" in document) {
      await document.fonts.ready;
    }
    // 等一帧，确保 DOM 尺寸已稳定
    await new Promise<void>((r) => requestAnimationFrame(() => r()));
    await this.initThreeJS();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanup();
  }

  /**
   * 销毁 Three.js 上下文，释放 GPU 资源。
   * 在重新初始化前、或组件卸载时调用。
   * 同时将 slot-container 归还原位，保证 <slot> 投影不中断。
   */
  private _cleanup() {
    if (this._orbitRelayHandler) {
      this.slotContainer?.removeEventListener(
        "pointerdown",
        this._orbitRelayHandler,
      );
      this._orbitRelayHandler = null;
    }

    if (this.ctx) {
      this.ctx.renderer.setAnimationLoop(null);
      this.ctx.controls.dispose();
      this.ctx.renderer.dispose();

      // CSS3DRenderer 会把 slot-container 移入其内部层级。
      // 销毁前须归还，否则下次初始化时 <slot> 元素已不在影子 DOM 树中。
      const slotEl = this.slotContainer;
      if (slotEl) {
        const scrollWrapper = this.canvasContainer.parentElement;
        if (scrollWrapper && slotEl.parentElement !== scrollWrapper) {
          scrollWrapper.appendChild(slotEl);
        }
        slotEl.classList.remove("css3d-ready");
        slotEl.style.position = "";
        slotEl.style.inset = "";
        slotEl.style.width = "";
        slotEl.style.height = "";
      }

      this.ctx.css3dRenderer.domElement.remove();
      this.ctx = null;
    }
  }

  /**
   * 初始化 Three.js WebGPU 场景。
   * 包括：渲染器、相机、控制器、CSS3DRenderer、卷轴几何体、木杆、灯光、动画循环。
   */
  private async initThreeJS() {
    this._cleanup();

    const container = this.canvasContainer;
    const w = container.clientWidth || 575;
    const h = container.clientHeight || 770;

    // ── 场景 & 相机 ─────────────────────────────────────────────────────────
    const scene = new Scene();
    const camera = new PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.5); // 相机位于卷轴正前方

    // ── WebGPU 渲染器 ───────────────────────────────────────────────────────
    const renderer = new WebGPURenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    await renderer.init();

    // ── 轨道控制器 ──────────────────────────────────────────────────────────
    // 绑定到 WebGL canvas，而非宿主元素。
    // 若绑定到宿主，控制器会 preventDefault 所有指针事件，导致 slot 内按钮无法点击。
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = this.enableControls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = false;

    // ── CSS3DRenderer ────────────────────────────────────────────────────────
    // CSS3DRenderer 根据相机 FOV 和渲染器高度自动计算 CSS perspective，
    // 使 CSS3DObject 与 WebGL 场景的投影矩阵严格对齐。
    // domElement 与 #webgl-canvas 使用相同的位置和尺寸，确保像素级重合。
    const css3dRenderer = new CSS3DRenderer();
    css3dRenderer.setSize(w, h);
    this.css3dCanvas.appendChild(css3dRenderer.domElement);

    // slot-container 尺寸：映射到卷轴平铺区域（GEO_W × FLAT_H 世界单位）
    const slotEl = this.slotContainer;
    slotEl.style.position = "absolute";
    slotEl.style.inset = "auto";
    slotEl.style.width = `${CONTENT_W}px`;
    slotEl.style.height = `${CONTENT_H}px`;

    // 插槽内容可以被拖拽
    this._orbitRelayHandler = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      // 交互元素保留原生行为，不转发
      if (target.closest("button")) return;
      e.preventDefault(); // 防止拖拽时触发文字选中
      renderer.domElement.dispatchEvent(new PointerEvent("pointerdown", e));
    };
    slotEl.addEventListener("pointerdown", this._orbitRelayHandler);

    // 将 slot-container 作为 CSS3DObject 贴到卷轴正面
    // z = 0.05：略高于纸面（纸面最大 z ≈ 0.042），避免 z-fighting
    const scrollObj = new CSS3DObject(slotEl);
    scrollObj.position.set(0, 0, 0.05);
    scrollObj.scale.setScalar(CSS3D_SCALE);
    scene.add(scrollObj);

    // ── 着色器 & 材质 ────────────────────────────────────────────────────────
    const paperTex = createAgedPaperTexture();
    const burnProgress = uniform(0.0);

    // 卷轴燃烧着色器（详见 introScroll.shaders.ts）
    const { colorNode, positionNode } = buildScrollShaders(
      paperTex,
      burnProgress,
    );

    const scrollMat = new MeshBasicNodeMaterial();
    scrollMat.side = DoubleSide;
    scrollMat.colorNode = colorNode;
    scrollMat.positionNode = positionNode;

    // ── 余烬粒子 ─────────────────────────────────────────────────────────────
    const particleCount = 80;
    const particleGeo = new BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 2.6;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }
    particleGeo.setAttribute(
      "position",
      new BufferAttribute(particlePositions, 3),
    );

    const { colorNode: pColor, positionNode: pPos } = buildParticleShaders();

    const particleMat = new PointsNodeMaterial();
    particleMat.blending = AdditiveBlending;
    particleMat.size = 0.05;
    particleMat.colorNode = pColor;
    particleMat.positionNode = pPos;

    const particleSystem = new Points(particleGeo, particleMat);
    particleSystem.visible = false;
    scene.add(particleSystem);

    // ── 卷轴几何体 ───────────────────────────────────────────────────────────
    // PlaneGeometry 的上下边缘弯曲成圆弧，模拟纸张卷起效果。
    // 中间平坦区域（|y| ≤ FLAT_H/2）加入轻微弓形弯曲（z 方向余弦偏移）。
    const ROLL_R = 0.4; // 卷曲半径
    const geo = new PlaneGeometry(GEO_W, 4.0, 64, 128);
    const posAttr = geo.attributes.position as BufferAttribute;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      if (y > FLAT_H / 2) {
        // 上方卷曲段：沿圆弧弯向背面
        const th = (y - FLAT_H / 2) / ROLL_R;
        posAttr.setY(i, FLAT_H / 2 + ROLL_R * Math.sin(th));
        posAttr.setZ(i, ROLL_R * Math.cos(th) - ROLL_R);
      } else if (y < -FLAT_H / 2) {
        // 下方卷曲段
        const th = (-y - FLAT_H / 2) / ROLL_R;
        posAttr.setY(i, -(FLAT_H / 2 + ROLL_R * Math.sin(th)));
        posAttr.setZ(i, ROLL_R * Math.cos(th) - ROLL_R);
      } else {
        // 平坦区域：余弦弓形（边缘略向前隆起，增加纸张质感）
        posAttr.setZ(
          i,
          Math.cos((y / (FLAT_H / 2)) * Math.PI * 0.5) * -0.042 + 0.042,
        );
      }
    }
    geo.computeVertexNormals();
    scene.add(new Mesh(geo, scrollMat));

    // ── 光照 ─────────────────────────────────────────────────────────────────
    const ambientLight = new AmbientLight(0xffe5c0, 0.6);
    scene.add(ambientLight);
    scene.add(new DirectionalLight(0xffd090, 1.4).translateZ(5).translateX(2));

    // ── 计时器 ───────────────────────────────────────────────────────────────
    const timer = new Timer();
    timer.connect(document);

    // ── 挂载上下文 ───────────────────────────────────────────────────────────
    this.ctx = {
      scene,
      camera,
      renderer,
      css3dRenderer,
      controls,
      burnProgress,
      clock: timer,
      startBurn: false,
      particleSystem,
      ambientLight,
    };

    // 若 ignite() 在初始化前被调用，立即触发燃烧
    if (this._pendingIgnite) {
      this.ctx.startBurn = true;
      this._pendingIgnite = false;
    }

    // ── 动画循环 ─────────────────────────────────────────────────────────────
    renderer.setAnimationLoop(() => {
      if (!this.ctx) return;
      timer.update();
      const delta = timer.getDelta();
      controls.update(); // 阻尼需要每帧更新

      // 燃烧序列
      if (this.ctx.startBurn) {
        particleSystem.visible = true;

        // burnProgress 驱动 TSL shader 中的燃烧阈值
        burnProgress.value = Math.min(
          burnProgress.value + delta * this.burnSpeed,
          2.0,
        );

        scene.position.z -= delta * 0.08; // 场景整体缓缓向后飘
        ambientLight.intensity = 0.6 + Math.sin(Date.now() * 0.01) * 0.2; // 火光脉动

        // burnProgress ≥ 1.32 时视为烧尽，触发淡出并移除元素
        if (burnProgress.value >= 1.32) {
          renderer.setAnimationLoop(null);
          this.setAttribute("closing", "");
          this.dispatchEvent(
            new CustomEvent("g1-intro-burned", {
              bubbles: true,
              composed: true,
            }),
          );
          setTimeout(() => this.remove(), 200);
        }
      }

      // 背面检测：相机越过卷轴平面后隐藏 slot 内容，防止 HTML 镜像穿透显示
      slotEl.style.visibility = camera.position.z >= 0 ? "" : "hidden";

      renderer.render(scene, camera);
      css3dRenderer.render(scene, camera);
    });

    // CSS3DRenderer 完成首帧定位后显示 slot 内容（避免初始位置闪烁）
    requestAnimationFrame(() => {
      slotEl.classList.add("css3d-ready");
    });

    // ── 响应尺寸变化 ─────────────────────────────────────────────────────────
    new ResizeObserver(() => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (!nw || !nh) return;
      renderer.setSize(nw, nh);
      css3dRenderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    }).observe(container);
  }
}
