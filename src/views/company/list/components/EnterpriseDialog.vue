<template>
  <ElDialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="1200px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="enterprise-dialog"
  >
    <div class="dialog-content">
      <!-- 标签页导航 -->
      <ElTabs
        v-model="activeTab"
        type="card"
        class="enterprise-tabs"
@tab-change="handleTabChange"
      >
        <!-- 基本信息标签页 -->
        <ElTabPane name="basic" label="基本信息">
          <div class="basic-info-content">
            <ElForm
              ref="basicFormRef"
              :model="basicForm"
              :rules="basicFormConfig.rules"
              label-width="140px"
              class="basic-form"
            >
              <ElRow :gutter="20">
                <ElCol :span="12">
                  <ElFormItem label="企业名称" prop="enterpriseName">
                    <ElInput
                      v-model="basicForm.enterpriseName"
                      placeholder="请输入企业名称"
                      clearable
                      :readonly="isReadonly"
                    />
                  </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                  <ElFormItem label="企业类型" prop="enterpriseType">
                    <ElSelect
                      v-model="basicForm.enterpriseType"
                      placeholder="请选择企业类型"
                      clearable
                      style="width: 100%"
                      :disabled="isReadonly"
                    >
                      <ElOption
                        v-for="option in enterpriseTypeOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </ElFormItem>
                </ElCol>
              </ElRow>
              
              <ElRow :gutter="20">
                <ElCol :span="12">
                  <ElFormItem label="统一社会信用代码" prop="unifiedSocialCreditCode">
                    <ElInput
                      v-model="basicForm.unifiedSocialCreditCode"
                      placeholder="请输入统一社会信用代码"
                      clearable
                      :readonly="isReadonly"
                    />
                  </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                  <ElFormItem label="法定代表人" prop="legalRepresentative">
                    <ElInput
                      v-model="basicForm.legalRepresentative"
                      placeholder="请输入法定代表人"
                      clearable
                      :readonly="isReadonly"
                    />
                  </ElFormItem>
                </ElCol>
              </ElRow>
              
              <ElRow :gutter="20">
                <ElCol :span="12">
                  <ElFormItem label="联系人" prop="contactPerson">
                    <ElInput
                      v-model="basicForm.contactPerson"
                      placeholder="请输入联系人"
                      clearable
                    />
                  </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                  <ElFormItem label="联系电话" prop="contactPhone">
                    <ElInput
                      v-model="basicForm.contactPhone"
                      placeholder="请输入联系电话"
                      clearable
                    />
                  </ElFormItem>
                </ElCol>
              </ElRow>
              
              <ElRow :gutter="20">
                <ElCol :span="24">
                  <ElFormItem label="联系地址（选填）">
                    <ElInput
                      v-model="basicForm.registeredAddress"
                      placeholder="请输入联系地址"
                      clearable
                    />
                  </ElFormItem>
                </ElCol>
              </ElRow>
              
              <ElRow :gutter="20">
                <ElCol :span="12">
                  <ElFormItem label="客户类型（必填）" prop="customerType">
                    <ElSelect
                      v-model="basicForm.customerType"
                      placeholder="请选择客户类型"
                      clearable
                      style="width: 100%"
                    >
                      <ElOption
                        v-for="option in customerTypeOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                    <div class="customer-type-note">（下拉：维护客户、业务客户）</div>
                  </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                  <ElFormItem label="客户归属" prop="customerAttribution">
                    <ElSelect
                      v-model="basicForm.customerAttribution"
                      placeholder="请选择客户归属"
                      clearable
                      style="width: 100%"
                    >
                      <ElOption
                        v-for="option in customerAttributionOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </ElFormItem>
                </ElCol>
              </ElRow>
            </ElForm>
          </div>
        </ElTabPane>
        
        <!-- 企业资质标签页 -->
        <ElTabPane name="qualification" label="企业资质">
          <div class="qualification-content">
            <!-- 顶部操作区 -->
            <div class="qualification-header" v-if="!isReadonly">
              <div class="header-left">
                <ElButton type="primary" @click="handleAddItem('qualification')">
                  + 新增资质
                </ElButton>
              </div>
              <div class="header-right">
                <ElInput
                  v-model="qualificationSearchText"
                  placeholder="请输入资质类型搜索"
                  clearable
                  style="width: 200px"
                >
                  <template #prefix>
                    <ElIcon><Search /></ElIcon>
                  </template>
                </ElInput>
              </div>
            </div>
            
            <!-- 资质列表 -->
            <div class="qualification-list" v-if="qualificationList.length > 0">
              <ElTable
                :data="qualificationList"
                border
                stripe
                style="width: 100%"
                class="qualification-table"
                table-layout="auto"
              >
                <ElTableColumn prop="type" label="资质类型" min-width="150">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.type"
                      placeholder="请选择资质类型"
                      size="small"
                      style="width: 100%"
                      @change="(value) => handleQualificationTypeChange(row, value)"
                    >
                      <ElOption
                        v-for="option in qualificationConfig.typeOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="series" label="资质序列" min-width="130">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.series"
                      placeholder="请选择资质序列"
                      size="small"
                      style="width: 100%"
                      :disabled="!row.type"
                      @change="(value) => handleQualificationSeriesChange(row, value)"
                    >
                      <ElOption
                        v-for="option in getSeriesOptions(row.type)"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="category" label="资质类别" min-width="100">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.category"
                      placeholder="请选择类别"
                      size="small"
                      style="width: 100%"
                      :disabled="!row.series"
                    >
                      <ElOption
                        v-for="option in getCategoryOptions(row.series)"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="level" label="等级" min-width="80">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.level"
                      placeholder="等级"
                      size="small"
                      style="width: 100%"
                    >
                      <ElOption
                        v-for="option in qualificationConfig.levelOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="certificateNumber" label="证书编号" min-width="140">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.certificateNumber"
                      placeholder="证书编号"
                      size="small"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="issuingAuthority" label="发证机关" min-width="140">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.issuingAuthority"
                      placeholder="发证机关"
                      size="small"
                      style="width: 100%"
                    >
                      <ElOption
                        v-for="option in qualificationConfig.issuingAuthorityOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="validityDate" label="证书有效期" min-width="130">
                  <template #default="{ row }">
                    <ElDatePicker
                      v-model="row.validityDate"
                      type="date"
                      placeholder="有效期至"
                      size="small"
                      style="width: 100%"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn label="操作" width="80" fixed="right" v-if="!isReadonly">
                  <template #default="{ $index }">
                    <ElButton
                      type="danger"
                      size="small"
                      @click="handleDeleteItem('qualification', $index)"
                    >
                      删除
                    </ElButton>
                  </template>
                </ElTableColumn>
              </ElTable>
            </div>
            
            <!-- 空状态 -->
            <div v-else class="empty-state">
              <div class="empty-text">暂无资质信息</div>
            </div>
          </div>
        </ElTabPane>
        
        <!-- 安全许可证标签页 -->
        <ElTabPane name="safety" label="安全许可证">
          <div class="safety-content">
            <!-- 顶部操作区 -->
            <div class="safety-header" v-if="!isReadonly">
              <div class="header-left">
                <ElButton type="primary" @click="handleAddItem('safety')">
                  + 新增安全许可证
                </ElButton>
              </div>
              <div class="header-right">
                <ElInput
                  v-model="safetyPermitSearchText"
                  placeholder="请输入证书编号搜索"
                  clearable
                  style="width: 200px"
                >
                  <template #prefix>
                    <ElIcon><Search /></ElIcon>
                  </template>
                </ElInput>
              </div>
            </div>
            
            <!-- 安全许可证列表 -->
            <div class="safety-list" v-if="safetyPermitList.length > 0">
              <ElTable
                :data="safetyPermitList"
                border
                stripe
                style="width: 100%"
                class="safety-table"
                table-layout="auto"
              >
                <ElTableColumn prop="certificateNumber" label="证书编号" min-width="200">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.certificateNumber"
                      placeholder="请输入证书编号"
                      size="small"
                      style="width: 100%"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="issuingAuthority" label="发证机关" min-width="200">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.issuingAuthority"
                      placeholder="请选择发证机关"
                      size="small"
                      style="width: 100%"
                    >
                      <ElOption
                        v-for="option in safetyPermitConfig.issuingAuthorityOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="validityDate" label="有效期" min-width="140">
                  <template #default="{ row }">
                    <ElDatePicker
                      v-model="row.validityDate"
                      type="date"
                      placeholder="有效期至"
                      size="small"
                      style="width: 100%"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn label="操作" width="80" fixed="right" v-if="!isReadonly">
                  <template #default="{ $index }">
                    <ElButton
                      type="danger"
                      size="small"
                      @click="handleDeleteItem('safety', $index)"
                    >
                      删除
                    </ElButton>
                  </template>
                </ElTableColumn>
              </ElTable>
            </div>
            
            <!-- 空状态 -->
            <div v-else class="empty-state">
              <div class="empty-text">暂无安全许可证信息</div>
              <ElButton 
                v-if="!isReadonly"
                type="primary" 
                @click="handleAddItem('safety')" 
                style="margin-top: 16px"
              >
                + 新增安全许可证
              </ElButton>
            </div>
          </div>
        </ElTabPane>
        
        <!-- 信用手册标签页 -->
        <ElTabPane name="credit" label="信用手册">
          <div class="credit-content">
            <!-- 顶部操作区 -->
            <div class="credit-header" v-if="!isReadonly">
              <div class="header-left">
                <ElButton type="primary" @click="handleAddItem('credit')">
                  + 新增信用手册
                </ElButton>
              </div>
              <div class="header-right">
                <ElInput
                  v-model="creditManualSearchText"
                  placeholder="请输入档案编号搜索"
                  clearable
                  style="width: 200px"
                >
                  <template #prefix>
                    <ElIcon><Search /></ElIcon>
                  </template>
                </ElInput>
              </div>
            </div>
            
            <!-- 信用手册列表 -->
            <div class="credit-list" v-if="creditManualList.length > 0">
              <ElTable
                :data="creditManualList"
                border
                stripe
                style="width: 100%"
                class="credit-table"
                table-layout="auto"
              >
                <ElTableColumn prop="archiveNumber" label="档案编号" min-width="200">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.archiveNumber"
                      placeholder="请输入档案编号"
                      size="small"
                      style="width: 100%"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="issuingAuthority" label="发证机关" min-width="200">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.issuingAuthority"
                      placeholder="请选择发证机关"
                      size="small"
                      style="width: 100%"
                    >
                      <ElOption
                        v-for="option in creditManualConfig.issuingAuthorityOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="validityDate" label="有效期" min-width="140">
                  <template #default="{ row }">
                    <ElDatePicker
                      v-model="row.validityDate"
                      type="date"
                      placeholder="有效期至"
                      size="small"
                      style="width: 100%"
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn label="操作" width="80" fixed="right" v-if="!isReadonly">
                  <template #default="{ $index }">
                    <ElButton
                      type="danger"
                      size="small"
                      @click="handleDeleteItem('credit', $index)"
                    >
                      删除
                    </ElButton>
                  </template>
                </ElTableColumn>
              </ElTable>
            </div>
            
            <!-- 空状态 -->
            <div v-else class="empty-state">
              <div class="empty-text">暂无信用手册信息</div>
              <ElButton 
                v-if="!isReadonly"
                type="primary" 
                @click="handleAddItem('credit')" 
                style="margin-top: 16px"
              >
                + 新增信用手册
              </ElButton>
            </div>
          </div>
        </ElTabPane>
        
        <!-- 企业人员标签页 -->
        <ElTabPane name="personnel" label="企业人员">
          <div class="personnel-content">
            <!-- 顶部操作区 -->
            <div class="personnel-header" v-if="!isReadonly">
              <div class="header-left">
                <ElButton type="primary" @click="handleAddItem('personnel')">
                  + 新增人员
                </ElButton>
              </div>
              <div class="header-right">
                <ElInput
                  v-model="personnelSearchText"
                  placeholder="请输入姓名或身份证号搜索"
                  clearable
                  style="width: 250px"
                >
                  <template #prefix>
                    <ElIcon><Search /></ElIcon>
                  </template>
                </ElInput>
              </div>
            </div>
            
            <!-- 人员列表 -->
            <div class="personnel-list" v-if="personnelList.length > 0">
              <ElTable
                :data="personnelList"
                border
                stripe
                style="width: 100%"
                class="personnel-table"
                table-layout="auto"
              >
                <ElTableColumn prop="name" label="姓名" min-width="100">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.name"
                      placeholder="请输入姓名"
                      size="small"
                      style="width: 100%"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="idNumber" label="身份证号" min-width="160">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.idNumber"
                      placeholder="请输入身份证号"
                      size="small"
                      style="width: 100%"
                      @input="calculateAgeAndGender(row)"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="birthDate" label="出生年月" min-width="100">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.birthDate"
                      placeholder="自动计算"
                      size="small"
                      readonly
                      style="width: 100%"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="gender" label="性别" min-width="60">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.gender"
                      placeholder="自动计算"
                      size="small"
                      readonly
                      style="width: 100%"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="age" label="年龄" min-width="60">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.age"
                      placeholder="自动计算"
                      size="small"
                      readonly
                      style="width: 100%"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="phone" label="手机号" min-width="120">
                  <template #default="{ row }">
                    <ElInput
                      v-model="row.phone"
                      placeholder="请输入手机号"
                      size="small"
                      style="width: 100%"
                    />
                  </template>
                </ElTableColumn>
                
                <ElTableColumn prop="qualificationType" label="资质类型" min-width="160">
                  <template #default="{ row }">
                    <ElSelect
                      v-model="row.qualificationType"
                      placeholder="请选择资质类型"
                      size="small"
                      style="width: 100%"
                    >
                      <ElOption
                        v-for="option in personnelConfig.qualificationTypeOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      />
                    </ElSelect>
                  </template>
                </ElTableColumn>
                
                <ElTableColumn label="操作" width="80" fixed="right" v-if="!isReadonly">
                  <template #default="{ $index }">
                    <ElButton
                      type="danger"
                      size="small"
                      @click="handleDeleteItem('personnel', $index)"
                    >
                      删除
                    </ElButton>
                  </template>
                </ElTableColumn>
              </ElTable>
            </div>
            
            <!-- 空状态 -->
            <div v-else class="empty-state">
              <div class="empty-text">暂无人员信息</div>
              <ElButton 
                v-if="!isReadonly"
                type="primary" 
                @click="handleAddItem('personnel')" 
                style="margin-top: 16px"
              >
                + 新增人员
              </ElButton>
            </div>
          </div>
        </ElTabPane>
      </ElTabs>
    </div>
    
    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <ElButton
          v-for="btn in currentTabButtons"
          :key="btn.action"
