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

// 获取当前页面标题
const currentPageTitle = computed(() => {
  return route.meta?.title || '未知页面'
})

// 更新当前时间
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

// 返回上一页
const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/dashboard')
  }
}

onMounted(() => {
  updateTime()
  // 每秒更新时间
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
  color: #409eff;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.development-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--art-text-gray-700, #333333);
  margin: 0 0 16px 0;
}

.development-description {
  font-size: 16px;
  color: var(--art-text-gray-600, #666666);
  margin: 0 0 32px 0;
  line-height: 1.6;
}

.development-info {
  background: var(--art-bg-color, #f8f9fa);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 32px;
  text-align: left;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  font-weight: 500;
  color: var(--art-text-gray-600, #666666);
}

.info-value {
  color: var(--art-text-gray-700, #333333);
  font-weight: 600;
}

.el-button {
  padding: 12px 24px;
  font-size: 14px;
  border-radius: 8px;
}

.el-button i {
  margin-right: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .development-container {
    padding: 40px 24px;
    margin: 20px;
  }
  
  .development-icon {
    font-size: 48px;
  }
  
  .development-title {
    font-size: 24px;
  }
  
  .development-description {
    font-size: 14px;
  }
}
</style>
