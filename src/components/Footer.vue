<template>
  <footer class="site-footer" :class="{ 'is-sponsor': isSponsorPage }">
    <div class="footer-waves">
      <!-- 顶部波浪装饰，增加了颜色层级以在浅色背景下显现 -->
      <svg class="waves-top" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path id="gentle-wave-footer" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          <!-- 爱心波浪 Path: 使用一系列相连的贝塞尔曲线模拟波浪形状的爱心（这里采用简化版，通过CSS动画和装饰增强）-->
        </defs>
        
        <!-- 普通页面波浪 -->
        <g v-if="!isSponsorPage" class="parallax">
          <use xlink:href="#gentle-wave-footer" x="48" y="0" fill="rgba(244, 63, 94, 0.08)" />
          <use xlink:href="#gentle-wave-footer" x="48" y="3" fill="rgba(244, 63, 94, 0.12)" />
          <use xlink:href="#gentle-wave-footer" x="48" y="5" fill="rgba(244, 63, 94, 0.18)" />
          <use xlink:href="#gentle-wave-footer" x="48" y="7" fill="#ffffff" />
        </g>

        <!-- 赞助页面爱心波浪（颜色更暖，且有额外样式） -->
        <g v-else class="parallax heart-theme">
          <!-- 这里可以通过CSS修改颜色，或者直接在这里定义 -->
          <use xlink:href="#gentle-wave-footer" x="48" y="0" style="fill:rgba(255, 182, 193, 0.5)" />
          <use xlink:href="#gentle-wave-footer" x="48" y="3" style="fill:rgba(255, 105, 137, 0.2)" />
          <use xlink:href="#gentle-wave-footer" x="48" y="5" style="fill:rgba(255, 130, 155, 0.4)" />
          <use xlink:href="#gentle-wave-footer" x="48" y="7" style="fill:#ffffff" />
        </g>
      </svg>
      <!-- 爱心漂浮装饰 (仅赞助页) -->
      <div v-if="isSponsorPage" class="floating-hearts">
        <span class="heart-particle">❤️</span>
        <span class="heart-particle">💗</span>
        <span class="heart-particle">💖</span>
        <span class="heart-particle">💕</span>
      </div>
    </div>

    <div class="footer-inner">
      <div class="footer-content">
        <h2 class="footer-logo">
          <span class="logo-mark">C</span>iKWeb
        </h2>
        <p class="footer-slogan">
          探索技术的边界，记录生活的点滴。
        </p>
        <div class="footer-contact">
          <a href="mailto:cikheo@qq.com" class="email-link">
            <svg class="email-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
              <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
            </svg>
            <span>cikheo@qq.com</span>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          <span>Copyright &copy; 2025-{{ year }} Cik・保留所有权利・</span>
          <a :href="icpUrl" target="_blank" rel="noopener">{{ icp }}</a>
        </p>
        <div class="links">
          <router-link to="/privacy" class="privacy-link">隐私政策</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
/*
 * @Description: 全新设计的现代化页脚，采用深色主题与多列布局
 * @Author: CIK
 * @Date: 2026-01-24
 */
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'SiteFooter',
  setup() {
    const year = new Date().getFullYear()
    const icp = ref('陇ICP备2023002242号-9')
    const icpUrl = ref('https://beian.miit.gov.cn/')
    
    const route = useRoute()
    const isSponsorPage = computed(() => route.path === '/sponsor')
    
    return { year, icp, icpUrl, isSponsorPage }
  }
})
</script>

<style scoped>
.site-footer {
  position: relative;
  background: #ffffff;
  color: #4b5563; /* Gray-600 */
  border-top: 1px solid #e5e7eb; /* Subtle top border for separation */
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin-top: 8rem; /* 确保与正文的间隔，给波浪留出空间 */
  padding-bottom: 2rem;
}

