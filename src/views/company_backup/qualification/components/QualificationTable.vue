<template>
  <div class="qualification-table-container">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-form :model="searchForm" :inline="true" class="search-form">
        <el-form-item label="企业名称">
          <el-input v-model="searchForm.companyName" placeholder="请输入企业名称" clearable />
        </el-form-item>
        <el-form-item label="资质等级">
          <el-select v-model="searchForm.qualificationLevel" placeholder="请选择等级" clearable>
            <el-option label="特级" value="special" />
            <el-option label="一级" value="first" />
            <el-option label="二级" value="second" />
            <el-option label="三级" value="third" />
          </el-select>
        </el-form-item>
        <el-form-item label="证书状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
            <el-option label="有效" value="1" />
            <el-option label="过期" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
          <el-button v-auth="'qualification:create'" type="success" @click="handleAdd">新增资质</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div class="table-section">
      <el-table :data="data" v-loading="loading" border stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="companyName" label="企业名称" min-width="180" />
        <el-table-column prop="qualificationType" label="资质类型" min-width="160" />
        <el-table-column prop="qualificationLevel" label="资质等级" width="100" />
        <el-table-column prop="certificateNumber" label="证书编号" width="140" />
        <el-table-column prop="validityPeriod" label="证书有效期" width="120" />
        <el-table-column prop="issuingAuthority" label="发证机关" min-width="140" />
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '有效' : '过期' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button v-auth="'qualification:view'" type="primary" size="small" @click="handleView(row)">查看</el-button>
            <el-button v-auth="'qualification:edit'" type="warning" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button v-auth="'qualification:delete'" type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits } from 'vue'

// Props
defineProps<{
  data: any[]
  loading: boolean
}>()

// Emits
const emit = defineEmits<{
  search: [searchParams: any]
  add: []
  edit: [row: any]
  delete: [row: any]
}>()

// 搜索表单
const searchForm = reactive({
  companyName: '',
  qualificationLevel: '',
  status: ''
})

// 搜索
const handleSearch = () => {
  emit('search', { ...searchForm })
}

// 重置
const handleReset = () => {
  Object.assign(searchForm, {
    companyName: '',
    qualificationLevel: '',
    status: ''
  })
}

// 新增
const handleAdd = () => {
  emit('add')
}

// 查看
const handleView = (row: any) => {
  console.log('查看资质:', row)
}

// 编辑
const handleEdit = (row: any) => {
  emit('edit', row)
}

// 删除
const handleDelete = (row: any) => {
  emit('delete', row)
}
</script>

<style scoped lang="scss">
.qualification-table-container {
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
    // 表格样式
  }
}
</style>
