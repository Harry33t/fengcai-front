/**
 * 菜单对话框管理 Hook
 * 处理菜单新增/编辑对话框的显示、表单管理、提交等逻辑
 */
import { ref, reactive } from 'vue'
import type { IMenuItem, ICreateMenuParams } from '@/service/menu/type'
import { useMenuActions } from './useMenuActions'
import { menuFormRules, defaultMenuForm } from '../config'

export function useMenuDialog() {
  const { createMenu, updateMenu, getMenuDetail } = useMenuActions()

  // 对话框状态
  const dialogVisible = ref(false)
  const isEdit = ref(false)
  const currentMenuId = ref<number | null>(null)

  // 菜单表单
  const menuForm = reactive<ICreateMenuParams>({
    ...defaultMenuForm
  })

  // 表单验证规则
  const formRules = menuFormRules

  // 显示新增/编辑对话框
  const showDialog = async (type: 'add' | 'edit', menu?: IMenuItem, parentMenu?: IMenuItem) => {
    isEdit.value = type === 'edit'
    dialogVisible.value = true

    if (type === 'add') {
      // 新增菜单
      resetForm()
      if (parentMenu) {
        // 添加子菜单
        menuForm.parentId = parentMenu.id
        menuForm.level = parentMenu.level + 1
        menuForm.isFirstLevel = 2
      } else {
        // 添加顶级菜单
        menuForm.parentId = undefined
        menuForm.level = 1
        menuForm.isFirstLevel = 1
      }
    } else if (type === 'edit' && menu) {
      // 编辑菜单
      currentMenuId.value = menu.id
      const menuDetail = await getMenuDetail(menu.id)
      if (menuDetail) {
        Object.assign(menuForm, {
          path: menuDetail.path,
          name: menuDetail.name,
          component: menuDetail.component,
          title: menuDetail.title,
          icon: menuDetail.icon,
          showBadge: menuDetail.showBadge,
          isHide: menuDetail.isHide,
          isHideTab: menuDetail.isHideTab,
          isIframe: menuDetail.isIframe,
          keepAlive: menuDetail.keepAlive,
          isFirstLevel: menuDetail.isFirstLevel,
          status: menuDetail.status,
          level: menuDetail.level,
          parentId: menuDetail.parentId,
          sort: menuDetail.sort
        })
      }
    }
  }

  // 保存菜单
  const saveMenu = async () => {
    let result = null

    if (isEdit.value && currentMenuId.value) {
      // 更新菜单
      const updateParams = {
        id: currentMenuId.value.toString(),
        ...menuForm
      }
      result = await updateMenu(updateParams)
    } else {
      // 创建菜单
      result = await createMenu(menuForm)
    }

    if (result) {
      dialogVisible.value = false
      return true
    }
    return false
  }

  // 重置表单
  const resetForm = () => {
    Object.assign(menuForm, {
      path: '',
      name: '',
      component: '',
      title: '',
      icon: '',
      showBadge: 2,
      isHide: 2,
      isHideTab: 2,
      isIframe: 2,
      keepAlive: 1,
      isFirstLevel: 1,
      status: 1,
      level: 1,
      parentId: undefined,
      sort: 99
    })
    currentMenuId.value = null
  }

  // 关闭对话框
  const closeDialog = () => {
    dialogVisible.value = false
    resetForm()
  }

  return {
    // 数据
    dialogVisible,
    isEdit,
    menuForm,
    formRules,

    // 方法
    showDialog,
    saveMenu,
    resetForm,
    closeDialog
  }
}
