import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    /**
     * 启用 css modules
     * see: https://cn.vitejs.dev/guide/features.html#css-modules
     */
    modules: {},
    preprocessorOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    /**
     * 路径别名配置
     * see: https://cn.vitejs.dev/config/shared-options.html#resolve-alias
     */
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./node_modules"),
    },
  },
});