:type="btn.type"
          :loading="loading && (btn.action === 'save' || btn.action === 'confirm')"
          @click="handleButtonClick(btn.action)"
        >
          {{ btn.label }}
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ElDialog,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElDatePicker,
  ElIcon
} from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import {
  tabsConfig,
  basicFormConfig,
  enterpriseTypeOptions,
  customerTypeOptions,
  customerAttributionOptions,
  qualificationConfig,
  safetyPermitConfig,
  creditManualConfig,
  personnelConfig,
  dialogButtonsConfig
} from '../config/dialog.config'
import { useEnterpriseDialog } from '../hooks/useEnterpriseDialog'

// 定义组件事件
const emit = defineEmits<{
  refresh: []
}>()

// 使用组合式函数
const {
  // 响应式数据
  dialogVisible,
  dialogMode,
  activeTab,
  loading,
  basicForm,
  basicFormRef,
  qualificationList,
  safetyPermitList,
  creditManualList,
  personnelList,
  currentEnterpriseId,
  
  // 计算属性
  dialogTitle,
  isReadonly,
  
  // 方法
  openDialog,
  closeDialog,
  handleTabChange,
  handleAddItem,
  handleDeleteItem,
  handleSave,
  handleSubmit,
  handleButtonClick,
  validateBasicForm,
  
  // 动态下拉选项方法
  getSeriesOptions,
  getCategoryOptions,
  handleQualificationTypeChange,
  handleQualificationSeriesChange
} = useEnterpriseDialog(emit)

