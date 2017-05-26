// 引入模板
import Login from 'pages/Login'
import Register from 'pages/Register'
import Page from 'pages/Page'
import Dashboard from 'pages/dashboard/Dashboard'
import Articlelist from 'pages/article/Articlelist'
import Articlegroup from 'pages/article/Articlegroup'
import Notfound from 'pages/404'
import Servererror from 'pages/500'
// 过度子路由
import Subroute from 'pages/frame/Subroute'
// 配置路由
export default [
  {
    path: '/',            // 默认路由
    name: 'home',
    redirect: {
      name: 'login'
    }
  },
  {
    path: '/login',       // 登陆路由
    name: 'login',
    component: Login
  },
  {
    path: '/register',       // 注册路由
    name: 'register',
    component: Register
  },
  {
    path: '/pages',        // 页面路由
    component: Page,
    meta: {
      requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: '',
        redirect: {
          name: 'dashboard'
        }
      },
      {
        path: 'dashboard',      // 控制台
        name: 'dashboard',
        component: Dashboard,
        meta: {
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        }
      },
      {
        path: 'article',       // 文章管理
        component: Subroute,
        meta: {
          requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
        },
        children: [
          {
            path: 'list/:page',    // 列表
            name: 'articlelist',
            component: Articlelist
          },
          {
            path: 'group/:page',    // 分组
            name: 'articlegroup',
            component: Articlegroup
          }
        ]
      }
      /*{
       path: 'user',       // 会员管理
       name: 'user',
       component: Page,
       children: [
       {
       path: 'list/:page',    // 列表
       name: 'userlist',
       component: Page
       },
       {
       path: 'add',           // 添加会员
       name: 'adduser',
       component: Page
       },
       {
       path: 'details/:id',    // 会员详情
       name: 'userdetails',
       component: Page
       }
       ]
       }
       ,
       {
       path: 'comment',       // 评论管理
       name: 'comment',
       component: Page,
       children: [
       {
       path: 'list/:page',    // 列表
       name: 'commentlist',
       component: Page
       }
       ]
       }
       ,
       {
       path: 'role',       // 权限管理
       name: 'role',
       component: Page,
       children: [
       {
       path: 'list/:page',    // 列表
       name: 'rolelist',
       component: Page
       },
       {
       path: 'add',    // 添加权限
       name: 'addrole',
       component: Page
       }
       ]
       }
       ,
       {
       path: 'member',       // 账号管理
       name: 'member',
       component: Page,
       children: [
       {
       path: 'list/:page',    // 列表
       name: 'memberlist',
       component: Page
       },
       {
       path: 'add',    // 添加账号
       name: 'addmember',
       component: Page
       }
       ]
       }
       ,
       {
       path: 'system',       // 系统管理
       name: 'system',
       component: Page,
       children: [
       {
       path: 'profile',    // 资料修改
       name: 'profile',
       component: Page
       },
       {
       path: 'setting',    // 系统设置
       name: 'setting',
       component: Page
       },
       {
       path: 'modpas',    // 修改密码
       name: 'modpas',
       component: Page
       }
       ]
       }
       */
    ]
  },
  {
    path: '/404',       // 找不到资源
    name: '404',
    component: Notfound
  },
  {
    path: '/500',       // 服务器错误
    name: '500',
    component: Servererror
  },
  {
    path: '*',
    redirect: {
      name: '404'
    }
  }
]
