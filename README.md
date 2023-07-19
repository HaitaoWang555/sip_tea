## 项目介绍

一个通用的后台管理系统，后台使用 `Nest` 前台页面使用 `React`，完善的权限管理功能，代码自动生成功能


在线访问 http://admin.0522.store/ 用户名 guest 密码 guest
## 依赖下载

```bash
$ pnpm install
```

## 本地开发运行

### 开发环境

| 工具          | 版本号                | 官网                                            |
| -------------| -------------------  | ----------------------------------------------- |
| Node.js      | 18.16.0               | https://nodejs.org/                            |
| pnpm         | 8.6.2                 | https://pnpm.io/                               |
| Docker       | 24.0.2                | https://www.docker.com/                        |

### 本地运行

```sh
# 中间件启动
docker-compose -f docker-compose-dev-middleware.yml up -d

# 初始化数据库
cd packages/be
pnpm build
pnpm migration:run:dev
pnpm seed:dev
cd ../../

# 后端启动 启动成功后Swagger文档地址  http://localhost:3000/api
pnpm be:dev 


# 新开终端 前端启动
pnpm fe:dev

# 访问地址 http://localhost:5173/ 账号 admin 密码 123456

```
