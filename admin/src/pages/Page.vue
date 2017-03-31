<template>
  <div id="page" class="g-page">
    <top-bar></top-bar>
    <side-bar></side-bar>
    <main class="g-main">
      <transition :name="$router.app.pageTransition">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>
<script>
  import topBar from '../components/topBar/topBar'
  import sideBar from '../components/sideBar/sideBar'
  export default {
    components: {
      topBar,
      sideBar
    },
    created: function () {
      console.log('page created')
    }
  }
</script>
<style lang="postcss">
  .g-page{
    min-height: 100%;
    position: relative;
    font: 14px/16px "Roboto",sans-serif;
    background-color: #F0F3F4;
  }
  .g-page::before{
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(../assets/img/bg.jpg) no-repeat center center;
    background-size: cover;
    will-change: transform;
    z-index: 0;
  }
  .g-main{
    margin-left: 180px;
    padding: 66px 0 34px 0;
    min-height: 500px;
    position: relative;
  }
  .g-view{
    padding: 8px 32px 8px 40px;
  }
</style>
