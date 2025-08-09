<template>
  <div class="login">
    <LoginLeftView></LoginLeftView>

    <div class="right-wrap">
      <div class="top-right-wrap">
        <div class="btn theme-btn" @click="toggleTheme">
          <i class="iconfont-sys">
            {{ isDark ? '&#xe6b5;' : '&#xe725;' }}
          </i>
        </div>
      </div>
      <div class="header">
        <ArtLogo class="icon" />
        <h1>{{ systemName }}</h1>
      </div>
      <div class="login-wrap">
        <div class="form">
          <h3 class="title">{{ title }}</h3>
          <p class="sub-title">{{ subtitle }}</p>
          <ElForm
            ref="formRef"
            :model="formData"
            :rules="rules"
            @submit.prevent="handleSubmit(formRef, formData)"
            style="margin-top: 25px"
          >
            <ElFormItem prop="username">
              <ElInput 
                placeholder="请输入账号" 
                size="large" 
                v-model.trim="formData.username" 
              />
            </ElFormItem>
            <ElFormItem prop="password">
              <ElInput
                placeholder="请输入密码"
                size="large"
                v-model.trim="formData.password"
                type="password"
                radius="8px"
                autocomplete="off"
                show-password
              />
            </ElFormItem>
            <ElFormItem prop="captcha">
              <ElRow :gutter="5">
                <ElCol :span="16">
                  <ElInput
                    placeholder="请输入验证码"
                    size="large"
                    v-model.trim="formData.captcha"
                  />
                </ElCol>
                <ElCol :push="1" :span="8">
                  <img :src="captchaImageUrl" @click="refreshCaptcha" class="captcha-image" />
                </ElCol>
              </ElRow>
            </ElFormItem>
            <div class="forget-password">
              <ElCheckbox v-model="formData.rememberPassword">{{ rememberPasswordText }}</ElCheckbox>
              <router-link to="/auth/forget-password">{{ forgetPasswordText }}</router-link>
            </div>

            <div style="margin-top: 30px">
              <ElButton
                class="login-btn"
                size="large"
                type="primary"
                @click="handleSubmit(formRef, formData)"
                :loading="loading"
              >
                {{ loginButtonText }}
              </ElButton>
            </div>
          </ElForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // ===== Vue 核心 =====
  import { ref, computed, reactive, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'

  // ===== Element Plus =====
  import { ElNotification, ElMessage } from 'element-plus'
  import type { FormInstance } from 'element-plus'

  // ===== 项目配置 =====
  import AppConfig from '@/config'
  import { RoutesAlias } from '@/router/routesAlias'
  import { LanguageEnum, SystemThemeEnum } from '@/enums/appEnum'
  import { languageOptions } from '@/locales'

  // ===== Store 状态管理 =====
  import { useUserStore } from '@/store/modules/user'
  import { useSettingStore } from '@/store/modules/setting'

  // ===== 工具函数 =====
  import { getCssVar } from '@/utils/ui'

  // ===== 页面配置 =====
  import { loginTextConfig } from './config'

  // ===== 页面 Hooks =====
  import {
    useLoginRules,
    useAccountManager,
    useLoginLogic,
    usePageInit,
    useCaptcha
  } from './hooks'

  defineOptions({ name: 'Login' })

  // ===== 国际化 =====
  const { t } = useI18n()

  // ===== 页面数据 =====
  const systemName = AppConfig.systemInfo.name
  const formRef = ref<FormInstance>()

  // ===== 页面文本配置 =====
  const { title, subTitle: subtitle, btnText: loginButtonText, rememberText: rememberPasswordText } = loginTextConfig
  const forgetPasswordText = '忘记密码'

  // ===== 使用 Hooks =====
  const { rules } = useLoginRules()
  const { formData, setupAccount } = useAccountManager()
  const { loading, handleSubmit } = useLoginLogic(formData, formRef)
  const { captchaImageUrl, refreshCaptcha, initCaptcha } = useCaptcha()
  const { clearCorruptedCache } = usePageInit()

  // ===== Store 实例 =====
  const settingStore = useSettingStore()
  const { isDark, systemThemeType } = storeToRefs(settingStore)

  // ===== 页面初始化 =====
  onMounted(() => {
    clearCorruptedCache()
    setupAccount('admin') // 默认设置为 admin 账户
    initCaptcha()
  })

  // ===== 语言切换 =====
  const { locale } = useI18n()
  const userStore = useUserStore()

  const changeLanguage = (lang: LanguageEnum) => {
    if (locale.value === lang) return
    locale.value = lang
    userStore.setLanguage(lang)
  }

  // ===== 主题切换 =====
  const toggleTheme = () => {
    const { LIGHT, DARK } = SystemThemeEnum
    settingStore.setSystemThemeType(systemThemeType.value === LIGHT ? DARK : LIGHT)
  }
</script>

<style lang="scss" scoped>
  @use './index';
</style>
