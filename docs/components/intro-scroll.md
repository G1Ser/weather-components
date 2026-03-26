# IntroScroll 卷轴简介

全屏卷轴介绍层，基于 WebGPU + CSS3DRenderer，支持皱纸效果与燃烧消散动画。

## 基础用法

点击按钮打开卷轴，拖拽纸面可旋转视角，点击"确定"触发燃烧消散。

<ClientOnly>
  <div>
    <button class="demo-btn" @click="openBasic">查看</button>
  </div>
</ClientOnly>

```html
<g1-intro-scroll id="scroll">
  <div slot="header">标题</div>
  <p>正文内容</p>
  <div slot="footer">
    <button id="btn-confirm">确 定</button>
  </div>
</g1-intro-scroll>
```

## 自定义纸张尺寸

通过 `scroll-width`、`scroll-height` 调整卷轴宽高比例。

<ClientOnly>
  <div>
    <button class="demo-btn" @click="openSize">自定义</button>
  </div>
</ClientOnly>

```html
<g1-intro-scroll scroll-width="2.6" scroll-height="2.0" />
```

## 调整内容区比例

`content-ratio` 控制平铺内容区占总高度的比例，其余分配给两端卷边。值越小卷边越夸张。

<ClientOnly>
  <div style="display:flex;gap:12px;flex-wrap:wrap">
    <button class="demo-btn" @click="openSmallRatio">小内容区</button>
    <button class="demo-btn" @click="openLargeRatio">大内容区</button>
  </div>
</ClientOnly>

```html
<!-- 卷边更夸张 -->
<g1-intro-scroll content-ratio="0.5" />

<!-- 内容区更大 -->
<g1-intro-scroll content-ratio="0.95" />
```

## 燃烧速度

`burn-speed` 控制燃烧蔓延快慢，值越大燃烧越快，默认 `0.46`。

<ClientOnly>
  <div style="display:flex;gap:12px;flex-wrap:wrap">
    <button class="demo-btn" @click="openSlow">慢速</button>
    <button class="demo-btn" @click="openFast">快速</button>
  </div>
</ClientOnly>

```html
<!-- 慢速燃烧 -->
<g1-intro-scroll burn-speed="0.15" />

<!-- 快速燃烧 -->
<g1-intro-scroll burn-speed="1.5" />
```

## 禁用旋转控制

`enable-controls` 设为 `false` 关闭鼠标 / 触摸拖拽旋转。

<ClientOnly>
  <div>
    <button class="demo-btn" @click="openNoCtrl">禁用旋转</button>
  </div>
</ClientOnly>

```html
<g1-intro-scroll :enable-controls="false" />
```

## API

### Attributes

| 属性名            | 说明                                                  | 类型      | 默认值 |
| ----------------- | ----------------------------------------------------- | --------- | ------ |
| `burn-speed`      | 燃烧蔓延速度                                          | `number`  | `0.46` |
| `enable-controls` | 是否旋转                                              | `boolean` | `true` |
| `scroll-width`    | 纸张宽度                                              | `number`  | `1.8`  |
| `scroll-height`   | 纸张总高度                                            | `number`  | `2.4`  |
| `content-ratio`   | 内容区占总高度比例（`0 ~ 1`），剩余平均分配给两端卷边 | `number`  | `0.8`  |

### Methods

| 方法名     | 说明                                                                 | 参数 | 返回值 |
| ---------- | -------------------------------------------------------------------- | ---- | ------ |
| `ignite()` | 触发燃烧消散，结束后派发 `g1-intro-burned` 事件，约 200ms 后自动移除 | —    | `void` |

### Events

| 事件名 | 说明               |
| ------ | ------------------ |
| `burn` | 燃烧动画开始时触发 |

### Slots

| 插槽名    | 说明                                 |
| --------- | ------------------------------------ |
| `header`  | 页眉区域，固定高度，不参与内容滚动   |
| `default` | 主体内容区，高度超出时自动出现滚动条 |
| `footer`  | 页脚区域，固定高度，不参与内容滚动   |

### CSS Variables

| 变量名           | 说明         |
| ---------------- | ------------ |
| `--g1-scroll-bg` | 背景遮罩渐变 |

<style>
.demo-btn {
  padding: 8px 20px;
  background: #4a3728;
  color: #f5e6c8;
  border: 1px solid #8b6544;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.demo-btn:hover {
  background: #6b4c35;
  border-color: #c8a278;
}
.vp-doc td:first-child code {
  white-space: nowrap;
}
</style>

<script setup>
import { onUnmounted } from 'vue';

let cleanup = null;

function createScroll(opts = {}) {
  // 清理上一个未关闭的卷轴
  if (cleanup) { cleanup(); cleanup = null; }

  import('@/components/introScroll/introScroll.tsx').then(() => {
    const el = document.createElement('g1-intro-scroll');

    if (opts.scrollWidth !== undefined)   el.scrollWidth   = opts.scrollWidth;
    if (opts.scrollHeight !== undefined)  el.scrollHeight  = opts.scrollHeight;
    if (opts.contentRatio !== undefined)  el.contentRatio  = opts.contentRatio;
    if (opts.burnSpeed !== undefined)     el.burnSpeed     = opts.burnSpeed;
    if (opts.enableControls !== undefined) el.enableControls = opts.enableControls;

    el.innerHTML = `
      <div slot="header" style="text-align:center;padding:14px 0 6px;font-size:20px;font-weight:700;letter-spacing:3px;color:#3b1f0a;">
        简介
      </div>
      <div style="padding:16px 28px;line-height:2;font-size:16px;color:#000;">
        <p>正文内容</p>
      </div>
      <div slot="footer" style="text-align:center;padding:8px 0 18px;">
        <button id="demo-ignite-btn" style="padding:8px 32px;border:none;border-radius:6px;background:#7a3b1e;color:#f5e6c8;font-size:15px;cursor:pointer;letter-spacing:2px;">
          确 定
        </button>
      </div>
    `;

    document.body.appendChild(el);

    el.addEventListener('g1-intro-burned', () => { cleanup = null; });

    requestAnimationFrame(() => {
      el.querySelector('#demo-ignite-btn')?.addEventListener('click', () => el.ignite());
    });

    cleanup = () => {
      el.removeEventListener('g1-intro-burned', () => {});
      el.remove();
    };
  });
}

const openBasic     = () => createScroll();
const openSize      = () => createScroll({ scrollWidth: 2.6, scrollHeight: 2.0 });
const openSmallRatio = () => createScroll({ contentRatio: 0.5 });
const openLargeRatio = () => createScroll({ contentRatio: 0.95 });
const openSlow      = () => createScroll({ burnSpeed: 0.15 });
const openFast      = () => createScroll({ burnSpeed: 1.5 });
const openNoCtrl    = () => createScroll({ enableControls: false });

onUnmounted(() => { if (cleanup) cleanup(); });
</script>
