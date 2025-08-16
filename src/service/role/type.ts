// 角色管理相关类型定义

export interface IRole {
  id: number
  name: string
  desc?: string
  status: number
  createdTime: number
  updatedTime: number
}

// 用户信息
export interface IUser {
  id: number
  username: string
  name: string
}

// 角色与用户的关联数据
export interface IRoleWithUsers {
  role: IRole
  users: IUser[]
}

// 角色列表查询参数
export interface IRoleListParams {
  page?: number
  pageSize?: number
  name?: string
  status?: number
}

// 创建角色参数
export interface ICreateRoleParams {
  name: string
  desc: string
  status: string
}

// 更新角色参数
export interface IUpdateRoleParams {
  id: string
  name: string
  desc: string
  status: string
}

// 角色列表响应
export interface IRoleListResponse {
  roles: IRoleWithUsers[]
  total: number
}

// 角色权限查询参数
export interface IRolePermissionParams {
  roleId: string
}

// 角色权限更新参数
export interface IUpdateRolePermissionParams {
  roleId: string
  menuIds: string[]
  authIds: string[]
}

// 菜单信息
export interface IMenu {
  id: number
  path: string
  name: string
  component: string
  title: string
  showBadge?: number
  isHide?: number
  isHideTab?: number
  isIframe?: number
  keepAlive?: number
  isFirstLevel?: number
  status: number
  level?: number
  parentId?: number
  sort: number
  createdTime: number
  updatedTime: number
}

// 按钮权限信息
export interface IAuth {
  id: number
  menuId: number
  mark: string
  title: string
  createdTime: number
  updatedTime: number
}

// 菜单树节点
export interface IMenuTreeNode {
  menu: IMenu
  hasPermission?: boolean
  children?: Array<{
    menu: IMenu
    hasPermission?: boolean
    auths?: Array<{
      auth: IAuth
    }>
    children?: IMenuTreeNode[]
  }>
  auths?: Array<{
    auth: IAuth
  }>
}

// 角色权限响应
export interface IRolePermissionResponse {
  menuTrees: IMenuTreeNode[]
}