/**
 * 登录页面配置文件
 */
import type { FormRules } from 'element-plus'

/**
 * 登录表单验证规则配置
 */
export const loginRulesConfig = {
  username: [
    { 
      required: true, 
      message: '请输入用户名', 
      trigger: 'blur' 
    }
  ],
  password: [
    { 
      required: true, 
      message: '请输入密码', 
      trigger: 'blur' 
    }
  ],
  captcha: [
    { 
      required: true, 
      message: '请输入验证码', 
      trigger: 'blur' 
    }
  ]
} as FormRules

/**
 * 登录表单初始数据配置
 */
export const loginFormConfig = {
  username: 'ceo',
  password: '123456',
  captcha: '',
  rememberPassword: false
}

/**
 * 预设账户配置
 */
export const accountsConfig = [
  {
    key: 'super',
    label: 'Super',
    username: 'super',
    password: '123456'
  },
  {
    key: 'admin',
    label: 'Admin',
    username: 'admin',
    password: '123456'
  },
  {
    key: 'user',
    label: 'User',
    username: 'user',
    password: '123456'
  }
]

/**
 * 登录页面文本配置
 */
export const loginTextConfig = {
  title: '登录',
  subTitle: '欢迎使用丰彩管理系统',
  btnText: '登录',
  rememberText: '记住密码',
  success: {
    title: '登录成功',
    message: '欢迎回来'
  }
}
