/**
 * 菜单管理 Service 层
 * 职责：业务逻辑处理、数据转换、错误处理
 */
import { ElMessage } from 'element-plus'
import { menuApi } from '@/api/menu'
import type { IMenuItem, IMenuListParams, ICreateMenuParams, IUpdateMenuParams } from '@/service/menu/type'

/**
 * 菜单数据转换工具
 */
export class MenuDataTransformer {
  /**
   * 构建菜单树形结构
   */
  static buildMenuTree(menuList: IMenuItem[]): IMenuItem[] {
    const menuMap = new Map<number, IMenuItem>()
    const rootMenus: IMenuItem[] = []

    // 第一遍遍历：建立映射关系并确保层级正确
    menuList.forEach(menu => {
      const menuItem = { ...menu, children: [] }
      // 确保层级数据的正确性
      if (!menuItem.level) {
        menuItem.level = (!menuItem.parentId || menuItem.parentId === 0) ? 1 : 2
      }
      menuMap.set(menu.id, menuItem)
    })

    // 第二遍遍历：建立父子关系
    menuList.forEach(menu => {
      const menuItem = menuMap.get(menu.id)!
      
      if (!menu.parentId || menu.parentId === 0) {
        // 一级菜单
        menuItem.level = 1
        rootMenus.push(menuItem)
      } else {
        // 子菜单
        const parent = menuMap.get(menu.parentId)
        if (parent) {
          parent.children = parent.children || []
          // 根据父级层级设置子级层级
          menuItem.level = parent.level + 1
          parent.children.push(menuItem)
        } else {
          // 如果找不到父菜单，说明是孤立菜单，记录警告并跳过
          console.warn(`菜单 "${menu.title}" (ID: ${menu.id}) 的父菜单 (parentId: ${menu.parentId}) 不存在，已跳过`)
        }
      }
    })

    // 按排序字段排序
    const sortMenus = (menus: IMenuItem[]) => {
      menus.sort((a, b) => a.sort - b.sort)
      menus.forEach(menu => {
        if (menu.children && menu.children.length > 0) {
          sortMenus(menu.children)
        }
      })
    }
    
    sortMenus(rootMenus)
    return rootMenus
  }

  /**
   * 检查是否可以添加子菜单
   */
  static canAddSubmenu(menu: IMenuItem): boolean {
    // 只允许一级菜单添加子菜单，最多支持二级菜单
    return menu.level === 1
  }
}

/**
 * 菜单业务服务
 */
export class MenuService {
  /**
   * 获取菜单列表并转换为树形结构
   */
  static async getMenuTree(params?: IMenuListParams) {
    try {
      // 确保传递足够大的pageSize以获取所有菜单数据
      const defaultParams = {
        page: 1,
        pageSize: 100,
        ...params
      }
      const response = await menuApi.getList(defaultParams)
      
      if (response && response.code === 0 && response.data) {
        const menuData = Array.isArray(response.data) 
          ? response.data 
          : (response.data.menus || [])
        
        // 调试信息：打印原始数据
        console.log('原始菜单数据:', menuData)
        console.log('数据总数:', response.data.total)
        
        return MenuDataTransformer.buildMenuTree(menuData)
      } else {
        ElMessage.error(response?.message || '获取菜单数据失败')
        return []
      }
    } catch (error) {
      console.error('获取菜单数据失败:', error)
      ElMessage.error('获取菜单数据失败')
      return []
    }
  }

  /**
   * 创建菜单
   */
  static async createMenu(menuData: ICreateMenuParams) {
    try {
      const response = await menuApi.create(menuData)
      
      if (response && response.code === 0) {
        ElMessage.success('菜单创建成功')
        return response.data
      } else {
        ElMessage.error(response?.message || '创建菜单失败')
        return null
      }
    } catch (error) {
      console.error('创建菜单失败:', error)
      ElMessage.error('创建菜单失败')
      return null
    }
  }

  /**
   * 更新菜单
   */
  static async updateMenu(menuData: IUpdateMenuParams) {
    try {
      const response = await menuApi.update(menuData)
      
      if (response && response.code === 0) {
        ElMessage.success('菜单更新成功')
        return response.data
      } else {
        ElMessage.error(response?.message || '更新菜单失败')
        return null
      }
    } catch (error) {
      console.error('更新菜单失败:', error)
      ElMessage.error('更新菜单失败')
      return null
    }
  }

  /**
   * 删除菜单
   */
  static async deleteMenu(id: string | number) {
    try {
      const response = await menuApi.delete(id)
      
      if (response && response.code === 0) {
        ElMessage.success('菜单删除成功')
        return true
      } else {
        ElMessage.error(response?.message || '删除菜单失败')
        return false
      }
    } catch (error) {
      console.error('删除菜单失败:', error)
      ElMessage.error('删除菜单失败，服务器错误')
      return false
    }
  }

  /**
   * 获取菜单详情
   */
  static async getMenuDetail(id: string | number) {
    try {
      const response = await menuApi.getDetail(id)
      
      if (response && response.code === 0 && response.data) {
        return response.data
      } else {
        ElMessage.error(response?.message || '获取菜单详情失败')
        return null
      }
    } catch (error) {
      console.error('获取菜单详情失败:', error)
      ElMessage.error('获取菜单详情失败')
      return null
    }
  }
}
