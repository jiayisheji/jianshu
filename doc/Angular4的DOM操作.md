# Angular4的DOM操作
在DOM的时代，jQuery击败各路库，框架，最后存活下来，已经有十多个年头了，到目前为止依旧是js里面的王者之库。随着angular.js兴起，带动数据驱动视图开发模式。
后面的React、Vue、Angular4都是这个套路。angular.js是一个大而全的框架，里面上面都有，不光可以MVC分层架构，还可以做视图HTML增强，强大的指令系统。
双向绑定，依赖注入，共享服务，过滤器，HTTP,路由，jqLite等功能。

## angular.js的DOM操作
虽然所以数据驱动视图开发模式的，框架都不鼓励开发者去直接操作DOM，
内置迷你jQuery叫，包涵jQuery大部分DOM操作功能。

## Angular4的DOM操作
@viewChild配合renderer选择元素，但是在Angular4中renderer已经废弃掉了，变成了renderer2。
[参考API](https://angular.cn/docs/ts/latest/api/core/index/Renderer2-class.html)
