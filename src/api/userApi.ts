import hyRequest from '@/service/index'
import type { IDataType } from '@/service/types'

/**
 * 用户管理API接口
 */

// 用户基础信息类型
export interface IUser {
  id: number
  username: string
  name: string
  phone: string
  gender: number // 1: 男, 2: 女
  status: number // 1: 启用, 0: 禁用
  roleId: number
  createdTime: number
  updatedTime: number
}

// 用户管理列表项
export interface IUserItem {
  user: IUser
  roleName: string
  roleDesc: string
  subordinates?: IUser[]
  manager?: IUser
}

// 用户列表响应
export interface IUserListResponse {
  users: IUserItem[]
  total: number
}

// 创建用户请求
export interface ICreateUserRequest {
  username: string
  password: string
  name: string
  phone: string
  gender: string | number
  status: string | number
  roleId: string | number
  manageId?: string | number
}

// 更新用户请求
export interface IUpdateUserRequest {
  id: string | number
  username?: string
  name?: string
  phone?: string
  gender?: string | number
  status?: string | number
  roleId?: string | number
  manageId?: string | number
}

// 用户查询参数
export interface IUserQueryParams {
  page?: number
  pageSize?: number
  username?: string
  name?: string
  status?: number
  [key: string]: any // 允许动态添加/删除属性
}

/**
 * 获取用户列表
 */
export function getUserList(params?: IUserQueryParams) {
  return hyRequest.get<IDataType<IUserListResponse>>({
    url: '/users',
    params
  })
}

/**
 * 获取用户详情
 */
export function getUserDetail(id: string | number) {
  return hyRequest.get<IDataType<IUser>>({
    url: '/user',
    params: { id }
  })
}

/**
 * 创建用户
 */
export function createUser(data: ICreateUserRequest) {
  return hyRequest.post<IDataType<any>>({
    url: '/user',
    data
  })
}

/**
 * 更新用户
 */
export function updateUser(data: IUpdateUserRequest) {
  return hyRequest.put<IDataType<any>>({
    url: '/user',
    data
  })
}

/**
 * 删除用户
 */
export function deleteUser(id: string | number) {
  return hyRequest.delete<IDataType<any>>({
    url: '/user',
    params: { id }
  })
}

/**
 * 重置用户密码
 */
export function resetUserPassword(id: string | number, newPassword: string) {
  return hyRequest.put<IDataType<any>>({
    url: '/user/reset-password',
    data: { id, password: newPassword }
  })
}