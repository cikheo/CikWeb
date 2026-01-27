<template>
  <div class="sponsor-page">
    <div class="sponsor-container">
      <!-- 头部区域 -->
      <header class="sponsor-header">
        <h1 class="main-title">用爱发电 <span class="heart">❤️</span></h1>
        <p class="sub-title">
          如果您觉得我的文章或项目对您有帮助，欢迎赞助支持。<br>
          您的每一份支持都是我持续创作和维护开源项目的动力。<br>
          <span class="highlight-tip">如需下方的席位展示权益，请在赞助留言备注博客地址。赞助每5元计算为一个月。</span>
        </p>
        
        <!-- 核心赞助按钮区域 -->
        <div class="action-area">
          <div class="cta-button-wrapper">
             <button class="sponsor-btn" @click="openSponsorModal">
               <span class="btn-icon">☕️</span>
               <span class="btn-text">请作者喝一杯咖啡</span>
               <div class="shine-effect"></div>
             </button>
             <div class="btn-shadow"></div>
          </div>
        </div>
      </header>

      <!-- 席位展示权益 -->
      <div class="benefits-section">
        <h2 class="section-title">席位展示权益</h2>
        <div class="benefits-grid">
           <div class="benefit-item">
             <div class="benefit-icon">📜</div>
             <div class="benefit-content">
               <h4>打赏名单展示</h4>
               <p>博客关于界面展示打赏名单</p>
             </div>
           </div>
           <div class="benefit-item">
             <div class="benefit-icon">⚡</div>
             <div class="benefit-content">
               <h4>友链席位</h4>
               <p>支持期间享受博客友情链接页面“正在发电”分类席位</p>
             </div>
           </div>
           <div class="benefit-item">
             <div class="benefit-icon">🏠</div>
             <div class="benefit-content">
               <h4>主页席位</h4>
               <p>支持期间享受主页页面“正在发电”分类席位</p>
             </div>
           </div>
           <div class="benefit-item">
             <div class="benefit-icon">🤝</div>
             <div class="benefit-content">
               <h4>赞助页分组展示</h4>
               <p>支持期间个人主页的赞助页面名单展示</p>
             </div>
           </div>
        </div>
      </div>

      <!-- 赞助列表 -->
      <div class="sponsors-list-section">
        <h2 class="section-title">✨ 赞助名单 ✨</h2>
        <p class="section-subtitle">（按时间倒序排列）</p>
        <div class="sponsors-container-box">
          <el-table :data="sponsorList" style="width: 100%" :show-header="true">
            <el-table-column prop="name" label="昵称">
              <template #default="scope">
                <span class="sponsor-name">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额" align="center">
              <template #default="scope">
                <span class="sponsor-amount">¥ {{ scope.row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="时间" align="right" width="180">
              <template #default="scope">
                <span class="sponsor-date">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
          </el-table>
          
          <div v-if="sponsorList.length === 0" class="empty-tip">
             <div class="empty-text">虚位以待，期待您的名字出现在这里~</div>
          </div>
        </div>
      </div>
      
      <!-- 免责声明 (Disclaimer) -->
    </div>

    <!-- 统一支付弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="选择赞助方式"
      width="400px"
      align-center
      class="sponsor-dialog"
      :show-close="true"
    >
      <div class="dialog-content">
        <el-tabs v-model="activeTab" class="sponsor-tabs" stretch>
          <!-- 微信标签 -->
          <el-tab-pane name="wechat">
            <template #label>
              <span class="tab-label"><i class="dot wechat"></i>微信</span>
            </template>
            <div class="qr-panel">
               <div class="qr-code-box wechat">
                 <!-- 占位符：微信二维码图片 -->
                 <img src="@/assets/img/wechat-pay.png" alt="WeChat Pay" />
                 <div class="placeholder-text">微信收款码</div>
               </div>
               <p class="scan-hint highlight-wechat">打开微信 [扫一扫]</p>
            </div>
          </el-tab-pane>

          <!-- 支付宝标签 -->
          <el-tab-pane name="alipay">
            <template #label>
               <span class="tab-label"><i class="dot alipay"></i>支付宝</span>
            </template>
            <div class="qr-panel">
               <div class="qr-code-box alipay">
                 <!-- 占位符：支付宝二维码图片 -->
                 <img src="@/assets/img/alipay-pay.webp" alt="Alipay" />
                 <div class="placeholder-text">支付宝收款码</div>
               </div>
               <p class="scan-hint highlight-alipay">打开支付宝 [扫一扫]</p>
            </div>
          </el-tab-pane>
        </el-tabs>
        
        <p class="dialog-thanks">感谢您的支持 ❤️</p>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
/*
 * @Description: 赞助支持页面，展示赞助权益、赞助名单及支付弹窗
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent, ref } from 'vue'
import { sponsorList } from '@/data/sponsors'

export default defineComponent({
  name: 'SponsorPage',
  setup() {
    const dialogVisible = ref(false)
    const activeTab = ref('wechat')

    const openSponsorModal = () => {
      dialogVisible.value = true
    }

    return {
      dialogVisible,
      activeTab,
      openSponsorModal,
      sponsorList
    }
  }
})
</script>

<style lang="scss" scoped>
.sponsor-page {
  min-height: 80vh;
  padding: 4rem 1rem;
  /* 加深背景色，使用更明显的暖粉色渐变 */
  background: linear-gradient(180deg, #ffe6e9 0%, #fff 100%);
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  /* 背景装饰光晕 - 加深透明度确保可见 */
  &::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255, 182, 193, 0.4) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 5%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255, 228, 196, 0.5) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
  }
}

