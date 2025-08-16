/**
 * 角色权限管理 Composable
 * 职责：角色权限的分配和管理
 */
import { ref, computed } from 'vue'
import { RoleService } from '@/services/roleService'
import type { IRole, IRolePermissionResponse, IMenuTreeNode } from '@/service/role/type'

export function useRolePermission() {
  // 权限对话框状态
  const permissionDialogVisible = ref(false)
  const currentRole = ref<IRole | null>(null)
  const loading = ref(false)

  // 权限数据
  const menuTrees = ref<IMenuTreeNode[]>([])
  
  // 树形控件状态
  const isExpandAll = ref(true)
  const isSelectAll = ref(false)
  const treeRef = ref()

  // 选中的权限ID
  const selectedMenuIds = ref<string[]>([])
  const selectedAuthIds = ref<string[]>([])

  // 打开权限管理对话框
  const openPermissionDialog = async (role: IRole) => {
    currentRole.value = role
    permissionDialogVisible.value = true
    await fetchRolePermissions(role.id)
  }

  // 关闭权限管理对话框
  const closePermissionDialog = () => {
    permissionDialogVisible.value = false
    currentRole.value = null
    menuTrees.value = []
    selectedMenuIds.value = []
    selectedAuthIds.value = []
  }

  // 获取角色权限
  const fetchRolePermissions = async (roleId: number) => {
    loading.value = true
    try {
      const result = await RoleService.getRolePermissions({ roleId: String(roleId) })
      
      if (result && result.menuTrees && Array.isArray(result.menuTrees)) {
        menuTrees.value = result.menuTrees
        
        // 提取已选中的菜单和权限ID
        const { menuIds, authIds } = extractSelectedIds(result.menuTrees)
        selectedMenuIds.value = menuIds
        selectedAuthIds.value = authIds
        
        console.log('获取角色权限成功:', {
          menuTrees: menuTrees.value,
          selectedMenuIds: selectedMenuIds.value,
          selectedAuthIds: selectedAuthIds.value
        })
      } else {
        console.warn('获取到的权限数据格式不正确:', result)
        menuTrees.value = []
        selectedMenuIds.value = []
        selectedAuthIds.value = []
      }
    } catch (error) {
      console.error('获取角色权限失败:', error)
      menuTrees.value = []
      selectedMenuIds.value = []
      selectedAuthIds.value = []
    } finally {
      loading.value = false
    }
  }

  // 提取已选中的权限ID
  const extractSelectedIds = (trees: IMenuTreeNode[]): { menuIds: string[], authIds: string[] } => {
    const menuIds: string[] = []
    const authIds: string[] = []
    
    if (!trees || !Array.isArray(trees)) {
      return { menuIds, authIds }
    }
    
    const traverse = (nodes: IMenuTreeNode[]) => {
      if (!nodes || !Array.isArray(nodes)) return
      
      nodes.forEach(node => {
        if (!node || !node.menu) return
        
        // 如果菜单有权限，添加到menuIds
        if (node.hasPermission) {
          menuIds.push(String(node.menu.id || ''))
        }
        
        // 处理按钮权限
        if (node.auths && Array.isArray(node.auths)) {
          node.auths.forEach(authItem => {
            if (authItem && authItem.auth && authItem.auth.id) {
              authIds.push(String(authItem.auth.id))
            }
          })
        }
        
        // 递归处理子节点
        if (node.children && Array.isArray(node.children)) {
          traverse(node.children)
        }
      })
    }
    
    traverse(trees)
    return { menuIds, authIds }
  }

  // 保存角色权限
  const saveRolePermissions = async () => {
    if (!currentRole.value) return false

    try {
      loading.value = true
      
      // 获取树形控件选中的节点
      const checkedNodes = treeRef.value?.getCheckedNodes() || []
      const halfCheckedNodes = treeRef.value?.getHalfCheckedNodes() || []
      
      // 分离菜单权限和按钮权限
      const menuIds: string[] = []
      const authIds: string[] = []
      
      // 处理完全选中的节点
      checkedNodes.forEach((node: any) => {
        if (!node || !node.id) return
        
        if (node.isAuth) {
          // 按钮权限
          authIds.push(String(node.id))
        } else if (node.isMenu) {
          // 菜单权限
          menuIds.push(String(node.id))
        }
      })
      
      // 处理半选中的节点（通常是父级菜单）
      halfCheckedNodes.forEach((node: any) => {
        if (!node || !node.id) return
        
        if (node.isMenu && !node.isAuth) {
          menuIds.push(String(node.id))
        }
      })

      console.log('保存角色权限:', {
        roleId: currentRole.value.id,
        menuIds,
        authIds
      })

      const success = await RoleService.updateRolePermissions({
        roleId: String(currentRole.value.id),
        menuIds,
        authIds
      })

      if (success) {
        closePermissionDialog()
        return true
      }
      return false
    } catch (error) {
      console.error('保存角色权限失败:', error)
      return false
    } finally {
      loading.value = false
    }
  }

  // 切换全部展开/收起
  const toggleExpandAll = () => {
    if (!treeRef.value) return

    const nodes = treeRef.value.store.nodesMap
    for (const node in nodes) {
      nodes[node].expanded = !isExpandAll.value
    }
    isExpandAll.value = !isExpandAll.value
  }

  // 切换全选/取消全选
  const toggleSelectAll = () => {
    if (!treeRef.value) return

    if (!isSelectAll.value) {
      // 全选：获取所有节点的key
      const allKeys = getAllNodeKeys(permissionTreeData.value)
      treeRef.value.setCheckedKeys(allKeys)
    } else {
      // 取消全选
      treeRef.value.setCheckedKeys([])
    }
    isSelectAll.value = !isSelectAll.value
  }

  // 获取所有节点的key
  const getAllNodeKeys = (nodes: any[]): string[] => {
    const keys: string[] = []
    const traverse = (nodeList: any[]) => {
      nodeList.forEach((node) => {
        keys.push(String(node.id))
        if (node.children && node.children.length > 0) {
          traverse(node.children)
        }
      })
    }
    traverse(nodes)
    return keys
  }

  // 处理树形控件选中变化
  const handleTreeCheck = () => {
    if (!treeRef.value) return

    const checkedKeys = treeRef.value.getCheckedKeys()
    const allKeys = getAllNodeKeys(permissionTreeData.value)

    // 判断是否全选
    isSelectAll.value = checkedKeys.length === allKeys.length && allKeys.length > 0
  }

  // 转换为树形控件需要的数据格式
  const permissionTreeData = computed(() => {
    try {
      return convertToTreeData(menuTrees.value || [])
    } catch (error) {
      console.error('转换权限树数据失败:', error)
      return []
    }
  })

  // 将API数据转换为树形控件数据
  const convertToTreeData = (trees: IMenuTreeNode[]): any[] => {
    if (!trees || !Array.isArray(trees)) {
      return []
    }
    
    return trees.map(node => {
      // 安全检查
      if (!node || !node.menu) {
        return null
      }
      
      const treeNode: any = {
        id: String(node.menu.id || ''),
        label: node.menu.title || '未命名菜单',
        isMenu: true,
        children: []
      }
      
      // 添加子菜单
      if (node.children && Array.isArray(node.children)) {
        node.children.forEach(child => {
          if (!child || !child.menu) return
          
          const childNode: any = {
            id: String(child.menu.id || ''),
            label: child.menu.title || '未命名子菜单',
            isMenu: true,
            children: []
          }
          
          // 添加按钮权限
          if (child.auths && Array.isArray(child.auths)) {
            child.auths.forEach(authItem => {
              if (!authItem || !authItem.auth) return
              
              childNode.children.push({
                id: String(authItem.auth.id || ''),
                label: `${authItem.auth.title || '未命名权限'} (${authItem.auth.mark || ''})`,
                isAuth: true,
                menuId: authItem.auth.menuId || 0
              })
            })
          }
          
          treeNode.children.push(childNode)
        })
      }
      
      // 添加一级菜单的按钮权限
      if (node.auths && Array.isArray(node.auths)) {
        node.auths.forEach(authItem => {
          if (!authItem || !authItem.auth) return
          
          treeNode.children.push({
            id: String(authItem.auth.id || ''),
            label: `${authItem.auth.title || '未命名权限'} (${authItem.auth.mark || ''})`,
            isAuth: true,
            menuId: authItem.auth.menuId || 0
          })
        })
      }
      
      return treeNode
    }).filter(Boolean) // 过滤掉null值
  }

  return {
    // 状态
    permissionDialogVisible,
    currentRole,
    loading,
    menuTrees,
    permissionTreeData,
    isExpandAll,
    isSelectAll,
    treeRef,
    selectedMenuIds,
    selectedAuthIds,
    
    // 方法
    openPermissionDialog,
    closePermissionDialog,
    fetchRolePermissions,
    saveRolePermissions,
    toggleExpandAll,
    toggleSelectAll,
    handleTreeCheck
  }
}