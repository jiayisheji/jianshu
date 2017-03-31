<template>
  <aside class="w-sidebar" sidebarresize="">
    <side-menu></side-menu>
  </aside>
</template>
<script>
  import sideMenu from './sideMenu'
  export default {
    components: {
      sideMenu
    },
    created: function () {
      console.log('sideBar created')
    }
  }
</script>
<style lang="postcss">
  .w-sidebar {
    width: 180px;
    top: 66px;
    left: 0;
    z-index: 1001;
    display: block;
    min-height: 100%;
    background-color: #282828;
    height: 100%;
    position: fixed;
  }
</style>
