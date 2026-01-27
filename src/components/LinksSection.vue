<template>
  <section id="links" class="links-section">
    <div class="section-header">
      <div class="header-content">
        <h2>正在发电</h2>
        <p>感谢每一位支持者</p>
      </div>
      <router-link to="/sponsor" class="learn-more-btn">
        进一步了解 &rarr;
      </router-link>
    </div>
    <div class="links-inner">
      <div v-for="link in links" :key="link.id" class="link-card">
        <div class="link-left">
          <img :src="link.icon" :alt="link.name" class="link-icon" />
        </div>

        <div class="link-right">
          <h4 class="link-title">
            {{ link.name }}
            <span v-if="link.sponsorName" class="sponsor-badge">
               <span class="heart">❤️</span> 感谢 {{ link.sponsorName }}
            </span>
          </h4>
          <p class="link-desc">{{ link.description }}</p>
          <div class="link-actions">
            <a :href="link.link" target="_blank" rel="noopener" class="visit-btn">访问</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/*
 * @Description: 友情链接展示区，包含感谢赞助者的标语与链接列表
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent } from 'vue'
import links from '@/data/links'

export default defineComponent({
  name: 'LinksSection',
  setup() {
    return { links }
  }
})
</script>

<style scoped>
.links-section {
  padding: 1rem 1rem 3rem; /* 进一步减少底部边距 */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa; /* 确保背景一致 */
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;
  max-width: var(--content-width, 1200px);
  padding: 0 1rem;
}

.header-content {
  display: flex;
  flex-direction: column;
}

.section-header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #111827;
  letter-spacing: -0.02em;
}

.learn-more-btn {
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
  font-size: 1rem; /* 重置字体大小以正确匹配或继承 */
}

.learn-more-btn:hover {
  background-color: #4f46e5;
  color: white;
  transform: translateY(-2px);
  border-color: #4f46e5;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
}

.section-header p {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
}

.links-inner {
  max-width: var(--content-width, 1200px);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0 1rem;
}

.link-card {
  display: flex;
  align-items: center; /* 内容垂直居中 */
  padding: 1.25rem;
  background: transparent;
  border-radius: 16px;
  border: none;
  box-shadow: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.link-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.link-left {
  flex: 0 0 auto;
  margin-right: 1.25rem;
}

.link-icon {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #f3f4f6; /* 为透明图标提供浅灰色背景 */
  padding: 4px; /* 内部留白 */
  border: 1px solid rgba(0,0,0,0.05);
}

.link-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0; /* 允许在 flex 容器中截断文本 */
}

.link-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

.link-desc {
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-size: 0.9375rem;
  line-height: 1.5;
  
  /* 文本截断 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link-actions {
  margin-top: auto;
}

.visit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 1.5rem;
  background-color: rgba(79, 70, 229, 0.08); /* 浅色背景 */
  color: #4f46e5; /* 主题色文字 */
  border-radius: 9999px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: none;
  background-image: none;
}

.visit-btn:hover {
  background-color: #4f46e5;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px -6px rgba(79, 70, 229, 0.4);
}

/* 赞助者角标样式 - 美化版 */
.sponsor-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(244, 63, 94, 0.15);
  color: #e11d48;
  font-size: 0.75rem;
  padding: 4px 10px 4px 8px;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 12px rgba(244, 63, 94, 0.12), 0 1px 2px rgba(0,0,0,0.02);
  z-index: 5;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.link-card:hover .sponsor-badge {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 16px rgba(244, 63, 94, 0.2);
  border-color: rgba(244, 63, 94, 0.3);
}

.sponsor-badge .heart {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  filter: drop-shadow(0 2px 4px rgba(244, 63, 94, 0.2));
  animation: heartbeat-mini 1.5s infinite ease-in-out;
}

