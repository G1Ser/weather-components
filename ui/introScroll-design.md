# IntroScroll 设计规范

古老羊皮卷风格的简介通用组件。Three.js WebGPU + TSL 燃烧效果。

---

## 色盘 (Color Palette)

| Token                      | Hex                     | 用途                  |
| -------------------------- | ----------------------- | --------------------- |
| `--scroll-parchment`       | `#d4c090`               | 羊皮纸主色 / 标题文字 |
| `--scroll-parchment-light` | `#e0cf84`               | 纸面高光中心          |
| `--scroll-sepia`           | `#a88b36`               | 纸面中间色调          |
| `--scroll-umber`           | `#7c5e16`               | 纸面暗部              |
| `--scroll-burnt`           | `#3c2806`               | 纸面最暗边缘 / 背景   |
| `--scroll-gold`            | `#af8a2a`               | 金色装饰边框 / 强调色 |
| `--scroll-gold-glow`       | `#c06800`               | 火焰发光色            |
| `--scroll-rod`             | `#120907`               | 木杆颜色              |
| `--scroll-body-text`       | `#8a7050`               | 正文文字色            |
| `--scroll-divider`         | `rgba(175,138,42,0.38)` | 分割线                |
| `--scroll-bg-dark`         | `#140b03`               | 背景最深处            |

### 火焰温度梯度

| 温度    | Hex       | 名称 |
| ------- | --------- | ---- |
| ~1500°C | `#fff8d9` | 白热 |
| ~1200°C | `#ffe00d` | 亮黄 |
| ~900°C  | `#fa6603` | 橙   |
| ~600°C  | `#b80a03` | 深红 |
| 灰烬    | `#120503` | 焦炭 |

---

## 间距 (Spacing Tokens)

| Token          | 值              | 用途       |
| -------------- | --------------- | ---------- |
| `--sp-xs`      | 4px             | 内部微间距 |
| `--sp-sm`      | 8px             | 小间距     |
| `--sp-md`      | 16px            | 标准间距   |
| `--sp-lg`      | 24px            | 大间距     |
| `--sp-xl`      | 32px            | 超大间距   |
| Scroll padding | 15% 12% 14% 12% | 卷轴内容区 |

---

## CSS Custom Properties

组件暴露的可定制属性：

```css
g1-intro-scroll {
  --g1-scroll-bg: radial-gradient(
    ellipse at 50% 40%,
    rgba(20, 11, 3, 0.95),
    rgba(3, 1, 0, 0.99)
  );
  --g1-scroll-border-color: rgba(175, 138, 42, 0.38);
  --g1-scroll-text-color: #d4c090;
  --g1-scroll-accent-color: #af8a2a;
  --g1-scroll-width: min(86vw, 500px);
}
```

---

## 动效参数

| 效果         | 参数                    | 值               |
| ------------ | ----------------------- | ---------------- |
| 燃烧速度     | `burnSpeed`             | 0.46 delta/frame |
| 燃烧方向     | bottom → top            | 80% Y + 12% X    |
| 关闭过渡     | opacity                 | 1.8s ease-out    |
| 自动旋转     | `autoRotateSpeed`       | 0.45 deg/frame   |
| 轨道阻尼     | dampingFactor           | 0.06             |
| 缩放范围     | minDistance/maxDistance | 3.0 ~ 9.0        |
| 余烬粒子数量 | particleCount           | 80               |
| 余烬粒子寿命 | particleLife            | 1.2 ~ 3.0s       |
| 纸张微抖幅度 | paperTremor             | 0.003            |
| 环境光脉动   | ambientPulse            | ±15% brightness  |

---

## 组件尺寸

| 属性        | 值                     |
| ----------- | ---------------------- |
| 卷轴宽度    | min(86vw, 500px)       |
| 纵横比      | 3:4                    |
| Canvas 溢出 | 四周各 15%（显示木杆） |
| 卷轴几何体  | 2.6 × 4.0 (GEO_W × H)  |
| 卷曲半径    | 0.40                   |
| 木杆半径    | 0.056                  |
| 木杆长度    | 3.3                    |
