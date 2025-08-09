// 根据不同环境配置不同的 API 地址
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // 开发环境使用 Vite 代理，避免 CORS 问题
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境直接使用 API 地址
  BASE_URL = 'https://cauchy.tsukikage7.com/api/v1'
} else {
  BASE_URL = '/api'
}

export { BASE_URL, TIME_OUT }
