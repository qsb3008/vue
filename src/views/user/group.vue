<template>
  <!-- 角色管理 -->
  <div>
    <el-button
      type="primary"
      @click="addMenu()"><i class="el-icon-plus"/> 新增角色</el-button>
    <div class="table-wrapper">
      <el-table
        :data="pageList"
        :row-class-name="'ws-row'"
        style="width: 100%">
        <el-table-column
          type="expand">
          <template slot-scope="props">
            <div>授权页面</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleid"
          label="角色id"/>
        <el-table-column
          prop="rolename"
          label="角色名"/>
        <el-table-column
          prop="lastmodifiedtime"
          label="修改时间"
          width="180px"/>          
        <el-table-column
          prop="status"
          label="状态"/>
        <el-table-column
          label="操作"
          align="left"
          width="280">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="authorityDialog(scope.row)">授权页面</el-button>
            <el-button
              type="text"
              @click="editMenu(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="delMenu(scope.row)">删除</el-button>
              <el-button type="text" @click="addUser(scope.row)">用户列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="授权用户"
      :visible.sync="addUserShow"
      width="800px"
      @close="addUserCloseHandle">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="username">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column
          prop="userid"
          label="userid">
        </el-table-column>
        <el-table-column
          prop="status"
          label="status">
        </el-table-column>
        <el-table-column
          prop="description"
          label="description"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <span slot="footer">
        <el-button @click="addUserShow = false">取 消</el-button>
        <el-button type="primary" @click="addUserSave">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      title="授权页面"
      :visible.sync="authorityDialogShow"
      width="800px"
      @close="authorityDialogClose">
      <div>
        <el-tree 
          :data="treeData" 
          show-checkbox 
          check-strictly 
          :props="treeProps" 
          default-expand-all 
          node-key="pageid" 
          @node-click="nodeHandle" 
          ref="treeAuthor">
           <span class="custom-tree-node" slot-scope="{ node, data }">
             <span>{{ node.label }}</span>
           </span>
        </el-tree>
      </div>
      <span slot="footer">
        <el-button @click="authorityDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="authorityCommit">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      :visible.sync="showDialog"
      title="新增用户"
      width="50%"
      @close="closeHandler">
      <el-form
        ref="form"
        :model="metaForm"
        label-width="120px">
        <el-form-item label="角色代码">
          <el-input v-model="metaForm.roleid"/>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="metaForm.rolename"/>
        </el-form-item>
        <el-form-item label="父角色代码">
          <el-input v-model="metaForm.parentroleid"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="metaForm.description"/>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit">确 定</el-button>
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
      editing: false,
      authorityDialogShow: false,
      treeProps: { children: "children", label: "pagename" },
      treeData: [],
      treeRoleid: '',
      addUserShow: false,
      userList: [],
      roleid: '',
      multipleSelection: [],
    }
  },
  created () {
    cgiService.roleList().then(res => {
      this.pageList = res.data
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addUserSave () {
      let userid = [];
      this.multipleSelection.map(item => {
        if (item && item.userid) {
          userid.push(item.userid);
        }
      });
      let params = {
        userid: userid,
        roleid: this.roleid
      };
      cgiService.setRoleUser(params).then(res => {
        this.addUserShow = false;
        this.multipleSelection = [];
      });
    },
    addUserCloseHandle () {},
    addUser (row) {
      this.addUserShow = true
      this.roleid = row.roleid
      let params = {
        roleid: this.roleid
      }
      cgiService.userList(params).then((res) => {
        this.userList = res.data
        // 用户列表是否已在该角色下
        let selectedList = [];
        this.userList.map((item, index) => {
          if (String(item.isGrantRole) === "1") {
            this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(this.userList[index]);
            });
          }
        });


      })
    },
    nodeHandle () {
      console.log(this.$refs.treeAuthor.getCheckedKeys())
    },
    authorityDialog (row) {
      this.treeRoleid = row.roleid
      let operationToChildren = (arr) => {
        arr.map(item => {
          if (item.children) {
            operationToChildren(item.children)
          } else {
            if (item.operation) {
              let id = item.pageid
              item.children = Object.entries(item.operation).map(item => {
                return {pagename: item[1], isOperation: true, pageid: id + '-' + item[0]}
              })
            }
          }
        })
        return arr
      }
      cgiService.PagesOperationPageTree().then((res) => {
        this.treeData = res.data
        console.log(operationToChildren(this.treeData));
        
      })
      cgiService.getRolePageOperation(row.roleid).then((res) => {
        let nodeVal = res.rolepage;
        let operationVal = res.rolepageoperation;
        this.$nextTick(_ => {
          this.$refs.treeAuthor.setCheckedKeys(nodeVal.concat(operationVal));
        });
      })
      this.authorityDialogShow = true
    },
    authorityDialogClose() {
      this.treeRoleid = ''
    },
    authorityCommit () {
      this.authorityDialogShow = false
      let pageidsAndOperation = this.$refs.treeAuthor.getCheckedKeys()
      let pageids = []
      let pageoperation = []
      pageidsAndOperation.map(item => {
        if (item.indexOf('-') > -1) {
          pageoperation.push(item)
        } else {
          pageids.push(item)
        }
      })
      let params = {
        roleid: this.treeRoleid,
        pageids: pageids,
        pageoperation: pageoperation
      }
      cgiService.grantRolePageOperation(params).then(() => {})
    },
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
  }
}
</script>

<style lang='scss'>
.table-wrapper{
    padding-top: 20px;
}
</style>
