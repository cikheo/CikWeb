<template>
  <header 
    class="site-header" 
    ref="headerRef"
  >
    <div class="brand">
      <!-- 移动端首访问候语 -->
      <transition name="fade-up">
        <div v-if="showGreeting" class="greeting-bubble" @click="showGreeting = false">
          Hello!
        </div>
      </transition>
      <router-link to="/" custom>
        <template #default="{ navigate, href }">
          <a :href="href" aria-label="首页" @click.prevent="() => onHomeClick(navigate)">
            <img class="brand-img" src="/src/assets/img/Cik!cover.png" alt="Cik" />
          </a>
        </template>
      </router-link>
    </div>

    <!-- 移动端菜单切换按钮 -->
    <button 
      class="nav-toggle" 
      aria-label="切换菜单" 
      @click="toggleMenu"
    >
      <svg v-if="!isMenuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
      <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <nav class="nav" :class="{ 'is-open': isMenuOpen }">
      <router-link to="/#projects" custom>
        <template #default="{ navigate, href }">
          <a :href="href" @click="() => { onProjectsClick(navigate) }">推荐</a>
        </template>
      </router-link>
      <router-link to="/#tools" custom>
        <template #default="{ navigate, href }">
          <a :href="href" @click="() => { onToolsClick(navigate) }">工具</a>
        </template>
      </router-link>
      <router-link to="/#media" custom>
        <template #default="{ navigate, href }">
          <a :href="href" @click="() => { onMediaClick(navigate) }">媒体</a>
        </template>
      </router-link>
      <router-link to="/#blog" custom>
        <template #default="{ navigate, href }">
          <a :href="href" @click="() => { onBlogClick(navigate) }">文章</a>
        </template>
      </router-link>
      <a href="https://blog.cikcc.com" target="_blank" class="blog-highlight">博客</a>
    </nav>
  </header>
</template>

<script lang="ts">
/*
 * @Description: 网站顶部导航栏组件，包含响应式菜单、滚动高亮定位及平滑滚动功能
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent, onMounted, onUnmounted, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'HeaderNav',
  setup() {
    const route = useRoute()
    const isMenuOpen = ref(false)
    const showGreeting = ref(false)
    const headerRef = ref<HTMLElement | null>(null)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
      if (showGreeting.value) showGreeting.value = false
    }

    const onProjectsClick = (navigate?: () => Promise<unknown> | void) => {
      // 导航后监听滚动，直到项目元素到达导航栏底部
      Promise.resolve(navigate && navigate()).then(() => {
        const el = document.getElementById('projects')
        
        // 滚动到项目位置并带偏移量
        if (el) {
          const headerEl = document.querySelector('.site-header') as HTMLElement | null
          // 获取导航栏高度并加上一些内边距
          const offset = (headerEl ? headerEl.offsetHeight + 20 : 80)
          const elementPosition = el.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - offset

          try {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          } catch (e) { /* 忽略错误 */ }
        }
      })
    }

    const onToolsClick = (navigate?: () => Promise<unknown> | void) => {
      // 导航后监听滚动，直到工具元素到达导航栏底部
      Promise.resolve(navigate && navigate()).then(() => {
        const el = document.getElementById('tools')
        
        // 滚动到工具位置并带偏移量
        if (el) {
          const headerEl = document.querySelector('.site-header') as HTMLElement | null
          const offset = (headerEl ? headerEl.offsetHeight + 20 : 80)
          const elementPosition = el.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - offset

          try {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          } catch (e) { /* 忽略错误 */ }
        }
      })
    }

    const onMediaClick = (navigate?: () => Promise<unknown> | void) => {
      // 导航后监听滚动，直到媒体元素到达导航栏底部
      Promise.resolve(navigate && navigate()).then(() => {
        const el = document.getElementById('media')
        
        // 滚动到媒体位置并带偏移量
        if (el) {
          const headerEl = document.querySelector('.site-header') as HTMLElement | null
          const offset = (headerEl ? headerEl.offsetHeight + 20 : 80)
          const elementPosition = el.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - offset

          try {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          } catch (e) { /* 忽略错误 */ }
        }
      })
    }

    const onBlogClick = (navigate?: () => Promise<unknown> | void) => {
      // 导航后监听滚动，直到文章元素到达导航栏底部
      Promise.resolve(navigate && navigate()).then(() => {
        const el = document.getElementById('blog')
        
        // 滚动到文章位置并带偏移量
        if (el) {
          const headerEl = document.querySelector('.site-header') as HTMLElement | null
          const offset = (headerEl ? headerEl.offsetHeight + 20 : 80)
          const elementPosition = el.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - offset

          try {
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          } catch (e) { /* 忽略错误 */ }
        }
      })
    }

    const onHomeClick = (navigate?: () => Promise<unknown> | void) => {
      const doScroll = () => {
        // 开始平滑滚动到顶部
        try { window.scrollTo({ top: 0, behavior: 'smooth' }) } catch (e) { /* 忽略错误 */ }
      }

      if (navigate) {
        // 处理导航 Promise，无论成功失败都执行滚动（例如重复导航）
        const res = navigate()
        if (res && typeof res.then === 'function') {
           res.then(doScroll).catch(doScroll)
        } else {
           doScroll()
        }
      } else {
         doScroll()
      }
    }

    // 仅在实际路径偏离 '/' 时清除高亮
    watch(() => route.path, (p) => {
      isMenuOpen.value = false
    })

    const updateHeaderBottom = () => {
      const el = document.querySelector('.site-header') as HTMLElement | null
      if (!el) return
      const rect = el.getBoundingClientRect()
      const value = `${Math.ceil(rect.bottom)}px`
      document.documentElement.style.setProperty('--header-bottom', value)
    }

    onMounted(() => {
      updateHeaderBottom()
      window.addEventListener('resize', updateHeaderBottom)

      // 移动端每次刷新首页问候逻辑
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        setTimeout(() => {
          showGreeting.value = true
          // 6秒后自动消失
          setTimeout(() => {
            showGreeting.value = false
          }, 6000)
        }, 500) // 缩短延迟，让问候更及时
      }
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateHeaderBottom)
    })

    return { 
      isMenuOpen, toggleMenu,
      onProjectsClick,
      onToolsClick,
      onMediaClick,
      onBlogClick,
      onHomeClick,
      headerRef,
      showGreeting
    }
  }
})
</script>

