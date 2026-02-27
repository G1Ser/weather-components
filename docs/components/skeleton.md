# Skeleton 骨架屏

在内容加载前展示占位图形，减少用户等待时的视觉跳动。

## 基础用法

通过 `style` 设置宽高，控制骨架屏的尺寸。

<ClientOnly>
  <div style="display:flex;flex-direction:column;gap:10px">
    <g1-skeleton style="width:100%;height:16px" />
    <g1-skeleton style="width:50%;height:16px" />
    <g1-skeleton style="width:150px;height:16px" />
  </div>
</ClientOnly>

```html
<g1-skeleton style="width:100%;height:16px" />
<g1-skeleton style="width:50%;height:16px" />
<g1-skeleton style="width:150px;height:16px" />
```

## 圆形

配合 `border-radius: 50%` 实现头像占位效果。

<ClientOnly>
    <g1-skeleton style="width:150px;height:150px;border-radius: 50%" />
</ClientOnly>

```html
<g1-skeleton style="width:150px;height:150px;border-radius: 50%" />
```

## 卡片占位

模拟卡片内容加载状态。

<ClientOnly>
    <g1-skeleton style="width:260px;height:140px;border-radius:8px" />
</ClientOnly>

```html
<g1-skeleton style="width:260px;height:140px;border-radius:8px" />
```
