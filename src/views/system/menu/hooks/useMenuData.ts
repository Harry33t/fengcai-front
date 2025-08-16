/**
 * 菜单数据管理 Composable
 * 职责：响应式状态管理，不包含业务逻辑
 */
import { ref, reactive } from 'vue'
import { MenuService, MenuDataTransformer } from '@/services/menuService'
import type { IMenuListParams, IMenuItem } from '@/service/menu/type'
import { searchFormConfig } from '../config'

export function useMenuData() {
  // 响应式状态
  const loading = ref(false)
  const treeMenuList = ref<IMenuItem[]>([])
  const total = ref(0)

  // 搜索表单状态
  const searchForm = reactive<IMenuListParams>({
    ...searchFormConfig
  })

  // 获取菜单数据
  const fetchMenuData = async (params?: IMenuListParams) => {
    loading.value = true
    try {
      let queryParams: IMenuListParams
      
      if (params) {
        queryParams = params
      } else {
        // 过滤掉空值参数，避免传递不必要的空字符串
        queryParams = Object.entries(searchForm).reduce((acc, [key, value]) => {
          if (value !== '' && value !== undefined && value !== null) {
            acc[key as keyof IMenuListParams] = value
          }
          return acc
        }, {} as IMenuListParams)
      }
      
      const menuTree = await MenuService.getMenuTree(queryParams)
      treeMenuList.value = menuTree
      total.value = menuTree.length
    } finally {
      loading.value = false
    }
  }

  // 搜索菜单
  const handleSearch = async () => {
    await fetchMenuData(searchForm)
  }

  // 重置搜索
  const handleReset = () => {
    Object.assign(searchForm, searchFormConfig)
    fetchMenuData()
  }

  // 检查是否可以添加子菜单
  const canAddSubmenu = (menu: IMenuItem) => {
    return MenuDataTransformer.canAddSubmenu(menu)
  }

  // 刷新数据
  const refreshData = () => {
    // 清除搜索条件，获取全部数据
    Object.assign(searchForm, searchFormConfig)
    fetchMenuData()
  }

  return {
    // 状态
    loading,
    treeMenuList,
    total,
    searchForm,
    
    // 方法
    fetchMenuData,
    handleSearch,
    handleReset,
    canAddSubmenu,
    refreshData
  }
}
