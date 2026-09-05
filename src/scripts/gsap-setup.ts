// GSAP 插件注册 + 共享工具
// 集中维护：避免每个组件都重新 import / register 插件
// 调用方在需要时 import 本文件的 initGSAP() 以保证只注册一次。

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;

/**
 * 初始化 GSAP 插件注册。
 * 多次调用安全（幂等）；可从任意客户端入口调。
 */
export function initGSAP(): typeof gsap {
  if (registered) return gsap;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  registered = true;

  // 默认 easing
  gsap.defaults({ ease: 'power3.out' });
  return gsap;
}

/**
 * 检测用户是否开启「减少动效」系统偏好。
 * 开启时所有滚动入场 / 装饰动画应直接显示。
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

export { gsap, ScrollTrigger };
