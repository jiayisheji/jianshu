<template>
  <div>
    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 247px;">
      <ul baslimscroll="" class="sidebar-list">
        <side-menu-item v-for="item of menus" v-bind:item="item"></side-menu-item>
      </ul>
      <div class="slimScrollBar"></div>
      <div class="slimScrollRail"></div>
    </div>
    <div class="sidebar-hover-elem show-hover-elem"></div>
  </div>
</template>
<script>
  import sideMenuItem from './sideMenuItem'
  export default {
    components: {
      sideMenuItem
    },
    data () {
      return {
        menus: [
          {
            'title': '控制台',
            'link': {
              'name': 'dashboard'
            }
          },
          {
            'title': '文章管理',
            'items': [
              {
                'title': '列表',
                'link': {
                  'name': 'articlelist',
                  'params': {
                    'page': 1
                  }
                }
              },
              {
                'title': '分组',
                'link': {
                  'name': 'articlegroup',
                  'params': {
                    'page': 1
                  }
                }
              }
            ]
          }
        ]
      }
    },
    created: function () {
      console.log('sideMenu created')
    }
  }
</script>
<style lang="postcss">

</style>
