<template>
    <div>
        <el-button type="primary" @click="addMenu()"><i class="el-icon-plus"></i> 新增角色</el-button>
        <div class="table-wrapper">
            <el-table
            :data="pageList"
            style="width: 100%" border>
                <el-table-column
                    prop="roleid"
                    label="角色id"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="roleename"
                    label="英文名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="rolecname"
                    label="中文名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
                <el-table-column label="操作" align="left" width="180">
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.level==1 || scope.row.level==2" @click="addMenu(scope.row)">新增</el-button>
                        <el-button type="text" @click="editMenu(scope.row)">编辑</el-button>
                        <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="新增用户"
            :visible.sync="showDialog"
            width="50%"
            @close="closeHandler">
                <el-form ref="form" :model="metaForm" label-width="120px">
                    <el-form-item label="角色代码">
                        <el-input v-model="metaForm.roleid"></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称">
                        <el-input v-model="metaForm.rolename"></el-input>
                    </el-form-item>
                    <el-form-item label="父角色代码">
                        <el-input v-model="metaForm.parentroleid"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="metaForm.description"></el-input>
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
        roleid: '',
        roleename: '',
        rolecname: '',
        accessid: '',
        pwdpolicyid: '',
        description: '',
        status: ''
      },
      editing: false
    }
  },
  methods: {
    addMenu (row = null) {
      this.showDialog = true
      if (!row) {

      } else {
        this.metaForm.id = '0'
        this.metaForm.parentpageid = row.parentpageid
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
        cgiService.roleDelData({ ids: ids }).then(res => {
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
      cgiService.roleSaveData(this.metaForm).then(res => {
        this.showDialog = false
        this.queryPageList()
      })
    },
    queryPageList () {
      cgiService.roleList().then(res => {
        this.pageList = res.data
      })
    }
  },
  created () {
    cgiService.roleList().then(res => {
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
