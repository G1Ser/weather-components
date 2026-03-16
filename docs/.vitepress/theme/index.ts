import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== "undefined") {
      import("@/components/skeleton/skeleton");
      import("@/components/svgIcon/svgIcon");
    }
  },
};