/* 赞助页面特殊样式：移除顶部边框，因为背景是渐变的，边框会显得生硬 */
.site-footer.is-sponsor {
  border-top: none;
  background: linear-gradient(180deg, #fff 0%, #fff0f5 100%); /* 与页面背景衔接 */
  margin-top: 0; /* 赞助页面不需要这么大间距，因为背景是连贯的 */
}
/* 但我们需要波浪浮在上面 */
.site-footer.is-sponsor .footer-waves {
  top: -65px; /* Adjust to match wave height */
}

/* 顶部装饰波浪，使用绝对定位稍微溢出上方，作为过渡 */
.footer-waves {
  position: absolute;
  top: -100px; /* 增加向上偏移，让波浪露出更多 */
  left: 0;
  width: 100%;
  height: 105px; /* 增加波浪总高度，增强视觉冲击力 */
  overflow: hidden;
  line-height: 0;
  pointer-events: none;
  z-index: 10;
}

/* 漂浮爱心动画 */
.floating-hearts {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  pointer-events: none;
  overflow: hidden;
}

.heart-particle {
  position: absolute;
  bottom: -20px;
  font-size: 1.2rem;
  animation: floatUp 4s ease-in-out infinite;
  opacity: 0;
}

.heart-particle:nth-child(1) { left: 10%; animation-delay: 0s; font-size: 1rem; }
.heart-particle:nth-child(2) { left: 30%; animation-delay: 1.5s; font-size: 1.5rem; }
.heart-particle:nth-child(3) { left: 70%; animation-delay: 0.5s; font-size: 1.2rem; }
.heart-particle:nth-child(4) { left: 85%; animation-delay: 2.2s; font-size: 0.8rem; }

@keyframes floatUp {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  20% { opacity: 0.8; }
  80% { opacity: 0.5; }
  100% { transform: translateY(-70px) rotate(20deg); opacity: 0; }
}

.waves-top {
  width: 100%;
  height: 100%;
}

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) { animation-delay: -2s; animation-duration: 7s; }
.parallax > use:nth-child(2) { animation-delay: -3s; animation-duration: 10s; }
.parallax > use:nth-child(3) { animation-delay: -4s; animation-duration: 13s; }
.parallax > use:nth-child(4) { animation-delay: -5s; animation-duration: 20s; }

@keyframes move-forever {
  0% { transform: translate3d(-90px,0,0); }
  100% { transform: translate3d(85px,0,0); }
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.footer-content {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.footer-logo {
  font-size: 2rem;
  font-weight: 800;
  color: #111827; /* Gray-900 */
  margin: 0;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
}

.logo-mark {
  color: #f43f5e; /* Rose-500 */
  margin-right: 2px;
}

.footer-slogan {
  font-size: 1rem;
  color: #6b7280; /* Gray-500 */
  margin: 0.5rem 0 0;
  font-weight: 400;
}

.footer-contact {
  margin-top: 0.75rem;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}

.email-link:hover {
  color: #f43f5e; /* Rose-500 */
}

.email-icon {
  width: 1.25em;
  height: 1.25em;
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  font-size: 0.875rem;
  color: #9ca3af; /* Gray-400 */
  width: 100%;
  border-top: 1px solid #f3f4f6;
  padding-top: 1.5rem;
}

.copyright {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.copyright a, .privacy-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.links {
  display: flex;
  gap: 1.5rem;
}

.copyright a:hover, .privacy-link:hover {
  color: #111827; /* Gray-900 */
}

.made-with {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.heart {
  color: #f43f5e;
  display: inline-block;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .copyright {
    justify-content: flex-start;
  }
  
  .links {
    justify-content: flex-end;
  }
}

@media (max-width: 768px) {
  .site-footer {
    margin-top: 4rem;
    /* 增加底部间距，防止内容被右下角的悬浮导航栏遮挡 */
    padding-bottom: 5.5rem;
  }

  .footer-waves {
    top: -40px;
    height: 45px;
  }
  
  .footer-inner {
    padding-top: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .footer-bottom {
    align-items: flex-start;
    text-align: left;
  }

  .copyright {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    justify-content: flex-start;
    font-size: 0.7rem;
    width: 100%;
    gap: 0.25rem;
  }

  .links {
    align-self: flex-start;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }
}
</style>
