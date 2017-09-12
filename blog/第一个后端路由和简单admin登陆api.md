# 路由
> 路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。

我们在项目前期规划，前后分离，后端只是做一个入口页面提供，其他都是前端来渲染页面，后端提供api接口。
我们在routes文件下新建了admin.js和web.js；
## admin.js
> 主要处理admin相关路由信息。

新引入相关依赖
```
import * as Express from 'express';
const Router = Express.Router();
```
引入Express框架，获取Express下Router方法。

定义一个路由
```
Router.get('/', function(req: Express.Request, res: Express.Response) {
    res.render('admin', { title: "admin-jianshu", name: "admin-jianshu" });
});
```
路由定义规则
Router.get(path, callback)
path 是服务器上的路径

callback 是当路由匹配时要执行的函数。

定义了接口（这是typescript申明）
> req: Express.Request, res: Express.Response
## 请求信息
> req: Express.Request

方法 | 描述 
--|-- 
req.param()  | 获得参数：1）express路由器传递的参数; 2）地址栏参数；3）postt提交的参数，例如表单中input的值， ajax（异步）提交的对象值等。 
req.params | 获取参数：1）express路由器传递的参数；2）与req.params配合还能在express路由器中玩正则；3）如果没在路由器设置参数， 则req.params获得的值为空对象 {}； 
req.query | 获取参数：1）直接获取地址栏传递的参数；2）如果地址栏没传递参数， req.query获得的值也是空对象{}； 
req.body | 获取参数：1）该属性主要用与post方法时传递参数使用，需要导入“body-parser”，并且设置；2）req.body可以接收异步传递的参数；3）如果post给后台没有传递任何参数时， req.body的值当然也是空对象{}；


## 响应对象
> res: Express.Response

方法 | 描述
--|--
res.download() | 提示下载文件。
res.end() | 终结响应处理流程。
res.json() | 发送一个 JSON 格式的响应。
res.jsonp() | 发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect() | 重定向请求。
res.render() | 渲染视图模板。
res.send() | 发送各种类型的响应。
res.sendFile | 以八位字节流的形式发送文件。
res.sendStatus() | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

### 渲染模板
res.render(template, data);
```
res.render('admin', { title: "admin-jianshu", name: "admin-jianshu" });
```
然后创建一个路由渲染 admin.ejs 文件。如果没有设置 view engine，您需要指明视图文件的后缀，否则就会遗漏它。

template: 就是模板文件名称，可以忽略文件后缀名

data：传递给模板显示的数据


最后导出路由模块
```
export function admin(app) {
    app.use('/admin', Router);
}
```
将路由挂载到/admin下，在浏览器访问http://localhost:3000/admin/就可以看到页面输出admin-jianshu；

在添加admin相关路由可以直接这样书写
Router.get('/login', function(req: Express.Request, res: Express.Response) {
    res.render('login', { title: "admin-login", name: "admin-login" });
});

## web.js
> 处理web页面路由

web页面路由和admin路由类似，只有导出不一样
```
export function web(app) {
    app.use('/', Router);
}
```
将路由挂载到根目录/下，在浏览器访问http://localhost:3000/就可以看到页面输出jianshu；

导出模块以后，在入口页面需要接收
app.js引入路由模块
```
import * as routesAdmin from "./routes/admin";
import * as routesWeb from "./routes/web";
```
挂载到app上
```
routesWeb.web(app);
routesAdmin.admin(app);
```
这样路由就完成
# API接口
> api接口和路由原理一样，也是访问一个链接，后台通过这个链接做相应的处理，返回对应状态和数据。

我们项目需要实现Restful API设计，Express天生支持。(Express官网示例)

```
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
```
我们将所有的API接口全部放在api文件夹下，创建对应的版本目前是v1。
> 为什么这么设计，为以后版本更新，方便维护管理。

api文件下index.js作为api入口文件，做相应的配置和管理。

首先引入相应的依赖文件
```
import * as Express from 'express';
const Router = Express.Router();
import * as Login from './v1/login';
```
和路由类似

管理API接口（接下来api都以此形式引入）
```
Login.adminlogin(Router);
```

导出模块
```
export function index(app) {
    // 处理跨域问题
    app.all('*',function (req: Express.Request, res: Express.Response, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

        if (req.method == 'OPTIONS') {
            res.sendStatus(200); //让options请求快速返回
        } else {
            next();
        }
    });
    // 设置api
    app.use('/api/v1', Router);
}
```
将api挂载到/api/v1，访问地址http://localhost:3000/api/v1/*

> 因为前后分离，服务端和前端页面不在一个服务器下，会出现跨域访问限制，在页面里设置权限，开发时候使用，
项目发布以后，需要将此处清除。

写了第一个api接口，admin登陆使用
```
url      http://localhost:3000/api/v1/login
method   post
response 'hello world'
```
目前服务端已经运行正常，通过api测试工具，可以正常访问接口，返回数据。接下来做前后api对接调试。
