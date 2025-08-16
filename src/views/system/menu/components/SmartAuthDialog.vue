<template>
  <el-dialog 
    v-model="dialogVisible" 
    :title="`管理「${menuTitle}」的按钮权限`"
    width="700px"
    class="smart-auth-dialog"
    @close="handleClose"
  >
    <!-- 菜单信息 -->
    <div class="menu-info">
      <el-alert type="info" :closable="false">
        <template #title>
          <span>当前菜单：<strong>{{ menuTitle }}</strong>（ID: {{ menuId }}）</span>
        </template>
      </el-alert>
    </div>

    <!-- 权限选择区域 -->
    <div class="permission-section">
      <h4>选择权限类型</h4>
      <div class="permission-grid">
        <div 
          v-for="permission in availablePermissions" 
          :key="permission.mark"
          class="permission-card"
          :class="{ 'selected': isSelected(permission.mark) }"
          @click="togglePermission(permission)"
        >
          <div class="permission-icon">
            <el-icon>
              <component :is="permission.icon" />
            </el-icon>
          </div>
          <div class="permission-info">
            <div class="permission-title">{{ permission.title }}</div>
            <div class="permission-mark">{{ permission.mark }}</div>
            <div class="permission-desc">{{ permission.description }}</div>
          </div>
          <div class="permission-status">
            <el-icon v-if="isSelected(permission.mark)" class="check-icon">
              <Check />
            </el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 已选权限预览 -->
    <div class="selected-section" v-if="selectedPermissions.length > 0">
      <h4>已选择的权限</h4>
      <div class="selected-tags">
        <el-tag 
          v-for="permission in selectedPermissions"
          :key="permission.mark"
          closable
          size="large"
          type="primary"
          @close="removePermission(permission.mark)"
        >
          <el-icon style="margin-right: 4px;">
            <component :is="permission.icon" />
          </el-icon>
          {{ permission.title }} ({{ permission.mark }})
        </el-tag>
      </div>
    </div>

    <!-- 当前权限状态 -->
    <div class="current-section">
      <h4>当前权限状态</h4>
      <div v-if="loading" class="loading-state">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>正在加载权限数据...</span>
      </div>
      <div v-else-if="currentPermissions.length > 0" class="current-permissions">
        <div 
          v-for="perm in currentPermissions"
          :key="perm.id"
          class="permission-item"
        >
          <el-tag size="small" type="success">
            {{ perm.title }} ({{ perm.mark }})
          </el-tag>
          <div class="permission-actions">
            <el-button 
              size="small" 
              type="primary" 
              link 
              @click="handleEditPermission(perm)"
            >
              <el-icon><Edit /></el-icon>
              编辑
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              link 
              @click="handleDeleteSinglePermission(perm)"
            >
              <el-icon><Delete /></el-icon>
              删除
            </el-button>
          </div>
        </div>
      </div>
      <div v-else class="no-permissions">
        <el-empty description="该菜单暂无权限配置" :image-size="60" />
      </div>
    </div>

    <!-- 底部操作 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="handleRefresh" :loading="loading">刷新状态</el-button>
        <el-button 
          type="primary" 
          @click="handleSave" 
          :loading="saveLoading"
          :disabled="!hasChanges"
        >
          保存权限 ({{ selectedPermissions.length }}项)
        </el-button>
      </div>
    </template>

    <!-- 编辑单个权限对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑按钮权限"
      width="500px"
      append-to-body
      @close="closeEditDialog"
    >
      <el-form
        :model="editForm"
        :rules="editRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="所属菜单">
          <el-input :value="menuTitle" disabled />
        </el-form-item>
        
        <el-form-item label="权限标识" prop="mark">
          <el-input 
            v-model="editForm.mark" 
            placeholder="请输入权限标识，如: create"
            clearable
          />
        </el-form-item>
        
        <el-form-item label="权限名称" prop="title">
          <el-input 
            v-model="editForm.title" 
            placeholder="请输入权限名称，如: 新增"
            clearable
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeEditDialog">取消</el-button>
          <el-button type="primary" @click="handleSaveEdit" :loading="editSaveLoading">
            保存
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  ElDialog, 
  ElButton, 
  ElTag,
  ElAlert,
  ElEmpty,
  ElIcon,
  ElMessage,
  ElMessageBox,
  ElForm,
  ElFormItem,
  ElInput
} from 'element-plus'
import { 
  Plus, 
  Edit, 
  Delete, 
  View, 
  Check,
  Loading
} from '@element-plus/icons-vue'
import { useMenuAuth } from '../hooks/useMenuAuth'
import type { IMenuItem } from '@/service/menu/type'

// Props
interface Props {
  visible?: boolean
  menuData?: IMenuItem | null
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  menuData: null
})

// Emits
const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

// 计算属性
const dialogVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const menuId = computed(() => props.menuData?.id || '')
const menuTitle = computed(() => props.menuData?.title || '')

// 使用权限管理Hook
const {
  loading,
  authList,
  fetchAuthList
} = useMenuAuth()

