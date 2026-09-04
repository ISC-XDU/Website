# 变更日志

所有显著变更记录在这里。版本遵循 [SemVer](https://semver.org/lang/zh-CN/)。

## [0.1.0] - 2026-09-04

### 新增
- 🎉 全新 MVP 版本，**完全重写**自 [ISC-XDU/Website](https://github.com/ISC-XDU/Website) 旧版 Bootstrap 5 静态站
- ✨ 6 个页面：主页、介绍、技术部、运营部、成员墙、致谢
- 🎨 新设计系统：Tailwind CSS 3 + 浪潮蓝/西电红品牌色 token
- 📝 Markdown + JSON 双轨内容层（Astro Content Collections）
  - 5 篇活动回顾 Markdown（`src/content/activities/`）
  - 4 个致谢合作方 Markdown（`src/content/thanks/`）
  - 4 个技术组介绍 Markdown（`src/content/techGroups/`）
- 👥 33 名成员数据结构化（按届分组，Modal 详情）
- 🧩 组件库：SiteHeader（响应式导航 + 移动端汉堡菜单）、Modal、Accordion、Carousel、StatsBar、Card、Section、Button
- 🤖 一次性迁移脚本：
  - `scripts/migrate-members.mjs` — 旧 `member.html` → `members.json`
  - `scripts/optimize-images.ps1` — 4 张超大图压缩（节省 ~13MB）

### 优化
- 性能：默认零客户端 JS（仅 Modal/Carousel/Accordion 用了最小 island）
- SEO：sitemap-index.xml、robots.txt、完整 Open Graph / Twitter Card
- 可访问性：SkipLink、focus-visible、aria-label 全覆盖、语义化 HTML
- 移动端：360 / 768 / 1024 / 1440px 全适配

### 技术决策
- **Astro 4.16** + **TypeScript 5.7** + **Tailwind 3.4**（锁定 v3，v4 留待稳定）
- `@astrojs/sitemap` 锁 3.2.1（3.7.x 与 Astro 4.16.19 不兼容）
- Node 22（实测 Node 24 兼容）

### 安全约束
- 新项目在 `D:\MyFile\CODE\MiniMaxCode\InspurWeb\website-v2\`，与旧 `Website/` 物理隔离
- 新仓库 `git init` 在 `website-v2/` 内，**无任何 remote**
- **未 push 到任何远程**（包括 `github.com/ISC-XDU/Website`）
- 旧 `Website/` 任何文件、`.git` 历史、remote 配置均保持原状

### 已知限制
- 仅本地预览，无 CI / 部署配置
- 内容编辑需懂 Git + Markdown
- `../xdu_isc_blog/` 博客链接在导航中仍为占位
- `thanks.html` 合作老师区段为待补充
- 4 张单图压缩完成；`ctf-bg.gif` 暂未转换 WebP（需 sharp 等额外依赖）

### 不在本次范围
详见 `artifacts/plan.md` 第 9 节"不在本次范围但建议下一期做"。
