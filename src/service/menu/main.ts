import hyRequest from '../index'
import { IDataType } from '../types'
import {
  IMenuItem,
  IMenuListParams,
  IMenuListResponse,
  ICreateMenuParams,
  IUpdateMenuParams,
  IButtonAuth,
  ICreateButtonAuthParams,
  IUpdateButtonAuthParams
} from './type'

enum MenuAPI {
  // 菜单管理相关
  CreateMenu = '/menu',
  GetMenuDetail = '/menu',
  UpdateMenu = '/menu',
  DeleteMenu = '/menu',
  GetMenuList = '/menus',
  
  // 按钮权限相关
  CreateButtonAuth = '/menu/auth',
  GetButtonAuthList = '/menu/auth',
  UpdateButtonAuth = '/menu/auth',
  DeleteButtonAuth = '/menu/auth'
}

// ==================== 菜单管理相关 ====================

/**
 * 获取菜单列表
 */
export function getMenuListRequest(params?: IMenuListParams) {
  return hyRequest.get<IDataType<IMenuListResponse>>({
    url: MenuAPI.GetMenuList,
    params
  })
}

/**
 * 获取菜单详情
 */
export function getMenuDetailRequest(id: string | number) {
  return hyRequest.get<IDataType<IMenuItem>>({
    url: MenuAPI.GetMenuDetail,
    params: { id: String(id) }
  })
}

/**
 * 创建菜单
 */
export function createMenuRequest(params: ICreateMenuParams) {
  return hyRequest.post<IDataType<IMenuItem>>({
    url: MenuAPI.CreateMenu,
    data: params
  })
}

/**
 * 更新菜单
 */
export function updateMenuRequest(params: IUpdateMenuParams) {
  return hyRequest.put<IDataType<IMenuItem>>({
    url: MenuAPI.UpdateMenu,
    data: params
  })
}

/**
 * 删除菜单
 */
export function deleteMenuRequest(id: string | number) {
  return hyRequest.delete<IDataType<null>>({
    url: MenuAPI.DeleteMenu,
    params: { id: String(id) }
  })
}

// ==================== 按钮权限相关 ====================

/**
 * 获取按钮权限列表
 */
export function getButtonAuthListRequest(menuId?: string | number) {
  return hyRequest.get<IDataType<IButtonAuth[]>>({
    url: MenuAPI.GetButtonAuthList,
    params: menuId ? { menuId } : undefined
  })
}

/**
 * 创建按钮权限
 */
export function createButtonAuthRequest(params: ICreateButtonAuthParams) {
  return hyRequest.post<IDataType<IButtonAuth>>({
    url: MenuAPI.CreateButtonAuth,
    data: params
  })
}

/**
 * 更新按钮权限
 */
export function updateButtonAuthRequest(params: IUpdateButtonAuthParams) {
  return hyRequest.put<IDataType<IButtonAuth>>({
    url: `${MenuAPI.UpdateButtonAuth}/${params.id}`,
    data: params
  })
}

/**
 * 删除按钮权限
 */
export function deleteButtonAuthRequest(id: string | number) {
  return hyRequest.delete<IDataType<null>>({
    url: `${MenuAPI.DeleteButtonAuth}/${id}`
  })
}
