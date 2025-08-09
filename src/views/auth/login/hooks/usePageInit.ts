/**
 * 页面初始化逻辑
 */
import { onMounted } from 'vue'
import type { AccountKey } from './useAccountManager'

export function usePageInit(
  setupAccount: (key: AccountKey) => void,
  refreshCaptcha?: () => void
) {
  
  // 清理缓存
  const clearCorruptedCache = () => {
    try {
      const token = localStorage.getItem('token')
      if (token && token.startsWith('mock-jwt-t')) {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('userInfo')
      }
    } catch (error) {
      console.error('[Login] 清理缓存失败:', error)
    }
  }

  // 页面挂载时的初始化
  onMounted(() => {
    // 清理可能损坏的缓存
    clearCorruptedCache()
    
    // 默认选择管理员账户
    setupAccount('admin')
    
    // 初始化验证码
    if (refreshCaptcha) {
      refreshCaptcha()
    }
  })

  return {
    clearCorruptedCache
  }
}
