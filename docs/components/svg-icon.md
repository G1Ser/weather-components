# SvgIcon 图标

动态加载 SVG 图标，支持尺寸、颜色控制，SVG 内联动画完整保留。

<script setup>
const svgFiles = import.meta.glob('../../src/assets/svgs/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true
})
const getSvg = (name) => {
  const key = Object.keys(svgFiles).find(k => k.endsWith(`/${name}.svg`))
  return key ? svgFiles[key] : ''
}
</script>

## 全局配置

在项目入口调用一次 `configureSvgIcon`，配置 SVG 的根路径，之后所有图标只需传 `name` 属性即可。

```ts
import { configureSvgIcon } from "g1components";

configureSvgIcon({ basePath: "/icons" });
```

配置后直接使用：

```html
<g1-svg-icon name="home" size="48" />
```

## 三种加载方式

优先级：**`svg`** > **`src`** > **`name`**

### 方式一：name

配置全局 `basePath` 后，用文件名即可。

```html
<g1-svg-icon name="home" size="48" />
```

### 方式二：src

直接传完整 URL。

<ClientOnly>
  <g1-svg-icon src="/svgs/home.svg" size="48" />
</ClientOnly>

```html
<g1-svg-icon src="/assets/home.svg" size="48" />
<g1-svg-icon src="https://cdn.example.com/icons/home.svg" size="48" />
```

### 方式三：svg

传入原始 SVG 字符串。

```ts
import homeIcon from "./assets/home.svg";
```

```html
<g1-svg-icon :svg="homeIcon" size="48" />
```

## 尺寸

`size` 支持纯数字或任意 CSS 长度单位。

<ClientOnly>
  <div style="display:flex;gap:16px;align-items:flex-end">
    <g1-svg-icon src="/svgs/thumb.svg" size="24" />
    <g1-svg-icon src="/svgs/thumb.svg" size="36" />
    <g1-svg-icon src="/svgs/thumb.svg" size="48" />
    <g1-svg-icon src="/svgs/thumb.svg" size="3rem" />
  </div>
</ClientOnly>

```html
<g1-svg-icon name="thumb" size="24" />
<g1-svg-icon name="thumb" size="36" />
<g1-svg-icon name="thumb" size="48" />
<g1-svg-icon name="thumb" size="3rem" />
```

## 颜色

通过 `color` 属性修改图标颜色，仅对 SVG 内部使用 `currentColor` 的路径生效。多色图标保留自身配色。

<ClientOnly>
  <div style="display:flex;gap:16px;align-items:center;padding:16px;border-radius:8px">
    <g1-svg-icon src="/svgs/thumb.svg" size="48" color="#ff4d4f" />
    <g1-svg-icon src="/svgs/thumb.svg" size="48" color="#faad14" />
    <g1-svg-icon src="/svgs/thumb.svg" size="48" color="#52c41a" />
    <g1-svg-icon src="/svgs/thumb.svg" size="48" color="#1677ff" />
  </div>
</ClientOnly>

```html
<g1-svg-icon name="thumb" size="48" color="#ff4d4f" />
<g1-svg-icon name="thumb" size="48" color="#faad14" />
<g1-svg-icon name="thumb" size="48" color="#52c41a" />
<g1-svg-icon name="thumb" size="48" color="#1677ff" />
```

## 内联动画

SVG 内部的 CSS 动画完整保留。

<ClientOnly>
  <g1-svg-icon src="/svgs/home.svg" size="96" />
</ClientOnly>

```html
<g1-svg-icon name="home" size="96" />
```

## 交互

通过外部 CSS 覆盖 `--g1-icon-color` 变量实现悬浮变色，颜色过渡由组件内部 `transition` 驱动。

<ClientOnly>
  <g1-svg-icon src="/svgs/thumb.svg" size="48" color="#1677ff" class="icon-hover-demo" />
</ClientOnly>

```html
<g1-svg-icon name="thumb" size="48" color="#1677ff" class="icon" />
```

```css
.icon {
  cursor: pointer;
}
.icon:hover {
  --g1-icon-color: #ff4d4f;
}
```

<style>
.icon-hover-demo {
  cursor: pointer;
}
.icon-hover-demo:hover {
  --g1-icon-color: #ff4d4f;
}
</style>

## API

### configureSvgIcon(options)

全局配置函数，在项目入口调用一次即可。

| 参数       | 说明             | 类型     |
| ---------- | ---------------- | -------- |
| `basePath` | SVG 文件的根路径 | `string` |

### 属性

| 属性    | 说明                                                   | 类型     | 默认值           | 优先级 |
| ------- | ------------------------------------------------------ | -------- | ---------------- | ------ |
| `name`  | 图标名称，配合 `configureSvgIcon` 使用                 | `string` | `''`             | 低     |
| `src`   | SVG 文件的完整 URL                                     | `string` | `''`             | 中     |
| `svg`   | 原始 SVG 字符串                                        | `string` | `''`             | 高     |
| `size`  | 图标尺寸，纯数字自动补 `px`，也可传 `rem`、`em` 等单位 | `string` | `'1rem'`         | —      |
| `color` | 图标颜色，仅对使用 `currentColor` 的路径生效           | `string` | `'currentColor'` | —      |

### CSS 变量

| 变量              | 说明                                                  |
| ----------------- | ----------------------------------------------------- |
| `--g1-icon-color` | 覆盖图标颜色，可穿透 Shadow DOM，适用于悬浮等交互场景 |
