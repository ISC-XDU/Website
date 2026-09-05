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
    // GSAP 3.15.0 ESM 入口 (index.js) 内部 registerPlugin 链有循环依赖，
    // 直接 import 在某些时序下会触发 TDZ 错误（'Cannot access I before
    // initialization'）。强制预打包走 CJS 路径解决。
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText', 'gsap/MorphSVGPlugin'],
    },
  },
});
