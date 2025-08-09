import { markRaw } from 'vue'
import { Document as DocumentIcon, Star, Calendar, House, Files, School, Lightning, Search, Medal, Money, Location, User, Link } from '@element-plus/icons-vue'

/**
 * 工作台页面配置
 */

// 企业资质管理模块配置
export const enterpriseModulesConfig = [
  {
    name: '建筑业企业资质',
    icon: markRaw(House),
    iconClass: 'blue-icon',
    route: '/enterprise/architecture'
  },
  {
    name: '工程监理企业资质',
    icon: markRaw(Files),
    iconClass: 'green-icon',
    route: '/enterprise/qualification'
  },
  {
    name: '工程设计企业资质',
    icon: markRaw(School),
    iconClass: 'purple-icon',
    route: '/enterprise/safety-license'
  },
  {
    name: '承装(修、试)电力设施许可证',
    icon: markRaw(Lightning),
    iconClass: 'blue-icon',
    route: '/enterprise/credit-manual'
  },
  {
    name: '工程勘察资质',
    icon: markRaw(Search),
    iconClass: 'purple-icon',
    route: '/enterprise/staff'
  },
  {
    name: '质量检测机构资质',
    icon: markRaw(Medal),
    iconClass: 'cyan-icon',
    route: '/enterprise/staff'
  },
  {
    name: '房地产估价机构备案',
    icon: markRaw(Money),
    iconClass: 'green-icon',
    route: '/enterprise/staff'
  },
  {
    name: '房地产开发企业资质',
    icon: markRaw(Location),
    iconClass: 'red-icon',
    route: '/enterprise/staff'
  }
]

// 常用功能配置
export const commonFunctionsConfig = [
  {
    name: '企业账号密码',
    description: '',
    icon: markRaw(User),
    iconClass: 'blue-icon',
    route: '/common-functions/enterprise-account'
  },
  {
    name: '办理事项地址及电话',
    description: '',
    icon: markRaw(Location),
    iconClass: 'green-icon',
    route: '/common-functions/office-address'
  },
  {
    name: '常用网站',
    description: '',
    icon: markRaw(Link),
    iconClass: 'purple-icon',
    route: '/common-functions/useful-websites'
  },
  {
    name: '人员证书继续教育',
    description: '',
    icon: markRaw(School),
    iconClass: 'orange-icon',
    route: '/common-functions/continuing-education'
  }
]

// 统计卡片配置
export const statsCardsConfig = [
  {
    title: '企业资质统计',
    icon: markRaw(Files),
    iconClass: 'document-icon',
    value: '3',
    colorClass: 'blue-card',
    periodLabel: '建筑业',
    periodValue: '0',
    completedLabel: '监理业',
    completedValue: '0',
    route: '/enterprise/qualification'
  },
  {
    title: '安全生产许可证',
    icon: markRaw(Medal),
    iconClass: 'safety-icon',
    value: '1',
    colorClass: 'green-card',
    periodLabel: '建筑业',
    periodValue: '1',
    completedLabel: '监理业',
    completedValue: '0',
    route: '/enterprise/safety-license'
  },
  {
    title: '建筑业企业信用手册',
    icon: markRaw(DocumentIcon),
    iconClass: 'book-icon',
    value: '1',
    colorClass: 'teal-card',
    periodLabel: '建筑业',
    periodValue: '0',
    completedLabel: '监理业',
    completedValue: '0',
    route: '/enterprise/credit-manual'
  },
  {
    title: '人员证书',
    icon: markRaw(User),
    iconClass: 'user-icon',
    value: '2',
    colorClass: 'purple-card',
    periodLabel: '注册人员',
    periodValue: '1',
    completedLabel: '技术人员',
    completedValue: '3',
    route: '/personnel/certificate'
  }
]

// 工作日志配置
export const workLogsConfig = [
  {
    content: '刘林 发布了一条新通知（请大家及时查看）',
    time: '10:25'
  }
]

// 页面文本配置
export const workspaceTextConfig = {
  title: '智慧工作台',
  subtitle: '建设工程安全生产监督管理',
  enterpriseTitle: '企业资质管理',
  functionsTitle: '常用功能',
  logsTitle: '工作日志'
}
