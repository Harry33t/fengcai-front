import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { createUser, updateUser, getUserDetail } from '@/api/userApi'
import type { ICreateUserRequest, IUpdateUserRequest } from '@/api/userApi'

// 角色选项类型
interface IRoleOption {
  label: string
  value: number
  id: number
  name: string
  desc: string
}

/**
 * 用户表单管理Hook
 */
export function useUserForm() {
  // 表单引用
  const formRef = ref<FormInstance>()
  
  // 状态管理
  const loading = ref(false)
  const dialogVisible = ref(false)
  const isEdit = ref(false)
  const roleOptions = ref<IRoleOption[]>([])
  
  // 表单数据
  const formData = reactive<ICreateUserRequest & { id?: number }>({
    id: undefined,
    username: '',
    password: '',
    name: '',
    phone: '',
    gender: 1,
    status: 1,
    roleId: '',
    manageId: ''
  })

  // 表单验证规则
  const formRules = reactive<FormRules>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 20, message: '用户名长度为 3 到 20 个字符', trigger: 'blur' },
      { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度为 6 到 20 个字符', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 10, message: '姓名长度为 2 到 10 个字符', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ],
    roleId: [
      { required: true, message: '请选择角色', trigger: 'change' }
    ]
  })

  // 性别选项
  const genderOptions = [
    { label: '男', value: 1 },
    { label: '女', value: 2 }
  ]

  // 状态选项
  const statusOptions = [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ]

  // 计算属性
  const dialogTitle = computed(() => isEdit.value ? '编辑用户' : '新增用户')
  const submitButtonText = computed(() => isEdit.value ? '更新' : '创建')

  // 获取角色列表 - 简化版本，使用模拟数据
  const fetchRoleList = async () => {
    // 模拟角色数据
    roleOptions.value = [
      { label: '超级管理员', value: 1, id: 1, name: '超级管理员', desc: '拥有系统所有权限' },
      { label: '系统管理员', value: 2, id: 2, name: '系统管理员', desc: '拥有系统管理权限' },
      { label: '普通用户', value: 3, id: 3, name: '普通用户', desc: '基础权限用户' }
    ]
  }

  // 打开新增对话框
  const openAddDialog = async () => {
    isEdit.value = false
    dialogVisible.value = true
    resetForm()
    await fetchRoleList()
  }

  // 打开编辑对话框
  const openEditDialog = async (userId: number) => {
    try {
      isEdit.value = true
      loading.value = true
      
      const userRes = await getUserDetail(userId)
      
      if (userRes) {
        const user = userRes
        Object.assign(formData, {
          id: user.id,
          username: user.username,
          password: '', // 编辑时不显示密码
          name: user.name,
          phone: user.phone,
          gender: user.gender,
          status: user.status,
          roleId: user.roleId,
          manageId: ''
        })
      }
      
      // 加载角色列表
      await fetchRoleList()
      
      dialogVisible.value = true
    } catch (error) {
      console.error('获取用户详情失败:', error)
      ElMessage.error('获取用户详情失败')
    } finally {
      loading.value = false
    }
  }

  // 关闭对话框
  const closeDialog = () => {
    dialogVisible.value = false
    resetForm()
  }

  // 重置表单
  const resetForm = () => {
    Object.assign(formData, {
      id: undefined,
      username: '',
      password: '',
      name: '',
      phone: '',
      gender: 1,
      status: 1,
      roleId: '',
      manageId: ''
    })
    formRef.value?.clearValidate()
  }

  // 提交表单
  const handleSubmit = async () => {
    if (!formRef.value) return
    
    try {
      await formRef.value.validate()
      loading.value = true
      
      if (isEdit.value) {
        // 编辑用户
        const updateData: IUpdateUserRequest = {
          id: formData.id!,
          username: formData.username,
          name: formData.name,
          phone: formData.phone,
          gender: formData.gender,
          status: formData.status,
          roleId: formData.roleId,
          manageId: formData.manageId || undefined
        }
        
        await updateUser(updateData)
        ElMessage.success('更新成功')
        closeDialog()
        return true
      } else {
        // 新增用户
        await createUser(formData)
        ElMessage.success('创建成功')
        closeDialog()
        return true
      }
    } catch (error) {
      console.error('提交表单失败:', error)
      ElMessage.error('操作失败')
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    // 表单相关
    formRef,
    formData,
    formRules,
    
    // 状态
    loading,
    dialogVisible,
    isEdit,
    
    // 选项数据
    roleOptions,
    genderOptions,
    statusOptions,
    
    // 计算属性
    dialogTitle,
    submitButtonText,
    
    // 方法
    openAddDialog,
    openEditDialog,
    closeDialog,
    resetForm,
    handleSubmit
  }
}