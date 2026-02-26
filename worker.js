/**
 * Cloudflare Worker - UptimeRobot API CORS 代理 (v2.0 - 增强版)
 * 用于解决浏览器直接访问 UptimeRobot API 的跨域问题
 * 
 * 部署步骤：
 * 1. 登录 Cloudflare Dashboard
 * 2. 进入 Workers & Pages
 * 3. 创建新的 Worker
 * 4. 复制此代码并部署
 * 5. 获取 Worker URL（例如：https://your-worker.your-subdomain.workers.dev）
 */

// CORS 头部配置
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  // CORS 预检请求处理
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS
    });
  }

  // 只允许 POST 请求
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ 
      error: 'Method not allowed',
      message: 'Only POST method is supported'
    }), { 
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS
      }
    });
  }

  try {
    // 获取请求体
    const body = await request.text();

    // 转发到 UptimeRobot API
    const uptimeResponse = await fetch('https://api.uptimerobot.com/v2/getMonitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    // 检查响应状态
    if (!uptimeResponse.ok) {
      throw new Error(`UptimeRobot API error: ${uptimeResponse.status}`);
    }

    // 获取响应数据
    const data = await uptimeResponse.text();

    // 返回带 CORS 头的响应
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        ...CORS_HEADERS
      }
    });
  } catch (error) {
    console.error('Cloudflare Worker Error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS
      }
    });
  }
}
