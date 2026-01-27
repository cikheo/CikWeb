/*
 * @Description: 推荐项目数据，用于渲染项目卡片
 * @Author: CIK
 * @Date: 2026-01-26
 */
import img1 from '@/assets/img/cikblogCik!cover.webp'
import img2 from '@/assets/img/ciknav-Cik!cover.webp'
import img3 from '@/assets/img/cover!.webp'
import img4 from '@/assets/img/ciktabCik!cover.webp'

const projects = [
  {
    id: 'proj-1',
    title: 'CikBlog',
    description: '一个示例项目，展示项目卡和页面布局。',
    tech: ['Vue 3', 'TypeScript', 'Element'],
    link: 'https://blog.cikcc.com',
    image: img1
  },
  {
    id: 'proj-2',
    title: 'CIKNav',
    description: '专注优质网址,优质资源分享',
    tech: ['PHP', 'WordPress'],
    link: 'https://nav.cikcc.com',
    image: img2
  },
  {
    id: 'proj-3',
    title: '封面生成器（CikCover）',
    description: '一个免费且漂亮的封面生成器',
    tech: ['Vue 3'],
    link: 'https://cover.cikcc.com',
    image: img3
  },
  {
    id: 'proj-4',
    title: 'CIKTab新标签页',
    description: '一个一款简约美观的浏览器起始主页',
    tech: ['PHP'],
    link: 'https://web.cikcc.com',
    image: img4
  }
]

export default projects
