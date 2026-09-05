# GSAP 三个插件锦上添花：实施计划

> 写于 commit `567aaed`（Hero 拆字 bug 已修）之后。
> 目标：把 `ScrollTrigger` / `SplitText` / `MorphSVG` 三个插件自然地融入主页 5 段，做出"边滚边出"+"字符级入场"+"装饰形变"的层次感。

## 1. 背景与现状

### 1.1 当前状态

- `gsap@3.15.0` 已装在 `package.json`；`node_modules/gsap/{ScrollTrigger,SplitText,MorphSVGPlugin}.js` 全在
- 主页 5 段（`index.astro`）：`HomeHero` / `IntroduceOverview` / `StatsBar` / `HomeShowcase` / `HomeFAQ`
- Hero 已经用 GSAP `timeline` + 手写拆字（commit `567aaed` 修复了"浪潮er"透明 bug）
- 其余 4 段用 CSS `.reveal` + `IntersectionObserver` 入场（`global.css:244-264`）
- **代码风格现状**：每个组件的 `<script>` 内联，Astro 编译时打进 client bundle

### 1.2 三个插件的免费现状

Webflow 在 2024-05 收购 GreenSock 后**所有插件 100% 免费**（含 `SplitText` / `MorphSVG`），直接 `import` 即可，npm 上也是公开模块。**没有授权问题**。

### 1.3 目标

| 插件 | 作用 | 拟用位置 |
|---|---|---|
| **ScrollTrigger** | 滚动到视口触发 + 滚动驱动进度 | 全部 4 段下半段、Hero 浮动球、StatsBar 数字滚动进度、Showcase 卡片级联 |
| **SplitText** | 官方字符级拆字 | 替换 Hero 自写拆字；IntroduceOverview / HomeShowcase / HomeFAQ 标题入场动画 |
| **MorphSVG** | 装饰 SVG 路径形变 | Hero 渐变下划线（弯 → 直 → 波浪） + Showcase 4 个 icon 背景的流体球 |

> 重要原则：**渐进替换，不大刀阔斧**。先让 ScrollTrigger 替换 `IntersectionObserver` 那一套（基础），再加 SplitText（增强），最后 MorphSVG（点缀）。每加一个观察效果再决定下一步。

---

## 2. 实施分阶段

### 阶段 A：ScrollTrigger 基础设施（必做）

**A.1** 新增 `src/scripts/gsap-setup.ts` —— 集中注册插件 + 共享工具
```ts
// 注册一次，全站复用
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// 共享：
// - prefers-reduced-motion 短路
// - 清理函数（页面切换/SSR 场景）
// - 通用 reveal 工具：把元素从 opacity 0/translateY 24 切到 1/0
```

**A.2** 新增 `src/components/scripts/RevealOnScroll.astro` —— 替换现有 `.reveal` CSS + IO 监听
- `<script>` 内部用 ScrollTrigger.batch 处理多个 `[data-reveal]`
- 默认 `start: 'top 85%'`, `once: true`
- 保留 `data-reveal-delay="0.1|0.2|0.3"` 属性做级联

**A.3** 在主页 4 段（Hero 之后）加 `data-reveal` 属性，从 `class="reveal"` 迁移
- 涉及：`IntroduceOverview.astro`、`HomeShowcase.astro`、`HomeFAQ.astro`、`StatsBar.astro` 标题区
- **Hero 不动**（已有自己的 timeline 逻辑）

**A.4** `global.css` 里的 `.reveal` 类**保留**（兜底），但 ScriptProvider 启动后 ScrollTrigger 接管

**验收**：
- 滚动到任一段，元素淡入上浮出现；再滚回去不重播（`once: true`）
- 控制台无 ScrollTrigger 警告
- 主题切换 / 路由切换不出现残留动画
- `prefers-reduced-motion: reduce` 时所有 reveal 直接显示

### 阶段 B：SplitText 替换与扩展

**B.1** Hero 拆字用 SplitText 重写
- 删 `HomeHero.astro` 里的 `splitToChars()` 自写函数
- 改用 `new SplitText('[data-hero-title]', { type: 'chars,words' })`
- 关键修正：SplitText 自动给字符加 `style="display:inline-block"`，不会丢渐变类（**和上次 bug 的根因正相反**——自写拆字丢渐变是因为父级 `text-transparent` 继承；SplitText 拆完字符是父级 span 的直接 child，继承路径变了）

**B.2** 给以下标题加 SplitText 入场：
- `IntroduceOverview.astro` H2 "俱乐部 概览"
- `HomeShowcase.astro` H2 "我能在浪潮 收获什么？"
- `HomeFAQ.astro` H2 "新人常见问题"

**B.3** 包装成 ScrollTrigger 触发的 timeline：
```ts
gsap.from(split.chars, {
  opacity: 0, y: 30, stagger: 0.03, duration: 0.6,
  scrollTrigger: { trigger: el, start: 'top 80%', once: true }
});
```

**验收**：
- Hero "浪潮er" 仍然正确显示（**重点回归测试上次 bug**）
- 滚动到标题位置，字符依次淡入下落
- 同一页面不重复触发（`once: true`）
- 暗色模式无视觉异常

### 阶段 C：MorphSVG 点缀

