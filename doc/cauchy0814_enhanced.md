

# FMS API 文档 (完善版)

基于 cauchy0814.md 和 openapi.yaml 整合的完整API文档

# Authentication

<!-- 添加认证说明 -->

- HTTP Authentication, scheme: bearer 
    - Parameter Name: **Authorization**, in: header. 

# 用户

<a id="opIdUserService_Login"></a>

## POST 用户登录

POST /user/login

用户登录

> Body 请求参数

```json
{
  "username": "admin",
  "password": "123456"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object|是|登录信息|
|» username|body|string|是|用户名|
|» password|body|string|是|密码|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "登录成功",
  "data": {
    "id": "1",
    "username": "admin",
    "name": "管理员",
    "phone": "13800138000",
    "gender": "male",
    "status": "active",
    "roleId": "1",
    "manageId": "0",
    "createdTime": "2024-01-01T00:00:00Z",
    "updatedTime": "2024-01-01T00:00:00Z"
  }
}
```

### 响应头

|名称|类型|说明|
|---|---|---|
|Access-Token|string|JWT访问令牌，用于后续API调用的身份验证|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|登录成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none|状态码|0表示成功|
|» message|string|true|none|消息|响应消息|
|» data|object|true|none|数据|用户信息|
|»» id|string|true|none|用户ID|用户唯一标识|
|»» username|string|true|none|用户名|登录用户名|
|»» name|string|true|none|姓名|用户真实姓名|
|»» phone|string|true|none|手机号|用户手机号码|
|»» gender|string|true|none|性别|male/female|
|»» status|string|true|none|状态|active/inactive|
|»» roleId|string|true|none|角色ID|用户角色标识|
|»» manageId|string|true|none|管理者ID|上级管理者ID|
|»» createdTime|string|true|none|创建时间|ISO 8601格式|
|»» updatedTime|string|true|none|更新时间|ISO 8601格式|

## GET 获取用户信息

GET /user/info

