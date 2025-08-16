<template>
  <div class="under-development">
    <div class="development-container">
      <div class="icon-wrapper">
        <i class="iconsys-tools development-icon"></i>
      </div>
      <h1 class="development-title">功能开发中</h1>
      <p class="development-description">
        该功能正在紧张开发中，敬请期待...
      </p>
      <div class="development-info">
        <div class="info-item">
          <span class="info-label">当前页面：</span>
          <span class="info-value">{{ currentPageTitle }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">访问时间：</span>
          <span class="info-value">{{ currentTime }}</span>
        </div>
      </div>
      <el-button type="primary" @click="goBack">
        <i class="iconsys-arrow-left"></i>
        返回上一页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageInit } from './hooks/usePageInit'
import './index.scss'

const { currentPageTitle, currentTime, goBack } = usePageInit({
  pageTitle: '系统字典管理'
})
// 加载状态
const loading = ref(false)

// 分页信息
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0
})

// 字典项弹框
const itemDialogVisible = ref(false)
const selectedDict = ref<any>(null)
const dictItems = ref([
  {
    id: 1,
    itemLabel: '有限责任公司',
    itemValue: 'limited_company',
    itemCode: 'LIMITED_COMPANY',
    description: '有限责任公司',
    sort: 1,
    status: 1
  },
  {
    id: 2,
    itemLabel: '股份有限公司',
    itemValue: 'stock_company',
    itemCode: 'STOCK_COMPANY',
    description: '股份有限公司',
    sort: 2,
    status: 1
  }
])

// 搜索
const handleSearch = () => {
  console.log('搜索:', searchForm)
  // TODO: 实现搜索逻辑
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    dictName: '',
    dictType: '',
    status: ''
  })
}

// 新增字典
const handleAdd = () => {
  console.log('新增字典')
  // TODO: 实现新增逻辑
}

// 查看字典
const handleView = (row: any) => {
  console.log('查看字典:', row)
  // TODO: 实现查看逻辑
}

// 编辑字典
const handleEdit = (row: any) => {
  console.log('编辑字典:', row)
  // TODO: 实现编辑逻辑
}

// 查看字典项
const handleViewItems = (row: any) => {
  selectedDict.value = row
  itemDialogVisible.value = true
  // TODO: 加载字典项数据
}

// 删除字典
const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除该字典吗？删除后相关字典项也会被删除！', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('删除字典:', row)
    ElMessage.success('删除成功')
    // TODO: 实现删除逻辑
  })
}

// 新增字典项
const handleAddItem = () => {
  console.log('新增字典项')
  // TODO: 实现新增字典项逻辑
}

// 编辑字典项
const handleEditItem = (row: any) => {
  console.log('编辑字典项:', row)
  // TODO: 实现编辑字典项逻辑
}

// 删除字典项
const handleDeleteItem = (row: any) => {
  ElMessageBox.confirm('确认删除该字典项吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('删除字典项:', row)
    ElMessage.success('删除成功')
    // TODO: 实现删除字典项逻辑
  })
}

// 分页大小改变
const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  // TODO: 重新加载数据
}

// 当前页改变
const handleCurrentChange = (page: number) => {
  pagination.current = page
  // TODO: 重新加载数据
}

// 初始化
onMounted(() => {
  // TODO: 加载数据
})
</script>

<style scoped lang="scss">
.dictionary-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;

  .dictionary-header {
    margin-bottom: 20px;
    
    h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 600;
      color: #303133;
    }
    
    p {
      margin: 0;
      color: #909399;
      font-size: 14px;
    }
  }

  .search-section {
    margin-bottom: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 6px;

    .search-form {
      .el-form-item {
        margin-bottom: 16px;
      }
    }
  }

  .table-section {
    .pagination-section {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }

  .dict-items-section {
    .items-toolbar {
      margin-bottom: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
