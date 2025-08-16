import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, deleteUser } from '@/api/userApi'
import type { IUserItem, IUserQueryParams } from '@/api/userApi'

/**
 * 用户数据管理Hook
 */
export function useUserData() {
  // 状态管理
  const loading = ref(false)
  const userList = ref<IUserItem[]>([])
  const total = ref(0)
  
  // 查询参数
  const queryParams = reactive<IUserQueryParams>({
    page: 1,
    pageSize: 10
    // 不设置 username, name, status 的默认值，避免发送空字符串
  })

  // 计算属性
  const hasData = computed(() => userList.value.length > 0)
  const isEmpty = computed(() => !loading.value && userList.value.length === 0)

  // 获取用户列表
  const fetchUserList = async () => {
    try {
      loading.value = true
      
      // 过滤掉空值参数
      const filteredParams: any = {}
      Object.keys(queryParams).forEach(key => {
        const value = queryParams[key as keyof typeof queryParams]
        if (value !== undefined && value !== null && value !== '') {
          filteredParams[key] = value
        }
      })
      
      console.log('发送的查询参数:', filteredParams)
      const data = await getUserList(filteredParams)
      
      console.log('接收到的数据:', data)
      
      if (data && data.data) {
        userList.value = data.data.users || []
        total.value = Number(data.data.total) || 0
      } else {
        userList.value = []
        total.value = 0
      }
    } catch (error) {
      console.error('获取用户列表失败:', error)
      console.error('错误详情:', error)
      ElMessage.error(`获取用户列表失败: ${error.message || error}`)
      userList.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  // 刷新数据
  const refreshData = () => {
    queryParams.page = 1
    fetchUserList()
  }

  // 搜索
  const handleSearch = () => {
    queryParams.page = 1
    fetchUserList()
  }

  // 重置搜索
  const handleReset = () => {
    // 清除所有搜索参数，只保留分页参数
    Object.keys(queryParams).forEach(key => {
      if (key !== 'page' && key !== 'pageSize') {
        delete queryParams[key as keyof typeof queryParams]
      }
    })
    queryParams.page = 1
    queryParams.pageSize = 10
    fetchUserList()
  }

  // 分页处理
  const handlePageChange = (page: number) => {
    queryParams.page = page
    fetchUserList()
  }

  const handleSizeChange = (size: number) => {
    queryParams.pageSize = size
    queryParams.page = 1
    fetchUserList()
  }

  // 删除用户
  const handleDelete = async (row: IUserItem) => {
    try {
      await ElMessageBox.confirm(
        `确定要删除用户 "${row.user.name}" 吗？`,
        '删除确认',
        {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )

      loading.value = true
      await deleteUser(row.user.id)
      
      ElMessage.success('删除成功')
      // 如果当前页没有数据且不是第一页，则跳转到上一页
      if (userList.value.length === 1 && queryParams.page > 1) {
        queryParams.page--
      }
      await fetchUserList()
    } catch (error) {
      if (error !== 'cancel') {
        console.error('删除用户失败:', error)
        ElMessage.error('删除失败')
      }
    } finally {
      loading.value = false
    }
  }

  // 格式化性别
  const formatGender = (gender: number) => {
    return gender === 1 ? '男' : gender === 2 ? '女' : '未知'
  }

  // 格式化状态
  const formatStatus = (status: number) => {
    return status === 1 ? '启用' : '禁用'
  }

  // 格式化时间
  const formatTime = (timestamp: number) => {
    if (!timestamp) return '-'
    return new Date(timestamp * 1000).toLocaleString('zh-CN')
  }

  return {
    // 状态
    loading,
    userList,
    total,
    queryParams,
    
    // 计算属性
    hasData,
    isEmpty,
    
    // 方法
    fetchUserList,
    refreshData,
    handleSearch,
    handleReset,
    handlePageChange,
    handleSizeChange,
    handleDelete,
    
    // 格式化方法
    formatGender,
    formatStatus,
    formatTime
  }
}