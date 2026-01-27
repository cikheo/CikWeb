<template>
  <section id="tools" class="tools">
    <div class="section-header">
      <h2>工具</h2>
      <p>提升开发效率的精选神器</p>
    </div>
    <div class="tools-inner">
      <div v-for="tool in tools" :key="tool.id" class="tool-card">
        <div class="tool-left">
          <img :src="tool.icon" :alt="tool.name" class="tool-icon" />
        </div>

        <div class="tool-right">
          <h4 class="tool-title">{{ tool.name }}</h4>
          <p class="tool-desc">{{ tool.description }}</p>
          <div class="tool-actions">
            <a :href="tool.link" target="_blank" rel="noopener" class="visit-btn">访问</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/*
 * @Description: 常用工具展示区，以响应式网格形式呈现推荐工具
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent } from 'vue'
import tools from '@/data/tools'

export default defineComponent({
  name: 'ToolsSection',
  setup() {
    return { tools }
  }
})
</script>

<style scoped>
.tools {
  padding: 2.5rem 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa; /* 确保背景一致 */
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

.tools-inner {
  max-width: var(--content-width, 1200px);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 0 1rem;
}

.tool-card {
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

.tool-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.tool-left {
  flex: 0 0 auto;
  margin-right: 1.25rem;
}

.tool-icon {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #f3f4f6; /* 为透明图标提供浅灰色背景 */
  padding: 4px; /* 内部留白 */
  border: 1px solid rgba(0,0,0,0.05);
}

.tool-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0; /* 允许在 flex 容器中截断文本 */
}

.tool-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

.tool-desc {
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

.tool-actions {
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

@media (max-width: 1024px) {
  .tools-inner {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem; /* 平板端更紧凑的间距 */
  }
  .tool-card {
    margin: 0;
    padding: 0.8rem; /* 减少内边距 */
    border-radius: 10px;
    background: transparent !important;
    box-shadow: none !important;
    transition: transform 0.18s ease;
    align-items: center;
  }
  .tool-card:hover {
    transform: translateY(-2px);
    background: transparent !important;
    box-shadow: none !important;
  }

  .tool-left { margin-right: 0.75rem; }
  .tool-icon { width: 56px; height: 56px; border-radius: 12px; padding: 2px; background-color: transparent !important; border: none !important; }
  .tool-title { font-size: 1rem; margin-bottom: 0.25rem; }
  .tool-desc { margin-bottom: 0.4rem; font-size: 0.85rem; -webkit-line-clamp: 2; }
  .tool-actions { margin-top: 0; }
  .visit-btn { height: 32px; padding: 0 0.9rem; font-size: 0.85rem; }
}

@media (max-width: 640px) {
  .tools {
    padding-top: 2rem;
    padding-bottom: 0px; /* 移除各部分之间的间距 */
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
  
  .tools-inner {
    grid-template-columns: 1fr;
    gap: 0;
    max-width: 100%;
    padding: 0 1rem;
    /* 为列表创建卡片状容器 */
    background-color: #ffffff;
    border-radius: 16px;
    border: 1px solid #e5e7eb;
    overflow: hidden; /* 确保子元素不超出圆角 */
  }
  
  .tool-card {
    padding: 1rem;
    border-radius: 0;
    margin: 0;
    border-bottom: 1px solid #f3f4f6;
    background: #ffffff;
    align-items: center;
  }
  
  .tool-card:last-child {
    border-bottom: none;
  }
  
  .tool-card:hover {
    transform: none;
    box-shadow: none;
    background-color: #fafafa;
  }
  
  .tool-left {
    margin-right: 1rem;
  }
  
  .tool-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px; /* 移动端应用感的平滑圆角 */
    padding: 0;
    background-color: transparent !important;
    border: none !important;
  }

  .tool-right {
    display: grid;
    grid-template-columns: 1fr auto; /* 文本占据空间，操作项自动宽度 */
    grid-template-rows: auto auto;
    width: 100%;
    column-gap: 0.75rem;
    align-items: center;
  }
  
  .tool-title {
    grid-column: 1;
    grid-row: 1;
    font-size: 1rem;
    margin-bottom: 0.15rem;
  }
  
  .tool-desc {
    grid-column: 1;
    grid-row: 2;
    font-size: 0.8rem;
    margin-bottom: 0;
    -webkit-line-clamp: 1; /* 限制描述为 1 行 */
  }
  
  .tool-actions {
    grid-column: 2;
    grid-row: 1 / -1; /* 跨越所有行 */
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
    /* 精致移动风格：靛蓝着色 */
    background-color: #eef2ff;
    color: #4f46e5;
    width: auto;
    border-radius: 99px;
    border: 1px solid rgba(99, 102, 241, 0.15); /* 更清晰的边框 */
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
