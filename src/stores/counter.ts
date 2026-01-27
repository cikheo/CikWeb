/*
 * @Description: 示例 Pinia store（计数器），用于演示状态管理
 * @Author: CIK
 * @Date: 2026-01-26
 */
import { defineStore } from 'pinia'

export const useCounter = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})
