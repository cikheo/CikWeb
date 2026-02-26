<template>
  <div class="status-page">
    <!-- 加载状态 -->
    <div v-if="isLoading && !sites.length" class="loading-container">
      <div class="loading-spinner">
        <svg viewBox="0 0 50 50" class="spinner-svg">
          <circle cx="25" cy="25" r="20" fill="none" stroke="#e5e7eb" stroke-width="4"></circle>
          <circle cx="25" cy="25" r="20" fill="none" stroke="#10b981" stroke-width="4" 
                  stroke-linecap="round" class="spinner-circle"></circle>
        </svg>
      </div>
      <p class="loading-text">正在加载监控数据...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="errorMessage" class="error-container">
      <div class="error-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3 class="error-title">获取数据失败</h3>
      <p class="error-message">{{ errorMessage }}</p>
      <button class="retry-btn" @click="refreshData(false)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        重新加载
      </button>
    </div>

    <!-- 主内容 -->
    <template v-else>
      <!-- 页面头部 -->
      <header class="status-header">
        <div class="header-brand">
          <div class="brand-logo">
            <svg width="48" height="48" fill="none">
              <!-- 心电图波形 -->
              <path 
                class="ecg-line" 
                d="M4,24 L12,24 L15,10 L19,38 L23,24 L26,24 L32,24 L36,10 L40,38 L44,24" 
                stroke="#10b981" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                fill="none"
              />
              <!-- 中心脉搏点 -->
              <circle cx="24" cy="24" r="3" class="ecg-pulse" fill="#10b981"/>
            </svg>
          </div>
          <div class="brand-text">
            <h1 class="brand-title">站点状态监控</h1>
            <p class="brand-subtitle">实时监控所有服务运行状态，数据由 UptimeRobot API 提供，检测频率 5 分钟</p>
          </div>
        </div>
        <div class="header-actions">
          <button
            class="action-btn refresh-btn"
            @click="refreshData(false)"
            :disabled="isLoading"
            :class="{ 'is-refreshing': isLoading }"
          >
            <svg 
              class="btn-icon" 
              :class="{ 'spinning': isLoading }"
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span class="btn-text">{{ formatTime(countdown) }}后刷新</span>
          </button>
        </div>
      </header>

      <!-- 统计概览 -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card" :class="{ 'pulse': upCount > 0 }">
            <div class="stat-icon-wrapper up">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ upCount }}</span>
              <span class="stat-label">正常运行</span>
            </div>
          </div>

          <div class="stat-card" :class="{ 'pulse': downCount > 0 }">
            <div class="stat-icon-wrapper down">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ downCount }}</span>
              <span class="stat-label">故障中</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrapper total">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ sites.length }}</span>
              <span class="stat-label">监控站点</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon-wrapper latency">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value" :class="getResponseTimeClass(displayAvgLatency)">
                {{ displayAvgLatency }}<small>ms</small>
              </span>
              <span class="stat-label">平均响应</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 站点列表 -->
      <section class="sites-section">
        <div class="sites-grid">
          <div
            v-for="site in sortedSites"
            :key="site.id"
            class="site-card"
            :class="[`status-${site.status}`]"
          >
            <!-- 卡片头部 -->
            <div class="card-header">
              <div class="site-info">
                <h3 class="site-name">{{ site.name }}</h3>
                <a :href="site.url" target="_blank" rel="noopener noreferrer" class="site-link" @click.stop>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
              <div class="site-status" :class="site.status">
                <span class="status-dot"></span>
                <span class="status-text">{{ getStatusText(site.status) }}</span>
              </div>
            </div>

            <!-- 指标网格 -->
            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-header">
                  <span class="metric-label">平均响应时间</span>
                  <button 
                    class="metric-chart-btn"
                    @click.stop="openResponseTimeModal(site)"
                    title="查看响应时间趋势"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                  </button>
                </div>
                <div class="metric-value">
                  {{ site.responseTime || '--' }}
                  <span v-if="site.responseTime" class="metric-unit">ms</span>
                </div>
                <div class="metric-sub">最近12小时</div>
              </div>

              <div class="metric-item">
                <div class="metric-header">
                  <span class="metric-label">平均运行时间</span>
                </div>
                <div class="metric-value">{{ site.uptime.toFixed(2) }}%</div>
                <div class="metric-sub">今日运行时间</div>
              </div>
            </div>

            <!-- 监控信息 -->
            <div class="monitor-meta">
              <div class="meta-item">
                <span class="meta-dot" :class="site.status"></span>
                <span class="meta-text">{{ site.monitorType }} / {{ site.interval }}m</span>
              </div>
            </div>

            <!-- 30天状态时间线 -->
            <div class="timeline-section">
              <div class="timeline-bars">
                <div
                  v-for="(status, index) in getDailyStatus(site)"
                  :key="index"
                  class="timeline-bar"
                  :class="status"
                  :title="`第${index + 1}天: ${status === 'up' ? '正常' : status === 'down' ? '故障' : '无数据'}`"
                ></div>
              </div>
              <div class="timeline-labels">
                <span>30天前</span>
                <span class="timeline-status" :class="{ 'error': site.status === 'down' }">
                  {{ getTimelineStatus(site) }}
                </span>
                <span>今日</span>
              </div>
            </div>

            <!-- 故障记录 -->
            <div class="incidents-section">
              <button class="incidents-toggle" @click="openIncidentsModal(site)">
                <span>故障记录</span>
                <svg 
                  class="toggle-icon"
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 响应时间趋势图弹窗 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showResponseTimeModal" class="modal-overlay" @click="closeResponseTimeModal">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3 class="modal-title">响应时间趋势</h3>
              <button class="modal-close" @click="closeResponseTimeModal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <div v-if="!selectedSite?.responseHistory?.length" class="no-data">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                <p>暂无响应时间数据</p>
              </div>
              <div v-else class="chart-wrapper">
                <Line :data="chartData" :options="chartOptions" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- 故障记录弹窗 -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showIncidentsModal" class="modal-overlay" @click="closeIncidentsModal">
          <div class="modal-content" @click.stop>
            <div class="modal-header">
              <h3 class="modal-title">故障记录 - {{ selectedSite?.name }}</h3>
              <button class="modal-close" @click="closeIncidentsModal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <div v-if="!selectedSite?.incidents?.length" class="no-data">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <p>近期无故障记录</p>
              </div>
              <div v-else class="incidents-modal-list">
                <div
                  v-for="incident in selectedSite.incidents"
                  :key="incident.id"
                  class="incident-modal-item"
                >
                  <div class="incident-header">
                    <span class="incident-time">{{ incident.time }}</span>
                    <span v-if="incident.resolved" class="incident-tag resolved">已恢复</span>
                    <span v-else class="incident-tag ongoing">进行中</span>
                  </div>
                  <div class="incident-reason">{{ incident.reason }}</div>
                  <div v-if="incident.resolved" class="incident-duration">
                    持续时间: {{ incident.duration }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { 
  uptimeRobotConfig, 
  apiRequestConfig,
  refreshConfig,
  generateTimeRanges,
  getTwentyFourHoursAgo,
  getCurrentTimestamp,
  type Site 
} from '../data/status'
import { useStatusStore } from '@/stores/status'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default defineComponent({
  name: 'StatusPage',
  components: {
    Line
  },
  setup() {
    const statusStore = useStatusStore()
    const isLoading = ref(false)
    const errorMessage = ref('')
    const sites = ref<Site[]>([])
    const expandedSite = ref<string | null>(null)
    const countdown = ref(300)
    let refreshTimer: number | null = null
    let countdownTimer: number | null = null

    // 弹窗状态
    const showResponseTimeModal = ref(false)
    const showIncidentsModal = ref(false)
    const selectedSite = ref<Site | null>(null)

    // 计算属性
    const upCount = computed(() => sites.value.filter(s => s.status === 'up').length)
    const downCount = computed(() => sites.value.filter(s => s.status === 'down').length)
    
    const avgLatency = computed(() => {
      const activeSites = sites.value.filter(s => 
        s.status === 'up' && s.responseTime > 0
      )
      if (activeSites.length === 0) return 0
      const avg = activeSites.reduce((sum, s) => sum + s.responseTime, 0) / activeSites.length
      return Math.round(avg)
    })

    const displayAvgLatency = ref(0)

    // 排序站点：故障的排到最后
    const sortedSites = computed(() => {
      return [...sites.value].sort((a, b) => {
        if (a.status === b.status) return 0
        if (a.status === 'down') return 1
        if (b.status === 'down') return -1
        return 0
      })
    })

    // 数值动画
    const animateValue = (start: number, end: number, duration: number) => {
      const startTime = performance.now()
      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        displayAvgLatency.value = Math.floor(start + (end - start) * progress)
        if (progress < 1) requestAnimationFrame(update)
      }
      requestAnimationFrame(update)
    }

    watch(avgLatency, (newVal) => {
      if (newVal !== displayAvgLatency.value) {
        animateValue(displayAvgLatency.value, newVal, 1000)
      }
    })

    watch(sites, () => {
      if (sites.value.length > 0 && avgLatency.value > 0) {
        setTimeout(() => animateValue(0, avgLatency.value, 1000), 100)
      }
    }, { once: true })

    // 缓存
    const CACHE_KEY = 'cik-status-cache'
    const CACHE_DURATION = 10 * 60 * 1000 // 10分钟缓存

    const getCachedData = (): { data: Site[]; timestamp: number } | null => {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) return JSON.parse(cached)
      } catch (e) {
        console.error('读取缓存失败:', e)
      }
      return null
    }

    const setCachedData = (data: Site[]) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
      } catch (e) {
        console.error('保存缓存失败:', e)
      }
    }

    // API 请求
    const fetchUptimeRobotData = async (useCache = true): Promise<{ data: Site[]; timestamp: number }> => {
      if (useCache) {
        const cached = getCachedData()
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          return cached
        }
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), uptimeRobotConfig.timeout)

      try {
        const requestParams: Record<string, string> = {
          api_key: uptimeRobotConfig.apiKey,
          format: 'json',
          custom_uptime_ranges: generateTimeRanges(),
          response_times_start_date: String(getTwentyFourHoursAgo()),
          response_times_end_date: String(getCurrentTimestamp()),
        }

        if (apiRequestConfig.includeLogs) {
          requestParams.logs = '1'
          requestParams.logs_limit = String(apiRequestConfig.logsLimit)
        }

        if (apiRequestConfig.includeResponseTimes) {
          requestParams.response_times = '1'
        }

        const response = await fetch(uptimeRobotConfig.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(requestParams),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        if (data.stat !== 'ok') throw new Error(data.error?.message || 'API request failed')

        const sitesData = data.monitors.map((monitor: any) => {
          let avgResponseTime = 0
          if (apiRequestConfig.includeResponseTimes && monitor.response_times?.length > 0) {
            const twentyFourHoursAgo = getTwentyFourHoursAgo()
            const validTimes = monitor.response_times.filter((time: any) => 
              time && typeof time.value === 'number' && !isNaN(time.value) && 
              time.value > 0 && time.datetime >= twentyFourHoursAgo
            )
            if (validTimes.length > 0) {
              avgResponseTime = Math.round(validTimes.reduce((sum: number, time: any) => sum + time.value, 0) / validTimes.length)
            } else {
              avgResponseTime = Number(monitor.average_response_time) || 0
            }
          } else {
            avgResponseTime = Number(monitor.average_response_time) || 0
          }

          let uptimeValue = 0
          if (monitor.custom_uptime_ranges) {
            const ranges = monitor.custom_uptime_ranges.split('-').map(Number).filter((v: number) => !isNaN(v) && v > 0)
            if (ranges.length > 0) uptimeValue = ranges.reduce((sum: number, val: number) => sum + val, 0) / ranges.length
          }

          return {
            id: monitor.id.toString(),
            name: monitor.friendly_name,
            url: monitor.url,
            status: monitor.status === 2 ? 'up' : monitor.status === 9 ? 'down' : 'paused',
            responseTime: avgResponseTime,
            uptime: uptimeValue,
            monitorType: monitor.type === 1 ? 'HTTP(s)' : 'Other',
            interval: monitor.interval / 60,
            lastChecked: new Date(monitor.last_check * 1000).toLocaleString('zh-CN'),
            runningTime: '-',
            responseHistory: apiRequestConfig.includeResponseTimes 
              ? monitor.response_times?.map((rt: any) => rt.value) || []
              : [],
            incidents: apiRequestConfig.includeLogs
              ? monitor.logs?.filter((log: any) => log.type === 1).map((log: any, index: number) => ({
                  id: `i${index}`,
                  time: new Date(log.datetime * 1000).toLocaleString('zh-CN'),
                  reason: log.reason?.detail || 'Unknown error',
                  resolved: true,
                  duration: log.duration ? `${Math.round(log.duration / 60)}分钟` : '-'
                })) || []
              : []
          }
        })

        setCachedData(sitesData)
        return { data: sitesData, timestamp: Date.now() }
      } catch (error) {
        throw error
      }
    }

    // 刷新数据
    const refreshData = async (useCache = true) => {
      if (isLoading.value) return
      isLoading.value = true
      errorMessage.value = ''

      try {
        const result = await fetchUptimeRobotData(useCache)
        sites.value = result.data
        statusStore.setSitesStatus(upCount.value, downCount.value, new Date(result.timestamp))
      } catch (error: any) {
        console.error('Refresh data failed:', error)
        errorMessage.value = error.name === 'AbortError' 
          ? '请求超时，请检查网络连接' 
          : '获取监控数据失败，请稍后重试'
        if (useCache && sites.value.length === 0) {
          const cached = getCachedData()
          if (cached) {
            sites.value = cached.data
            statusStore.setSitesStatus(upCount.value, downCount.value, new Date(cached.timestamp))
          }
        }
      } finally {
        isLoading.value = false
      }
    }

    // 自动刷新
    const startAutoRefresh = () => {
      if (refreshTimer) clearInterval(refreshTimer)
      if (countdownTimer) clearInterval(countdownTimer)

      countdown.value = 300

      refreshTimer = window.setInterval(() => {
        refreshData(false)
        countdown.value = 300
      }, 300000)

      countdownTimer = window.setInterval(() => {
        if (countdown.value > 0) countdown.value--
      }, 1000)
    }

    // 工具函数
    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getStatusText = (status: string) => {
      const map: Record<string, string> = { up: '在线', down: '离线', paused: '暂停' }
      return map[status] || status
    }

    const getResponseTimeClass = (time: number) => {
      if (time === 0) return 'timeout'
      if (time < 200) return 'fast'
      if (time < 500) return 'normal'
      return 'slow'
    }

    const getDailyStatus = (site: Site) => {
      const days = 30
      const statuses: ('up' | 'down' | 'unknown')[] = []
      for (let i = 0; i < days; i++) {
        if (site.status === 'up') statuses.push('up')
        else if (site.status === 'down') statuses.push(i >= days - 3 ? 'down' : 'up')
        else statuses.push('unknown')
      }
      return statuses
    }

    const getTimelineStatus = (site: Site) => {
      if (site.status === 'up') return '最近30天运行正常'
      if (site.status === 'down') return '最近30天有故障'
      return '暂无数据'
    }

    const toggleExpand = (siteId: string) => {
      expandedSite.value = expandedSite.value === siteId ? null : siteId
    }

    // 响应时间弹窗
    const openResponseTimeModal = (site: Site) => {
      selectedSite.value = site
      showResponseTimeModal.value = true
    }

    const closeResponseTimeModal = () => {
      showResponseTimeModal.value = false
      selectedSite.value = null
    }

    // 故障记录弹窗
    const openIncidentsModal = (site: Site) => {
      selectedSite.value = site
      showIncidentsModal.value = true
    }

    const closeIncidentsModal = () => {
      showIncidentsModal.value = false
      selectedSite.value = null
    }

    // Chart.js 数据
    const chartData = computed(() => {
      if (!selectedSite.value?.responseHistory?.length) {
        return { labels: [], datasets: [] }
      }

      const data = selectedSite.value.responseHistory.slice(-24)
      const labels: string[] = []
      const now = new Date()
      
      for (let i = data.length - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 60 * 60 * 1000)
        labels.push(date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }))
      }

      return {
        labels,
        datasets: [{
          label: '响应时间',
          data,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#10b981',
          pointBorderWidth: 2,
        }]
      }
    })

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context: any) => `响应时间: ${context.raw} ms`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#9ca3af', font: { size: 11 }, maxTicksLimit: 8 }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(229, 231, 235, 0.5)', drawBorder: false },
          ticks: { color: '#9ca3af', font: { size: 11 }, callback: (value: any) => `${value} ms` }
        }
      }
    }

    // 生命周期
    onMounted(() => {
      refreshData(true)
      startAutoRefresh()
    })

    onUnmounted(() => {
      if (refreshTimer) clearInterval(refreshTimer)
      if (countdownTimer) clearInterval(countdownTimer)
    })

    return {
      isLoading,
      errorMessage,
      sites,
      upCount,
      downCount,
      displayAvgLatency,
      sortedSites,
      expandedSite,
      countdown,
      showResponseTimeModal,
      showIncidentsModal,
      selectedSite,
      chartData,
      chartOptions,
      refreshData,
      formatTime,
      getStatusText,
      getResponseTimeClass,
      getDailyStatus,
      getTimelineStatus,
      toggleExpand,
      openResponseTimeModal,
      closeResponseTimeModal,
      openIncidentsModal,
      closeIncidentsModal
    }
  }
})
</script>

