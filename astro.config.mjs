import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.isc-xdu.cn',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    // GSAP 全部走 BaseLayout 的 UMD inline script 加载到 window.gsap，
    // 这里不再让 Vite 预打包 ESM 入口 —— 否则 dev 模式 modulepreload 链上
    // 会触发 GSAP 3.15 ESM 内部的 registerPlugin 循环依赖，爆出
    // `Cannot access 'X' before initialization` TDZ 错误。
  },
});
