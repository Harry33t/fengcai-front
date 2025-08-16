<template>
  <div class="dynamic-route-example">
    <h2>动态路由加载示例</h2>
    
    <div class="section">
      <h3>1. 用户权限信息</h3>
      <pre>{{ JSON.stringify(userInfo, null, 2) }}</pre>
    </div>
    
    <div class="section">
      <h3>2. 生成的动态路由</h3>
      <div v-for="route in dynamicRoutes" :key="route.path" class="route-item">
        <strong>{{ route.path }}</strong> - {{ route.meta?.title }}
        <div v-if="route.children" class="children">
          <div v-for="child in route.children" :key="child.path" class="child-route">
            └── {{ child.path }} - {{ child.meta?.title }}
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3>3. 权限检查示例</h3>
      <div class="permission-checks">
        <div>
          <label>菜单权限检查 (company:view):</label>
          <span :class="{ 'has-permission': hasCompanyView, 'no-permission': !hasCompanyView }">
            {{ hasCompanyView ? '有权限' : '无权限' }}
          </span>
        </div>
        <div>
          <label>按钮权限检查 (company:create):</label>
          <span :class="{ 'has-permission': hasCompanyCreate, 'no-permission': !hasCompanyCreate }">
            {{ hasCompanyCreate ? '有权限' : '无权限' }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3>4. 操作按钮</h3>
      <div class="actions">
        <button @click="loadDynamicRoutes" class="btn-primary">加载动态路由</button>
        <button @click="refreshPermissions" class="btn-secondary">刷新权限</button>
        <button @click="testNavigation" class="btn-info">测试导航</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'
import { convertMenuTreesToRoutes, addDynamicRoutes } from '@/router/utils/dynamicRouteLoader'

const router = useRouter()
const permissionStore = usePermissionStore()

// 模拟后端返回的用户信息数据
const userInfo = ref({
  "code": 0,
  "message": "",
  "data": {
    "id": 1,
    "username": "admin",
    "name": "超级管理员",
    "phone": "13800000000",
    "gender": 1,
    "status": 1,
    "createdTime": 1755188648,
    "updatedTime": 1755188648,
    "roleId": 1,
    "roleName": "超级管理员",
    "roleDesc": "拥有系统所有权限",
    "menuTrees": [
      {
        "menu": {
          "id": 4,
          "path": "/company",
          "name": "Company",
          "component": "/index/index",
          "title": "企业管理",
          "icon": "&#xe661;",
          "showBadge": 2,
          "isHide": 2,
          "isHideTab": 2,
          "isIframe": 2,
          "keepAlive": 1,
          "isFirstLevel": 1,
          "status": 1,
          "level": 1,
          "sort": 80
        },
        "children": [
          {
            "menu": {
              "id": 5,
              "path": "list",
              "name": "CompanyList",
              "component": "/company/list/index",
              "title": "企业列表",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 4,
              "sort": 99
            },
            "auths": [
              {
                "id": "3",
                "menuId": "5",
                "mark": "company:view",
                "title": "查看企业"
              },
              {
                "id": "4",
                "menuId": "5",
                "mark": "company:create",
                "title": "新增企业"
              }
            ],
            "children": []
          }
        ],
        "auths": []
      }
    ]
  }
})

// 动态路由
const dynamicRoutes = ref([])

// 权限检查
const hasCompanyView = computed(() => 
  permissionStore.hasAuthPermission('company:view', 5)
)

const hasCompanyCreate = computed(() => 
  permissionStore.hasAuthPermission('company:create', 5)
)

/**
 * 加载动态路由
 */
const loadDynamicRoutes = async () => {
  try {
    // 1. 设置用户权限信息到 store
    permissionStore.userPermissionInfo = userInfo.value.data
    permissionStore.menuTrees = userInfo.value.data.menuTrees
    
    // 2. 生成扁平化权限
    permissionStore.generateFlatPermissions()
    
    // 3. 生成动态路由
    permissionStore.generateDynamicRoutes()
    
    // 4. 转换为 Vue Router 格式并添加到路由器
    const routes = convertMenuTreesToRoutes(userInfo.value.data.menuTrees)
    dynamicRoutes.value = routes
    
    // 5. 添加到 Vue Router
    addDynamicRoutes(router, userInfo.value.data.menuTrees)
    
    console.log('动态路由加载完成:', routes)
    alert('动态路由加载成功！')
  } catch (error) {
    console.error('动态路由加载失败:', error)
    alert('动态路由加载失败，请查看控制台')
  }
}

/**
 * 刷新权限
 */
const refreshPermissions = async () => {
  try {
    await permissionStore.refreshPermissions()
    alert('权限刷新成功！')
  } catch (error) {
    console.error('权限刷新失败:', error)
    alert('权限刷新失败，请查看控制台')
  }
}

/**
 * 测试导航
 */
const testNavigation = () => {
  try {
    router.push('/company/list')
    alert('导航到企业列表页面')
  } catch (error) {
    console.error('导航失败:', error)
    alert('导航失败，请先加载动态路由')
  }
}

onMounted(() => {
  console.log('动态路由示例组件已挂载')
})
</script>

<style scoped>
.dynamic-route-example {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
}

.section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

pre {
  background: #f4f4f4;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.route-item {
  margin-bottom: 15px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border-left: 4px solid #007bff;
}

.children {
  margin-top: 10px;
  margin-left: 20px;
}

.child-route {
  padding: 5px 0;
  color: #666;
  font-size: 14px;
}

.permission-checks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.permission-checks > div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.permission-checks label {
  min-width: 200px;
  font-weight: bold;
}

.has-permission {
  color: #28a745;
  font-weight: bold;
}

.no-permission {
  color: #dc3545;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #117a8b;
}
</style>
