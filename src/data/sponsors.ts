/*
 * @Description: 赞助者名单数据
 * @Author: CIK
 * @Date: 2026-01-26
 */
export interface SponsorRecord {
  id: number
  name: string
  amount: string
  date: string
}

export const sponsorList: SponsorRecord[] = [
  { id: 1, name: '多像笑话', amount: '8.8', date: '2025-01-02' },
//   { id: 2, name: 'Vue开发者', amount: '20.00', date: '2025-01-18' },
//   { id: 3, name: '开源支持者', amount: '10.00', date: '2025-01-15' },
]

export default sponsorList
