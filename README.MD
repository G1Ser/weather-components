# Lit组件项目

基于Lit开发的跨框架组件。

## 项目特点

- **Vibe Coding**
  结合Skills与AI快速迭代开发
- **项目文档**
  基于Vitepress开发组件库文档

### 项目结构

```
docs/
├── .vitepress/      # vitepree项目配置
├── components/      # 组件介绍文档
├── index.md         # 首页文档
└── tsconfig.json    # typescript配置文件

lib/                 # 打包的组件库（按需引入 typescript支持）

src/
├── assets/          # 静态资源
│   ├── fonts/       # 字体文件
│   └── svgs/        # SVG 图标
├── components/      # 组件库
├── main.css         # 主样式
└── main.ts          # 主文件

ui/                  # ui-ux-pro-max设计文档

```

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev              # 启动开发服务器
pnpm docs:dev         # 启动组件库文档
```

### 构建

```bash
pnpm build            # 生产构建
pnpm build:lib        # 第三方组件库构建
pnpm preview          # 预览生产构建
pnpm docs:build       # 组件库文档打包
pnpm docs:preview     # 预览组件库文档
```
