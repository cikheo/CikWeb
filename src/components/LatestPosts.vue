<template>
  <section id="blog" class="latest-posts">
    <div class="section-header">
      <div class="header-left">
        <h2>最新文章</h2>
        <p>来自我的博客动态</p>
      </div>
      <router-link to="/blog" class="view-more-btn">查看更多 &rarr;</router-link>
    </div>
    
    <div v-if="loading" class="loading-state">
      加载中...
    </div>
    
    <div v-else-if="error" class="error-state">
      暂时无法加载文章
    </div>

    <div
v-else 
         class="carousel-wrapper"
         @mouseenter="stopAutoPlay" 
         @mouseleave="startAutoPlay"
    >
      <div class="carousel-container">
        <div 
          class="carousel-track"
          :style="{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }"
        >
          <div 
            v-for="post in posts" 
            :key="post.link" 
            class="carousel-item"
            :style="{ width: `${100 / itemsPerView}%` }"
          >
            <a 
              :href="post.link" 
              target="_blank" 
              rel="noopener" 
              class="post-card"
            >
              <div class="post-content">
                <div v-if="post.categories && post.categories.length > 0" class="post-tags">
                  <span 
                    v-for="(category, index) in post.categories.slice(0, 3)" 
                    :key="index" 
                    class="post-tag"
                    :style="getCategoryColor(category)"
                  >
                    {{ category }}
                  </span>
                </div>
                <h4 class="post-title" :title="post.title">{{ post.title }}</h4>
                <p class="post-desc">{{ stripHtml(post.description) }}</p>
                <div class="post-footer">
                  <span class="post-date">{{ formatDate(post.pubDate) }}</span>
                  <span class="read-more">阅读全文 &rarr;</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div v-if="posts.length > itemsPerView" class="carousel-controls">
        <button class="control-btn prev" aria-label="Previous posts" @click="prevSlide">
          &larr;
        </button>
        <button class="control-btn next" aria-label="Next posts" @click="nextSlide">
          &rarr;
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/*
 * @Description: 首页最新文章展示区，通过 RSS 获取博客动态并以轮播形式展现
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

interface Post {
  title: string
  link: string
  pubDate: string
  description: string
  thumbnail?: string
  categories?: string[]
}

export default defineComponent({
  name: 'LatestPosts',
  setup() {
    const posts = ref<Post[]>([])
    const loading = ref(true)
    const error = ref(false)
    const currentIndex = ref(0)
    const itemsPerView = ref(3)
    let autoPlayTimer: number | null = null

    const rssUrl = 'https://blog.cikcc.com/rss.xml'
    const CACHE_KEY = 'latest_posts_cache'
    const CACHE_TIME = 1000 * 60 * 60 // 1 小时

    const fetchPosts = async () => {
      loading.value = true
      
      // 1. 优先尝试从缓存加载
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { timestamp, data } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_TIME) {
            if (import.meta.env.DEV) console.debug('使用缓存的文章数据')
            posts.value = data
            loading.value = false
            startAutoPlay()
            return
          }
        }
      } catch (e) {
        console.warn('缓存解析失败', e)
        localStorage.removeItem(CACHE_KEY)
      }

      // 2. 使用多代理回退获取新鲜数据 (与博客页面一致)
      const proxies = [
        rssUrl, // 首先尝试直连
        `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}&t=${Date.now()}`,
        `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`,
        `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`
      ]

      let success = false
      let newPosts: Post[] = []

      for (const proxyUrl of proxies) {
        try {
          // 添加超时以防止卡在某个代理上
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)
          
          const response = await fetch(proxyUrl, { signal: controller.signal })
          clearTimeout(timeoutId)
          
          if (!response.ok) continue
          
          const xmlText = await response.text()
          // 最小化验证 XML 内容
          if (!xmlText.includes('<rss') && !xmlText.includes('<?xml')) continue

          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
          
          const items = xmlDoc.querySelectorAll('item')
          // 如果未找到 item，可能是该代理返回了有效页面但非 RSS (如错误页)
          if (items.length === 0) continue

          const parsedPosts: Post[] = []
          
          items.forEach(item => {
            const title = item.querySelector('title')?.textContent || ''
            const link = item.querySelector('link')?.textContent || ''
            const pubDate = item.querySelector('pubDate')?.textContent || ''
            const description = item.querySelector('description')?.textContent || ''
            
            // 提取分类
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

          if (parsedPosts.length > 0) {
            newPosts = parsedPosts
            success = true
            break // 成功后退出循环
          }

        } catch (e) {
          console.warn(`RSS 获取尝试失败 (${proxyUrl}):`, e)
        }
      }

      if (success) {
        posts.value = newPosts
        // 更新缓存
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: newPosts
        }))
        startAutoPlay()
        error.value = false
      } else {
        // 所有尝试均失败
        console.error('所有 RSS 获取尝试均已失败')
        
        // 尝试回退到已过期的缓存 (如果可用)
        try {
          const cached = localStorage.getItem(CACHE_KEY)
          if (cached) {
            const { data } = JSON.parse(cached)
              if (data && data.length) {
              if (import.meta.env.DEV) console.debug('使用过期缓存作为回退')
              posts.value = data
              startAutoPlay()
              error.value = false
            } else {
              error.value = true
            }
          } else {
            error.value = true
          }
        } catch {
          error.value = true
        }
      }
      
      loading.value = false
    }

    const startAutoPlay = () => {
      stopAutoPlay()
      if (posts.value.length <= itemsPerView.value) return
      
      autoPlayTimer = window.setInterval(() => {
        const maxIndex = posts.value.length - itemsPerView.value
        if (currentIndex.value >= maxIndex) {
          currentIndex.value = 0
        } else {
          currentIndex.value++
        }
      }, 5000)
    }

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer)
        autoPlayTimer = null
      }
    }

    const updateItemsPerView = () => {
      const oldVal = itemsPerView.value
      // 平板 (iPad) 断点: <=1024 -> 2 个项目; 移动端 <=640 -> 1 个项目; 否则 3 个
      itemsPerView.value = window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3
      // 如果视图模式改变，重置索引以避免空白区域
      if (oldVal !== itemsPerView.value) {
        currentIndex.value = 0
      }
    }

    const nextSlide = () => {
      const maxIndex = posts.value.length - itemsPerView.value
      if (currentIndex.value >= maxIndex) {
        currentIndex.value = 0
      } else {
        currentIndex.value++
      }
    }

    const prevSlide = () => {
      const maxIndex = posts.value.length - itemsPerView.value
      if (currentIndex.value <= 0) {
        currentIndex.value = maxIndex
      } else {
        currentIndex.value--
      }
    }

    const formatDate = (dateStr: string) => {
      try {
        const date = new Date(dateStr)
        return date.toLocaleDateString('zh-CN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (e) {
        return dateStr
      }
    }

    const stripHtml = (html: string) => {
      if (!html) return ''
      const doc = new DOMParser().parseFromString(html, 'text/html')
      const text = doc.body.textContent || ''
      return text.length > 80 ? text.substring(0, 80) + '...' : text
    }

    const getCategoryColor = (category: string) => {
      const colors = [
        { bg: '#e0e7ff', text: '#4338ca' }, // Indigo
        { bg: '#dcfce7', text: '#15803d' }, // Green
        { bg: '#f3e8ff', text: '#7e22ce' }, // Purple
        { bg: '#fee2e2', text: '#b91c1c' }, // Red
        { bg: '#fef9c3', text: '#a16207' }, // Yellow
        { bg: '#ccfbf1', text: '#0f766e' }, // Teal
        { bg: '#ffedd5', text: '#c2410c' }, // Orange
        { bg: '#fce7f3', text: '#be185d' }, // Pink
        { bg: '#f1f5f9', text: '#334155' }, // Slate
        { bg: '#f3f4f6', text: '#374151' }, // Gray
        { bg: '#f4f4f5', text: '#3f3f46' }, // Zinc
        { bg: '#f5f5f5', text: '#404040' }, // Neutral
        { bg: '#f5f5f4', text: '#44403c' }, // Stone
        { bg: '#fef3c7', text: '#b45309' }, // Amber
        { bg: '#ecfccb', text: '#4d7c0f' }, // Lime
        { bg: '#d1fae5', text: '#047857' }, // Emerald
        { bg: '#cffafe', text: '#0e7490' }, // Cyan
        { bg: '#e0f2fe', text: '#0369a1' }, // Sky
        { bg: '#dbeafe', text: '#1d4ed8' }, // Blue
        { bg: '#ede9fe', text: '#6d28d9' }, // Violet
        { bg: '#fae8ff', text: '#a21caf' }, // Fuchsia
        { bg: '#ffe4e6', text: '#be123c' }, // Rose
        { bg: '#e0f2f1', text: '#00695c' }, // Mint
        { bg: '#ede7f6', text: '#4527a0' }, // Lavender
        { bg: '#e1f5fe', text: '#0277bd' }, // Azure
        { bg: '#fff3e0', text: '#ef6c00' }, // Peach
        { bg: '#fbe9e7', text: '#d84315' }, // Coral
        { bg: '#fff8e1', text: '#ff8f00' }, // Gold
        { bg: '#fce4ec', text: '#c2185b' }, // Berry
        { bg: '#f9fbe7', text: '#827717' }, // Olive
      ]
      
      let hash = 0
      for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash)
      }
      
      const index = Math.abs(hash) % colors.length
      const color = colors[index]
      
      return {
        backgroundColor: color.bg,
        color: color.text
      }
    }

    onMounted(() => {
      updateItemsPerView()
      window.addEventListener('resize', updateItemsPerView)
      fetchPosts()
    })

    onUnmounted(() => {
      stopAutoPlay()
      window.removeEventListener('resize', updateItemsPerView)
    })

    return { 
      posts, 
      loading, 
      error, 
      formatDate, 
      stripHtml, 
      getCategoryColor,
      currentIndex,
      itemsPerView,
      startAutoPlay,
      stopAutoPlay,
      nextSlide,
      prevSlide
    }
  }
})

</script>

<style scoped>
.latest-posts { padding: 2rem 1rem 1.5rem; display:flex; flex-direction: column; align-items:center; }

.section-header { 
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem; 
  width: 100%; 
  max-width: calc(380px * 3 + 3rem * 2); 
}

.header-left { text-align: left; }

.section-header h2 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--heading-color, #1f2937); }
.section-header p { font-size: 1.125rem; color: #6b7280; margin: 0; }

.view-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background-color: transparent;
  color: #4f46e5;
  border: 1px solid rgba(79, 70, 229, 0.3);
  border-radius: 9999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.view-more-btn:hover {
  background-color: #4f46e5;
  color: white;
  transform: translateY(-2px);
  border-color: #4f46e5;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.mobile-view-more {
  display: none;
}

.carousel-wrapper {
  width: 100%;
  max-width: calc(380px * 3 + 3rem * 2);
  display: flex;
  flex-direction: column;
  position: relative;
}

@media (max-width: 1024px) {
  /* 在平板端限制容器宽度以适应 2 列布局 */
  .carousel-wrapper { max-width: calc(380px * 2 + 1.5rem); }
  .section-header { max-width: calc(380px * 2 + 1.5rem); }
}

