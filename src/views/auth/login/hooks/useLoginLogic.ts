/**
 * 登录业务逻辑
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { UserService } from '@/api/usersApi'
import { HttpError } from '@/utils/http/error'
import localCache from '@/utils/cache'

export function useLoginLogic() {
  const router = useRouter()
  const userStore = useUserStore()
  const loading = ref(false)

  // 登录处理
  const handleSubmit = async (formRef: FormInstance | undefined, formData: any) => {
    if (!formRef) return

    try {
      // 表单验证
      const valid = await formRef.validate()
      if (!valid) return

      loading.value = true

      // 登录请求
      const { username, password } = formData

      try {
        const loginResult = await UserService.login({
          userName: username,
          password
        })

        // 验证登录结果
        if (!loginResult.token) {
          throw new Error('Login failed - no token received')
        }

        // 先存储token，确保后续请求能使用
        userStore.setToken(loginResult.token, loginResult.refreshToken || undefined)
        // 同时存储到 localCache，供 HTTP 拦截器使用
        localCache.setCache('token', loginResult.token)
        
        // 获取用户信息
        try {
          const userInfo = await UserService.getUserInfo()
          userStore.setUserInfo(userInfo)
        } catch (userInfoError) {
          // 使用默认用户信息
          const defaultUserInfo = {
            userId: 1,
            userName: formData.username,
            roles: ['R_USER'],
            buttons: [],
            avatar: '',
            email: ''
          }
          userStore.setUserInfo(defaultUserInfo)
        }
        
        userStore.setLoginStatus(true)

        // 登录成功处理
        ElMessage.success('登录成功')
        
        // 跳转到目标页面
        const redirect = router.currentRoute.value.query.redirect as string
        router.push(redirect || '/')
        
      } catch (error: any) {
        // 错误处理
        const errorMessage = error?.response?.data?.message || error?.message || '登录失败，请稍后再试'
        const statusCode = error?.response?.status
        
        ElMessage.error(errorMessage)
      } finally {
        loading.value = false
      }
    } catch (unexpectedError) {
      ElMessage.error('发生意外错误，请稍后再试')
      loading.value = false
    }
  }

  return {
    loading,
    handleSubmit
  }
}
