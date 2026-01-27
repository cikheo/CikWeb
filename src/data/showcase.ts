/*
 * @Description: 首页项目展示区数据
 * @Author: CIK
 * @Date: 2026-01-26
 */
import img1 from '@/assets/img/cikblogCik!cover.webp'
import img2 from '@/assets/img/ciktabCik!cover.webp'

export const showcase1 = {
  id: 'show-1',
  tag: '个人博客',
  title: 'CIKBlog',
  description: '探索技术的边界，记录生活的点滴,备受喜爱的知识共享博客。',
  link: 'https://blog.cikcc.com',
  ctaText: '立即访问',
  ctaLink: 'https://blog.cikcc.com',
  secondaryCta: '关于本站',
  secondaryLink: 'https://blog.cikcc.com/about',
  tertiaryCta: '*',
  tertiaryLink: '*',
  stack: ['TypeScript', 'Vue3', 'Element Plus'],
  image: img1
}

export const showcase2 = {
  id: 'show-2',
  tag: '浏览器标签页',
  title: 'CIKTab新标签页',
  description: '一款简约美观、功能强大的浏览器起始主页，极致个性化的配置，满足您的各项要求，提高工作效率！',
  reverse: true,
  link: 'https://web.cikcc.com',
  ctaText: '立即访问',
  ctaLink: 'https://web.cikcc.com',
  secondaryCta: 'edge扩展',
  secondaryLink: 'https://microsoftedge.microsoft.com/addons/detail/ciktab%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/kfnlnnhhochcdimnefhbgmakcfkeknak',
  tertiaryCta: 'Chrome扩展',
  tertiaryLink: 'https://chromewebstore.google.com/detail/ciktab%E6%96%B0%E6%A0%87%E7%AD%BE%E9%A1%B5/fmomgheplihlaegelkkiplkfmfpcfnlj',
  image: img2
}

const showcase = [showcase1, showcase2]

export default showcase
