# SvgIcon 图标

动态加载 SVG 图标，支持尺寸、颜色控制，SVG 内联动画完整保留。

## 基础用法

通过 `name` 属性指定图标名称。

<ClientOnly>
  <div style="display:flex;gap:16px;align-items:center;background:#1b1b1f">
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
  <div style="display:flex;gap:16px;align-items:flex-end;background:#1b1b1f">
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
  <div style="display:flex;gap:16px;align-items:center;padding:16px;background:#1b1b1f;border-radius:8px">
    <g1-svg-icon name="error" size="48" color="#ff4d4f"></g1-svg-icon>
    <g1-svg-icon name="error" size="48" color="#faad14"></g1-svg-icon>
    <g1-svg-icon name="error" size="48" color="#52c41a"></g1-svg-icon>
    <g1-svg-icon name="error" size="48" color="#1677ff"></g1-svg-icon>
  </div>
</ClientOnly>

```html
<g1-svg-icon name="error" size="48" color="#ff4d4f"></g1-svg-icon>
<g1-svg-icon name="error" size="48" color="#faad14"></g1-svg-icon>
<g1-svg-icon name="error" size="48" color="#52c41a"></g1-svg-icon>
<g1-svg-icon name="error" size="48" color="#1677ff"></g1-svg-icon>
```

## 内联动画

SVG 内部的 CSS 动画完整保留。`home` 图标包含太阳升降与光线旋转动画。

<ClientOnly>
  <div style="display:flex;justify-content:center;padding:16px;background:#1b1b1f;border-radius:8px">
    <g1-svg-icon name="home" size="120"></g1-svg-icon>
  </div>
</ClientOnly>

```html
<g1-svg-icon name="home" size="120"></g1-svg-icon>
```

## API

### 属性

| 属性        | 说明                                                   | 类型     | 默认值           |
| ----------- | ------------------------------------------------------ | -------- | ---------------- |
| `name`      | 图标名称，对应 `assets/svgs/` 下的文件名               | `string` | `''`             |
| `size`      | 图标尺寸，纯数字自动补 `px`，也可传 `rem`、`em` 等单位 | `string` | `'1rem'`         |
| `color`     | 图标颜色，仅对使用 `currentColor` 的路径生效           | `string` | `'currentColor'` |
| `className` | 附加到容器的 CSS 类名                                  | `string` | `''`             |
