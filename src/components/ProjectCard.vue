<template>
  <article class="project-card">
    <div class="media">
      <img v-if="project.image" :src="project.image" alt="project image" loading="lazy" />
    </div>
    <div class="content">
      <h3 class="title">{{ project.title }}</h3>
      
      <!-- Tech Tags -->
      <div v-if="project.tech && project.tech.length" class="tags">
        <span v-for="tag in project.tech" :key="tag" class="tag">{{ tag }}</span>
      </div>
      
      <p class="desc">{{ project.description }}</p>
      <div class="actions link-below-desc">
        <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" class="learn-more-btn">
          <span>进一步了解</span>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" class="link-arrow" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
/*
 * @Description: 项目卡组件，展示项目封面、标题、描述与技术栈标签
 * @Author: CIK
 * @Date: 2026-01-22
 */
import { defineComponent, PropType } from 'vue'

type Project = {
  id: string
  title: string
  description: string
  tech: string[]
  link?: string
  image?: string
}

export default defineComponent({
  name: 'ProjectCard',
  props: { project: { type: Object as PropType<Project>, required: true } }
})
</script>

<style scoped>
.project-card {
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 420px;
  width: 100%;
  max-width: 380px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 10px 20px -5px rgba(0, 0, 0, 0.03);
  position: relative;
}

@media (min-width: 640px) {
  .project-card:hover {
    transform: translateY(-10px);
    box-shadow: 
      0 20px 40px -12px rgba(0, 0, 0, 0.12),
      0 10px 20px -8px rgba(0, 0, 0, 0.05);
    border-color: rgba(79, 70, 229, 0.2);
  }
}

.media {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  background: #f8fafc;
}

.media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.03));
  pointer-events: none;
}

.media img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@media (min-width: 640px) {
  .project-card:hover .media img {
    transform: scale(1.08);
  }
}

.content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
}

.title {
  margin: 0 0 0.85rem 0;
  font-size: 1.35rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.02em;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.75rem;
  background-color: #f3f4f6;
  color: #4b5563;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.25s;
  border: 1px solid transparent;
}

@media (min-width: 640px) {
  .project-card:hover .tag {
    background-color: #eef2ff;
    color: #4f46e5;
    border-color: rgba(79, 70, 229, 0.1);
  }
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

.actions {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-start;
}

.learn-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
}

.learn-more-btn::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #4f46e5;
  transition: width 0.3s ease;
  border-radius: 2px;
}

.learn-more-btn:hover {
  color: #4338ca;
}

.learn-more-btn:hover::after {
  width: 100%;
}

.link-arrow {
  width: 1.2em;
  height: 1.2em;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.learn-more-btn:hover .link-arrow {
  transform: translateX(4px);
}

@media (max-width: 1024px) {
  .project-card { min-height: 400px; }
  .content { padding: 1.25rem; }
}
</style>
