<template>
    <div class="org-list-wrapper">
        <!-- <el-button type="primary" @click="addMenu()"><i class="el-icon-plus"></i> 新增用户</el-button> -->
        <div class="tree-wrapper">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" class="filter-input"></el-input>
            <div class="title">
              组织机构列表
              <i class="el-icon-plus" @click="addMenu(null)"></i>
            </div>
            <el-tree :data="pageList"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :filter-node-method="filterNode"
              :highlight-current="true"
              :expand-on-click-node="false"
              ref="tree"></el-tree>
        </div>
        <div class="tree-node-content">
            <h3 class="tree-node-title"><i class="el-icon-document"></i> 
            {{currentNode.orgfullname}}
            <div style="float:right;">
              <el-button type="text" @click="addMenu(currentNode)">新增</el-button>
              <el-button type="text" @click="editMenu(currentNode)">编辑</el-button>
              <el-button type="text" @click="delMenu(currentNode)">删除</el-button>
            </div>
            </h3>
            <el-row >
              <el-col 
                :span="12" 
                v-for="(val, key) in currentNode" 
                :key="key" v-if="key !== 'children'" 
                class="item"><span>{{key}} :</span> {{val}}
              </el-col>
              <el-col class="item" :span="12" v-if="Object.values(currentNode) %2 !== 0"></el-col>
            </el-row>
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
                    <el-form-item label="orgshortname">
                        <el-input v-model="metaForm.orgshortname"></el-input>
                    </el-form-item>
                    <el-form-item label="email">
                        <el-input v-model="metaForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="orgccc">
                        <el-input v-model="metaForm.orgccc"></el-input>
                    </el-form-item>
                    <el-form-item label="manageruserid">
                        <el-input v-model="metaForm.manageruserid"></el-input>
                    </el-form-item>
                    <el-form-item label="description">
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
import Vue from 'vue'
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
      defaultProps: {
        children: 'children',
        label: 'orgfullname'
      },
      filterText: '',
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
        treeType: true,
        isFold: true,
        expandType: false,
        selectionType: false
      },
      columns: [
        {
          label: 'orgid',
          prop: 'orgid',
          minWidth: '180px'
        },
        {
          label: 'orgcode',
          prop: 'orgcode'
        },
        {
          label: 'orgfullname',
          prop: 'orgfullname',
          minWidth: '50px'
        },
        {
          label: '操作',
          prop: '',
          type: 'template',
          template: 'operation'
        }
      ],
      currentNode: {
        parentorgid: "0",
        orgid: "10011",
        orgcode: "新增1",
        orgfullname: "我是新增1",
        orgshortname: "简称新1",
        email: "qsb3008@163.com",
        orgccc: "ccc暂时手填",
        manageruserid: "管理人id也是暂时手填",
        sortno: "0",
        description: "没什么可以描述的",
        status: "1",
        creator: "admin",
        createtime: "2018-10-17 15:03:27",
        lastmodifieduser: "admin",
        lastmodifiedtime: "2018-10-17 15:03:27"
      }
    }
  },
  components: {
    ZkTable
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true;
      return data.orgfullname.indexOf(value) !== -1
    },
    handleNodeClick (data) {
      // Vue.set(this, 'currentNode', data)
    },
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
      ids.push(row.orgid)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.orgDelData1({ ids: ids }).then(res => {
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
      cgiService.orgSaveData1(this.metaForm).then(res => {
        this.showDialog = false
        this.queryPageList()
      })
    },
    queryPageList () {
      cgiService.OrgTree().then(res => {
        this.pageList = res.data
      })
    }
  },
  created () {
    cgiService.OrgTree().then(res => {
      this.pageList = res.data
    })
  }
}
</script>

<style lang='scss'>
.org-list-wrapper{
  display: flex;
  height: 100%;
  .filter-input{
    margin-bottom: 20px;
  }
}
.title{
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
  color: #aaaaaa;
  position: relative;
  .el-icon-plus{
    position: absolute;
    right: 0;
    padding: 5px;
    cursor: pointer;
    &:hover{
      color: #409EFF;
    }
  }
}
.tree-wrapper{
  width: 300px;
  border-right: 1px solid #eee;
  padding-right: 20px;
}
.tree-node-content{
  padding-left: 20px;
  flex: 1;
}
.tree-node-title{
  margin-top: 0;
  margin-bottom: 1px;
  line-height: 32px;
  color: #666666;
  font-size: 18px;
  font-weight: normal;
  background-color: #F4F5F9;
  padding: 10px;
  border-left: 4px solid #777788;
}
.item{
    box-sizing: border-box;
    min-height: 42px;
    line-height: 42px;
    border: 1px solid #eee;
    padding: 0 10px;
    margin-left: -1px;
    margin-top: -2px;
}
</style>
