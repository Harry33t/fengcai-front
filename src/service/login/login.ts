import hyRequest from '../index'

import { IAccount, ILoginResult, IUserInfo } from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/user/login',
  LoginUserInfo = '/user/info',
  UserMenus = '/user/menus',
  Logout = '/user/logout',
  RefreshToken = '/user/refresh'
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfo() {
  return hyRequest.get<IDataType<IUserInfo>>({
    url: LoginAPI.LoginUserInfo,
    showLoading: false
  })
}

export function requestUserMenus() {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus,
    showLoading: false
  })
}

export function logoutRequest() {
  return hyRequest.post<IDataType>({
    url: LoginAPI.Logout,
    showLoading: false
  })
}

export function refreshTokenRequest() {
  return hyRequest.post<IDataType<{ token: string; refreshToken?: string }>>({
    url: LoginAPI.RefreshToken,
    showLoading: false
  })
}
