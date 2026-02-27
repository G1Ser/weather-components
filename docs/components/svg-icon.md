# SvgIcon 图标

动态加载 SVG 图标，支持尺寸、颜色控制，SVG 内联动画完整保留。

## 基础用法

通过 `name` 属性指定图标名称。

<ClientOnly>
  <div style="display:flex;gap:16px;align-items:center">
    <g1-svg-icon name="home" size="48" />
    <g1-svg-icon name="error" size="48" />
    <g1-svg-icon name="info" size="48"/>
    <g1-svg-icon name="success" size="48"/>
  </div>
</ClientOnly>

```html
<g1-svg-icon name="home" size="48" />
<g1-svg-icon name="error" size="48" />
<g1-svg-icon name="info" size="48" />
<g1-svg-icon name="success" size="48" />
```

## 尺寸

`size` 支持纯数字（自动补全 `px`）或任意 CSS 长度单位。

<ClientOnly>
  <div style="display:flex;gap:16px;align-items:flex-end">
    <g1-svg-icon name="error" size="24" />
    <g1-svg-icon name="error" size="36" />
    <g1-svg-icon name="error" size="48" />
    <g1-svg-icon name="error" size="3rem" />
  </div>
</ClientOnly>

```html
<g1-svg-icon name="error" size="24" />
<g1-svg-icon name="error" size="36" />
<g1-svg-icon name="error" size="48" />
<g1-svg-icon name="error" size="3rem" />
```

## 颜色

通过 `color` 属性修改图标颜色，仅对 SVG 内部使用 `currentColor` 的路径生效。多色图标（如 `home`）保留自身配色。

<ClientOnly>
  <div style="display:flex;gap:16px;align-items:center;padding:16px;border-radius:8px">
    <g1-svg-icon name="thumb" size="48" color="#ff4d4f" />
    <g1-svg-icon name="thumb" size="48" color="#faad14" />
    <g1-svg-icon name="thumb" size="48" color="#52c41a" />
    <g1-svg-icon name="thumb" size="48" color="#1677ff" />
  </div>
</ClientOnly>

```html
<g1-svg-icon name="thumb" size="48" color="#ff4d4f" />
<g1-svg-icon name="thumb" size="48" color="#faad14" />
<g1-svg-icon name="thumb" size="48" color="#52c41a" />
<g1-svg-icon name="thumb" size="48" color="#1677ff" />
```

## 内联动画

SVG 内部的 CSS 动画完整保留。`home` 图标包含太阳升降与光线旋转动画。

<ClientOnly>
    <g1-svg-icon name="home" size="96" />
</ClientOnly>

```html
<g1-svg-icon name="home" size="96" />
```

## 交互

通过外部 CSS 设置 `--g1-icon-color` 实现悬浮变色效果，颜色过渡由组件内部 `transition` 驱动。

<ClientOnly>
    <g1-svg-icon name="thumb" size="48" color="#1677ff" class="icon-hover-demo" />
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

### 属性

| 属性    | 说明                                                   | 类型     | 默认值           |
| ------- | ------------------------------------------------------ | -------- | ---------------- |
| `name`  | 图标名称，对应 `/src/assets/svgs/` 下的文件名          | `string` | `''`             |
| `size`  | 图标尺寸，纯数字自动补 `px`，也可传 `rem`、`em` 等单位 | `string` | `'1rem'`         |
| `color` | 图标颜色，仅对使用 `currentColor` 的路径生效           | `string` | `'currentColor'` |
