// 菜单管理相关类型定义

export interface IMenuItem {
  id: number
  path: string
  name: string
  component: string
  title: string
  icon?: string
  showBadge: number
  isHide: number
  isHideTab: number
  isIframe: number
  keepAlive: number
  isFirstLevel: number
  status: number
  level: number
  parentId?: number
  sort: number
  createdTime: number
  updatedTime: number
  children?: IMenuItem[]
}

// 菜单列表查询参数
export interface IMenuListParams {
  page?: number
  pageSize?: number
  title?: string
  status?: number
  parentId?: number
  level?: number
}

// 创建菜单参数
export interface ICreateMenuParams {
  path: string
  name: string
  component: string
  title: string
  icon?: string
  showBadge?: number
  isHide?: number
  isHideTab?: number
  isIframe?: number
  keepAlive?: number
  isFirstLevel: number
  status?: number
  level: number
  parentId?: number
  sort?: number
}

// 更新菜单参数
export interface IUpdateMenuParams {
  id: string
  path?: string
  name?: string
  component?: string
  title?: string
  icon?: string
  showBadge?: number
  isHide?: number
  isHideTab?: number
  isIframe?: number
  keepAlive?: number
  isFirstLevel?: number
  status?: number
  level?: number
  parentId?: number
  sort?: number
}

// 菜单列表响应
export interface IMenuListResponse {
  menus: IMenuItem[]
  total: number
}

// 按钮权限相关类型
export interface IButtonAuth {
  id: number
  menuId: number
  mark: string
  title: string
  createdTime: number
  updatedTime: number
}

// 创建按钮权限参数
export interface ICreateButtonAuthParams {
  menuId: number
  mark: string
  title: string
}

// 更新按钮权限参数
export interface IUpdateButtonAuthParams {
  id: string
  menuId: string | number
  mark: string
  title: string
}

// 按钮权限列表响应
export interface IButtonAuthListResponse {
  auths: IButtonAuth[]
  total: number
}

// 菜单按钮权限查询参数
export interface IMenuAuthListParams {
  menuId: string | number
}
