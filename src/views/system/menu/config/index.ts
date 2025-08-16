import type { FormRules } from 'element-plus'

// 表单验证规则
export const menuFormRules: FormRules = {
  title: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' },
    { min: 1, max: 20, message: '菜单名称长度在 1 到 20 个字符', trigger: 'blur' }
  ],
  path: [
    { 
      required: true, 
      validator: (rule: any, value: string, callback: any) => {
        if (!value) {
          callback(new Error('请输入路由路径'))
        } else if (rule.isFirstLevel && !value.startsWith('/')) {
          callback(new Error('一级菜单路径必须以 / 开头'))
        } else if (!rule.isFirstLevel && value.startsWith('/')) {
          callback(new Error('子菜单路径不需要以 / 开头'))
        } else {
          callback()
        }
      },
      trigger: 'blur' 
    }
  ],
  name: [
    { required: true, message: '请输入路由名称', trigger: 'blur' }
  ],
  component: [
    { 
      required: true,
      validator: (rule: any, value: string, callback: any) => {
        if (!value && rule.needComponent) {
          callback(new Error('请输入组件路径'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  sort: [
    { required: true, message: '请输入排序值', trigger: 'blur' }
  ]
}

// 表格列配置
export const tableColumns = [
  { prop: 'title', label: '菜单名称', minWidth: 200 },
  { prop: 'path', label: '路由路径', width: 200 },
  { prop: 'component', label: '组件路径', width: 200 },
  { prop: 'sort', label: '排序', width: 80, align: 'center' },
  { prop: 'status', label: '状态', width: 80, align: 'center' },
  { prop: 'isHide', label: '显示', width: 80, align: 'center' },
  { label: '操作', width: 240, fixed: 'right' }
]

// 搜索表单配置
export const searchFormConfig = {
  title: '',
  status: undefined,
  page: 1,
  pageSize: 100
}

// 菜单表单默认值
export const defaultMenuForm = {
  id: 0,
  title: '',
  path: '',
  name: '',
  component: '',
  icon: '',
  sort: 1,
  status: 1,
  isHide: 1,
  keepAlive: 1,
  isFirstLevel: 1,
  parentId: 0,
  level: 1
}

// 状态选项
export const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 2 }
]

// 显示/隐藏选项
export const hideOptions = [
  { label: '显示', value: 1 },
  { label: '隐藏', value: 2 }
]

// 缓存选项
export const keepAliveOptions = [
  { label: '是', value: 1 },
  { label: '否', value: 2 }
]

// 菜单类型选项
export const menuTypeOptions = [
  { label: '顶级菜单', value: 1 },
  { label: '子菜单', value: 2 }
]

// 按钮显示逻辑配置
export const buttonDisplayConfig = {
  // 是否显示添加子菜单按钮
  showAddChildButton: (row: any) => {
    // 只允许一级菜单添加子菜单，最多支持二级菜单
    return row.level === 1
  },
  
  // 是否显示编辑按钮
  showEditButton: () => true,
  
  // 是否显示删除按钮
  showDeleteButton: () => true
}