<style scoped>
/* 基础布局 */
.status-page {
  min-height: 100vh;
  padding: 24px;
  padding-top: 110px;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
}

.spinner-svg {
  animation: rotate 2s linear infinite;
}

.spinner-circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% { transform: rotate(360deg); }
}

@keyframes dash {
  0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
  100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
}

.loading-text {
  color: #6b7280;
  font-size: 0.875rem;
}

/* 错误状态 */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 16px;
  text-align: center;
}

.error-icon {
  color: #ef4444;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.error-message {
  color: #6b7280;
  font-size: 0.875rem;
  max-width: 400px;
}

.retry-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* 头部 */
.status-header {
  max-width: 1200px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand-logo {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border: 3px solid #10b981;
  box-shadow: 
    0 0 0 4px rgba(16, 185, 129, 0.2),
    0 0 0 8px rgba(16, 185, 129, 0.1),
    0 4px 12px rgba(16, 185, 129, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
}

.brand-logo::before {
  content: '';
  position: absolute;
  inset: -12px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  animation: ripple-wave 2s ease-out infinite;
}

.brand-logo:hover {
  transform: scale(1.05);
  box-shadow: 
    0 0 0 4px rgba(16, 185, 129, 0.3),
    0 0 0 8px rgba(16, 185, 129, 0.15),
    0 6px 20px rgba(16, 185, 129, 0.25);
}

.brand-logo .ecg-line {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: ecg-flow 3s ease-in-out infinite;
  filter: drop-shadow(0 0 2px rgba(16, 185, 129, 0.5));
}

.brand-logo .ecg-pulse {
  animation: pulse-beat 1.5s ease-in-out infinite;
  filter: drop-shadow(0 0 3px rgba(16, 185, 129, 0.8));
}

@keyframes ecg-flow {
  0% {
    stroke-dashoffset: 200;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -200;
  }
}

@keyframes pulse-beat {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.4);
  }
}

