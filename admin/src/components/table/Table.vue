<template>
  <ul class="w-pagination" role="menu">
    <li title="Previous Page" class=" w-pagination-prev" :class="{'w-pagination-disabled': noPrevious()}" @click="changehandler(page - 1)"><a></a></li>
    <li class="w-pagination-item" v-for="item of pages" @click="changehandler(item.number)" :class="{'w-pagination-item-active': item.active}">
      <a v-text="item.text"></a>
    </li>
    <li title="Next Page" class="w-pagination-next" :class="{'w-pagination-disabled': noNext()}" @click="changehandler(page + 1)"><a></a></li>
    <!--<li title="Previous Page" class=" w-pagination-prev"><a></a></li>
    <li title="1" class="w-pagination-item w-pagination-item-1" @click="changehandler(30)"><a>1</a></li>
    <li title="Previous 5 Pages" class="w-pagination-jump-prev"><a></a></li>
    <li title="8" class="w-pagination-item w-pagination-item-8 w-pagination-item-after-jump-prev"><a>8</a></li>
    <li title="9" class="w-pagination-item w-pagination-item-9"><a>9</a></li>
    <li title="10" class="w-pagination-item w-pagination-item-10 w-pagination-item-active"><a>10</a></li>
    <li title="11" class="w-pagination-item w-pagination-item-11"><a>11</a></li>
    <li title="12" class="w-pagination-item w-pagination-item-12 w-pagination-item-before-jump-next"><a>12</a>
    </li>
    <li title="Next 5 Pages" class=w-pagination-jump-next"><a></a></li>
    <li title="50" class="w-pagination-item w-pagination-item-50"><a>50</a></li>
    <li title="Next Page" class="w-pagination-next"><a></a></li>-->
    <!--<div class="w-pagination-options">
      <div class="w-pagination-options-size-changer w-selectw-select-enabled">
        <div class="w-select-selection w-select-selection&#45;&#45;single" role="combobox" aria-autocomplete="list"
             aria-haspopup="true"
             aria-expanded="false" tabindex="0">
          <div class="w-select-selection__rendered">
            <div class="w-select-selection-selected-value" title="30 / page" style="display: block; opacity: 1;">30 /
              page
            </div>
          </div>
          <span class="w-select-arrow" unselectable="unselectable" style="user-select: none;"><b></b></span></div>
      </div>
    </div>
    <div class="w-pagination-options">
      <div class="w-pagination-options-quick-jumper">Goto<input
        type="text" value="10"></div>
    </div>-->
  </ul>
</template>
<script>
  import {getPages} from './getPages'

  export default {
    props: {
      dataSource: {
        type: Array,
        default: []
      }, 
      //当前页
      current: {
        type: Number,
        default: 1
      },
      // 数据总数
      total: {
        type: Number,
        default: 0
      },
      // 页码改变回调
      onChange: {
        type: Function,
        default: function () {
        }
      },
      // 每页多少
      pageSize: {
        type: Number,
        default: 10
      },
      // 是否可以改变 pageSize
      showSizeChanger: {
        type: Boolean,
        default: false
      },
      // 指定每页可以显示多少条
      pageSizeOptions: {
        type: Array,
        default: [10, 20, 30, 40, 50]
      },
      // pageSize 变化的回调
      onShowSizeChange: {
        type: Function,
        default: function () {
        }
      },
      // 是否可以快速跳转至某页
      showQuickJumper: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        pages: [],
        page: 1
      }
    },
    created: function () {
      this.page = this.current
      this.pages = getPages(this.current, this.total)
      console.log('page pagination', this.pages)
    },
    methods: {
      changehandler: function (page) {
        if (this.page !== page && page > 0 && page <= this.total) {
          this.page = page
          this.pages = getPages(page, this.total)
        }
        //this.$emit('onChange', [page])
      },
      noPrevious: function () {
        return this.page === 1
      },
      noNext: function () {
        return this.page === this.total
      }
    }
  }
