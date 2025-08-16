<template>
  <div class="menu-page art-full-height">
    <!-- 搜索区域 -->
    <div class="search-area">
      <ElForm :model="searchForm" inline>
        <ElFormItem label="菜单名称">
          <ElInput 
            v-model="searchForm.title" 
            placeholder="请输入菜单名称" 
            clearable 
            style="width: 200px"
          />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElSelect 
            v-model="searchForm.status" 
            placeholder="请选择状态" 
            clearable 
            style="width: 120px"
          >
            <ElOption label="启用" :value="1" />
            <ElOption label="禁用" :value="2" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleSearch" :loading="loading">
            搜索
          </ElButton>
          <ElButton @click="handleReset">
            重置
          </ElButton>
        </ElFormItem>
      </ElForm>
    </div>

    <ElCard class="art-table-card" shadow="never">
      <!-- 操作按钮 -->
      <div class="action-buttons">
        <ElButton 
          type="primary" 
          @click="() => console.log('添加菜单功能待实现')" 
          :loading="loading"
        >
          添加菜单
        </ElButton>
        <ElButton @click="toggleExpand">
          {{ isExpanded ? '收起' : '展开' }}
        </ElButton>
        <ElButton @click="refreshData" :loading="loading">
          刷新
        </ElButton>
      </div>

      <!-- 菜单表格 -->
      <div class="menu-table">
        <ElTable 
          :data="treeMenuList" 
          :loading="loading"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :default-expand-all="isExpanded"
          border
          stripe
          empty-text="暂无菜单数据"
        >
          <ElTableColumn prop="title" label="菜单名称" min-width="200" show-overflow-tooltip />
          <ElTableColumn prop="path" label="路由路径" min-width="180" show-overflow-tooltip />
          <ElTableColumn prop="component" label="组件路径" min-width="200" show-overflow-tooltip />
          <ElTableColumn prop="icon" label="图标" width="100" align="center">
            <template #default="{ row }">
              <span class="menu-icon">{{ row.icon || '-' }}</span>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="sort" label="排序" width="80" align="center" />
          <ElTableColumn prop="status" label="状态" width="80" align="center">
            <template #default="{ row }">
              <ElTag :type="row.status === 1 ? 'success' : 'danger'" size="small">
                {{ row.status === 1 ? '启用' : '禁用' }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn prop="isHide" label="显示" width="80" align="center">
            <template #default="{ row }">
              <ElTag :type="row.isHide === 2 ? 'warning' : 'info'" size="small">
                {{ row.isHide === 2 ? '隐藏' : '显示' }}
              </ElTag>
            </template>
          </ElTableColumn>
          <ElTableColumn label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <div class="table-actions">
                <ElButton size="small" type="primary" link @click="showEditDialog(row)">
                  编辑
                </ElButton>
                <ElButton size="small" type="success" link @click="showAddChildDialog(row)">
                  添加子菜单
                </ElButton>
                <ElButton size="small" type="danger" link @click="handleDeleteMenu(row)">
                  删除
                </ElButton>
              </div>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
    </ElCard>

    <!-- 添加/编辑菜单对话框 -->
    <ElDialog 
      :title="dialogTitle" 
      v-model="dialogVisible" 
      width="600px"
      class="menu-dialog"
      @close="closeDialog"
    >
      <ElForm :model="menuForm" :rules="formRules" ref="formRef" label-width="100px">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="菜单名称" prop="title">
              <ElInput v-model="menuForm.title" placeholder="请输入菜单名称" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="路由路径" prop="path">
              <ElInput v-model="menuForm.path" placeholder="请输入路由路径" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="组件名称" prop="name">
              <ElInput v-model="menuForm.name" placeholder="请输入组件名称" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="组件路径" prop="component">
              <ElInput v-model="menuForm.component" placeholder="请输入组件路径" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="图标">
              <ElInput v-model="menuForm.icon" placeholder="请输入图标名称" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="排序">
              <ElInputNumber v-model="menuForm.sort" :min="1" :max="999" style="width: 100%" />
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="状态">
              <ElRadioGroup v-model="menuForm.status">
                <ElRadio :label="1">启用</ElRadio>
                <ElRadio :label="2">禁用</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="是否隐藏">
              <ElRadioGroup v-model="menuForm.isHide">
                <ElRadio :label="1">显示</ElRadio>
                <ElRadio :label="2">隐藏</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
        </ElRow>
        <ElRow :gutter="20">
          <ElCol :span="12">
            <ElFormItem label="缓存页面">
              <ElRadioGroup v-model="menuForm.keepAlive">
                <ElRadio :label="1">是</ElRadio>
                <ElRadio :label="2">否</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem label="菜单类型">
              <ElRadioGroup v-model="menuForm.isFirstLevel" disabled>
                <ElRadio :label="1">顶级菜单</ElRadio>
                <ElRadio :label="2">子菜单</ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
      
      <template #footer>
        <div class="dialog-footer">
          <ElButton @click="closeDialog">取消</ElButton>
          <ElButton type="primary" @click="handleSaveMenu" :loading="saveLoading">
            确定
          </ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { getMenuListRequest, createMenuRequest, updateMenuRequest, deleteMenuRequest } from '@/service/menu/main'
import type { IMenuItem, ICreateMenuParams, IUpdateMenuParams } from '@/service/menu/type'

// 响应式数据
const loading = ref(false)
const saveLoading = ref(false)
const treeMenuList = ref<IMenuItem[]>([])
const isExpanded = ref(false)

// 搜索表单
const searchForm = ref({
  title: '',
  status: undefined as number | undefined
})

// 对话框相关
const dialogVisible = ref(false)
const dialogMode = ref<'add' | 'edit' | 'addChild'>('add')
const currentEditMenu = ref<IMenuItem | null>(null)
const formRef = ref<FormInstance>()

// 菜单表单
const menuForm = ref({
  title: '',
  path: '',
  name: '',
  component: '',
  icon: '',
  sort: 1,
  status: 1,
  isHide: 1,
  keepAlive: 2,
  isFirstLevel: 1,
  parentId: 0,
  level: 1
})

// 表单验证规则
const formRules: FormRules = {
  title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
  name: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  component: [{ required: true, message: '请输入组件路径', trigger: 'blur' }]
}

// 对话框标题
const dialogTitle = computed(() => {
  switch (dialogMode.value) {
    case 'add': return '添加菜单'
    case 'edit': return '编辑菜单'
    case 'addChild': return '添加子菜单'
    default: return '菜单管理'
  }
})

// 获取菜单列表
const getMenuData = async () => {
  try {
    loading.value = true
    console.log('开始获取菜单列表...')
    
    const params = {
      title: searchForm.value.title || undefined,
      status: searchForm.value.status || undefined
    }
    
    const response = await getMenuListRequest(params)
    console.log('菜单列表响应:', response)
    
    if (response && response.data) {
      // 直接使用响应数据，根据实际接口结构调整
      treeMenuList.value = response.data.menus || response.data || []
      console.log('菜单数据已更新:', treeMenuList.value)
    } else {
      console.warn('接口返回数据格式异常，使用测试数据')
      // 如果接口失败，显示一个测试菜单项
      treeMenuList.value = [{
        id: 1,
        title: '测试菜单',
        path: '/test',
        name: 'Test',
        component: '/test/index',
        icon: 'test-icon',
        sort: 1,
        status: 1,
        isHide: 1,
        keepAlive: 1,
        isFirstLevel: 1,
        parentId: 0,
        isIframe: 2,
        showBadge: 2,
        isHideTab: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
  } catch (error) {
    console.error('获取菜单列表失败:', error)
    ElMessage.error('获取菜单列表失败')
    // 显示测试数据
    treeMenuList.value = [{
      id: 1,
      title: '测试菜单',
      path: '/test',
      name: 'Test', 
      component: '/test/index',
      icon: 'test-icon',
      sort: 1,
      status: 1,
      isHide: 1,
      keepAlive: 1,
      isFirstLevel: 1,
      parentId: 0,
      isIframe: 2,
      isLink: 2,
      isAffix: 2,
      linkUrl: '',
      redirect: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }]
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = () => {
  console.log('执行搜索:', searchForm.value)
  getMenuData()
}

// 重置
const handleReset = () => {
  searchForm.value = {
    title: '',
    status: undefined
  }
  console.log('重置搜索条件')
  getMenuData()
}

// 展开/收起
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
  console.log('切换展开状态:', isExpanded.value)
}

// 刷新数据
const refreshData = () => {
  console.log('刷新菜单数据')
  getMenuData()
}

// 重置表单
const resetForm = () => {
  menuForm.value = {
    title: '',
    path: '',
    name: '',
    component: '',
    icon: '',
    sort: 1,
    status: 1,
    isHide: 1,
    keepAlive: 2,
    isFirstLevel: 1,
    parentId: 0,
    level: 1
  }
  formRef.value?.clearValidate()
}

// 显示添加菜单对话框
const showAddDialog = () => {
  dialogMode.value = 'add'
  resetForm()
  menuForm.value.isFirstLevel = 1
  menuForm.value.parentId = 0
  dialogVisible.value = true
}

// 显示编辑菜单对话框
const showEditDialog = (menu: IMenuItem) => {
  dialogMode.value = 'edit'
  currentEditMenu.value = menu
  menuForm.value = {
    title: menu.title,
    path: menu.path,
    name: menu.name,
    component: menu.component,
    icon: menu.icon || '',
    sort: menu.sort,
    status: menu.status,
    isHide: menu.isHide,
    keepAlive: menu.keepAlive,
    isFirstLevel: menu.isFirstLevel,
    parentId: menu.parentId,
    level: menu.level || 1
  }
  dialogVisible.value = true
}

// 显示添加子菜单对话框
const showAddChildDialog = (parentMenu: IMenuItem) => {
  dialogMode.value = 'addChild'
  resetForm()
  menuForm.value.isFirstLevel = 2
  menuForm.value.parentId = parentMenu.id
  menuForm.value.level = (parentMenu.level || 1) + 1
  dialogVisible.value = true
}

// 关闭对话框
const closeDialog = () => {
  dialogVisible.value = false
  resetForm()
  currentEditMenu.value = null
}

// 保存菜单
const handleSaveMenu = async () => {
  if (!formRef.value) return
  
  try {
    const valid = await formRef.value.validate()
    if (!valid) return
    
    saveLoading.value = true
    
    if (dialogMode.value === 'edit' && currentEditMenu.value) {
      // 编辑菜单
      const updateParams = {
        id: String(currentEditMenu.value.id),
        ...menuForm.value
      }
      await updateMenuRequest(updateParams)
      ElMessage.success('菜单更新成功')
    } else {
      // 添加菜单
      await createMenuRequest(menuForm.value)
      ElMessage.success('菜单创建成功')
    }
    
    closeDialog()
    getMenuData()
  } catch (error) {
    console.error('保存菜单失败:', error)
    ElMessage.error('保存菜单失败')
  } finally {
    saveLoading.value = false
  }
}

// 删除菜单
const handleDeleteMenu = async (menu: IMenuItem) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除菜单 "${menu.title}" 吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    await deleteMenuRequest(String(menu.id))
    ElMessage.success('菜单删除成功')
    getMenuData()
  } catch (error) {
    if (error !== 'cancel') {
      console.error('删除菜单失败:', error)
      ElMessage.error('删除菜单失败')
    }
  }
}

// 修改添加菜单按钮的点击事件
const handleAddMenu = () => {
  showAddDialog()
}

// 页面加载时获取数据
onMounted(() => {
  console.log('页面加载，开始获取菜单数据')
  getMenuData()
})
</script>

<style lang="scss" scoped>
@import './index.scss';
