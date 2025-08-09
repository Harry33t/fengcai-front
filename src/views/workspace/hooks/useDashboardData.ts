import { ref, computed } from 'vue'
import { 
  enterpriseModulesConfig, 
  commonFunctionsConfig, 
  statsCardsConfig, 
  workLogsConfig,
  workspaceTextConfig 
} from '../config'

/**
 * Dashboard 数据管理 Hook
 */
export function useDashboardData() {
  // 格式化当前日期
  const currentDate = computed(() => {
    const date = new Date()
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  })

  // 从配置文件获取数据
  const enterpriseModules = enterpriseModulesConfig
  const commonFunctions = commonFunctionsConfig
  const statsCards = ref(statsCardsConfig)
  const workLogs = workLogsConfig
  const pageText = workspaceTextConfig

  return {
    currentDate,
    enterpriseModules,
    commonFunctions,
    statsCards,
    workLogs,
    pageText
  }
}
