/**
 * 权限控制 Composable
 * 用于在组件中方便地进行权限检查和按钮控制
 */
import { computed } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'

export function usePermission() {
  const permissionStore = usePermissionStore()

  /**
   * 检查是否有指定的按钮权限
   * @param authMark 权限标识（如：role:view, role:create, role:edit）
   * @param menuId 可选的菜单ID
   * @returns 是否有权限
   */
  const hasAuth = (authMark: string, menuId?: string | number): boolean => {
    return permissionStore.hasAuthPermission(authMark, menuId)
  }

  /**
   * 检查是否有菜单权限
   * @param menuId 菜单ID
   * @returns 是否有菜单权限
   */
  const hasMenu = (menuId: string | number): boolean => {
    return permissionStore.hasMenuPermission(menuId)
  }

  /**
   * 获取当前用户的所有权限标识
   * @returns 权限标识数组
   */
  const getAllAuths = computed(() => {
    return Array.from(permissionStore.flatPermissions.auths)
  })

  /**
   * 批量检查权限，返回权限对象
   * @param auths 权限标识数组
   * @param menuId 可选的菜单ID
   * @returns 权限对象 { [authMark]: boolean }
   */
  const checkAuths = (auths: string[], menuId?: string | number) => {
    const result: Record<string, boolean> = {}
    auths.forEach(auth => {
      result[auth] = hasAuth(auth, menuId)
    })
    return result
  }

  /**
   * 根据权限过滤按钮列表
   * @param buttons 按钮配置数组
   * @param menuId 可选的菜单ID
   * @returns 过滤后的按钮数组
   */
  const filterButtons = <T extends { auth?: string }>(
    buttons: T[], 
    menuId?: string | number
  ): T[] => {
    return buttons.filter(button => {
      // 如果没有设置 auth 属性，则显示按钮
      if (!button.auth) return true
      // 否则检查权限
      return hasAuth(button.auth, menuId)
    })
  }

  return {
    hasAuth,
    hasMenu,
    getAllAuths,
    checkAuths,
    filterButtons
  }
}

/**
 * 角色管理页面专用权限检查
 */
export function useRolePermission() {
  const { hasAuth, checkAuths, filterButtons } = usePermission()
  
  // 角色管理相关的权限标识
  const ROLE_AUTHS = {
    VIEW: 'role:view',
    CREATE: 'role:create', 
    EDIT: 'role:edit',
    DELETE: 'role:delete',
    ASSIGN_PERMISSION: 'role:assign-permission'
  } as const

  // 检查角色管理的各项权限
  const rolePermissions = computed(() => checkAuths(Object.values(ROLE_AUTHS), 14)) // menuId: 14 是角色管理菜单

  return {
    hasAuth,
    filterButtons,
    ROLE_AUTHS,
    rolePermissions,
    // 具体权限检查方法
    canView: computed(() => hasAuth(ROLE_AUTHS.VIEW, 14)),
    canCreate: computed(() => hasAuth(ROLE_AUTHS.CREATE, 14)),
    canEdit: computed(() => hasAuth(ROLE_AUTHS.EDIT, 14)),
    canDelete: computed(() => hasAuth(ROLE_AUTHS.DELETE, 14)),
    canAssignPermission: computed(() => hasAuth(ROLE_AUTHS.ASSIGN_PERMISSION, 14))
  }
}
