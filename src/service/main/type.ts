// 企业相关类型定义
export interface IEnterprise {
  id: number
  name: string
  type: string
  contact_person: string
  contact_phone: string
  address?: string
  registration_number?: string
  legal_representative?: string
  business_scope?: string
  safety_license?: string
  credit_manual?: string
  customer_attribution?: string
  status: number
  created_at: number
  updated_at: number
}

export interface IEnterpriseListParams {
  page?: number
  pageSize?: number
  name?: string
  type?: string
  status?: number
  safety_license?: string
  credit_manual?: string
  customer_attribution?: string
}

export interface ICreateEnterpriseParams {
  name: string
  type: string
  contact_person: string
  contact_phone: string
  address?: string
  registration_number?: string
  legal_representative?: string
  business_scope?: string
  safety_license?: string
  credit_manual?: string
  customer_attribution?: string
  status?: number
}

export interface IUpdateEnterpriseParams {
  id: string
  name?: string
  type?: string
  contact_person?: string
  contact_phone?: string
  address?: string
  registration_number?: string
  legal_representative?: string
  business_scope?: string
  safety_license?: string
  credit_manual?: string
  customer_attribution?: string
  status?: number
}

// 用户管理相关类型定义
export interface IUser {
  id: number
  username: string
  email?: string
  nickname?: string
  avatar?: string
  status: number
  roles?: string[]
  permissions?: string[]
  created_at: number
  updated_at: number
}

export interface IUserListParams {
  page?: number
  pageSize?: number
  username?: string
  email?: string
  status?: number
}

export interface ICreateUserParams {
  username: string
  password: string
  email?: string
  nickname?: string
  status?: number
}

export interface IUpdateUserParams {
  id: string
  username?: string
  email?: string
  nickname?: string
  status?: number
}

// 菜单相关类型定义
export interface IMenu {
  id: number
  path: string
  name: string
  component: string
  title: string
  icon: string
  show_badge: number
  is_hide: number
  is_hide_tab: number
  is_iframe: number
  keep_alive: number
  is_first_level: number
  status: number
  level: number
  sort: number
  created_at: number
  updated_at: number
  parent_id: number
  children?: IMenu[]
}

export interface ICreateMenuParams {
  path: string
  name: string
  component: string
  title: string
  icon?: string
  show_badge?: number
  is_hide?: number
  is_hide_tab?: number
  is_iframe?: number
  keep_alive?: number
  is_first_level?: number
  status?: number
  level?: number
  sort?: number
  parent_id?: number
}

export interface IUpdateMenuParams {
  id: string
  path?: string
  name?: string
  component?: string
  title?: string
  icon?: string
  showBadge?: string
  showTextBadge?: string
  isHide?: string
  isHideTab?: string
  link?: string
  isIframe?: string
  keepAlive?: string
  isFirstLevel?: string
  status?: string
  level?: string
  sort?: string
  parentId?: string
}
