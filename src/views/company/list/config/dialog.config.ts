/**
 * 企业管理弹框配置
 */

// 标签页配置
export const tabsConfig = [
  { name: 'basic', label: '基本信息', icon: 'el-icon-user' },
  { name: 'qualification', label: '企业资质', icon: 'el-icon-document' },
  { name: 'safety', label: '安全许可证', icon: 'el-icon-lock' },
  { name: 'credit', label: '信用手册', icon: 'el-icon-notebook-1' },
  { name: 'personnel', label: '企业人员', icon: 'el-icon-user-solid' }
]

// 基本信息表单配置
export const basicFormConfig = {
  // 表单初始数据
  initialData: {
    enterpriseName: '',
    enterpriseType: '',
    unifiedSocialCreditCode: '',
    legalRepresentative: '',
    contactPerson: '',
    contactPhone: '',
    registeredAddress: '',
    businessAddress: '',
    customerType: '',
    customerAttribution: ''
  },
  
  // 表单验证规则
  rules: {
    enterpriseName: [
      { required: true, message: '请输入企业名称', trigger: 'blur' }
    ],
    enterpriseType: [
      { required: true, message: '请选择企业类型', trigger: 'change' }
    ],
    unifiedSocialCreditCode: [
      { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
      { pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/, message: '统一社会信用代码格式不正确', trigger: 'blur' }
    ],
    legalRepresentative: [
      { required: true, message: '请输入法定代表人', trigger: 'blur' }
    ],
    contactPerson: [
      { required: true, message: '请输入联系人', trigger: 'blur' }
    ],
    contactPhone: [
      { required: true, message: '请输入联系电话', trigger: 'blur' },
      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
    ]
  }
}

// 企业类型选项
export const enterpriseTypeOptions = [
  { label: '建筑业企业资质', value: 'construction' },
  { label: '工程监理企业资质', value: 'supervision' },
  { label: '工程设计企业资质', value: 'design' },
  { label: '工程勘察资质', value: 'survey' }
]

// 客户类型选项
export const customerTypeOptions = [
  { label: '维护客户', value: 'maintenance' },
  { label: '业务客户', value: 'business' }
]

// 客户归属选项
export const customerAttributionOptions = [
  { label: '李四', value: 'lisi' },
  { label: '张三', value: 'zhangsan' },
  { label: '王五', value: 'wangwu' }
]

// 资质类型配置（根据图2资质序列）
export const qualificationConfig = {
  // 资质类型选项
  typeOptions: [
    { label: '建筑业企业资质', value: 'construction' },
    { label: '工程监理企业资质', value: 'supervision' },
    { label: '工程设计企业资质', value: 'design' },
    { label: '工程勘察企业资质', value: 'survey' },
    { label: '承装（修、试）电力设施许可证', value: 'power' },
    { label: '房地产开发企业资质', value: 'realestate' }
  ],
  
  // 资质序列选项（根据资质类型动态显示）
  seriesOptions: {
    construction: [
      { label: '施工总承包', value: 'general_contracting' },
      { label: '专业承包', value: 'professional_contracting' },
      { label: '施工劳务', value: 'construction_labor' }
    ],
    supervision: [
      { label: '工程监理', value: 'engineering_supervision' }
    ],
    design: [
      { label: '工程设计', value: 'engineering_design' }
    ],
    survey: [
      { label: '工程勘察', value: 'engineering_survey' }
    ],
    power: [
      { label: '电力业务许可证', value: 'power_license' }
    ],
    realestate: [
      { label: '房地产开发', value: 'realestate_development' }
    ]
  },
  
  // 资质类别选项（根据资质序列动态显示）
  categoryOptions: {
    general_contracting: [
      { label: '房屋建筑工程', value: 'housing_construction' },
      { label: '公路工程', value: 'highway_engineering' },
      { label: '铁路工程', value: 'railway_engineering' },
      { label: '港口与航道工程', value: 'port_waterway' },
      { label: '水利水电工程', value: 'water_power' },
      { label: '市政公用工程', value: 'municipal_public' },
      { label: '通信工程', value: 'communication' },
      { label: '机电工程', value: 'mechanical_electrical' }
    ],
    professional_contracting: [
      { label: '地基基础工程', value: 'foundation' },
      { label: '起重设备安装工程', value: 'lifting_equipment' },
      { label: '预拌混凝土', value: 'ready_mixed_concrete' },
      { label: '电子与智能化工程', value: 'electronic_intelligent' },
      { label: '消防设施工程', value: 'fire_protection' },
      { label: '防水防腐保温工程', value: 'waterproof_anticorrosion' },
      { label: '桥梁工程', value: 'bridge_engineering' },
      { label: '隧道工程', value: 'tunnel_engineering' }
    ],
    construction_labor: [
      { label: '施工劳务', value: 'construction_labor_service' }
    ],
    engineering_supervision: [
      { label: '房屋建筑工程监理', value: 'housing_supervision' },
      { label: '市政公用工程监理', value: 'municipal_supervision' },
      { label: '水利水电工程监理', value: 'water_power_supervision' }
    ],
    engineering_design: [
      { label: '建筑工程设计', value: 'architectural_design' },
      { label: '市政工程设计', value: 'municipal_design' },
      { label: '水利工程设计', value: 'water_conservancy_design' }
    ],
    engineering_survey: [
      { label: '工程测量', value: 'engineering_surveying' },
      { label: '岩土工程勘察', value: 'geotechnical_investigation' }
    ],
    power_license: [
      { label: '承装电力设施', value: 'power_installation' },
      { label: '承修电力设施', value: 'power_maintenance' },
      { label: '承试电力设施', value: 'power_testing' }
    ],
    realestate_development: [
      { label: '房地产开发', value: 'real_estate_dev' }
    ]
  },
  
  // 资质等级选项
  levelOptions: [
    { label: '特级', value: 'special' },
    { label: '一级', value: 'first' },
    { label: '二级', value: 'second' },
    { label: '三级', value: 'third' },
    { label: '四级', value: 'fourth' },
    { label: '不分等级', value: 'no_grade' }
  ],
  
  // 发证机关选项
  issuingAuthorityOptions: [
    { label: '住房和城乡建设部', value: 'mohurd' },
    { label: '住房和城乡建设厅', value: 'provincial' },
    { label: '其他', value: 'other' }
  ]
}

// 弹框按钮配置
export const dialogButtonsConfig = [
  { 
    label: '暂存', 
    type: 'warning' as const, 
    action: 'save',
    show: ['basic', 'qualification']
  },
  { 
    label: '取消', 
    type: 'default' as const, 
    action: 'cancel',
    show: ['basic', 'qualification', 'safety', 'credit', 'personnel']
  },
  { 
    label: '提交', 
    type: 'primary' as const, 
    action: 'submit',
    show: ['basic', 'qualification', 'safety', 'credit', 'personnel']
  }
]
