# 仿简书nodejs+express+mongodb+vue2+angular2
> 前端以SPA单页形式，后端以nodejs为主，提供api接口。前端页面使用angular2，管理后台使用vue2

## 技术栈

### node相关

> 以node核心，使用express框架，mongodb作为数据库，eslint为代码检查工具，使用typescript作为开发语言


生产模块 | 相关介绍
---|---
express | 主要框架
mongodb | 主要数据库
lodash |  主要工具库
node-schedule  | 定时任务
async | 并发控制

开发模块 | 相关介绍
---|---
supervisor | 实现监测文件修改并自动重启应用
eslint | 检查代码工具


### vue2相关

> 使用vue-cli脚手架，使用router，vuex，ElementUI等

### angular2相关

> 使用angular-cli脚手架

## 项目规划

1. service  服务器
2. admin    后台管理系统
3. web      前端页面
4. app      移动页面

## 说明
> **以上技术均未使用过，从0开始学习一步步完成目标。**

## 功能规划

1. 文章相关

    文章列表
    
    文章详情
    
    文章点赞，评论，收藏，举报
    
    文章阅读，发布时间，作者，字数
    
3. 用户相关

    用户登录，注册，找回密码
    
    用户列表
    
    用户主页
    
    用户发布文章，评价文章，文章留言
    
    关注用户，用户粉丝
