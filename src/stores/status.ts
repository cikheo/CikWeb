/*
 * @Description: 全局站点状态存储，用于跨组件共享站点监控状态
 * @Author: CIK
 * @Date: 2026-02-26
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStatusStore = defineStore('status', () => {
  // 是否有离线站点
  const hasDownSites = ref(false)
  // 站点数据是否已加载
  const isLoaded = ref(false)
  // 在线站点数
  const upCount = ref(0)
  // 离线站点数
  const downCount = ref(0)
  // 最近更新时间
  const lastUpdated = ref<Date | null>(null)

  // 总体状态：'up' | 'down' | 'unknown'
  const overallStatus = computed(() => {
    if (!isLoaded.value) return 'unknown'
    return hasDownSites.value ? 'down' : 'up'
  })

  // 格式化的最近更新时间
  const formattedLastUpdated = computed(() => {
    if (!lastUpdated.value) return ''
    const date = lastUpdated.value
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `最近更新时间：${year}/${month}/${day}  ${hours}:${minutes}:${seconds}`
  })

  // 设置站点状态
  const setSitesStatus = (up: number, down: number, updateTime?: Date) => {
    upCount.value = up
    downCount.value = down
    hasDownSites.value = down > 0
    isLoaded.value = true
    lastUpdated.value = updateTime || new Date()
  }

  // 重置状态
  const resetStatus = () => {
    hasDownSites.value = false
    isLoaded.value = false
    upCount.value = 0
    downCount.value = 0
    lastUpdated.value = null
  }

  return {
    hasDownSites,
    isLoaded,
    upCount,
    downCount,
    lastUpdated,
    overallStatus,
    formattedLastUpdated,
    setSitesStatus,
    resetStatus
  }
})
