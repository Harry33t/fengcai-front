import type { FormRules } from 'element-plus'

// 角色表单验证规则
export const roleFormRules: FormRules = {
  name: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 2, max: 20, message: '角色名称长度在 2 到 20 个字符', trigger: 'blur' },
    { 
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_\-]+$/, 
      message: '角色名称只能包含中文、字母、数字、下划线和横线', 
      trigger: 'blur' 
    }
  ],
  desc: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { min: 2, max: 100, message: '角色描述长度在 2 到 100 个字符', trigger: 'blur' }
  ]
}

// 搜索表单验证规则
export const searchFormRules: FormRules = {
  name: [
    { max: 20, message: '角色名称长度不能超过 20 个字符', trigger: 'blur' }
  ]
}