<template>
<div class="m-6">
    <div class="mb-6">
        <vue-ads-table-tree
            :columns="columns"
            :async-call="asyncCall"
            :rows="rows"
            :items-per-page="2"
        >
            <template>
                <h2
                    class="block pl-3 leading-normal"
                >
                    Belgian Royal family tree
                </h2>
            </template>
            <template slot="pagination" slot-scope="props">
                Items {{ props.range.start}} till {{ props.range.end }} - Total: {{ props.range.total }}
            </template>
            <template slot="handle" slot-scope="props">
                <el-button type="text">新增</el-button>
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
            </template>
        </vue-ads-table-tree>
    </div>
</div>
</template>

<script>
import VueAdsTableTree from 'vue-ads-table-tree'
import cgiService from '../../api/cgiService'
export default {
  data () {
    return {
      columns: [
        {
          property: 'pagename',
          title: 'pagename',
          sortable: true
        },
        {
          property: 'pageurl',
          title: 'url',
          sortable: true
        },
        {
          property: 'status',
          title: 'status'
        },
        {
          property: 'sort',
          title: 'sort'
        },
        {
          property: 'handle',
          title: '操作'
        }
      ],
      rows: []
    }
  },
  methods: {
    async asyncCall (range, filter, sortColumns, parent) {
      await cgiService.PagesOperationPageTree().then(res => {
        this.rows = res.data
      })

      let startRows = this.rows
      if (parent) {
        startRows = this.rows.slice(1, 3)
      }

      let filteredRows = this.filter(startRows, filter)
      let sortedRows = this.sort(filteredRows, sortColumns)

      let rows = parent ? sortedRows : sortedRows.slice(range.start % 10, range.end % 10)

      return {
        total: filteredRows.length,
        rows
      }
    },

    filter (rows, filter) {
      let regex = new RegExp(filter, 'i')

      return rows.filter(row => {
        return regex.test(row.firstName) || regex.test(row.lastName)
      })
    },

    sort (rows, sortColumns) {
      let sortedRows = rows

      sortColumns.forEach(sortColumn => {
        if (sortColumn.direction === null) {
          return
        }

        sortedRows.sort((a, b) => {
          a = a[sortColumn.property]
          b = b[sortColumn.property]

          if (a < b) {
            return sortColumn.direction ? -1 : 1
          }

          if (a > b) {
            return sortColumn.direction ? 1 : -1
          }

          return 0
        })
      })

      return sortedRows
    },

    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  },
  components: {
    VueAdsTableTree
  },
  created () {
  }
}
</script>

<style lang="scss">
@import '../../assets/vue-ads-table-tree/vue-ads-table-tree.css'
</style>
