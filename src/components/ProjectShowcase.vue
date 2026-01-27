<template>
  <section class="showcase" :class="'showcase-' + variant">
    <div class="showcase-inner">
      <div v-if="!reverse" class="showcase-left">
        <div class="showcase-tag btn">{{ item.tag || '' }}</div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        
        <!-- Tech Stack Tags -->
        <div v-if="item.stack && item.stack.length" class="stack-list">
          <span v-for="(tech, index) in item.stack" :key="index" class="stack-item">{{ tech }}</span>
        </div>

        <div class="cta-group">
          <a v-if="item.ctaText && item.ctaText !== '*'" :href="item.ctaLink || item.link" target="_blank" rel="noopener" class="cta-btn" :aria-label="item.ctaText">{{ item.ctaText }}</a>
          <a v-if="item.secondaryCta && item.secondaryCta !== '*'" :href="item.secondaryLink || item.link" target="_blank" rel="noopener" class="cta-btn secondary" :aria-label="item.secondaryCta">{{ item.secondaryCta }}</a>
          <a v-if="item.tertiaryCta && item.tertiaryCta !== '*'" :href="item.tertiaryLink || item.link" target="_blank" rel="noopener" class="cta-btn secondary" :aria-label="item.tertiaryCta">{{ item.tertiaryCta }}</a>
        </div>
      </div>

      <div class="showcase-right">
        <div class="image-frame" :class="{ compact: rightCompact, hoverable: hoverable, 'right-large': rightLarge }" :tabindex="hoverable ? 0 : null">
          <div class="window-controls" aria-hidden="false">
            <div class="control-left">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="control-right">
              <input :value="item.link" class="url-input" aria-label="展示链接" readonly />
            </div>
          </div>
          <div class="image-inner">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </div>
        </div>
      </div>

      <div v-if="reverse" class="showcase-left">
        <div class="showcase-tag btn">{{ item.tag || '' }}</div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        
        <!-- Tech Stack Tags -->
        <div v-if="item.stack && item.stack.length" class="stack-list">
          <span v-for="(tech, index) in item.stack" :key="index" class="stack-item">{{ tech }}</span>
        </div>

        <div class="cta-group">
          <a v-if="item.ctaText && item.ctaText !== '*'" :href="item.ctaLink || item.link" target="_blank" rel="noopener" class="cta-btn" :aria-label="item.ctaText">{{ item.ctaText }}</a>
          <a v-if="item.secondaryCta && item.secondaryCta !== '*'" :href="item.secondaryLink || item.link" target="_blank" rel="noopener" class="cta-btn secondary" :aria-label="item.secondaryCta">{{ item.secondaryCta }}</a>
          <a v-if="item.tertiaryCta && item.tertiaryCta !== '*'" :href="item.tertiaryLink || item.link" target="_blank" rel="noopener" class="cta-btn secondary" :aria-label="item.tertiaryCta">{{ item.tertiaryCta }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
/*
 * @Description: 项目详细展示组件，支持多种布局变体（蓝色/紫色）与左右反转
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectShowcase',
  props: {
    item: { type: Object as () => Record<string, unknown>, required: true },
    reverse: { type: Boolean, default: false },
    hoverable: { type: Boolean, default: false },
    rightCompact: { type: Boolean, default: false },
    rightLarge: { type: Boolean, default: false },
    variant: { type: String, default: 'blue' }
  }
})
</script>

<style scoped>
.showcase {
  margin: 1rem;
  border-radius: 26px;
  padding: 2.5rem 1rem;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* Default background setup */
  background-color: #ffffff;
  background-size: 20px 20px, 100% 100%;
}

@media (max-width: 640px) {
  .showcase { margin: 1rem; padding: 2rem 1rem; }
}

.showcase::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
}