@keyframes ripple-wave {
  0% {
    opacity: 0.6;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  max-width: 600px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.refresh-btn {
  background: linear-gradient(135deg, #ecfdf5, #d1fae5);
  color: #059669;
  border: 1px solid #a7f3d0;
}

.refresh-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  transition: transform 0.3s ease;
}

.btn-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 统计区域 */
.stats-section {
  max-width: 1200px;
  margin: 0 auto 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-card.pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.2); }
  50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-wrapper.up {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #059669;
}

.stat-icon-wrapper.down {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #dc2626;
}

.stat-icon-wrapper.total {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #2563eb;
}

.stat-icon-wrapper.latency {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #d97706;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.2;
}

.stat-value small {
  font-size: 0.875rem;
  font-weight: 500;
  margin-left: 2px;
}

.stat-value.fast { color: #059669; }
.stat-value.normal { color: #d97706; }
.stat-value.slow { color: #dc2626; }

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 2px;
}

/* 站点区域 */
.sites-section {
  max-width: 1200px;
  margin: 0 auto;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* 站点卡片 */
.site-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.site-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #10b981, #34d399);
}

.site-card.status-down::before {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.site-card.status-paused::before {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.site-info {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.site-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-link {
  color: #9ca3af;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.site-link:hover {
  color: #10b981;
}

.site-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
}

.site-status.up {
  background: #ecfdf5;
  color: #059669;
}

.site-status.down {
  background: #fef2f2;
  color: #dc2626;
}

.site-status.paused {
  background: #fffbeb;
  color: #d97706;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 指标网格 */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.metric-item {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  position: relative;
}

.metric-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
}

.metric-chart-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.7rem;
  color: #059669;
  cursor: pointer;
  transition: all 0.2s ease;
}

.metric-chart-btn:hover {
  background: #ecfdf5;
  border-color: #a7f3d0;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.metric-unit {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  margin-left: 2px;
}

.metric-sub {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 4px;
}

/* 监控元信息 */
.monitor-meta {
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #6b7280;
}

.meta-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.meta-dot.up { background: #10b981; }
.meta-dot.down { background: #ef4444; }
.meta-dot.paused { background: #f59e0b; }

/* 时间线 */
.timeline-section {
  background: #f9fafb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.timeline-bars {
  display: flex;
  gap: 2px;
  height: 32px;
  margin-bottom: 8px;
}

.timeline-bar {
  flex: 1;
  border-radius: 2px;
  min-width: 4px;
}

.timeline-bar.up { background: #10b981; }
.timeline-bar.down { background: #ef4444; }
.timeline-bar.unknown { background: #e5e7eb; }

.timeline-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #9ca3af;
}

.timeline-status {
  color: #10b981;
  font-weight: 500;
}

.timeline-status.error {
  color: #ef4444;
}

/* 故障记录 */
.incidents-section {
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
}

.incidents-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  background: none;
  border: none;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  transition: color 0.2s ease;
}

.incidents-toggle:hover {
  color: #10b981;
}

.incident-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.incident-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.incident-tag {
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}

.incident-tag.resolved {
  background: #d1fae5;
  color: #059669;
}

.incident-tag.ongoing {
  background: #fee2e2;
  color: #dc2626;
}

.incident-reason {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 4px;
}

.incident-duration {
  font-size: 0.75rem;
  color: #9ca3af;
}

.incidents-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  color: #10b981;
}

.incidents-empty p {
  margin-top: 8px;
  font-size: 0.875rem;
  color: #6b7280;
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
}

.modal-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #9ca3af;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.modal-body {
  padding: 24px;
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9ca3af;
}

.no-data p {
  margin-top: 12px;
  font-size: 0.875rem;
}

.chart-wrapper {
  height: 300px;
}

/* 故障记录弹窗列表 */
.incidents-modal-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 500px;
  overflow-y: auto;
}

.incident-modal-item {
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 12px;
  padding: 16px;
  transition: all 0.2s ease;
}

.incident-modal-item:hover {
  border-color: #fecaca;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.1);
}

/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(10px);
}

/* 响应式 */
@media (max-width: 1024px) {
  .sites-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .status-page {
    padding: 16px;
    padding-top: 80px;
  }

  .status-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .brand-title {
    font-size: 1.25rem;
  }

  .brand-subtitle {
    font-size: 0.75rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: 10px;
  }

  .chart-wrapper {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 16px;
  }
}
</style>
