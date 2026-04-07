import { CanvasTexture, SRGBColorSpace } from "three/webgpu";
import {
  float,
  vec2,
  vec3,
  Fn,
  If,
  Discard,
  mix,
  smoothstep,
  time,
  uv,
  fract,
  floor,
  sin,
  texture as tslTexture,
  instanceIndex,
  positionLocal,
} from "three/tsl";
import type Node from "three/src/nodes/core/Node.js";

/**
 * 在 CPU 上用 Canvas 2D API 绘制一张老化羊皮纸纹理。
 *
 * 绘制步骤：
 *   1. 径向渐变填充底色（中心偏亮黄 → 边缘深焦棕，模拟光照与边缘焦化）
 *   2. 叠加若干椭圆形半透明污迹（模拟水渍、霉斑等自然老化痕迹）
 *
 * @returns 已设置 SRGBColorSpace 的 CanvasTexture，可直接赋给材质
 */
type PaperTextureOptions = {
  size: number;
};
export function createAgedPaperTexture(
  options: PaperTextureOptions,
): CanvasTexture {
  const S = Math.max(128, Math.min(2048, options.size)); // 纹理分辨率（像素），正方形
  const cv = document.createElement("canvas");
  cv.width = cv.height = S;
  const c = cv.getContext("2d")!;

  // 底色：从中心高光 → 四周暗棕，模拟纸面受光与边缘老化
  const base = c.createRadialGradient(
    S * 0.5,
    S * 0.42,
    S * 0.05, // 内圆：偏上方小圆（高光中心）
    S * 0.5,
    S * 0.5,
    S * 0.68, // 外圆：正中大圆（覆盖整张纸）
  );
  base.addColorStop(0.0, "#e0cf84"); // 中心：浅金黄高光
  base.addColorStop(0.25, "#ccb75c"); // 过渡：暖黄褐
  base.addColorStop(0.55, "#a88b36"); // 中段：棕黄
  base.addColorStop(1.0, "#3c2806"); // 边缘：深焦棕
  c.fillStyle = base;
  c.fillRect(0, 0, S, S);

  // 污迹：四个椭圆形渐变斑，模拟岁月留下的水渍与污点
  // 每个污迹参数：{ 中心坐标 x/y，半径 rx/ry，不透明度系数 a }
  for (const { x, y, rx, ry, a } of [
    { x: 200, y: 270, rx: 95, ry: 62, a: 0.09 },
    { x: 780, y: 560, rx: 125, ry: 78, a: 0.07 },
    { x: 370, y: 835, rx: 72, ry: 48, a: 0.1 },
    { x: 125, y: 700, rx: 82, ry: 52, a: 0.09 },
  ]) {
    c.save();
    c.translate(x, y);
    c.scale(rx / 60, ry / 60); // 将圆缩放为椭圆
    const sg = c.createRadialGradient(0, 0, 0, 0, 0, 60);
    sg.addColorStop(0, `rgba(50, 24, 2, ${a * 2.0})`); // 中心最深
    sg.addColorStop(1, "rgba(50, 24, 2, 0)"); // 边缘透明
    c.fillStyle = sg;
    c.beginPath();
    c.arc(0, 0, 60, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  const tex = new CanvasTexture(cv);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

// ─────────────────────────────────────────────────────────────────────────────
// 卷轴燃烧着色器
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 构建卷轴燃烧效果所需的全部 TSL 节点。
 *
 * 返回两个节点，分别赋给 MeshBasicNodeMaterial 的对应属性：
 *   colorNode    → material.colorNode    （片元着色：燃烧颜色 + Discard）
 *   positionNode → material.positionNode （顶点着色：纸张微抖动）
 *
 * @param paperTex      羊皮纸纹理（由 createAgedPaperTexture 生成）
 * @param burnProgress  燃烧进度 uniform（0 = 未开始，≥1.32 = 视为烧尽）
 */
export function buildScrollShaders(
  paperTex: CanvasTexture,
  burnProgress: Node<"float">,
) {
  // ── 工具函数：哈希 → 噪声 → fBm ─────────────────────────────────────────
  // 这三个函数在 GPU 上执行，用于生成燃烧边缘的有机不规则形态。

  /**
   * 哈希函数（GPU）：将 2D 向量映射为 [0,1] 伪随机浮点数。
   * 原理：对输入做点积 → sin 放大 → fract 取小数（高频混沌）。
   *
   * @param p  UV 空间中的 2D 坐标（vec2 节点）
   */
  const hashFn = Fn(([p]: [Node<"vec2">]) =>
    fract(sin(p.dot(vec2(127.1, 311.7))).mul(43758.5453)),
  );

  /**
   * Value Noise（GPU）：基于格点哈希的双线性插值噪声。
   *
   * 步骤：
   *   1. floor(p) 得到格子左下角整数坐标
   *   2. fract(p) 得到格子内的小数偏移
   *   3. 对四个角采样哈希值（a/b/c/d）
   *   4. 用 3t²-2t³ 光滑权重做双线性插值（避免线性格子感）
   *
   * @param p  采样坐标（vec2），数值越大细节越密集
   */
  const noiseFn = Fn(([p]: [Node<"vec2">]) => {
    const i = floor(p); // 整数格点（格子左下角）
    const f = fract(p); // 格子内偏移 [0, 1)
    const a = hashFn(i); // 左下角
    const b = hashFn(i.add(vec2(1.0, 0.0))); // 右下角
    const c = hashFn(i.add(vec2(0.0, 1.0))); // 左上角
    const d = hashFn(i.add(vec2(1.0, 1.0))); // 右上角
    // 光滑插值权重：3t²-2t³（smoothstep 曲线，消除格子边界的线性突变）
    const u = f.mul(f).mul(float(3.0).sub(f.mul(2.0)));
    return mix(a, b, u.x)
      .add(c.sub(a).mul(u.y).mul(float(1.0).sub(u.x)))
      .add(d.sub(b).mul(u.x).mul(u.y));
  });

  /**
   * fBm（分形布朗运动，GPU）：多层叠加 Value Noise，模拟自然界分形细节。
   *
   * 每次叠加：频率 ×2（更密），振幅 ×0.5（更弱）。
   * 三层叠加后产生从大轮廓到细节的层次感，燃烧边缘更自然。
   *
   * @param p  基础采样坐标（vec2）
   */
  const fbmFn = Fn(
    ([p]: [Node<"vec2">]) =>
      noiseFn(p)
        .mul(0.5) // 第一层：低频，振幅 0.5
        .add(noiseFn(p.mul(2.0)).mul(0.25)) // 第二层：中频，振幅 0.25
        .add(noiseFn(p.mul(4.0)).mul(0.125)), // 第三层：高频，振幅 0.125
  );

  // ── 片元颜色节点 ──────────────────────────────────────────────────────────
  /**
   * 燃烧效果核心逻辑（每个像素独立执行）：
   *
   * 1. burnMap  = fBm 噪声 + 方向偏置（从底部向顶部、微幅左右波动）
   *              描述纸面各位置的"易燃程度"（0~1 的强度图）
   * 2. threshold = burnProgress × 2.2（随进度增大，越来越多像素被烧掉）
   * 3. diff = burnMap - threshold（差值决定当前像素的状态）：
   *    diff < 0        → 完全烧尽 → Discard（GPU 丢弃该像素，呈现透明空洞）
   *    diff ≈ 0        → 燃烧边缘 → 火焰温度渐变色（白热 → 亮黄 → 橙红 → 焦炭）
   *    diff 较大       → 正常纸面 → 采样羊皮纸纹理
   */
  const colorNode = Fn(() => {
    const uvc = uv(); // 当前像素在网格上的 UV 坐标，范围 [0,1]

    // fBm 噪声：随时间缓慢流动（time×0.1），模拟火焰边缘的不规则形态
    const n = fbmFn(uvc.mul(3.6).add(time.mul(0.1)));

    // 燃烧方向性偏置：
    //   (1 - uvc.y) × 0.8    → 底部易燃，顶部抗燃（主方向：从下往上烧）
    //   (1 - uvc.x) × 0.12   → 左侧偏易燃（轻微左偏）
    //   sin(...) × 0.05       → 随时间正弦波动（火焰摇曳感）
    const burnDir = float(1.0)
      .sub(uvc.y)
      .mul(0.8)
      .add(float(1.0).sub(uvc.x).mul(0.12))
      .add(sin(time.mul(0.65).add(uvc.x.mul(2.8))).mul(0.05));

    const burnMap = n.mul(0.5).add(burnDir.mul(0.9)); // 综合燃烧强度
    const threshold = burnProgress.mul(2.2); // 当前燃烧阈值
    const diff = burnMap.sub(threshold); // 差值：正=存活，负=消亡

    // diff < 0：该像素已被烧穿 → 丢弃（透明孔洞）
    If(diff.lessThan(float(0.0)), () => Discard());

    const paper = tslTexture(paperTex, uvc).rgb; // 采样羊皮纸底色

    // 火焰温度渐变（从边缘向外依次为：白热 → 亮黄 → 橙红 → 焦炭）
    // smoothstep(a, b, x)：x 在 [a,b] 区间内从 0 平滑过渡到 1
    const fireC = mix(
      mix(
        mix(
          vec3(1.0, 0.97, 0.85), // 白热（~1500°C，燃烧最前沿）
          vec3(1.0, 0.88, 0.05), // 亮黄（~1200°C）
          smoothstep(float(0.0), float(0.013), diff),
        ),
        vec3(0.98, 0.4, 0.01), // 橙红（~900°C）
        smoothstep(float(0.013), float(0.042), diff),
      ),
      vec3(0.07, 0.02, 0.01), // 焦炭灰烬（燃烧边缘后方）
      smoothstep(float(0.08), float(0.118), diff),
    );

    // inFire：diff 越小（越靠近燃烧边缘）火焰比重越大，纸面越少
    const inFire = float(1.0).sub(smoothstep(float(0.108), float(0.162), diff));
    return mix(paper, fireC, inFire);
  })();

  // ── 顶点位置节点：纸张微抖动 ─────────────────────────────────────────────
  /**
   * 燃烧时纸张的微颤效果（顶点着色器）：
   * 在 Z 轴叠加高频正弦振荡，振幅随 burnProgress 增大。
   * 未燃烧时静止，燃烧越剧烈抖动越明显。
   */
  const positionNode = Fn(() => {
    const pos = positionLocal.toVar();
    // sin(time×35)：高频振荡（约 35/(2π) ≈ 5.6 Hz）
    // × burnProgress：燃烧前无抖动，燃烧时逐渐增强
    // × 0.008：幅度很小，保持微妙感
    const shake = sin(time.mul(35.0)).mul(burnProgress).mul(0.008);
    pos.z.addAssign(shake);
    return pos;
  })();

  return { colorNode, positionNode };
}

// ─────────────────────────────────────────────────────────────────────────────
// 余烬粒子着色器
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 构建余烬粒子飘散效果的 TSL 节点。
 *
 * 粒子在卷轴燃烧时可见，模拟火星从纸面飘离的效果。
 * 每个粒子用 instanceIndex 区分，确保生命周期相位错开（不同步）。
 *
 * 返回的节点赋给 PointsNodeMaterial：
 *   colorNode    → material.colorNode    （粒子颜色 + 生命周期透明度）
 *   positionNode → material.positionNode （粒子上升 + 横向漂移）
 */
export function buildParticleShaders() {
  /**
   * 粒子颜色节点：橙红色调，透明度遵循 sin 曲线（出生→峰值→消亡）。
   *
   * life = fract(time × 0.3 + index × 0.13)：
   *   将时间和粒子编号混合后取小数，得到 [0,1) 循环的生命周期进度。
   *   不同 index 的粒子相位错开，避免所有粒子同时闪烁。
   *
   * sin(life × π)：生命周期内先增后减，形成"出生 → 高亮 → 消亡"弧线。
   * smoothstep(0, 0.5, …)：仅保留 sin 值 > 0.5 的部分可见（减少拖影感）。
   */
  const colorNode = Fn(() => {
    const life = fract(time.mul(0.3).add(instanceIndex.toFloat().mul(0.13)));
    const alpha = sin(life.mul(Math.PI)).smoothstep(0.0, 0.5);
    return vec3(float(1.0), float(0.4), float(0.1)).mul(alpha); // 橙红色 × 透明度
  })();

  /**
   * 粒子位置节点：向上漂浮 + 正弦横向摆动（顶点着色器）。
   *
   * life = fract(time × 0.2 + index × 0.5)：生命周期进度（比颜色节点稍慢）
   * pos.y += life × 2.0：粒子随生命周期向上移动，最多偏移 2 个世界单位
   * pos.x += sin(time + index) × 0.1：正弦摆动，模拟火星被气流带偏
   */
  const positionNode = Fn(() => {
    const pos = positionLocal.toVar();
    const life = fract(time.mul(0.2).add(instanceIndex.toFloat().mul(0.5)));
    pos.y.addAssign(life.mul(2.0)); // 向上漂浮
    pos.x.addAssign(sin(time.add(instanceIndex.toFloat())).mul(0.1)); // 横向摆动
    return pos;
  })();

  return { colorNode, positionNode };
}
