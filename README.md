# 仿简书nodejs+express+mongodb+vue2+angular4+爬虫
> 前端以SPA单页形式，后端以nodejs为主，提供api接口。前端页面使用angular4，管理后台使用vue2，使用爬虫来简单抓取简书页面的一些数据，（人懒没办法）

喜欢的话请点star，想订阅点watch，欢迎fork！

## 需求规划（目前第1阶段 查看[sprint1](https://github.com/jiayisheji/jianshu/tree/sprint1)分支）
1. 登录、注册、找回密码
2. 文章模块相关：文集、专题、文章
3. 完善用户模块并和文章模块关联、首页
4. 完善文章模块
5. 消息模块
6. 搜索模块、热门推荐模块、其他说明页面（帮助与反馈，关于简书等）
7. 建立运营管理后台
8. 测试打包部署发布

## 使用相关技术
- 前端框架：[Angular4.3+](https://github.com/angular/angular)
- 后端框架：[Nestjs](https://docs.nestjs.com/)(含[Express](https://www.npmjs.com/package/express))
- 测试工具：Postman或Nestjs内置(E2E测试)、Angular内置(单元测试和E2E测试)
- 数据库：MongoDB(使用[Mongoose](https://www.npmjs.com/package/mongoose)操作)
- 缓存数据库：Redis(使用[ioredis](https://www.npmjs.com/package/ioredis)操作)
- 使用JWT token认证：[passport](https://www.npmjs.com/package/passport)、[passport-jwt](https://www.npmjs.com/package/passport-jwt)、[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- 跨域处理：[Cors](https://www.npmjs.com/package/cors)
- Restful API文档：[Swagger]()(集成Nestjs)
- 安全防护：[helmet](https://www.npmjs.com/package/helmet)
## 项目规划

1. service  服务器
2. admin    运用管理系统
3. web      前端页面
4. app      移动端页面

> **说明**： 每个工程启动方式不一样，请参考对应工程的 `README.md` 文件。 

## 文件结构说明

- web  前端工程
- service  后端工程
- admin 运用管理系统工程
- app 移动端工程
- blog 开发笔记
- wiki 文档管理
- CHANGELOG.md 版本迭代日志（注意：只记录中版本迭代信息，其他小版本信息对应各工程查询）
## 快速开始

**注意**：安装[Nodejs](https://nodejs.org/en/download/) >= 8.x，Npm >= 5.x

### 服务端快速开始

1. 安装[MongoDB](https://www.mongodb.com/)  >= 3.4.x 以上版本，并[认证](https://github.com/jiayisheji/jianshu/blob/master/blog/%E8%BF%9E%E6%8E%A5MongoDB.md)
2. 安装[Redis](http://www.redis.cn/download.html) >= 3.2.x

**注意**：服务端开启前，一定要启动`MongoDB`和`Redis`;

```
cd service

npm install

npm start 开启服务端，默认3000端口

localhost:3000 可以访问表示服务正常启动

localhost:3000/swagger  查看swagger API文档
```

### 客户端快速开始

```
cd web

npm install

npm start 浏览器自动打开localhost:4200
```

需要帮助？请先阅读 [开发总结](https://github.com/jiayisheji/jianshu/tree/master/blog) 和 [经验心得](https://github.com/jiayisheji/jianshu/wiki)， 如果未能解决，可以到 GitHub 上 [进行提问](https://github.com/jiayisheji/jianshu/issues)。

## 参与贡献

我非常欢迎你的贡献，你可以通过以下方式和我一起共建 :smiley:：

- 通过 [Issue](https://github.com/jiayisheji/jianshu/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](https://github.com/jiayisheji/jianshu/pulls) 改进 Pro 的代码。
- 加入交流群：[160079165](//shang.qq.com/wpa/qunwpa?idkey=0bff7a6d9d71b226884a82c60779f489564183f7f3e25ba91f419910f6d4c427"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png)。
## 说明
> **以上技术均未使用过，从0开始学习一步步完成目标。**
