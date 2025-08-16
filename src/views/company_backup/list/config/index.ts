// 企业列表页面配置

export const PAGE_CONFIG = {
  title: '企业列表',
  description: '企业信息管理与查看'
}

// 搜索表单配置
export const SEARCH_CONFIG = {
  companyName: {
    label: '企业名称',
    placeholder: '请输入企业名称',
    type: 'input'
  },
  qualificationType: {
    label: '资质类型',
    placeholder: '请选择资质类型',
    type: 'select',
    options: [
      { label: '建筑工程', value: 'construction' },
      { label: '市政工程', value: 'municipal' },
      { label: '装修装饰', value: 'decoration' }
    ]
  },
  status: {
    label: '企业状态',
    placeholder: '请选择状态',
    type: 'select',
    options: [
      { label: '正常', value: '1' },
      { label: '停用', value: '0' }
    ]
  }
}

// 表格列配置
export const TABLE_COLUMNS = [
  { prop: 'id', label: '企业ID', width: 80 },
  { prop: 'companyName', label: '企业名称', minWidth: 200 },
  { prop: 'qualificationType', label: '资质类型', width: 120 },
  { prop: 'qualificationLevel', label: '资质等级', width: 120 },
  { prop: 'legalPerson', label: '法定代表人', width: 120 },
  { prop: 'contactPhone', label: '联系电话', width: 140 },
  { prop: 'registeredCapital', label: '注册资本', width: 120 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'actions', label: '操作', width: 200, fixed: 'right' }
]

// 权限配置
export const PERMISSIONS = {
  view: 'company:view',
  create: 'company:create',
  edit: 'company:edit',
  delete: 'company:delete',
  export: 'company:export'
}
