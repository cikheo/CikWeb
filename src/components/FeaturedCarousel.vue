<template>
  <section id="projects" class="featured">
    <div class="intro">
      <h2 class="gradient-text">推荐项目</h2>
      <p>精选的一系列有趣且实用的项目与工具</p>
    </div>
    
    <div class="carousel-wrapper" @mouseenter="pause" @mouseleave="startAutoplay">
      
      <div 
        ref="viewport" 
        class="carousel-viewport"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div ref="track" class="carousel-track" :style="trackStyle" @transitionend="onTransitionEnd">
          <div 
            v-for="s in slides" 
            :key="s._cloneId || s.id" 
            class="carousel-item"
            :style="{ width: itemWidth + 'px' }"
          >
            <ProjectCard :project="s" />
          </div>
        </div>
      </div>
      
      <!-- 导航按钮 -->
      <button type="button" class="nav-btn prev-btn" aria-label="上一页" @click="prev">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button type="button" class="nav-btn next-btn" aria-label="下一页" @click="next">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      <!-- 分页指示点 -->
      <div class="dots-container">
        <button 
          v-for="(_, idx) in realCount" 
          :key="idx" 
          class="dot" 
          :class="{ active: currentActiveIndex === idx }"
          :aria-label="`转到第 ${idx + 1} 页`"
          @click="goTo(idx)"
        ></button>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
/*
 * @Description: 首页项目轮播展示组件
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent, ref, onMounted, onUnmounted, computed, type ComputedRef } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import projects from '@/data/projects'

export default defineComponent({
  name: 'FeaturedCarousel',
  components: { ProjectCard },
  setup() {
    const featured = projects.slice()
    const visible = 3
    const intervalMs = 3000

    const carousel = ref<HTMLElement | null>(null)
    const viewport = ref<HTMLElement | null>(null)
    const track = ref<HTMLElement | null>(null)
    const slideWidth = ref(0)
    const itemWidth = ref(300)
    const index = ref(visible)
    let timer: ReturnType<typeof setInterval> | null = null
    const isTransitioning = ref(false)

    const slides = computed(() => {
      const items = featured.slice()
      const head = items.slice(0, visible).map((it) => ({ ...it, _cloneId: `head-${it.id}` }))
      const tail = items.slice(-visible).map((it) => ({ ...it, _cloneId: `tail-${it.id}` }))
      return [...tail, ...items, ...head]
    }) as ComputedRef<Array<Record<string, unknown>>>

    const realCount = computed(() => featured.length)
    
    const currentActiveIndex = computed(() => {
      // 当 index 在 buffer 区域时，映射回真实索引
      // index范围: 0 .. (visible-1) [tail clone] | visible .. (visible+realCount-1) [real] | ... [head clone]
      let val = index.value - visible
      if (val < 0) {
        val = realCount.value + val
      } else if (val >= realCount.value) {
        val = val - realCount.value
      }
      return val
    })

    // 触摸状态
    const touchStartX = ref(0)
    const touchStartY = ref(0)
    const isDragging = ref(false)
    const dragOffset = ref(0)
    // 用于基于速度的动量预测
    const lastTouchX = ref(0)
    const lastTouchTime = ref(0)

    const trackStyle = computed(() => {
      const base = -index.value * (slideWidth.value || 0)
      const x = base + dragOffset.value
      const transition = (isTransitioning.value && !isDragging.value)
        ? 'transform 360ms cubic-bezier(0.25, 1, 0.5, 1)'
        : 'none'
      return { transform: `translate3d(${x}px, 0, 0)`, transition }
    })

    const measure = () => {
      if (!viewport.value || !track.value) return
      
      const vpWidth = viewport.value.clientWidth
      const trackEl = track.value
      const cs = getComputedStyle(trackEl)
      
      // Try to parse the gap, defaulting to 32px (2rem) if it fails or returns 0/normal
      let gap = 32
      const cssGap = cs.columnGap || cs.gap
      if (cssGap && cssGap !== 'normal') {
        const parsed = parseFloat(cssGap)
        if (!isNaN(parsed) && parsed > 0) {
          gap = parsed
        }
      }
      
      // 根据响应式断点确定要显示的项数
      // 移动端: 1, 平板: 2, 桌面端: 3
      let count = 3
      if (window.innerWidth < 640) count = 1
      else if (window.innerWidth < 1024) count = 2
      
      // 计算每个项目的宽度，以精确容纳 'count' 个项目
      // 总宽度 = count * itemWidth + (count - 1) * gap
      // 减去 0.5px 缓冲并使用 floor 确保其在容器内完全契合，避免舍入导致的溢出
      const w = Math.floor((vpWidth - (count - 1) * gap) / count)
      
      itemWidth.value = w
      slideWidth.value = w + gap
    }

    const goTo = (realIdx: number) => {
      if (isTransitioning.value) return
      index.value = visible + realIdx
      isTransitioning.value = true
      resetAutoplay()
    }

    const next = () => {
      if (isTransitioning.value) return
      index.value += 1
      isTransitioning.value = true
      resetAutoplay()
    }

    const prev = () => {
      if (isTransitioning.value) return
      index.value -= 1
      isTransitioning.value = true
      resetAutoplay()
    }

    const onTransitionEnd = () => {
      isTransitioning.value = false
      if (index.value >= realCount.value + visible) {
        index.value = visible
      }
      if (index.value < visible) {
        index.value = realCount.value + visible - 1
      }
    }

    const startAutoplay = () => {
      if (timer) return
      timer = setInterval(() => { next() }, intervalMs)
    }

    const pause = () => { if (timer) { clearInterval(timer); timer = null } }

    const resetAutoplay = () => { pause(); startAutoplay() }

    const onTouchStart = (e: TouchEvent) => {
      if (isTransitioning.value) return
      pause()
      isDragging.value = true
      touchStartX.value = e.touches[0].clientX
      touchStartY.value = e.touches[0].clientY
      lastTouchX.value = touchStartX.value
      lastTouchTime.value = performance.now()
      dragOffset.value = 0
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.value) return
      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const deltaX = currentX - touchStartX.value
      const deltaY = currentY - touchStartY.value

      // 如果主要是垂直滚动，则忽略
      if (Math.abs(deltaY) > Math.abs(deltaX)) return

      if (e.cancelable) e.preventDefault()
      dragOffset.value = deltaX

      // 记录最后一次移动用于速度计算
      lastTouchX.value = currentX
      lastTouchTime.value = performance.now()
    }

    const onTouchEnd = () => {
      if (!isDragging.value) return
      isDragging.value = false

      const now = performance.now()
      const dt = Math.max(1, now - lastTouchTime.value) // 毫秒
      const vx = (lastTouchX.value - touchStartX.value) / dt // 像素/毫秒

      // 动量投影 (像素)
      const momentumFactor = 300 // 持续滚动的等效毫秒数
      const projected = dragOffset.value + vx * momentumFactor

      const threshold = slideWidth.value / 4

      if (projected > threshold) {
        prev()
      } else if (projected < -threshold) {
        next()
      } else {
        // 回弹
        if (dragOffset.value !== 0) {
          isTransitioning.value = true
          // CSS 过渡将动画回到当前索引
        }
        startAutoplay()
      }
      dragOffset.value = 0
    }

    onMounted(() => {
      measure()
      startAutoplay()
      window.addEventListener('resize', measure)
    })

    onUnmounted(() => {
      pause()
      window.removeEventListener('resize', measure)
    })

    return { 
      slides, carousel, viewport, track, trackStyle, 
      next, prev, onTransitionEnd, startAutoplay, pause, 
      itemWidth, realCount, currentActiveIndex, goTo,
      onTouchStart, onTouchMove, onTouchEnd
    }
  }
})
</script>

<style scoped>
.featured {
  padding: 5rem 1rem;
  background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
  position: relative;
  overflow: hidden;
}

/* 装饰性背景元素 */
.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.3;
  pointer-events: none;
  mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
}

