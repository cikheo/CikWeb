/*
 * @Description: 社交媒体平台链接数据
 * @Author: CIK
 * @Date: 2026-01-26
 */
import reco1 from '@/assets/img/Bilibili.svg'
import reco2 from '@/assets/img/github.svg'
import reco3 from '@/assets/img/wechat.svg'

const media = [
  {
    id: 'media-1',
    name: 'Bilibili',
    description: '关注我的 B 站频道，观看视频教程',
    link: 'https://space.bilibili.com/1212627088',
    icon: reco1
  },
  {
    id: 'media-2',
    name: 'GitHub',
    description: '查看开源项目源码',
    link: 'https://github.com/cikheo',
    icon: reco2
  },
  {
    id: 'media-3',
    name: '公众号',
    description: '第一时间获取动态',
    link: '/wechat',
    icon: reco3
  }
]

export default media
