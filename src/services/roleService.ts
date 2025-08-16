/**
 * 角色管理 Service 层
 * 职责：业务逻辑处理、数据转换、错误处理
 */
import { ElMessage } from 'element-plus'
import { roleApi } from '@/api/role'
import type { 
  IRole, 
  IRoleListParams,
  ICreateRoleParams, 
  IUpdateRoleParams,
  IRolePermissionParams,
  IUpdateRolePermissionParams
} from '@/service/role/type'

/**
 * 角色业务服务
 */
export class RoleService {
  /**
   * 获取角色列表
   */
  static async getRoles(params?: IRoleListParams): Promise<{ roles: IRole[], total: number }> {
    try {
      const response = await roleApi.getRoles(params)
      
      if (response && response.code === 0 && response.data) {
        // 处理返回的角色数据，从嵌套结构中提取角色信息
        const roleList = response.data.roles || []
        const roles = roleList.map((item: any) => ({
          id: item.role.id,
          name: item.role.name,
          desc: item.role.desc,
          status: item.role.status,
          createdTime: item.role.createdTime,
          updatedTime: item.role.updatedTime,
          // 可选：添加用户数量信息
          userCount: item.users ? item.users.length : 0,
          users: item.users || []
        }))
        
        return {
          roles,
          total: response.data.total || roles.length
        }
      } else {
        console.warn('获取角色列表失败:', response?.message || '未知错误')
        return { roles: [], total: 0 }
      }
    } catch (error) {
      console.error('获取角色列表失败:', error)
      ElMessage.error('获取角色列表失败')
      return { roles: [], total: 0 }
    }
  }

  /**
   * 获取角色详情
   */
  static async getRole(id: string): Promise<IRole | null> {
    try {
      const response = await roleApi.getRole(id)
      
      if (response && response.code === 0 && response.data) {
        // 直接返回角色数据，无需处理嵌套结构
        return {
          id: response.data.id,
          name: response.data.name,
          desc: response.data.desc,
          status: response.data.status,
          createdTime: response.data.createdTime,
          updatedTime: response.data.updatedTime
        }
      } else {
        ElMessage.error(response?.message || '获取角色详情失败')
        return null
      }
    } catch (error) {
      console.error('获取角色详情失败:', error)
      ElMessage.error('获取角色详情失败')
      return null
    }
  }

  /**
   * 创建角色
   */
  static async createRole(roleData: ICreateRoleParams) {
    try {
      const response = await roleApi.createRole(roleData)
      
      if (response && response.code === 0) {
        ElMessage.success('角色创建成功')
        return response.data
      } else {
        ElMessage.error(response?.message || '创建角色失败')
        return null
      }
    } catch (error) {
      console.error('创建角色失败:', error)
      ElMessage.error('创建角色失败')
      return null
    }
  }

  /**
   * 更新角色
   */
  static async updateRole(roleData: IUpdateRoleParams) {
    try {
      const response = await roleApi.updateRole(roleData)
      
      if (response && response.code === 0) {
        ElMessage.success('角色更新成功')
        return response.data
      } else {
        ElMessage.error(response?.message || '更新角色失败')
        return null
      }
    } catch (error) {
      console.error('更新角色失败:', error)
      ElMessage.error('更新角色失败')
      return null
    }
  }

  /**
   * 删除角色
   */
  static async deleteRole(id: string) {
    try {
      const response = await roleApi.deleteRole(id)
      
      if (response && response.code === 0) {
        ElMessage.success('角色删除成功')
        return true
      } else {
        ElMessage.error(response?.message || '删除角色失败')
        return false
      }
    } catch (error) {
      console.error('删除角色失败:', error)
      ElMessage.error('删除角色失败')
      return false
    }
  }

  /**
   * 获取角色权限
   */
  static async getRolePermissions(params: IRolePermissionParams) {
    try {
      const response = await roleApi.getRolePermissions(params)
      
      if (response && response.code === 0 && response.data) {
        return response.data
      } else {
        console.warn('获取角色权限失败:', response?.message || '未知错误')
        return null
      }
    } catch (error) {
      console.error('获取角色权限失败:', error)
      ElMessage.error('获取角色权限失败')
      return null
    }
  }

  /**
   * 更新角色权限
   */
  static async updateRolePermissions(data: IUpdateRolePermissionParams) {
    try {
      const response = await roleApi.updateRolePermissions(data)
      
      if (response && response.code === 0) {
        ElMessage.success('角色权限更新成功')
        return true
      } else {
        ElMessage.error(response?.message || '更新角色权限失败')
        return false
      }
    } catch (error) {
      console.error('更新角色权限失败:', error)
      ElMessage.error('更新角色权限失败')
      return false
    }
  }
}