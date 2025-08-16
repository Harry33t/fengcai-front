<template>
  <div class="menu-management">
    <!-- 搜索区域 -->
    <div class="search-section">
      <ElForm :model="searchForm" inline>
        <ElFormItem label="菜单名称">
          <ElInput v-model="searchForm.title" placeholder="请输入菜单名称" clearable />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElSelect v-model="searchForm.status" placeholder="请选择状态" clearable>
            <ElOption label="启用" :value="1" />
            <ElOption label="禁用" :value="2" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleSearch">搜索</ElButton>
          <ElButton @click="handleReset">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </div>

    <!-- 操作区域 -->
    <div class="action-section">
      <ElButton type="primary" @click="showAddDialog">添加一级菜单</ElButton>
    </div>

    <!-- 表格区域 -->
    <ElTable 
      :data="treeMenuList" 
      :loading="loading"
      row-key="id"
      default-expand-all
      tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <ElTableColumn prop="title" label="菜单名称" min-width="200" />
      <ElTableColumn prop="path" label="路由路径" width="200">
        <template #default="{ row }">
          <span v-if="row.path">{{ row.path }}</span>
          <span v-else class="text-gray-400">-</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="component" label="组件路径" width="200">
        <template #default="{ row }">
          <span v-if="row.component && row.level > 1">{{ row.component }}</span>
          <span v-else class="text-gray-400">{{ row.level === 1 ? '布局组件' : '-' }}</span>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="sort" label="排序" width="80" align="center" />
      <ElTableColumn prop="status" label="状态" width="80" align="center">
        <template #default="{ row }">
          <ElTag :type="row.status === 1 ? 'success' : 'danger'" size="small">
            {{ row.status === 1 ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" width="300" fixed="right">
        <template #default="{ row }">
          <div class="table-actions">
            <!-- 调试信息：显示菜单层级 -->
            <span style="font-size: 10px; color: #999; margin-right: 5px;">L{{ row.level }}|P{{ row.parentId }}</span>
            <ElButton size="small" type="primary" link @click="showEditDialog(row)">
              编辑
            </ElButton>
            <!-- 最多支持3级菜单 -->
            <ElButton 
              v-if="canAddSubmenu(row)" 
              size="small" 
              type="success" 
              link 
              @click="showAddChildDialog(row)"
            >
              添加子菜单
            </ElButton>
            <ElButton 
              size="small" 
              type="warning" 
              link 
              @click="showAuthDialog(row)"
            >
              权限管理
            </ElButton>
            <ElButton size="small" type="danger" link @click="handleDeleteMenu(row)">
              删除
            </ElButton>
          </div>
        </template>
      </ElTableColumn>
    </ElTable>

    <!-- 添加/编辑菜单对话框 -->
    <ElDialog 
      v-model="dialogVisible" 
      :title="dialogMode === 'edit' ? '编辑菜单' : '添加菜单'"
      width="600px"
      @close="closeDialog"
    >
      <ElForm :model="menuForm" :rules="formRules" ref="formRef" label-width="100px">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="菜单名称" prop="title">
              <ElInput v-model="menuForm.title" placeholder="请输入菜单名称" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="路由路径" prop="path">
              <ElInput 
                v-model="menuForm.path" 
                :placeholder="menuForm.isFirstLevel === 1 ? '请输入路由路径，如 /system' : '请输入路由路径，如 menu'" 
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="路由名称" prop="name">
              <ElInput v-model="menuForm.name" placeholder="请输入路由名称" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="组件路径" prop="component">
              <ElInput 
                v-model="menuForm.component" 
                placeholder="请输入组件路径，如 system/menu/index" 
                :disabled="menuForm.isFirstLevel === 1"
              />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="排序">
              <ElInputNumber v-model="menuForm.sort" :min="1" :max="999" style="width: 100%" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="状态">
              <ElRadioGroup v-model="menuForm.status">
                <ElRadio :value="1">启用</ElRadio>
                <ElRadio :value="2">禁用</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="是否隐藏">
              <ElRadioGroup v-model="menuForm.isHide">
                <ElRadio :value="1">显示</ElRadio>
                <ElRadio :value="2">隐藏</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="缓存页面">
              <ElRadioGroup v-model="menuForm.keepAlive">
                <ElRadio :value="1">是</ElRadio>
                <ElRadio :value="2">否</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="菜单类型">
              <ElRadioGroup v-model="menuForm.isFirstLevel" disabled>
                <ElRadio :value="1">顶级菜单</ElRadio>
                <ElRadio :value="2">子菜单</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
      
      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="closeDialog">取消</ElButton>
          <ElButton type="primary" @click="handleSaveMenu" :loading="saveLoading">
            确定
          </ElButton>
        </div>
      </template>
    </ElDialog>

    <!-- 智能按钮权限管理对话框 -->
    <SmartAuthDialog 
      v-model:visible="authDialogVisible" 
      :menu-data="selectedMenuData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRadio,
  ElTag,
  ElMessage,
  ElMessageBox,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  type FormInstance
} from 'element-plus'
import { MenuService } from '@/services/menuService'
import { useMenuData } from './hooks/useMenuData'
import { menuFormRules, defaultMenuForm } from './config'
import SmartAuthDialog from './components/SmartAuthDialog.vue'
import type { IMenuItem } from '@/service/menu/type'

// 使用菜单数据管理 Hook
const {
  loading,
  treeMenuList,
  searchForm,
  fetchMenuData,
  handleSearch,
  handleReset,
  canAddSubmenu,
  refreshData
} = useMenuData()

// 对话框相关状态
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit' | 'addChild'>('add')
const saveLoading = ref(false)
const formRef = ref<FormInstance>()

// 菜单表单
const menuForm = ref({
  ...defaultMenuForm
})

// 权限管理对话框状态
const authDialogVisible = ref(false)
const selectedMenuData = ref<IMenuItem | null>(null)

// 表单验证规则（动态生成）
const formRules = computed(() => {
  const rules = { ...menuFormRules }
  
  // 动态设置路径验证规则
  if (rules.path && Array.isArray(rules.path) && rules.path[0]) {
    (rules.path[0] as any).isFirstLevel = menuForm.value.isFirstLevel === 1
  }
  
  // 动态设置组件验证规则  
  if (rules.component && Array.isArray(rules.component) && rules.component[0]) {
    // 一级菜单不需要组件路径
    (rules.component[0] as any).needComponent = menuForm.value.isFirstLevel !== 1
  }
  
  return rules
})

// 显示添加一级菜单对话框
const showAddDialog = () => {
  dialogMode.value = 'add'
  resetForm()
  menuForm.value.isFirstLevel = 1
  menuForm.value.level = 1
  menuForm.value.parentId = 0
  // 一级菜单不需要组件路径
  menuForm.value.component = ''
  dialogVisible.value = true
}

// 显示编辑菜单对话框
const showEditDialog = (menu: any) => {
  dialogMode.value = 'edit'
  resetForm()
  Object.assign(menuForm.value, menu)
  dialogVisible.value = true
}

// 显示添加子菜单对话框
const showAddChildDialog = (parentMenu: any) => {
  dialogMode.value = 'addChild'
  resetForm()
  menuForm.value.parentId = parentMenu.id
  menuForm.value.level = parentMenu.level + 1
  menuForm.value.isFirstLevel = 2
  dialogVisible.value = true
}

// 重置表单
const resetForm = () => {
  Object.assign(menuForm.value, defaultMenuForm)
  formRef.value?.clearValidate()
}

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false
  resetForm()
}

