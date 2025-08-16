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

                :prop="column.prop"
                :label="column.label"
                :width="column.width"
                :fixed="column.fixed"
                :show-overflow-tooltip="column.showOverflowTooltip"
              >
                <template v-if="column.prop === 'actions'" #default="{ row }">
                  <div class="action-buttons">
                    <ElButton 
                      type="primary" 
                      size="small" 
                      @click="handleEditQualification(row)"
                    >
                      编辑
                    </ElButton>
                    <ElButton 
                      type="danger" 
                      size="small" 
                      @click="handleDeleteQualification(row)"
                    >
                      删除
                    </ElButton>
                  </div>
                </template>
              </ElTableColumn>
            </ElTable>

            <!-- 分页 -->
            <div class="pagination-wrapper">
              <ElPagination 
                :current-page="pagination.currentPage"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
              />
            </div>
          </div>
        </div>

        <!-- 其他标签页占位内容 -->
        <div v-else class="tab-placeholder">
          <div class="placeholder-content">
            <i class="iconsys-tools placeholder-icon"></i>
            <h3>{{ tab.label }}功能开发中</h3>
            <p>该功能正在开发中，敬请期待...</p>
          </div>
        </div>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination
} from 'element-plus'
import { tabsConfig, searchFormConfig, tableColumnsConfig } from './config'
import { useQualificationPage } from './hooks'

// 使用组合式函数
const {
  activeTab,
  searchForm,
  loading,
  pagination,
  currentPageData,
  handleTabChange,
  handleSearch,
  handleReset,
  handleAddQualification,
  handleEditQualification,
  handleDeleteQualification,
  handlePageChange,
  handleSizeChange,
  initData
} = useQualificationPage()

// 页面初始化
onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
