<template>
  <main class="g-server-error">
    <h1>500</h1>
    <h3>内部服务器错误</h3>
    <p class="error-desc">
      服务器遇到意外事件，不允许完成请求。
      我们抱歉。
      你可以回到主页面：
    </p>
    <!--<router-link class="btn btn-primary m-t" v-if="!item.items" :to="{'name': 'dashboard'}">Dashboard</router-link>-->
  </main>
</template>
<script>
  export default {
  }
</script>
<style lang="postcss">
  .g-server-error{
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
