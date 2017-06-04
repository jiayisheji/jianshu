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
            <button @click="upload(item._id)">编辑</button>
            <button @click="remove(item._id)">删除</button>
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
    <simple-table v-bind:data-source="list" v-bind:columns="columns"></simple-table>
  </div>
</template>
<script>
  import SimpleTable from '../../components/simpleTable/SimpleTable'

  export default {
    components: {
      SimpleTable
    },
    data () {
      return {
        list: [],
        total: 0,
        current: 1,
        title: '',
        columns: [
          {
            title: '标题',
            filters: 'title',
            width: 200,
            className: 'a',
            render: function (row, col) {
              return '<span>' + row.title + '</span>'
            }
          },
          {
            title: '操作',
            width: 300,
            className: 'a',
            render: function (row, col) {
              console.log('render', row, col)
              return `<button @click="upload(row._id)">编辑</button>
                      <button @click="remove(row._id)">删除</button>
                      <button @click="details(row)">详情</button>`
            }
          }
        ]
      }
    },
    created: function () {
      console.log('page Dashboard', this.$route.params.page, this.$route)
      this.getList()
    },
    methods: {
      getList: function () {
        console.log(this.$route.params)
        this.$http.get('/api/v1/admin/article', {
          params: this.$route.params
        }).then(response => {
          // success callback
          this.list = response.data.data
          this.total = response.data.total
        }, response => {
          // error callback
        })
      },
      addList: function () {
        this.$http.post('/api/v1/admin/article', {title: this.title, published: true}).then(response => {
          // success callback

          if (response.data.code === 0) {
            this.getList()
            this.title = ''
          } else {
            console.log(response.data.message)
          }
        }, response => {
          // error callback
        })
      },
      upload: function (id) {
        console.log(id)
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
        this.$http.get('/api/v1/admin/article/' + item._id).then(response => {
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
