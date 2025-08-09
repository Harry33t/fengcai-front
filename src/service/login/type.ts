export interface IAccount {
  username: string
  password: string
}

export interface ILoginResult {
  token: string
  refreshToken?: string
  user: IUserInfo
}

export interface IUserInfo {
  id: number
  username: string
  email?: string
  nickname?: string
  avatar?: string
  status: number
  roles?: string[]
  permissions?: string[]
  created_at: number
  updated_at: number
}