// 保存菜单
const handleSaveMenu = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    saveLoading.value = true
    
    const params = { ...menuForm.value }
    let result
    
    if (dialogMode.value === 'edit') {
      // 确保ID是字符串类型
      const updateParams = { ...params, id: String(params.id) }
      result = await MenuService.updateMenu(updateParams)
    } else {
      result = await MenuService.createMenu(params)
    }
    
    if (result) {
      closeDialog()
      refreshData()
    }
  } catch (error) {
    console.error('保存菜单失败:', error)
    ElMessage.error('保存菜单失败')
  } finally {
    saveLoading.value = false
  }
}

// 删除菜单
const handleDeleteMenu = async (menu: any) => {
  const hasChildren = menu.children && menu.children.length > 0
  const confirmText = hasChildren 
    ? `确定要删除菜单"${menu.title}"吗？删除后其子菜单也将被删除！`
    : `确定要删除菜单"${menu.title}"吗？`
  
  try {
    await ElMessageBox.confirm(confirmText, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    const success = await MenuService.deleteMenu(menu.id)
    if (success) {
      refreshData()
    }
  } catch (error: any) {
    if (error !== 'cancel') {
      console.error('删除菜单失败:', error)
      ElMessage.error('删除菜单失败，服务器错误')
    }
  }
}

// 显示权限管理对话框
const showAuthDialog = (row: IMenuItem) => {
  try {
    console.log('点击权限管理，菜单数据:', row)
    selectedMenuData.value = row
    authDialogVisible.value = true
    console.log('对话框状态设置为:', authDialogVisible.value)
  } catch (error) {
    console.error('显示权限管理对话框出错:', error)
  }
}

// 生命周期钩子
onMounted(() => {
  fetchMenuData()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
