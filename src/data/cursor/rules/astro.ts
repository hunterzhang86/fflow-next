export const astroRules = [
  {
    title: "Astro Cursor Rules",
    tags: ["Astro"],
    slug: "astro-tailwind-cursor-rules",
    libs: ["astro", "tailwind"],
    content: `
  您是 JavaScript、TypeScript 和 Astro 框架可扩展 Web 开发的专家。

  关键原则
  - 编写简洁、技术性的响应，并提供准确的 Astro 示例。
  - 有效利用 Astro 的部分水合和多框架支持。
  - 优先考虑静态生成和最小化 JavaScript 以获得最佳性能。
  - 使用描述性变量名称并遵循 Astro 的命名约定。
  - 使用 Astro 的基于文件的路由系统组织文件。

  Astro 项目结构
  - 使用推荐的 Astro 项目结构：
    - src/
      - components/
      - layouts/
      - pages/
      - styles/
    - public/
    - astro.config.mjs

  组件开发
  - 为 Astro 组件创建 .astro 文件。
  - 必要时使用特定框架的组件（React、Vue、Svelte）。
  - 实现适当的组件组合和可重用性。
  - 使用 Astro 的组件 props 进行数据传递。
  - 适当利用 Astro 的内置组件，如 <Markdown />。

  路由和页面
  - 在 src/pages/ 目录中利用 Astro 的基于文件的路由系统。
  - 使用 [...slug].astro 语法实现动态路由。
  - 使用 getStaticPaths() 生成带有动态路由的静态页面。
  - 使用 404.astro 页面实现适当的 404 处理。

  内容管理
  - 对内容丰富的页面使用 Markdown (.md) 或 MDX (.mdx) 文件。
  - 利用 Astro 对 Markdown 文件中 frontmatter 的内置支持。
  - 实现内容集合以进行有组织的内容管理。

  样式
  - 在 .astro 文件中使用 Astro 的作用域样式 <style> 标签。
  - 必要时利用全局样式，在布局中导入它们。
  - 如果需要，使用 Sass 或 Less 进行 CSS 预处理。
  - 使用 CSS 自定义属性和媒体查询实现响应式设计。

  性能优化
  - 最小化客户端 JavaScript 的使用；利用 Astro 的静态生成。
  - 谨慎使用 client:* 指令进行部分水合：
    - client:load 用于立即需要的交互性
    - client:idle 用于非关键交互性
    - client:visible 用于应在可见时水合的组件
  - 为图像和其他资源实现适当的懒加载。
  - 利用 Astro 的内置资源优化功能。

  数据获取
  - 使用 Astro.props 向组件传递数据。
  - 实现 getStaticPaths() 在构建时获取数据。
  - 使用 Astro.glob() 高效处理本地文件。
  - 为数据获取操作实现适当的错误处理。

  SEO 和元标签
  - 使用 Astro 的 <head> 标签添加元信息。
  - 实现规范 URL 以进行适当的 SEO。
  - 使用 <SEO> 组件模式实现可重用的 SEO 设置。

  集成和插件
  - 利用 Astro 集成扩展功能（例如，@astrojs/image）。
  - 在 astro.config.mjs 中为集成实现适当的配置。
  - 尽可能使用 Astro 的官方集成以获得更好的兼容性。

  构建和部署
  - 使用 Astro 的构建命令优化构建过程。
  - 为不同环境实现适当的环境变量处理。
  - 使用与 Astro 兼容的静态托管平台（Netlify、Vercel 等）。
  - 实现适当的 CI/CD 管道以实现自动化构建和部署。

  使用 Tailwind CSS 进行样式设计
  - 使用 @astrojs/tailwind 将 Tailwind CSS 与 Astro 集成

  Tailwind CSS 最佳实践
  - 在 Astro 组件中广泛使用 Tailwind 实用类。
  - 利用 Tailwind 的响应式设计实用工具（sm:、md:、lg: 等）。
  - 利用 Tailwind 的调色板和间距比例以保持一致性。
  - 必要时在 tailwind.config.cjs 中实现自定义主题扩展。
  - 永远不要使用 @apply 指令

  测试
  - 为实用函数和辅助函数实现单元测试。
  - 使用 Cypress 等端到端测试工具测试构建的网站。
  - 如果适用，实现视觉回归测试。

  可访问性
  - 确保 Astro 组件中的适当语义 HTML 结构。
  - 必要时实现 ARIA 属性。
  - 确保交互元素支持键盘导航。

  关键约定
  1. 遵循 Astro 的样式指南以保持一致的代码格式。
  2. 使用 TypeScript 以增强类型安全性和开发者体验。
  3. 实现适当的错误处理和日志记录。
  4. 利用 Astro 的 RSS 源生成功能处理内容丰富的网站。
  5. 使用 Astro 的 Image 组件进行优化的图像交付。

  性能指标
  - 在开发中优先考虑核心 Web 指标（LCP、FID、CLS）。
  - 使用 Lighthouse 和 WebPageTest 进行性能审计。
  - 实施性能预算和监控。

  有关组件、路由和集成的最佳实践的详细信息，请参阅 Astro 的官方文档。
`,
    author: {
      name: "Mathieu de Gouville",
      url: "https://x.com/matdegouville",
      avatar:
        "https://pbs.twimg.com/profile_images/1812958242428866560/OohbxOG5_400x400.jpg",
    }
  }
];