获取当前登录用户的详细信息及权限菜单

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "username": "admin",
    "name": "管理员",
    "phone": "13800138000",
    "gender": "male",
    "status": "active",
    "createdTime": "2024-01-01T00:00:00Z",
    "updatedTime": "2024-01-01T00:00:00Z",
    "roleId": "1",
    "roleName": "系统管理员",
    "roleDesc": "拥有系统所有权限",
    "manager": {
      "id": "0",
      "username": "root",
      "name": "超级管理员"
    },
    "subordinates": [
      {
        "id": "2",
        "username": "user1",
        "name": "普通用户1"
      }
    ],
    "menuTrees": [
      {
        "menu": {
          "id": "1",
          "path": "/dashboard",
          "name": "Dashboard",
          "component": "Dashboard",
          "title": "仪表盘",
          "icon": "dashboard",
          "level": "1",
          "parentId": "0"
        },
        "children": [],
        "auths": [
          {
            "id": "1",
            "menuId": "1",
            "mark": "view",
            "title": "查看"
          }
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

## POST 用户登出

POST /user/logout

用户登出

> Body 请求参数

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object|是|登出信息|
|» accessToken|body|string|是|访问令牌|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "登出成功",
  "data": {
    "message": "用户已成功登出"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|登出成功|Inline|

## POST 刷新token

POST /user/refresh

刷新token

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "刷新成功",
  "data": {}
}
```

### 响应头

|名称|类型|说明|
|---|---|---|
|Access-Token|string|新的JWT访问令牌|

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|刷新成功|Inline|

# 菜单

## GET 获取菜单详情

GET /menu

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string|否|菜单ID|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "menus": [
      {
        "id": 1,
        "path": "/dashboard",
        "name": "Dashboard",
        "component": "Dashboard",
        "title": "仪表盘",
        "icon": "dashboard",
        "show_badge": 0,
        "is_hide": 0,
        "is_hide_tab": 0,
        "is_iframe": 0,
        "keep_alive": 1,
        "is_first_level": 1,
        "status": 1,
        "level": 1,
        "sort": 1,
        "created_at": 1640995200,
        "updated_at": 1640995200,
        "parent_id": 0
      },
      {
        "id": 2,
        "path": "/enterprise",
        "name": "Enterprise",
        "component": "Enterprise",
        "title": "企业管理",
        "icon": "enterprise",
        "show_badge": 0,
        "is_hide": 0,
        "is_hide_tab": 0,
        "is_iframe": 0,
        "keep_alive": 1,
        "is_first_level": 1,
        "status": 1,
        "level": 1,
        "sort": 2,
        "created_at": 1640995200,
        "updated_at": 1640995200,
        "parent_id": 0
      }
    ],
    "total": 2
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none|状态码|0表示成功|
|» message|string|true|none|消息|响应消息|
|» data|object|true|none|数据|菜单数据|
|»» menus|[object]|true|none|菜单列表|菜单数组|
|»»» id|integer|true|none|菜单ID|菜单唯一标识|
|»»» path|string|true|none|路径|菜单路径|
|»»» name|string|true|none|名称|菜单名称|
|»»» component|string|true|none|组件|前端组件名|
|»»» title|string|true|none|标题|菜单显示标题|
|»»» icon|string|true|none|图标|菜单图标|
|»»» show_badge|integer|true|none|显示徽章|是否显示徽章|
|»»» is_hide|integer|true|none|是否隐藏|是否隐藏菜单|
|»»» is_hide_tab|integer|true|none|隐藏标签|是否隐藏标签页|
|»»» is_iframe|integer|true|none|内嵌页面|是否为iframe页面|
|»»» keep_alive|integer|true|none|保持活跃|是否缓存页面|
|»»» is_first_level|integer|true|none|一级菜单|是否为一级菜单|
|»»» status|integer|true|none|状态|菜单状态|
|»»» level|integer|true|none|层级|菜单层级|
|»»» sort|integer|true|none|排序|菜单排序|
|»»» created_at|integer|true|none|创建时间|创建时间戳|
|»»» updated_at|integer|true|none|更新时间|更新时间戳|
|»»» parent_id|integer|true|none|父级ID|父级菜单ID|
|»» total|integer|true|none|总数|菜单总数|

# 角色

## GET 获取角色列表

GET /roles

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "roles": [
      {
        "role": {
          "id": "1",
          "name": "系统管理员",
          "desc": "拥有系统所有权限",
          "status": "active",
          "createdTime": "2024-01-01T00:00:00Z",
          "updatedTime": "2024-01-01T00:00:00Z"
        },
        "users": [
          {
            "id": "1",
            "username": "admin",
            "name": "管理员"
          }
        ]
      },
      {
        "role": {
          "id": "2",
          "name": "普通用户",
          "desc": "基础权限用户",
          "status": "active",
          "createdTime": "2024-01-01T00:00:00Z",
          "updatedTime": "2024-01-01T00:00:00Z"
        },
        "users": [
          {
            "id": "2",
            "username": "user1",
            "name": "用户1"
          }
        ]
      }
    ],
    "total": "2"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

## GET 获取角色详情

GET /role

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string|否|角色ID|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "name": "系统管理员",
    "desc": "拥有系统所有权限",
    "status": "active",
    "createdTime": "2024-01-01T00:00:00Z",
    "updatedTime": "2024-01-01T00:00:00Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

## GET 获取角色权限

GET /role/permissions

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|roleId|query|string|否|角色ID|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "menuTrees": [
      {
        "menu": {
          "id": "1",
          "path": "/dashboard",
          "name": "Dashboard",
          "component": "Dashboard",
          "title": "仪表盘",
          "icon": "dashboard",
          "level": "1",
          "parentId": "0"
        },
        "hasPermission": true,
        "children": [],
        "auths": [
          {
            "auth": {
              "id": "1",
              "menuId": "1",
              "mark": "view",
              "title": "查看"
            },
            "hasPermission": true
          },
          {
            "auth": {
              "id": "2",
              "menuId": "1",
              "mark": "add",
              "title": "新增"
            },
            "hasPermission": false
          }
        ]
      }
    ]
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

## PUT 更新角色权限

PUT /role/permissions

> Body 请求参数

```json
{
  "roleId": "1",
  "menuIds": [
    "1",
    "2",
    "3"
  ],
  "authIds": [
    "1",
    "2",
    "5"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object|是|权限更新信息|
|» roleId|body|string|是|角色ID|
|» menuIds|body|[string]|是|菜单ID数组|
|» authIds|body|[string]|是|按钮权限ID数组|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "更新成功",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|更新成功|Inline|

# 按钮权限

## GET 获取按钮权限

GET /menu/auth

> Body 请求参数

```json
{
  "menuId": "1",
  "mark": "add",
  "title": "新增"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object|否|按钮权限信息|
|» menuId|body|string|是|菜单ID|
|» mark|body|string|是|权限标识|
|» title|body|string|是|权限名称|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "id": "1",
    "menuId": "1",
    "mark": "add",
    "title": "新增",
    "createdTime": "2024-01-01T00:00:00Z",
    "updatedTime": "2024-01-01T00:00:00Z"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

## GET 获取菜单的按钮权限列表

GET /menu/auths

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|menuId|query|string|否|菜单ID|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "auths": [
      {
        "id": "1",
        "menuId": "1",
        "mark": "view",
        "title": "查看",
        "createdTime": "2024-01-01T00:00:00Z",
        "updatedTime": "2024-01-01T00:00:00Z"
      },
      {
        "id": "2",
        "menuId": "1",
        "mark": "add",
        "title": "新增",
        "createdTime": "2024-01-01T00:00:00Z",
        "updatedTime": "2024-01-01T00:00:00Z"
      },
      {
        "id": "3",
        "menuId": "1",
        "mark": "edit",
        "title": "编辑",
        "createdTime": "2024-01-01T00:00:00Z",
        "updatedTime": "2024-01-01T00:00:00Z"
      },
      {
        "id": "4",
        "menuId": "1",
        "mark": "delete",
        "title": "删除",
        "createdTime": "2024-01-01T00:00:00Z",
        "updatedTime": "2024-01-01T00:00:00Z"
      }
    ],
    "total": "4"
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

# 字典

## GET 获取字典树结构

GET /dictionary/tree

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|query|string|否|字典名称|
|isActive|query|boolean|否|是否激活|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "获取成功",
  "data": {
    "dictionaries": [
      {
        "id": "1",
        "name": "qualification_type",
        "title": "资质类型",
        "desc": "企业资质类型字典",
        "status": "active",
        "children": [
          {
            "id": "1-1",
            "name": "construction",
            "title": "建筑工程",
            "value": "construction",
            "sort": 1
          },
          {
            "id": "1-2",
            "name": "municipal",
            "title": "市政工程",
            "value": "municipal",
            "sort": 2
          }
        ]
      },
      {
        "id": "2",
        "name": "qualification_level",
        "title": "资质等级",
        "desc": "企业资质等级字典",
        "status": "active",
        "children": [
          {
            "id": "2-1",
            "name": "first_class",
            "title": "一级",
            "value": "first_class",
            "sort": 1
          },
          {
            "id": "2-2",
            "name": "second_class",
            "title": "二级",
            "value": "second_class",
            "sort": 2
          }
        ]
      }
    ],
    "total": 2
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|获取成功|Inline|

---

## API 使用说明

### 1. 认证机制

所有需要认证的API都需要在请求头中携带 `Authorization: Bearer <token>` 或 `Access-Token: <token>`。

### 2. 登录流程

1. 调用 `POST /user/login` 进行登录
2. 从响应头中获取 `Access-Token`
3. 后续请求在请求头中携带该token

### 3. 权限控制

- 用户登录后，通过 `GET /user/info` 获取用户信息和权限菜单
- 菜单权限通过 `menuTrees` 字段返回，包含用户有权限访问的菜单和按钮
- 前端根据权限信息动态渲染菜单和按钮

### 4. 角色权限管理

- 通过 `GET /role/permissions` 获取角色的详细权限信息
- 通过 `PUT /role/permissions` 更新角色权限
- 权限包括菜单权限（menuIds）和按钮权限（authIds）

### 5. 响应格式

所有API响应都遵循统一格式：

```json
{
  "code": 0,        // 状态码，0表示成功
  "message": "...", // 响应消息
  "data": {}        // 响应数据
}
```

### 6. 错误处理

- `code` 为 0 表示成功
- `code` 非 0 表示失败，具体错误信息在 `message` 字段中
- HTTP状态码通常为200，业务状态通过 `code` 字段判断
