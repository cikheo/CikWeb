/*
 * @Description: 应用入口，创建 Vue 应用实例并挂载 Pinia、路由与插件
 * @Author: CIK
 * @Date: 2026-01-22
 */
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import { routes } from './router'
import App from './App.vue'
import './styles/main.scss'
import 'element-plus/dist/index.css'
import pkg from '../package.json'

// 优雅的控制台信息输出
const printBrandInfo = () => {
  const brandName = pkg.name.toUpperCase()
  const version = pkg.version
  const slogan = '探索技术的边界，记录生活的点滴。'
  
  // 1. 打印主标题胶囊样式
  console.log(
    `%c ${brandName} %c V${version} `,
    'padding: 4px 8px; background: #4f46e5; color: #fff; border-radius: 4px 0 0 4px; font-weight: bold;',
    'padding: 4px 8px; background: #06b6d4; color: #fff; border-radius: 0 4px 4px 0; font-weight: bold;'
  )

  // 2. 打印带渐变效果的欢迎语
  console.log(
    `%c${slogan}`,
    'background: linear-gradient(90deg, #4f46e5, #06b6d4); -webkit-background-clip: text; color: transparent; font-size: 16px; font-weight: 800; margin: 8px 0;'
  )

  // 3. 打印构建环境信息
  if (import.meta.env.DEV) {
    console.log(
      '%c Mode %c Development ',
      'padding: 2px 6px; background: #35495e; color: #fff; border-radius: 3px 0 0 3px;',
      'padding: 2px 6px; background: #f59e0b; color: #fff; border-radius: 0 3px 3px 0;'
    )
  }
}

// 使用 ViteSSG 导出 createApp
export const createApp = ViteSSG(
  App,
  { 
    routes,
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0, behavior: 'smooth' }
    }
  },
  ({ app, isClient }) => {
    // 注入 Pinia
    app.use(createPinia())

    if (isClient) {
      // 禁用浏览器默认的滚动恢复行为
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual'
      }
      // 打印品牌信息
      printBrandInfo()
    }
  }
)
