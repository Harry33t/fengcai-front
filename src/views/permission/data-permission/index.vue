<template>
  <div class="under-development">
    <div class="development-container">
      <div class="icon-wrapper">
        <i class="iconsys-tools development-icon"></i>
      </div>
      <h1 class="development-title">功能开发中</h1>
      <p class="development-description">
        该功能正在紧张开发中，敬请期待...
      </p>
      <div class="development-info">
        <div class="info-item">
          <span class="info-label">当前页面：</span>
          <span class="info-value">{{ currentPageTitle }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">访问时间：</span>
          <span class="info-value">{{ currentTime }}</span>
        </div>
      </div>
      <el-button type="primary" @click="goBack">
        <i class="iconsys-arrow-left"></i>
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageInit } from './hooks/usePageInit'
import './index.scss'

const { currentPageTitle, currentTime, goBack } = usePageInit({
  pageTitle: '数据权限管理'
})
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
