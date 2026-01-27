<template>
  <div class="blog-list-container">
    <div v-if="loading" class="state-msg">
      <div class="spinner"></div>
      <p>正在加载文章...</p>
    </div>
    
    <div v-else-if="error" class="state-msg error">
      <p>暂时无法加载文章，请稍后再试。</p>
      <button class="retry-btn" @click="fetchPosts">重试</button>
    </div>

    <div v-else>
      <div class="posts-grid">
        <article v-for="post in paged" :key="post.link" class="post-card">
          <a :href="post.link" target="_blank" rel="noopener" class="card-link">
             <div class="card-content">
                <div v-if="post.categories && post.categories.length > 0" class="card-tags">
                  <span 
                    v-for="(category, index) in post.categories.slice(0, 3)" 
                    :key="index" 
                    class="tag"
                    :style="getCategoryColor(category)"
                  >
                    {{ category }}
                  </span>
                </div>
                
                <h3 class="title" :title="post.title">{{ post.title }}</h3>
                <p class="desc">{{ stripHtml(post.description) }}</p>
                
                <div class="card-footer">
                  <span class="date">{{ formatDate(post.pubDate) }}</span>
                  <span class="read-more">阅读全文 &rarr;</span>
                </div>
             </div>
          </a>
        </article>
      </div>

      <div v-if="totalPages > 1" class="pager">
        <button :disabled="page === 1" class="pager-btn" @click="prev">&larr; 上一页</button>
        <span class="page-info">{{ page }} / {{ totalPages }}</span>
        <button :disabled="page >= totalPages" class="pager-btn" @click="next">下一页 &rarr;</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/*
 * @Description: 博客列表组件，包含分页示例与文章预览
 * @Author: CIK
 * @Date: 2026-01-22
 */
import { defineComponent, reactive, computed, ref, onMounted } from 'vue'

interface Post {
  title: string
  link: string
  pubDate: string
  description: string
  categories?: string[]
}

