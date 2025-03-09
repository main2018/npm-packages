import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import legacy from "@vitejs/plugin-legacy";
import babel from 'vite-plugin-babel';

// import imgSrcToImport from '../src/index'; // dev
import imgSrcToImport from '../dist/index'; // prod

export default defineConfig({
  server: {
    port: 3000, // 修改开发服务器端口
    open: true, // 自动打开浏览器
  },
  plugins: [
    legacy({
      targets: [
        'Android >= 6',
        'Chrome >= 50',
        'iOS >= 10'
      ],
      corejs: 3
    }),
    babel({
      babelConfig: {
          babelrc: false,
          configFile: false,
          include: ["src/**/*.js"],
      }
    }),
    svelte({
      configFile: resolve(__dirname, "./svelte.config.js"),
    }),
    imgSrcToImport({
      include: '**/*.svelte', // 处理所有 .svelte 文件
      exclude: '**/ignore/*.svelte', // 排除 ignore 目录下的 .svelte 文件
      prefix: 'customPrefix_', // 自定义变量名前缀
    }),
  ],
  build: {
    emptyOutDir: true,
  },
  css: {
    postcss: resolve(__dirname, "../viteConfig/postcss.config.cjs"),
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@css": resolve(__dirname, "./src/css"),
    },
    extensions: [
      ".mjs",
      ".js",
      ".mts",
      ".ts",
      ".jsx",
      ".tsx",
      ".json",
      ".svelte",
    ],
  },
});