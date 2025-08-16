/**
 * 动态路由加载器
 * 基于后端返回的 menuTrees 数据自动生成和加载路由
 */

import type { RouteRecordRaw } from 'vue-router'
import type { MenuTree } from '@/types/permission'
import { RoutesAlias } from '../routesAlias'

/**
 * 将后端 menuTrees 数据转换为 Vue Router 路由配置
 * @param menuTrees 后端返回的菜单树数据
 * @returns Vue Router 路由配置数组
 */
export function convertMenuTreesToRoutes(menuTrees: MenuTree[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  menuTrees.forEach(menuTree => {
    const route = convertMenuTreeToRoute(menuTree)
    if (route) {
      routes.push(route)
    }
  })

  return routes
}

/**
 * 将单个菜单树节点转换为路由配置
 * @param menuTree 菜单树节点
 * @param parentPath 父级路径
 * @returns 路由配置
 */
function convertMenuTreeToRoute(menuTree: MenuTree, parentPath = ''): RouteRecordRaw | null {
  const menu = menuTree.menu
  
  // 构建完整路径
  const fullPath = menu.isFirstLevel === 1 
    ? menu.path 
    : parentPath ? `${parentPath}/${menu.path}`.replace(/\/+/g, '/') : menu.path

  // 处理组件加载
  let routeComponent
  if (menu.component && menu.component !== '/index/index') {
    // 实际页面组件
    const componentPath = normalizeComponentPath(menu.component)
    routeComponent = createAsyncComponent(componentPath)
  } else {
    // 布局组件或父级菜单
    routeComponent = () => import('@/components/core/layouts/art-layouts/index.vue')
  }

  // 基础路由配置
  const route: any = {
    path: fullPath,
    name: menu.name,
    component: routeComponent,
    meta: {
      title: menu.title,
      icon: menu.icon,
      menuId: menu.id,
      requiresAuth: true,
      keepAlive: menu.keepAlive === 1,
      isHide: menu.isHide === 1,
      isIframe: menu.isIframe === 1,
      auths: menuTree.auths || []
    }
  }

  // 处理子路由
  if (menuTree.children && menuTree.children.length > 0) {
    route.children = []
    menuTree.children.forEach(child => {
      const childRoute = convertMenuTreeToRoute(child, fullPath)
      if (childRoute) {
        route.children.push(childRoute)
      }
    })
  }

  return route
}

/**
 * 标准化组件路径
 * @param componentPath 后端返回的组件路径
 * @returns 标准化后的路径
 */
function normalizeComponentPath(componentPath: string): string {
  // 如果以 / 开头，移除开头的斜杠
  if (componentPath.startsWith('/')) {
    componentPath = componentPath.substring(1)
  }
  
  // 如果不以 .vue 结尾，添加 .vue 扩展名
  if (!componentPath.endsWith('.vue')) {
    componentPath += '.vue'
  }
  
  return componentPath
}

/**
 * 创建异步组件加载器
 * @param componentPath 组件路径
 * @returns 异步组件加载函数
 */
function createAsyncComponent(componentPath: string) {
  return () => import(/* @vite-ignore */ `@/views/${componentPath}`).catch((error) => {
    console.warn(`组件加载失败: @/views/${componentPath}`, error)
    // 返回默认的开发中页面
    return import('@/views/common/under-development/index.vue')
  })
}

/**
 * 动态添加路由到 Vue Router
 * @param router Vue Router 实例
 * @param menuTrees 菜单树数据
 */
export function addDynamicRoutes(router: any, menuTrees: MenuTree[]) {
  const routes = convertMenuTreesToRoutes(menuTrees)
  
  routes.forEach(route => {
    try {
      router.addRoute(route)
      console.log(`动态路由添加成功: ${route.path}`)
    } catch (error) {
      console.error(`动态路由添加失败: ${route.path}`, error)
    }
  })
}

/**
 * 生成面包屑导航数据
 * @param menuTrees 菜单树数据
 * @param currentPath 当前路径
 * @returns 面包屑数组
 */
export function generateBreadcrumbs(menuTrees: MenuTree[], currentPath: string) {
  const breadcrumbs: Array<{ title: string; path: string }> = []
  
  function findPath(trees: MenuTree[], targetPath: string, currentBreadcrumbs: Array<{ title: string; path: string }>): boolean {
    for (const tree of trees) {
      const newBreadcrumbs = [...currentBreadcrumbs, { title: tree.menu.title, path: tree.menu.path }]
      
      if (tree.menu.path === targetPath) {
        breadcrumbs.push(...newBreadcrumbs)
        return true
      }
      
      if (tree.children && tree.children.length > 0) {
        if (findPath(tree.children, targetPath, newBreadcrumbs)) {
          return true
        }
      }
    }
    return false
  }
  
  findPath(menuTrees, currentPath, [])
  return breadcrumbs
}

/**
 * 根据权限过滤菜单树
 * @param menuTrees 原始菜单树
 * @param userPermissions 用户权限集合
 * @returns 过滤后的菜单树
 */
export function filterMenuTreesByPermission(
  menuTrees: MenuTree[], 
  userPermissions: Set<string>
): MenuTree[] {
  return menuTrees.filter(tree => {
    // 检查当前菜单权限
    if (!userPermissions.has(tree.menu.id.toString())) {
      return false
    }
    
    // 递归过滤子菜单
    if (tree.children && tree.children.length > 0) {
      tree.children = filterMenuTreesByPermission(tree.children, userPermissions)
    }
    
    return true
  })
}
