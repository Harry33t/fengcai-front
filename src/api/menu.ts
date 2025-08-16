/**
 * 菜单管理 API 接口层
 * 职责：纯接口调用，不包含业务逻辑
 */
import hyRequest from '@/service/index'
import { IDataType } from '@/service/types'
import type {
  IMenuItem,
  IMenuListParams,
  IMenuListResponse,
  ICreateMenuParams,
  IUpdateMenuParams
} from '@/service/menu/type'

/**
 * 菜单管理 API
 */
export const menuApi = {
  /**
   * 获取菜单列表
   */
  getList: (params?: IMenuListParams) => {
    return hyRequest.get<IDataType<IMenuListResponse>>({
      url: '/menus',
      params
    })
  },

  /**
   * 获取菜单详情
   */
  getDetail: (id: string | number) => {
    return hyRequest.get<IDataType<IMenuItem>>({
      url: '/menu',
      params: { id: String(id) }
    })
  },

  /**
   * 创建菜单
   */
  create: (data: ICreateMenuParams) => {
    return hyRequest.post<IDataType<IMenuItem>>({
      url: '/menu',
      data
    })
  },

  /**
   * 更新菜单
   */
  update: (data: IUpdateMenuParams) => {
    return hyRequest.put<IDataType<IMenuItem>>({
      url: '/menu',
      data
    })
  },

  /**
   * 删除菜单
   */
  delete: (id: string | number) => {
    return hyRequest.delete<IDataType<any>>({
      url: '/menu',
      params: { id: String(id) }
    })
  }
}
