import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { searchFormConfig, mockQualificationData } from '../config'

export function useQualificationPage() {
  // 当前激活的标签页
  const activeTab = ref('qualification')
  
  // 搜索表单数据
  const searchForm = reactive({ ...searchFormConfig.initialValues })
  
  // 表格数据
  const tableData = ref([...mockQualificationData])
  const loading = ref(false)
  
  // 分页配置
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })
  
  // 计算属性 - 过滤后的表格数据
  const filteredTableData = computed(() => {
    let data = [...tableData.value]
    
    // 根据搜索条件过滤数据
    if (searchForm.qualificationType) {
      data = data.filter(item => item.qualificationType.includes(searchForm.qualificationType))
    }
    if (searchForm.qualificationSeries) {
      data = data.filter(item => item.qualificationSeries.includes(searchForm.qualificationSeries))
    }
    if (searchForm.qualificationCategory) {
      data = data.filter(item => item.qualificationCategory.includes(searchForm.qualificationCategory))
    }
    if (searchForm.qualificationLevel) {
      data = data.filter(item => item.qualificationLevel === searchForm.qualificationLevel)
    }
    if (searchForm.employmentStatus) {
      data = data.filter(item => item.employmentStatus === searchForm.employmentStatus)
    }
    
    pagination.total = data.length
    return data
  })
  
  // 当前页数据
  const currentPageData = computed(() => {
    const start = (pagination.currentPage - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    return filteredTableData.value.slice(start, end)
  })
  
  // 标签页切换
  const handleTabChange = (tabName: string | number) => {
    const tabNameStr = String(tabName)
    activeTab.value = tabNameStr
    // 根据不同标签页加载不同数据
    loadTabData(tabNameStr)
  }
  
  // 加载标签页数据
  const loadTabData = async (tabName: string) => {
    loading.value = true
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      switch (tabName) {
        case 'qualification':
          tableData.value = [...mockQualificationData]
          break
        case 'safety':
          // 安全许可证数据
          tableData.value = []
          break
        case 'credit':
          // 信用手册数据
          tableData.value = []
          break
        case 'personnel':
          // 企业人员数据
          tableData.value = []
          break
        default:
          tableData.value = []
      }
    } catch (error) {
      ElMessage.error('数据加载失败')
    } finally {
      loading.value = false
    }
  }
  
  // 处理搜索
  const handleSearch = () => {
    console.log('搜索条件:', searchForm)
    // 这里应该调用API进行搜索
    loadTabData(activeTab.value)
  }

  // 处理重置
  const handleReset = () => {
    Object.assign(searchForm, {
      enterpriseName: '',
      qualificationType: '',
      qualificationLevel: ''
    })
    loadTabData(activeTab.value)
  }

  // 处理新增
  const handleAdd = () => {
    console.log('新增资质')
    // 这里应该打开新增资质弹框
  }

  // 处理编辑
  const handleEdit = (row: any) => {
    console.log('编辑资质:', row)
    // 这里应该打开编辑资质弹框
  }

  // 处理删除
  const handleDelete = (row: any) => {
    console.log('删除资质:', row)
    // 这里应该显示删除确认弹框
  }

  // 新增资质
  const handleAddQualification = () => {
    ElMessage.info('新增资质功能开发中')
  }
  
  // 编辑资质
  const handleEditQualification = (row: any) => {
    ElMessage.info(`编辑资质：${row.qualificationType}`)
  }
  
  // 删除资质
  const handleDeleteQualification = (row: any) => {
    ElMessage.info(`删除资质：${row.qualificationType}`)
  }
  
  // 分页变化
  const handlePageChange = (page: number) => {
    pagination.currentPage = page
  }
  
  const handleSizeChange = (size: number) => {
    pagination.pageSize = size
    pagination.currentPage = 1
  }
  
  // 初始化数据
  const initData = () => {
    loadTabData(activeTab.value)
  }
  
  return {
    // 响应式数据
    activeTab,
    searchForm,
    tableData,
    loading,
    pagination,
    
    // 计算属性
    currentPageData,
    
    // 方法
    handleTabChange,
    handleSearch,
    handleReset,
    handleAdd,
    handleEdit,
    handleDelete,
    handleAddQualification,
    handleEditQualification,
    handleDeleteQualification,
    handlePageChange,
    handleSizeChange,
    initData
  }
}
