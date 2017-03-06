> 古人云：工欲善其事，必先利其器。我们写项目也是一样，准备工具。使用webstorm写代码。Chrome调试预览。

## 遇到第一个问题

> vue-lic使用.vue文件编写组件component，默认webstorm不支持需要添加插件，不知道为什么找不到vue插件，那么只能手动捣鼓。
```
乍一看.vue文件的编写结构
<template>html-模板
<style>css-样式
<script>js-脚本
```
> 这个html一样。通过webstorm中的File Types配置 将.vue格式的文件注册为HTML文件类型,这样html中的代码提示也会被用到.vue上；

## 解决第二个问题

> 我们每次创建一个空文件需要写template、style、script太麻烦，使用webstorm另一个功能创建文件模板。
```
<template>
// html
</template>
<script>
// js
</script>
<style scoped lang="postcss">
// css
</style>
```
scoped：表示当前的样式只作用到当前组件中。

lang：选择css预处理器
> 选择对应的预处理需要安装webpack对应的*-loader。本项目使用postcss

```
npm install postcss-loader --save-dev
```

## 快速开始

> 学习任何一门语言、任何一个新框架都是从hello world开始，我们也不例外，页面输出hello world完成我们第一步。

## 下次计划

> 下一步创建一个登陆页面和整个项目路由规划

## 补充postcss-loader相关问题
> 默认cli里面配置postcss比较简单，完全不能满足开发需求。需要从新配置一下。

配置文件在/admin/build/vue-loader.conf.js文件最底部
默认是这样：
~~~
postcss: [
    require('autoprefixer')({ browsers: ['last 2 versions'] })
  ]
~~~
这个一个最基本浏览器兼容补全
如果想要功能强大需要几个插件，如下：
```
# cssnext可以让你写CSS4的语言，并能配合autoprefixer进行浏览器兼容的不全，而且还支持嵌套语法
$ npm install postcss-cssnext --save-dev
# 浏览器兼容补全
$ npm install autoprefixer --save-dev

# 类似scss的语法，实际上如果只是想用嵌套的话有cssnext就够了
$ npm install precss --save-dev

# 在@import css文件的时候让webpack监听并编译
$ npm install postcss-import --save-dev
```
现在需要配置成如下：
```
postcss: [
    require('precss'),
    require('postcss-import')({ addDependencyTo: webpack }),
    require('postcss-cssnext')({"autoprefixer": {"browsers": "ie >= 10, ..."}})
]
```
我们就想scss一样玩耍了，这样css里面会有很多报错信息。

### 资源

#### postcss & loader

- [postcss](https://github.com/postcss/postcss)
- [postcss-loader](https://github.com/postcss/postcss-loader)
- [postcss-import](https://github.com/postcss/postcss-import)

#### autoprefixer & cssnext

- [precss](https://github.com/jonathantneal/precss)
- [cssnext](http://cssnext.io/)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [browserslist](https://github.com/ai/browserslist)

#### stylelint

- [stylelint](https://github.com/stylelint/stylelint)
- [stylelint-webpack-plugin](https://github.com/vieron/stylelint-webpack-plugin)
- [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)
- [postcss-reporter](https://github.com/postcss/postcss-reporter)
