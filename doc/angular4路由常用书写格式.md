Angular4常用书写方式
- 路由配置写法
- html写法
- js写法

## 一些名词解释
- 顶级路由：在根目录下路由，例如`https://github.com/jiayisheji`,这个jiayisheji就是顶级。
- 平级路由：当前路由的兄弟路由
- 父路由：当前路由的父级路由，顶级路由的父级没有。
- 子路由：当前路由的子路由，不包含子路由的子路由。

## 路由配置写法



## html写法
### 无参数顶级路由
网页常用的有login这样的登录页面，一般都是在顶级路由，常用都是`http://www.xxx.com/login`。
```
那么在html里面该怎么写了。
<a routerLink="/login">登录</a>
会自动编译成
<a href="/login">登录</a>
```

### 无参数子路由
网页常用的有/settings/profile这样的系统设置用户个人资料，一般都是在子路由，它没有任何参数，常用都是`http://www.xxx.com/settings/profile`。
```
那么在html里面该怎么写了。
<a routerLink="/settings/profile">个人资料</a>
会自动编译成
<a href="/settings/profile">个人资料</a>
```

### 带参数的顶级路由
网页常用的有/article/xxxx这样的文章详情页面，一般都是在顶级路由，常用都是`http://www.xxx.com/article/xxxx`。

因为xxx一般是动态的，通过列表点击进去，而列表一般又是循环生成的，这里就需要用动态渲染了。
```
那么在html里面该怎么写了。
let lists = [1, 2, 3, 4, 5]
<li *ngFor="let item of lists">
   <a [routerLink]="[/article, item.id]">文章详情</a>
<li>
会自动编译成
<li>
   <a href="/article/1">文章详情</a>
<li>
<li>
   <a href="/article/2">文章详情</a>
<li>
<li>
   <a href="/article/3">文章详情</a>
<li>
<li>
   <a href="/article/4">文章详情</a>
<li>
<li>
   <a href="/article/5">文章详情</a>
<li>
```

### 带参数的子路由
网页常用的有/user/xxxx/followers这样的某个用户下面粉丝页面，一般都是在顶级路由，常用都是`http://www.xxx.com/user/xxxx/followers`。

因为这个xxxx也是需要动态渲染。
```
那么在html里面该怎么写了。
<a [routerLink]="[/user, '1', 'followers']">我的粉丝</a>
会自动编译成
<a href="/user/1/followers">我的粉丝</a>
```

### 带查询路由写法
网页常用的有/search?q=angular 这样的搜索页面，有些在顶级路由有些在其他路由，常用都是`http://www.xxx.com/search?q=angular`。
无参数查询写法
```
那么在html里面该怎么写了。
<a [routerLink]="[/search, {queryParams: {q: angular}}]">搜索Angular</a>
会自动编译成
<a href="/search?q=angular">搜索Angular</a>
```
有参数查询写法
```
那么在html里面该怎么写了。
<a [routerLink]="[/article, '1', {queryParams: {keywords: angular}}]">查询文章列表关键词Angular</a>
会自动编译成
<a href="/article/1?keywords=angular">查询文章列表关键词Angular</a>
```

## js写法
