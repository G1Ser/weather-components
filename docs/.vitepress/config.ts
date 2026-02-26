import { defineConfig } from "vitepress";
import { resolve } from "path";

export default defineConfig({
  title: "G1 Components",
  description: "GISer_昶的组件库",
  vite: {
    resolve: {
      alias: {
        "@": resolve(__dirname, "../../src"),
      },
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
        items: [{ text: "Skeleton 骨架屏", link: "/components/skeleton" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/G1Ser" }],
  },
});
