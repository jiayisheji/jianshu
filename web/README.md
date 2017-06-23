# 简书WEB端(TypeScript or Angular4)
# 安装必备工具
- Install [angular-cli](https://github.com/angular/angular-cli)
- Install [VS Code](https://code.visualstudio.com/) or [WebStorm](https://www.jetbrains.com/webstorm/)

# 准备开始

进入目录
```
cd service
```
安装依赖
```
npm install
```
# TypeScript + Angular4 
这是一个Angular4项目（默认使用TypeScript）

## TypeScript准备
```
npm install -g typescript
```

启动服务
```
npm start
```
一定要看到 `webpack: Compiled successfully.` 接下来就可以

在浏览器打开 `http://localhost:4200`

> **Note!** 默认是启动是ng serve, 它会默默编译，编译完成需要手动打开浏览器，太不智能了，Angular早就想好了，
使用ng serve --open即可，那么还有一个常用，因为angular-cli本身会起一个服务环境，而我们后台开发又有一个环境，就会引发浏览器跨域限制。

### 处理跨域问题

angular-cli有个配置来解决这个问题，我们常说的代理

首先在根目录新建一个`proxy.conf.json`文件
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false
  }
}
```
然后使用`ng serve --proxy-config proxy.conf.json`运行。

来解释一下这个代理，

我们的服务器api地址是`http://localhost:3000/api`,那么我们要`http://localhost:4200/api`访问才不会出现跨域问题。

`/api` 就是api的地址，根据项目来确定， `target`就是我们要实际访问的地址，`secure`安全， 设为true就不能使用了。

angular-cli本身是基于webpack打包构建工具，更多更详细的代理配置可以参考[webpack-dev-server proxy settings](https://webpack.github.io/docs/webpack-dev-server.html#proxy)

> **Note!** 本项目后台处理跨域问题，就不需要次配置

## 项目结构
这是angular-cli项目结构，有源目录和发布目录

所有源文件在 `src` 里，编译打包发布在 `build`中 .


项目的完整文件夹结构如下:

> **Note!** 可以使用以下命令发布 `npm run build` 

| 名字 | 描述 |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **build**                 | 发布目录                                                       |
| **e2e**                 | 集成测试目录                                                           |
| **node_modules**         | 包含所有的npm依赖项                                                            |
| **src**                  | 源代码                               |
| **src/app**              | 项目主要业务代码   |
| **src/app/app开头文件.ts**          | 项目跟组件和跟模板代码   |
| **src/app/pages**              | 项目根据路由定义   |
| **src/app/core**              | 项目核心目录（共享服务、模块）   |
| **src/app/shared**              | 项目共享组件、指令目录   |
| **src/assets**           | 项目静态资源                            |
| **src/environments**     | 项目环境配置（开发，测试，生成）            |
| **src/main.ts**           | 项目入口文件  |
| **src/polyfills.ts**      | 项目浏览器补丁          |
| **src/index.html**      | 项目入口页面模板          |
| **src/root.css**        | 项目全局root样式（postcss定义变量和代码块）          |
| **src/icon.css**        | 项目自定义icon字体样式          |
| **src/style.css**       | 项目全局样式          |
| **src/test.ts**          | 项目测试入口          |
| **src/tsconfig.json**    | 用于编译TypeScript编写的开发代码的配置设置                               |                                  |
| **src/tsconfig.spec.json**    | 用于编译TypeScript编写的测试代码的配置设置                               |                                  |
| **src/typings.d.ts**     | 用于定义ts接口类型                               |                                  |
| package.json             | 包含npm依赖项的文件和[build scripts](#what-if-a-library-isnt-on-definitelytyped)                          |
| tsconfig.json            | 用于编译TypeScript编写的基础配置设置                               |                                  |
| tslint.json              | TSLint代码样式检查的配置设置                                                |
| karma.conf.js              | 单元测试配置文件                                                |
|  protractor.conf.js             | 集成测试配置文件                                                |
| .angular-cli.json              | angular-cli核心[配置文件](https://github.com/angular/angular-cli/wiki/angular-cli)                                                |
| CHANGELOG.md              | 项目版本历史                                                |

以上是文件大概介绍，未介绍是不重要的，可以略过。


# Web

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