const currentTabButtons = computed(() => {
  // 在查看模式下只显示关闭按钮
  if (isReadonly.value) {
    return [{
      label: '关闭',
      type: 'default' as const,
      action: 'cancel'
    }]
  }
  return dialogButtonsConfig.filter(btn => 
    btn.show.includes(activeTab.value)
  )
})

// 暴露方法给父组件
defineExpose({
  openDialog,
  closeDialog
})
</script>

<style lang="scss" scoped>
.enterprise-dialog {
  :deep(.el-dialog) {
    margin-top: 5vh;
    margin-bottom: 5vh;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  :deep(.el-dialog__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #ebeef5;
    
    .el-dialog__title {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }
  
  :deep(.el-dialog__body) {
    padding: 0;
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  
  :deep(.el-dialog__footer) {
    padding: 16px 20px;
    border-top: 1px solid #ebeef5;
  }
  
  // 企业资质标签页样式
  .qualification-content {
    .qualification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding: 12px 16px;
      background-color: #f8f9fa;
      border-radius: 4px;
      
      .header-left {
        display: flex;
        align-items: center;
      }
      
      .header-right {
        display: flex;
        align-items: center;
      }
    }
    
    .qualification-table {
      // 表格样式
      :deep(.el-table__cell) {
        padding: 8px;
      }
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #909399;
      
      .empty-text {
        font-size: 14px;
        margin-bottom: 16px;
      }
    }
  }
  
  .dialog-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    .enterprise-tabs {
      flex: 1;
      display: flex;
      flex-direction: column;
      
      :deep(.el-tabs__header) {
        flex-shrink: 0;
        margin: 0;
        padding: 0 20px;
        background: #f5f7fa;
        border-bottom: 1px solid #ebeef5;
        
        .el-tabs__nav-wrap {
          &::after {
            display: none;
          }
        }
        
        .el-tabs__nav {
          border: none;
          
          .el-tabs__item {
            height: 48px;
            line-height: 48px;
            padding: 0 20px;
            border: none;
            border-radius: 0;
            margin-right: 0;
            font-size: 14px;
            font-weight: 500;
            color: #606266;
            background: transparent;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
            
            &:hover {
              color: var(--el-color-primary);
            }
            
            &.is-active {
              color: var(--el-color-primary);
              background: white;
              border-bottom-color: var(--el-color-primary);
            }
          }
        }
      }
      
      :deep(.el-tabs__content) {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
      }
    }
    
    // 基本信息样式
    .basic-info-content {
      .basic-form {
        max-width: 100%;
        
        :deep(.el-form-item) {
          margin-bottom: 20px;
          
          .el-form-item__label {
            font-weight: 500;
            color: #606266;
            line-height: 32px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            min-width: 140px;
            width: 140px !important;
          }
          
          .el-form-item__content {
            .el-input,
            .el-select {
              .el-input__wrapper,
              .el-select__wrapper {
                border-radius: 6px;
                transition: all 0.2s ease;
                
                &:hover {
                  border-color: var(--el-color-primary);
                }
                
                &.is-focus {
                  border-color: var(--el-color-primary);
                  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
                }
              }
            }
          }
        }
        
        .address-item {
          :deep(.el-form-item__content) {
            display: flex;
            gap: 10px;
            
            .el-input {
              flex: 1;
            }
            
            .add-address-btn {
              flex-shrink: 0;
              border-radius: 6px;
            }
          }
        }
        
        .customer-type-note {
          font-size: 12px;
          color: #909399;
          margin-top: 4px;
          font-style: italic;
        }
      }
    }
    
    // 资质管理样式
    .qualification-content {
      .qualification-list {
        margin-bottom: 20px;
        
        .qualification-table {
          border-radius: 6px;
          overflow: hidden;
          width: 100% !important;
          
          :deep(.el-table__header) {
            th {
              background: #f5f7fa;
              color: #606266;
              font-weight: 600;
              border-bottom: 1px solid #ebeef5;
            }
          }
          
          :deep(.el-table__body) {
            tr {
              &:hover {
                background: #f5f7fa;
              }
            }
          }
          
          :deep(.el-table__cell) {
            padding: 12px 0;
            border-bottom: 1px solid #f0f2f5;
            
            .cell {
              padding: 0 12px;
              
              .el-input,
              .el-select,
              .el-date-picker {
                .el-input__wrapper,
                .el-select__wrapper {
                  border: 1px solid #dcdfe6;
                  border-radius: 4px;
                  
                  &:hover {
                    border-color: var(--el-color-primary);
                  }
                }
              }
            }
          }
        }
      }
      
      .add-qualification-section {
        text-align: center;
        padding: 30px 20px;
        border: 2px dashed #dcdfe6;
        border-radius: 8px;
        background: #fafbfc;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: var(--el-color-primary);
          background: #f0f9ff;
        }
        
        .el-button {
          border-radius: 6px;
          padding: 12px 24px;
        }
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #909399;
        
        .empty-text {
          font-size: 16px;
        }
      }
    }
    
    // 安全许可证管理样式
    .safety-content {
      .safety-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 12px 16px;
        background-color: #f8f9fa;
        border-radius: 4px;
        
        .header-left {
          display: flex;
          align-items: center;
        }
        
        .header-right {
          display: flex;
          align-items: center;
        }
      }
      
      .safety-table {
        width: 100% !important;
        // 表格样式
        :deep(.el-table__cell) {
          padding: 8px;
        }
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #909399;
        
        .empty-text {
          font-size: 14px;
          margin-bottom: 16px;
        }
      }
    }
    
    // 信用手册管理样式
    .credit-content {
      .credit-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 12px 16px;
        background-color: #f8f9fa;
        border-radius: 4px;
        
        .header-left {
          display: flex;
          align-items: center;
        }
        
        .header-right {
          display: flex;
          align-items: center;
        }
      }
      
      .credit-table {
        width: 100% !important;
        :deep(.el-table__cell) {
          padding: 8px;
        }
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #909399;
        
        .empty-text {
          font-size: 14px;
          margin-bottom: 16px;
        }
      }
    }
    
    // 企业人员管理样式
    .personnel-content {
      .personnel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 12px 16px;
        background-color: #f8f9fa;
        border-radius: 4px;
        
        .header-left {
          display: flex;
          align-items: center;
        }
        
        .header-right {
          display: flex;
          align-items: center;
        }
      }
      
      .personnel-table {
        width: 100% !important;
        :deep(.el-table__cell) {
          padding: 8px;
        }
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #909399;
        
        .empty-text {
          font-size: 14px;
          margin-bottom: 16px;
        }
      }
    }
  }
  
  .dialog-footer {
    text-align: right;
    background: #fafbfc;
    
    .el-button {
      margin-left: 12px;
      border-radius: 6px;
      padding: 10px 20px;
      font-weight: 500;
      
      &:first-child {
        margin-left: 0;
      }
      
      &.el-button--primary {
        background: var(--el-color-primary);
        border-color: var(--el-color-primary);
        
        &:hover {
          background: var(--el-color-primary-light-3);
          border-color: var(--el-color-primary-light-3);
        }
      }
      
      &.el-button--success {
        &:hover {
          background: var(--el-color-success-light-3);
          border-color: var(--el-color-success-light-3);
        }
      }
      
      &.el-button--warning {
        &:hover {
          background: var(--el-color-warning-light-3);
          border-color: var(--el-color-warning-light-3);
        }
      }
    }
  }
}
</style>
