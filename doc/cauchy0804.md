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

* <a href="https://cauchy.tsukikage7.com/api/v1">测试环境: https://cauchy.tsukikage7.com/api/v1</a>

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
  "username": "ceo",
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
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|Inline|

### 返回数据结构

## GET 获取用户信息

GET /user/info

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

> Body 请求参数

```json
{}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |ID 编号|
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

## GET 获取菜单列表

GET /menus

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

# 数据模型