</script>
<style lang="postcss">
  .w-pagination {
    list-style: none;
    font-size: 12px;
    &:after {
      content: " ";
      display: block;
      height: 0;
      clear: both;
      overflow: hidden;
      visibility: hidden
    }
    &-total-text {
      float: left;
      height: 30px;
      line-height: 30px;
      margin-right: 10px
    }
    &-item{
       cursor: pointer;
       border-radius: 4px;
       user-select: none;
       min-width: 28px;
       height: 28px;
       line-height: 28px;
       text-align: center;
       float: left;
       border: 1px solid #d9d9d9;
       background-color: #fff;
       margin-right: 8px;
       font-family: Arial;
       & a{
         text-decoration: none;
         color: rgba(0, 0, 0, .65);
         -webkit-transition: none;
         transition: none;
         margin: 0 6px
       }
        &:hover{
           -webkit-transition: all .3s ease;
           transition: all .3s ease;
           border-color: #108ee9;
           & a{
               color: #108ee9
             }
         }
        &-active{
           background-color: #108ee9;
           border-color: #108ee9;
            &:hover a,& a{
                color: #fff;
            }
         }
     }
    &-jump-next:after,&-jump-prev:after{
       content: "\2022\2022\2022";
       display: block;
       letter-spacing: 2px;
       color: rgba(0, 0, 0, .25);
       text-align: center
    }
    &-jump-next:hover:after,&-jump-prev:hover:after{
       color: #108ee9;
       display: inline-block;
       font-size: 12px;
       font-size: 8px \9;
       transform: scale(.66666667) rotate(0deg);
       zoom: 1;
       letter-spacing: -1px;
       font-family: anticon
    }
    &-jump-prev:hover:after {
      content: "\E620\E620"
    }
    &-jump-next:hover:after {
      content: "\E61F\E61F"
    }
  }

  :root .w-pagination-jump-next:hover:after, :root .w-pagination-jump-prev:hover:after {
    -webkit-filter: none;
    filter: none;
    font-size: 12px
  }

  .w-pagination-jump-next, .w-pagination-jump-prev, .w-pagination-prev {
    margin-right: 8px
  }

  .w-pagination-jump-next, .w-pagination-jump-prev, .w-pagination-next, .w-pagination-prev {
    font-family: Arial;
    cursor: pointer;
    color: rgba(0, 0, 0, .65);
    border-radius: 4px;
    list-style: none;
    min-width: 28px;
    height: 28px;
    line-height: 28px;
    float: left;
    text-align: center;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    display: inline-block
  }

  .w-pagination-next, .w-pagination-prev {
    border: 1px solid #d9d9d9;
    background-color: #fff
  }

  .w-pagination-next a, .w-pagination-prev a {
    color: rgba(0, 0, 0, .65)
  }

  .w-pagination-next a:after, .w-pagination-prev a:after {
    display: inline-block;
    font-size: 12px;
    font-size: 8px \9;
    -webkit-transform: scale(.66666667) rotate(0deg);
    -ms-transform: scale(.66666667) rotate(0deg);
    transform: scale(.66666667) rotate(0deg);
    zoom: 1;
    display: block;
    height: 26px;
    line-height: 26px;
    font-family: anticon;
    text-align: center
  }

  :root .w-pagination-next a:after, :root .w-pagination-prev a:after {
    -webkit-filter: none;
    filter: none;
    font-size: 12px
  }

  .w-pagination-next:hover, .w-pagination-prev:hover {
    border-color: #108ee9
  }

  .w-pagination-next:hover a, .w-pagination-prev:hover a {
    color: #108ee9
  }

  .w-pagination-prev a:after {
    margin-top: -.5px;
    content: "\E620";
    display: block
  }

  .w-pagination-next a:after {
    content: "\E61F";
    display: block
  }

  .w-pagination-disabled {
    cursor: not-allowed
  }

  .w-pagination-disabled:hover {
    border-color: #d9d9d9
  }

  .w-pagination-disabled:hover a {
    color: rgba(0, 0, 0, .25);
    cursor: not-allowed
  }

  .w-pagination-disabled a {
    color: rgba(0, 0, 0, .25)
  }

  .w-pagination-slash {
    margin: 0 10px 0 5px
  }

  .w-pagination-options {
    float: left;
    margin-left: 15px
  }

  .w-pagination-options-size-changer {
    float: left;
    margin-right: 10px
  }

  .w-pagination-options-quick-jumper {
    float: left;
    height: 28px;
    line-height: 28px
  }

  .w-pagination-options-quick-jumper input {
    position: relative;
    display: inline-block;
    padding: 4px 7px;
    width: 100%;
    height: 28px;
    cursor: text;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, .65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all .3s;
    transition: all .3s;
    margin: 0 8px;
    width: 50px
  }

  .w-pagination-options-quick-jumper input::-moz-placeholder {
    color: #ccc;
    opacity: 1
  }

  .w-pagination-options-quick-jumper input:-ms-input-placeholder {
    color: #ccc
  }

  .w-pagination-options-quick-jumper input::-webkit-input-placeholder {
    color: #ccc
  }

  .w-pagination-options-quick-jumper input:hover {
    border-color: #49a9ee
  }

  .w-pagination-options-quick-jumper input:focus {
    border-color: #49a9ee;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(16, 142, 233, .2)
  }

  .w-pagination-options-quick-jumper input[disabled] {
    background-color: #f7f7f7;
    opacity: 1;
    cursor: not-allowed;
    color: rgba(0, 0, 0, .25)
  }

  .w-pagination-options-quick-jumper input[disabled]:hover {
    border-color: #e2e2e2
  }

  .textareaw-pagination-options-quick-jumper input {
    max-width: 100%;
    height: auto;
    vertical-align: bottom
  }

  .w-pagination-options-quick-jumper .input-lg {
    padding: 6px 7px;
    height: 32px
  }

  .w-pagination-options-quick-jumper .input-sm {
    padding: 1px 7px;
    height: 22px
  }

  .w-pagination-simple .w-pagination-next, w-pagination-simple .w-pagination-prev {
    border: 0;
    height: 24px;
    line-height: 24px;
    margin: 0;
    font-size: 18px
  }

  .w-pagination-simple .w-pagination-simple-pager {
    float: left;
    margin-right: 8px
  }

  .w-pagination-simple .w-pagination-simple-pager input {
    margin: 0 8px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
    outline: none;
    padding: 5px 8px;
    width: 30px;
    height: 24px;
    text-align: center;
    -webkit-transition: border-color .3s ease;
    transition: border-color .3s ease
  }

  .w-pagination-simple .w-pagination-simple-pager input:hover {
    border-color: #108ee9
  }

  .w-pagination.mini .w-pagination-total-text {
    height: 20px;
    line-height: 20px
  }

  .w-pagination.mini .w-pagination-item, w-pagination.mini .w-pagination-next, w-pagination.mini .w-pagination-prev {
    border: 0;
    margin: 0;
    min-width: 20px;
    height: 20px;
    line-height: 20px
  }

  .w-pagination.mini .w-pagination-jump-next, .w-pagination.mini .w-pagination-jump-prev, .w-pagination.mini .w-pagination-next a:after, w-pagination.mini w-pagination-prev a:after {
    height: 20px;
    line-height: 20px
  }

  .w-pagination.mini .w-pagination-options {
    margin-left: 8px
  }

  .w-pagination.mini .w-pagination-options-quick-jumper {
    height: 20px;
    line-height: 20px
  }

  .w-pagination.mini .w-pagination-options-quick-jumper input {
    padding: 1px 7px;
    height: 22px;
    width: 44px
  }

  @media only screen and (max-width: 1024px) {
    .w-pagination-item-after-jump-prev, .w-pagination-item-before-jump-next {
      display: none
    }
  }

</style>