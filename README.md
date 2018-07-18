# 仿简书nodejs5+express4+mongodb3+angular6+爬虫
> 前端以SPA单页形式，后端以nodejs为主，提供api接口。前端页面使用angular6，管理后台使用angular6，使用爬虫来简单抓取简书页面的一些数据，（人懒没办法）

## 项目规划

1. web  pc端 使用SPA模式 用户和读者访问页面
2. admin  pc端 使用SPA模式 运用管理系统
3. web-ssr  pc端 服务端渲染
4. web-app 移动端 使用pwa完成
5. app 移动端 未来考虑flutter完成 目前观望中

> **说明**： 
   1. 每个工程启动方式不一样，请参考对应工程的 `README.md` 文件。
   2. 每个工程下面都有2个文件，`server` 服务端， `client` 客户端。  

## 文件结构说明

- web  pc端
- web-ssr  pc端
- admin pc端
- web-app 移动端
- app 移动端
- docs 文档管理
- CHANGELOG.md 版本迭代日志

## 服务端口规划

无论前端还是后台都会在服务器环境下开发，就会出现跨域或者占用端口现象

 服务端只提供api接口，命名以 `/api/v1/xxxx` 开始

 前端端口以`520`开始，后台端口以`521`开始，

 - web 前端 `5200` 后台 `5210`
 - admin 前端 `5201` 后台 `5211`
 - web-app 前端 `5202` 后台 `5212`
 - web-ssr 前端和后台在一个工程 `5213`
 - app 前端独立，后台 `5214`

## 说明
> **以上技术均未使用过，从0开始学习一步步完成目标。**
