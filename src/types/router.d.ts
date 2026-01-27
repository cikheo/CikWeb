/*
 * @Description: Vue Router 类型声明文件，用于扩展 RouteMeta 接口以包含标题等自定义属性
 * @Author: CIK
 * @Date: 2026-01-26
 */
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}
