<template>
  <div class="role-management">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="角色名称">
          <el-input 
            v-model="searchForm.name" 
            placeholder="请输入角色名称" 
            clearable 
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select 
            v-model="searchForm.status" 
            placeholder="请选择状态" 
            clearable 
            style="width: 120px"
          >
            <el-option 
              v-for="option in roleStatusOptions" 
              :key="option.value" 
              :label="option.label" 
              :value="option.value" 
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作区域 -->
    <div class="action-section">
      <div class="action-left">
        <el-button type="primary" @click="openAddDialog">
          <el-icon><Plus /></el-icon>
          新增角色
        </el-button>
      </div>
      <div class="action-right">
        共 {{ total }} 条记录
      </div>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <el-table 
        :data="roleList" 
        :loading="loading"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="name" label="角色名称" min-width="150" />
        <el-table-column prop="desc" label="角色描述" min-width="200" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <span :class="['status-tag', row.status === 1 ? 'enabled' : 'disabled']">
              {{ row.status === 1 ? '启用' : '禁用' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间" width="180" align="center">
          <template #default="{ row }">
            {{ formatTime(row.createdTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedTime" label="更新时间" width="180" align="center">
          <template #default="{ row }">
            {{ formatTime(row.updatedTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row }">
            <div class="table-actions">
              <el-button size="small" type="primary" link @click="openEditDialog(row)">
                编辑
              </el-button>
              <el-button size="small" type="success" link @click="openPermissionDialog(row)">
                权限管理
              </el-button>
              <el-button size="small" type="danger" link @click="handleDeleteRole(row)">
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div class="pagination-section">
      <el-pagination
        v-model:current-page="searchForm.page"
        v-model:page-size="searchForm.pageSize"
        :total="total"
        :page-sizes="paginationConfig.pageSizes"
        :layout="paginationConfig.layout"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? dialogConfig.title.edit : dialogConfig.title.add"
      :width="dialogConfig.width"
      class="role-dialog"
      @close="closeDialog"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="roleFormRules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input 
            v-model="formData.name" 
            placeholder="请输入角色名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input 
            v-model="formData.desc" 
            type="textarea" 
            :rows="3"
            placeholder="请输入角色描述"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.status">
            <el-radio value="1">启用</el-radio>
            <el-radio value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">{{ dialogConfig.cancelText }}</el-button>
          <el-button type="primary" @click="handleSaveRole" :loading="saveLoading">
            {{ dialogConfig.confirmText }}
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 权限管理对话框 -->
    <el-dialog
      v-model="permissionDialogVisible"
      :title="`分配权限 - ${currentRole?.name || ''}`"
      :width="permissionDialogConfig.width"
      class="permission-dialog"
      @close="closePermissionDialog"
    >
      <div class="permission-header">
        <div class="role-info">
          <div class="role-name">{{ currentRole?.name }}</div>
          <div class="role-desc">{{ currentRole?.desc }}</div>
        </div>
        <div class="permission-actions">
          <el-button @click="toggleExpandAll">
            {{ isExpandAll ? '全部收起' : '全部展开' }}
          </el-button>
          <el-button @click="toggleSelectAll">
            {{ isSelectAll ? '取消全选' : '全部选择' }}
          </el-button>
        </div>
      </div>

      <div class="permission-content">
        <div v-if="permissionLoading" class="loading-container">
          <el-icon class="is-loading"><Loading /></el-icon>
          <span class="loading-text">正在加载权限数据...</span>
        </div>
        <el-tree
          v-else
          ref="treeRef"
          :data="permissionTreeData"
          :props="treeConfig.props"
          :node-key="treeConfig.nodeKey"
          :default-expand-all="treeConfig.defaultExpandAll"
          :show-checkbox="treeConfig.showCheckbox"
          :default-checked-keys="[...(selectedMenuIds || []), ...(selectedAuthIds || [])]"
          @check="handleTreeCheck"
        >
          <template #default="{ data }">
            <span v-if="data" :class="{ 'auth-node': data.isAuth, 'menu-node': data.isMenu }">
              <el-icon v-if="data.isMenu" style="margin-right: 4px;">
                <Folder />
              </el-icon>
              <el-icon v-else-if="data.isAuth" style="margin-right: 4px;">
                <Key />
              </el-icon>
              {{ data.label || '未命名节点' }}
            </span>
          </template>
        </el-tree>
      </div>

      <template #footer>
        <div class="permission-footer">
          <el-button @click="closePermissionDialog">取消</el-button>
          <el-button type="primary" @click="handleSavePermissions" :loading="permissionLoading">
            保存权限
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type FormInstance } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElRadioGroup,
  ElRadio,
  ElTree,
  ElIcon
} from 'element-plus'
import { Plus, Search, Loading, Folder, Key } from '@element-plus/icons-vue'

// 导入hooks
import { useRoleData } from './hooks/useRoleData'
import { useRoleManagement } from './hooks/useRoleManagement'
import { useRolePermission } from './hooks/useRolePermission'

// 导入配置
import { 
  roleStatusOptions,
  paginationConfig,
  dialogConfig,
  permissionDialogConfig,
  treeConfig
} from './config'
import { roleFormRules } from './config/rules'

// 导入类型
import type { IRole } from '@/service/role/type'

defineOptions({ name: 'RoleManagement' })

// 使用数据管理hooks
const {
  loading,
  roleList,
  total,
  searchForm,
  fetchRoleList,
  handleSearch,
  handleReset,
  refreshData,
  handlePageChange,
  handleSizeChange
} = useRoleData()

// 使用角色管理hooks
const {
  dialogVisible,
  isEdit,
  formData,
  openAddDialog,
  openEditDialog,
  closeDialog,
  saveRole,
  deleteRole,
  validateForm
} = useRoleManagement()

// 使用权限管理hooks
const {
  permissionDialogVisible,
  currentRole,
  loading: permissionLoading,
  permissionTreeData,
  isExpandAll,
  isSelectAll,
  treeRef,
  selectedMenuIds,
  selectedAuthIds,
  openPermissionDialog,
  closePermissionDialog,
  saveRolePermissions,
  toggleExpandAll,
  toggleSelectAll,
  handleTreeCheck
} = useRolePermission()

// 表单引用
const formRef = ref<FormInstance>()
const saveLoading = ref(false)

// 格式化时间
const formatTime = (timestamp: number) => {
  if (!timestamp) return '-'
  return new Date(timestamp * 1000).toLocaleString('zh-CN')
}

// 处理保存角色
const handleSaveRole = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    if (!validateForm()) return
    
    saveLoading.value = true
    const success = await saveRole()
    
    if (success) {
      refreshData()
    }
  } catch (error) {
    console.error('保存角色失败:', error)
  } finally {
    saveLoading.value = false
  }
}

// 处理删除角色
const handleDeleteRole = async (role: IRole) => {
  const success = await deleteRole(role)
  if (success) {
    refreshData()
  }
}

// 处理保存权限
const handleSavePermissions = async () => {
  const success = await saveRolePermissions()
  if (success) {
    // 权限保存成功后可以刷新列表或者做其他操作
    console.log('权限保存成功')
  }
}

// 生命周期钩子
onMounted(() => {
  fetchRoleList()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
