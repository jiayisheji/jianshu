# 使用vue-cli构建vue项目

## Node.js安装
> 如果没有安装就去[安装](https://nodejs.org/en/download/)

## 安装vue-cli

> npm install -g vue-cli

## 初始化一个vue项目

1. 进入跟目录
2. 打开cmd
3. vue init webpack admin
> 注意默认是vue2
4. 等待loading 
5. 填写项目名称，描述，作者
6. 选择是否安装路由，yes
7. 是否启用eslint代码检查，我们用Standard模式。
8. 是否要单元测试和端到端测试，要，反正也不会写。
9. cd admin && npm install。
10. 等待安装
11. npm run dev
12. 等待编译自动打开浏览器
> 你看到vuelogo+Welcome to Your Vue.js App，恭喜你安装成功
13. 安装剩余依赖
> 默认只有vue源文件和路由，我们还需要状态管理[vuex](https://vuex.vuejs.org/zh-cn/)状态管理、
和后台数据[vue-resource](https://github.com/pagekit/vue-resource)、UI组件[element](https://github.com/ElemeFE/element)
```
npm install vuex --save
npm install vue-resource --save
npm install element-ui --save
```
> 我们目前只需要这几个以后需要在添加








