/*
 * @Description: Vite 配置文件，配置插件、路径别名及开发服务器
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import pkg from './package.json'

export default defineConfig({
  define: {
    'process.env': {}
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: false })],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        // 智能代码拆分
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) return 'vendor-element-plus';
            if (id.includes('vue') || id.includes('pinia')) return 'vendor-vue';
            return 'vendor-libs';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          
          // 提取文件扩展名
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1].toLowerCase();
          
          // 匹配图片资源
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'ico'].includes(extType)) {
            return `assets/img/[name]-[hash][extname]`;
          }
          // 匹配样式文件
          if (extType === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          // 匹配字体文件
          if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          // 其他资源
          return `assets/[ext]/[name]-[hash][extname]`;
        }
      }
    }
  },
  // SSG 配置
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      reduceInlineStyles: false
    },
    // 强制包含所有主要路由，并确保生成目录结构（带尾部斜杠）
    includedRoutes(paths) {
      return [
        '/',
        '/blog/',
        '/sponsor/',
        '/about/',
        '/privacy/',
        '/wechat/',
        '/404'
      ]
    }
  }
})
