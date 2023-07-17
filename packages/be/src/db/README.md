```sh
# 制作初始化 migrations .env.dev 连接新数据库
cd packages/be
pnpm build
pnpm migration:generate src/db/migrations/init

# 重新打包 初始化数据库
pnpm build
pnpm migration:run:dev

# 初始化数据 如果修改seed.ts 请先运行 pnpm build
pnpm seed:dev
```