.intro {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.intro h2 {
  margin: 0 0 0.75rem 0;
  color: #111827;
  font-weight: 850;
  font-size: 2.5rem;
  letter-spacing: -0.04em;
  position: relative;
  display: inline-block;
}

.gradient-text {
  background: linear-gradient(135deg, #111827 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.intro p {
  margin: 0;
  color: #4b5563;
  font-size: 1.125rem;
  max-width: 600px;
  line-height: 1.6;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 4rem; /* 为箭头预留空间 */
  box-sizing: border-box;
  z-index: 2;
}

.carousel-viewport {
  width: 100%;
  overflow: hidden;
  padding: 2.5rem 0 3.5rem 0; 
  margin: -2.5rem 0 -3.5rem 0;
}

/* 优化移动端触摸体验：允许原生垂直滚动，同时支持水平滑动处理 */
.carousel-viewport {
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
}

.carousel-track {
  display: flex;
  align-items: stretch;
  width: max-content;
  will-change: transform;
  column-gap: 2rem; 
}

.carousel-item {
  flex: 0 0 auto;
  box-sizing: border-box;
  padding: 0;
  height: auto;
  display: flex;
  justify-content: center;
}

/* 导航按钮 */
.nav-btn {
  position: absolute;
  top: calc(50% - 1.5rem);
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1f2937;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 10px 15px -3px rgba(0, 0, 0, 0.05);
  z-index: 10;
  outline: none;
}

.nav-btn:hover {
  background: #ffffff;
  color: #4f46e5;
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-50%) scale(1.1);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.prev-btn { left: 0; }
.next-btn { right: 0; }

.nav-btn svg {
  width: 24px;
  height: 24px;
}

/* 分页指示点 */
.dots-container {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #e5e7eb;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dot:hover {
  background-color: #d1d5db;
  transform: scale(1.2);
}

.dot.active {
  background-color: #4f46e5;
  width: 28px;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);
}

@media (max-width: 1024px) {
  .carousel-wrapper {
    padding: 0 3rem;
  }
}

@media (max-width: 768px) {
  .intro h2 { font-size: 2rem; }
}

@media (max-width: 640px) {
  .featured {
    padding: 1rem 1rem 0; /* Very compact vertical padding */
  }
  
  .carousel-wrapper {
    padding: 0;
  }
  
  .carousel-viewport {
    mask-image: none; 
    -webkit-mask-image: none;
    padding: 1rem 1rem 3rem 1rem; 
    margin: -1rem -1rem -3rem -1rem;
  }
  
  .nav-btn {
    display: none;
  }

  .dots-container {
    margin-top: 1rem;
  }
}
</style>