// 本地状态
const saveLoading = ref(false)
const selectedPermissions = ref<Array<any>>([])
const currentPermissions = computed(() => authList.value)

// 编辑对话框状态
const editDialogVisible = ref(false)
const editSaveLoading = ref(false)
const editFormRef = ref()
const editForm = ref({
  id: '',
  mark: '',
  title: ''
})

// 编辑表单验证规则
const editRules = {
  mark: [
    { required: true, message: '请输入权限标识', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '请输入权限名称', trigger: 'blur' }
  ]
}

// 可用权限定义
const availablePermissions = [
  {
    mark: 'create',
    title: '新增',
    description: '创建新的数据记录',
    icon: Plus
  },
  {
    mark: 'edit',
    title: '编辑',
    description: '修改现有数据记录',
    icon: Edit
  },
  {
    mark: 'delete',
    title: '删除',
    description: '删除数据记录',
    icon: Delete
  },
  {
    mark: 'view',
    title: '查看',
    description: '查看详细信息',
    icon: View
  }
]

// 监听对话框显示状态
watch([() => props.visible, () => props.menuData], ([visible, menuData]) => {
  if (visible && menuData?.id) {
    console.log('智能权限对话框打开，menuId:', menuData.id)
    fetchAuthList(menuData.id)
    // 根据当前权限初始化选中状态
    initializeSelectedPermissions()
  }
}, { immediate: false })

// 监听当前权限变化，同步到选中状态
watch(currentPermissions, (permissions) => {
  selectedPermissions.value = permissions.map(p => 
    availablePermissions.find(ap => ap.mark === p.mark)
  ).filter(Boolean)
}, { immediate: true })

// 初始化选中权限
const initializeSelectedPermissions = () => {
  selectedPermissions.value = currentPermissions.value.map(p => 
    availablePermissions.find(ap => ap.mark === p.mark)
  ).filter(Boolean)
}

// 检查权限是否已选中
const isSelected = (mark: string) => {
  return selectedPermissions.value.some(p => p.mark === mark)
}

// 切换权限选择状态
const togglePermission = (permission: any) => {
  const index = selectedPermissions.value.findIndex(p => p.mark === permission.mark)
  if (index > -1) {
    selectedPermissions.value.splice(index, 1)
  } else {
    selectedPermissions.value.push(permission)
  }
}

// 移除权限
const removePermission = (mark: string) => {
  const index = selectedPermissions.value.findIndex(p => p.mark === mark)
  if (index > -1) {
    selectedPermissions.value.splice(index, 1)
  }
}

// 检查是否有变更
const hasChanges = computed(() => {
  const currentMarks = currentPermissions.value.map(p => p.mark).sort()
  const selectedMarks = selectedPermissions.value.map(p => p.mark).sort()
  return JSON.stringify(currentMarks) !== JSON.stringify(selectedMarks)
})

// 处理关闭
const handleClose = () => {
  dialogVisible.value = false
  selectedPermissions.value = []
}

// 处理刷新
const handleRefresh = () => {
  if (menuId.value) {
    fetchAuthList(menuId.value)
  }
}

// 处理编辑权限
const handleEditPermission = (permission: any) => {
  editForm.value = {
    id: String(permission.id),
    mark: permission.mark,
    title: permission.title
  }
  editDialogVisible.value = true
}

// 关闭编辑对话框
const closeEditDialog = () => {
  editDialogVisible.value = false
  editForm.value = {
    id: '',
    mark: '',
    title: ''
  }
  editFormRef.value?.clearValidate()
}

// 保存编辑的权限
const handleSaveEdit = async () => {
  if (!editFormRef.value) return
  
  try {
    await editFormRef.value.validate()
    editSaveLoading.value = true
    
    const { MenuAuthService } = await import('@/services/menuAuthService')
    
    const updateData = {
      id: editForm.value.id,
      menuId: menuId.value,
      mark: editForm.value.mark,
      title: editForm.value.title
    }
    
    console.log('更新权限数据:', updateData)
    
    const result = await MenuAuthService.updateAuth(updateData)
    if (result) {
      ElMessage.success('权限更新成功')
      closeEditDialog()
      // 刷新权限列表
      await fetchAuthList(menuId.value)
    }
  } catch (error) {
    console.error('更新权限失败:', error)
    ElMessage.error('更新权限失败')
  } finally {
    editSaveLoading.value = false
  }
}

// 删除单个权限
const handleDeleteSinglePermission = async (permission: any) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除权限「${permission.title}」吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    const { MenuAuthService } = await import('@/services/menuAuthService')
    const result = await MenuAuthService.deleteAuth(permission.id)
    
    if (result) {
      ElMessage.success('权限删除成功')
      // 刷新权限列表
      await fetchAuthList(menuId.value)
    }
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除权限失败:', error)
      ElMessage.error('删除权限失败')
    }
  }
}

