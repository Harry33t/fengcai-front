<template>
  <div class="enterprise-management">
    <!-- 搜索区域 -->
    <div class="search-section">
      <ElForm
        ref="searchFormRef"
        :model="searchForm"
        class="search-form"
        label-width="100px"
      >
        <!-- 上面三个字段 -->
        <ElRow :gutter="20">
          <ElCol :span="8">
            <ElFormItem label="企业类型">
              <ElSelect
                v-model="searchForm.enterpriseType"
                placeholder="企业类型"
                clearable
              >
                <ElOption
                  v-for="option in searchFormConfig.enterpriseTypeOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="企业名称">
              <ElInput
                v-model="searchForm.enterpriseName"
                placeholder="请输入企业名称"
                clearable
              />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="资质状态">
              <ElSelect
                v-model="searchForm.qualificationStatus"
                placeholder="请选择资质状态"
                clearable
              >
                <ElOption
                  v-for="option in searchFormConfig.qualificationStatusOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        
        <!-- 下面三个字段 -->
        <ElRow :gutter="20">
          <ElCol :span="8">
            <ElFormItem label="有无安许">
              <ElSelect
                v-model="searchForm.safetyPermit"
                placeholder="有无安许"
                clearable
              >
                <ElOption
                  v-for="option in searchFormConfig.safetyPermitOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="有无信用手册">
              <ElSelect
                v-model="searchForm.creditManual"
                placeholder="有无信用手册"
                clearable
              >
                <ElOption
                  v-for="option in searchFormConfig.creditManualOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="客户归属">
              <ElSelect
                v-model="searchForm.customerAttribution"
                placeholder="请选择客户归属"
                clearable
              >
                <ElOption
                  v-for="option in searchFormConfig.customerAttributionOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>
        
        <!-- 按钮区域 -->
        <ElRow :gutter="20">
          <ElCol :span="24">
            <div class="search-buttons">
              <ElButton type="primary" @click="handleSearch" :loading="loading">
                {{ pageTextConfig.searchButton }}
              </ElButton>
              <ElButton @click="handleReset">
                {{ pageTextConfig.resetButton }}
              </ElButton>
            </div>
          </ElCol>
        </ElRow>
      </ElForm>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <div class="table-header">
        <div class="table-title">{{ pageTextConfig.title }}</div>
        <div class="table-actions">
          <ElButton type="primary" @click="handleAdd">
            {{ pageTextConfig.addButton }}
          </ElButton>
        </div>
      </div>
      
      <div class="table-content">
        <ElTable
          :data="tableData"
          :loading="loading"
          stripe
          border
          style="width: 100%"
          :height="500"
          table-layout="auto"
        >
          <ElTableColumn
            type="index"
            label="序号"
            width="80"
            align="center"
            class-name="table-index-column"
          />
          
          <ElTableColumn
            prop="enterpriseType"
            label="企业类型"
            min-width="140"
            show-overflow-tooltip
          />
          
          <ElTableColumn
            prop="enterpriseName"
            label="企业名称"
            min-width="180"
            show-overflow-tooltip
          />
          
          <ElTableColumn
            prop="contactPerson"
            label="企业联系人"
            min-width="120"
            show-overflow-tooltip
          />
          
          <ElTableColumn
            prop="contactPhone"
            label="联系电话"
            min-width="120"
            show-overflow-tooltip
          />
          
          <ElTableColumn
            prop="safetyPermit"
            label="安全许可证"
            min-width="120"
            align="center"
          >
            <template #default="{ row }">
              <div class="status-tag">
                <ElTag :type="getStatusTagType(row.safetyPermit)">
                  {{ formatStatus(row.safetyPermit) }}
                </ElTag>
              </div>
            </template>
          </ElTableColumn>
          
          <ElTableColumn
            prop="creditManual"
            label="信用手册"
            min-width="110"
            align="center"
          >
            <template #default="{ row }">
              <div class="status-tag">
                <ElTag :type="getStatusTagType(row.creditManual)">
                  {{ formatStatus(row.creditManual) }}
                </ElTag>
              </div>
            </template>
          </ElTableColumn>
          
          <ElTableColumn
            prop="customerAttribution"
            label="客户归属"
            min-width="100"
            show-overflow-tooltip
          />
          
          <ElTableColumn
            label="操作"
            width="160"
            fixed="right"
            align="center"
          >
            <template #default="{ row }">
              <div class="operation-buttons">
                <ElButton
                  v-for="btn in operationButtonsConfig"
                  :key="btn.action"
                  :type="btn.type"
                  :size="btn.size"
                  @click="handleOperation(btn.action, row)"
                >
                  {{ btn.label }}
                </ElButton>
              </div>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      
      <div class="pagination-wrapper">
        <ElPagination
          :current-page="pagination.currentPage"
          :page-size="pagination.pageSize"
          :page-sizes="pagination.pageSizes"
          :total="pagination.total"
          :layout="pagination.layout"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    
    <!-- 企业弹框 -->
    <EnterpriseDialog ref="enterpriseDialogRef" @refresh="handleRefresh" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEnterpriseData, useEnterpriseActions } from './hooks'
import EnterpriseDialog from './components/EnterpriseDialog.vue'

// 企业弹框引用
const enterpriseDialogRef = ref()

// 使用 hooks 获取数据和操作方法
const {
  // 数据
  searchForm,
  tableData,
  pagination,
  loading,
  
  // 配置
  searchFormConfig,
  tableColumnsConfig,
  pageTextConfig,
  
  // 方法
  handleSearch,
  handleReset,
  handlePageChange,
  handleSizeChange,
  formatStatus,
  getStatusTagType,
  loadEnterpriseList
} = useEnterpriseData()

// 编辑企业
const handleEdit = (row: any) => {
  enterpriseDialogRef.value?.openDialog('edit', row)
}

// 查看企业详情
const handleView = (row: any) => {
  enterpriseDialogRef.value?.openDialog('view', row)
}

const {
  // 配置
  operationButtonsConfig,
  
  // 操作方法
  handleAdd: originalHandleAdd,
  handleOperation
} = useEnterpriseActions(
  { refresh: () => loadEnterpriseList() },
  handleEdit,
  handleView
)

// 重写新增方法，打开弹框
const handleAdd = () => {
  enterpriseDialogRef.value?.openDialog('add')
}

// 刷新列表
const handleRefresh = () => {
  loadEnterpriseList()
}
</script>

<style scoped>
@import './index.scss';
</style>
