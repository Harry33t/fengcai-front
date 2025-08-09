/**
 * 登录表单验证规则 Hook
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormRules } from 'element-plus'
import { loginRulesConfig } from '../config'

export function useLoginRules() {
  const { t } = useI18n()

  // 使用配置文件中的规则，支持国际化
  const rules = computed<FormRules>(() => ({
    username: [
      { 
        required: true, 
        message: t('login.placeholder[0]') || '请输入用户名', 
        trigger: 'blur' 
      }
    ],
    password: [
      { 
        required: true, 
        message: t('login.placeholder[1]') || '请输入密码', 
        trigger: 'blur' 
      }
    ],
    captcha: [
      { 
        required: true, 
        message: t('login.placeholder[2]') || '请输入验证码', 
        trigger: 'blur' 
      }
    ]
  }))

  return {
    rules
  }
}
