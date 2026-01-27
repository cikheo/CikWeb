<template>
  <div class="notfound-container" @mousemove="handleMouseMove">
    <!-- 动态背景装饰 -->
    <div class="background-decor" :style="decorStyle">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div v-for="i in 12" :key="i" class="particle"></div>
    </div>

    <!-- 玻璃卡片主体 -->
    <div class="glass-card" :style="cardStyle">
      <div class="visual-content">
        <h1 class="code-404">404</h1>
        <div class="planet-container">
          <div class="planet">
            <div class="crater crater-1"></div>
            <div class="crater crater-2"></div>
            <div class="crater crater-3"></div>
          </div>
          <div class="ring"></div>
          <div class="satellite"></div>
        </div>
      </div>
      
      <div class="text-content">
        <h2 class="title">哎呀，页面迷失在太空中</h2>
        <p class="description">
          您访问的页面似乎偏离了航道，或者从未存在过。<br>
          请尝试调整坐标，或返回基地。
        </p>

        <div class="actions">
          <el-button type="primary" size="large" round class="action-btn home-btn" @click="goHome">
            <el-icon class="mr-2"><House /></el-icon>
            返回基地
          </el-button>
          <el-button size="large" round class="action-btn back-btn" @click="goBack">
            <el-icon class="mr-2"><ArrowLeft /></el-icon>
            撤回上一级
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 * @Description: 404 页面，包含动态背景、视差效果及返回基地的交互
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { House, ArrowLeft } from '@element-plus/icons-vue';

const router = useRouter();

// 视差效果状态
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  const { innerWidth, innerHeight } = window;
  // 归一化坐标 (-1 到 1)
  mouseX.value = (e.clientX - innerWidth / 2) / (innerWidth / 2);
  mouseY.value = (e.clientY - innerHeight / 2) / (innerHeight / 2);
};

// 背景位移更明显
const decorStyle = computed(() => ({
  transform: `translate(${mouseX.value * -30}px, ${mouseY.value * -30}px)`
}));

// 卡片微动效果
const cardStyle = computed(() => ({
  transform: `
    perspective(1000px)
    rotateY(${mouseX.value * 2}deg)
    rotateX(${-mouseY.value * 2}deg)
    translateZ(0)
  `
}));

const goHome = () => router.push('/');
const goBack = () => router.go(-1);
</script>

<style scoped lang="scss">
.notfound-container {
  min-height: calc(100vh - 80px); /* 视情况调整 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(circle at center, #f8f9fa 0%, #e9ecef 100%);
  color: #2c3e50;
  perspective: 1000px;
}

/* 背景球体 */
.background-decor {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 0;
  pointer-events: none;
  transition: transform 0.1s ease-out;

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.6;
    animation: float 20s infinite ease-in-out;
  }

  .orb-1 {
    width: 400px; height: 400px;
    top: -100px; left: -100px;
    background: linear-gradient(135deg, #a0cfff 0%, #409eff 100%);
  }
  .orb-2 {
    width: 300px; height: 300px;
    bottom: -50px; right: -50px;
    background: linear-gradient(135deg, #b3e19d 0%, #67c23a 100%);
    animation-delay: -5s;
  }
  .orb-3 {
    width: 200px; height: 200px;
    top: 40%; left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #fab6b6 0%, #f56c6c 100%);
    opacity: 0.3;
    animation-delay: -10s;
  }

  /* 随机粒子 */
  .particle {
    position: absolute;
    width: 8px; height: 8px;
    background: rgba(64, 158, 255, 0.2);
    border-radius: 50%;
    @for $i from 1 through 12 {
      &:nth-child(#{$i + 3}) {
        top: random(100) * 1%;
        left: random(100) * 1%;
        animation: float #{10 + random(20)}s infinite ease-in-out -#{random(10)}s;
      }
    }
  }
}

.glass-card {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  max-width: 900px;
  width: 90%;
  
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  border-radius: 32px;
  transition: transform 0.1s ease-out;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 80px;
  }
}

.visual-content {
  position: relative;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 60px;
  }

  .code-404 {
    position: absolute;
    font-size: 140px;
    font-weight: 900;
    color: rgba(64, 158, 255, 0.1);
    z-index: 1;
    user-select: none;
  }

  .planet-container {
    position: relative;
    z-index: 2;
    animation: float 6s infinite ease-in-out;
  }

  .planet {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffffff 0%, #e6efff 100%);
    box-shadow: 
      inset -20px -20px 40px rgba(64, 158, 255, 0.1),
      0 0 30px rgba(64, 158, 255, 0.2);
    position: relative;
    overflow: hidden;

    .crater {
      position: absolute;
      background: rgba(64, 158, 255, 0.05);
      border-radius: 50%;
      box-shadow: inset 2px 2px 4px rgba(0,0,0,0.05);
    }
    .crater-1 { width: 40px; height: 40px; top: 20%; left: 20%; }
    .crater-2 { width: 20px; height: 20px; bottom: 30%; right: 25%; }
    .crater-3 { width: 15px; height: 15px; top: 50%; left: 60%; }
  }

  .ring {
    position: absolute;
    top: 50%; left: 50%;
    width: 260px; height: 60px;
    border: 15px solid rgba(255, 255, 255, 0.4);
    border-top-color: var(--el-color-primary);
    border-right-color: rgba(64, 158, 255, 0.3);
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%) rotate(-30deg);
    filter: drop-shadow(0 0 5px rgba(64, 158, 255, 0.2));
  }

  .satellite {
    position: absolute;
    width: 20px; height: 20px;
    background: #ff7c7c;
    border-radius: 50%;
    top: 0; left: 50%;
    transform-origin: 0 100px;
    animation: orbit 10s linear infinite;
    box-shadow: 0 0 10px rgba(255, 124, 124, 0.5);
  }
}

.text-content {
  flex: 1;
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }

  .title {
    font-size: 32px;
    margin: 0 0 20px;
    color: var(--el-text-color-primary);
    font-weight: 800;
    line-height: 1.2;
    background: linear-gradient(120deg, var(--el-color-primary) 0%, #b886fe 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .description {
    font-size: 16px;
    line-height: 1.8;
    color: var(--el-text-color-regular);
    margin-bottom: 40px;
  }
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  .action-btn {
    min-width: 140px;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(64, 158, 255, 0.3);
    }

    &.secondary-btn:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
  }
  
  .mr-2 {
    margin-right: 8px;
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
}

@media (max-width: 768px) {
  .notfound-container {
    height: auto;
    min-height: 100vh;
    padding: 20px;
  }
  .visual-content .code-404 {
    font-size: 100px;
  }
  .glass-card {
    padding: 40px 20px;
  }
  .actions {
    flex-direction: column;
    .action-btn { width: 100%; }
  }
}
</style>
