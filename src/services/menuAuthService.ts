/**
 * 按钮权限管理 Service 层
 * 职责：业务逻辑处理、数据转换、错误处理
 */
import { ElMessage } from 'element-plus'
import { menuAuthApi } from '@/api/menuAuth'
import type { 
  IButtonAuth, 
  ICreateButtonAuthParams, 
  IUpdateButtonAuthParams,
  IMenuAuthListParams 
} from '@/service/menu/type'

/**
 * 按钮权限业务服务
 */
export class MenuAuthService {
  /**
   * 获取菜单的按钮权限列表
   */
  static async getMenuAuths(params: IMenuAuthListParams): Promise<IButtonAuth[]> {
    try {
      const response = await menuAuthApi.getMenuAuths(params)
      
      if (response && response.code === 0 && response.data) {
        return response.data.auths || []
      } else {
        // 静默处理，不显示错误消息，避免频繁弹窗
        console.warn('获取按钮权限失败:', response?.message || '未知错误')
        return []
      }
    } catch (error) {
      console.warn('获取按钮权限失败:', error)
      // 只在开发环境显示错误，生产环境静默处理
      if (process.env.NODE_ENV === 'development') {
        console.error('按钮权限API调用失败:', error)
      }
      return []
    }
  }

  /**
   * 创建按钮权限
   */
  static async createAuth(authData: ICreateButtonAuthParams) {
    try {
      const response = await menuAuthApi.createAuth(authData)
      
      if (response && response.code === 0) {
        ElMessage.success('按钮权限创建成功')
        return response.data
      } else {
        ElMessage.error(response?.message || '创建按钮权限失败')
        return null
      }
    } catch (error) {
      console.error('创建按钮权限失败:', error)
      ElMessage.error('创建按钮权限失败')
      return null
    }
  }

  /**
   * 更新按钮权限
   */
  static async updateAuth(authData: IUpdateButtonAuthParams) {
    try {
      const response = await menuAuthApi.updateAuth(authData)
      
      if (response && response.code === 0) {
        ElMessage.success('按钮权限更新成功')
        return response.data
      } else {
        ElMessage.error(response?.message || '更新按钮权限失败')
        return null
      }
    } catch (error) {
      console.error('更新按钮权限失败:', error)
      ElMessage.error('更新按钮权限失败')
      return null
    }
  }

  /**
   * 删除按钮权限
   */
  static async deleteAuth(id: string | number) {
    try {
      const response = await menuAuthApi.deleteAuth(id)
      
      if (response && response.code === 0) {
        ElMessage.success('按钮权限删除成功')
        return true
      } else {
        ElMessage.error(response?.message || '删除按钮权限失败')
        return false
      }
    } catch (error) {
      console.error('删除按钮权限失败:', error)
      ElMessage.error('删除按钮权限失败')
      return false
    }
  }
}