import type { FormRules } from 'element-plus'

// 按钮权限表单验证规则
export const authFormRules: FormRules = {
  mark: [
    { required: true, message: '请输入权限标识', trigger: 'blur' },
    { 
      pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/, 
      message: '权限标识必须以字母开头，只能包含字母、数字和下划线', 
      trigger: 'blur' 
    },
    { min: 2, max: 50, message: '权限标识长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  title: [
    { required: true, message: '请输入权限名称', trigger: 'blur' },
    { min: 1, max: 20, message: '权限名称长度在 1 到 20 个字符', trigger: 'blur' }
  ]
}

// 按钮权限表格列配置
export const authTableColumns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'mark', label: '权限标识', width: 150 },
  { prop: 'title', label: '权限名称', width: 150 },
  { prop: 'createdTime', label: '创建时间', width: 180, align: 'center' },
  { prop: 'updatedTime', label: '更新时间', width: 180, align: 'center' },
  { label: '操作', width: 150, fixed: 'right', align: 'center' }
]

// 按钮权限表单默认值
export const defaultAuthForm = {
  menuId: 0,
  mark: '',
  title: ''
}

// 常用权限标识选项
export const commonAuthOptions = [
  { label: '新增 (create)', value: 'create' },
  { label: '编辑 (edit)', value: 'edit' },
  { label: '删除 (delete)', value: 'delete' },
  { label: '查看 (view)', value: 'view' }
]

// 对话框配置
export const dialogConfig = {
  width: '500px',
  title: {
    add: '新增按钮权限',
    edit: '编辑按钮权限'
  },
  confirmText: '确定',
  cancelText: '取消'
}

// 按钮权限操作配置
export const authActionConfig = {
  // 是否显示编辑按钮
  showEditButton: () => true,
  
  // 是否显示删除按钮
  showDeleteButton: () => true,
  
  // 删除确认提示
  deleteConfirmTitle: '删除确认',
  deleteConfirmContent: (authTitle: string) => `确定要删除按钮权限"${authTitle}"吗？`,
  
  // 按钮文本
  buttonText: {
    add: '新增权限',
    edit: '编辑',
    delete: '删除',
    save: '保存',
    cancel: '取消'
  }
}

// 表格空数据配置
export const emptyDataConfig = {
  description: '暂无按钮权限数据',
  image: '/empty-auth.svg'
}

// 权限标识验证配置
export const authMarkConfig = {
  // 保留的系统权限标识
  reservedMarks: ['system', 'admin', 'root', 'super'],
  
  // 权限标识前缀建议
  prefixSuggestions: ['btn', 'action', 'op'],
  
  // 权限标识格式说明
  formatDescription: '建议格式：动作_对象，如 create_user、edit_order'
}