export default defineComponent({
  name: 'BlogList',
  setup() {
    const posts = ref<Post[]>([])
    const loading = ref(true)
    const error = ref(false)
    const state = reactive({ page: 1, per: 9 })
    
    const rssUrl = 'https://blog.cikcc.com/rss.xml'

    const fetchPosts = async () => {
      loading.value = true
      error.value = false
      
      // 优先尝试直连（源站支持 CORS），若失败则尝试代理服务
      const proxies = [
        rssUrl,
        `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
        `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`
      ]

      let success = false

      for (const proxyUrl of proxies) {
        try {
          const response = await fetch(proxyUrl)
          if (!response.ok) continue
          
          const xmlText = await response.text()
          // 简单验证 xml 内容
          if (!xmlText.includes('<rss') && !xmlText.includes('<?xml')) continue

          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
          
          const items = xmlDoc.querySelectorAll('item')
          if (items.length === 0) continue

          const parsedPosts: Post[] = []
          
          items.forEach(item => {
            const title = item.querySelector('title')?.textContent || ''
            const link = item.querySelector('link')?.textContent || ''
            const pubDate = item.querySelector('pubDate')?.textContent || ''
            const description = item.querySelector('description')?.textContent || ''
            
            // 提取所有 category 标签
            const categories: string[] = []
            item.querySelectorAll('category').forEach(cat => {
              if (cat.textContent) categories.push(cat.textContent)
            })

            parsedPosts.push({
              title,
              link,
              pubDate,
              description,
              categories
            })
          })

          posts.value = parsedPosts
          success = true
          break // 成功获取数据，跳出循环
        } catch (e) {
          console.warn(`RSS attempt failed (${proxyUrl}):`, e)
        }
      }

      if (!success) {
        error.value = true
      }
      loading.value = false
    }

    const totalPages = computed(() => Math.ceil(posts.value.length / state.per))
    
    const paged = computed(() => {
      const start = (state.page - 1) * state.per
      return posts.value.slice(start, start + state.per)
    })

    function next() {
      if (state.page < totalPages.value) {
        state.page++
        window.scrollTo({ top: 300, behavior: 'smooth' })
      }
    }

    function prev() {
      if (state.page > 1) {
        state.page--
        window.scrollTo({ top: 300, behavior: 'smooth' })
      }
    }

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    const stripHtml = (html: string) => {
      const tmp = document.createElement('DIV')
      tmp.innerHTML = html
      return tmp.textContent || tmp.innerText || ''
    }

    const getCategoryColor = (category: string) => {
      const colors = [
        { bg: '#f4f4f5', text: '#3f3f46' },
        { bg: '#f5f5f5', text: '#404040' },
        { bg: '#f5f5f4', text: '#44403c' },
        { bg: '#fef3c7', text: '#b45309' },
        { bg: '#ecfccb', text: '#4d7c0f' },
        { bg: '#d1fae5', text: '#047857' },
        { bg: '#cffafe', text: '#0e7490' },
        { bg: '#e0f2fe', text: '#0369a1' },
        { bg: '#dbeafe', text: '#1d4ed8' },
        { bg: '#ede9fe', text: '#6d28d9' },
        { bg: '#fae8ff', text: '#a21caf' },
        { bg: '#ffe4e6', text: '#be123c' },
        { bg: '#e0f2f1', text: '#00695c' },
        { bg: '#ede7f6', text: '#4527a0' },
        { bg: '#e1f5fe', text: '#0277bd' },
        { bg: '#fff3e0', text: '#ef6c00' },
        { bg: '#fbe9e7', text: '#d84315' },
        { bg: '#fff8e1', text: '#ff8f00' },
        { bg: '#fce4ec', text: '#c2185b' },
        { bg: '#f9fbe7', text: '#827717' },
      ]
      let hash = 0
      for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash)
      }
      const index = Math.abs(hash) % colors.length
      const color = colors[index]
      return { backgroundColor: color.bg, color: color.text }
    }

    onMounted(() => {
      fetchPosts()
    })

    return { 
      posts, 
      loading, 
      error, 
      page: computed(() => state.page), // Expose ref for template
      totalPages, 
      paged, 
      next, 
      prev, 
      fetchPosts,
      formatDate,
      stripHtml,
      getCategoryColor
    }
  }
})
</script>

<style scoped>
.blog-list-container {
  width: 100%;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .posts-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .posts-grid { grid-template-columns: 1fr; }
}

.post-card {
  background: var(--card-bg, #fff);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
  position: relative;
  display: flex;
  flex-direction: column;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 5px;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
  opacity: 0;
  transition: opacity 0.3s;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  border-color: transparent;
}

.post-card:hover::before { opacity: 1; }

.card-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tag {
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.title {
  margin: 0 0 1rem 0;
  font-size: 1.35rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.025em;
}

.desc {
  margin: 0 0 1.5rem 0;
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.date {
  font-size: 0.75rem;
  color: #4f46e5;
  font-weight: 700;
  background: #eef2ff;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.read-more {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4f46e5;
  transition: color 0.2s;
}

.post-card:hover .read-more { color: #06b6d4; }

.state-msg {
  padding: 4rem;
  text-align: center;
  color: #666;
  font-size: 1.1rem;
}

.spinner {
  border: 3px solid rgba(0,0,0,0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #4f46e5;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.retry-btn {
  margin-top: 1rem;
  padding: 8px 20px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.pager-btn {
  padding: 10px 20px;
  background: white;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  color: #374151;
  transition: all 0.2s;
}

.pager-btn:hover:not(:disabled) {
  background: #4f46e5;
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.pager-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  font-weight: 600;
  color: #6b7280;
}

/* Dark mode tweaks */
:global(html.theme-dark) .post-card {
  background: #1e293b;
  border-color: rgba(255,255,255,0.05);
}

:global(html.theme-dark) .title { color: #f3f4f6; }
:global(html.theme-dark) .desc { color: #9ca3af; }
:global(html.theme-dark) .date { background: rgba(79, 70, 229, 0.2); color: #818cf8; }
:global(html.theme-dark) .pager-btn { background: #1e293b; color: #e5e7eb; border-color: rgba(255,255,255,0.1); }
:global(html.theme-dark) .pager-btn:hover:not(:disabled) { background: #4f46e5; }
</style>
