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
