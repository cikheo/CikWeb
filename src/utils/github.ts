/*
 * @Description: 获取 GitHub 用户的公开仓库，并映射为简化的对象
 * @Author: CIK
 * @Date: 2026-01-26
 */
export async function fetchUserRepos(username: string) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    if (!res.ok) throw new Error('GitHub API error')
    const data = await res.json()
    return data.map((r: { id: number; name: string; description: string; html_url: string }) => ({ id: r.id, name: r.name, desc: r.description, url: r.html_url }))
  } catch (e) {
    console.warn('获取用户仓库失败', e)
    return []
  }
}
