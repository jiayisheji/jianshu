> 软件的生命周期中一般分4个版本:
1. alpha版：内部测试版。
2. beta版：公开测试版。
3. rc版：全写：Release Candidate（候选版本）。
4. stable版：正式发布稳定版。
```
书写历史版本格式：
## versions[1.0.0-rc0]（Date[yyyy-mm-dd]）
### Features（新功能）
### Bug Fixes（修复bug）
### Notes（注释）
```

## 1.0.0alpha7 （2017-07-30）
## Features
## Bug Fixes
- 统一和web一样统一tslint验证，去除编辑器不统一问题
- Fixes Tslint Error
### Notes

## 1.0.0alpha6 （2017-07-10）
## Features
- 新增文章列表和查询单篇文章接口
## Bug Fixes
- 修复user控制器获取用户文章数量引入模块错误问题
- 修改文章模型格式化数据
- 给文章模型添加新字段：属于哪个文集，被哪个专题收录，软删除标识
- 清除用户控制器无用的包
- 修复formatDate无参数问题
### Notes


## 1.0.0alpha5 （2017-06-23）
## Features
- 新增控制器类接口
## Bug Fixes
- 修改npm run statr启动问题
- 修改控制器命名
- 修改模型文件大小写
- 修复注册不能save卡顿问题，原因：加密密码hash函数未执行
### Notes

## 1.0.0alpha4 （2017-06-21)
### Features
- 调整项目目录，分离配置信息
- 完善路由，模型，控制器
- 独立路由，清晰结构
- 改用class编写控制器
- 新增一套模板，对应路由，模型，控制器写法
- 新增logs功能
## Bug Fixes
- 修改`express-validator`包引用方式，tslint老是报错看着不爽
### Notes

## 1.0.0alpha3 （2017-06-20）
### Features
- 新增专题全套API
## Bug Fixes
- 使用slug代替_id输出
### Notes


## 1.0.0alpha2 （2017-06-18）
### Features
- 重新梳理思路，完善目录结构
- 调整api设计思路。
- 重新设计user表
- 重新写登陆注册API接口
- 新增文集全套API
### Bug Fixes

### Notes
需要重新梳理整个项目结构，完善项目。

## 1.0.0alpha1 （2017-06-07）
### Features
- 完善user表字段，大部分和简书匹配，去掉打赏和第三方社交认证。
- 新增books文集表。
### Bug Fixes

### Notes
需要从新梳理整个数据库设计依赖关系。以用户为核心，开始从新规划。