.sponsor-container {
  max-width: 900px; /* 略微收窄以获得更好的视觉聚焦效果 */
  width: 100%;
  position: relative;
  z-index: 1;
}

.sponsor-header {
  text-align: center;
  margin-bottom: 5rem;
  padding-top: 2rem;

  .main-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 1rem;
    
    .heart {
      color: #ff4757;
      display: inline-block;
      animation: heartbeat 1.5s infinite;
    }
  }

  .sub-title {
    font-size: 1.1rem;
    color: #666;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 3rem;

    .highlight-tip {
      color: #ff4757;
      font-weight: 600;
      display: inline-block;
      margin-top: 0.5rem;
    }
  }
}

/* 核心行动区域 */
.action-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.cta-button-wrapper {
  position: relative;
  z-index: 1;

  .sponsor-btn {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%); 
    background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); /* 暖色调样式 */
    border: none;
    padding: 1rem 3rem;
    border-radius: 50px;
    color: white;
    font-size: 1.25rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(255, 107, 107, 0.5);
      
      .btn-icon {
        transform: rotate(15deg) scale(1.1);
      }
    }

    &:active {
      transform: translateY(1px);
    }
    
    .btn-icon {
       font-size: 1.4rem;
       transition: transform 0.3s;
    }
    
    /* 流光特效 */
    .shine-effect {
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
      transform: skewX(-25deg);
      animation: shine 4s infinite;
    }
  }
}

.supported-methods {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #999;
  font-size: 0.9rem;
  
  .method {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  
  .divider { opacity: 0.3; }
  
  .mini-icon {
    vertical-align: text-bottom;
  }
}

.benefits-section {
  text-align: center;
  margin-bottom: 4rem;

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #333;
    font-weight: 600;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem 3rem;
    padding: 0 1rem;
    
    .benefit-item {
      display: flex;
      align-items: flex-start;
      text-align: left;
      padding: 0.5rem;
      transition: transform 0.3s;
      
      .benefit-icon {
        flex-shrink: 0;
        width: 48px;
        height: 48px;
        margin-right: 1rem;
        border-radius: 12px;
        background: #fff;
        color: #ff4757;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
      }
      
      .benefit-content {
         flex: 1;
         
         h4 {
           margin: 0 0 0.4rem;
           font-size: 1.1rem;
           color: #333;
           font-weight: 600;
         }
         
         p {
           font-size: 0.9rem;
           color: #666;
           line-height: 1.5;
           margin: 0;
         }
      }
    }
  }
}

