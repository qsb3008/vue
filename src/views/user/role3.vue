<template lang="html">
  <div id="role">
    <zk-table
      ref="table"
      :data="data"
      :columns="columns"
      :stripe="props.stripe"
      :border="props.border"
      :show-header="props.showHeader"
      :show-summary="props.showSummary"
      :show-row-hover="props.showRowHover"
      :show-index="props.showIndex"
      :tree-type="props.treeType"
      :is-fold="props.isFold"
      :expand-type="props.expandType"
      :selection-type="props.selectionType">
        <template slot="pageOperation" scope="scope">
            <div v-if="!(scope.row.operation instanceof Array)">
                <el-tag class="tag" v-for="(val, key) in scope.row.operation" :key="key">{{val}}</el-tag>
            </div>
        </template>
        <template slot="operation" scope="scope">
          <div>
            <el-button type="text" v-if="scope.row.level==1 || scope.row.level==2" @click="addMenu(scope.row)">新增</el-button>
            <el-button type="text" @click="editMenu(scope.row)">编辑</el-button>
            <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
          </div>
        </template>
    </zk-table>
    <el-dialog
        title="新增菜单"
        :visible.sync="showDialog"
        width="30%"
        @close="closeHandler">
            <el-form ref="form" :model="metaForm" label-width="120px">
                <el-form-item label="名称">
                    <el-input v-model="metaForm.pagename"></el-input>
                </el-form-item>
                <el-form-item label="URL" v-show="(!editing && (metaForm.level == '3' || metaForm.level == '2')) || (editing && (metaForm.level == '3' || metaForm.level == '2'))">
                    <el-input v-model="metaForm.pageurl"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="metaForm.sort"></el-input>
                </el-form-item>
            </el-form>
        <span slot="footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import cgiService from '../../api/cgiService'
import ZkTable from 'vue-table-with-tree-grid'

export default {
  name: 'example',
  components: {
    ZkTable
  },
  data () {
    return {
      showDialog: false,
      metaForm: {},
      editing: false,
      props: {
        stripe: false,
        border: false,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      data: [],
      columns: [
        {
          label: '名称',
          prop: 'pagename',
          minWidth: '180px'
        },
        {
          label: 'status',
          prop: 'status'
        },
        {
          label: 'URL',
          prop: 'pageurl',
          minWidth: '50px'
        },
        {
          label: '操作权限',
          prop: 'operation',
          type: 'template',
          minWidth: '150px',
          template: 'pageOperation'
        },
        {
          label: '排序',
          prop: 'sort'
        },
        {
          label: '层级',
          prop: 'level'
        },
        {
          label: '操作',
          prop: '',
          type: 'template',
          template: 'operation'
        }
      ]
    }
  },
  methods: {
    addMenu (row = null) {
      this.showDialog = true
      if (!row) {
        this.metaForm = {
          id: '0',
          parentpageid: '0',
          level: '1',
          status: '100110',
          description: ''
        }
      } else {
        this.metaForm.id = '0'
        this.metaForm.parentpageid = row.parentpageid
        this.metaForm.level = String(parseInt(row.level) + 1)
        this.metaForm.status = row.status
        this.metaForm.description = ''
      }
    },
    editMenu (row) {
      this.showDialog = true
      this.editing = true
      this.metaForm = Object.assign({}, row)
    },
    delMenu (row) {
      var ids = []
      ids.push(row.id)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.delData({ ids: ids }).then(res => {
          this.showDialog = false
          this.queryPageList()
        })
      })
    },
    closeHandler () {
      this.metaForm = {}
      this.editing = false
    },
    submit () {
      cgiService.saveData(this.metaForm).then(res => {
        this.showDialog = false
        this.queryPageList()
      })
    },
    queryPageList () {
      cgiService.PagesOperationPageTree().then(res => {
        this.data = res.data
      })
    }
  },
  created () {
    this.queryPageList()
  }
}
</script>

<style scoped lang="scss">
#role{
  .tag{
    margin-right: 3px;
  }
}
</style>
