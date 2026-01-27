<script setup lang="ts">
/*
 * @Description: 微信公众号页面，引导用户关注 CikHeo 并展示订阅福利
 * @Author: CIK
 * @Date: 2026-01-26
 */
const benefits = [
  {
    icon: '🚀',
    title: '前沿技术资讯',
    desc: '第一时间推送最新的技术文章、行业动态与深度解析，助你紧跟技术潮流。'
  },
  {
    icon: '💡',
    title: '实战开发干货',
    desc: '精选高质量的项目实战教程、源码剖析与避坑指南，提升你的编码实力。'
  },
  {
    icon: '🎁',
    title: '粉丝专属福利',
    desc: '不定期发放技术书籍、开发工具会员、学习资料等粉丝专属福利。'
  }
]
</script>

<template>
  <div class="wechat-page">
    <!-- 背景装饰 -->
    <div class="bg-decor bg-decor-1"></div>
    <div class="bg-decor bg-decor-2"></div>

    <div class="container">
      <div class="content-wrapper">
        <!-- 左侧：文本介绍区域 -->
        <div class="intro-section">
          <div class="header-group">
            <div class="badge">微信公众号</div>
            <h1 class="main-title">
              关注 <span class="brand-text">CikHeo</span>
            </h1>
            <p class="sub-title">获取前沿技术资讯 · 探索开发新视野</p>
          </div>
          
          <div class="benefits-list">
            <div 
              v-for="(item, index) in benefits" 
              :key="index" 
              class="benefit-item"
              :style="{ animationDelay: `${index * 0.15 + 0.3}s` }"
            >
              <div class="icon-box">{{ item.icon }}</div>
              <div class="text-box">
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：二维码卡片区域 -->
        <div class="qr-section">
          <div class="qr-card glass-effect">
            <div class="card-header">
              <div class="wechat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.6 15.6C8.6 15.6 15 15.6 15 15.6C16.6569 15.6 18 14.2569 18 12.6C18 10.9431 16.6569 9.6 15 9.6C13.3431 9.6 12 10.9431 12 12.6V15.6H8.6ZM8.6 15.6C6.94315 15.6 5.6 14.2569 5.6 12.6C5.6 10.9431 6.94315 9.6 8.6 9.6C10.2569 9.6 11.6 10.9431 11.6 12.6M17.4 8.4C19.0569 8.4 20.4 7.05685 20.4 5.4C20.4 3.74315 19.0569 2.4 17.4 2.4C15.7431 2.4 14.4 3.74315 14.4 5.4V8.4H17.4ZM17.4 8.4C17.4 8.4 11 8.4 11 8.4C9.34315 8.4 8 7.05685 8 5.4C8 3.74315 9.34315 2.4 11 2.4C12.6569 2.4 14 3.74315 14 5.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span>微信公众号</span>
            </div>
            
            <div class="qr-content">
              <div class="qr-image-wrapper">
                <img src="@/assets/img/cikccom.jpg" alt="CikHeo 公众号二维码" class="qr-img" />
                <div class="scan-animation"></div>
              </div>
              <div class="qr-tip">扫码关注不迷路</div>
            </div>

            <div class="card-footer">
              <div class="method">
                <span class="label">ID搜索</span>
                <span class="value copy-text">CikHeo</span>
              </div>
            </div>
          </div>
          
          <!-- 装饰元素 -->
          <div class="floating-bubble bubble-1"></div>
          <div class="floating-bubble bubble-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --wechat-green: #07C160;
  --wechat-green-dark: #06ad56;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --bg-gradient: linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%);
}

.wechat-page {
  position: relative;
  min-height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--bg-gradient);
  padding: 60px 20px;
  overflow: hidden;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* 背景装饰 */
.bg-decor {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 1;
  opacity: 0.6;
}
.bg-decor-1 {
  width: 400px;
  height: 400px;
  background: rgba(7, 193, 96, 0.15);
  top: -100px;
  left: -100px;
}
.bg-decor-2 {
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.1); /* 蓝色点缀 */
  bottom: -50px;
  right: -50px;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 80px;

  @media (max-width: 960px) {
    flex-direction: column;
    gap: 50px;
    text-align: center;
  }
}

/* 左侧区域 */
.intro-section {
  flex: 1;
  min-width: 300px;
  animation: slideUpFade 0.8s ease-out;
}

.badge {
  display: inline-block;
  background: rgba(7, 193, 96, 0.1);
  color: #07C160;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.main-title {
  font-size: 3.5rem;
  line-height: 1.2;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 15px 0;
  
  .brand-text {
    background: linear-gradient(120deg, #07C160 0%, #059669 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
}

.sub-title {
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 40px;
  font-weight: 400;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  animation: slideInRight 0.6s ease-out backwards;
  
  @media (max-width: 960px) {
    justify-content: center;
    text-align: left;
  }

  .icon-box {
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;
    transition: transform 0.3s ease;
  }

  &:hover .icon-box {
    transform: scale(1.1) rotate(5deg);
  }

  .text-box {
    h3 {
      font-size: 1.1rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 5px 0;
    }
    p {
      font-size: 0.95rem;
      color: #666;
      line-height: 1.5;
      margin: 0;
    }
  }
}

/* 右侧二维码区域 */
.qr-section {
  position: relative;
  flex: 0 0 380px;
  animation: floatCard 1s ease-out;

  @media (max-width: 480px) {
    flex: 0 0 100%;
    width: 100%;
  }
}

.qr-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 30px;
  padding: 30px;
  box-shadow: 
    0 20px 40px -10px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(7, 193, 96, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 30px 60px -12px rgba(7, 193, 96, 0.15),
      0 0 0 1px rgba(7, 193, 96, 0.2);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;

  .wechat-icon {
    width: 24px;
    height: 24px;
    color: #07C160;
  }
}

.qr-image-wrapper {
  position: relative;
  width: 240px;
  height: 240px;
  margin: 0 auto 20px;
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);

  .qr-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .scan-animation {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #07C160, transparent);
    animation: scan 2.5s infinite linear;
    border-radius: 50%;
    box-shadow: 0 0 4px #07C160;
  }
}

.qr-tip {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 25px;
}

.card-footer {
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
  padding-top: 20px;
  
  .method {
    display: inline-flex;
    align-items: center;
    background: #f5f7fa;
    padding: 8px 20px;
    border-radius: 50px;
    
    .label {
      color: #666;
      font-size: 0.9rem;
      margin-right: 10px;
    }
    
    .value {
      color: #333;
      font-weight: 700;
      font-size: 1rem;
      user-select: all;
    }
  }
}

/* 浮动气泡 */
.floating-bubble {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
}
.bubble-1 {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #07C160 0%, #34d399 100%);
  top: -20px;
  right: -20px;
  opacity: 0.2;
  animation: float 6s ease-in-out infinite;
}
.bubble-2 {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  bottom: 20px;
  left: -10px;
  opacity: 0.15;
  animation: float 5s ease-in-out infinite reverse;
}

/* 动画定义 */
@keyframes scan {
  0% { top: 10px; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: calc(100% - 10px); opacity: 0; }
}

@keyframes slideUpFade {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes floatCard {
  from { opacity: 0; transform: scale(0.95) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style>
