/**
 * 按钮权限管理 API 接口层
 * 职责：纯接口调用，不包含业务逻辑
 */
import hyRequest from '@/service/index'
import { IDataType } from '@/service/types'
import type {
  IButtonAuth,
  IButtonAuthListResponse,
  ICreateButtonAuthParams,
  IUpdateButtonAuthParams,
  IMenuAuthListParams
} from '@/service/menu/type'

/**
 * 按钮权限管理 API
 */
export const menuAuthApi = {
  /**
   * 获取菜单的按钮权限列表
   */
  getMenuAuths: (params: IMenuAuthListParams) => {
    console.log('调用获取按钮权限API，参数:', params)
    return hyRequest.get<IDataType<IButtonAuthListResponse>>({
      url: '/menu/auths',
      params
    })
  },

  /**
   * 创建按钮权限
   */
  createAuth: (data: ICreateButtonAuthParams) => {
    console.log('调用创建按钮权限API，数据:', data)
    return hyRequest.post<IDataType<IButtonAuth>>({
      url: '/menu/auth',
      data
    })
  },

  /**
   * 更新按钮权限
   */
  updateAuth: (data: IUpdateButtonAuthParams) => {
    console.log('调用更新按钮权限API，数据:', data)
    return hyRequest.put<IDataType<IButtonAuth>>({
      url: '/menu/auth',
      data: {
        id: String(data.id),
        menuId: String(data.menuId),
        mark: data.mark,
        title: data.title
      }
    })
  },

  /**
   * 删除按钮权限
   */
  deleteAuth: (id: string | number) => {
    return hyRequest.delete<IDataType<any>>({
      url: '/menu/auth',
      params: { id: String(id) }
    })
  }
}