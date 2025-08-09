/**
 * 账户管理相关逻辑
 */
import { computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { accountsConfig, loginFormConfig } from '../config'

export type AccountKey = 'super' | 'admin' | 'user'

export interface Account {
  key: AccountKey
  label: string
  userName: string
  password: string
  roles: string[]
}

export function useAccountManager() {
  const { t } = useI18n()

  // 使用配置文件中的账户列表，支持国际化
  const accounts = computed<Account[]>(() => [
    {
      key: 'super',
      label: t('login.accountType.super') || 'Super',
      userName: 'ceo',
      password: '123456',
      roles: ['R_SUPER']
    },
    {
      key: 'admin',
      label: t('login.accountType.admin') || 'Admin',
      userName: 'admin',
      password: '123456',
      roles: ['R_ADMIN']
    },
    {
      key: 'user',
      label: t('login.accountType.user') || 'User',
      userName: 'user',
      password: '123456',
      roles: ['R_USER']
    }
  ])

  // 使用配置文件中的表单初始数据
  const formData = reactive({
    username: loginFormConfig.username,
    password: loginFormConfig.password,
    captcha: loginFormConfig.captcha,
    rememberPassword: loginFormConfig.rememberPassword
  })

  // 设置账号
  const setupAccount = (key: AccountKey) => {
    const selectedAccount = accounts.value.find((account: Account) => account.key === key)
    formData.username = selectedAccount?.userName ?? ''
    formData.password = selectedAccount?.password ?? ''
  }

  return {
    accounts,
    formData,
    setupAccount
  }
}
