// 企业资质页面配置

// 标签页配置
export const tabsConfig = [
  { name: 'basic', label: '基本信息' },
  { name: 'qualification', label: '企业资质' },
  { name: 'safety', label: '安全许可证' },
  { name: 'credit', label: '信用手册' },
  { name: 'personnel', label: '企业人员' }
] as const

// 搜索表单配置
export const searchFormConfig = {
  // 搜索表单初始值
  initialValues: {
    qualificationType: '',
    qualificationSeries: '',
    qualificationCategory: '',
    qualificationLevel: '',
    employmentStatus: '',
    validityPeriod: ''
  },
  
  // 搜索表单选项
  options: {
    qualificationType: [
      { label: '建筑工程施工总承包', value: 'construction_general' },
      { label: '建筑工程专业承包', value: 'construction_professional' },
      { label: '建筑工程劳务分包', value: 'construction_labor' }
    ]
  },
  buttons: [
    {
      type: 'primary',
      text: '搜索',
      icon: 'Search',
      action: 'search'
    },
    {
      type: 'default',
      text: '重置',
      icon: 'Refresh',
      action: 'reset'
    }
  ]
}

// 表格列配置
export const tableColumnsConfig = [
  {
    prop: 'qualificationType',
    label: '资质类型',
    width: 140,
    showOverflowTooltip: true
  },
  {
    prop: 'qualificationSeries',
    label: '资质系列',
    width: 120,
    showOverflowTooltip: true
  },
  {
    prop: 'qualificationCategory',
    label: '资质类别',
    width: 140,
    showOverflowTooltip: true
  },
  {
    prop: 'qualificationLevel',
    label: '资质等级',
    width: 100,
    showOverflowTooltip: true
  },
  {
    prop: 'certificateNumber',
    label: '证书编号',
    width: 160,
    showOverflowTooltip: true
  },
  {
    prop: 'validityPeriod',
    label: '证书有效期',
    width: 120,
    formatter: (row: any) => {
      return row.validityPeriod || '-'
    }
  },
  {
    prop: 'employmentStatus',
    label: '任职情况',
    width: 100,
    showOverflowTooltip: true
  },
  {
    prop: 'actions',
    label: '操作',
    width: 120,
    fixed: 'right'
  }
]

// 模拟数据
export const mockQualificationData = [
  {
    id: 1,
    qualificationType: '建筑工程施工总承包',
    qualificationSeries: '建筑工程',
    qualificationCategory: '施工总承包',
    qualificationLevel: '一级',
    certificateNumber: 'D332817368',
    validityPeriod: '2023-01-15至2028-01-14',
    employmentStatus: '在职'
  },
  {
    id: 2,
    qualificationType: '市政公用工程施工总承包',
    qualificationSeries: '市政工程',
    qualificationCategory: '施工总承包',
    qualificationLevel: '二级',
    certificateNumber: 'D332817369',
    validityPeriod: '2022-08-20至2027-08-19',
    employmentStatus: '在职'
  },
  {
    id: 3,
    qualificationType: '工程监理企业资质',
    qualificationSeries: '工程监理',
    qualificationCategory: '房屋建筑工程',
    qualificationLevel: '三级',
    certificateNumber: 'D332817370',
    validityPeriod: '2023-03-10至2028-03-09',
    employmentStatus: '在职'
  }
]
