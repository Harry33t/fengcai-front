---
title: cauchy
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.30"

---

# cauchy

Base URLs:

# Authentication

* API Key (JWT鉴权)
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
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### 返回数据结构

# 用户/token验证

<a id="opIdUserService_CreateUser"></a>

## POST 创建用户

POST /user

创建用户

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### 返回数据结构

## GET 获取用户详情

GET /user

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |ID 编号|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除用户

DELETE /user

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 更新用户

PUT /user

> Body 请求参数

```json
{
  "id": "string",
  "menuId": "string",
  "mark": "string",
  "title": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

<a id="opIdUserService_ListUsers"></a>

## GET 获取用户列表

GET /users

获取用户列表

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer(int32)| 否 |none|
|pageSize|query|integer(int32)| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "",
  "data": {
    "users": [
      {
        "user": {
          "id": 1,
          "username": "admin",
          "name": "超级管理员",
          "phone": "13800000000",
          "gender": 1,
          "status": 1,
          "roleId": 1,
          "createdTime": 1755188648,
          "updatedTime": 1755188648
        },
        "roleName": "超级管理员",
        "roleDesc": "拥有系统所有权限",
        "subordinates": [
          {
            "id": 2,
            "username": "system",
            "name": "系统管理员",
            "phone": "13800000001",
            "gender": 1,
            "status": 1,
            "roleId": 2,
            "createdTime": 1755188648,
            "updatedTime": 1755188648
          },
          {
            "id": 3,
            "username": "manager",
            "name": "企业管理员",
            "phone": "13800000002",
            "gender": 1,
            "status": 1,
            "roleId": 3,
            "createdTime": 1755188648,
            "updatedTime": 1755188648
          }
        ]
      },
      {
        "user": {
          "id": 2,
          "username": "system",
          "name": "系统管理员",
          "phone": "13800000001",
          "gender": 1,
          "status": 1,
          "roleId": 2,
          "createdTime": 1755188648,
          "updatedTime": 1755188648
        },
        "roleName": "系统管理员",
        "roleDesc": "拥有系统管理权限",
        "manager": {
          "id": 1,
          "username": "admin",
          "name": "超级管理员",
          "phone": "13800000000",
          "gender": 1,
          "status": 1,
          "roleId": 1,
          "createdTime": 1755188648,
          "updatedTime": 1755188648
        }
      },
      {
        "user": {
          "id": 3,
          "username": "manager",
          "name": "企业管理员",
          "phone": "13800000002",
          "gender": 1,
          "status": 1,
          "roleId": 3,
          "createdTime": 1755188648,
          "updatedTime": 1755188648
        },
        "roleName": "企业管理员",
        "roleDesc": "拥有企业数据管理权限",
        "manager": {
          "id": 1,
          "username": "admin",
          "name": "超级管理员",
          "phone": "13800000000",
          "gender": 1,
          "status": 1,
          "roleId": 1,
          "createdTime": 1755188648,
          "updatedTime": 1755188648
        },
        "subordinates": [
          {
            "id": 4,
            "username": "user",
            "name": "普通用户",
            "phone": "13800000003",
            "gender": 2,
            "status": 1,
            "roleId": 4,
            "createdTime": 1755188648,
            "updatedTime": 1755188648
          }
        ]
      },
      {
        "user": {
          "id": 4,
          "username": "user",
          "name": "普通用户",
          "phone": "13800000003",
          "gender": 2,
          "status": 1,
          "roleId": 4,
          "createdTime": 1755188648,
          "updatedTime": 1755188648
        },
        "roleName": "普通用户",
        "roleDesc": "基础权限用户",
        "manager": {
          "id": 3,
          "username": "manager",
          "name": "企业管理员",
          "phone": "13800000002",
          "gender": 1,
          "status": 1,
          "roleId": 3,
          "createdTime": 1755188648,
          "updatedTime": 1755188648
        }
      }
    ],
    "total": 4
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» users|[object]|true|none||none|
|»»» user|object|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» username|string|true|none||none|
|»»»» name|string|true|none||none|
|»»»» phone|string|true|none||none|
|»»»» gender|integer|true|none||none|
|»»»» status|integer|true|none||none|
|»»»» roleId|integer|true|none||none|
|»»»» createdTime|integer|true|none||none|
|»»»» updatedTime|integer|true|none||none|
|»»» roleName|string|true|none||none|
|»»» roleDesc|string|true|none||none|
|»»» subordinates|[object]|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» username|string|true|none||none|
|»»»» name|string|true|none||none|
|»»»» phone|string|true|none||none|
|»»»» gender|integer|true|none||none|
|»»»» status|integer|true|none||none|
|»»»» roleId|integer|true|none||none|
|»»»» createdTime|integer|true|none||none|
|»»»» updatedTime|integer|true|none||none|
|»»» manager|object|true|none||none|
|»»»» id|integer|true|none||none|
|»»»» username|string|true|none||none|
|»»»» name|string|true|none||none|
|»»»» phone|string|true|none||none|
|»»»» gender|integer|true|none||none|
|»»»» status|integer|true|none||none|
|»»»» roleId|integer|true|none||none|
|»»»» createdTime|integer|true|none||none|
|»»»» updatedTime|integer|true|none||none|
|»» total|integer|true|none||none|

## GET 获取用户信息

GET /user/info

> 返回示例

> 200 Response

```json
{
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
    "subordinates": [
      {
        "id": 2,
        "username": "system",
        "name": "系统管理员",
        "phone": "13800000001",
        "gender": 1,
        "status": 1,
        "roleId": 2,
        "createdTime": 1755188648,
        "updatedTime": 1755188648
      },
      {
        "id": 3,
        "username": "manager",
        "name": "企业管理员",
        "phone": "13800000002",
        "gender": 1,
        "status": 1,
        "roleId": 3,
        "createdTime": 1755188648,
        "updatedTime": 1755188648
      }
    ],
    "menuTrees": [
      {
        "menu": {
          "id": 1,
          "path": "/dashboard",
          "name": "Dashboard",
          "component": "/index/index",
          "title": "仪表盘",
          "icon": "&#xe721;",
          "showBadge": 2,
          "isHide": 2,
          "isHideTab": 2,
          "isIframe": 2,
          "keepAlive": 2,
          "isFirstLevel": 1,
          "status": 1,
          "level": 1,
          "sort": 99,
          "createdTime": 1755188649,
          "updatedTime": 1755188649
        },
        "children": [
          {
            "menu": {
              "id": 2,
              "path": "console",
              "name": "DashboardConsole",
              "component": "/dashboard/console/index",
              "title": "工作台",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 2,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 1,
              "sort": 99,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 1,
                "menuId": 2,
                "mark": "dashboard:console:view",
                "title": "查看工作台",
                "createdTime": 1755188649,
                "updatedTime": 1755188649
              }
            ]
          },
          {
            "menu": {
              "id": 3,
              "path": "analysis",
              "name": "DashboardAnalysis",
              "component": "/dashboard/analysis/index",
              "title": "数据分析",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 2,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 1,
              "sort": 88,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 2,
                "menuId": 3,
                "mark": "dashboard:analysis:view",
                "title": "查看数据分析",
                "createdTime": 1755188649,
                "updatedTime": 1755188649
              }
            ]
          }
        ]
      },
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
          "sort": 80,
          "createdTime": 1755188649,
          "updatedTime": 1755188649
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
              "sort": 99,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 3,
                "menuId": 5,
                "mark": "company:view",
                "title": "查看企业",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 4,
                "menuId": 5,
                "mark": "company:create",
                "title": "新增企业",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 5,
                "menuId": 5,
                "mark": "company:edit",
                "title": "编辑企业",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 6,
                "menuId": 5,
                "mark": "company:delete",
                "title": "删除企业",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 7,
                "menuId": 5,
                "mark": "company:export",
                "title": "导出企业",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              }
            ]
          },
          {
            "menu": {
              "id": 6,
              "path": "qualification",
              "name": "CompanyQualification",
              "component": "/company/qualification/index",
              "title": "企业资质管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 4,
              "sort": 88,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 8,
                "menuId": 6,
                "mark": "qualification:view",
                "title": "查看资质",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 9,
                "menuId": 6,
                "mark": "qualification:create",
                "title": "新增资质",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 10,
                "menuId": 6,
                "mark": "qualification:edit",
                "title": "编辑资质",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 11,
                "menuId": 6,
                "mark": "qualification:delete",
                "title": "删除资质",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              }
            ]
          },
          {
            "menu": {
              "id": 7,
              "path": "safety-license",
              "name": "SafetyLicense",
              "component": "/company/safety-license/index",
              "title": "安全许可证管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 4,
              "sort": 77,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 12,
                "menuId": 7,
                "mark": "safety-license:view",
                "title": "查看许可证",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 13,
                "menuId": 7,
                "mark": "safety-license:create",
                "title": "新增许可证",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 14,
                "menuId": 7,
                "mark": "safety-license:edit",
                "title": "编辑许可证",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              },
              {
                "id": 15,
                "menuId": 7,
                "mark": "safety-license:delete",
                "title": "删除许可证",
                "createdTime": 1755188650,
                "updatedTime": 1755188650
              }
            ]
          },
          {
            "menu": {
              "id": 8,
              "path": "credit-manual",
              "name": "CreditManual",
              "component": "/company/credit-manual/index",
              "title": "信用手册管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 4,
              "sort": 66,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 16,
                "menuId": 8,
                "mark": "credit-manual:view",
                "title": "查看信用手册",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              },
              {
                "id": 17,
                "menuId": 8,
                "mark": "credit-manual:create",
                "title": "新增信用手册",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              },
              {
                "id": 18,
                "menuId": 8,
                "mark": "credit-manual:edit",
                "title": "编辑信用手册",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              },
              {
                "id": 19,
                "menuId": 8,
                "mark": "credit-manual:delete",
                "title": "删除信用手册",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              }
            ]
          }
        ]
      },
      {
        "menu": {
          "id": 9,
          "path": "/permission",
          "name": "Permission",
          "component": "/index/index",
          "title": "权限管理",
          "icon": "&#xe72b;",
          "showBadge": 2,
          "isHide": 2,
          "isHideTab": 2,
          "isIframe": 2,
          "keepAlive": 1,
          "isFirstLevel": 1,
          "status": 1,
          "level": 1,
          "sort": 70,
          "createdTime": 1755188649,
          "updatedTime": 1755188649
        },
        "children": [
          {
            "menu": {
              "id": 10,
              "path": "data-permission",
              "name": "DataPermission",
              "component": "/permission/data-permission/index",
              "title": "数据权限配置",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 9,
              "sort": 99,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 20,
                "menuId": 10,
                "mark": "data-permission:view",
                "title": "查看数据权限",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              },
              {
                "id": 21,
                "menuId": 10,
                "mark": "data-permission:create",
                "title": "创建数据权限",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              },
              {
                "id": 22,
                "menuId": 10,
                "mark": "data-permission:edit",
                "title": "编辑数据权限",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              },
              {
                "id": 23,
                "menuId": 10,
                "mark": "data-permission:delete",
                "title": "删除数据权限",
                "createdTime": 1755188651,
                "updatedTime": 1755188651
              }
            ]
          },
          {
            "menu": {
              "id": 11,
              "path": "user-subordinate",
              "name": "UserSubordinate",
              "component": "/permission/user-subordinate/index",
              "title": "用户层级管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 9,
              "sort": 88,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 24,
                "menuId": 11,
                "mark": "user-subordinate:view",
                "title": "查看用户层级",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 25,
                "menuId": 11,
                "mark": "user-subordinate:assign",
                "title": "分配下属",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              }
            ]
          }
        ]
      },
      {
        "menu": {
          "id": 12,
          "path": "/system",
          "name": "System",
          "component": "/index/index",
          "title": "系统管理",
          "icon": "&#xe72b;",
          "showBadge": 2,
          "isHide": 2,
          "isHideTab": 2,
          "isIframe": 2,
          "keepAlive": 1,
          "isFirstLevel": 1,
          "status": 1,
          "level": 1,
          "sort": 60,
          "createdTime": 1755188649,
          "updatedTime": 1755188649
        },
        "children": [
          {
            "menu": {
              "id": 13,
              "path": "user",
              "name": "SystemUser",
              "component": "/system/user/index",
              "title": "用户管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 12,
              "sort": 99,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 26,
                "menuId": 13,
                "mark": "user:view",
                "title": "查看用户",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 27,
                "menuId": 13,
                "mark": "user:create",
                "title": "新增用户",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 28,
                "menuId": 13,
                "mark": "user:edit",
                "title": "编辑用户",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 29,
                "menuId": 13,
                "mark": "user:delete",
                "title": "删除用户",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 30,
                "menuId": 13,
                "mark": "user:reset-password",
                "title": "重置密码",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              }
            ]
          },
          {
            "menu": {
              "id": 14,
              "path": "role",
              "name": "SystemRole",
              "component": "/system/role/index",
              "title": "角色管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 12,
              "sort": 88,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 31,
                "menuId": 14,
                "mark": "role:view",
                "title": "查看角色",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 32,
                "menuId": 14,
                "mark": "role:create",
                "title": "新增角色",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 33,
                "menuId": 14,
                "mark": "role:edit",
                "title": "编辑角色",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 34,
                "menuId": 14,
                "mark": "role:delete",
                "title": "删除角色",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 35,
                "menuId": 14,
                "mark": "role:assign-permission",
                "title": "分配权限",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              }
            ]
          },
          {
            "menu": {
              "id": 15,
              "path": "menu",
              "name": "SystemMenu",
              "component": "/system/menu/index",
              "title": "菜单管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 12,
              "sort": 77,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 36,
                "menuId": 15,
                "mark": "menu:view",
                "title": "查看菜单",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 37,
                "menuId": 15,
                "mark": "menu:create",
                "title": "新增菜单",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 38,
                "menuId": 15,
                "mark": "menu:edit",
                "title": "编辑菜单",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              },
              {
                "id": 39,
                "menuId": 15,
                "mark": "menu:delete",
                "title": "删除菜单",
                "createdTime": 1755188652,
                "updatedTime": 1755188652
              }
            ]
          },
          {
            "menu": {
              "id": 16,
              "path": "dictionary",
              "name": "Dictionary",
              "component": "/system/dictionary/index",
              "title": "字典管理",
              "showBadge": 2,
              "isHide": 2,
              "isHideTab": 2,
              "isIframe": 2,
              "keepAlive": 1,
              "isFirstLevel": 2,
              "status": 1,
              "level": 2,
              "parentId": 12,
              "sort": 66,
              "createdTime": 1755188649,
              "updatedTime": 1755188649
            },
            "auths": [
              {
                "id": 40,
                "menuId": 16,
                "mark": "dictionary:view",
                "title": "查看字典",
                "createdTime": 1755188653,
                "updatedTime": 1755188653
              },
              {
                "id": 41,
                "menuId": 16,
                "mark": "dictionary:create",
                "title": "新增字典",
                "createdTime": 1755188653,
                "updatedTime": 1755188653
              },
              {
                "id": 42,
                "menuId": 16,
                "mark": "dictionary:edit",
                "title": "编辑字典",
                "createdTime": 1755188653,
                "updatedTime": 1755188653
              },
              {
                "id": 43,
                "menuId": 16,
                "mark": "dictionary:delete",
                "title": "删除字典",
                "createdTime": 1755188653,
                "updatedTime": 1755188653
              }
            ]
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
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

<a id="opIdUserService_Logout"></a>

## POST 用户登出

POST /user/logout

用户登出

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### 返回数据结构

<a id="opIdUserService_RefreshToken"></a>

## POST 刷新token

POST /user/refresh

刷新token

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### 返回数据结构

# 菜单

## POST 创建菜单

POST /menu

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取菜单详情

GET /menu

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |ID 编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "menus": [
      {
        "id": 0,
        "path": "string",
        "name": "string",
        "component": "string",
        "title": "string",
        "icon": "string",
        "show_badge": 0,
        "is_hide": 0,
        "is_hide_tab": 0,
        "is_iframe": 0,
        "keep_alive": 0,
        "is_first_level": 0,
        "status": 0,
        "level": 0,
        "sort": 0,
        "created_at": 0,
        "updated_at": 0,
        "parent_id": 0
      }
    ],
    "total": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» menus|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» path|string|true|none||none|
|»»» name|string|true|none||none|
|»»» component|string|true|none||none|
|»»» title|string|true|none||none|
|»»» icon|string|true|none||none|
|»»» show_badge|integer|true|none||none|
|»»» is_hide|integer|true|none||none|
|»»» is_hide_tab|integer|true|none||none|
|»»» is_iframe|integer|true|none||none|
|»»» keep_alive|integer|true|none||none|
|»»» is_first_level|integer|true|none||none|
|»»» status|integer|true|none||none|
|»»» level|integer|true|none||none|
|»»» sort|integer|true|none||none|
|»»» created_at|integer|true|none||none|
|»»» updated_at|integer|true|none||none|
|»»» parent_id|integer|true|none||none|
|»» total|integer|true|none||none|

## PUT 更新菜单

PUT /menu

> Body 请求参数

```json
{
  "id": "string",
  "path": "string",
  "name": "string",
  "component": "string",
  "title": "string",
  "icon": "string",
  "showBadge": "string",
  "showTextBadge": "string",
  "isHide": "string",
  "isHideTab": "string",
  "link": "string",
  "isIframe": "string",
  "keepAlive": "string",
  "isFirstLevel": "string",
  "status": "string",
  "parentId": "string",
  "sort": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "menus": [
      {
        "id": 0,
        "path": "string",
        "name": "string",
        "component": "string",
        "title": "string",
        "icon": "string",
        "show_badge": 0,
        "is_hide": 0,
        "is_hide_tab": 0,
        "is_iframe": 0,
        "keep_alive": 0,
        "is_first_level": 0,
        "status": 0,
        "level": 0,
        "sort": 0,
        "created_at": 0,
        "updated_at": 0,
        "parent_id": 0
      }
    ],
    "total": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» menus|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» path|string|true|none||none|
|»»» name|string|true|none||none|
|»»» component|string|true|none||none|
|»»» title|string|true|none||none|
|»»» icon|string|true|none||none|
|»»» show_badge|integer|true|none||none|
|»»» is_hide|integer|true|none||none|
|»»» is_hide_tab|integer|true|none||none|
|»»» is_iframe|integer|true|none||none|
|»»» keep_alive|integer|true|none||none|
|»»» is_first_level|integer|true|none||none|
|»»» status|integer|true|none||none|
|»»» level|integer|true|none||none|
|»»» sort|integer|true|none||none|
|»»» created_at|integer|true|none||none|
|»»» updated_at|integer|true|none||none|
|»»» parent_id|integer|true|none||none|
|»» total|integer|true|none||none|

## DELETE 删除菜单

DELETE /menu

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |ID 编号|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "menus": [
      {
        "id": 0,
        "path": "string",
        "name": "string",
        "component": "string",
        "title": "string",
        "icon": "string",
        "show_badge": 0,
        "is_hide": 0,
        "is_hide_tab": 0,
        "is_iframe": 0,
        "keep_alive": 0,
        "is_first_level": 0,
        "status": 0,
        "level": 0,
        "sort": 0,
        "created_at": 0,
        "updated_at": 0,
        "parent_id": 0
      }
    ],
    "total": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» menus|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» path|string|true|none||none|
|»»» name|string|true|none||none|
|»»» component|string|true|none||none|
|»»» title|string|true|none||none|
|»»» icon|string|true|none||none|
|»»» show_badge|integer|true|none||none|
|»»» is_hide|integer|true|none||none|
|»»» is_hide_tab|integer|true|none||none|
|»»» is_iframe|integer|true|none||none|
|»»» keep_alive|integer|true|none||none|
|»»» is_first_level|integer|true|none||none|
|»»» status|integer|true|none||none|
|»»» level|integer|true|none||none|
|»»» sort|integer|true|none||none|
|»»» created_at|integer|true|none||none|
|»»» updated_at|integer|true|none||none|
|»»» parent_id|integer|true|none||none|
|»» total|integer|true|none||none|

## GET 获取菜单列表

GET /menus

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |none|
|pageSize|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": {
    "menus": [
      {
        "id": 0,
        "path": "string",
        "name": "string",
        "component": "string",
        "title": "string",
        "icon": "string",
        "show_badge": 0,
        "is_hide": 0,
        "is_hide_tab": 0,
        "is_iframe": 0,
        "keep_alive": 0,
        "is_first_level": 0,
        "status": 0,
        "level": 0,
        "sort": 0,
        "created_at": 0,
        "updated_at": 0,
        "parent_id": 0
      }
    ],
    "total": 0
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|object|true|none||none|
|»» menus|[object]|true|none||none|
|»»» id|integer|true|none||none|
|»»» path|string|true|none||none|
|»»» name|string|true|none||none|
|»»» component|string|true|none||none|
|»»» title|string|true|none||none|
|»»» icon|string|true|none||none|
|»»» show_badge|integer|true|none||none|
|»»» is_hide|integer|true|none||none|
|»»» is_hide_tab|integer|true|none||none|
|»»» is_iframe|integer|true|none||none|
|»»» keep_alive|integer|true|none||none|
|»»» is_first_level|integer|true|none||none|
|»»» status|integer|true|none||none|
|»»» level|integer|true|none||none|
|»»» sort|integer|true|none||none|
|»»» created_at|integer|true|none||none|
|»»» updated_at|integer|true|none||none|
|»»» parent_id|integer|true|none||none|
|»» total|integer|true|none||none|

# 角色

## GET 获取角色列表

GET /roles

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## PUT 更新角色

PUT /role

> Body 请求参数

```json
{
  "id": "string",
  "name": "string",
  "desc": "string",
  "status": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## POST 创建角色

POST /role

> Body 请求参数

```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "phone": "string",
  "gender": "string",
  "status": "string",
  "roleId": "string",
  "manageId": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取角色详情

GET /role

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除角色

DELETE /role

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取角色权限

GET /role/permissions

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|roleId|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

## PUT 更新角色权限

PUT /role/permissions

> Body 请求参数

```json
{
  "roleId": "string",
  "menuIds": [
    "string"
  ],
  "authIds": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "message": "string",
  "data": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» message|string|true|none||none|
|» data|null|true|none||none|

# 按钮

## GET 创建按钮权限

GET /menu/auth

> Body 请求参数

```json
{
  "menuId": "string",
  "mark": "string",
  "title": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 更新按钮权限

PUT /menu/auth

> Body 请求参数

```json
{
  "id": "string",
  "menuId": "string",
  "mark": "string",
  "title": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除按钮权限

DELETE /menu/auth

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取菜单的按钮权限列表

GET /menu/auths

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|menuId|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 字典

## GET 获取字典树结构

GET /dictionary/tree

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|query|string| 否 |none|
|isActive|query|boolean| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 企业管理

## GET 获取企业列表

GET /companies

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |none|
|pageSize|query|string| 否 |none|
|name|query|string| 否 |none|
|customerType|query|string| 否 |none|
|companyTypes|query|string| 否 |none|

> 返回示例

> 404 Response

```
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|none|Inline|

### 返回数据结构

## GET 获取企业详情

GET /company

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 创建企业

PUT /company

> Body 请求参数

```json
{
  "name": "string",
  "socialCreditCode": "string",
  "address": "string",
  "contactPerson": "string",
  "contactPhone": "string",
  "customerType": "string",
  "companyTypes": [
    "string"
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除企业

DELETE /company

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 企业资质管理

## GET 获取企业资质列表

GET /company-qualifications

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|companyId|query|string| 否 |none|
|qualificationType|query|string| 否 |none|
|qualificationSeries|query|string| 否 |none|
|certificateNumber|query|string| 否 |none|
|issuingAuthority|query|string| 否 |none|
|page|query|string| 否 |none|
|pageSize|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 获取企业资质详情

GET /company-qualification

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## PUT 更新企业资质

PUT /company-qualification

> Body 请求参数

```json
{
  "id": "string",
  "qualificationType": "string",
  "qualificationSeries": "string",
  "qualificationCategory": "string",
  "grade": "string",
  "certificateNumber": "string",
  "issuingAuthority": "string",
  "validUntil": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## POST 创建企业资质

POST /company-qualification

> Body 请求参数

```json
{
  "companyId": "string",
  "qualificationType": "string",
  "qualificationSeries": "string",
  "qualificationCategory": "string",
  "grade": "string",
  "certificateNumber": "string",
  "issuingAuthority": "string",
  "validUntil": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除企业资质

DELETE /company-qualification

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 信用手册管理

## GET 获取信用手册列表

GET /credit-manuals

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|companyId|query|string| 否 |none|
|page|query|string| 否 |none|
|pageSize|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## GET 创建信用手册

GET /credit-manual

> Body 请求参数

```json
{
  "companyId": "string",
  "manualNumber": "string",
  "issuingAuthority": "string",
  "validUntil": "string"
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

## DELETE 删除信用手册

DELETE /credit-manual

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### 返回数据结构

# 数据模型

