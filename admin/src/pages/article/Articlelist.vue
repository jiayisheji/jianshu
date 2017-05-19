<template>
  <div class="g-view">
    <ol class="breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">Library</a></li>
      <li class="active">Data</li>
    </ol>
    <h1>Articlelist</h1>
    <ul>
      <li v-for="item of list">
        <dl>
          <dt>
            <span v-text="item.title"></span>
            <button @click="upload(item.id)">编辑</button>
            <button @click="remove(item.id)">删除</button>
            <button @click="details(item)">详情</button>
          </dt>
          <dd v-if="item.more">
            详情：
            <p v-text="item.more.title"></p>
          </dd>
        </dl>
      </li>
    </ul>
    <input type="text" v-model="title" id="">
    <button @click="addList()">添加</button>
  </div>
</template>
<script>
  export default {
    components: {},
    data () {
      return {
        list: [],
        title: ''
      }
    },
    created: function () {
      console.log('page Dashboard', this.$route.params.page, this.$route)
      this.getList()
    },
    methods: {
      getList: function () {
        this.$http.get('/api/v1/admin/article', {
          params: this.$route.params
        }).then(response => {
          // success callback
          this.list = response.data.data
        }, response => {
          // error callback
        })
      },
      addList: function () {
        this.$http.post('/api/v1/admin/article', {title: this.title, id: Date.now()}).then(response => {
          // success callback
          this.getList()
          this.title = ''
        }, response => {
          // error callback
        })
      },
      upload: function (id) {
        this.$http.put('/api/v1/admin/article/' + id, {title: 'xinjia s'}).then(response => {
          // success callback
          this.getList()
        }, response => {
          // error callback
        })
      },
      details: function (item) {
        if (item.more) {
          return
        }
        this.$http.get('/api/v1/admin/article/' + item.id).then(response => {
          // success callback
          this.$set(item, 'more', response.data.data)
          console.log(item)
        }, response => {
          // error callback
        })
      },
      remove: function (id) {
        this.$http.delete('/api/v1/admin/article/' + id).then(response => {
          // success callback
          this.getList()
        }, response => {
          // error callback
        })
      }
    }
  }
</script>
<style scoped lang="postcss">
</style>