/* 变体: 蓝色 (新流行 / 天空风格) - 参考设计 (匹配紫色结构) */
.showcase.showcase-blue {
  background-color: #f0f9ff; /* Very slight cool sky tint */
  
  /* Solid pastel border */
  border: 2px solid rgba(56, 189, 248, 0.3); /* Sky-400 equivalent */
  background-clip: border-box;
  border-radius: 24px;
  
  margin: 1rem;
  padding: 4rem 2.5rem;
  
  /* Solid hard offset shadow - Sky Theme */
  box-shadow: 
    10px 10px 0 #e0f2fe, /* Solid light sky shadow (sky-100) */
    0 0 0 1px rgba(0,0,0,0.01); 
  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
}

.showcase.showcase-blue .showcase-inner {
  align-items: center; 
  gap: 6rem;
  max-width: 1400px; 
}

@media (max-width: 768px) {
  .showcase.showcase-blue {
    margin: 1rem;
    padding: 3rem 1.5rem;
    border-radius: 24px;
  }
}

.showcase.showcase-blue:hover {
  transform: translate(-3px, -3px);
  box-shadow: 
    13px 13px 0 #bae6fd, /* slightly darker sky shadow (sky-200) */
    16px 16px 24px rgba(14, 165, 233, 0.08); /* Soft diffuse shadow added for float */
}

/* 艺术化水彩晕染效果 - 蓝色版本 */
.showcase.showcase-blue::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: 
    linear-gradient(135deg, transparent 50%, rgba(224, 242, 254, 0.6) 100%), /* Sky wash */
    radial-gradient(circle at 0% 100%, rgba(99, 102, 241, 0.08) 0%, transparent 40%); /* Subtle indigo accent */
  filter: blur(30px);
  opacity: 1;
  pointer-events: none;
  z-index: 0;
}

.showcase.showcase-blue::after {
  content: none;
}

@keyframes blob-float {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(20px, 40px) rotate(10deg); }
}

/* 变体: 紫色 (新流行 / 薰衣草风格) */
.showcase.showcase-purple {
  background-color: #fdfcff; /* Very slight warm lavender tint */
  
  /* Solid pastel border */
  border: 2px solid rgba(167, 139, 250, 0.3); /* Violet-400 equivalent */
  background-clip: border-box;
  border-radius: 20px;
  
  /* Solid hard offset shadow - Lavender Theme */
  box-shadow: 
    10px 10px 0 #f3e8ff, /* Solid light purple shadow (purple-100) */
    0 0 0 1px rgba(0,0,0,0.01); 
  
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.showcase.showcase-purple:hover {
  transform: translate(-3px, -3px);
  box-shadow: 
    13px 13px 0 #e9d5ff, /* slightly darker/richer purple shadow (purple-200) */
    16px 16px 24px rgba(107, 33, 168, 0.08); /* Soft diffuse shadow added for float */
}

/* 艺术化水彩晕染效果 */
.showcase.showcase-purple::before {
  background: 
    linear-gradient(135deg, transparent 50%, rgba(233, 213, 255, 0.4) 100%), /* Purple wash */
    radial-gradient(circle at 0% 100%, rgba(244, 114, 182, 0.05) 0%, transparent 30%); /* Subtle pink accent */
  filter: blur(20px);
  opacity: 1;
}

/* 颗粒纹理 */
.showcase.showcase-purple::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.15; 
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: multiply;
  z-index: 0;
}

.showcase-inner {
  max-width: var(--content-width);
  width: 100%;
  display: flex;
  gap: 2.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}
.showcase-left { flex: 1; display: flex; flex-direction: column; align-items: flex-start; }

/* Showcase Text Styles */
.showcase-left h3 { margin: 0 0 0.75rem 0; font-size: 2.2rem; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; line-height: 1.1; }

