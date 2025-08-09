<template>
  <div class="workbench-page" id="workbench-full-screen">
    <!-- 顶部标题栏 -->
    <ElCard shadow="never" class="header-card">
      <div class="workbench-header">
        <div class="left">
          <h1 class="title">{{ pageText.title }}</h1>
          <p class="subtitle">{{ pageText.subtitle }}</p>
        </div>
        <div class="right">
          <span class="date">{{ currentDate }}</span>
        </div>
      </div>
    </ElCard>

    <!-- 统计卡片 -->
    <div class="stats-section">
      <ElCard
        v-for="(card, index) in statsCards"
        :key="index"
        shadow="never"
        class="stats-card"
        :class="card.colorClass"
        @click="handleStatsCardClick(card.route)"
      >
        <div class="stats-card-content">
          <div class="stats-card-header">
            <span class="stats-title">{{ card.title }}</span>
            <ElIcon class="stats-icon"><component :is="card.icon" /></ElIcon>
          </div>
          <div class="stats-row">
            <div
              class="stats-item clickable-area"
              @click="handleStatsItemClick(card.route, 'total')"
            >
              <span class="stats-label">统计数量</span>
              <span class="stats-count">{{ card.value }}</span>
            </div>
            <div
              class="stats-item stats-item-expiring clickable-area"
              @click="handleStatsItemClick(card.route, 'expiring')"
            >
              <span
                class="stats-label"
                :style="
                  card.title === '企业资质统计'
                    ? { color: '#1677ff' }
                    : card.title === '安全生产许可证'
                      ? { color: '#52c41a' }
                      : card.title === '建筑业企业信用手册'
                        ? { color: '#2b9688' }
                        : card.title === '人员证书'
                          ? { color: '#7e57c2' }
                          : {}
                "
                >{{ card.periodLabel }}</span
              >
              <span
                class="stats-count stats-count-expiring stats-count-yellow"
                :class="{ 'stats-count-warning': parseInt(card.periodValue) > 0 }"
                >{{ card.periodValue }}</span
              >
            </div>
            <div
              class="stats-item clickable-area"
              @click="handleStatsItemClick(card.route, 'expired')"
            >
              <span class="stats-label">{{ card.completedLabel }}</span>
              <span
                class="stats-count stats-count-expired"
                :class="{ 'stats-count-warning': parseInt(card.completedValue) > 0 }"
                >{{ card.completedValue }}</span
              >
            </div>
          </div>
        </div>
      </ElCard>
    </div>

    <!-- 功能区域布局 -->
    <div class="function-sections">
      <!-- 左侧区域 -->
      <div class="left-section">
        <!-- 企业资质管理 -->
        <ElCard shadow="never" class="module-card">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <ElIcon class="header-icon"><DocumentIcon /></ElIcon>
                <span class="header-title">{{ pageText.enterpriseTitle }}</span>
              </div>
            </div>
          </template>

          <div class="function-grid">
            <div
              v-for="(item, index) in enterpriseModules"
              :key="index"
              class="function-item"
              @click="handleModuleClick(item.route)"
            >
              <div class="function-icon-wrapper" :class="item.iconClass">
                <ElIcon class="function-icon"><component :is="item.icon" /></ElIcon>
              </div>
              <span class="function-name">{{ item.name }}</span>
            </div>
          </div>
        </ElCard>

        <!-- 常用功能 -->
        <ElCard shadow="never" class="module-card">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <ElIcon class="header-icon"><Star /></ElIcon>
                <span class="header-title">{{ pageText.functionsTitle }}</span>
              </div>
            </div>
          </template>

          <div class="function-grid">
            <div
              v-for="(item, index) in commonFunctions"
              :key="index"
              class="function-item"
              @click="handleFunctionClick(item.route)"
            >
              <div class="function-icon-wrapper" :class="item.iconClass">
                <ElIcon class="function-icon"><component :is="item.icon" /></ElIcon>
              </div>
              <span class="function-name">{{ item.name }}</span>
              <span class="function-desc">{{ item.description }}</span>
            </div>
          </div>
        </ElCard>
      </div>

      <!-- 右侧区域 -->
      <div class="right-section">
        <!-- 工作日志 -->
        <ElCard shadow="never" class="module-card">
          <template #header>
            <div class="card-header">
              <div class="header-left">
                <ElIcon class="header-icon"><Calendar /></ElIcon>
                <span class="header-title">{{ pageText.logsTitle }}</span>
              </div>
            </div>
          </template>

          <div class="log-list">
            <div v-for="(log, index) in workLogs" :key="index" class="log-item">
              <div class="log-icon">
                <span class="dot"></span>
              </div>
              <div class="log-content">{{ log.content }}</div>
              <div class="log-time">{{ log.time }}</div>
            </div>
          </div>
        </ElCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Document as DocumentIcon, Star, Calendar } from '@element-plus/icons-vue'
import { useDashboardData, useDashboardActions } from './hooks'

// 使用 hooks 获取数据和操作方法
const {
  currentDate,
  enterpriseModules,
  commonFunctions,
  statsCards,
  workLogs,
  pageText
} = useDashboardData()

const {
  handleStatsCardClick,
  handleStatsItemClick,
  handleModuleClick,
  handleFunctionClick,
  handleLogClick
} = useDashboardActions()
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
