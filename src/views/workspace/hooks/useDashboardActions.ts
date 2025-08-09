import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

/**
 * Dashboard 操作方法 Hook
 */
export function useDashboardActions() {
  const router = useRouter()

  // 统计卡片点击事件
  const handleStatsCardClick = (route: string) => {
    console.log('统计卡片点击:', route)
    router.push(route)
  }

  // 统计项目点击事件
  const handleStatsItemClick = (route: string, type: string) => {
    console.log('统计项目点击:', route, type)
    router.push(route)
  }

  // 模块点击事件
  const handleModuleClick = (route: string) => {
    console.log('模块点击:', route)
    router.push(route)
  }

  // 功能点击事件
  const handleFunctionClick = (route: string) => {
    console.log('功能点击:', route)
    router.push(route)
  }

  // 日志点击事件
  const handleLogClick = (log: any) => {
    console.log('日志点击:', log)
    ElMessage.info('查看日志详情')
  }

  return {
    handleStatsCardClick,
    handleStatsItemClick,
    handleModuleClick,
    handleFunctionClick,
    handleLogClick
  }
}