/* Refined tag */
.showcase-tag { margin-bottom: 1rem; }
.btn {
  background-color: #f1f5f9;
  color: #475569;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0 1.25rem;
  height: 32px;
  width: auto;
  border: 1px solid transparent;
  outline: none;
  border-radius: 99px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.showcase-left p { margin: 0 0 1.5rem 0; color: #475569; font-size: 1.125rem; line-height: 1.6; max-width: 90%; }

.cta-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* 行动按钮 */
.cta-btn { 
  display: inline-flex; align-items: center; justify-content: center; 
  min-width: 140px; height: 50px; padding: 0 1.5rem; 
  background-color: #0f172a; 
  background-image: none; /* 移除默认渐变 */
  color: #ffffff; 
  border: 2px solid transparent; 
  border-radius: 99px; 
  text-decoration: none; 
  cursor: pointer; 
  font-weight: 600; font-size: 1rem;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.cta-btn:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 20px -6px rgba(15, 23, 42, 0.3);
  background-color: #1e293b;
}

.cta-btn:active { transform: translateY(0); }
.cta-btn.secondary { 
  background-color: transparent; 
  color: #0f172a; 
  border: 2px solid #e2e8f0; 
}
.cta-btn.secondary:hover { 
  border-color: #cbd5e1; 
  background-color: #f8fafc;
  box-shadow: none;
}
/* 紫色变体的按钮/标签覆盖 */
.showcase.showcase-purple .btn {
  background-color: #f3e8ff; /* lavender */
  color: #7e22ce; /* deep purple */
}
/* 紫色变体整体按钮尺寸缩小 */
.showcase.showcase-purple .cta-btn {
  min-width: 100px;
  height: 38px;
  padding: 0 1.25rem;
  font-size: 0.9rem;
}

.showcase.showcase-purple .cta-btn:not(.secondary) {
  background-color: #8b5cf6; /* violet-500 */
  box-shadow: 0 4px 10px 0 rgba(139, 92, 246, 0.4);
}
.showcase.showcase-purple .cta-btn:not(.secondary):hover {
  background-color: #7c3aed; /* violet-600 */
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.23);
}

.showcase.showcase-blue .image-frame {
  /* Browser Window Style from Image */
  border-radius: 12px;
  background: white !important;
  backdrop-filter: none;
  padding: 0; /* Header is part of structure */
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.2); /* Deep shadow */
  border: 1px solid rgba(0,0,0,0.06); 
  overflow: hidden; 
  
  --ps-image-width: 900px;
  --ps-image-height: auto; 
  display: flex; 
  flex-direction: column;
}

.showcase.showcase-blue .window-controls {
  position: relative;
  background: white; 
  height: 54px; /* Taller header */
  width: 100%;
  top: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: none;
}

.showcase.showcase-blue .control-left {
  gap: 8px;
}
.showcase.showcase-blue .dot {
  width: 11px; height: 11px;
}

.showcase.showcase-blue .url-input {
  /* Address bar */
  background: #f1f5f9;
  height: 32px;
  border: none;
  border-radius: 8px;
  text-align: center;
  padding-left: 0;
  font-size: 16px;
  color: #64748b;
  box-shadow: none;
  margin: 0 20px; 
  flex: 1;
}

.showcase.showcase-blue .image-inner {
  margin-top: 0;
  border-radius: 0;
  height: 520px; 
  background: white;
}

.showcase.showcase-blue .image-inner img {
  object-fit: contain;
  object-position: top center;
  background-color: #f8fafc;
}

