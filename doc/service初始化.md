# 使用gulp构建node项目
> 使用gulp构建，typescript编写

## 安装Node.js
> 如果没有安装就去[安装](https://nodejs.org/en/download/)

## 安装gulp
> npm install -g gulp

[Gulp 中文网](http://www.gulpjs.com.cn)

[Gulp 英文网](http://gulpjs.com)

## 安装TypeScript
> npm install -g typescript

[TypeScript 中文网](https://www.tslang.cn)

[TypeScript 英文网](http://www.typescriptlang.org/)

## 安装Mongodb ([download](https://www.mongodb.com))
1. 进入 Mongodb 官网
2. 点击右上角download
3. 根据自己系统版本下载对应的软件
4. 然后点击安装。依次下一步。

> 注意：需要一些依赖，python2.7必须安装。

```
Node v6.9.5
Npm v3.8.9
Mongodb v3.4.2
Gulp v3.9.0
TypeScript v2.1.6
```

## 目录结构
```
 service/
     │
     ├──src/                       * 开发目录
     │   │
     │   ├──app.ts                   * 启动入口
     │   ├──config.ts                * 配置文件
     │   │
     │   ├──view/                      * 模板文件
     │   │     ├──index.ejs             * web入口
     │   │     ├──admin.ejs             * 后台管理入口
     │   ├──routes/                      * 模板文件
     │   │     ├──index.ts             * web路由
     │   │     ├──admin.ts             * 后台管理路由
     │   ├──api/                      * 请求api接口
     │   │     ├──v1/                   * 版本1
     │   │     ├──v2/                   * 版本2
     │   ├──public/                      * 静态资源
     │   │     ├──web/                     * web相关
     │   │     ├──admin/                   * admin相关
     │   ├──models/                      * 数据库定义
     │   │     ├──web/                     * web相关
     │   │     ├──admin/                   * admin相关
     │   ├──controllers/                  * 数据库操作
     │   │     ├──web/                     * web相关
     │   │     ├──admin/                   * admin相关    
     │ 
     ├──db/                        * 数据库
     │
     ├──build/                       * 发布目录
     │
     ├──package.json               * NPM用于管理其依赖关系
     ├──.eslintrc                  * js语法检查
     ├──.gitignore                 * git不提交的文件
     └──gulpfile.js                * gulp配置文件
```

## 配置gulp
> 本项目不是一个gulp教程，如果想了解gulp可以看官网。

0. 安装模块npm install -D del gulp gulp-typescript merge2 typescript
1. 引入依赖模块
2. 新建task处理各种任务
3. 在package.json里scripts配置dev和build
