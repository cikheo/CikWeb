<template>
  <AppHero />

  <FeaturedCarousel />

  <ProjectShowcase :item="showcase1" :right-large="true" :hoverable="true" :reverse="true" />

  <ToolsSection />

  <MediaSection />

  <ProjectShowcase :item="showcase2" :reverse="showcase2.reverse" :hoverable="true" variant="purple" />

  <LatestPosts />

  <LinksSection />
</template>

<script lang="ts">
/*
 * @Description: 首页，组合 Hero、Carousel、ProjectShowcase 等核心业务板块
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent } from 'vue'
import AppHero from '@/components/Hero.vue'
import FeaturedCarousel from '@/components/FeaturedCarousel.vue'
import ProjectShowcase from '@/components/ProjectShowcase.vue'
import ToolsSection from '@/components/ToolsSection.vue'
import LinksSection from '@/components/LinksSection.vue'
import MediaSection from '@/components/MediaSection.vue'
import LatestPosts from '@/components/LatestPosts.vue'
import { showcase1, showcase2 } from '@/data/showcase'

export default defineComponent({
  name: 'HomeView',
  components: { AppHero, FeaturedCarousel, ProjectShowcase, ToolsSection, LinksSection, MediaSection, LatestPosts },
  setup() {
    return { showcase1, showcase2 }
  }
})
</script>

<style scoped>
/* 仅保留少量的页面级样式，以避免与组件的 scoped 样式冲突 */
.grid { display: grid; grid-template-columns: repeat(3, 380px); gap: 0.75rem; justify-content: center; }

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 360px); }
}

@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; gap: 0.5rem; }
}
</style>
