import DefaultTheme from "vitepress/theme";
import "./custom.css";

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== "undefined") {
      import("@/components/skeleton/skeleton.tsx");
      import("@/components/svgIcon/svgIcon.tsx");
      import("@/components/toast/toast.tsx");
    }
  },
};
