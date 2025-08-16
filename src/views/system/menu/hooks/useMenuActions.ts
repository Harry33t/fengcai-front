/**
 * 菜单操作管理 Hook
 * 处理菜单的增删改操作逻辑
 */
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  createMenuRequest,
  updateMenuRequest,
  deleteMenuRequest,
  getMenuDetailRequest
} from '@/service/menu/main'
import type { IMenuItem, ICreateMenuParams, IUpdateMenuParams } from '@/service/menu/type'

export function useMenuActions() {
  const loading = ref(false)

  // 创建菜单
  const createMenu = async (params: ICreateMenuParams) => {
    try {
      loading.value = true
      const response = await createMenuRequest(params)
      
      if (response.code === 0) {
        ElMessage.success('创建菜单成功')
        return response.data
      } else {
        ElMessage.error(response.message || '创建菜单失败')
        return null
      }
    } catch (error) {
      console.error('创建菜单失败:', error)
      ElMessage.error('创建菜单失败')
      return null
    } finally {
      loading.value = false
    }
  }

  // 更新菜单
  const updateMenu = async (params: IUpdateMenuParams) => {
    try {
      loading.value = true
      const response = await updateMenuRequest(params)
      
      if (response.code === 0) {
        ElMessage.success('更新菜单成功')
        return response.data
      } else {
        ElMessage.error(response.message || '更新菜单失败')
        return null
      }
    } catch (error) {
      console.error('更新菜单失败:', error)
      ElMessage.error('更新菜单失败')
      return null
    } finally {
      loading.value = false
    }
  }

  // 删除菜单
  const deleteMenu = async (menu: IMenuItem) => {
    try {
      await ElMessageBox.confirm(
        `确定要删除菜单"${menu.title}"吗？删除后不可恢复！`,
        '删除确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )

      loading.value = true
      const response = await deleteMenuRequest(menu.id)
      
      if (response.code === 0) {
        ElMessage.success('删除菜单成功')
        return true
      } else {
        ElMessage.error(response.message || '删除菜单失败')
        return false
      }
    } catch (error) {
      if (error !== 'cancel') {
        console.error('删除菜单失败:', error)
        ElMessage.error('删除菜单失败')
      }
      return false
    } finally {
      loading.value = false
    }
  }

  // 获取菜单详情
  const getMenuDetail = async (id: number) => {
    try {
      loading.value = true
      const response = await getMenuDetailRequest(id)
      
      if (response.code === 0) {
        return response.data
      } else {
        ElMessage.error(response.message || '获取菜单详情失败')
        return null
      }
    } catch (error) {
      console.error('获取菜单详情失败:', error)
      ElMessage.error('获取菜单详情失败')
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createMenu,
    updateMenu,
    deleteMenu,
    getMenuDetail
  }
}
