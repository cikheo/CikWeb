/*
 * @Description: Vue Router 配置，定义应用的页面路由
 * @Author: CIK
 * @Date: 2026-01-22
 */
import { RouteRecordRaw } from 'vue-router'
import HomeView from '@/pages/Home.vue'
import BlogView from '@/pages/Blog.vue'
import AboutView from '@/pages/About.vue'
import Sponsor from '@/pages/Sponsor.vue'
import Privacy from '@/pages/Privacy.vue'
import WeChat from '@/pages/WeChat.vue'
import NotFound from '@/pages/NotFound.vue'

export const routes: Array<RouteRecordRaw> = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: {
      title: '首页 - Cik的个人主页'
    }
  },
  { 
    path: '/blog', 
    name: 'Blog', 
    component: BlogView,
    meta: {
      title: '技术博客 - CIKCC CODING'
    }
  },
  { 
    path: '/sponsor', 
    name: 'Sponsor', 
    component: Sponsor,
    meta: {
      title: '赞助支持 - Cik'
    }
  },
  { 
    path: '/about', 
    name: 'About', 
    component: AboutView,
    meta: {
      title: '关于我 - Cik Digital enthusiasts'
    }
  },
  { 
    path: '/privacy', 
    name: 'Privacy', 
    component: Privacy,
    meta: {
      title: '隐私政策 - Cik'
    }
  },
  { 
    path: '/wechat',
    name: 'WeChat', 
    component: WeChat,
    meta: {
      title: '微信公众号 - Cik'
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound,
    meta: {
      title: '404 - 页面未找到'
    }
  }
]
