<template>
  <transition :name="$router.app.pageTransition">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
    created: function () {
      console.log('app created')
    }
  }
</script>

<style lang="postcss">
  @import "./assets/joc.css";
  /*right start*/
  .slide-right-enter-active {
    transition: all .4s ease;
  }

  .slide-right-enter {
    opacity: 0.9;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }

  .slide-right-leave {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  .slide-right-leave-active {
    transition: all .4s ease;
    opacity: .5;
    transform: translate3d(-20%, 0, 0);
    -webkit-transform: translate3d(-20%, 0, 0);
  }
  /*right end*/
  /*left start*/
  .ms-page.slide-left-enter-active {
    transition: all .4s ease;
    transform: translate3d(0%, 0, 0);
    -webkit-transform: translate3d(0%, 0, 0);
    z-index: 1998;
  }

  .ms-page.slide-left-enter {
    opacity: .5;
    transform: translate3d(-20%, 0, 0);
    -webkit-transform: translate3d(-20%, 0, 0);
    z-index: 1998;
  }

  .ms-page.slide-left-leave {
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
  }

  .ms-page.slide-left-leave-active {
    transition: all .4s ease;
    opacity: 0.9;
    transform: translate3d(100%, 0, 0);
    -webkit-transform: translate3d(100%, 0, 0);
  }
  /*left end*/
  .slide-fade-enter-active {
    transition: all .4s ease;
  }

  .slide-fade-leave-active {
    transition: all .4s ease;
  }

  .slide-fade-enter,
  .slide-fade-leave-active {
    padding-left: 10px;
    opacity: 0;
  }
</style>
