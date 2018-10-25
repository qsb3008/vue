<template>
  <div class="org-list-wrapper">
    <div class="tree-wrapper">
      <el-input
        v-model="filterText"
        placeholder="输入关键字进行过滤"
        class="filter-input"/>
      <div class="title">
        组织机构列表
        <i
          class="el-icon-plus"
          @click="addMenu(null)"/>
      </div>
      <el-tree
        ref="tree"
        :data="pageList"
        :props="defaultProps"
        :default-expanded-keys="[21]"
        :filter-node-method="filterNode"
        :highlight-current="true"
        :expand-on-click-node="false"
        class="ws-tree"
        node-key="id"
        accordion
        @node-click="handleNodeClick"/>
    </div>
    <div class="tree-node-content">
      <h3
        v-if="currentNode && currentNode.orgfullname"
        class="tree-node-title"><i class="el-icon-document"/>
        {{ currentNode.orgfullname }}
        <div style="float:right;">
          <el-button
            type="text"
            @click="addMenu(currentNode)">新增</el-button>
          <el-button
            type="text"
            @click="editMenu(currentNode)">编辑</el-button>
          <el-button
            type="text"
            @click="delMenu(currentNode)">删除</el-button>
        </div>
      </h3>
      <el-row class="content-row">
        <el-col
          v-for="(val, key) in currentNode"
          v-if="key !== 'children'"
          :lg="12"
          :md="24"
          :key="key"
          class="item"><span class="key">{{ key }} :</span> {{ val }}
        </el-col>
        <el-col
          v-if="Object.values(currentNode) %2 !== 0"
          :span="12"
          class="item"/>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      title="新增用户"
      width="50%"
      @close="closeHandler">
      <el-form
        ref="metaForm"
        :model="metaForm"
        :rules="rules"
        label-width="120px">
        <el-form-item
          label="orgcode"
          prop="orgcode">
          <el-input v-model="metaForm.orgcode"/>
        </el-form-item>
        <el-form-item
          label="orgfullname"
          prop="orgfullname">
          <el-input v-model="metaForm.orgfullname"/>
        </el-form-item>
        <el-form-item label="orgshortname">
          <el-input v-model="metaForm.orgshortname"/>
        </el-form-item>
        <el-form-item label="email">
          <el-input v-model="metaForm.email"/>
        </el-form-item>
        <el-form-item label="orgccc">
          <el-input v-model="metaForm.orgccc"/>
        </el-form-item>
        <el-form-item label="manageruserid">
          <el-input v-model="metaForm.manageruserid"/>
        </el-form-item>
        <el-form-item label="description">
          <el-input v-model="metaForm.description"/>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit('metaForm')">确 定</el-button>
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
  components: {
    ZkTable
  },
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
        orgfullnam: ''
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
      currentNode: {},
      rules: {
        orgcode: [
          { required: true, message: '请输入策略编码', trigger: 'blur' }
        ],
        orgfullname: [
          { required: true, message: '请输入策略名称', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  created () {
    cgiService.OrgTree().then(res => {
      this.pageList = res.data
      this.$nextTick(() => {
        if (this.pageList.length > 0) {
          this.$refs.tree.setCurrentKey(this.pageList[0].id)
          Vue.set(this, 'currentNode', this.pageList[0])
        }
      })
    })
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.orgfullname.indexOf(value) !== -1
    },
    handleNodeClick (data) {
      Vue.set(this, 'currentNode', data)
      console.log(this.$refs.tree, 5687)
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
      ids.push(row.id)
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
      this.$refs['metaForm'].resetFields()
      this.editing = false
    },
    submit (metaForm) {
      this.$refs[metaForm].validate((valid) => {
        if (valid) {
          cgiService.orgSaveData1(this.metaForm).then(res => {
            this.showDialog = false
            this.queryPageList()
          })
        } else {
          return false
        }
      })
    },
    queryPageList () {
      cgiService.OrgTree().then(res => {
        this.pageList = res.data
      })
    }
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
.content-row{
  padding: 30px;
}
.item{
    box-sizing: border-box;
    min-height: 42px;
    line-height: 42px;
    padding: 0 10px;
    margin-left: -1px;
    margin-top: -2px;
}
.key{
  color: #99a9bf;
  padding-right: 10px;
}
.ws-tree .el-tree-node__content{
  padding: 10px 0;
}
</style>