@media (max-width: 640px) {
  .section-header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  
  .view-more-btn {
    padding: 0.35rem 0.85rem;
    font-size: 0.8rem;
  }

  .carousel-controls {
    margin-top: 1rem;
  }
}

.carousel-container {
  width: 100%;
  overflow: hidden;
  padding: 1rem 0 2rem 0;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.control-btn {
  background: white;
  border: 2px solid #e0e7ff; /* Indigo 100 for better visibility */
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4f46e5; /* Indigo 600 */
  font-size: 1.5rem;
  line-height: 1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px -2px rgba(79, 70, 229, 0.1);
}

.control-btn:hover {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 14px 28px -6px rgba(79, 70, 229, 0.3);
}

.control-btn:active {
  transform: translateY(-1px) scale(0.95);
  box-shadow: 0 4px 8px -2px rgba(79, 70, 229, 0.2);
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

.carousel-item {
  flex-shrink: 0;
  padding: 0 0.75rem;
  box-sizing: border-box;
}

.post-card { 
  display: flex; 
  flex-direction: column; 
  background: var(--card-bg, #fff); 
  border-radius: 20px; 
  overflow: hidden; 
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
  height: 100%;
  position: relative;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #4f46e5, #06b6d4);
  opacity: 0;
  transition: opacity 0.3s;
}

.post-card:hover::before {
  opacity: 1;
}

.post-card:hover { 
  transform: translateY(-8px); 
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); 
  border-color: transparent;
}

.post-content { 
  padding: 2rem; 
  flex: 1; 
  display: flex; 
  flex-direction: column; 
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.post-tag {
  font-size: 0.7rem;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.post-date { 
  font-size: 0.75rem;   
  color: #4f46e5; 
  font-weight: 700;
  background: #eef2ff;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  letter-spacing: 0.025em;
  text-transform: uppercase;
}

.post-title { 
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

.post-desc { 
  margin: 0 0 1.5rem 0; 
  color: #4b5563; 
  font-size: 0.95rem; 
  line-height: 1.6; 
  flex: 1;
}

.post-footer { 
  margin-top: auto; 
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.read-more {
  font-size: 0.9rem;
  font-weight: 600;
  color: #4f46e5;
  transition: color 0.2s;
}

.post-card:hover .read-more {
  color: #06b6d4;
}

.loading-state, .error-state {
  padding: 3rem;
  text-align: center;
  color: #6b7280;
  background: #f9fafb;
  border-radius: 12px;
  width: 100%;
  max-width: calc(380px * 3 + 3rem * 2);
}

@media (max-width: 900px) {
  .carousel-container { max-width: 100%; }
}

@media (max-width: 640px) {
  .latest-posts { 
    padding: 1.5rem 1rem 0; /* Compact top/bottom padding */
  }
  
  .section-header { 
    margin-bottom: 0.5rem;
    padding: 0 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  .section-header p {
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }

  .carousel-container {
    padding-bottom: 0.5rem;
  }

  .carousel-controls {
    margin-top: 0.5rem;
  }

  .post-card:hover {
    transform: none;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025);
  }

  .post-card:hover::before {
    opacity: 0;
  }

  .control-btn {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>
