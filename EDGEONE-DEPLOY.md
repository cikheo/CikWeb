# 腾讯云 EdgeOne Pages 部署指南

## 📋 准备工作

1. **注册腾讯云账号**
   - 访问 https://cloud.tencent.com/
   - 完成实名认证

2. **开通 EdgeOne Pages 服务**
   - 进入控制台：https://console.cloud.tencent.com/edgeone/pages
   - 开通服务（新用户有免费额度）

## 🚀 部署步骤

### 方式一：通过 Git 仓库部署（推荐）

1. **确保代码已推送到 GitHub**
   ```bash
   git push origin main
   ```

2. **在 EdgeOne Pages 创建项目**
   - 登录 EdgeOne Pages 控制台
   - 点击"创建项目"
   - 选择"从 Git 导入"
   - 授权并选择仓库：`cikheo/CikWeb`

3. **配置构建设置**
   ```
   框架预设：Vite
   构建命令：npm run build
   输出目录：dist
   Node.js 版本：18.x 或更高
   ```

4. **部署并获取 URL**
   - 点击"部署"
   - 等待部署完成（约 2-3 分钟）
   - 获取部署 URL（例如：`https://cikweb.edgeone.app`）

### 方式二：通过 CLI 部署

```bash
# 安装 EdgeOne CLI
npm install -g @tencent/edgeone-cli

# 登录
edgeone login

# 部署
npm run build
edgeone deploy
```

## ⚙️ 边缘函数配置

EdgeOne Pages 会自动识别 `functions` 目录：

```
项目根目录/
├── functions/
│   └── api/
│       └── monitors.js  ← 自动部署为 /api/monitors
├── src/
├── dist/
└── package.json
```

部署后，边缘函数自动生效：
- **本地路径**：`functions/api/monitors.js`
- **访问地址**：`https://your-domain.edgeone.app/api/monitors`

## 🔧 更新项目配置

部署成功后，更新 `src/data/status.ts`：

```typescript
export const uptimeRobotConfig = {
  apiKey: 'ur3257177-f4dc46bca49d4ede174ebc30',
  
  // 使用 EdgeOne Pages 边缘函数
  apiUrl: 'https://your-domain.edgeone.app/api/monitors',
  
  timeout: 10000,
  useProxy: true,
};
```

**重要：** 将 `your-domain.edgeone.app` 替换为你的实际域名！

## 📊 性能对比

| 方案 | 国内访问速度 | 全球访问 | 免费额度 |
|------|------------|---------|---------|
| **EdgeOne Pages** | ⚡ **极速** | ✅ 快 | 100GB/月 |
| Cloudflare Worker | 🐌 较慢 | ⚡ 极速 | 100k请求/天 |
| 直连 API | 🐌 很慢 | 🐌 慢 | - |

## ✅ 验证部署

1. **测试边缘函数**
   ```bash
   curl -X POST https://your-domain.edgeone.app/api/monitors \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "api_key=ur3257177-f4dc46bca49d4ede174ebc30&format=json"
   ```

2. **检查 CORS 头**
   - 响应头应包含：`Access-Control-Allow-Origin: *`

3. **访问 status 页面**
   - 访问：`https://your-domain.edgeone.app/status/`
   - 应能正常显示监控数据

## 🔍 故障排查

### 问题 1：边缘函数不生效
**解决方法：**
- 确保文件路径正确：`functions/api/monitors.js`
- 等待 1-2 分钟让部署生效
- 查看 EdgeOne 控制台的函数日志

### 问题 2：CORS 错误
**解决方法：**
- 检查边缘函数代码中的 CORS 头配置
- 确保所有响应都包含 CORS 头

### 问题 3：status 页面空白
**解决方法：**
- 确认 `src/data/status.ts` 中的 URL 正确
- 确认 `useProxy: true`
- 打开浏览器控制台查看网络请求

## 📱 自动部署

EdgeOne Pages 支持 Git 推送自动部署：
1. 在控制台配置自动部署
2. 每次推送代码自动触发构建
3. 自动部署到生产环境

## 💰 费用说明

EdgeOne Pages 免费计划：
- **流量**：100 GB/月
- **请求**：1000 万次/月
- **构建时间**：400 分钟/月
- **边缘函数**：无限制调用

对于个人项目，**完全免费**！

## 🔗 相关链接

- [EdgeOne Pages 官方文档](https://cloud.tencent.com/document/product/1552)
- [边缘函数开发指南](https://cloud.tencent.com/document/product/1552/81900)
- [项目 GitHub 仓库](https://github.com/cikheo/CikWeb)

---

部署完成后，你的 Status 页面将获得：
- 🚀 **极速响应**：国内访问 < 100ms
- 🌏 **全球加速**：EdgeOne 边缘节点就近响应
- 💪 **高可用**：99.9% SLA 保障
- 💰 **零成本**：免费额度充足
