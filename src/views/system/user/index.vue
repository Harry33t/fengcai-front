<template>
  <div class="user-management">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-form
        ref="searchFormRef"
        :model="queryParams"
        :rules="searchFormRules"
        class="search-form"
        :inline="true"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="queryParams.username"
            placeholder="请输入用户名"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <div class="search-buttons">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-form>
    </div>

    <!-- 操作区域 -->
    <div class="action-section">
      <div class="left-actions">
        <el-button
          v-auth="buttonPermissions.create"
          type="primary"
          @click="openAddDialog"
        >
          <el-icon><Plus /></el-icon>
          新增用户
        </el-button>
      </div>
      <div class="right-actions">
        <button class="refresh-btn" @click="refreshData" title="刷新">
          <el-icon class="icon"><Refresh /></el-icon>
        </button>
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <el-table
        v-loading="loading"
        :data="userList"
        class="user-table"
        stripe
        border
        empty-text="暂无数据"
      >
        <el-table-column prop="user.id" label="ID" width="80" sortable />
        <el-table-column prop="user.username" label="用户名" min-width="120" sortable />
        <el-table-column prop="user.name" label="姓名" min-width="100" sortable />
        <el-table-column prop="roleName" label="角色" min-width="120" />
        <el-table-column prop="user.phone" label="手机号" min-width="130" />
        <el-table-column prop="user.gender" label="性别" width="80">
          <template #default="{ row }">
            <span
              class="gender-tag"
              :class="{ male: row.user.gender === 1, female: row.user.gender === 2 }"
            >
              {{ formatGender(row.user.gender) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="user.status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag
              class="status-tag"
              :class="{ active: row.user.status === 1, inactive: row.user.status === 0 }"
              :type="row.user.status === 1 ? 'success' : 'danger'"
              size="small"
            >
              {{ formatStatus(row.user.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="manager.name" label="上级管理者" min-width="120">
          <template #default="{ row }">
            {{ row.manager?.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="user.createdTime" label="创建时间" min-width="160">
          <template #default="{ row }">
            {{ formatTime(row.user.createdTime) }}
          </template>
        </el-table-column>
        
        <!-- 操作列 -->
        <el-table-column
          prop="action"
          label="操作"
          width="200"
          fixed="right"
        >
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                v-auth="buttonPermissions.edit"
                type="primary"
                link
                size="small"
                @click="openEditDialog(row.user.id)"
              >
                编辑
              </el-button>
              <el-button
                v-auth="buttonPermissions.resetPassword"
                type="warning"
                link
                size="small"
                @click="handleResetPassword(row)"
              >
                重置密码
              </el-button>
              <el-button
                v-auth="buttonPermissions.delete"
                type="danger"
                link
                size="small"
                @click="handleDelete(row)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 空状态 -->
      <div v-if="isEmpty" class="empty-state">
        <el-icon class="empty-icon"><UserFilled /></el-icon>
        <div class="empty-text">暂无用户数据</div>
        <div class="empty-desc">您可以新增用户来开始管理</div>
        <el-button
          v-auth="buttonPermissions.create"
          type="primary"
          @click="openAddDialog"
        >
          新增用户
        </el-button>
      </div>
    </div>

    <!-- 分页区域 -->
    <div v-if="hasData" class="pagination-section">
      <el-pagination
        v-model:current-page="queryParams.page"
        v-model:page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="paginationConfig.pageSizes"
        :layout="paginationConfig.layout"
        background
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 用户表单对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="600px"
      class="user-dialog"
      destroy-on-close
      @close="closeDialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        class="user-form"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            :disabled="isEdit"
            maxlength="20"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item v-if="!isEdit" label="密码" prop="password" class="password-item">
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            maxlength="20"
            show-word-limit
            show-password
          />
        </el-form-item>
        
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="formData.name"
            placeholder="请输入姓名"
            maxlength="10"
            show-word-limit
          />
        </el-form-item>
        
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入手机号"
            maxlength="11"
          />
        </el-form-item>
        
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="formData.gender" class="radio-group">
            <el-radio
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status" class="radio-group">
            <el-radio
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span>{{ item.label }}</span>
              <span style="float: right; color: #999; font-size: 12px;">
                {{ item.desc }}
              </span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleFormSubmit"
          >
            {{ submitButtonText }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Refresh, UserFilled } from '@element-plus/icons-vue'
import { useUserData, useUserForm } from './hooks'
import { userTableColumns, searchFormRules, paginationConfig, buttonPermissions } from './config'
import { statusOptions, genderOptions } from './config'
import { resetUserPassword } from '@/api/userApi'

defineOptions({ name: 'SystemUser' })

// 数据管理
const {
  loading,
  userList,
  total,
  queryParams,
  hasData,
  isEmpty,
  fetchUserList,
  refreshData,
  handleSearch,
  handleReset,
  handlePageChange,
  handleSizeChange,
  handleDelete,
  formatGender,
  formatStatus,
  formatTime
} = useUserData()

// 表单管理
const {
  formRef,
  formData,
  formRules,
  dialogVisible,
  isEdit,
  roleOptions,
  dialogTitle,
  submitButtonText,
  openAddDialog,
  openEditDialog,
  closeDialog,
  resetForm,
  handleSubmit
} = useUserForm()

// 搜索表单引用
const searchFormRef = ref()

// 重置密码
const handleResetPassword = async (row: any) => {
  try {
    const { value: newPassword } = await ElMessageBox.prompt(
      '请输入新密码',
      `重置用户 "${row.user.name}" 的密码`,
      {
        inputPattern: /^.{6,20}$/,
        inputErrorMessage: '密码长度为 6 到 20 个字符',
        inputType: 'password'
      }
    )

    const { data } = await resetUserPassword(row.user.id, newPassword)
    
    if (data.code === 0) {
      ElMessage.success('密码重置成功')
    } else {
      ElMessage.error(data.message || '密码重置失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('重置密码失败:', error)
      ElMessage.error('密码重置失败')
    }
  }
}

// 表单提交成功后刷新数据
const handleFormSubmit = async () => {
  const success = await handleSubmit()
  if (success) {
    await fetchUserList()
  }
}

// 页面初始化
onMounted(() => {
  fetchUserList()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