@keyframes heartbeat-mini {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@media (max-width: 1024px) {
  .links-inner {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem; /* 平板端更紧凑的间距 */
  }
  .link-card {
    margin: 0;
    padding: 0.8rem; /* 减少内边距 */
    border-radius: 10px;
    background: transparent !important;
    box-shadow: none !important;
    transition: transform 0.18s ease;
    align-items: center;
  }
  .link-card:hover {
    transform: translateY(-2px);
    background: transparent !important;
    box-shadow: none !important;
  }

  .link-left { margin-right: 0.75rem; }
  .link-icon { width: 56px; height: 56px; border-radius: 12px; padding: 2px; background-color: transparent !important; border: none !important; }
  .link-title { font-size: 1rem; margin-bottom: 0.25rem; }
  .link-desc { margin-bottom: 0.4rem; font-size: 0.85rem; -webkit-line-clamp: 2; }
  .link-actions { margin-top: 0; }
  .visit-btn { height: 32px; padding: 0 0.9rem; font-size: 0.85rem; }
}

@media (max-width: 640px) {
  .links-section {
    padding-top: 2rem;
    padding-bottom: 0px; 
  }

  .section-header {
    margin-bottom: 0.5rem;
    padding: 0 1rem;
    align-items: center; /* 移动端居中对齐 */
  }

  /* .header-top 已移除，无需覆盖 */

  .section-header h2 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
  
  .learn-more-btn {
    padding: 0.35rem 0.85rem;
    font-size: 0.8rem;
  }

  .section-header p {
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }

  /* 模仿 ToolsSection 移动端样式 */
  .links-inner {
    grid-template-columns: 1fr;
    gap: 0;
    max-width: 100%;
    padding: 0 1rem;
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
    margin-bottom: 2rem;
    width: auto;
    margin-left: 1rem;
    margin-right: 1rem;
    display: block; /* 强制块状以符合容器行为，或保持 grid 但确保宽度受边距限制 */
    display: grid; /* 保持 grid */
  }
  
  .link-card {
    padding: 1rem;
    border-radius: 0;
    margin: 0;
    border-bottom: 1px solid #f3f4f6;
    background: #ffffff;
    align-items: center;
    position: relative;
    border: none;
    border-bottom: 1px solid #f3f4f6;
    flex-wrap: wrap; /* 允许角标换行 */
  }
  
  .link-card:last-child {
    border-bottom: none;
  }
  
  .link-card:hover {
    transform: none;
    box-shadow: none;
    background-color: #fafafa;
  }
  
  .link-left {
    margin-right: 1rem;
    flex: 0 0 auto;
    order: 1;
  }
  
  .link-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    padding: 0;
    background-color: transparent !important;
    border: none !important;
  }

  .link-right {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    width: 100%; /* 强制占据剩余空间 */
    flex: 1; /* 显式 flex 1 以防万一 */
    column-gap: 0.75rem;
    align-items: center;
    order: 2;
  }

  .link-title {
    grid-column: 1;
    grid-row: 1;
    font-size: 1rem;
    margin-bottom: 0.15rem;
    position: relative;
    width: fit-content;
    padding-right: 2px; /* 轻微间距 */
  }

  .link-desc {
    grid-column: 1;
    grid-row: 2;
    font-size: 0.8rem;
    margin-bottom: 0;
    -webkit-line-clamp: 1;
  }

  .link-actions {
    grid-column: 2;
    grid-row: 1 / -1;
    margin-top: 0;
    display: flex;
    align-items: center;
  }

  .visit-btn {
    height: 30px;
    min-width: 68px;
    padding: 0 0.5rem;
    font-size: 13px;
    font-weight: 700;
    background-color: #eef2ff;
    color: #4f46e5;
    width: auto;
    border-radius: 99px;
    border: 1px solid rgba(99, 102, 241, 0.15);
    letter-spacing: 0.01em;
  }

  /* 移动端赞助者角标 - 增强样式 */
  .sponsor-badge {
    position: absolute;
    top: -8px;
    right: -10px;
    transform: translateX(100%) scale(0.9);
    transform-origin: left bottom;
    
    font-size: 0.55rem;
    padding: 1px 6px;
    border-radius: 99px;
    background: linear-gradient(to right, #fff0f5, #fff);
    border: 1px solid rgba(253, 164, 175, 0.4);
    color: #e11d48;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(225, 29, 72, 0.08);
    opacity: 1;
    z-index: 5;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    white-space: nowrap;
    margin: 0;
    width: auto;
  }

  .sponsor-badge .heart {
    font-size: 0.65rem;
  }
  
  /* 针对角标重置 link-card 悬停覆盖 */
  .link-card:hover .sponsor-badge {
    transform: none;
    box-shadow: 0 2px 8px rgba(225, 29, 72, 0.08);
  }
}

</style>
