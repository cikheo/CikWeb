<template>
  <section class="privacy-page">
    <div class="container">
      <header class="page-header">
        <h1 class="title">隐私政策</h1>
        <div class="meta">
          <span class="date">更新于 {{ lastUpdatedStr }}</span>
          <span class="label">Legal</span>
        </div>
      </header>

      <div class="content-wrapper">
        <article class="markdown-content" v-html="html"></article>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/*
 * @Description: 隐私政策页面，使用 marked 解析 Markdown 内容并展示
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent, computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const defaultMarkdown = `## 1. 简介

欢迎访问 Cik 的个人主页（以下简称“本网站”或者“CikWeb”）。本网站为个人展示用途，用于分享我的作品、文章或相关信息。我尊重并致力于保护您的隐私。本隐私政策旨在说明本网站如何收集、使用和保护您的个人信息。

## 2. 收集的信息

### 2.1 您主动提供的信息
- 当您通过电子邮件或评论功能与我联系时，我可能会收到您的姓名、电子邮件地址及您选择提供的其他信息。
- 这些信息仅用于回复您的询问或进行相关交流。

### 2.2 自动收集的信息
- 本网站可能通过 Cookie 或类似技术自动收集某些非个人身份信息，例如浏览器类型、IP地址、访问时间、浏览页面等。
- 这些信息主要用于分析访问趋势、优化网站体验，且通常为匿名数据。

## 3. 信息的使用

我所收集的信息仅用于以下目的：
- 确保网站正常运行并提供良好体验；
- 回复您的消息或请求；
- 分析网站流量以改进内容与结构；
- 在法律要求时配合相关部门。

## 4. 信息的保护

我会采取合理措施保护您的信息，防止未经授权的访问、使用或泄露。但由于互联网传输并非 100% 安全，我无法保证信息的绝对安全。

## 5. 第三方服务

本网站可能使用第三方服务（例如网站托管、分析工具等）。这些服务提供商可能有自己的隐私政策，建议您查阅相关条款。

## 6. 您的权利

您有权：
- 询问我是否持有您的个人信息；
- 要求更正或删除您提供的个人信息（法律允许范围内）；
- 拒绝接受 Cookie（可通过浏览器设置实现）。

## 7. 链接到其他网站

本网站可能包含指向第三方网站的链接。我对这些网站的隐私实践不负责任，建议您访问时查阅其隐私政策。

## 8. 隐私政策的更新

我可能会不定期更新本隐私政策，更新后的版本将在本页面发布。请定期查阅以了解最新内容。

## 9. 联系我

如果您对本隐私政策有任何疑问，请通过以下方式联系我：
- 邮箱：[{{ email }}](mailto:{{ email }})
`

export default defineComponent({
  name: 'PrivacyPage',
  props: {
    markdown: { type: String, default: defaultMarkdown },
    email: { type: String, default: 'cikheo@qq.com' }
  },
  setup(props) {
    const html = computed(() => {
      // 将占位符替换为实际邮箱，然后渲染 Markdown 并进行清理
      const md = props.markdown.replace(/{{\s*email\s*}}/g, props.email)
      const raw = marked.parse(md)
      
      // 在服务端构建阶段，DOMPurify 无法运行且不需要清理（因为内容是预定义的）
      if (import.meta.env.SSR) {
        return raw
      }
      
      return DOMPurify.sanitize(raw)
    })

    const lastUpdatedStr = '2026年1月24日'

    return { html, lastUpdatedStr }
  }
})
</script>

<style scoped lang="scss">
.privacy-page {
  /* 变量定义 */
  --bg-color: #ffffff;
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-tertiary: #9ca3af;
  --accent-color: #111827;
  --border-color: #e5e7eb;
  
  background-color: var(--bg-color);
  min-height: 100vh;
  padding-top: 140px;
  padding-bottom: 6rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  margin-bottom: 5rem;
  
  .title {
    font-size: 3.5rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin: 0 0 1.5rem 0;
    line-height: 1.1;
  }
}

.meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;

  .label {
    background: #f3f4f6;
    padding: 0.2rem 0.6rem;
    border-radius: 99px;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-primary);
  }
}

.content-wrapper {
  position: relative;
}

/* Markdown 内容样式 */
.markdown-content {
  color: var(--text-secondary);
  line-height: 1.75;
  font-size: 1.125rem;

  :deep(> *:first-child) {
    margin-top: 0;
  }

  :deep(h1) {
    display: none; 
  }

  :deep(h2) {
    color: var(--text-primary);
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 3.5rem;
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
  }

  :deep(h3) {
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  :deep(p) {
    margin-bottom: 1.5rem;
  }

  :deep(ul), :deep(ol) {
    margin-bottom: 2rem;
    padding-left: 1.25rem;

    li {
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
      &::marker {
        color: var(--text-tertiary);
      }
    }
  }
  
  :deep(blockquote) {
    margin: 2.5rem 0;
    padding-left: 1.5rem;
    border-left: 2px solid var(--text-primary);
    font-style: italic;
    color: var(--text-primary);

    p {
      margin: 0;
    }
  }

  :deep(a) {
    color: var(--text-primary);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    text-decoration-color: var(--text-tertiary);
    transition: text-decoration-color 0.2s;

    &:hover {
      text-decoration-color: var(--text-primary);
    }
  }

  :deep(strong) {
    color: var(--text-primary);
    font-weight: 600;
  }

  :deep(hr) {
    border: 0;
    height: 1px;
    background: var(--border-color);
    margin: 3rem 0;
  }
}

@media (max-width: 768px) {
  .page-header {
    margin-bottom: 3rem;
    .title {
      font-size: 2.5rem;
    }
  }
  
  .privacy-page {
    padding-top: calc(var(--header-bottom, 60px) + 2rem);
  }

  .markdown-content {
    font-size: 1rem;
  }
}
</style>
