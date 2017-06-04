<template>
  <div class="w-simple-table">
    <div class="ant-spin-nested-loading">
      <div class="ant-spin-container">
        <div class="ant-table ant-table-default ant-table-bordered ant-table-scroll-position-left">
          <div class="ant-table-title">Here is title</div>
          <div class="ant-table-content">
            <div class="ant-table-body">
              <table class="">
                <colgroup>
                  <col>
                  <col v-for="col of columns" v-bind:style="{width: col.width + 'px', minWidth: col.width + 'px'}">
                </colgroup>
                <thead class="ant-table-thead">
                  <tr>
                    <th class="ant-table-selection-column">
                      <span>
                        <div class="ant-table-selection">
                          <label class="ant-checkbox-wrapper">
                            <span class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value="on"><span
                      class="ant-checkbox-inner"></span></span></label></div></span></th>
                    <th v-for="col of columns" v-bind:class="[col.className]"><span v-text="col.title"></span></th>
                  </tr>
                </thead>
                <tbody class="ant-table-tbody">
                  <tr class="ant-table-row  ant-table-row-level-0" v-for="row of dataSource">
                    <td class="ant-table-selection-column"><span><label class="ant-checkbox-wrapper"><span
                      class="ant-checkbox"><input type="checkbox" class="ant-checkbox-input" value="on"><span
                      class="ant-checkbox-inner"></span></span></label></span></td>
                    <td v-for="col of columns" v-bind:class="[col.className]" v-bind-render="col.render(row, col)"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="ant-table-footer">Here is footer</div>
          </div>
        </div>
        <pagination></pagination>
    </div>
  </div>
</template>
<script>
  import Pagination from '../pagination/Pagination'

  export default {
    components: {
      Pagination
    },
    props: {
      // 数据数组
      dataSource: {
        type: Array,
        default: []
      },
      // 分页配置
      pagination: {
        type: Object,
        default: {}
      },
      // 表格列的配置描述
      columns: {
        type: Array,
        default: []
      },
      // 页面是否加载中
      loading: {
        type: Boolean,
        default: false
      },
      // 默认文案设置，目前包括排序、过滤、空数据文案
      locale: {
        type: Object,
        default: {
          filterConfirm: '确定',
          filterReset: '重置',
          emptyText: '暂无数据'
        }
      },
      // 列表项是否可选择
      rowSelection: {
        type: Object,
        default: {
          'type': {
            type: String,
            default: 'checkbox'
          },
          selectedRowKeys: {
            type: Array,
            default: []
          }
        }
      }
    },
    directives: {
      bindRender: {
        bind: function (el, binding, vnode) {
          console.log(el, binding, vnode)
          el.innerHTML = binding.value
        }
      }
    },
    data () {
      return {
        pages: [],
        page: 1
      }
    },
    created: function () {
      console.log('dataSource', this.dataSource)
      console.log('columns', this.columns)
    },
    methods: {

    }
  }
</script>
<style scoped lang="postcss">
  @import "./SimpleTable.css";
</style>
