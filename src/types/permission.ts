/**
 * 权限管理相关类型定义
 */

// 菜单权限信息
export interface MenuAuth {
  id: string
  menuId: string
  mark: string // 权限标识：create, delete, edit, view 等
  title: string // 权限名称
  createdTime?: string
  updatedTime?: string
}

// 带权限标记的按钮权限
export interface MenuAuthWithPermission {
  auth: MenuAuth
  hasPermission: boolean
}

// 菜单信息
export interface Menu {
  id: number
  path: string // 前端路由路径
  name: string // 路由名称
  component: string // Vue组件名
  title: string // 菜单显示标题
  icon?: string // 菜单图标
  showBadge?: number
  showTextBadge?: string
  isHide?: number
  isHideTab?: number
  link?: string
  isIframe?: number
  keepAlive?: number
  isFirstLevel?: number
  status?: number
  level?: number
  parentId?: number
  sort?: number
  createdTime?: number
  updatedTime?: number
}

// 菜单树结构
export interface MenuTree {
  menu: Menu
  children: MenuTree[]
  auths: MenuAuth[]
}

// 带权限标记的菜单树
export interface MenuWithPermission {
  menu: Menu
  hasPermission: boolean
  children: MenuWithPermission[]
  auths: MenuAuthWithPermission[]
}

// 用户权限信息（从 /user/info 接口获取）
export interface IUserPermissionInfo {
  id: number
  username: string
  name: string
  phone: string
  gender: number
  status: number
  createdTime: number
  updatedTime: number
  roleId: number
  roleName: string
  roleDesc: string
  subordinates?: Array<{
    id: number
    username: string
    name: string
    phone: string
    gender: number
    status: number
    roleId: number
    createdTime: number
    updatedTime: number
  }>
  menuTrees: MenuTree[] // 用户有权限的菜单树
}

// 角色权限信息
export interface RolePermissions {
  menuTrees: MenuWithPermission[]
}

// 权限更新请求
export interface UpdateRolePermissionsRequest {
  roleId: string
  menuIds: string[]
  authIds: string[]
}

// 扁平化的权限集合（用于快速权限检查）
export interface FlatPermissions {
  menus: Set<string> // 菜单ID集合
  auths: Set<string> // 按钮权限标识集合
  menuAuths: Map<string, Set<string>> // 菜单ID -> 按钮权限标识集合的映射
}

// 动态路由配置
export interface DynamicRoute {
  path: string
  name: string
  component?: () => Promise<any>
  meta: {
    title: string
    icon?: string
    auths: MenuAuth[]
    menuId: number
    requiresAuth: boolean
    keepAlive?: boolean
    isHide?: boolean
    isIframe?: boolean
  }
  children?: DynamicRoute[]
}
