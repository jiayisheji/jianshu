# jianshu

## Description

description

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 项目规划

文件目录 src

1. core 核心模块 作为启动模块 只初始化一次
2. shared 共享模块 redis操作 mongodb操作 其他操作
3. feature 特性模块
4. tools 工具模块
5. log 日志模块

配置使用 `.env`

```env

```