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

## 1.0.0alpha8 （2017-08-28）
### Features
- 完善新上榜界面
- 完善7日热点界面
- 完善30日热门界面
- 完善推荐作者界面
- 完善热门专题界面
### Bug Fixes
- 用户个人主页 拦截守卫bug 和 tab栏高亮文字颜色问题
### Notes

## 1.0.0alpha7 （2017-08-16）
### Features
- 新增顶栏路由路由加载效果
### Bug Fixes
- 去除user-detail.service.ts的core/ajax模块引用
- 登陆和注册的logo链接有href改成routerLink写法
### Notes

## 1.0.0alpha6 （2017-08-09）
### Features
### Bug Fixes
- 根组件添加加载loading效果
- 登陆使用新的http模块
- 文章列表组件使用新的http模块和统一id改成slug
### Notes

## 1.0.0alpha5 （2017-08-02）
### Features
- 使用angularV4.3.2拦截器和新的http请求
- 移除以前包装的ajax模块
- 利用environments做项目配置
### Bug Fixes
### Notes

## 1.0.0alpha4 （2017-07-30）
### Features
- 升级node版本到8.2.1
- 升级npm版本到5.3.0（升级到node会自动升级）
- 升级@angular/cli到1.2.6（目前还不支持postcss，如有想支持可以看[教程](https://github.com/jiayisheji/jianshu/blob/master/doc/web%E5%88%9D%E5%A7%8B%E5%8C%96.md)，最下面）
- 升级angular版本到4.3.2（4.3以上添加新的http模块，可以添加http拦截器）
### Bug Fixes
### Notes
注意：升级node8之后，直接启动项目，会报`node-sass`错误，让你安装这个`npm rebuild node-sass --force`，一定要记得安装。切记切记切记

## 1.0.0alpha3 （2017-07-10）
### Features
- 用户主页完善，使用Resolve传递参数验证slug正确性
- 顶部导航完善。
- 增加HTTP拦截验证
- 登陆联调成功，待完善界面
- 先实现一次显示20条文章，点击阅读更多加载新的20条，暂时不做滚动加载效果
- 完成dropdown指令
### Bug Fixes

### Notes

## 1.0.0alpha2 （2017-06-24）
### Features
- 重构目录。
- 注册登录API联调成功。
### Bug Fixes

### Notes

## 1.0.0alpha1 （2017-06-08）
### Features
- 构建web项目。
- 完成全部路由配置。
- 文章列表组件完成
- 文章加载动画完成
### Bug Fixes

### Notes
