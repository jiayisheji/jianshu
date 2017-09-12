# vue路由
> vue是vue生态圈里其中一个重要的东西，也是SPA架构中最重要一部分。这个玩意称为前端路由，它和后端有区别。虽然原理类似，简单理解就是切换页面,
而前端是让所有的交互和展现在一个页面运行以达到减少服务器请求，提高客户体验的目的，越来越多的网站特别是web应用都用到了前端路由。

- 官网：[https://router.vuejs.org](https://router.vuejs.org);

> 注意：安装路由版本需要和vue版本对应。vue-cli会自动安装路由模块和一个简单路由配置。如果不是用vue-cli需要自己按官网的安装方法安装。

## 路由概念
### 父子路由(嵌套路由)
我们拿一段url来说一下父子路由。
```
www.123.com/article/list/1
```
这是一个文章列表页面
```
www.123.com/article/details/:id
```
这是一个文章详情页面

他们有一个公共父级article

一般像这种路由，我们直接访问文章模块`www.123.com/article`，一般需要重定向到`www.123.com/article/list/1`而我们`www.123.com/article/details/:id`需要点击列表或者其他方式访问。

vue路由写法：首先要调用new Router，写在配置中
```
new Router({
    routes: {Array} 路由主要配置
    mode： {string} 配置路由模式
    base： {string} 应用的基路径（根路径，类似<base>标签用法）
    linkActiveClass： {string} 全局配置 <router-link> 的默认『激活 class 类名』
    scrollBehavior： {Function} 
})
```

### 路由配置（routes）
```
routes = [
    {
        path: string;   路由路径，url匹配规则
        component?: Component;   对应的组件
        name?: string; 路由命名，通过一个名称来标识一个路由，页面使用更方便
        components?: { [name: string]: Component }; 命名视图组件 一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。
        redirect?: string | Location | Function;  重定向 上面父子路由举的例子
        alias?: string | Array<string>; 别名 的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
        children?: Array<RouteConfig>; 嵌套路由 配置和routes一样
        beforeEnter?: (to: Route, from: Route, next: Function) => void; 导航钩子 在切换路由时候一些事件
        meta?: any; 路由记录
    }
]

```
> 确保正确使用 components 配置（带上 s）

### 配置第一个路由登陆

设置路由有2中方式，一种是普通加载，第二种是按需加载

普通加载
```
import Login from 'components/Login'
{
    path: '/login',
    name: 'login',
    component: Login
}
```
按需加载(使用webpack功能[code splitting feature](https://webpack.js.org/guides/code-splitting-require/))
```
const Login = r => require.ensure([], () => r(require('./Login.vue')), 'login')
{
    path: '/login',
    name: 'login',
    component: Login
}
```

子路由配置
```
const List = r => require.ensure([], () => r(require('./List.vue')), 'article-list')
const Details = r => require.ensure([], () => r(require('./Details.vue')), 'article-details')
{
    path: '/article',
    name: 'article',
    component: Article,
    children: [
        {
          // 当 /article/list/1 匹配成功，
          // ArticleList 会被渲染在 Article 的 <router-view> 中
          path: 'list',
          component: ArticleList
        },
        {
          // 当 /article/details/:id 匹配成功
          // ArticleDetails 会被渲染在 Article 的 <router-view> 中
          path: 'details/:id',
          component: ArticleDetails
        }
      ]
}
```

> 还有一些钩子函数，其他配置参数说明，我们后面使用时候在一一详解。
