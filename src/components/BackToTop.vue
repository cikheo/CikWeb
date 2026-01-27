<template>
  <Transition name="fade">
    <button 
      v-show="visible" 
      class="back-to-top" 
      aria-label="Back to Top"
      @click="scrollTop"
    >
      <svg 
        viewBox="0 0 24 24" 
        width="24" 
        height="24" 
        stroke="currentColor" 
        stroke-width="2" 
        fill="none" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'BackToTop',
  setup() {
    const visible = ref(false)
    
    function onScroll() {
      // 增加防抖或直接判断，这里保持简单，阈值调整为300
      visible.value = window.scrollY > 300
    }
    
    function scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    onMounted(() => {
      window.addEventListener('scroll', onScroll, { passive: true })
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', onScroll)
    })
    
    return { visible, scrollTop }
  }
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  color: #333;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
}

.back-to-top:hover {
  background-color: #333;
  color: #fff;
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border-color: #333;
}

.back-to-top:active {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.back-to-top svg {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
}

.back-to-top:hover svg {
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .back-to-top {
    display: none;
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
