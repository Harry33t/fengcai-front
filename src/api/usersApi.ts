/**
 * 用户服务 API
 * 基于现有 service 架构的用户相关接口封装
 */

import { 
  // accountLoginRequest, // 不再使用，改为直接 axios 调用
  requestUserInfo, 
  requestUserMenus, 
  logoutRequest,
  refreshTokenRequest 
} from '@/service/api'
import type { IAccount, ILoginResult, IUserInfo } from '@/service/login/type'
import type { IUserPermissionInfo } from '@/types/permission'
import axios from 'axios'
import { BASE_URL } from '@/service/request/config'
import localCache from '@/utils/cache'

// API 响应包装类型
interface ApiResponse<T> {
  code: number
  message: string
  data: T | null
}

// 导入 User 命名空间类型
declare global {
  namespace User {
    interface UserInfo {
      userId: number
      userName: string
      roles: string[]
      buttons: string[]
      avatar?: string
      email?: string
      phone?: string
    }
  }
}

export class UserService {
  /**
   * 用户登录 - 直接使用 axios 获取完整响应对象
   */
  static async login(loginData: { userName: string; password: string }) {
    try {
      const account: IAccount = {
        username: loginData.userName,
        password: loginData.password
      }
      
      // 直接使用 axios 发送请求，获取完整响应对象
      const axiosResponse = await axios.post(`${BASE_URL}/user/login`, account, {
        headers: {
          'Content-Type': 'application/json',
          // 添加现有 token（如果有）
          ...(localCache.getCache('token') ? { 'Authorization': `Bearer ${localCache.getCache('token')}` } : {})
        }
      })
      
      // 打印响应信息用于调试
      console.log('[UserService] 登录响应数据:', axiosResponse.data)
      console.log('[UserService] 登录响应头:', axiosResponse.headers)
      console.log('[UserService] HTTP 状态码:', axiosResponse.status)
      
      // 检查响应体中是否包含错误信息（即使 HTTP 状态码是 200）
      if (axiosResponse.data && axiosResponse.data.code && axiosResponse.data.code !== 200) {
        const errorMessage = axiosResponse.data.message || '登录失败'
        console.error('[UserService] 服务器返回错误:', axiosResponse.data)
        throw new Error(errorMessage)
      }
      
      // 尝试从响应头中获取 token
      let accessToken = axiosResponse.headers['access-token'] || 
                       axiosResponse.headers['Access-Token'] ||
                       axiosResponse.headers['ACCESS-TOKEN']
      
      // 如果响应头中没有 token，尝试从响应体中获取
      if (!accessToken && axiosResponse.data) {
        accessToken = axiosResponse.data.token || 
                     axiosResponse.data.accessToken || 
                     axiosResponse.data.access_token
      }
      
      if (!accessToken) {
        console.error('[UserService] 未找到 token，响应数据:', axiosResponse.data)
        console.error('[UserService] 响应头:', axiosResponse.headers)
        throw new Error('登录成功但服务器未返回 token')
      }
      
      // 移除 Bearer 前缀（如果存在）
      const token = accessToken.replace(/^Bearer\s+/, '')
      
      return {
        token: token,
        refreshToken: axiosResponse.data?.refreshToken || null,
        user: axiosResponse.data || null
      }
      
    } catch (error) {
      console.error('[UserService] 登录错误:', error)
      
      // 处理 axios 错误，提取服务器返回的具体错误信息
      if (axios.isAxiosError(error)) {
        console.error('[UserService] Axios 错误响应:', error.response)
        
        const response = error.response
        if (response) {
          // 从响应中提取错误信息
          const errorMessage = response.data?.message || 
                              response.data?.error || 
                              response.statusText
          
          // 根据 HTTP 状态码返回具体错误
          switch (response.status) {
            case 400:
              throw new Error(errorMessage || '请求参数错误')
            case 401:
              throw new Error(errorMessage || '用户名或密码错误')
            case 403:
              throw new Error(errorMessage || '账户已被禁用，请联系管理员')
            case 404:
              throw new Error('登录服务不可用')
            case 429:
              throw new Error(errorMessage || '登录尝试次数过多，请稍后再试')
            case 500:
              throw new Error('服务器内部错误，请稍后重试')
            default:
              throw new Error(errorMessage || `登录失败（状态码: ${response.status}）`)
          }
        } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
          throw new Error('网络连接失败，请检查网络连接')
        } else {
          throw new Error('登录请求失败，请稍后重试')
        }
      }
      
      // 如果是其他类型的错误，直接抛出
      if (error instanceof Error) {
        throw error
      }
      
      throw new Error('登录失败，请稍后重试')
    }
  }



  /**
   * 获取用户菜单
   */
  static async getUserMenus() {
    const response = await requestUserMenus()
    return response.data
  }

  /**
   * 用户登出
   */
  static async logout() {
    const response = await logoutRequest()
    return response.data
  }

  /**
   * 刷新token
   */
  static async refreshToken() {
    const response = await refreshTokenRequest()
    
    if (response.data) {
      return {
        token: response.data.token,
        refreshToken: response.data.refreshToken
      }
    }
    
    throw new Error('Failed to refresh token')
  }

  /**
   * 获取用户权限信息
   * 调用 /user/info 接口获取完整的权限菜单树
   */
  static async getUserInfo(): Promise<{ code: number; message: string; data: IUserPermissionInfo | null }> {
    try {
      const token = localCache.getCache('token')
      if (!token) {
        throw new Error('未找到访问令牌')
      }

      const axiosResponse = await axios.get(`${BASE_URL}/user/info`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Access-Token': token
        }
      })

      console.log('[UserService] 获取用户信息响应:', axiosResponse.data)

      // 检查响应状态
      if (axiosResponse.data && axiosResponse.data.code === 0) {
        return {
          code: 0,
          message: '获取成功',
          data: axiosResponse.data.data
        }
      } else {
        const errorMessage = axiosResponse.data?.message || '获取用户信息失败'
        console.error('[UserService] 获取用户信息失败:', axiosResponse.data)
        return {
          code: axiosResponse.data?.code || -1,
          message: errorMessage,
          data: null
        }
      }
    } catch (error) {
      console.error('[UserService] 获取用户信息错误:', error)
      
      if (axios.isAxiosError(error)) {
        const response = error.response
        if (response) {
          const errorMessage = response.data?.message || `HTTP ${response.status}: ${response.statusText}`
          return {
            code: response.status,
            message: errorMessage,
            data: null
          }
        }
      }
      
      return {
        code: -1,
        message: error instanceof Error ? error.message : '获取用户信息失败',
        data: null
      }
    }
  }

  /**
   * 获取用户列表 (为了兼容现有代码)
   */
  static async getUserList() {
    // 模拟用户列表数据
    return {
      data: {
        list: [],
        totalCount: 0
      }
    }
  }
}
