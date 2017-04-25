# 使用angular-cli创建ng4项目
> 为什么是ng4，ng4是3月23号发布的，这个项目在3月初就创建了。因为cli一直没有发布正式版，一直在等待更新，cli正式版和ng4差不多一起出的。目前版本是1.0.0。

## Node.js安装
> 如果没有安装就去[安装](https://nodejs.org/en/download/)

## 安装[angular-cli](https://github.com/angular/angular-cli)
> npm install -g @angular/cli@latest

> `注意`: cli依赖node-sass，你可能会安装不上，最好先安装`npm install -g node-sass`，科学上网翻墙安装。
node-sass是一个c++编写的东西，需要依赖python2.7，windows用户记得设置PATH，具体怎么python2.7设置到PATH（环境变量，自行百度谷歌）。
如果`npm install -g node-sass`安装不上，请使用以下方式安装：
```
npm install -g cnpm --registry=https://registry.npm.taobao.org     // 使用淘宝镜像
npm uninstall -g node-sass                                         // 把之前安装卸载
npm cache clean                                                    // 清理缓存
cnpm install -g node-sass                                          // 重新安装
```
## 构建项目
> 注意默认是angular4。和ng2简单区别是把动画模块从核心模块里面移除，以插件形式存在，打包压缩更精简了，为什么没有3，因为路由版本问题，angular为了统一命名，
angular4官方长期支持版本。

### 浏览器兼容性
> 学习一个新技术一定要了解它的支持程度，你才能对它根据自己产品需求进行选择，这是起码的要求。

![浏览器兼容性](https://camo.githubusercontent.com/efa5a8b6df23b248c39a72d85bc654db9a10def5/68747470733a2f2f73617563656c6162732e636f6d2f62726f777365722d6d61747269782f616e67756c6172322d63692e737667)

Safari (7+), iOS (7+), Edge (14) and IE mobile (11)

### 一个顺手编辑器
> 推荐`webstrom` or `vscode` 他们对TypeScript提示非常友好，webstrom和angular-cli深度集成。本项目使用webstrom2017.1.2版本，浏览器调试默认谷歌。

### 初始化一个angular4项目
