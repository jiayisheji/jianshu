<template>
  <div class="g-view">
    <h1>Dashboard</h1>
    <Pagination :current="current" :total="total" v-on:onChange="page(page)"></Pagination>
  </div>
</template>
<script>
  import Pagination from '../../components/pagination/Pagination'
  export default {
    components: {
      Pagination
    },
    data () {
      return {
        current: 6,
        total: 100
      }
    },
    created: function () {
      console.log('page Dashboard')
    },
    methods: {
      page: function (page) {
        console.log('page', arguments[0])
      }
    }
  }
</script>
<style scoped lang="postcss">
</style>
