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

所有源文件在 `src` 里，编译打包发布在 `dist`中 .


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

## 构建项目
这是Angular团队提供脚手架，我们不需要做其他操作，只关心编写我们业务代码就够了，其他都不要关心。

### .angular-cli.json配置
其他配置Angular团队已经做的很好了，我们只关心`.angular-cli.json`配置即可。说几个重点和我们比较关心的。
[这里](https://github.com/angular/angular-cli/wiki/stories-1.0-update)也介绍很清楚

更多关于angular-cli信息可以看这个


#### 配置css
默认只支持css,预编译scss,less,stylus及后处理postcss的Autoprefixer功能。

目前不完全支持postcss，这个可以看[issues](https://github.com/angular/angular-cli/issues?utf8=%E2%9C%93&q=postcss)很多人关心这个问题，我开始提问，官方回复我下个版本。

我最开始用还是0.22这个版本，一直等待，等到cli出正式版1.0.0还没有支持，我就查看cli源码,自己捣鼓一下，算是支持了，[查看](https://github.com/jiayisheji/jianshu/blob/master/doc/web%E5%88%9D%E5%A7%8B%E5%8C%96.md)最下面修改方式

> **Note!** postcss是css4成css3编译器，就是类似可以把es6编译成es5的Babel一样，它的后缀名是.css,不用弄错， 不过支持它的写代码工具不多，上面推荐2款都支持。

#### 全局库安装
有人会有这样的需要我要用jQuery，angular虽然不推荐使用jQuery，jQuery是十年来兼容最好,使用最广的js库，今天依然很多人使用它。还有一个Bootstrap也是很多人喜欢的css组件库，强大栅格系统，统一ui规范。

引入有2种方式，一种是CDN，直接去CDN链接然后放到index.html里面

重点说第二种：
一些javascript库需要添加到全局范围，并加载，就像它们在脚本标记中一样。
我们可以使用angular-cli.json的apps[0].scripts和apps[0].styles属性来做到这一点。

##### 例如，要使用Bootstrap 4，您需要执行以下操作：


首先从npm安装Bootstrap：
```
npm install bootstrap@next
```
然后将所需的scripts文件添加到apps[0].scripts：

```
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/tether/dist/js/tether.js",
  "../node_modules/bootstrap/dist/js/bootstrap.js"
],
```

最后添加Bootstrap CSS到apps[0].styles数组：
```
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "styles.css"
],
```


#### 静态资源
那么我们静态资源，图片，字体，视频等放在哪里了。

放在apps[0].assets这个数组里面配置，默认就有
```
"assets": [
      "assets",
      "favicon.ico"
],
```
src下的assets文件夹就是存放静态文件的，

页面上引入，一般就2种引用，一种是HTML和js，一种css背景引用

css背景引用：
```
background: url('assets/images/logo.png') no-repeat;
```
html的img标签引用：
```
<img src="../assets/images/error-404.png" alt="">
```

其他也是类似，背景引用就是直接引用即可，页面需要加`../`


> **Note!** 基本重要的东西都讲解差不多了，注意修改这个配置需要重启`npm start`才能生效。

## generate（生成器）
这是angular一个很强大的功能，它可以帮我们组织标准结构，自动添加相关依赖，自动构建基础测试脚本。

支持`class|component|directive|enum|interface|module|pipe|service`，**默认只能在当前目录新建** 这个需要注意

---
### ng generate class

#### 概述
ng generate class [name]生成一个类

### 配置

--spec 指定是否生成spec文件

---
### ng generate component

#### 概述
ng generate component [name]生成一个组件

#### 配置

- --flat 标志来指示是否创建了目录
- 
- --inline-template (-it) 指定模板是否将在ts文件中
- 
- --inline-style (-is) 指定样式是否将在ts文件中
- 
- --prefix 指定是否使用前缀
- 
- --spec 指定是否生成spec文件
- 
- --view-encapsulation (-ve) 设置视图封装策略
- 
- --change-detection (-cd) 设置变化检测策略
- 
- --skip-import 允许跳过模块导入

---
### ng generate directive

#### 概述
### generate directive [name]生成一个指令

#### 配置

- --flat 标志来指示是否创建了目录
- 
- --prefix 指定是否使用前缀
- 
- --spec 指定是否生成spec文件
- 
### -skip-import 允许跳过模块导入

---
### ng generate enum

#### 概述
ng generate enum [name]生成枚举

---
### ng generate interface

#### 概述
ng g### rate interface [name] <type>生成一个接口

#### 参数

- type 可选字符串指定接口的类型

---
### ng generate module

#### 概述
ng generate module [name]生成一个NgModule

#### 参数### -spec 指定是否生成spec文件

--routing 指定是否应生成路由模块文件

---
###
 ### 举个例子，创建一个user组件
 ```
1. 新建user文件夹，并且进入，

 
 `````````
 
 ng generate pipe

#### 概述
ng generate pipe [name]生成一个管道

#### 参数

- --flat 标志来指示是否创建了目录
- 
- --spec 指定是否生成spec文件
- 
- --skip-import 允许跳过模块导入

---
### ng generate service

#### 概述
ng generate service [name]生成服务

#### 参数

- --flat 标志来指示是否创建了目录
- 
- --spec 指定是否生成spec文件

### 举个例子，创建一个user组件
```
ng generate component user --flat --spec
```

## Build（发布）
默认发布`dist`文件夹下，

使用一下命令即可：
`ng build --prod --aot`
build是cli提供的命令，

--prod是定义构建目标生产，默认（--t，--dev，--prod）看名字也大概猜出，测试，开发，生产。

--aot标志使用Ahead of Time编译进行构建，具体是个什么玩意，自行谷歌。

Angular团队一直不断优化打包之后体积，这也是2和4的其中一个区别。

## Test(测试)
测试写在`.spec.ts`文件里，分单元测试和集成测试。

单元测试: `npm run test`

集成测试: `npm run e2e`

## 公共依赖（不断完善中）
### css相关
 - [ ] icon字体图标
 - [ ] root全局变量和代码块
### 模块
 - [ ] upload(图片上传)
### 组件
 - [ ] Tooltip（工具提示）
 - [ ] modal（弹窗）
 - [ ] tabs（选项卡）
 - [ ] alert（警告）
 - [ ] dropdown（下拉菜单）
 - [ ] notification（消息提醒）
### 指令
 - [ ] 滚动加载数据（本项目大量使用）
### 管道
 - [ ] 个性化时间过滤（第三方包处理）
### 服务
 - [ ] http拦截器（包装现有http）

# 其他
可以看[系列教程](https://github.com/jiayisheji/jianshu/blob/master/doc/)
