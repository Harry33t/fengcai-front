import { router } from '@/router'
import { App, Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'

/**
 * 权限指令（支持动态权限控制）
 * 用法：
 * <el-button v-auth="'create'">新增按钮</el-button>
 * <el-button v-auth="{ auth: 'delete', menuId: '1' }">删除按钮</el-button>
 */

interface AuthBinding extends DirectiveBinding {
  value: string | { auth: string; menuId?: string }
}

function checkAuthPermission(el: HTMLElement, binding: AuthBinding): void {
  try {
    const permissionStore = usePermissionStore()
    
    // 如果权限信息尚未加载，暂时显示元素（避免闪烁）
    if (!permissionStore.isPermissionLoaded) {
      console.warn('权限信息尚未加载，暂时显示元素')
      return
    }

    let hasPermission = false
    
    if (typeof binding.value === 'string') {
      // 简单模式：v-auth="'create'"
      const authMark = binding.value
      
      // 获取当前路由对应的菜单ID
      const currentPath = router.currentRoute.value.path
      const menuId = permissionStore.getMenuIdByPath(currentPath)
      
      if (menuId) {
        // 检查特定菜单下的按钮权限
        hasPermission = permissionStore.hasAuthPermission(authMark, menuId)
      } else {
        // 检查全局按钮权限
        hasPermission = permissionStore.hasAuthPermission(authMark)
      }
    } else if (typeof binding.value === 'object' && binding.value.auth) {
      // 对象模式：v-auth="{ auth: 'delete', menuId: '1' }"
      const { auth, menuId } = binding.value
      
      if (menuId) {
        hasPermission = permissionStore.hasAuthPermission(auth, menuId)
      } else {
        hasPermission = permissionStore.hasAuthPermission(auth)
      }
    } else {
      console.warn('v-auth 指令参数格式错误:', binding.value)
      return
    }

    // 如果没有权限，移除元素
    if (!hasPermission) {
      removeElement(el)
    }
  } catch (error) {
    console.error('权限检查失败:', error)
    // 发生错误时，为了安全起见，移除元素
    removeElement(el)
  }
}

function removeElement(el: HTMLElement): void {
  if (el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const authDirective: Directive = {
  mounted: checkAuthPermission,
  updated: checkAuthPermission
}

export function setupAuthDirective(app: App): void {
  app.directive('auth', authDirective)
}
