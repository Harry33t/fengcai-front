import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'
import { useCommon } from '@/composables/useCommon'
import type { AppRouteRecord } from '@/types/router'

type AuthItem = NonNullable<AppRouteRecord['meta']['authList']>[number]

/**
 * 权限管理组合式函数
 * 基于后端返回的菜单树和按钮权限实现动态权限控制
 * 用法：
 * const { hasAuth, hasMenuAuth, isPermissionLoaded } = useAuth()
 * hasAuth('create') // 检查是否拥有新增权限
 * hasMenuAuth('1', 'delete') // 检查特定菜单下的删除权限
 */
export const useAuth = () => {
  const route = useRoute()
  const { isFrontendMode } = useCommon()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  const { info } = storeToRefs(userStore)
  const { isPermissionLoaded } = storeToRefs(permissionStore)

  // 前端按钮权限（例如：['add', 'edit']）- 兼容旧版本
  const frontendAuthList = info.value?.buttons ?? []

  // 后端路由 meta 配置的权限列表（例如：[{ authMark: 'add' }]）- 兼容旧版本
  const backendAuthList: AuthItem[] = Array.isArray(route.meta.authList)
    ? (route.meta.authList as AuthItem[])
    : []

  /**
   * 检查是否拥有某权限标识（支持新旧两种模式）
   * @param auth 权限标识（如：create, delete, edit, view）
   * @returns 是否有权限
   */
  const hasAuth = (auth: string): boolean => {
    // 如果权限信息已加载，优先使用新的权限系统
    if (isPermissionLoaded.value) {
      // 获取当前路由对应的菜单ID
      const currentPath = route.path
      const menuId = permissionStore.getMenuIdByPath(currentPath)
      
      if (menuId) {
        // 检查特定菜单下的按钮权限
        return permissionStore.hasAuthPermission(auth, menuId)
      } else {
        // 检查全局按钮权限
        return permissionStore.hasAuthPermission(auth)
      }
    }

    // 兼容模式：使用原有的权限检查逻辑
    if (isFrontendMode.value) {
      return frontendAuthList.includes(auth)
    }

    return backendAuthList.some((item) => item?.authMark === auth)
  }

  /**
   * 检查特定菜单下的按钮权限
   * @param menuId 菜单ID
   * @param auth 权限标识
   * @returns 是否有权限
   */
  const hasMenuAuth = (menuId: string, auth: string): boolean => {
    if (!isPermissionLoaded.value) {
      console.warn('权限信息尚未加载，无法检查菜单权限')
      return false
    }
    
    return permissionStore.hasAuthPermission(auth, menuId)
  }

  /**
   * 检查菜单访问权限
   * @param menuId 菜单ID
   * @returns 是否有菜单访问权限
   */
  const hasMenuPermission = (menuId: string): boolean => {
    if (!isPermissionLoaded.value) {
      console.warn('权限信息尚未加载，无法检查菜单权限')
      return false
    }
    
    return permissionStore.hasMenuPermission(menuId)
  }

  /**
   * 获取当前路由的所有按钮权限
   * @returns 按钮权限数组
   */
  const getCurrentRouteAuths = () => {
    if (!isPermissionLoaded.value) {
      return []
    }
    
    const currentPath = route.path
    const menuId = permissionStore.getMenuIdByPath(currentPath)
    
    if (menuId) {
      return permissionStore.getMenuAuths(menuId)
    }
    
    return []
  }

  /**
   * 获取用户角色信息
   * @returns 角色信息
   */
  const getRoleInfo = () => {
    return permissionStore.roleInfo
  }

  return {
    // 权限检查方法
    hasAuth,
    hasMenuAuth,
    hasMenuPermission,
    
    // 权限信息获取
    getCurrentRouteAuths,
    getRoleInfo,
    
    // 状态
    isPermissionLoaded
  }
}
