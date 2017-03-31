<template>
  <li class="sidebar-sublist-item" title="">
    <a class="sidebar-list-link" v-if="item.items" href="javascript:;" @click="toggle()">
      <i class="iocn-home"></i>
      <span v-text="item.title"></span>
      <b class="icon-down" v-if="item.items"></b>
    </a>
    <router-link v-if="!item.items" :to="{'name': item.link.name, 'params': item.link.params}"><span
      v-text="item.title"></span></router-link>
    <ul class="sidebar-sublist" v-if="item.items" v-show="open">
      <side-menu-item v-for="subitem of item.items" v-bind:item="subitem"></side-menu-item>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'side-menu-item',
    props: {
      'item': {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        open: true
      }
    },
    created: function () {
      console.log('sideMenu created')
    },
    methods: {
      toggle: function () {
        console.log(1)
        this.open = !this.open
      }
    }
  }
</script>
<style lang="postcss">

</style>
