/**
 * 腾讯云 EdgeOne Pages 边缘函数 - UptimeRobot API CORS 代理
 * 用于解决浏览器直接访问 UptimeRobot API 的跨域问题
 * 
 * 部署说明：
 * 1. 将项目部署到腾讯云 EdgeOne Pages
 * 2. 边缘函数自动部署，访问地址：https://your-domain.edgeone.app/api/monitors
 * 3. 更新 src/data/status.ts 中的 apiUrl 为此地址
 */

export async function onRequest(context) {
  const { request } = context;

  // CORS 头部配置
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };

  // 处理 OPTIONS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204,
      headers: corsHeaders 
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
        ...corsHeaders
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

    // 返回响应，带边缘缓存和 CORS 头
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600', // 边缘缓存5分钟
        'X-Powered-By': 'EdgeOne Pages',
        ...corsHeaders
      }
    });
  } catch (error) {
    console.error('EdgeOne Function Error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}
