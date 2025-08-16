/**
 * 按钮权限数据管理 Composable
 * 职责：响应式状态管理，不包含业务逻辑
 */
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { MenuAuthService } from '@/services/menuAuthService'
import type { 
  IButtonAuth, 
  ICreateButtonAuthParams, 
  IUpdateButtonAuthParams 
} from '@/service/menu/type'

export function useMenuAuth() {
  // 响应式状态
  const loading = ref(false)
  const authList = ref<IButtonAuth[]>([])
  const dialogVisible = ref(false)
  const isEdit = ref(false)
  const currentMenuId = ref<string | number>('')

  // 表单数据
  const formData = reactive<ICreateButtonAuthParams>({
    menuId: 0,
    mark: '',
    title: ''
  })

  // 重置表单
  const resetForm = () => {
    Object.assign(formData, {
      menuId: Number(currentMenuId.value),
      mark: '',
      title: ''
    })
    console.log('重置表单后的数据:', formData)
  }

  // 获取按钮权限列表
  const fetchAuthList = async (menuId: string | number) => {
    if (!menuId) return
    
    // 如果正在加载，则跳过
    if (loading.value) return
    
    loading.value = true
    currentMenuId.value = menuId
    try {
      const auths = await MenuAuthService.getMenuAuths({ menuId })
      authList.value = auths
      console.log('获取到的权限列表:', auths)
    } catch (error) {
      console.error('获取按钮权限列表失败:', error)
      authList.value = []
    } finally {
      loading.value = false
    }
  }

  // 打开新增对话框
  const openAddDialog = (menuId: string | number) => {
    console.log('打开新增对话框，menuId:', menuId)
    currentMenuId.value = menuId
    isEdit.value = false
    resetForm()
    dialogVisible.value = true
    console.log('对话框状态:', dialogVisible.value)
  }

  // 打开编辑对话框
  const openEditDialog = (auth: IButtonAuth) => {
    isEdit.value = true
    Object.assign(formData, {
      menuId: auth.menuId,
      mark: auth.mark,
      title: auth.title
    })
    // 存储当前编辑的权限ID
    ;(formData as any).id = String(auth.id)
    dialogVisible.value = true
  }

  // 关闭对话框
  const closeDialog = () => {
    dialogVisible.value = false
    resetForm()
  }

  // 保存按钮权限
  const saveAuth = async () => {
    try {
      console.log('保存权限，是否编辑模式:', isEdit.value)
      console.log('表单数据:', formData)
      
      if (isEdit.value) {
        // 更新权限
        const updateData: IUpdateButtonAuthParams = {
          id: (formData as any).id,
          menuId: formData.menuId,
          mark: formData.mark,
          title: formData.title
        }
        console.log('更新数据:', updateData)
        await MenuAuthService.updateAuth(updateData)
      } else {
        // 创建权限
        console.log('创建权限，数据:', formData)
        const result = await MenuAuthService.createAuth(formData)
        console.log('创建结果:', result)
      }
      
      closeDialog()
      // 刷新列表
      await fetchAuthList(currentMenuId.value)
    } catch (error) {
      console.error('保存按钮权限失败:', error)
    }
  }

  // 删除按钮权限
  const deleteAuth = async (auth: IButtonAuth) => {
    try {
      await ElMessageBox.confirm(
        `确定要删除按钮权限"${auth.title}"吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )

      const success = await MenuAuthService.deleteAuth(auth.id)
      if (success) {
        // 刷新列表
        await fetchAuthList(currentMenuId.value)
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('删除按钮权限失败:', error)
      }
    }
  }

  // 表单验证
  const validateForm = (): boolean => {
    if (!formData.mark.trim()) {
      ElMessage.error('请输入权限标识')
      return false
    }
    
    if (!formData.title.trim()) {
      ElMessage.error('请输入权限名称')
      return false
    }

    // 检查权限标识是否重复
    const existingAuth = authList.value.find(auth => 
      auth.mark === formData.mark && 
      (!isEdit.value || String(auth.id) !== (formData as any).id)
    )
    
    if (existingAuth) {
      ElMessage.error('权限标识已存在')
      return false
    }

    return true
  }

  // 处理保存（包含验证）
  const handleSave = async () => {
    if (!validateForm()) return
    await saveAuth()
  }

  return {
    // 状态
    loading,
    authList,
    dialogVisible,
    isEdit,
    currentMenuId,
    formData,
    
    // 方法
    fetchAuthList,
    openAddDialog,
    openEditDialog,
    closeDialog,
    handleSave,
    deleteAuth,
    resetForm,
    validateForm
  }
}