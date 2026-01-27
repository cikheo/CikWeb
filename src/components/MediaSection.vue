<template>
  <section id="media" class="media">
    <div class="section-header">
      <h2>关注我</h2>
      <p>在这些平台上找到我</p>
    </div>
    <div class="media-inner">
      <div v-for="item in media" :key="item.id" class="media-card">
        <div class="media-left">
          <img :src="item.icon" :alt="item.name" class="media-icon" />
        </div>

        <div class="media-right">
          <h4 class="media-title">{{ item.name }}</h4>
          <p class="media-desc">{{ item.description }}</p>
          <div class="media-actions">
            <a :href="item.link" target="_blank" rel="noopener" class="visit-btn">关注</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/*
 * @Description: 媒体展示区域，展示视频、图片及相关资源链接
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent } from 'vue'
import media from '@/data/media'

export default defineComponent({
  name: 'MediaSection',
  setup() {
    return { media }
  }
})
</script>

<style scoped>
.media {
  padding: 1.5rem 1rem 3.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa; /* 背景保持一致 */
}

.section-header {
  text-align: left;
  margin-bottom: 2rem;
  width: 100%;
  max-width: var(--content-width, 1200px);
  padding: 0 1rem;
}

.section-header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  color: #111827;
  letter-spacing: -0.02em;
}

.section-header p {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 600px;
}

.media-inner {
  max-width: var(--content-width, 1200px);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0 1rem;
}

.media-card {
  display: flex;
  align-items: center; /* 像工具栏一样垂直居中内容 */
  padding: 1.25rem;
  background: transparent;
  border-radius: 16px;
  border: none;
  box-shadow: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
}

.media-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.media-left {
  flex: 0 0 auto;
  margin-right: 1.25rem;
}

.media-icon {
  width: 80px; /* 与工具栏同样的大尺寸 */
  height: 80px;
  object-fit: cover;
  border-radius: 50%; /* 圆形 */
  background-color: #f3f4f6;
  padding: 4px;
  border: 1px solid rgba(0,0,0,0.05);
}

.media-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.media-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

.media-desc {
  margin: 0 0 1rem 0;
  color: #6b7280;
  font-size: 0.9375rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-actions {
  margin-top: auto;
}

.visit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 0 1.5rem;
  background-color: rgba(79, 70, 229, 0.08);
  color: #4f46e5;
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

@media (max-width: 1024px) {
  .media-inner {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem; /* 平板端更紧凑的间距 */
  }
  .media-card {
    margin: 0;
    padding: 0.8rem; /* 减少内边距 */
    border-radius: 10px;
    background: transparent !important;
    box-shadow: none !important;
    transition: transform 0.18s ease;
    align-items: center;
  }
  .media-card:hover {
    transform: translateY(-2px);
    background: transparent !important;
    box-shadow: none !important;
  }

  .media-left { margin-right: 0.75rem; }
  .media-icon { width: 56px; height: 56px; border-radius: 12px; padding: 2px; background-color: transparent !important; border: none !important; }
  .media-title { font-size: 1rem; margin-bottom: 0.25rem; }
  .media-desc { margin-bottom: 0.4rem; font-size: 0.85rem; -webkit-line-clamp: 2; }
  .media-actions { margin-top: 0; }
  .visit-btn { height: 32px; padding: 0 0.9rem; font-size: 0.85rem; }
}

@media (max-width: 640px) {
  .media {
    padding-bottom: 4rem;
    padding-top: 1.5rem; /* 小量顶部内边距用于分隔 */
  }

  .section-header {
    margin-bottom: 0.5rem;
    padding: 0 1rem;
  }
  
  .section-header h2 {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }

  /* 添加 p 标签样式以保持一致性 */
  .section-header p {
    font-size: 0.95rem;
    margin-bottom: 0.25rem;
  }
  
  .media-inner {
    grid-template-columns: 1fr;
    gap: 0;
    padding: 0 1rem;
    /* 卡片/表格容器样式 */
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    overflow: hidden;
  }
  
  .media-card {
    padding: 1rem;
    border-radius: 0;
    margin: 0;
    border-bottom: 1px solid #f3f4f6;
    background: #ffffff;
    align-items: center;
  }
  
  .media-card:last-child {
    border-bottom: none;
  }
  
  .media-card:hover {
    transform: none;
    box-shadow: none;
    background-color: #fafafa;
  }
  
  .media-left {
    margin-right: 1rem;
  }
  
  .media-icon {
    width: 48px;
    height: 48px;
    padding: 0;
    /* 媒体/头像保持 50% 圆角 */
    border-radius: 50%;
    background-color: transparent !important;
    border: none !important;
  }

  .media-right {
    display: grid;
    grid-template-columns: 1fr auto; 
    grid-template-rows: auto auto;
    width: 100%;
    column-gap: 0.75rem;
    align-items: center;
  }
  
  .media-title {
    grid-column: 1;
    grid-row: 1;
    font-size: 1rem;
    margin-bottom: 0.15rem;
  }
  
  .media-desc {
    grid-column: 1;
    grid-row: 2;
    font-size: 0.8rem;
    margin-bottom: 0;
    -webkit-line-clamp: 1;
  }
  
  .media-actions {
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
    /* 一致的靛蓝色主题 */
    background-color: #eef2ff;
    color: #4f46e5;
    width: auto;
    border-radius: 99px;
    border: 1px solid rgba(99, 102, 241, 0.15);
    transition: transform 0.1s ease, background-color 0.2s;
    letter-spacing: 0.01em;
  }
  
  .visit-btn:active {
    background-color: #e0e7ff;
    transform: scale(0.96);
    color: #4338ca;
  }
  
  /* 针对触摸设备重置悬停效果 */
  .visit-btn:hover {
    background-color: #eef2ff;
    transform: none;
    box-shadow: none;
    color: #4f46e5;
  }
}
</style>
