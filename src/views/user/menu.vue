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
        :default-expanded-keys="[selectedKey]"
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
        v-if="currentNode && currentNode.pageid"
        class="tree-node-title"><i class="el-icon-document"/>
        {{ currentNode.pageid }}
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
      title="新增菜单"
      width="800px"
      @close="closeHandler">
      <el-form
        ref="form"
        :model="metaForm"
        label-width="130px"
        style="padding-right:40px;">
        <el-form-item label="名称：">
          <el-input v-model="metaForm.pagename"/>
        </el-form-item>
        <el-form-item label="URL：">
          <el-select
            v-model="metaForm.pageurl"
            clearable
            placeholder="请选择"
            class="select-width">
            <el-option
              v-for="(item, key) in metaForm.urlList"
              :key="key"
              :label="key"
              :value="key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="图标文件(正常)：">
          <el-select
            v-model="value6"
            placeholder="请选择"
            class="select-width">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span><i :class="item.value"/></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标文件(选中)：">
          <el-select
            v-model="value7"
            placeholder="请选择"
            class="select-width">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span><i :class="item.value"/></span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="需要授权：">
              <el-radio
                v-model="metaForm.needauthorized"
                label="1">是</el-radio>
              <el-radio
                v-model="metaForm.needauthorized"
                label="0">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="允许代理使用：">
              <el-radio
                v-model="metaForm.enableagent"
                label="1">是</el-radio>
              <el-radio
                v-model="metaForm.enableagent"
                label="0">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="展开子页面：">
              <el-radio
                v-model="metaForm.isexpand"
                label="1">是</el-radio>
              <el-radio
                v-model="metaForm.isexpand"
                label="0">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="隐藏导航窗口：">
              <el-radio
                v-model="metaForm.ishidenavigator"
                label="1">是</el-radio>
              <el-radio
                v-model="metaForm.ishidenavigator"
                label="0">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="禁用：">
              <el-radio
                v-model="metaForm.isdisabled"
                label="1">是</el-radio>
              <el-radio
                v-model="metaForm.isdisabled"
                label="0">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="打开方式：">
              <el-radio
                v-model="metaForm.openmode"
                label="1">是</el-radio>
              <el-radio
                v-model="metaForm.openmode"
                label="0">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述：">
          <el-input v-model="metaForm.description"/>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="metaForm.sortno"/>
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
import Vue from 'vue'
import cgiService from '../../api/cgiService'
const ACTION_TYPE = {
  CREATE: 'create',
  EDIT: 'edit',
  CREATE_ROOT_MENU: 'root_menu'
}
export default {
  data () {
    return {
      selectedKey: '',
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'pageid'
      },
      currentNode: {},
      cities: [{
        value: 'el-icon-info'
      }, {
        value: 'el-icon-error'
      }, {
        value: 'el-icon-success'
      }, {
        value: 'el-icon-warning'
      }, {
        value: 'el-icon-question'
      }, {
        value: 'el-icon-back'
      }],
      value6: '',
      value7: '',
      pageList: [],
      showDialog: false,
      actionType: ACTION_TYPE,
      metaForm: {},
      editing: false,
      createDefaultConfig: {
        id: '0',
        parentpageid: '0',
        level: '1',
        status: '100110',
        iconURL: '',
        selIconURL: '',
        needauthorized: '1',
        enableagent: '0',
        isexpand: '0',
        ishidenavigator: '0',
        isdisabled: '0',
        openmode: '0',
        description: ''
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  created () {
    cgiService.PagesOperationPageTree().then(res => {
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
      return data.pageid.indexOf(value) !== -1
    },
    handleNodeClick (data) {
      this.selectedKey = ''
      Vue.set(this, 'currentNode', data)
      console.log(this.$refs.tree, 5687)
    },
    addMenu (row = null) {
      cgiService.getPlatePageUrl().then(res => {
        this.metaForm.urlList = res
        this.showDialog = true
      })
      if (!row) {
        this.metaForm = Object.assign({}, this.createDefaultConfig)
      } else {
        this.metaForm = Object.assign({}, this.createDefaultConfig, {
          parentpageid: row.pageid,
          level: String(parseInt(row.level) + 1),
          status: row.status
        })
      }
    },
    editMenu (row) {
      this.metaForm = Object.assign({}, row)
      this.metaForm.pageurl = row.pageurl
      cgiService.getPlatePageUrl().then(res => {
        this.metaForm.urlList = res
        this.showDialog = true
        this.editing = true
      })
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
        this.$nextTick(() => {
          this.selectedKey = res.iId.toString()
        })
        this.queryPageList()
      })
    },
    queryPageList () {
      cgiService.PagesOperationPageTree().then(res => {
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
.select-width{
    width: 100%;
}
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
