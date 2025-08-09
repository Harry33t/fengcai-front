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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElButton } from 'element-plus'

const route = useRoute()
const router = useRouter()
const currentTime = ref('')

const currentPageTitle = computed(() => {
  return route.meta?.title || '未知页面'
})

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/workspace')
  }
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style scoped>
.under-development {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.development-container {
  text-align: center;
  background: var(--art-main-bg-color, #ffffff);
  padding: 60px 40px;
  border-radius: 16px;
  box-shadow: var(--art-box-shadow, 0 8px 32px rgba(0, 0, 0, 0.1));
  max-width: 500px;
  width: 100%;
}

.icon-wrapper {
  margin-bottom: 24px;
}

.development-icon {
  font-size: 64px;
  color: var(--art-primary-color, #409eff);
  opacity: 0.8;
}

.development-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--art-text-color-primary, #303133);
  margin: 0 0 16px 0;
}

.development-description {
  font-size: 16px;
  color: var(--art-text-color-regular, #606266);
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.development-info {
  background: var(--art-bg-color-page, #f5f7fa);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 32px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-size: 14px;
  color: var(--art-text-color-regular, #606266);
  font-weight: 500;
}

.info-value {
  font-size: 14px;
  color: var(--art-text-color-primary, #303133);
  font-weight: 600;
}
</style>
