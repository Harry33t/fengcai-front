import { ref, reactive, computed, onMounted } from 'vue'
import { 
  searchFormConfig, 
  tableColumnsConfig, 
  mockTableData, 
  paginationConfig, 
  pageTextConfig 
} from '../config'
import { getEnterpriseListRequest } from '@/service/api'

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
  const tableData = ref<any[]>([])
  
  // 分页数据
  const pagination = reactive({
    ...paginationConfig,
    total: 0
  })

  // 加载状态
  const loading = ref(false)

  // 初始化加载数据
  onMounted(() => {
    loadEnterpriseList()
  })

  // 搜索方法
  const handleSearch = () => {
    pagination.currentPage = 1 // 重置到第一页
    loadEnterpriseList()
  }

  // 重置搜索
  const handleReset = () => {
    Object.keys(searchForm).forEach(key => {
      searchForm[key] = ''
    })
    pagination.currentPage = 1
    loadEnterpriseList()
  }

  // 分页变化
  const handlePageChange = (page: number) => {
    pagination.currentPage = page
    loadEnterpriseList()
  }

  // 每页数量变化
  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.currentPage = 1
    loadEnterpriseList()
  }

  // 状态格式化
  const formatStatus = (value: string) => {
    return value === 'yes' ? '有' : '无'
  }

  // 状态标签类型
  const getStatusTagType = (value: string) => {
    return value === 'yes' ? 'success' : 'info'
  }

  // 加载企业列表数据
  const loadEnterpriseList = async () => {
    try {
      loading.value = true
      const params = {
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
        name: searchForm.enterpriseName,
        type: searchForm.enterpriseType,
        // 其他搜索条件...
      }
      
      const response = await getEnterpriseListRequest(params)
      
      if (response.code === 0 && response.data) {
        // 映射后端数据到前端显示格式
        tableData.value = response.data.companies?.map((item: any) => ({
          id: item.id,
          enterpriseType: item.companyTypes?.[0] || '',
          enterpriseName: item.name,
          contactPerson: item.contactPerson,
          contactPhone: item.contactPhone,
          safetyPermit: '无', // 默认值，后续根据实际数据调整
          creditManual: '无', // 默认值，后续根据实际数据调整
          customerAttribution: item.customerType || ''
        })) || []
        
        pagination.total = response.data.total || 0
      } else {
        console.error('获取企业列表失败:', response.message)
        tableData.value = []
        pagination.total = 0
      }
    } catch (error) {
      console.error('加载企业列表错误:', error)
      tableData.value = []
      pagination.total = 0
    } finally {
      loading.value = false
    }
  }

  return {
    // 数据
    searchForm,
    tableData,
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
    getStatusTagType,
    loadEnterpriseList
  }
}
