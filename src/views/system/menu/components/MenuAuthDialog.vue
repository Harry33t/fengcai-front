<template>
  <el-dialog 
    v-model="dialogVisible" 
    :title="`管理「${menuTitle}」的按钮权限`"
    width="800px"
    class="menu-auth-dialog"
    @close="handleClose"
  >
    <!-- 菜单信息显示 -->
    <div class="menu-info">
      <el-descriptions title="菜单信息" :column="2" border>
        <el-descriptions-item label="菜单名称">{{ menuTitle }}</el-descriptions-item>
        <el-descriptions-item label="菜单ID">{{ menuId }}</el-descriptions-item>
        <el-descriptions-item label="路由路径">{{ menuPath || '-' }}</el-descriptions-item>
        <el-descriptions-item label="菜单层级">{{ menuLevel }}级菜单</el-descriptions-item>
      </el-descriptions>
    </div>

    <!-- 操作按钮 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleAdd">
        <el-icon><Plus /></el-icon>
        新增权限
      </el-button>
      <el-button @click="handleRefresh" :loading="loading">
        <el-icon><Refresh /></el-icon>
        刷新
      </el-button>
      <!-- 暂时禁用自动刷新提示 -->
      <!-- <span class="auto-refresh-info">
        <el-icon><Clock /></el-icon>
        自动刷新：每5秒
      </span> -->
    </div>

    <!-- 权限列表 -->
    <div class="auth-content">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>正在加载权限数据...</span>
      </div>

      <!-- 权限表格 -->
      <el-table 
        v-else-if="authList.length > 0" 
        :data="authList" 
        style="width: 100%"
        border
      >
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="mark" label="权限标识" width="150">
          <template #default="{ row }">
            <el-tag class="auth-mark">{{ row.mark }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="权限名称" width="150">
          <template #default="{ row }">
            <span class="auth-title">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdTime" label="创建时间" width="160" align="center">
          <template #default="{ row }">
            <span class="auth-time">{{ formatTime(row.createdTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updatedTime" label="更新时间" width="160" align="center">
          <template #default="{ row }">
            <span class="auth-time">{{ formatTime(row.updatedTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" link @click="handleDelete(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <el-empty description="该菜单暂无按钮权限">
          <el-button type="primary" @click="handleAdd">立即新增</el-button>
        </el-empty>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </template>

    <!-- 新增/编辑权限对话框 -->
    <el-dialog 
      v-model="authDialogVisible" 
      :title="isEdit ? '编辑按钮权限' : '新增按钮权限'"
      width="500px"
      append-to-body
      @close="closeAuthDialog"
    >
      <el-form 
        :model="formData" 
        :rules="authFormRules" 
        ref="formRef" 
        label-width="100px"
      >
        <el-form-item label="所属菜单">
          <el-input :value="menuTitle" disabled />
        </el-form-item>
        
        <el-form-item label="权限标识" prop="mark">
          <el-input 
            v-model="formData.mark" 
            placeholder="请输入权限标识，如: create"
            clearable
          />
          <div class="form-tips">
            <div class="tip-item">• 权限标识用于代码中的权限检查</div>
            <div class="tip-item">• 建议使用动词形式，如：create、edit、delete</div>
          </div>
          <div class="quick-select">
            <el-tag 
              v-for="option in commonAuthOptions" 
              :key="option.value"
              class="quick-tag"
              size="small"
              @click="selectQuickAuth(option.value)"
            >
              {{ option.label }}
            </el-tag>
          </div>
        </el-form-item>
        
        <el-form-item label="权限名称" prop="title">
          <el-input 
            v-model="formData.title" 
            placeholder="请输入权限名称，如: 新增"
            clearable
          />
          <div class="form-tips">
            <div class="tip-item">• 权限名称用于界面显示</div>
          </div>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeAuthDialog">取消</el-button>
          <el-button type="primary" @click="handleSaveAuth" :loading="saveLoading">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted, type FormInstance } from 'vue'
import { 
  ElDialog, 
  ElButton, 
  ElTable, 
  ElTableColumn, 
  ElTag,
  ElEmpty,
  ElDescriptions,
  ElDescriptionsItem,
  ElForm,
  ElFormItem,
  ElInput,
  ElIcon
} from 'element-plus'
import { Plus, Refresh, Loading, Clock } from '@element-plus/icons-vue'
import { useMenuAuth } from '../hooks/useMenuAuth'
import { authFormRules, commonAuthOptions } from '../config/menuAuthConfig'
import type { IButtonAuth, IMenuItem } from '@/service/menu/type'

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
const menuPath = computed(() => props.menuData?.path || '')
const menuLevel = computed(() => props.menuData?.level || 1)

// 使用按钮权限管理 Hook
const {
  loading,
  authList,
  dialogVisible: authDialogVisible,
  isEdit,
  formData,
  fetchAuthList,
  openAddDialog,
  openEditDialog,
  closeDialog: closeAuthDialog,
  handleSave,
  deleteAuth,
  validateForm
} = useMenuAuth()

// 表单引用和保存加载状态
const formRef = ref<FormInstance>()
const saveLoading = ref(false)

// 监听对话框显示状态和菜单数据变化
watch([() => props.visible, () => props.menuData], ([visible, menuData]) => {
  try {
    console.log('监听器触发，visible:', visible, 'menuData:', menuData)
    if (visible && menuData?.id) {
      console.log('准备获取权限列表，menuId:', menuData.id)
      fetchAuthList(menuData.id)
    }
  } catch (error) {
    console.error('监听器出错:', error)
  }
}, { immediate: false })

// 临时禁用自动刷新功能，避免干扰
// 定时刷新权限列表（当对话框打开时）
// let refreshTimer: number | null = null

// watch(() => props.visible, (visible) => {
//   try {
//     if (visible && props.menuData?.id) {
//       console.log('对话框打开，启动定时刷新')
//       // 对话框打开时，启动定时刷新
//       refreshTimer = window.setInterval(() => {
//         if (props.menuData?.id) {
//           fetchAuthList(props.menuData.id)
//         }
//       }, 5000) // 每5秒刷新一次
//     } else {
//       console.log('对话框关闭，清除定时器')
//       // 对话框关闭时，清除定时器
//       if (refreshTimer) {
//         window.clearInterval(refreshTimer)
//         refreshTimer = null
//       }
//     }
//   } catch (error) {
//     console.error('定时器设置出错:', error)
//   }
// })


// 格式化时间
const formatTime = (timestamp: number) => {
  if (!timestamp) return '-'
  return new Date(timestamp * 1000).toLocaleString('zh-CN')
}

// 处理关闭
const handleClose = () => {
  dialogVisible.value = false
}

// 处理新增
const handleAdd = () => {
  if (!menuId.value) return
  openAddDialog(menuId.value)
}

// 处理编辑
const handleEdit = (auth: IButtonAuth) => {
  openEditDialog(auth)
}

// 处理删除
const handleDelete = (auth: IButtonAuth) => {
  deleteAuth(auth).then(() => {
    // 删除成功后刷新列表
    if (menuId.value) {
      fetchAuthList(menuId.value)
    }
  })
}

// 处理刷新
const handleRefresh = () => {
  if (menuId.value) {
    fetchAuthList(menuId.value)
  }
}

// 快速选择权限标识
const selectQuickAuth = (mark: string) => {
  formData.mark = mark
  // 自动设置对应的中文名称
  const option = commonAuthOptions.find(opt => opt.value === mark)
  if (option && !formData.title) {
    formData.title = option.label.split(' ')[0]
  }
}

// 处理保存权限
const handleSaveAuth = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    if (!validateForm()) return
    
    saveLoading.value = true
    await handleSave()
    
    // 保存成功后刷新列表
    if (menuId.value) {
      await fetchAuthList(menuId.value)
    }
  } catch (error) {
    console.error('保存权限失败:', error)
  } finally {
    saveLoading.value = false
  }
}

// 组件销毁时清理定时器（暂时禁用）
// onUnmounted(() => {
//   if (refreshTimer) {
//     clearInterval(refreshTimer)
//     refreshTimer = null
//   }
// })
</script>

<style lang="scss" scoped>
.menu-auth-dialog {
  .menu-info {
    margin-bottom: 20px;
  }

  .action-bar {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
    
    .auto-refresh-info {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #909399;
      
      .el-icon {
        font-size: 14px;
      }
    }
  }

  .auth-content {
    min-height: 200px;

    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      color: #909399;
      gap: 8px;
    }

    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .auth-mark {
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      background-color: #f1f3f4;
      color: #5f6368;
      border: none;
      font-size: 12px;
      font-weight: 500;
    }

    .auth-title {
      font-weight: 500;
      color: #303133;
    }

    .auth-time {
      color: #909399;
      font-size: 13px;
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  // 权限表单样式
  .form-tips {
    margin-top: 4px;
    font-size: 12px;
    color: #909399;
    line-height: 1.4;

    .tip-item {
      margin-bottom: 2px;
    }
  }

  .quick-select {
    margin-top: 8px;

    .quick-tag {
      margin: 0 4px 4px 0;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 12px;
      padding: 2px 8px;

      &:hover {
        background-color: #409eff;
        color: #ffffff;
      }
    }
  }
}

// 深色主题适配
.dark {
  .menu-auth-dialog {
    .auth-mark {
      background-color: #414243;
      color: #b1b3b8;
    }

    .auth-title {
      color: #e5eaf3;
    }
  }
}
</style>