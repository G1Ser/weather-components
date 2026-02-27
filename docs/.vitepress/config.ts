import { defineConfig } from "vitepress";
import { resolve } from "path";

export default defineConfig({
  title: "G1 Components",
  description: "GISer_昶的组件库",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  vite: {
    publicDir: resolve(__dirname, "../../public"),
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../src"),
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("g1-"),
      },
    },
  },
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "组件", link: "/components/skeleton" },
    ],

    sidebar: [
      {
        text: "组件",
        items: [
          { text: "Skeleton 骨架屏", link: "/components/skeleton" },
          { text: "SvgIcon 图标", link: "/components/svg-icon" },
          { text: "Toast 轻提示", link: "/components/toast" },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/G1Ser" }],
  },
});
