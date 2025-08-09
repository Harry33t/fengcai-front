/**
 * 企业管理页面配置
 */

// 搜索表单配置
export const searchFormConfig = {
  // 企业类型选项
  enterpriseTypeOptions: [
    { label: '全部', value: '' },
    { label: '建筑业企业资质', value: 'construction' },
    { label: '工程监理企业资质', value: 'supervision' },
    { label: '工程设计企业资质', value: 'design' },
    { label: '工程勘察资质', value: 'survey' }
  ],
  
  // 资质状态选项
  qualificationStatusOptions: [
    { label: '请选择资质状态', value: '' },
    { label: '正常', value: 'normal' },
    { label: '即将到期', value: 'expiring' },
    { label: '已过期', value: 'expired' },
    { label: '暂停', value: 'suspended' }
  ],
  
  // 有无安许选项
  safetyPermitOptions: [
    { label: '有无安许', value: '' },
    { label: '有', value: 'yes' },
    { label: '无', value: 'no' }
  ],
  
  // 有无信用手册选项
  creditManualOptions: [
    { label: '有无信用手册', value: '' },
    { label: '有', value: 'yes' },
    { label: '无', value: 'no' }
  ],
  
  // 客户归属选项
  customerAttributionOptions: [
    { label: '请选择客户归属', value: '' },
    { label: '李四', value: 'lisi' },
    { label: '张三', value: 'zhangsan' },
    { label: '王五', value: 'wangwu' }
  ]
}

// 表格列配置
export const tableColumnsConfig = [
  {
    prop: 'index',
    label: '序号',
    width: 80,
    type: 'index',
    align: 'center'
  },
  {
    prop: 'enterpriseType',
    label: '企业类型',
    width: 120,
    showOverflowTooltip: true
  },
  {
    prop: 'enterpriseName',
    label: '企业名称',
    width: 200,
    showOverflowTooltip: true
  },
  {
    prop: 'contactPerson',
    label: '企业联系人',
    width: 120,
    showOverflowTooltip: true
  },
  {
    prop: 'contactPhone',
    label: '联系电话',
    width: 130,
    showOverflowTooltip: true
  },
  {
    prop: 'safetyPermit',
    label: '安全许可证',
    width: 120,
    align: 'center'
  },
  {
    prop: 'creditManual',
    label: '信用手册',
    width: 120,
    align: 'center'
  },
  {
    prop: 'customerAttribution',
    label: '客户归属',
    width: 120,
    showOverflowTooltip: true
  },
  {
    prop: 'operations',
    label: '操作',
    width: 200,
    type: 'operations',
    fixed: 'right'
  }
]

// 模拟表格数据
export const mockTableData = [
  {
    id: 1,
    enterpriseType: '建筑业企业资质',
    enterpriseName: '南京丰宇',
    contactPerson: '张经理',
    contactPhone: '11111',
    safetyPermit: '有',
    creditManual: '有',
    customerAttribution: '李四'
  },
  {
    id: 2,
    enterpriseType: '建筑业企业资质',
    enterpriseName: '南京兴奇电力安装工程有限公司',
    contactPerson: '李经理',
    contactPhone: '22222',
    safetyPermit: '无',
    creditManual: '无',
    customerAttribution: '张三'
  },
  {
    id: 3,
    enterpriseType: '建筑业企业资质',
    enterpriseName: '南京福根脚手架有限公司',
    contactPerson: '王经理',
    contactPhone: '33333',
    safetyPermit: 'yes',
    creditManual: 'no',
    customerAttribution: '王五',
    qualificationStatus: 'normal'
  },
  {
    id: 4,
    enterpriseType: '建筑业企业资质',
    enterpriseName: '南京福根脚手架有限公司',
    contactPerson: '赵经理',
    contactPhone: '44444',
    safetyPermit: 'no',
    creditManual: 'no',
    customerAttribution: '李四',
    qualificationStatus: 'expired'
  },
  {
    id: 5,
    enterpriseType: '建筑业企业资质',
    enterpriseName: '南京富纺机械化施工有限公司',
    contactPerson: '刘经理',
    contactPhone: '55555',
    safetyPermit: 'no',
    creditManual: 'no',
    customerAttribution: '张三',
    qualificationStatus: 'normal'
  }
]

// 分页配置
export const paginationConfig = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  total: 0,
  layout: 'total, sizes, prev, pager, next, jumper'
}

// 操作按钮配置
export const operationButtonsConfig = [
  {
    label: '编辑',
    type: 'primary',
    size: 'small',
    action: 'edit'
  },
  {
    label: '删除',
    type: 'danger',
    size: 'small',
    action: 'delete'
  },
  {
    label: '查看',
    type: 'info',
    size: 'small',
    action: 'view'
  }
]

// 页面文本配置
export const pageTextConfig = {
  title: '企业管理',
  searchButton: '查询',
  resetButton: '重置',
  addButton: '新增企业'
}
