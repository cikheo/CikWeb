# CikWeb

静态多业务个人主页主题，基于 Vue 3 + TypeScript + Vite 构建。

## ✨ 特性

- ⚡️ **Vue 3 + Vite**: 极速的开发与构建体验
- 💎 **TypeScript**: 全量的类型定义与严格的类型检查
- 🎨 **Element Plus**: 优雅的 UI 组件库集成
- 🍍 **Pinia**: 直观的状态管理方案
- 📱 **响应式设计**: 完美适配移动端与桌面端，提供极致的跨端体验
- 📝 **丰富功能**: 内置博客列表、项目轮播、地址栏模拟、多媒体展示等模块
- 🏗 **工程化标准**: 规范的文件注释头、全中文化的代码说明、完善的 ESLint + Prettier 配置
- 🚀 **SSG 预渲染**: 基于 `vite-ssg` 实现全站静态化，极致的加载速度与 SEO 友好
- 🔗 **优雅 URL**: 采用 History 模式且无 `.html` 后缀，无需 Nginx 伪静态配置即可直接访问
- 📁 **构建优化**: 打包产物按资源类型自动分类存放 (img/js/css/fonts)，结构清晰
- 🛠 **自定义 404**: 预渲染独立 404 页面，支持社交平台 Logo 自动抓取与预览
- 📢 **品牌控制台**: 封装并美化控制台输出，实时展示项目版本与环境状态

## 🧩 功能模块

- 🏠 **首页聚合**: 包含 Hero 视觉引导区、精选轮播图、最新动态展示
- 📂 **项目橱窗**: 专注于展示个人开源项目、作品集的展示卡片
- 📝 **博客集成**: 内置博客列表组件，支持展示最新文章与归档
- 🧰 **效率工具**: 独立的工具推荐板块，分享常用开发工具与资源
- 🎬 **社交展示**: 社交资源展示专区 (MediaSection)
- 🔗 **友链朋友圈**: 样式精美的友情链接展示区域
- 💰 **赞助页面**: 独立的赞助/打赏页面，支持多种方式展示
- ℹ️ **关于与社交**: 个人简介、微信公众号引流及其他社交媒体链接集成

## 📦 技术栈

- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vite SSG](https://github.com/antfu/vite-ssg)
- [Element Plus](https://element-plus.org/)
- [Sass](https://sass-lang.com/)

## 🚀 快速开始

### 环境准备

- Node.js >= 25.3.0
- pnpm >= 10.x

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/cikheo/CikWeb.git
cd CikWeb
```

2. 安装依赖

```bash
npm install
# 或者使用 pnpm
pnpm install
```

### 开发与构建

**启动开发服务器**

```bash
npm run dev
```

**构建生产版本 (SSG)**

```bash
npm run build
```

> **注意**: 构建完成后会生成 `dist` 目录。本项目采用子目录索引模式（Sub-directory Index），每个路由对应一个文件夹下的 `index.html`，这使得您可以直接在 Nginx 部署而无需添加 `try_files` 等伪静态规则。

**本地预览构建产物**

```bash
npm run preview
```

### 代码规范检查

**Lint 检查**

```bash
npm run lint
```

**代码格式化**

```bash
npm run format
```

## 📂 目录结构

```text
.
├── public/          # 公共静态资源 (Logo、Favicon)
├── src/
│   ├── assets/          # 静态资源 (图片、样式、图标)
│   ├── components/      # 核心业务组件
│   ├── BackToTop.vue       # 返回顶部
│   ├── BlogList.vue        # 博客列表
│   ├── FeaturedCarousel.vue # 精选项目轮播
│   ├── Footer.vue          # 页面底部 (SiteFooter)
│   ├── HeaderNav.vue       # 顶部导航栏
│   ├── Hero.vue            # 视觉引导区 (AppHero)
│   ├── LatestPosts.vue     # 最新文章展示
│   ├── ProjectShowcase.vue # 项目深度展示 (支持多变体)
│   └── ...
├── data/            # 静态数据中心 (解耦展示逻辑)
│   ├── projects.ts         # 项目列表数据
│   ├── showcase.ts         # 重点展示数据
│   └── ...
├── pages/           # 页面级组件
│   ├── Home.vue            # 首页 (HomeView)
│   ├── Blog.vue            # 博客列表页 (BlogView)
│   ├── About.vue           # 关于我 (AboutView)
│   ├── Sponsor.vue         # 赞助打赏页
│   └── ...
├── plugins/         # 外部插件注册 (Element Plus 等)
├── router/          # 路由体系
├── stores/          # 状态管理
├── styles/          # 全局 SCSS 与原子化样式
├── types/           # TS 类型与垫片
└── utils/           # 通用工具函数 (GitHub API 等)
```

## 🌐 部署说明

本项目打包后为纯静态文件，支持零配置部署到任何 Web 服务器：

1. **Nginx**: 直接将 `dist` 目录内容上传至 `root` 目录即可。由于采用了预渲染文件夹模式，访问 `/wechat` 会自动寻址到 `/wechat/index.html`。
2. **404 页面**: 如果您在 Nginx 中希望路径错误时跳转到项目自定义 404 页，建议添加：
   ```nginx
   error_page 404 /404.html;
   ```
3. **分享预览**: 已内置 Open Graph、Twitter Card 及微信隐藏图片兜底。分享链接到微信、QQ 或 Twitter 时会自动抓取项目 Logo。
   > **⚠️ 注意**: 分享图片使用绝对路径 `https://cikcc.com/logo.png`，**请确保域名配置正确**。
   - **Logo 配置**: 修改 `public/logo.png` 即可同步更新图标与分享图。

4. **RSS 订阅配置**: 如果您需要展示自己的博客文章，需要修改 RSS 订阅链接：
   > **⚠️ 注意**: 需要将 RSS 订阅链接改为您自己的博客订阅地址。
   - **修改路径 1**: `src/pages/Blog.vue` 第 10 行 - 修改 `href="https://blog.cikcc.com/rss.xml"`
   - **修改路径 2**: `src/components/BlogList.vue` 第 74 行 - 修改 `rssUrl = 'https://blog.cikcc.com/rss.xml'`

## 🛠 开发规范

为了保持代码的高可维护性与一致性，本项目遵循以下规范：

1. **文件注释头**：每个 `.vue`, `.ts` 文件顶部必须包含规范的注释块，注明文件描述、作者及日期。
2. **中文化注释**：所有业务逻辑、样式说明、配置项注释均使用 **中文** 编写，确保国内开发者无障碍协作。
3. **命名规范**：
   - 组件内部命名使用大写驼峰（PascalCase），并尽量避免与原生标签冲突（如 `SiteFooter`）。
   - 路由组件使用 `View` 结尾（如 `HomeView`）。
4. **代码检查**：提交前必须通过 `npm run lint` 检查。

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。

Copyright (c) 2026 [Cik](https://cikcc.com)
