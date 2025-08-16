/**
 * �r� API ��B
 * L#���(+�;�
 */
import hyRequest from '@/service/index'
import { IDataType } from '@/service/types'
import type {
  IRole,
  IRoleListParams,
  IRoleListResponse,
  ICreateRoleParams,
  IUpdateRoleParams,
  IRolePermissionParams,
  IUpdateRolePermissionParams,
  IRolePermissionResponse
} from '@/service/role/type'

/**
 * �r� API
 */
export const roleApi = {
  /**
   * ���rh
   */
  getRoles: (params?: IRoleListParams) => {
    console.log('(���rhAPI�p:', params)
    return hyRequest.get<IDataType<IRoleListResponse>>({
      url: '/roles',
      params
    })
  },

  /**
   * ���r��
   */
  getRole: (id: string) => {
    console.log('(���r��APIid:', id)
    return hyRequest.get<IDataType<IRole>>({
      url: '/role',
      params: { id }
    })
  },

  /**
   * ��r
   */
  createRole: (data: ICreateRoleParams) => {
    console.log('(��rAPIpn:', data)
    return hyRequest.post<IDataType<IRole>>({
      url: '/role',
      data
    })
  },

  /**
   * ���r
   */
  updateRole: (data: IUpdateRoleParams) => {
    console.log('(���rAPIpn:', data)
    return hyRequest.put<IDataType<IRole>>({
      url: '/role',
      data
    })
  },

  /**
   *  d�r
   */
  deleteRole: (id: string) => {
    console.log('( d�rAPIid:', id)
    return hyRequest.delete<IDataType<any>>({
      url: '/role',
      params: { id }
    })
  },

  /**
   * ���rCP
   */
  getRolePermissions: (params: IRolePermissionParams) => {
    console.log('(���rCPAPI�p:', params)
    return hyRequest.get<IDataType<IRolePermissionResponse>>({
      url: '/role/permissions',
      params
    })
  },

  /**
   * ���rCP
   */
  updateRolePermissions: (data: IUpdateRolePermissionParams) => {
    console.log('(���rCPAPIpn:', data)
    return hyRequest.put<IDataType<any>>({
      url: '/role/permissions',
      data
    })
  }
}