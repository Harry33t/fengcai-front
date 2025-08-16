/**
 * API 统一导出文件
 * 基于 Cauchy API 规范和 vue3-ts-cms13 架构设计
 */

// 导出登录相关 API
export {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenus,
  logoutRequest,
  refreshTokenRequest
} from './login/login'

// 导出主要业务 API
export {
  // 企业管理
  createEnterpriseRequest,
  getEnterpriseDetailRequest,
  updateEnterpriseRequest,
  deleteEnterpriseRequest,
  getEnterpriseListRequest,
  getEnterpriseStatsRequest,
  importEnterprisesRequest,
  exportEnterprisesRequest,
  
  // 用户管理
  createUserRequest,
  getUserDetailRequest,
  updateUserRequest,
  deleteUserRequest,
  getUserListRequest,
  
  // 菜单管理
  createMenuRequest,
  getMenuDetailRequest,
  updateMenuRequest,
  deleteMenuRequest,
  getMenuListRequest
} from './main/main'

// 导出角色和权限管理 API
// 注意：角色管理API已迁移到 /src/api/roleApi.ts
// export {
//   // 角色管理
//   getRoleListRequest,
//   createRoleRequest,
//   getRoleDetailRequest,
//   updateRoleRequest,
//   deleteRoleRequest,
//   
//   // 角色权限管理
//   getRolePermissionsRequest,
//   updateRolePermissionsRequest,
//   
//   // 按钮权限管理
//   createButtonAuthRequest,
//   updateButtonAuthRequest,
//   getButtonAuthListRequest,
//   deleteButtonAuthRequest
// } from './role/role'

// 导出类型定义
export type {
  // 通用类型
  IDataType
} from './types'

export type {
  // 登录相关类型
  IAccount,
  ILoginResult,
  IUserInfo
} from './login/type'

export type {
  // 主要业务类型
  IEnterprise,
  IEnterpriseListParams,
  ICreateEnterpriseParams,
  IUpdateEnterpriseParams,
  IUser,
  IUserListParams,
  ICreateUserParams,
  IUpdateUserParams,
  IMenu,
  ICreateMenuParams,
  IUpdateMenuParams
} from './main/type'

export type {
  // 角色和权限管理类型
  IRole,
  ICreateRoleParams,
  IUpdateRoleParams,
  IRolePermissions,
  IButtonAuth,
  ICreateButtonAuthParams,
  IUpdateButtonAuthParams,
  IRoleListParams
} from './role/type'

// 导出请求实例
export { default as hyRequest } from './index'
