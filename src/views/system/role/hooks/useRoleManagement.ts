/**
 * 角色管理操作 Composable
 * 职责：角色的增删改操作
 */
import { ref, reactive } from 'vue'
import { ElMessageBox } from 'element-plus'
import { RoleService } from '@/services/roleService'
import type { IRole, ICreateRoleParams, IUpdateRoleParams } from '@/service/role/type'

export function useRoleManagement() {
  // 对话框状态
  const dialogVisible = ref(false)
  const isEdit = ref(false)
  const currentRole = ref<IRole | null>(null)

  // 表单数据
  const formData = reactive<ICreateRoleParams>({
    name: '',
    desc: '',
    status: '1'
  })

  // 重置表单
  const resetForm = () => {
    Object.assign(formData, {
      name: '',
      desc: '',
      status: '1'
    })
  }

  // 打开新增对话框
  const openAddDialog = () => {
    isEdit.value = false
    resetForm()
    dialogVisible.value = true
  }

  // 打开编辑对话框
  const openEditDialog = (role: IRole) => {
    isEdit.value = true
    currentRole.value = role
    Object.assign(formData, {
      name: role.name,
      desc: role.desc || '',
      status: String(role.status)
    })
    dialogVisible.value = true
  }

  // 关闭对话框
  const closeDialog = () => {
    dialogVisible.value = false
    resetForm()
    currentRole.value = null
  }

  // 保存角色
  const saveRole = async () => {
    try {
      let result
      
      if (isEdit.value && currentRole.value) {
        // 更新角色
        const updateData: IUpdateRoleParams = {
          id: String(currentRole.value.id),
          name: formData.name,
          desc: formData.desc,
          status: formData.status
        }
        result = await RoleService.updateRole(updateData)
      } else {
        // 创建角色
        result = await RoleService.createRole(formData)
      }
      
      if (result) {
        closeDialog()
        return true
      }
      return false
    } catch (error) {
      console.error('保存角色失败:', error)
      return false
    }
  }

  // 删除角色
  const deleteRole = async (role: IRole) => {
    try {
      await ElMessageBox.confirm(
        `确定要删除角色「${role.name}」吗？`,
        '删除确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )

      const success = await RoleService.deleteRole(String(role.id))
      return success
    } catch (error) {
      if (error !== 'cancel') {
        console.error('删除角色失败:', error)
      }
      return false
    }
  }

  // 表单验证
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      return false
    }
    
    if (!formData.desc.trim()) {
      return false
    }

    return true
  }

  return {
    // 状态
    dialogVisible,
    isEdit,
    currentRole,
    formData,
    
    // 方法
    openAddDialog,
    openEditDialog,
    closeDialog,
    saveRole,
    deleteRole,
    resetForm,
    validateForm
  }
}