/* 匹配参考图的排版 - 优化间距更紧凑 */
.showcase.showcase-blue .btn.showcase-tag {
  background-color: #e0f2fe !important;
  color: #0369a1 !important;
  font-weight: 800;
  font-size: 0.85rem;
  border: 1px solid #bae6fd;
  border-radius: 9999px; /* Capsule shape */
  box-shadow: none;
  margin-bottom: 1rem; /* 从2rem减少到1rem */
  padding: 0 1.25rem;
  height: 32px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.showcase.showcase-blue h3 {
  font-size: 3.5rem; 
  font-weight: 900; 
  color: #0c4a6e; 
  letter-spacing: -0.03em;
  margin-bottom: 1rem; /* 从2rem减少到1rem */
  line-height: 1.1;
  text-shadow: none; /* No shadow as requested */
  background: linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.showcase.showcase-blue p {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #334155; 
  font-weight: 500;
  margin-bottom: 1.5rem; /* 从3rem减少到1.5rem */
  max-width: 90%;
}

/* 技术栈胶囊标签 */
.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem; /* 从3rem减少到1.5rem */
}
.stack-item {
  background-color: #ffffff;
  color: #0284c7; 
  font-size: 0.875rem;
  font-weight: 700;
  padding: 0.5rem 1rem;
  border-radius: 9999px; /* Capsule shape */
  border: 1px solid #e0f2fe;
  transition: all 0.2s ease;
}
.stack-item:hover {
  background-color: #f0f9ff;
  border-color: #bae6fd;
  color: #0284c7;
  transform: translateY(-2px);
  box-shadow: none; /* Removed hard shadow */
}

/* Buttons */
.showcase.showcase-blue .cta-group {
  display: flex;
  flex-wrap: nowrap; /* Force single line */
  gap: 1rem;
  overflow-x: auto; /* Handle overflow if needed */
  padding-bottom: 8px; /* Extra space */
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  align-items: center;
}
.showcase.showcase-blue .cta-group::-webkit-scrollbar {
  display: none; 
}

.showcase.showcase-blue .cta-btn {
  height: 52px;
  padding: 0 2rem;
  font-size: 1rem;
  border-radius: 9999px; /* Capsule shape */
  font-weight: 700;
  min-width: auto;
  white-space: nowrap;
  letter-spacing: 0.02em;
}

.showcase.showcase-blue .cta-btn:not(.secondary) {
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25); /* Subtle smooth shadow */
  color: white;
  border: none;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.showcase.showcase-blue .cta-btn:not(.secondary):hover {
  background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(2, 132, 199, 0.35);
}
.showcase.showcase-blue .cta-btn:not(.secondary):active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(2, 132, 199, 0.2);
}

.showcase.showcase-blue .cta-btn.secondary {
  background: #fff;
  border: 1px solid #cbd5e1; 
  color: #475569; 
  box-shadow: none;
}
.showcase.showcase-blue .cta-btn.secondary:hover {
  background: #f8fafc;
  border-color: #94a3b8;
  color: #334155;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(148, 163, 184, 0.1);
}
.showcase.showcase-blue .cta-btn.secondary:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Responsive */
@media (max-width: 1024px) {
  .showcase.showcase-blue .showcase-left {
    flex: 0 0 auto;
  }
}


/* Enhancing the image frame for the purple variant */
.showcase.showcase-purple .image-frame {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 44px 12px 12px;
  border-radius: 16px;
  border: 1px solid rgba(167, 139, 250, 0.2); /* faint violet border */
  box-shadow: 
    0 25px 50px -12px rgba(107, 33, 168, 0.15), /* purple tinted shadow */
    0 0 0 1px rgba(0, 0, 0, 0.01);
}

.showcase.showcase-purple .window-controls {
  top: 0;
  left: 16px;
  right: 16px;
  height: 44px;
}

.showcase.showcase-purple .url-input {
  background: rgba(243, 232, 255, 0.4); /* faint purple bg */
  border: none;
  color: #7e22ce; /* purple text */
  font-size: 16px;
  text-align: center;
  box-shadow: inset 0 1px 2px rgba(107, 33, 168, 0.03);
}

/* --- 紫色变体布局覆盖 (垂直堆向) --- */
.showcase.showcase-purple {
  padding: 4rem 2rem; 
  background-color: #faf5ff; /* Slightly richer lavender bg */
  border-color: #f3e8ff;
}

.showcase.showcase-purple .showcase-inner {
  flex-direction: column-reverse; /* Text (DOM last) on Top, Image on Bottom */
  gap: 4rem;
  text-align: center;
}