.sponsors-list-section {
  max-width: 800px;
  margin: 0 auto 4rem;
  
  .section-title {
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 600;
  }
  
  .section-subtitle {
     text-align: center;
     color: #999;
     font-size: 0.9rem;
     margin-bottom: 2rem;
  }

  .sponsors-container-box {
    background: #fff;
    padding: 1rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    overflow: hidden;

    :deep(.el-table) {
      --el-table-border-color: transparent;
      --el-table-header-bg-color: #fcfcfc;
      --el-table-row-hover-bg-color: #f9fafb;
      
      th.el-table__cell {
        font-weight: 600;
        color: #666;
        background-color: #fff;
        border-bottom: 2px solid #f0f0f0;
      }
      
      td.el-table__cell {
        border-bottom: 1px solid #f7f7f7;
        padding: 16px 0;
      }
    }
    
    .sponsor-name {
      font-weight: 500;
      color: #333;
    }
    
    .sponsor-amount {
       color: #ff6b6b;
       font-weight: 600;
       font-family: 'DIN Alternate', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    
    .sponsor-date {
       color: #999;
       font-size: 0.9rem;
    }

    .empty-tip {
      text-align: center;
      padding: 3rem 1rem;
      color: #999;
      font-size: 0.9rem;
    }
  }
}


.sponsor-footer {
  text-align: center;
  color: #aeb5bc;
  font-size: 0.85rem;
  padding: 0 1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

/* 弹窗样式 */
.sponsor-dialog {
  border-radius: 16px;
  overflow: hidden;
  
  :deep(.el-dialog__header) {
    text-align: center;
    font-weight: 600;
    margin-right: 0;
    padding-top: 1.5rem;
  }
}

.dialog-content {
  padding: 0 0.5rem 1rem;
  text-align: center;
}

.sponsor-tabs {
  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
    background-color: #f0f0f0;
  }
  
  :deep(.el-tabs__item) {
    font-size: 1rem;
    height: 50px;
    line-height: 50px;
  }
  
  .tab-label {
    display: flex;
    align-items: center;
    gap: 6px;
    
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      
      &.wechat { background: #07C160; }
      &.alipay { background: #1678FF; }
    }
  }
}

.qr-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 0 0.5rem;

  .qr-code-box {
    width: 220px;
    height: 220px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center; /* 居中显示占位文字 */
    margin-bottom: 1rem;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      z-index: 2;
      position: relative;
    }

    /* 背景色区分 */
    &.wechat { background: #f0f9eb; }
    &.alipay { background: #ecf5ff; }
    
    .placeholder-text {
      position: absolute;
      z-index: 1;
      font-weight: 500;
      color: #909399;
    }
  }

  .scan-hint {
    font-size: 1rem;
    font-weight: 500;
    &.highlight-wechat { color: #07C160; }
    &.highlight-alipay { color: #1678FF; }
  }
}

.dialog-thanks {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #999;
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}

@keyframes shine {
  0% { left: -100%; opacity: 0; }
  20% { opacity: 0.5; }
  40% { left: 100%; opacity: 0; }
  100% { left: 100%; opacity: 0; }
}

@media (max-width: 768px) {
  .sponsor-page {
    padding: 2rem 1rem;
  }
  
  .sponsor-header .main-title {
    font-size: 2rem;
  }
  
  /* 移动端调整按钮大小 */
  .cta-button-wrapper .sponsor-btn {
     padding: 0.9rem 2rem;
     font-size: 1.1rem;
  }
}
</style>

