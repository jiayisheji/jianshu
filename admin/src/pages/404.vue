<template>
  <main class="g-not-found">
    <h1>404</h1>
    <h3>找不到网页</h3>
    <p>
      对不起，您正在寻找的页面已经找到。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
    </p>
    <router-link class="btn btn-primary" :to="{'name': 'dashboard'}">Dashboard</router-link>
  </main>
</template>
<script>
  export default {
  }
</script>
<style lang="postcss">
  .g-not-found{
    max-width: 400px;
    z-index: 100;
    margin: 0 auto;
    text-align: center;
    padding-top: 40px;
    & h1{
      font-size: 170px;
    }
    & h3{
      font-size: 16px;
      font-weight: 500;
    }
    & p{

    }
  }
</style>
