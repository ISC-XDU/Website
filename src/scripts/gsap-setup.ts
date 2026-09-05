// GSAP 插件注册 + 共享工具
// GSAP 通过 BaseLayout 的 UMD <script> 加载到 window.gsap，
// 这里直接用 window 上的实例（避免 GSAP 3.15 ESM 在 Vite inline 时的 TDZ 循环依赖）。

// 全局类型扩展：window 上挂载的 gsap 实例与插件
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    SplitText: any;
    MorphSVGPlugin: any;
  }
}

let registered = false;

/**
 * 初始化 GSAP 插件注册。
 * 多次调用安全（幂等）；可从任意客户端入口调。
 */
export function initGSAP(): any {
  const gsap = window.gsap;
  if (registered) return gsap;
  gsap.registerPlugin(window.ScrollTrigger, window.SplitText, window.MorphSVGPlugin);
  registered = true;

  // 默认 easing
  gsap.defaults({ ease: 'power3.out' });
  return gsap;
}

/**
 * 检测用户是否开启「减少动效」系统偏好。
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * 兜底：若 GSAP 加载失败或用户开启减少动效，
 * 把所有匹配选择器的元素立即显示，不阻塞内容。
 */
export function revealImmediately(selector: string): void {
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
