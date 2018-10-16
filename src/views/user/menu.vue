<template>
    <div>
        <el-button type="primary" @click="addMenu()"><i class="el-icon-plus"></i> 新增一级菜单</el-button>
        <div class="table-wrapper">
            <el-table
            :data="pageList"
            style="width: 100%;" border>
                <el-table-column
                    prop="pagename"
                    label="页面名字"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="pageurl"
                    label="URL">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="level"
                    label="level">
                </el-table-column>
                <el-table-column
                    prop="sort"
                    label="排序">
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
            title="新增菜单"
            :visible.sync="showDialog"
            width="800px"
            @close="closeHandler">
                <el-form ref="form" :model="metaForm" label-width="130px" style="padding-right:40px;">
                    <el-form-item label="名称：">
                        <el-input v-model="metaForm.pagename"></el-input>
                    </el-form-item>
                    <el-form-item label="URL：" v-show="(!editing && (metaForm.level == '3' || metaForm.level == '2')) || (editing && (metaForm.level == '3' || metaForm.level == '2'))">
                        <!-- <el-input v-model="metaForm.pageurl"></el-input> -->
                        <el-select v-model="metaForm.pageurl" clearable placeholder="请选择" class="select-width">
                          <el-option
                            v-for="(item, key) in metaForm.urlList"
                            :key="key"
                            :label="key"
                            :value="key">
                          </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图标文件(正常)：">
                        <el-select v-model="value6" placeholder="请选择" class="select-width">
                            <el-option
                                v-for="item in cities"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <span><i :class="item.value"></i></span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图标文件(选中)：">
                        <el-select v-model="value7" placeholder="请选择" class="select-width">
                            <el-option
                                v-for="item in cities"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                <span><i :class="item.value"></i></span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="需要授权：">
                                <el-radio v-model="metaForm.needAuthorized" label="1">是</el-radio>
                                <el-radio v-model="metaForm.needAuthorized" label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="允许代理使用：">
                                <el-radio v-model="metaForm.enableAgent" label="1">是</el-radio>
                                <el-radio v-model="metaForm.enableAgent" label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="展开子页面：">
                                <el-radio v-model="metaForm.isExpand" label="1">是</el-radio>
                                <el-radio v-model="metaForm.isExpand" label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="隐藏导航窗口：">
                                <el-radio v-model="metaForm.isHideNavigator" label="1">是</el-radio>
                                <el-radio v-model="metaForm.isHideNavigator" label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="禁用：">
                                <el-radio v-model="metaForm.isDisabled" label="1">是</el-radio>
                                <el-radio v-model="metaForm.isDisabled" label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="打开方式：">
                                <el-radio v-model="metaForm.openMode" label="1">是</el-radio>
                                <el-radio v-model="metaForm.openMode" label="0">否</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="描述：">
                        <el-input v-model="metaForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="排序：">
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
const ACTION_TYPE = {
  CREATE: 'create',
  EDIT: 'edit',
  CREATE_ROOT_MENU: 'root_menu'
}
export default {
  data () {
    return {
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
        needAuthorized: '1',
        enableAgent: '0',
        isExpand: '0',
        isHideNavigator: '0',
        isDisabled: '0',
        openMode: '0',
        description: ''
      }
    }
  },
  methods: {
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
        this.queryPageList()
      })
    },
    queryPageList () {
      cgiService.PagesOperationPageList().then(res => {
        this.pageList = res.data
      })
    }
  },
  created () {
    cgiService.PagesOperationPageList().then(res => {
      this.pageList = res.data
    })
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
</style>
