/**
 * 角色数据管理 Composable
 * 职责：响应式状态管理、数据获取和操作
 */
import { ref, reactive, nextTick } from 'vue'
import { RoleService } from '@/services/roleService'
import type { IRole, IRoleListParams } from '@/service/role/type'

// 防抖函数
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 300): T {
  let timeoutId: ReturnType<typeof setTimeout>
  return ((...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }) as T
}

export function useRoleData() {
  // 响应式状态
  const loading = ref(false)
  const roleList = ref<IRole[]>([])
  const total = ref(0)
  
  // 搜索表单
  const searchForm = reactive<IRoleListParams>({
    page: 1,
    pageSize: 10,
    name: '',
    status: undefined
  })

  // 获取角色列表
  const fetchRoleList = async (params?: IRoleListParams) => {
    loading.value = true
    try {
      const queryParams = params || searchForm
      console.log('获取角色列表，参数:', queryParams)
      
      const result = await RoleService.getRoles(queryParams)
      
      // 使用 nextTick 确保 DOM 更新后再设置数据，减少布局抖动
      await nextTick()
      roleList.value = result.roles
      total.value = result.total
      
      console.log('获取到的角色列表:', result)
    } catch (error) {
      console.error('获取角色列表失败:', error)
      roleList.value = []
      total.value = 0
    } finally {
      loading.value = false
    }
  }

  // 创建防抖搜索函数
  const debouncedFetchRoleList = debounce(fetchRoleList, 300)
  
  // 搜索角色
  const handleSearch = () => {
    searchForm.page = 1 // 重置到第一页
    debouncedFetchRoleList(searchForm)
  }

  // 重置搜索
  const handleReset = () => {
    searchForm.name = ''
    searchForm.status = undefined
    searchForm.page = 1
    fetchRoleList(searchForm)
  }

  // 刷新数据
  const refreshData = () => {
    fetchRoleList(searchForm)
  }

  // 分页处理
  const handlePageChange = (page: number) => {
    searchForm.page = page
    fetchRoleList(searchForm)
  }

  const handleSizeChange = (size: number) => {
    searchForm.pageSize = size
    searchForm.page = 1
    fetchRoleList(searchForm)
  }

  return {
    // 状态
    loading,
    roleList,
    total,
    searchForm,
    
    // 方法
    fetchRoleList,
    handleSearch,
    handleReset,
    refreshData,
    handlePageChange,
    handleSizeChange
  }
}