/*
 * @Description: 站点状态监控数据配置
 * @Author: CIK
 * @Date: 2026-02-26
 */

// UptimeRobot API 配置
export const uptimeRobotConfig = {
  // API 密钥 - 请替换为你的 UptimeRobot API Key
  apiKey: 'ur3257177-f4dc46bca49d4ede174ebc30',
  
  // API 端点地址
  apiUrl: 'https://api.uptimerobot.com/v2/getMonitors',
  
  // 请求超时时间（毫秒）
  timeout: 5000,
  
  // 是否使用代理（用于标识）
  useProxy: false,
};

// API 请求参数优化配置
export const apiRequestConfig = {
  // 是否获取日志
  includeLogs: false,
  // 日志数量限制（减少以提升速度）
  logsLimit: 1,
  // 是否获取响应时间历史
  includeResponseTimes: true,
  // 响应时间记录数量限制（24小时内的记录，最多24条）
  responseTimesLimit: 12,
  // 自定义运行时间比率（天数）- 使用 custom_uptime_ranges 替代
  uptimeRatioDays: '1',
  // 是否启用请求压缩
  enableCompression: true,
  // 批量请求限制
  batchSize: 50,
}

/**
 * 生成1天时间范围字符串（极限优化：从7天减少到1天）
 * 格式: start_end（只返回今天）
 */
export const generateTimeRanges = (): string => {
  const date = new Date()
  const start = new Date(date)
  start.setHours(0, 0, 0, 0)
  
  const end = new Date(date)
  end.setHours(23, 59, 59, 999)
  
  return `${Math.floor(start.getTime() / 1000)}_${Math.floor(end.getTime() / 1000)}`
}

/**
 * 获取12小时前的时间戳（优化：从24小时减少到12小时）
 */
export const getTwentyFourHoursAgo = (): number => {
  return Math.floor((Date.now() - 12 * 60 * 60 * 1000) / 1000)
}

/**
 * 获取当前时间戳
 */
export const getCurrentTimestamp = (): number => {
  return Math.floor(Date.now() / 1000)
}

// 站点监控数据接口定义
export interface Incident {
  id: string
  time: string
  reason: string
  resolved: boolean
  duration: string
}

export interface Site {
  id: string
  name: string
  url: string
  status: 'up' | 'down' | 'paused'
  responseTime: number
  uptime: number
  monitorType: string
  interval: number
  lastChecked: string
  runningTime: string
  responseHistory: number[]
  incidents: Incident[]
}

// UptimeRobot 状态码映射
export const statusCodeMap: Record<number, 'up' | 'down' | 'paused'> = {
  0: 'paused',
  1: 'down',
  2: 'up'
}

// 监控类型映射
export const monitorTypeMap: Record<number, string> = {
  1: 'HTTP(s)',
  2: 'Keyword',
  3: 'Ping',
  4: 'Port',
  5: 'Heartbeat'
}

// 自动刷新配置
export const refreshConfig = {
  // 默认是否开启自动刷新
  enabled: true,
  // 刷新间隔（毫秒）- 5分钟
  interval: 300000
}
