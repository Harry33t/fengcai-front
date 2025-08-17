// 企业相关类型定义
export interface IEnterprise {
  id: number
  name: string
  socialCreditCode?: string
  address?: string
  contactPerson: string
  contactPhone: string
  customerType?: string
  companyTypes?: string[]
  status?: number
  created_at?: number
  updated_at?: number
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
  socialCreditCode: string
  address?: string
  contactPerson: string
  contactPhone: string
  customerType: string
  companyTypes: string[]
}

export interface IUpdateEnterpriseParams {
  id: string
  name?: string
  socialCreditCode?: string
  address?: string
  contactPerson?: string
  contactPhone?: string
  customerType?: string
  companyTypes?: string[]
}

// 企业资质相关类型定义
export interface ICompanyQualification {
  id?: number
  companyId: string
  qualificationType: string
  qualificationSeries: string
  qualificationCategory: string
  grade: string
  certificateNumber: string
  issuingAuthority: string
  validUntil: number
  createdAt?: number
  updatedAt?: number
}

export interface ICreateCompanyQualificationParams {
  companyId: string
  qualificationType: string
  qualificationSeries: string
  qualificationCategory: string
  grade: string
  certificateNumber: string
  issuingAuthority: string
  validUntil: number
}

export interface IUpdateCompanyQualificationParams {
  id: number
  companyId?: string
  qualificationType?: string
  qualificationSeries?: string
  qualificationCategory?: string
  grade?: string
  certificateNumber?: string
  issuingAuthority?: string
  validUntil?: number
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