**C.1** Hero 渐变下划线改造
- 当前：静态 SVG path（`M0 4 Q 50 0, 100 4 T 200 4`）
- 改造：ScrollTrigger 绑到 Hero，进入视口后从直线 morph 到波浪线
- 用 `MorphSVGPlugin.convertCoordinates` 处理 viewBox 坐标系

**C.2** Showcase 4 卡背景的"流体球" —— **不做**（理由：4 个 blur 球本身已经够多，MorphSVG 加进来视觉过载；C.1 一个点足够）

**C.3** 备选：StatsBar 4 卡 hover 时背景球路径形变
- 留作"备选 P2"，看 C.1 效果再决定

**验收**：
- Hero 下划线滚动进入时流畅变形
- 不影响 Hero 已有 timeline（剥离开来独立触发）
- 暗色模式 SVG 渐变不变

### 阶段 D：清理与文档

**D.1** `global.css` 里如果 `.reveal` 全部不再被用，删掉
**D.2** `package.json` 加注释说明 GSAP 免费政策
**D.3** `README.md` 加 "动画" 章节，列出三插件

---

## 3. 关键文件改动清单

| 文件 | 阶段 | 改动 |
|---|---|---|
| `src/scripts/gsap-setup.ts` | A.1 | **新建**，注册插件 + 共享工具 |
| `src/components/scripts/RevealOnScroll.astro` | A.2 | **新建**，ScrollTrigger.batch 包装 |
| `src/layouts/BaseLayout.astro` | A.2 | 引入 `<RevealOnScroll />`（页面级脚本一次） |
| `src/components/sections/IntroduceOverview.astro` | A.3 / B.2 | 改 class 为 `data-reveal`；H2 用 SplitText |
| `src/components/sections/HomeShowcase.astro` | A.3 / B.2 | 同上 |
| `src/components/sections/HomeFAQ.astro` | A.3 / B.2 | 同上 |
| `src/components/sections/StatsBar.astro` | A.3 | 标题区改 `data-reveal`；数字 count-up 改为 ScrollTrigger 触发 |
| `src/components/sections/HomeHero.astro` | B.1 / C.1 | 删自写 split 改 SplitText；下划线 MorphSVG |
| `src/styles/global.css` | A.4 / D.1 | `.reveal` 兜底保留；全移除后删 |
| `package.json` | D.2 | 加注释 |
| `README.md` | D.3 | 加"动画"章节 |
| `docs/gsap-plugins-plan.md` | — | 本文件 |

---

## 4. 风险与对策

| 风险 | 对策 |
|---|---|
| **回归上次的"浪潮er"透明 bug** | B.1 替换后立即视觉验证，**用浏览器 DevTools 看字符 computed color**；Build 完先在 preview 截图 |
| SplitText 字符拆完后暗色模式类失效 | SplitText 默认不丢父级类，但若出问题可改用 `charsClass` 强制重设 |
| MorphSVG 坐标系错乱 | 用 `convertCoordinates` + 锁定 viewBox；先 C.1 试一个点 |
| 暗色模式动画初始状态被 GSAP 设了 `opacity: 0` 但状态切换时没还原 | ScrollTrigger 用 `once: true` + `markers: false`；状态切换用 `gsap.set(el, { clearProps: 'all' })` |
| Astro 静态 build 阶段 GSAP import 被 tree-shake 误删 | `gsap-setup.ts` 显式 `import { ScrollTrigger }` 并调用 `gsap.registerPlugin` |
| Bundle 体积 | 当前 GSAP + ScrollTrigger gzip 后约 30KB；SplitText 6KB；MorphSVG 14KB。**总增量可控**（约 50KB gzip），可接受 |
| 用户不喜欢"边滚边出"动效 | ScrollTrigger 行为严格遵守 `prefers-reduced-motion`，并提供"减弱动画"主题选项（如未来需要） |

---

## 5. 验收标准（整体）

1. **视觉**：滚动 5 段，每段都有合适的入场；Hero 不动，StatsBar 数字滚动到视口时 count-up；标题字符级联入场；Hero 下划线优雅 morph
2. **性能**：FCP < 1.5s（首页）；首屏滚动 60fps（DevTools Performance 录制）
3. **可访问性**：`prefers-reduced-motion: reduce` 全部退化为直接显示
4. **回归**：Hero "浪潮er" 暗色 + 浅色下都正常显示
5. **代码质量**：每个阶段单独 commit，中文 commit message；`npm run build` 通过；预览 `http://127.0.0.1:4321/` 流畅
6. **不越界**：只动计划里的文件，不动 `tech/` `operate/` `members/` `thanks/` 子页和 `blog/`

---

## 6. 待用户决策

1. **是否同意 P2 备选 C.3**（StatsBar hover 球 MorphSVG）？看 C.1 效果再问
2. **是否同意阶段 D.1 全删 `.reveal` CSS**？还是保留兜底？
3. **是否同意增大 bundle ~50KB**？若不行可降级：跳过 MorphSVG（C.1 → 不做）

---

**建议执行顺序**：阶段 A → 验收 → 阶段 B → 验收 → 阶段 C → 验收 → 阶段 D

每个阶段验收时**停下来给用户看效果**，等用户确认再进入下一阶段。
