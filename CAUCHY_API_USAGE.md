# Cauchy API 使用指南

基于 vue3-ts-cms13 架构设计，重构后的网络接口使用说明。

## 目录结构

```
src/service/
├── request/           # 请求封装
│   ├── config.ts     # 配置文件
│   ├── index.ts      # 请求类
│   └── type.ts       # 类型定义
├── login/            # 登录相关 API
│   ├── login.ts      # 登录接口
│   └── type.ts       # 登录类型
├── main/             # 主要业务 API
│   ├── main.ts       # 业务接口
│   └── type.ts       # 业务类型
├── index.ts          # 服务入口
├── types.ts          # 通用类型
└── api.ts            # API 统一导出
```

## 基本配置

### 1. API 基础地址
- 开发环境: `https://cauchy.tsukikage7.com/api/v1`
- 生产环境: `https://cauchy.tsukikage7.com/api/v1`

### 2. 认证方式
- JWT Bearer Token
- 自动从 localStorage 获取 token
- 自动添加 `Bearer` 前缀

## 使用方法

### 1. 登录相关

```typescript
import { accountLoginRequest, requestUserInfo } from '@/service/api'

// 用户登录
const loginResult = await accountLoginRequest({
  username: 'admin',
  password: '123456'
})

// 获取用户信息
const userInfo = await requestUserInfo()
```

### 2. 企业管理

```typescript
import { 
  getEnterpriseListRequest, 
  createEnterpriseRequest,
  updateEnterpriseRequest 
} from '@/service/api'

// 获取企业列表
const enterpriseList = await getEnterpriseListRequest({
  page: 1,
  pageSize: 10,
  name: '企业名称'
})

// 创建企业
const newEnterprise = await createEnterpriseRequest({
  name: '新企业',
  type: '建筑业',
  contact_person: '联系人',
  contact_phone: '13800138000'
})
```

### 3. 用户管理

```typescript
import { 
  getUserListRequest, 
  createUserRequest,
  updateUserRequest 
} from '@/service/api'

// 获取用户列表
const userList = await getUserListRequest({
  page: 1,
  pageSize: 10
})

// 创建用户
const newUser = await createUserRequest({
  username: 'newuser',
  password: '123456',
  email: 'user@example.com'
})
```

## 响应格式

所有 API 响应都遵循统一格式：

```typescript
interface IDataType<T = any> {
  code: number      // 状态码，200 表示成功
  data: T          // 响应数据
  message?: string // 响应消息
}
```

## 错误处理

- 网络错误自动重试
- 401 错误自动跳转登录
- 统一的 Loading 提示
- 统一的错误消息提示

## 迁移说明

### 旧版本调用方式
```typescript
// 旧版本 - 不推荐
import { getUserList } from '@/api/usersApi'
```

### 新版本调用方式
```typescript
// 新版本 - 推荐
import { getUserListRequest } from '@/service/api'
```

## 注意事项

1. 所有 API 函数名以 `Request` 结尾
2. 所有类型定义以 `I` 开头
3. 使用 TypeScript 严格类型检查
4. 自动处理 Loading 状态
5. 支持请求拦截和响应拦截
