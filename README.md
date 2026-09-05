# 浪潮俱乐部（XDU ISC）官网 v2

> 西电浪潮俱乐部官网的现代重写版：Astro + TypeScript + Tailwind CSS。

## 项目状态

**当前**：MVP 开发中，**仅本地预览**，不部署、不 push 远程。
**上一代**：[ISC-XDU/Website](https://github.com/ISC-XDU/Website)（旧 `Website/` 目录，行行不动）

## 快速开始

### 环境要求
- Node.js **22.x**（参见 `.nvmrc`，已实测 Node 24 兼容）
- npm 10+
- Git 2.30+

### 本地开发

```bash
# 1. 切到项目根目录
cd D:\MyFile\CODE\MiniMaxCode\InspurWeb\website-v2

# 2. 安装依赖（首次）
npm install

# 3. 启动开发服务器
npm run dev
# → http://localhost:4321

# 4. 构建静态产物
npm run build
# → dist/

# 5. 预览构建产物
npm run preview
# → http://localhost:4321（指向 dist/）
```

### 其他命令

```bash
npm run type-check   # TypeScript 类型检查
npm run lint         # ESLint
npm run format       # Prettier 格式化
```

## 项目结构

```
website-v2/
├── public/              # 静态资源（不走构建）
│   ├── img/             # 从旧 Website/img/ 复制
│   └── .well-known/     # SSL 验证（仅本地参考）
├── src/
│   ├── components/      # 组件
│   ├── content/         # Markdown 内容（活动/技术组/致谢）
│   ├── data/            # JSON 数据（成员/站点配置/导航）
│   ├── layouts/         # 布局
│   ├── pages/           # 路由（6 个页面）
│   ├── scripts/         # GSAP 插件注册 + 共享工具
│   ├── styles/          # 全局样式
│   └── lib/             # 工具函数
├── scripts/             # 一次性脚本（成员数据迁移等）
├── docs/                # 设计与实施计划文档
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 动画系统

使用 [GSAP 3](https://gsap.com/) 三个插件（自 2024-05 Webflow 收购后**全部 100% 免费**）：

| 插件 | 作用 | 使用位置 |
|---|---|---|
| `ScrollTrigger` | 滚动到视口触发入场 / 滚动驱动动画 | 全站 `data-reveal` 元素；StatsBar 数字滚动进度 |
| `SplitText` | 官方字符级拆字 | Hero「浪潮er」标题；3 段 H2 字符级联入场 |
| `MorphSVGPlugin` | SVG path 形变 | Hero 下划线「直线→波浪」；StatsBar 角标 hover |

### 架构

- **集中注册**：`src/scripts/gsap-setup.ts` 暴露 `initGSAP()`（幂等），各组件按需调用
- **滚动入场统一入口**：`src/components/scripts/RevealOnScroll.astro`
  - `[data-reveal]` 元素用 `ScrollTrigger.batch` 触发淡入上浮
  - `[data-split-title]` 元素用 SplitText 拆字符 + ScrollTrigger 字符级联
  - 严格遵守 `prefers-reduced-motion: reduce` 媒体查询
- **PageLayout `enableReveal` prop**：默认 `true`（全站启用），无需手动控制

### 加新入场动画

```astro
<!-- Section 级别 -->
<Section background="default" reveal revealDelay={2}>
  <!-- 整段淡入上浮，0.16s 延迟 -->
</Section>

<!-- 单元素级别 -->
<div data-reveal data-reveal-delay="0.1">
  <!-- 自定义延迟 0.1s -->
</div>

<!-- 标题字符级联 -->
<h2 data-split-title>...</h2>
```

### 详细计划

参见 `docs/gsap-plugins-plan.md`（4 阶段：ScrollTrigger 基建 → SplitText 字符入场 → MorphSVG 点缀 → 清理 .reveal CSS）。

## 内容编辑

### 改招新状态
编辑 `src/data/site.json`：
```json
{
  "recruitment": {
    "status": "open" | "closed" | "soon",
    "deadline": "2025-09-15",
    "message": "招新已结束，下次招新见 2026 春季"
  }
}
```

### 加新成员
编辑 `src/data/members.json`：
```json
{
  "name": "新同学",
  "year": 25,
  "department": "tech" | "operate",
  "group": "ACM",
  "role": "成员",
  "bio": "一句话简介",
  "avatar": "/img/inspur/avatar.jpg",
  "email": "xxx@qq.com"
}
```

### 加新活动
新建 `src/content/activities/<slug>.md`：
```markdown
---
title: 2024 第一次技术沙龙
date: 2024-03-15
cover: /img/inspur/xxx.jpg
---

正文 Markdown...
```

## 博客（独立 MkDocs 项目）

`blog/` 是从 `ISC-XDU/Blog` 克隆的 MkDocs 知识库（Material 主题）。

```
website-v2/
└── blog/           # 独立 MkDocs 项目
    ├── mkdocs.yml
    ├── docs/        # Markdown 源文件（含技术文档 / 浪潮动态 / 图片）
    └── site/        # mkdocs build 输出（被 .gitignore 排除）
```

### 关联方式
- 网站导航"博客"项通过相对路径 `/blog/site/index.html` 链接到博客的构建产物
- 部署时需要：(1) `cd blog && mkdocs build` 产生 `site/`；(2) 跟主站一起发布

### 单独运行博客
```bash
cd blog
pip install mkdocs mkdocs-material
mkdocs serve        # http://localhost:8000
```

## 部署（**未来讨论，MVP 不实施**）

未来需要部署到生产时，待讨论的决策点：
- 推哪个 GitHub 仓库（新仓库 vs 改造旧 `ISC-XDU/Website`）
- 阿里云 ECS 部署路径、SSH user、Nginx 站点配置
- CI 工具选型（GitHub Actions / 阿里云 ACR / 手动 rsync）
- 旧仓库处理（归档 / redirect / 保留 legacy mirror）

## ⚠️ 重要安全约束

1. **永远不要 push 到 `github.com/ISC-XDU/Website`**（那是旧仓库的远程）
2. **永远不要修改 `../Website/` 目录**的任何文件（包括 `.git/`）
3. 每次 `git remote -v` 确认输出为空（无 remote）
4. 写文件前 `Get-Location` 确认在 `website-v2/` 而不是 `Website/`

## 贡献者

浪潮俱乐部 Web 组
