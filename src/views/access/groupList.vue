<template>
    <div>
        <el-button type="primary" @click="addMenu()"><i class="el-icon-plus"></i> 新增用户</el-button>
        <div class="table-wrapper">
            <zk-table
            :data="pageList"
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
            :selection-type="props.selectionType"
            style="width: 100%">             
                <template slot="operation" scope="scope">
                    <div>
                        <el-button type="text" @click="addMenu(scope.row)">新增</el-button>
                        <el-button type="text" @click="editMenu(scope.row)">编辑</el-button>
                        <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
                    </div>
                </template>
            </zk-table>
        </div>
        <el-dialog
            title="新增用户"
            :visible.sync="showDialog"
            width="50%"
            @close="closeHandler">
                <el-form ref="form" :model="metaForm" label-width="120px">
                    <el-form-item label="orgcode">
                        <el-input v-model="metaForm.orgcode"></el-input>
                    </el-form-item>
                    <el-form-item label="orgfullname">
                        <el-input v-model="metaForm.orgfullname"></el-input>
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

const ACTION_TYPE = {
  CREATE: 'create',
  EDIT: 'edit',
  CREATE_ROOT_MENU: 'root_menu'
}
export default {
  data () {
    return {
      pageList: [],
      showDialog: false,
      actionType: ACTION_TYPE,
      metaForm: {
        id: '0',
        orgcode: '',
        orgfullnam: '',
      },
      editing: false,
      props: {
        stripe: false,
        border: false,
        showHeader: true,
        showSummary: false,
        showRowHover: true,
        showIndex: false,
        treeType: false,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      columns: [
        {
          label: 'grpcode',
          prop: 'grpcode'
        },
        {
          label: 'grpname',
          prop: 'grpname'
        },
        {
          label: 'ispublic',
          prop: 'ispublic',
          minWidth: '50px'
        },
        {
          label: 'grpalias',
          prop: 'grpalias',
          minWidth: '50px'
        },
        {
          label: 'orgcode',
          prop: 'orgcode',
          minWidth: '50px'
        },
        {
          label: 'status',
          prop: 'status',
          minWidth: '50px'
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
  components: {
    ZkTable
  },
  methods: {
    addMenu (row = null) {
      this.showDialog = true
      if (row) {
          this.metaForm.parentorgid = row.orgid
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
        cgiService.groupDelData({ ids: ids }).then(res => {
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
      cgiService.groupSaveData(this.metaForm).then(res => {
        this.showDialog = false
        this.queryPageList()
      })
    },
    queryPageList () {
      cgiService.groupData().then(res => {
        this.pageList = res.data
      })
    }
  },
  created () {
    cgiService.groupData().then(res => {
      this.pageList = res.data
    })
  }
}
</script>

<style lang='scss'>
.table-wrapper{
    padding-top: 20px;
}
</style>