<style scoped>
@keyframes slideDown {
  from { transform: translate(-50%, -100%); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}

@keyframes slideDownMobile {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.site-header {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  padding-left: 0.8rem;
  /* 胶囊形状 */
  border-radius: 9999px;
  
  /* 毛玻璃效果 */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  
  /* 边框和阴影 */
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 
    0 8px 32px -4px rgba(0, 0, 0, 0.1),
    0 2px 8px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
    
  z-index: 1000;
  min-width: 340px;
  max-width: 90vw;
  animation: slideDown 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.site-header:hover {
  transform: translateX(-50%) translateY(-2px) scale(1.05);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 
    0 20px 40px -8px rgba(0, 0, 0, 0.15),
    0 8px 16px -4px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.brand {
  display: flex;
  align-items: center;
  margin-right: 0.2rem;
}
.brand a { 
  display: flex;
  align-items: center;
  text-decoration: none; 
}
.brand-img { 
  width: 40px; 
  height: 40px; 
  border-radius: 50%; 
  object-fit: cover; 
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  border: 2px solid rgba(255,255,255,0.8);
}

.brand:hover .brand-img { 
  transform: scale(1.1) rotate(10deg); 
}

.nav { 
  display: flex; 
  gap: 0.3rem; 
  align-items: center;
}

.nav a {
  color: #555;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  white-space: nowrap;
  letter-spacing: 0.01em;
}

.nav a:hover { 
  color: #4f46e5;
  background: rgba(79, 70, 229, 0.08);
  transform: translateY(-1px);
}

.nav a.blog-highlight {
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: #fff !important;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4);
  transform: scale(1.02);
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.nav-toggle:hover {
  background-color: rgba(0,0,0,0.05);
}

@keyframes slideUpMobile {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .site-header {
    top: auto;
    bottom: 2rem; /* 固定在底部 */
    right: 1.5rem; /* 固定在右侧 */
    left: auto;
    transform: none;
    min-width: unset;
    max-width: none;
    flex-wrap: nowrap; /* 防止换行 */
    width: fit-content;
    padding: 0.5rem;
    padding-left: 0.6rem;
    border-radius: 9999px; /* 保持胶囊状 */
    animation: slideUpMobile 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .site-header:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 15px 35px -5px rgba(0,0,0,0.25);
  }

  .nav-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5rem;
    padding: 6px; /* 稍微增加内边距便于点击 */
    width: 36px; /* 稍微加大按钮 */
    height: 36px;
    color: #333; /* 确保颜色正确 */
    background: rgba(255,255,255,0.5); /* 增加轻微背景确保可见 */
    border-radius: 50%;
  }

  .nav { 
    display: none; 
    position: absolute;
    bottom: 100%;
    right: 0;
    margin-bottom: 0.8rem;
    
    /* 独立的菜单容器样式 */
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 
      0 10px 40px -10px rgba(0,0,0,0.2),
      0 0 0 1px rgba(0,0,0,0.05);
    border-radius: 1.5rem;
    
    min-width: 110px;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.25rem;
    
    transform-origin: bottom right;
    animation: menuPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  @keyframes menuPop {
    from { opacity: 0; transform: scale(0.9) translateY(10px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
  
  .nav.is-open {
    display: flex;
  }

  .nav a {
    padding: 0.6rem 0.8rem;
    font-size: 0.95rem;
    width: 100%;
    text-align: center;
    background: transparent;
    color: #444;
  }

  .nav a:hover {
    background: rgba(0,0,0,0.04);
    border-radius: 1rem;
  }

  /* Make brand + toggle sit on the same line */
  .brand {
    margin-right: 0;
  }
 
  .brand-img { width: 42px; height: 42px; } /* 恢复头像大小 */
  .actions :deep(.theme-toggle) { width: 32px; height: 32px; font-size: 1rem; }

  /* 问候气泡样式 */
  .greeting-bubble {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 12px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    color: white;
    padding: 6px 14px;
    border-radius: 12px;
    font-size: 0.85rem;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
    z-index: 1002;
    pointer-events: auto;
  }

  .greeting-bubble::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #7c3aed;
  }

  /* 动画 */
  .fade-up-enter-active, .fade-up-leave-active {
    transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }
  .fade-up-enter-from {
    opacity: 0;
    transform: translate(-50%, 10px) scale(0.8);
  }
  .fade-up-leave-to {
    opacity: 0;
    transform: translate(-50%, -5px) scale(0.95);
  }
}
</style>
