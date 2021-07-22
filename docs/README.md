# Nx + Nest.js + Angular 仿造一个全栈简书网站

本项目重点是仿造一个[简书](https://www.jianshu.com)网站，采用前后分离开发模式，前端使用最新版 [Angular](https://github.com/angular/angular)，后端使用最新版 [Nestjs](https://github.com/nestjs/nest)，使用开发 [Monorepos](https://trunkbaseddevelopment.com/monorepos/) 可扩展的开发工具 [Nx](https://github.com/nrwl/nx)。

项目使用 [Typescript](https://github.com/Microsoft/TypeScript) 作为主要编程语言，使用 [Rxjs](https://github.com/ReactiveX/rxjs) 配合 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)、[async](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)/[await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await) 异步操作。

项目使用 [Mongodb](https://www.mongodb.com) 作为主要数据库存储，使用 [Redis](https://redis.io) 作为缓存数据存储。

项目使用 [Passport](https://github.com/jaredhanson/passport) 作为主要身份认证，分别采用`local`、`jwt` 和第三方 `github` 认证策略。

项目使用 [Jest](https://github.com/facebook/jest) 作为单元测试，[Cypress](https://github.com/cypress-io/cypress) 作为 E2E 测试。

项目使用 [vs code](https://github.com/Microsoft/vscode) 作为主要编辑器开发。项目会推荐常用开发插件，如果在使用本项目时，请安装它们。

目录：

1. [Nx 安装环境](post/1.1-Nx安装环境.md)
2. [使用 Mongoose 建立 MongoDB 数据库](post/使用Mongoose建立MongoDB数据库.md)