.showcase.showcase-purple .showcase-left {
  max-width: 1000px; /* Allow wider text width */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 紫色变体美化后的排版与元素 */
.showcase.showcase-purple .showcase-tag {
  background-color: #f3e8ff !important;
  color: #7e22ce !important;
  font-weight: 800;
  font-size: 0.95rem;
  padding: 0.5rem 1.5rem;
  height: auto;
  min-height: 36px;
  border-radius: 9999px;
  border: 1px solid #e9d5ff;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 2rem;
  box-shadow: none; /* No shadow as requested */
}

.showcase.showcase-purple h3 {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 2rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #581c87; 
  text-shadow: none; /* No shadow as requested */
  background: linear-gradient(135deg, #7e22ce 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.showcase.showcase-purple p {
  max-width: 780px;
  margin: 0 auto 3rem;
  font-size: 1.35rem;
  line-height: 1.8;
  color: #581c87; /* Slightly darker for better legibility contrast */
  font-weight: 500;
}

/* 交互按钮 */
.showcase.showcase-purple .cta-group {
  justify-content: center;
  width: 100%;
  gap: 1.5rem;
}

.showcase.showcase-purple .cta-btn {
  height: 56px;
  padding: 0 2.5rem;
  font-size: 1.1rem;
  border-radius: 9999px;
  font-weight: 700;
  min-width: 160px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.showcase.showcase-purple .cta-btn:not(.secondary) {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); /* Smooth Gradient */
  box-shadow: 0 10px 20px -8px rgba(124, 58, 237, 0.5); /* Soft glowing shadow instead of hard */
  color: white;
  border: none;
}

.showcase.showcase-purple .cta-btn:not(.secondary):hover {
  background: linear-gradient(135deg, #9333ea 0%, #7e22ce 100%);
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -8px rgba(124, 58, 237, 0.6);
}

.showcase.showcase-purple .cta-btn:not(.secondary):active {
  transform: translateY(0);
  box-shadow: 0 5px 15px -5px rgba(124, 58, 237, 0.4);
}

.showcase.showcase-purple .cta-btn.secondary {
  background: white;
  border: 1px solid #ddd6fe; 
  color: #7c3aed; 
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.05); /* Very subtle soft shadow */
}
.showcase.showcase-purple .cta-btn.secondary:hover {
  background: #faf5ff;
  border-color: #c4b5fd;
  color: #6d28d9;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -6px rgba(124, 58, 237, 0.15);
}
.showcase.showcase-purple .cta-btn.secondary:active {
  background: #f3e8ff;
  transform: translateY(0);
  box-shadow: none;
}

.showcase.showcase-purple .image-frame {
  --ps-image-width: 900px; /* Wider image */
  --ps-image-height: 500px;
  margin-top: 1rem;
}

.showcase-right { flex: 1; display:flex; justify-content:center; }
.image-frame { position: relative; display: inline-block; max-width: 100%; max-height: 2200px; background: #ffffff; padding: 36px 18px 18px; border-radius: 12px; box-shadow: 0 20px 40px -10px rgba(15,23,42,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; /* image card size variables */
  --ps-image-height: 340px;
  /* image width - default can be overridden by variants or responsive rules */
  --ps-image-width: 680px;
  /* request a fixed width in the flex layout and avoid shrinking */
  flex: 0 0 auto;
  width: var(--ps-image-width);
  max-width: 100%;
}
.image-frame.compact { padding: 32px 12px 12px; max-width: 420px; --ps-image-height: 320px; --ps-image-width: 420px; }
.image-frame.large { padding: 100px 24px 24px; max-width: 1200px; max-height: 3000px; --ps-image-height: 700px; --ps-image-width: 1400px; }

.image-frame:hover {
  transform: translateY(-4px);
  box-shadow: 0 30px 60px -12px rgba(15,23,42,0.15);
}

  .image-inner { overflow: hidden; border-radius: 8px; height: var(--ps-image-height); margin-top: 20px; }
  .image-inner img { display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1); transform-origin: center center; }

  /* Hover / focus zoom effect for images when `hoverable` is enabled on the frame */
  .image-frame.hoverable .image-inner img {
    transition: transform 420ms cubic-bezier(.2,.9,.2,1);
    will-change: transform;
  }

  .image-frame.hoverable:hover .image-inner img,
  .image-frame.hoverable:focus-within .image-inner img,
  .image-frame.hoverable:focus .image-inner img {
    transform: scale(1.06);
  }

/* Responsive adjustments for image card height */
@media (max-width: 1024px) {
  .image-frame { --ps-image-height: 300px; --ps-image-width: 720px; }
  .image-frame.right-large { --ps-image-height: 420px; --ps-image-width: 940px; }
  .image-frame.compact { --ps-image-height: 280px; --ps-image-width: 420px; }
}

@media (max-width: 640px) {
  .image-frame { --ps-image-height: 230px; --ps-image-width: 100%; }
  .image-frame.right-large { --ps-image-height: 300px; --ps-image-width: 100%; }
  .image-frame.compact { --ps-image-height: 180px; --ps-image-width: 100%; }
  .showcase { padding: 2rem 1.25rem; min-height: auto; }
  .showcase-inner { min-height: auto; gap: 2rem; }
}
.window-controls { position: absolute; top: 0; left: 18px; right: 18px; height: 48px; display: flex; gap: 0; z-index: 40; align-items: center; }
.window-controls .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; box-shadow: inset 0 -1px rgba(0,0,0,0.12); }
.control-left { display: flex; gap: 8px; align-items: center; margin-right: 0; }
.control-right { display: flex; align-items: center; flex: 1; margin-left: 1rem; }
.url-input { flex: 1; width: auto; max-width: none; height: 28px; padding: 0 10px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.08); background: transparent; font-size: 14px; color: #99a1af; margin-left: 0; box-sizing: border-box; cursor: text; }
.url-input::placeholder { color: rgba(15,23,42,0.4); }
.image-inner { overflow: hidden; border-radius: 8px; }
.window-controls .red { background: #ff5f56; }
.window-controls .yellow { background: #ffbd2e; }
.window-controls .green { background: #28c840; }

/* 让顶部装饰不会阻止卡片级别的交互；同时保证输入框可交互 */
.window-controls { pointer-events: none; }
.window-controls .control-right { pointer-events: auto; }
.window-controls .url-input { pointer-events: auto; }

@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
  .cta-btn:hover { animation: none; transform: translateY(-4px); }
}

/* Tablet/iPad Layout Adjustments (1024px) */
@media (max-width: 1024px) {
  /* Reduce container padding for tablet */
  .showcase.showcase-blue,
  .showcase.showcase-purple {
    padding: 3rem 2rem !important; 
  }

  /* Inner Layout - Vertical Stack */
  .showcase-inner,
  .showcase.showcase-purple .showcase-inner {
    flex-direction: column !important;
    gap: 1rem; /* Further reduced gap */
  }

  /* Text Area - Top */
  .showcase-left {
    order: 1;
    width: 100%;
    align-items: center;
    text-align: center;
    margin-bottom: 0; 
  }
  
  /* Remove top margins from image frame */
  .image-frame,
  .showcase.showcase-purple .image-frame {
    margin-top: 0 !important;
  }

  .showcase-right {
    order: 2;
    width: 100%;
    justify-content: center;
    display: flex;
  }

  /* Typography & Spacing Reduction for Compact Tablet View */
  .showcase-left h3,
  .showcase.showcase-blue h3,
  .showcase.showcase-purple h3 {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1rem !important; /* Reduced from Desktop */
  }

  .showcase-left p,
  .showcase.showcase-blue p,
  .showcase.showcase-purple p {
    text-align: center;
    margin: 0 auto 1.5rem auto !important; /* Reduced from Desktop */
    max-width: 100%;
  }

  .showcase-tag,
  .showcase.showcase-blue .btn.showcase-tag,
  .showcase.showcase-purple .showcase-tag {
    margin-bottom: 1.5rem !important; /* Reduced from Desktop */
  }

  /* Center Tags & Buttons */
  .stack-list {
    justify-content: center;
    margin-bottom: 2rem !important; /* Reduced */
  }

  .cta-group {
    justify-content: center;
    width: 100%;
    margin-bottom: 0.5rem; /* Slight buffer before image gap takes over */
  }
}

/* Mobile Layout Adjustments - Compact & Clean */
@media (max-width: 768px) {
  /* Container - Tighter spacing */
  .showcase.showcase-blue,
  .showcase.showcase-purple {
    margin: 0.5rem 0.5rem !important; /* Minimized margin between modules */
    padding: 2rem 1rem !important;
    border-radius: 18px !important;
  }

  /* Inner Layout - Vertical Stack */
  .showcase-inner,
  .showcase.showcase-purple .showcase-inner {
    flex-direction: column !important;
    gap: 1.5rem !important; /* Reduced vertical gap */
  }

  /* Text Area - Top */
  .showcase-left {
    order: 1;
    width: 100%;
    align-items: center;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .showcase-right {
    order: 2;
    width: 100%;
    display: block; /* Ensure it takes full width */
  }

  /* Typography - Scaled Down */
  .showcase-left h3,
  .showcase.showcase-blue h3,
  .showcase.showcase-purple h3 {
    text-align: center;
    font-size: 1.75rem !important;
    margin-bottom: 0.75rem !important;
    line-height: 1.2;
  }

  .showcase-left p,
  .showcase.showcase-blue p,
  .showcase.showcase-purple p {
    text-align: center;
    margin: 0 auto 1.5rem auto !important;
    font-size: 0.95rem !important;
    line-height: 1.6;
    max-width: 100% !important;
  }

  /* Tags & Buttons - Compact */
  .showcase-tag,
  .showcase.showcase-blue .btn.showcase-tag,
  .showcase.showcase-purple .showcase-tag {
    margin-bottom: 1rem !important;
    height: 26px !important;
    font-size: 0.7rem !important;
    padding: 0 1rem !important;
  }

  .stack-list {
    justify-content: center;
    margin-bottom: 1.5rem !important;
    gap: 0.5rem !important;
  }
  
  .stack-item {
    font-size: 0.75rem !important;
    padding: 0.25rem 0.75rem !important;
  }

  .cta-group {
    justify-content: center;
    width: 100%;
    /* Keep buttons on one line */
    flex-wrap: nowrap !important; 
    gap: 0.5rem !important; 
  }

  .cta-btn,
  .showcase.showcase-blue .cta-btn,
  .showcase.showcase-purple .cta-btn {
    height: 40px !important;
    padding: 0 4px !important; /* Reduced padding to fit text */
    font-size: 0.85rem !important;
    
    /* Allow shrinking and equal width distribution */
    min-width: auto !important; 
    flex: 1 1 0px; 
    width: auto !important;
    max-width: none !important;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Image Frame - Optimized for Mobile */
  .image-frame,
  .showcase.showcase-blue .image-frame,
  .showcase.showcase-purple .image-frame {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    margin: 0 !important;
    
    /* Make the frame tighter around the image */
    padding: 36px 6px 6px !important; /* Top padding for window dots */
    background: #ffffff;
    
    /* Reset large shadows for clearer mobile view */
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1) !important;
  }

  /* Adjust window controls (dots & url) */
  .window-controls,
  .showcase.showcase-blue .window-controls,
  .showcase.showcase-purple .window-controls {
    height: 36px !important;
    padding: 0 10px !important;
  }
  
  .window-controls .dot, 
  .showcase.showcase-blue .dot {
    width: 8px !important; 
    height: 8px !important;
  }
  
  .url-input, 
  .showcase.showcase-blue .url-input, 
  .showcase.showcase-purple .url-input {
    height: 22px !important;
    font-size: 11px !important;
    margin: 0 8px !important;
  }

  /* Image Content */
  .image-inner,
  .showcase.showcase-blue .image-inner,
  .showcase.showcase-purple .image-inner {
    height: auto !important;
    margin-top: 0 !important;
    border-radius: 4px; /* Slightly round internal image */
  }

  .image-inner img,
  .showcase.showcase-blue .image-inner img {
    height: auto !important;
    width: 100% !important;
    object-fit: contain;
    position: static !important;
  }
}
</style>