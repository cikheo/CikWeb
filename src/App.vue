<template>
  <div id="app">
    <HeaderNav />
    <main>
      <router-view />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>

<script lang="ts">
/*
 * @Description: 根组件，渲染应用布局（导航、路由视图、页脚及返回顶部）
 * @Author: CIK
 * @Date: 2026-01-22
 */
import { defineComponent } from 'vue'
import HeaderNav from '@/components/HeaderNav.vue'
import SiteFooter from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'

export default defineComponent({ 
  name: 'App', 
  components: { HeaderNav, SiteFooter, BackToTop }
})
</script>

<style>
:root { --card-bg: #fff; }
main { min-height: calc(100vh - 120px); display:flex; flex-direction:column; }
</style>
