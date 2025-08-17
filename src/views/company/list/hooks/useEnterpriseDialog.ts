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
import { 
  createEnterpriseRequest, 
  updateEnterpriseRequest,
  getEnterpriseDetailRequest,
  createCompanyQualificationRequest,
  getCompanyQualificationsRequest,
  updateCompanyQualificationRequest,
  deleteCompanyQualificationRequest,
  type ICreateEnterpriseParams,
  type IUpdateEnterpriseParams,
  type ICreateCompanyQualificationParams
} from '@/service/api'

export function useEnterpriseDialog(emit?: any) {
  // 弹框显示状态
  const dialogVisible = ref(false)
  
  // 当前激活的标签页
  const activeTab = ref('basic')
  
  // 弹框模式：add-新增，edit-编辑，view-查看
  const dialogMode = ref<'add' | 'edit' | 'view'>('add')
  
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
    switch (dialogMode.value) {
      case 'add': return '新增企业'
      case 'edit': return '编辑企业'
      case 'view': return '查看企业详情'
      default: return '企业管理'
    }
  })
  
  // 计算属性：当前标签页显示的按钮
  const currentTabButtons = computed(() => {
    return dialogButtonsConfig.filter(btn => 
      btn.show.includes(activeTab.value)
    )
  })
  
  // 计算属性：是否为只读模式
  const isReadonly = computed(() => {
    return dialogMode.value === 'view'
  })
  
  // 响应式数据
  const qualificationSearchText = ref('')
  const safetyPermitSearchText = ref('')
  const creditManualSearchText = ref('')
  const personnelSearchText = ref('')
  
  // 打开弹框
  const openDialog = (mode: 'add' | 'edit' | 'view' = 'add', enterpriseData?: any) => {
    dialogMode.value = mode
    dialogVisible.value = true
    activeTab.value = 'basic'
    
    if ((mode === 'edit' || mode === 'view') && enterpriseData) {
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
      const response = await getEnterpriseDetailRequest(enterpriseId)
      
      if (response.code === 0 && response.data) {
        const enterprise = response.data
        // 将后端字段映射到前端表单字段
        Object.assign(basicForm, {
          enterpriseName: enterprise.name,
          enterpriseType: enterprise.companyTypes?.[0] || '', // 取数组第一个元素
          unifiedSocialCreditCode: enterprise.socialCreditCode || '',
          legalRepresentative: '', // 后端未返回该字段
          contactPerson: enterprise.contactPerson,
          contactPhone: enterprise.contactPhone,
          registeredAddress: enterprise.address || '',
          customerAttribution: '', // 后端未返回该字段  
          customerType: enterprise.customerType || ''
        })
        
        // TODO: 如果有资质、安全许可证等数据，也需要加载
        // qualificationList.value = enterprise.qualifications || []
        // safetyPermitList.value = enterprise.safetyPermits || []
        // creditManualList.value = enterprise.creditManuals || []
        // personnelList.value = enterprise.personnel || []
      } else {
        ElMessage.error(response.message || '加载企业信息失败')
      }
    } catch (error: any) {
      console.error('加载企业详情失败:', error)
      ElMessage.error(error?.message || '加载企业信息失败')
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
        certificateNumber: '',
        issuingAuthority: '',
        validityDate: '',
        remarks: ''
      })
    } else if (type === 'safety') {
      safetyPermitList.value.push({
        id: Date.now().toString(),
        certificateNumber: '',
        issuingAuthority: '',
        validityDate: ''
      })
    } else if (type === 'credit') {
      creditManualList.value.push({
        id: Date.now().toString(),
        archiveNumber: '',
        issuingAuthority: '',
        validityDate: ''
      })
    } else if (type === 'personnel') {
      personnelList.value.push({
        id: Date.now().toString(),
        name: '',
        idNumber: '',
        birthDate: '',
        gender: '',
        age: '',
        phone: '',
        qualificationType: ''
      })
    }
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

  // 根据身份证号计算年龄和性别
  const calculateAgeAndGender = (row: any) => {
    const idNumber = row.idNumber
    if (!idNumber || idNumber.length !== 18) {
      row.birthDate = ''
      row.gender = ''
      row.age = ''
      return
    }
    
    try {
      // 提取出生日期
      const year = idNumber.substring(6, 10)
      const month = idNumber.substring(10, 12)
      const day = idNumber.substring(12, 14)
      const birthDate = `${year}-${month}-${day}`
      row.birthDate = birthDate
      
      // 计算年龄
      const birth = new Date(birthDate)
      const now = new Date()
      let age = now.getFullYear() - birth.getFullYear()
      const monthDiff = now.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
        age--
      }
      row.age = age.toString()
      
      // 判断性别（第17位数字，奇数为男，偶数为女）
      const genderDigit = parseInt(idNumber.substring(16, 17))
      row.gender = genderDigit % 2 === 1 ? '男' : '女'
    } catch (error) {
      console.error('解析身份证号失败:', error)
      row.birthDate = ''
      row.gender = ''
      row.age = ''
    }
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
    // 查看模式下不允许提交
    if (dialogMode.value === 'view') {
      return
    }
    
    // 验证基本信息表单
    if (activeTab.value === 'basic') {
      const valid = await validateBasicForm()
      if (!valid) return
    }
    
    try {
      loading.value = true
      
      // 构造提交数据，将前端字段映射到后端字段
      const enterpriseData = {
        name: basicForm.enterpriseName,
        socialCreditCode: basicForm.unifiedSocialCreditCode,
        address: basicForm.registeredAddress,
        contactPerson: basicForm.contactPerson,
        contactPhone: basicForm.contactPhone,
        customerType: basicForm.customerType,
        companyTypes: [basicForm.enterpriseType] // 转换为数组格式
      }
      
      if (dialogMode.value === 'add') {
        const response = await createEnterpriseRequest(enterpriseData as ICreateEnterpriseParams)
        if (response.code === 0) {
          ElMessage.success('新增企业成功')
          
          // 如果有资质数据，保存资质信息
          const enterpriseId = response.data.id.toString()
          await saveQualifications(enterpriseId)
          
          closeDialog()
          // 发送刷新事件给父组件
          emit?.('refresh')
        } else {
          ElMessage.error(response.message || '新增企业失败')
        }
      } else {
        const updateData = {
          id: currentEnterpriseId.value!,
          ...enterpriseData
        }
        const response = await updateEnterpriseRequest(updateData as IUpdateEnterpriseParams)
        if (response.code === 0) {
          ElMessage.success('更新企业成功')
          
          // 保存资质信息
          await saveQualifications(currentEnterpriseId.value!)
          
          closeDialog()
          // 发送刷新事件给父组件
          emit?.('refresh')
        } else {
          ElMessage.error(response.message || '更新企业失败')
        }
      }
      
    } catch (error: any) {
      console.error('企业操作失败:', error)
      ElMessage.error(error?.message || '操作失败，请重试')
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
  
  // 保存资质信息
  const saveQualifications = async (companyId: string) => {
    try {
      // 保存所有有效的资质数据
      for (const qualification of qualificationList.value) {
        if (qualification.type && qualification.certificateNumber) {
          // 将日期字符串转换为时间戳
          let validUntilTimestamp = 0
          if (qualification.validityDate) {
            const date = new Date(qualification.validityDate)
            validUntilTimestamp = Math.floor(date.getTime() / 1000) // 转换为秒级时间戳
          }
          
          const qualificationData: ICreateCompanyQualificationParams = {
            companyId: companyId,
            qualificationType: qualification.type,
            qualificationSeries: qualification.series || '',
            qualificationCategory: qualification.category || '',
            grade: qualification.level || '',
            certificateNumber: qualification.certificateNumber,
            issuingAuthority: qualification.issuingAuthority || '',
            validUntil: validUntilTimestamp
          }
          
          await createCompanyQualificationRequest(qualificationData)
        }
      }
    } catch (error) {
      console.error('保存资质信息失败:', error)
      // 这里不抛出错误，因为企业已经创建成功了
    }
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
    safetyPermitSearchText,
    creditManualSearchText,
    personnelSearchText,
    
    // 计算属性
    dialogTitle,
    isReadonly,
    
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
    handleQualificationSeriesChange,
    
    // 身份证号解析方法
    calculateAgeAndGender
  }
}
