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
### Performance Improvements（性能改进）
### Notes（注释）
```

## 0.1.5 （2018-01-02）
### Features
- **服务端用户模块**：新增3个虚拟属性，一个验证密码方法，一个save的pre方法，给注册用户密码加密
- **服务端共享模块**：导入和导出数据库模块
- **服务端共享模块**：新增数据库模块，使用注册签名的方式导入mongoose操作

### Performance Improvements
- **服务端共享模块**：移除mongoose的服务里自带监听事件，移动到bootstrap里面监听
- **服务端用户模块**：移除用户服务不必要依赖注入，改进注册代码
- **服务端用户模块**：使用注册签名方式注册model

### Bug Fixes
### Notes

## 0.1.4 （2018-01-02）
### Features
- **服务端核心模块**：添加User装饰器
- **服务端核心模块**：添加数据验证和API调用限制中间件及redis操作包
- **服务端认证模块**：添加用手机找回密码dto
- **服务端认证模块**：完善注册控制器代码，新增退出登录控制器代码
- **服务端认证模块**：新增认证模块字段效验配置，路由增加中间件配置
- **服务端共享模块**：新增助手服务，处理格式时区差时间问题服务，获取随机数字服务，处理响应数据服务
- **服务端共享服务**：新增请求数据验证中间件
- **服务端共享服务**：新增Passport验证和jwt配置
- **服务端共享服务**：新增手机验证码redis操作
- **服务端共享服务**：新增mongoose，helper，middewares，passport，redis等服务
- **服务端公共模块**：新增公共字段验证配置，完善发送验证码和验证昵称的服务和控制器

### Performance Improvements
- **服务端应用入口**：修改mongoose存放地址，移除swagger默认tag,增加swagger预览地址
- **服务端核心模块**：移除mongoose服务
- **服务端认证模块**：完善注册功能服务

### Bug Fixes
### Notes

## 0.1.3 （2017-12-28）
### Features
- **服务端应用构建**：添加用户模块一整套MVC业务
- **服务端认证模块**：完善登陆业务，新增注册业务，并连接用户服务，可以保存新用户到数据库
- **服务端公共模块**：新增检查昵称接口和服务及dto
### Bug Fixes
### Notes


## 0.1.2 （2017-12-24）
### Features
- **服务端用户模块**：引入nestjs为主要架构构建应用
### Bug Fixes
### Notes

## 0.1.1 （2017-09-20）
### Features
- 构件用户模块
- 创建注册业务逻辑
- 构件`express`中间件表单验证文件
- 服务端正常运行
### Bug Fixes
- fixs 文件生成器 bug
### Notes

## 0.1.1 （2017-09-18）
### Features
- 跳转文件结构
- 构件文件生成器
- 构件`express`核心文件
- 构件`express`中间件文件
- 构件`express`路由文件
- 构件`core`文件 `mongoose` 服务配置
- 构件`core`文件 `redis` 服务配置
- 构件`core`文件 `smscode` 服务配置
- 服务端正常运行
### Bug Fixes
### Notes

## 0.1.1 （2017-09-13）
### Features
- 配置`express`中间件
- 配置`expressWinston`中间件打印访问日志
- 配置`responseHandlerMiddleware`中间件统一处理API响应结果
- 配置`responseMessage`中间件统一处理API响应结果错误信息
- 连接`mongodb`数据库
- 配置路由，浏览器访问`http://localhost:3000/` 输出 `Hello world`。
- 服务端正常运行
### Bug Fixes
### Notes


## 0.0.1 （2017-09-12）
### Features
- 构建服务端项目。
- 完成启动文档说明。
- 服务端正常运行
### Bug Fixes
### Notes

