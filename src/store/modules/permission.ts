import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  MenuTree, 
  IUserPermissionInfo, 
  FlatPermissions, 
  DynamicRoute,
  MenuAuth 
} from '@/types/permission'
import { UserService } from '@/api/usersApi'

/**
 * 权限管理Store
 * 基于后端返回的菜单树和按钮权限实现动态权限控制
 */
export const usePermissionStore = defineStore('permission', () => {
  // 用户权限信息
  const userPermissionInfo = ref<IUserPermissionInfo | null>(null)
  
  // 菜单树数据
  const menuTrees = ref<MenuTree[]>([])
  
  // 扁平化的权限集合（用于快速权限检查）
  const flatPermissions = ref<FlatPermissions>({
    menus: new Set(),
    auths: new Set(),
    menuAuths: new Map()
  })
  
  // 动态路由配置
  const dynamicRoutes = ref<DynamicRoute[]>([])

  // 计算属性：当前用户角色信息
  const roleInfo = computed(() => {
    if (!userPermissionInfo.value) return null
    return {
      roleId: userPermissionInfo.value.roleId,
      roleName: userPermissionInfo.value.roleName,
      roleDesc: userPermissionInfo.value.roleDesc
    }
  })

  // 计算属性：是否已加载权限信息
  const isPermissionLoaded = computed(() => {
    return userPermissionInfo.value !== null && menuTrees.value.length > 0
  })

  /**
   * 获取用户权限信息
   * 调用 /user/info 接口获取完整的权限菜单树
   */
  const fetchUserPermissions = async () => {
    try {
      const response = await UserService.getUserInfo()
      if (response.code === 0 && response.data) {
        // 直接使用 response.data 作为 UserPermissionInfo
        userPermissionInfo.value = response.data as IUserPermissionInfo
        menuTrees.value = response.data.menuTrees || []
        
        // 生成扁平化权限集合
        generateFlatPermissions()
        
        // 生成动态路由配置
        generateDynamicRoutes()
        
        console.log('权限信息加载成功:', {
          menuCount: menuTrees.value.length,
          authCount: flatPermissions.value.auths.size,
          userRole: (response.data as any).roleName
        })
      } else {
        console.warn('获取权限信息失败:', response.message)
        clearPermissions()
      }
    } catch (error) {
      console.error('获取用户权限信息失败:', error)
      // 使用默认权限或跳转到登录页
      clearPermissions()
    }
  }

  /**
   * 生成扁平化权限集合
   * 将菜单树结构转换为便于快速查询的扁平结构
   */
  const generateFlatPermissions = () => {
    const menus = new Set<string>()
    const auths = new Set<string>()
    const menuAuths = new Map<string, Set<string>>()

    const traverseMenuTree = (menuTree: MenuTree) => {
      // 收集菜单权限
      menus.add(menuTree.menu.id.toString())
      
      // 收集按钮权限
      if (menuTree.auths && menuTree.auths.length > 0) {
        const menuAuthSet = new Set<string>()
        menuTree.auths.forEach(auth => {
          auths.add(auth.mark)
          menuAuthSet.add(auth.mark)
        })
        menuAuths.set(menuTree.menu.id.toString(), menuAuthSet)
      }
      // 递归处理子菜单
      menuTree.children.forEach(child => traverseMenuTree(child))
    }

    menuTrees.value.forEach(menuTree => traverseMenuTree(menuTree))

    flatPermissions.value = { menus, auths, menuAuths }
  }

  /**
   * 生成动态路由配置
   * 基于菜单树生成Vue Router可用的路由配置
   */
  const generateDynamicRoutes = () => {
    const routes: DynamicRoute[] = []

    const convertMenuTreeToRoute = (menuTree: MenuTree, parentPath = ''): DynamicRoute => {
      const currentPath = menuTree.menu.isFirstLevel === 1 
        ? menuTree.menu.path 
        : `${parentPath}/${menuTree.menu.path}`.replace(/\/+/g, '/')
      
      const route: DynamicRoute = {
        path: currentPath,
        name: menuTree.menu.name,
        meta: {
          title: menuTree.menu.title,
          icon: menuTree.menu.icon,
          auths: menuTree.auths || [],
          menuId: menuTree.menu.id,
          requiresAuth: true,
          keepAlive: menuTree.menu.keepAlive === 1,
          isHide: menuTree.menu.isHide === 1,
          isIframe: menuTree.menu.isIframe === 1
        }
      }

      // 处理组件路径
      if (menuTree.menu.component && menuTree.menu.component !== '/index/index') {
        const componentPath = getComponentPath(menuTree.menu.component)
        route.component = () => import(/* @vite-ignore */ `@/views/${componentPath}.vue`).catch(() => {
          console.warn(`组件加载失败: @/views/${componentPath}.vue`)
          return import('@/views/common/under-development/index.vue')
        })
      } else {
        // 布局组件或父级菜单
        route.component = () => import('@/components/core/layouts/art-layouts/index.vue')
      }

      // 处理子路由
      if (menuTree.children && menuTree.children.length > 0) {
        route.children = menuTree.children.map(child => 
          convertMenuTreeToRoute(child, currentPath)
        )
      }

      return route
    }

    menuTrees.value.forEach(menuTree => {
      routes.push(convertMenuTreeToRoute(menuTree))
    })

    dynamicRoutes.value = routes
    console.log('动态路由生成完成:', routes)
  }

  /**
   * 获取组件路径
   * 将后端返回的组件路径转换为实际的文件路径
   */
  const getComponentPath = (componentPath: string): string => {
    // 如果后端直接返回完整路径，直接使用
    if (componentPath.startsWith('/')) {
      // 移除开头的斜杠，因为 @/views 已经包含了
      return componentPath.substring(1)
    }
    
    // 兼容旧的组件名映射方式
    const componentMap: Record<string, string> = {
      'Dashboard': 'dashboard/index',
      'DashboardConsole': 'dashboard/console/index',
      'DashboardAnalysis': 'dashboard/analysis/index',
      'Company': 'company/index',
      'CompanyList': 'company/list/index',
      'CompanyQualification': 'company/qualification/index',
      'SafetyLicense': 'company/safety-license/index',
      'CreditManual': 'company/credit-manual/index',
      'Permission': 'permission/index',
      'DataPermission': 'permission/data-permission/index',
      'UserSubordinate': 'permission/user-subordinate/index',
      'System': 'system/index',
      'SystemUser': 'system/user/index',
      'SystemRole': 'system/role/index',
      'SystemMenu': 'system/menu/index',
      'Dictionary': 'system/dictionary/index',
      'Workspace': 'workspace/index'
    }
    
    return componentMap[componentPath] || 'common/under-development'
  }

  /**
   * 检查菜单权限
   * @param menuId 菜单ID
   * @returns 是否有菜单权限
   */
  const hasMenuPermission = (menuId: string | number): boolean => {
    return flatPermissions.value.menus.has(menuId.toString())
  }

  /**
   * 检查按钮权限
   * @param authMark 权限标识（如：create, delete, edit, view）
   * @param menuId 可选的菜单ID，如果提供则检查特定菜单下的按钮权限
   * @returns 是否有按钮权限
   */
  const hasAuthPermission = (authMark: string, menuId?: string | number): boolean => {
    // 如果指定了菜单ID，检查特定菜单下的按钮权限
    if (menuId) {
      const menuAuthSet = flatPermissions.value.menuAuths.get(menuId.toString())
      return menuAuthSet ? menuAuthSet.has(authMark) : false
    }
    
    // 否则检查全局按钮权限
    return flatPermissions.value.auths.has(authMark)
  }

  /**
   * 获取菜单的所有按钮权限
   * @param menuId 菜单ID
   * @returns 按钮权限数组
   */
  const getMenuAuths = (menuId: string | number): MenuAuth[] => {
    const result: MenuAuth[] = []
    const targetId = typeof menuId === 'string' ? parseInt(menuId) : menuId
    
    const findMenuAuths = (menuTrees: MenuTree[]): void => {
      menuTrees.forEach(menuTree => {
        if (menuTree.menu.id === targetId && menuTree.auths) {
          result.push(...menuTree.auths)
        }
        
        if (menuTree.children && menuTree.children.length > 0) {
          findMenuAuths(menuTree.children)
        }
      })
    }
    
    findMenuAuths(menuTrees.value)
    return result
  }

  /**
   * 根据路径获取菜单ID
   * @param path 路由路径
   * @returns 菜单ID
   */
  const getMenuIdByPath = (path: string): string | null => {
    const findMenuByPath = (menuTree: MenuTree): string | null => {
      if (menuTree.menu.path === path) {
        return menuTree.menu.id.toString()
      }
      
      for (const child of menuTree.children) {
        const result = findMenuByPath(child)
        if (result) return result
      }
      
      return null
    }

    for (const menuTree of menuTrees.value) {
      const menuId = findMenuByPath(menuTree)
      if (menuId) return menuId
    }
    
    return null
  }

  /**
   * 清空权限信息
   */
  const clearPermissions = () => {
    userPermissionInfo.value = null
    menuTrees.value = []
    flatPermissions.value = {
      menus: new Set(),
      auths: new Set(),
      menuAuths: new Map()
    }
    dynamicRoutes.value = []
  }

  /**
   * 刷新权限信息
   * 重新从服务器获取最新的权限数据
   */
  const refreshPermissions = async () => {
    clearPermissions()
    await fetchUserPermissions()
  }

  return {
    // 状态
    userPermissionInfo,
    menuTrees,
    flatPermissions,
    dynamicRoutes,
    
    // 计算属性
    roleInfo,
    isPermissionLoaded,
    
    // 方法
    fetchUserPermissions,
    generateFlatPermissions,
    generateDynamicRoutes,
    getComponentPath,
    hasMenuPermission,
    hasAuthPermission,
    getMenuAuths,
    getMenuIdByPath,
    clearPermissions,
    refreshPermissions
  }
})
