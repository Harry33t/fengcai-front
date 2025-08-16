/**
 * Òr¡ API ¥ãB
 * L#¯¥ã(+¡;‘
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
 * Òr¡ API
 */
export const roleApi = {
  /**
   * ·ÖÒrh
   */
  getRoles: (params?: IRoleListParams) => {
    console.log('(·ÖÒrhAPIÂp:', params)
    return hyRequest.get<IDataType<IRoleListResponse>>({
      url: '/roles',
      params
    })
  },

  /**
   * ·ÖÒræÅ
   */
  getRole: (id: string) => {
    console.log('(·ÖÒræÅAPIid:', id)
    return hyRequest.get<IDataType<IRole>>({
      url: '/role',
      params: { id }
    })
  },

  /**
   * úÒr
   */
  createRole: (data: ICreateRoleParams) => {
    console.log('(úÒrAPIpn:', data)
    return hyRequest.post<IDataType<IRole>>({
      url: '/role',
      data
    })
  },

  /**
   * ô°Òr
   */
  updateRole: (data: IUpdateRoleParams) => {
    console.log('(ô°ÒrAPIpn:', data)
    return hyRequest.put<IDataType<IRole>>({
      url: '/role',
      data
    })
  },

  /**
   *  dÒr
   */
  deleteRole: (id: string) => {
    console.log('( dÒrAPIid:', id)
    return hyRequest.delete<IDataType<any>>({
      url: '/role',
      params: { id }
    })
  },

  /**
   * ·ÖÒrCP
   */
  getRolePermissions: (params: IRolePermissionParams) => {
    console.log('(·ÖÒrCPAPIÂp:', params)
    return hyRequest.get<IDataType<IRolePermissionResponse>>({
      url: '/role/permissions',
      params
    })
  },

  /**
   * ô°ÒrCP
   */
  updateRolePermissions: (data: IUpdateRolePermissionParams) => {
    console.log('(ô°ÒrCPAPIpn:', data)
    return hyRequest.put<IDataType<any>>({
      url: '/role/permissions',
      data
    })
  }
}