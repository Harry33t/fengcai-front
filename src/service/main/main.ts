import hyRequest from '../index'
import { IDataType } from '../types'
import {
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
} from './type'

enum MainAPI {
  // 企业管理相关
  CreateEnterprise = '/enterprise',
  GetEnterpriseDetail = '/enterprise',
  UpdateEnterprise = '/enterprise',
  DeleteEnterprise = '/enterprise',
  GetEnterpriseList = '/enterprises',
  GetEnterpriseStats = '/enterprise/stats',
  ImportEnterprises = '/enterprise/import',
  ExportEnterprises = '/enterprise/export',

  // 用户管理相关
  CreateUser = '/user',
  GetUserDetail = '/user',
  UpdateUser = '/user',
  DeleteUser = '/user',
  GetUserList = '/users',

  // 菜单管理相关
  CreateMenu = '/menu',
  GetMenuDetail = '/menu',
  UpdateMenu = '/menu',
  DeleteMenu = '/menu',
  GetMenuList = '/menus'
}

// ==================== 企业管理相关 ====================

export function createEnterpriseRequest(params: ICreateEnterpriseParams) {
  return hyRequest.post<IDataType<IEnterprise>>({
    url: MainAPI.CreateEnterprise,
    data: params
  })
}

export function getEnterpriseDetailRequest(id: string) {
  return hyRequest.get<IDataType<IEnterprise>>({
    url: MainAPI.GetEnterpriseDetail,
    params: { id }
  })
}

export function updateEnterpriseRequest(params: IUpdateEnterpriseParams) {
  return hyRequest.put<IDataType<IEnterprise>>({
    url: MainAPI.UpdateEnterprise,
    data: params
  })
}

export function deleteEnterpriseRequest(id: string) {
  return hyRequest.delete<IDataType>({
    url: MainAPI.DeleteEnterprise,
    params: { id }
  })
}

export function getEnterpriseListRequest(params: IEnterpriseListParams) {
  return hyRequest.get<IDataType<{ enterprises: IEnterprise[]; total: number }>>({
    url: MainAPI.GetEnterpriseList,
    params
  })
}

export function getEnterpriseStatsRequest() {
  return hyRequest.get<IDataType<{
    total: number
    active: number
    inactive: number
    withSafetyLicense: number
    withCreditManual: number
  }>>({
    url: MainAPI.GetEnterpriseStats
  })
}

export function importEnterprisesRequest(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  
  return hyRequest.post<IDataType<{
    success: number
    failed: number
    errors: string[]
  }>>({
    url: MainAPI.ImportEnterprises,
    data: formData
  })
}

export function exportEnterprisesRequest(params?: IEnterpriseListParams) {
  return hyRequest.get<Blob>({
    url: MainAPI.ExportEnterprises,
    params
  })
}

// ==================== 用户管理相关 ====================

export function createUserRequest(params: ICreateUserParams) {
  return hyRequest.post<IDataType<IUser>>({
    url: MainAPI.CreateUser,
    data: params
  })
}

export function getUserDetailRequest(id: string) {
  return hyRequest.get<IDataType<IUser>>({
    url: MainAPI.GetUserDetail,
    params: { id }
  })
}

export function updateUserRequest(params: IUpdateUserParams) {
  return hyRequest.put<IDataType<IUser>>({
    url: MainAPI.UpdateUser,
    data: params
  })
}

export function deleteUserRequest(id: string) {
  return hyRequest.delete<IDataType>({
    url: MainAPI.DeleteUser,
    params: { id }
  })
}

export function getUserListRequest(params: IUserListParams) {
  return hyRequest.get<IDataType<{ users: IUser[]; total: number }>>({
    url: MainAPI.GetUserList,
    params
  })
}

// ==================== 菜单管理相关 ====================

export function createMenuRequest(params: ICreateMenuParams) {
  return hyRequest.post<IDataType<IMenu>>({
    url: MainAPI.CreateMenu,
    data: params
  })
}

export function getMenuDetailRequest(id: string) {
  return hyRequest.get<IDataType<{ menus: IMenu[]; total: number }>>({
    url: MainAPI.GetMenuDetail,
    params: { id }
  })
}

export function updateMenuRequest(params: IUpdateMenuParams) {
  return hyRequest.put<IDataType<IMenu>>({
    url: MainAPI.UpdateMenu,
    data: params
  })
}

export function deleteMenuRequest(id: string) {
  return hyRequest.delete<IDataType>({
    url: MainAPI.DeleteMenu,
    params: { id }
  })
}

export function getMenuListRequest(params?: { id?: string; parent_id?: number; level?: number; status?: number }) {
  return hyRequest.get<IDataType<{ menus: IMenu[]; total: number }>>({
    url: MainAPI.GetMenuList,
    params
  })
}
