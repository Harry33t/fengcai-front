import { RoutesAlias } from '../routesAlias'
import { AppRouteRecord } from '@/types/router'
import { fmsRoutes } from './fmsRoutes'

/**
 * FMS 系统菜单列表、异步路由
 * 根据用户截图重新设计的菜单结构
 *
 * 菜单包含：
 * - 仪表盘
 * - 工作台
 * - 企业资质管理
 * - 人员管理
 * - 合同归集
 * - 常用功能
 * - 系统管理
 */
export const asyncRoutes: AppRouteRecord[] = fmsRoutes
