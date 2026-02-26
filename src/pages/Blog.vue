<template>
  <section class="blog-page">
    <div class="blog-header">
       <img src="@/assets/img/wzbj-cik-cover.webp" alt="Blog Banner" />
       <div class="header-content">
         <div class="header-text">
           <h1>最新订阅文章</h1>
           <p>来自我的博客动态</p>
         </div>
         <a href="https://blog.cikcc.com/rss.xml" target="_blank" class="visit-btn">获取更多订阅 →</a>
       </div>
    </div>
    <BlogList />
  </section>
</template>

<script lang="ts">
/*
 * @Description: 博客页面，展示文章列表组件
 * @Author: CIK
 * @Date: 2026-01-22
 */
import { defineComponent } from 'vue'
import BlogList from '@/components/BlogList.vue'

export default defineComponent({ name: 'BlogView', components: { BlogList } })
</script>

<style scoped>
.blog-page {
  padding: 140px 20px 40px;
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
}

.blog-header {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.blog-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-header:hover img {
  transform: scale(1.05);
}

.header-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.visit-btn {
  padding: 8px 24px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  color: #fff;
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.visit-btn:hover {
  background-color: #fff;
  color: #333;
  border-color: #fff;
  transform: translateY(-2px);
}

.header-content h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.header-content p {
  margin: 10px 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

@media (max-width: 640px) {
  .blog-header { height: 200px; }
  .header-content h1 { font-size: 1.8rem; }
}
</style>
