import { ref, reactive, computed } from 'vue'
import { 
  searchFormConfig, 
  tableColumnsConfig, 
  mockTableData, 
  paginationConfig, 
  pageTextConfig 
} from '../config'

/**
 * 企业管理数据管理 Hook
 */
export function useEnterpriseData() {
  // 搜索表单数据
  const searchForm = reactive<{
    enterpriseType: string
    enterpriseName: string
    qualificationStatus: string
    safetyPermit: string
    creditManual: string
    customerAttribution: string
    [key: string]: string
  }>({
    enterpriseType: '',
    enterpriseName: '',
    qualificationStatus: '',
    safetyPermit: '',
    creditManual: '',
    customerAttribution: ''
  })

  // 表格数据
  const tableData = ref([...mockTableData])
  
  // 分页数据
  const pagination = reactive({
    ...paginationConfig,
    total: mockTableData.length
  })

  // 加载状态
  const loading = ref(false)

  // 过滤后的表格数据
  const filteredTableData = computed(() => {
    let filtered = [...tableData.value]
    
    // 根据搜索条件过滤
    if (searchForm.enterpriseType) {
      filtered = filtered.filter(item => item.enterpriseType === searchForm.enterpriseType)
    }
    
    if (searchForm.enterpriseName) {
      filtered = filtered.filter(item => 
        item.enterpriseName.toLowerCase().includes(searchForm.enterpriseName.toLowerCase())
      )
    }
    
    if (searchForm.qualificationStatus) {
      filtered = filtered.filter(item => item.qualificationStatus === searchForm.qualificationStatus)
    }
    
    if (searchForm.safetyPermit) {
      filtered = filtered.filter(item => item.safetyPermit === searchForm.safetyPermit)
    }
    
    if (searchForm.creditManual) {
      filtered = filtered.filter(item => item.creditManual === searchForm.creditManual)
    }
    
    if (searchForm.customerAttribution) {
      filtered = filtered.filter(item => item.customerAttribution === searchForm.customerAttribution)
    }
    
    return filtered
  })

  // 当前页数据
  const currentPageData = computed(() => {
    const start = (pagination.currentPage - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    return filteredTableData.value.slice(start, end)
  })

  // 更新分页总数
  const updatePaginationTotal = () => {
    pagination.total = filteredTableData.value.length
    // 如果当前页超出范围，重置到第一页
    if (pagination.currentPage > Math.ceil(pagination.total / pagination.pageSize)) {
      pagination.currentPage = 1
    }
  }

  // 搜索方法
  const handleSearch = () => {
    loading.value = true
    setTimeout(() => {
      updatePaginationTotal()
      loading.value = false
    }, 300)
  }

  // 重置搜索
  const handleReset = () => {
    Object.keys(searchForm).forEach(key => {
      searchForm[key] = ''
    })
    pagination.currentPage = 1
    updatePaginationTotal()
  }

  // 分页变化
  const handlePageChange = (page: number) => {
    pagination.currentPage = page
  }

  // 每页数量变化
  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.currentPage = 1
    updatePaginationTotal()
  }

  // 状态格式化
  const formatStatus = (value: string) => {
    return value === 'yes' ? '有' : '无'
  }

  // 状态标签类型
  const getStatusTagType = (value: string) => {
    return value === 'yes' ? 'success' : 'info'
  }

  return {
    // 数据
    searchForm,
    tableData: currentPageData,
    pagination,
    loading,
    
    // 配置
    searchFormConfig,
    tableColumnsConfig,
    pageTextConfig,
    
    // 方法
    handleSearch,
    handleReset,
    handlePageChange,
    handleSizeChange,
    formatStatus,
    getStatusTagType
  }
}
