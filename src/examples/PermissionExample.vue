<template>
  <div class="permission-example">
    <el-card header="动态权限管理系统示例">
      <!-- 权限加载状态 -->
      <div v-if="!isPermissionLoaded" class="loading">
        <el-loading-spinner />
        <span>正在加载权限信息...</span>
      </div>

      <!-- 权限信息已加载 -->
      <div v-else>
        <!-- 用户角色信息 -->
        <el-descriptions title="用户角色信息" :column="2" border>
          <el-descriptions-item label="角色ID">{{ roleInfo?.roleId }}</el-descriptions-item>
          <el-descriptions-item label="角色名称">{{ roleInfo?.roleName }}</el-descriptions-item>
          <el-descriptions-item label="角色描述" :span="2">{{ roleInfo?.roleDesc }}</el-descriptions-item>
        </el-descriptions>

        <el-divider />

        <!-- 当前页面权限 -->
        <h3>当前页面按钮权限</h3>
        <el-space wrap>
          <el-tag 
            v-for="auth in currentRouteAuths" 
            :key="auth.id"
            :type="getAuthTagType(auth.mark)"
          >
            {{ auth.title }} ({{ auth.mark }})
          </el-tag>
        </el-space>

        <el-divider />

        <!-- 权限检查示例 -->
        <h3>权限检查示例</h3>
        <el-space direction="vertical" style="width: 100%">
          <!-- 基础权限检查 -->
          <el-card header="基础权限检查">
            <el-space wrap>
              <!-- 使用 v-auth 指令控制按钮显隐 -->
              <el-button v-auth="'create'" type="primary" icon="Plus">
                新增 (create)
              </el-button>
              <el-button v-auth="'edit'" type="warning" icon="Edit">
                编辑 (edit)
              </el-button>
              <el-button v-auth="'delete'" type="danger" icon="Delete">
                删除 (delete)
              </el-button>
              <el-button v-auth="'view'" type="info" icon="View">
                查看 (view)
              </el-button>
            </el-space>
          </el-card>

          <!-- 特定菜单权限检查 -->
          <el-card header="特定菜单权限检查">
            <el-space wrap>
              <!-- 指定菜单ID的权限检查 -->
              <el-button 
                v-auth="{ auth: 'create', menuId: '1' }" 
                type="primary" 
                icon="Plus"
              >
                仪表盘新增
              </el-button>
              <el-button 
                v-auth="{ auth: 'create', menuId: '2' }" 
                type="primary" 
                icon="Plus"
              >
                企业管理新增
              </el-button>
            </el-space>
          </el-card>

          <!-- 编程式权限检查 -->
          <el-card header="编程式权限检查">
            <el-space wrap>
              <el-button 
                :disabled="!hasAuth('create')"
                type="primary"
                @click="handleCreate"
              >
                编程检查新增权限
              </el-button>
              <el-button 
                :disabled="!hasMenuAuth('1', 'delete')"
                type="danger"
                @click="handleDelete"
              >
                编程检查菜单删除权限
              </el-button>
            </el-space>
          </el-card>
        </el-space>

        <el-divider />

        <!-- 权限调试信息 -->
        <el-collapse>
          <el-collapse-item title="权限调试信息" name="debug">
            <el-descriptions title="权限统计" :column="3" border>
              <el-descriptions-item label="菜单数量">
                {{ permissionStore.flatPermissions.menus.size }}
              </el-descriptions-item>
              <el-descriptions-item label="权限数量">
                {{ permissionStore.flatPermissions.auths.size }}
              </el-descriptions-item>
              <el-descriptions-item label="菜单权限映射">
                {{ permissionStore.flatPermissions.menuAuths.size }}
              </el-descriptions-item>
            </el-descriptions>

            <h4>所有权限标识</h4>
            <el-space wrap>
              <el-tag 
                v-for="auth in Array.from(permissionStore.flatPermissions.auths)" 
                :key="auth"
                size="small"
              >
                {{ auth }}
              </el-tag>
            </el-space>

            <h4>菜单树结构</h4>
            <el-tree 
              :data="treeData" 
              :props="{ children: 'children', label: 'label' }"
              show-checkbox
              node-key="id"
            />
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuth } from '@/composables/useAuth'
import { usePermissionStore } from '@/store/modules/permission'
import type { MenuTree } from '@/types/permission'

// 权限相关组合式函数
const { 
  hasAuth, 
  hasMenuAuth, 
  getCurrentRouteAuths, 
  getRoleInfo, 
  isPermissionLoaded 
} = useAuth()

// 权限Store
const permissionStore = usePermissionStore()

// 计算属性
const roleInfo = computed(() => getRoleInfo())
const currentRouteAuths = computed(() => getCurrentRouteAuths())

// 将菜单树转换为Element Tree组件需要的格式
const treeData = computed(() => {
  const convertMenuTree = (menuTree: MenuTree) => ({
    id: menuTree.menu.id,
    label: `${menuTree.menu.title} (${menuTree.menu.path})`,
    children: [
      // 子菜单
      ...menuTree.children.map(child => convertMenuTree(child)),
      // 按钮权限
      ...menuTree.auths.map(auth => ({
        id: `${menuTree.menu.id}-${auth.id}`,
        label: `🔘 ${auth.title} (${auth.mark})`
      }))
    ]
  })

  return permissionStore.menuTrees.map(menuTree => convertMenuTree(menuTree))
})

// 获取权限标签类型
const getAuthTagType = (authMark: string) => {
  const typeMap: Record<string, string> = {
    'create': 'success',
    'edit': 'warning', 
    'delete': 'danger',
    'view': 'info'
  }
  return typeMap[authMark] || 'primary'
}

// 事件处理
const handleCreate = () => {
  ElMessage.success('执行新增操作')
}

const handleDelete = () => {
  ElMessage.warning('执行删除操作')
}

// 生命周期
onMounted(async () => {
  // 如果权限信息尚未加载，则主动加载
  if (!isPermissionLoaded.value) {
    await permissionStore.fetchUserPermissions()
  }
})
</script>

<style scoped>
.permission-example {
  padding: 20px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
}

.el-card {
  margin-bottom: 20px;
}

.el-divider {
  margin: 20px 0;
}

h3, h4 {
  margin: 16px 0 8px 0;
  color: #303133;
}
</style>
