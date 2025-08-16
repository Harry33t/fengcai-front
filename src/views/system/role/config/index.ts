// 角色管理配置

// 角色状态选项
export const roleStatusOptions = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
]

// 性别选项
export const genderOptions = [
  { label: '男', value: '1' },
  { label: '女', value: '2' }
]

// 角色选项（临时数据，实际应该从API获取）
export const roleOptions = [
  { label: '超级管理员', value: '1' },
  { label: '管理员', value: '2' },
  { label: '普通用户', value: '3' }
]

// 表格列配置
export const roleTableColumns = [
  { prop: 'id', label: 'ID', width: 80, align: 'center' },
  { prop: 'name', label: '角色名称', minWidth: 150 },
  { prop: 'desc', label: '角色描述', minWidth: 200 },
  { prop: 'status', label: '状态', width: 100, align: 'center' },
  { prop: 'createdAt', label: '创建时间', width: 180, align: 'center' },
  { prop: 'updatedAt', label: '更新时间', width: 180, align: 'center' },
  { label: '操作', width: 200, fixed: 'right', align: 'center' }
]

// 分页配置
export const paginationConfig = {
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper'
}

// 对话框配置
export const dialogConfig = {
  width: '600px',
  title: {
    add: '新增角色',
    edit: '编辑角色'
  },
  confirmText: '确定',
  cancelText: '取消'
}

// 权限对话框配置
export const permissionDialogConfig = {
  width: '800px',
  title: '分配权限',
  height: '60vh'
}

// 操作按钮配置
export const actionButtonConfig = {
  // 是否显示编辑按钮
  showEditButton: () => true,
  
  // 是否显示删除按钮
  showDeleteButton: () => true,
  
  // 是否显示权限管理按钮
  showPermissionButton: () => true,
  
  // 删除确认提示
  deleteConfirmTitle: '删除确认',
  deleteConfirmContent: (roleName: string) => `确定要删除角色"${roleName}"吗？`,
  
  // 按钮文本
  buttonText: {
    add: '新增角色',
    edit: '编辑',
    delete: '删除',
    permission: '权限管理',
    save: '保存',
    cancel: '取消'
  }
}

// 默认表单数据
export const defaultRoleForm = {
  name: '',
  desc: '',
  status: 1
}

// 树形权限配置
export const treeConfig = {
  nodeKey: 'id',
  props: {
    children: 'children',
    label: 'label'
  },
  defaultExpandAll: true,
  showCheckbox: true
}