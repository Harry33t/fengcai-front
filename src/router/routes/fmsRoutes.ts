import { RoutesAlias } from '../routesAlias'
import { AppRouteRecord } from '@/types/router'

/**
 * FMS 系统菜单配置
 * 根据用户截图设计的菜单结构
 */
export const fmsRoutes: AppRouteRecord[] = [
  // 工作台
  {
    name: 'Workspace',
    path: '/workspace',
    component: RoutesAlias.Layout,
    meta: {
      title: '工作台',
      icon: '&#xe721;',
      roles: ['R_SUPER', 'R_ADMIN', 'R_USER']
    },
    children: [
      {
        path: 'index',
        name: 'WorkspaceIndex',
        component: '/workspace',
        meta: {
          title: '仪表盘',
          keepAlive: false,
          fixedTab: true
        }
      }
    ]
  },

  // 企业资质管理
  {
    name: 'EnterpriseQualification',
    path: '/enterprise-qualification',
    component: RoutesAlias.Layout,
    meta: {
      title: '企业资质管理',
      icon: '&#xe6b4;',
      roles: ['R_SUPER', 'R_ADMIN', 'R_USER']
    },
    children: [
      {
        path: 'enterprise-management',
        name: 'EnterpriseManagement',
        component: '/company/list',
        meta: {
          title: '企业管理',
          keepAlive: false
        }
      },
      {
        path: 'qualification-management',
        name: 'QualificationManagement',
        component: '/company/qualification',
        meta: {
          title: '企业资质管理',
          keepAlive: false
        }
      },
      {
        path: 'safety-license',
        name: 'SafetyLicense',
        component: '/company/safety-license',
        meta: {
          title: '安全生产许可证管理',
          keepAlive: false
        }
      },
      {
        path: 'credit-manual',
        name: 'CreditManual',
        component: '/company/credit-manual',
        meta: {
          title: '信用手册管理',
          keepAlive: false
        }
      }
    ]
  },

  // 人员管理
  {
    name: 'PersonnelManagement',
    path: '/personnel',
    component: RoutesAlias.Layout,
    meta: {
      title: '人员管理',
      icon: '&#xe70a;',
      roles: ['R_SUPER', 'R_ADMIN', 'R_USER']
    },
    children: [
      {
        path: 'certificate-management',
        name: 'CertificateManagement',
        component: '/personnel/certificate',
        meta: {
          title: '企业人员证书管理',
          keepAlive: false
        }
      }
    ]
  },

  // 合同归集
  {
    name: 'ContractCollection',
    path: '/contract',
    component: RoutesAlias.Layout,
    meta: {
      title: '合同归集',
      icon: '&#xe788;',
      roles: ['R_SUPER', 'R_ADMIN', 'R_USER']
    },
    children: [
      {
        path: 'contract-management',
        name: 'ContractManagement',
        component: '/contract/management',
        meta: {
          title: '合同归集管理',
          keepAlive: false
        }
      }
    ]
  },

  // 常用功能
  {
    name: 'CommonFunctions',
    path: '/common-functions',
    component: RoutesAlias.Layout,
    meta: {
      title: '常用功能',
      icon: '&#xe86e;',
      roles: ['R_SUPER', 'R_ADMIN', 'R_USER']
    },
    children: [
      {
        path: 'enterprise-account',
        name: 'EnterpriseAccount',
        component: '/common-functions/enterprise-account',
        meta: {
          title: '企业账号密码',
          keepAlive: false
        }
      },
      {
        path: 'office-address',
        name: 'OfficeAddress',
        component: '/common-functions/office-address',
        meta: {
          title: '办理事项地址及电话',
          keepAlive: false
        }
      },
      {
        path: 'useful-websites',
        name: 'UsefulWebsites',
        component: '/common-functions/useful-websites',
        meta: {
          title: '常用网站',
          keepAlive: false
        }
      },
      {
        path: 'continuing-education',
        name: 'ContinuingEducation',
        component: '/common-functions/continuing-education',
        meta: {
          title: '人员证书继续教育',
          keepAlive: false
        }
      }
    ]
  },

  // 系统管理
  {
    name: 'SystemManagement',
    path: '/system',
    component: RoutesAlias.Layout,
    meta: {
      title: '系统管理',
      icon: '&#xe81c;',
      roles: ['R_SUPER', 'R_ADMIN']
    },
    children: [
      {
        path: 'user',
        name: 'SystemUser',
        component: '/system/user',
        meta: {
          title: '用户管理',
          keepAlive: false
        }
      },
      {
        path: 'role',
        name: 'SystemRole',
        component: '/system/role',
        meta: {
          title: '角色管理',
          keepAlive: false
        }
      },
      {
        path: 'menu',
        name: 'SystemMenu',
        component: '/system/menu',
        meta: {
          title: '菜单管理',
          keepAlive: false
        }
      },
      {
        path: 'department',
        name: 'SystemDepartment',
        component: '/system/department',
        meta: {
          title: '部门管理',
          keepAlive: false
        }
      }
    ]
  }
]