// 处理保存
const handleSave = async () => {
  if (!menuId.value) return
  
  try {
    saveLoading.value = true
    
    console.log('保存权限配置:')
    console.log('菜单ID:', menuId.value)
    console.log('当前权限:', currentPermissions.value.map(p => ({ mark: p.mark, title: p.title })))
    console.log('选中权限:', selectedPermissions.value.map(p => ({ mark: p.mark, title: p.title })))
    
    // 获取当前权限的标识列表
    const currentMarks = currentPermissions.value.map(p => p.mark)
    const selectedMarks = selectedPermissions.value.map(p => p.mark)
    
    // 找出需要新增的权限
    const toAdd = selectedMarks.filter(mark => !currentMarks.includes(mark))
    // 找出需要删除的权限
    const toDelete = currentMarks.filter(mark => !selectedMarks.includes(mark))
    
    console.log('需要新增的权限:', toAdd)
    console.log('需要删除的权限:', toDelete)
    
    // 引入MenuAuthService
    const { MenuAuthService } = await import('@/services/menuAuthService')
    
    let hasError = false
    let successCount = 0
    let totalOperations = toAdd.length + toDelete.length
    
    // 批量创建新权限
    for (const mark of toAdd) {
      const permission = selectedPermissions.value.find(p => p.mark === mark)
      if (permission) {
        try {
          const result = await MenuAuthService.createAuth({
            menuId: Number(menuId.value),
            mark: permission.mark,
            title: permission.title
          })
          if (result) {
            successCount++
            console.log(`成功创建权限: ${permission.title}`)
          }
        } catch (error) {
          console.error(`创建权限失败: ${permission.title}`, error)
          hasError = true
        }
      }
    }
    
    // 批量删除权限
    for (const mark of toDelete) {
      const permission = currentPermissions.value.find(p => p.mark === mark)
      if (permission) {
        try {
          const result = await MenuAuthService.deleteAuth(permission.id)
          if (result) {
            successCount++
            console.log(`成功删除权限: ${permission.title}`)
          }
        } catch (error) {
          console.error(`删除权限失败: ${permission.title}`, error)
          hasError = true
        }
      }
    }
    
    // 显示操作结果
    if (totalOperations === 0) {
      ElMessage.info('权限配置无变化')
    } else if (successCount === totalOperations) {
      ElMessage.success(`权限配置保存成功！完成 ${successCount} 项操作`)
    } else if (successCount > 0) {
      ElMessage.warning(`部分操作成功：${successCount}/${totalOperations}`)
    } else {
      ElMessage.error('权限配置保存失败')
    }
    
    // 刷新权限列表
    await fetchAuthList(menuId.value)
    
  } catch (error) {
    console.error('保存权限配置失败:', error)
    ElMessage.error('保存权限配置失败')
  } finally {
    saveLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.smart-auth-dialog {
  .menu-info {
    margin-bottom: 20px;
  }

  .permission-section {
    margin-bottom: 24px;
    
    h4 {
      margin: 0 0 16px 0;
      color: #303133;
      font-size: 16px;
      font-weight: 600;
    }

    .permission-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 12px;
    }

    .permission-card {
      border: 1px solid #e4e7ed;
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      background: white;

      &:hover {
        border-color: #409eff;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.15);
      }

      &.selected {
        border-color: #409eff;
        background: #ecf5ff;
        
        .permission-icon {
          color: #409eff;
        }
      }

      .permission-icon {
        font-size: 24px;
        color: #909399;
        transition: color 0.2s ease;
      }

      .permission-info {
        flex: 1;
        
        .permission-title {
          font-size: 14px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 4px;
        }
        
        .permission-mark {
          font-size: 12px;
          color: #409eff;
          font-family: 'Monaco', 'Menlo', monospace;
          margin-bottom: 4px;
        }
        
        .permission-desc {
          font-size: 12px;
          color: #909399;
          line-height: 1.4;
        }
      }

      .permission-status {
        .check-icon {
          color: #67c23a;
          font-size: 18px;
        }
      }
    }
  }

  .selected-section, .current-section {
    margin-bottom: 20px;
    
    h4 {
      margin: 0 0 12px 0;
      color: #303133;
      font-size: 14px;
      font-weight: 600;
    }

    .selected-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .el-tag {
        margin: 0;
      }
    }

    .current-permissions {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .permission-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        border: 1px solid #e4e7ed;
        border-radius: 6px;
        background: #f8f9fa;
        transition: all 0.2s ease;

        &:hover {
          border-color: #409eff;
          background: #ecf5ff;
        }

        .permission-actions {
          display: flex;
          gap: 4px;

          .el-button {
            padding: 2px 4px;
            font-size: 12px;
          }
        }
      }
    }

    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      color: #909399;
      gap: 8px;
    }

    .no-permissions {
      text-align: center;
      padding: 20px;
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }
}

// 深色主题适配
.dark {
  .smart-auth-dialog {
    .permission-card {
      background: #1d1e1f;
      border-color: #414243;
      
      &:hover {
        background: #262727;
      }
      
      &.selected {
        background: #1f2937;
      }
      
      .permission-title {
        color: #e5eaf3;
      }
    }
  }
}
</style>