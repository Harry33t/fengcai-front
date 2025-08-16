/**
 * 企业弹框管理 Hook
 */
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  basicFormConfig, 
  tabsConfig, 
  enterpriseTypeOptions,
  customerTypeOptions,
  customerAttributionOptions,
  qualificationConfig,
  dialogButtonsConfig
} from '../config/dialog.config'

export function useEnterpriseDialog() {
  // 弹框显示状态
  const dialogVisible = ref(false)
  
  // 当前激活的标签页
  const activeTab = ref('basic')
  
  // 弹框模式：add-新增，edit-编辑
  const dialogMode = ref<'add' | 'edit'>('add')
  
  // 当前编辑的企业ID
  const currentEnterpriseId = ref<string | null>(null)
  
  // 基本信息表单数据
  const basicForm = reactive({ ...basicFormConfig.initialData })
  
  // 资质列表数据
  const qualificationList = ref<any[]>([])
  
  // 安全许可证列表数据
  const safetyPermitList = ref<any[]>([])
  
  // 信用手册列表数据
  const creditManualList = ref<any[]>([])
  
  // 人员列表数据
  const personnelList = ref<any[]>([])
  
  // 表单验证引用
  const basicFormRef = ref()
  
  // 加载状态
  const loading = ref(false)
  
  // 计算属性：弹框标题
  const dialogTitle = computed(() => {
    return dialogMode.value === 'add' ? '新增企业' : '编辑企业'
  })
  
  // 计算属性：当前标签页显示的按钮
  const currentTabButtons = computed(() => {
    return dialogButtonsConfig.filter(btn => 
      btn.show.includes(activeTab.value)
    )
  })
  
  // 响应式数据
  const qualificationSearchText = ref('')
  
  // 打开弹框
  const openDialog = (mode: 'add' | 'edit' = 'add', enterpriseData?: any) => {
    dialogMode.value = mode
    dialogVisible.value = true
    activeTab.value = 'basic'
    
    if (mode === 'edit' && enterpriseData) {
      currentEnterpriseId.value = enterpriseData.id
      // 填充表单数据
      Object.assign(basicForm, enterpriseData)
      loadEnterpriseDetails(enterpriseData.id)
    } else {
      // 重置表单数据
      resetFormData()
    }
  }
  
  // 关闭弹框
  const closeDialog = () => {
    dialogVisible.value = false
    resetFormData()
  }
  
  // 重置表单数据
  const resetFormData = () => {
    Object.assign(basicForm, basicFormConfig.initialData)
    qualificationList.value = []
    safetyPermitList.value = []
    creditManualList.value = []
    personnelList.value = []
    currentEnterpriseId.value = null
    
    // 清除表单验证
    if (basicFormRef.value) {
      basicFormRef.value.clearValidate()
    }
  }
  
  // 加载企业详细信息
  const loadEnterpriseDetails = async (enterpriseId: string) => {
    try {
      loading.value = true
      // TODO: 调用API获取企业详细信息
      // const response = await getEnterpriseDetails(enterpriseId)
      // qualificationList.value = response.qualifications || []
      // safetyPermitList.value = response.safetyPermits || []
      // creditManualList.value = response.creditManuals || []
      // personnelList.value = response.personnel || []
      
      // 模拟数据
      qualificationList.value = [
        {
          id: '1',
          type: 'construction',
          series: 'housing',
          category: 'general',
          level: 'first',
          certificateNumber: 'D123456789',
          issuingAuthority: 'mohurd',
          issueDate: '2020-04-27',
          expiryDate: '2025-04-27'
        }
      ]
    } catch (error) {
      ElMessage.error('加载企业信息失败')
    } finally {
      loading.value = false
    }
  }
  
  // 标签页切换
  const handleTabChange = (tabName: string | number) => {
    activeTab.value = String(tabName)
  }
  
  // 按钮点击处理
  const handleButtonClick = async (action: string) => {
    switch (action) {
      case 'save':
        await handleSave()
        break
      case 'cancel':
        closeDialog()
        break
      case 'submit':
        await handleSubmit()
        break
    }
  }
  
  // 添加项目
  const handleAddItem = (type?: string) => {
    if (type === 'qualification') {
      qualificationList.value.push({
        id: Date.now(),
        type: '',
        series: '',
        category: '',
        level: '',
        issueAuthority: '',
        validityDate: '',
        remarks: ''
      })
    }
    // 其他类型的添加逻辑...
  }
  
  // 新增资质
  const addQualification = () => {
    const newQualification = {
      id: Date.now().toString(),
      type: '',
      series: '',
      category: '',
      level: '',
      certificateNumber: '',
      issuingAuthority: '',
      issueDate: '',
      expiryDate: ''
    }
    qualificationList.value.push(newQualification)
  }
  
  // 新增安全许可证
  const addSafetyPermit = () => {
    const newSafetyPermit = {
      id: Date.now().toString(),
      certificateNumber: '',
      issueDate: '',
      expiryDate: '',
      issuingAuthority: ''
    }
    safetyPermitList.value.push(newSafetyPermit)
  }
  
  // 新增信用手册
  const addCreditManual = () => {
    const newCreditManual = {
      id: Date.now().toString(),
      manualNumber: '',
      issueDate: '',
      expiryDate: '',
      issuingAuthority: ''
    }
    creditManualList.value.push(newCreditManual)
  }
  
  // 获取动态资质序列选项
  const getSeriesOptions = (qualificationType: string) => {
    return (qualificationConfig.seriesOptions as any)[qualificationType] || []
  }
  
  // 获取动态资质类别选项
  const getCategoryOptions = (qualificationSeries: string) => {
    return (qualificationConfig.categoryOptions as any)[qualificationSeries] || []
  }
  
  // 资质类型变化处理
  const handleQualificationTypeChange = (row: any, newType: string) => {
    row.type = newType
    row.series = '' // 清空资质序列
    row.category = '' // 清空资质类别
  }
  
  // 资质序列变化处理
  const handleQualificationSeriesChange = (row: any, newSeries: string) => {
    row.series = newSeries
    row.category = '' // 清空资质类别
  }
  
  // 删除项目
  const handleDeleteItem = (type: string, index: number) => {
    switch (type) {
      case 'qualification':
        qualificationList.value.splice(index, 1)
        break
      case 'safety':
        safetyPermitList.value.splice(index, 1)
        break
      case 'credit':
        creditManualList.value.splice(index, 1)
        break
      case 'personnel':
        personnelList.value.splice(index, 1)
        break
    }
    ElMessage.success('删除成功')
  }
  
  // 暂存
  const handleSave = async () => {
    try {
      loading.value = true
      // TODO: 调用暂存API
      ElMessage.success('暂存成功')
    } catch (error) {
      ElMessage.error('暂存失败')
    } finally {
      loading.value = false
    }
  }
  
  // 提交表单
  const handleSubmit = async () => {
    // 验证基本信息表单
    if (activeTab.value === 'basic') {
      const valid = await validateBasicForm()
      if (!valid) return
    }
    
    try {
      loading.value = true
      
      const submitData = {
        ...basicForm,
        qualifications: qualificationList.value,
        safetyPermits: safetyPermitList.value,
        creditManuals: creditManualList.value,
        personnel: personnelList.value
      }
      
      // TODO: 调用提交API
      if (dialogMode.value === 'add') {
        // await addEnterprise(submitData)
        ElMessage.success('新增企业成功')
      } else {
        // await updateEnterprise(currentEnterpriseId.value, submitData)
        ElMessage.success('更新企业成功')
      }
      
      closeDialog()
      // 刷新列表
      // emit('refresh')
      
    } catch (error) {
      ElMessage.error('操作失败')
    } finally {
      loading.value = false
    }
  }
  
  // 验证基本信息表单
  const validateBasicForm = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!basicFormRef.value) {
        resolve(false)
        return
      }
      
      basicFormRef.value.validate((valid: boolean) => {
        resolve(valid)
      })
    })
  }
  
  return {
    // 响应式数据
    dialogVisible,
    dialogMode,
    activeTab,
    loading,
    basicForm,
    basicFormRef,
    qualificationList,
    safetyPermitList,
    creditManualList,
    personnelList,
    currentEnterpriseId,
    qualificationSearchText,
    
    // 方法
    openDialog,
    closeDialog,
    handleTabChange,
    handleAddItem,
    handleDeleteItem,
    handleSave,
    handleSubmit,
    handleButtonClick,
    validateBasicForm,
    
    // 动态下拉选项方法
    getSeriesOptions,
    getCategoryOptions,
    handleQualificationTypeChange,
    handleQualificationSeriesChange
  }
}
