import type { FormRules } from 'element-plus'

// 表格列定义
interface IUserTableColumn {
  prop: string
  label: string
  width?: string | number
  minWidth?: string | number
  fixed?: boolean | string
  sortable?: boolean
  formatter?: (row: any, column: any, cellValue: any) => string
}

/**
 * 用户管理页面配置
 */

// 表格列配置
export const userTableColumns: IUserTableColumn[] = [
  {
    prop: 'user.id',
    label: 'ID',
    width: 80,
    sortable: true
  },
  {
    prop: 'user.username',
    label: '用户名',
    minWidth: 120,
    sortable: true
  },
  {
    prop: 'user.name',
    label: '姓名',
    minWidth: 100,
    sortable: true
  },
  {
    prop: 'roleName',
    label: '角色',
    minWidth: 120
  },
  {
    prop: 'user.phone',
    label: '手机号',
    minWidth: 130
  },
  {
    prop: 'user.gender',
    label: '性别',
    width: 80,
    formatter: (row, column, cellValue) => {
      return cellValue === 1 ? '男' : cellValue === 2 ? '女' : '未知'
    }
  },
  {
    prop: 'user.status',
    label: '状态',
    width: 80,
    formatter: (row, column, cellValue) => {
      return cellValue === 1 ? '启用' : '禁用'
    }
  },
  {
    prop: 'manager.name',
    label: '上级管理者',
    minWidth: 120,
    formatter: (row, column, cellValue) => {
      return cellValue || '-'
    }
  },
  {
    prop: 'user.createdTime',
    label: '创建时间',
    minWidth: 160,
    formatter: (row, column, cellValue) => {
      if (!cellValue) return '-'
      return new Date(cellValue * 1000).toLocaleString('zh-CN')
    }
  },
  {
    prop: 'action',
    label: '操作',
    width: 200,
    fixed: 'right'
  }
]

// 搜索表单规则
export const searchFormRules: FormRules = {
  username: [
    { min: 3, max: 20, message: '用户名长度为 3 到 20 个字符', trigger: 'blur' }
  ],
  name: [
    { min: 2, max: 10, message: '姓名长度为 2 到 10 个字符', trigger: 'blur' }
  ]
}

// 用户表单验证规则
export const userFormRules: FormRules = {
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
}

// 性别选项
export const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

// 状态选项
export const statusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]

// 分页配置
export const paginationConfig = {
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper'
}

// 按钮权限配置
export const buttonPermissions = {
  create: 'user:create',
  edit: 'user:edit',
  delete: 'user:delete',
  view: 'user:view',
  resetPassword: 'user:reset-password'
}