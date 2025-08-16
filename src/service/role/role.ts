/**
 * 角色和权限管理 API
 * 基于 Cauchy API 文档规范实现
 */

import hyRequest from '../index'
import { IDataType } from '../types'
import {
  IRole,
  ICreateRoleParams,
  IUpdateRoleParams,
  IRolePermissions,
  IButtonAuth,
  ICreateButtonAuthParams,
  IUpdateButtonAuthParams,
  IRoleListParams
} from './type'

enum RoleAPI {
  // 角色管理
  GetRoleList = '/roles',
  CreateRole = '/role',
  GetRoleDetail = '/role',
  UpdateRole = '/role',
  DeleteRole = '/role',
  
  // 角色权限管理
  GetRolePermissions = '/role/permissions',
  UpdateRolePermissions = '/role/permissions',
  
  // 按钮权限管理
  CreateButtonAuth = '/menu/auth',
  UpdateButtonAuth = '/menu/auth',
  GetButtonAuthList = '/menu/auth',
  DeleteButtonAuth = '/menu/auth'
}

// ==================== 角色管理相关 ====================

/**
 * 获取角色列表
 */
export function getRoleListRequest(params?: IRoleListParams) {
  return hyRequest.get<IDataType<{ roles: IRole[]; total: number }>>({
    url: RoleAPI.GetRoleList,
    params
  })
}

/**
 * 创建角色
 */
export function createRoleRequest(params: ICreateRoleParams) {
  return hyRequest.post<IDataType<IRole>>({
    url: RoleAPI.CreateRole,
    data: params
  })
}

/**
 * 获取角色详情
 */
export function getRoleDetailRequest(id: string) {
  return hyRequest.get<IDataType<IRole>>({
    url: RoleAPI.GetRoleDetail,
    params: { id }
  })
}

/**
 * 更新角色
 */
export function updateRoleRequest(params: IUpdateRoleParams) {
  return hyRequest.put<IDataType<IRole>>({
    url: RoleAPI.UpdateRole,
    data: params
  })
}

/**
 * 删除角色
 */
export function deleteRoleRequest(id: string) {
  return hyRequest.delete<IDataType>({
    url: RoleAPI.DeleteRole,
    params: { id }
  })
}

// ==================== 角色权限管理相关 ====================

/**
 * 获取角色权限
 */
export function getRolePermissionsRequest(roleId: string) {
  return hyRequest.get<IDataType<IRolePermissions>>({
    url: RoleAPI.GetRolePermissions,
    params: { roleId }
  })
}

/**
 * 更新角色权限
 */
export function updateRolePermissionsRequest(params: IRolePermissions) {
  return hyRequest.put<IDataType>({
    url: RoleAPI.UpdateRolePermissions,
    data: params
  })
}

// ==================== 按钮权限管理相关 ====================

/**
 * 创建按钮权限
 */
export function createButtonAuthRequest(params: ICreateButtonAuthParams) {
  return hyRequest.post<IDataType<IButtonAuth>>({
    url: RoleAPI.CreateButtonAuth,
    data: params
  })
}

/**
 * 更新按钮权限
 */
export function updateButtonAuthRequest(params: IUpdateButtonAuthParams) {
  return hyRequest.put<IDataType<IButtonAuth>>({
    url: RoleAPI.UpdateButtonAuth,
    data: params
  })
}

/**
 * 获取按钮权限列表
 */
export function getButtonAuthListRequest(menuId?: string) {
  return hyRequest.get<IDataType<{ auths: IButtonAuth[]; total: number }>>({
    url: RoleAPI.GetButtonAuthList,
    params: menuId ? { menuId } : undefined
  })
}

/**
 * 删除按钮权限
 */
export function deleteButtonAuthRequest(id: string) {
  return hyRequest.delete<IDataType>({
    url: RoleAPI.DeleteButtonAuth,
    params: { id }
  })
}
