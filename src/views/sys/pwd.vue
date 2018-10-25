<template>
  <div>
    <el-button
      class="access-table"
      type="primary"
      @click="createAccess()"><i class="el-icon-plus"/> 新增策略</el-button>
    <el-table
      :data="accessList"
      :row-class-name="'ws-row'">
      <el-table-column
        type="expand"
        width="40">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand">
            <el-form-item label="创建者">
              <span>{{ props.row.creator }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.createtime }}</span>
            </el-form-item>
            <el-form-item label="修改人">
              <span>{{ props.row.lastmodifieduser }}</span>
            </el-form-item>
            <el-form-item label="修改时间">
              <span>{{ props.row.lastmodifiedtime }}</span>
            </el-form-item>pwdregex
            <el-form-item label="密码规则">
              <span>{{ props.row.pwdregex }}</span>
            </el-form-item>
            <el-form-item label="是否缺省">
              <span>{{ props.row.isdefault }}</span>
            </el-form-item>
            <el-form-item label="账号过期">
              <span>{{ props.row.actexpirealert }}</span>
            </el-form-item>
            <el-form-item label="密码过期">
              <span>{{ props.row.pwdexpirealert }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :min-width="col.width"
        :label="col.label"/>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="editAccess(scope.row)">编辑</el-button>
          <el-button
            type="text"
            @click="delAccess(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      width="800px"
      @close="handleClose">
      <el-form
        ref="form"
        :model="form"
        label-width="110px">
        <el-form-item label="密码策略编码：">
          <el-input v-model="form.ppcode"/>
        </el-form-item>
        <el-form-item label="密码策略名称：">
          <el-input v-model="form.ppname"/>
        </el-form-item>
        <el-form-item label="描叙">
          <el-input v-model="form.description"/>
        </el-form-item>
        <el-form-item label="输错最大次数">
          <el-input v-model="form.lockmaxnumber"/>
        </el-form-item>
        <el-form-item label="有效天数">
          <el-input v-model="form.effectivedays"/>
        </el-form-item>
        <el-form-item label="密码规则">
          <el-input v-model="form.pwdregex"/>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="允许修改密码：">
              <el-switch
                v-model="form.canmodified"
                active-color="#13ce66"
                active-value="1"
                inactive-value="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否缺省策略：">
              <el-switch
                v-model="form.isdefault"
                active-color="#13ce66"
                active-value="1"
                inactive-value="0"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="密码最小长度：">
              <el-input-number
                v-model="form.minlength"
                :min="1"
                :max="10"
                label=""/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码最大长度：">
              <el-input-number
                v-model="form.maxlength"
                :min="1"
                :max="10"
                label=""/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号过期提醒：">
              <el-input-number
                v-model="form.actexpirealert"
                :min="1"
                :max="10"
                label=""/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码过期提醒：">
              <el-input-number
                v-model="form.pwdexpirealert"
                :min="1"
                :max="10"
                label=""/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="commit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import cgiService from '../../api/cgiService'
export default {
  data () {
    return {
      dialogTitle: '',
      form: {},
      showDialog: false,
      accessList: [],
      columns: [{
        id: 'ppcode',
        label: '密码策略编码',
        key: 'ppcode',
        width: '100'
      }, {
        id: 'ppname',
        label: '密码策略名称',
        key: 'ppname',
        width: 'auto'
      }, {
        id: 'minlength',
        label: '密码最小长度',
        key: 'minlength',
        width: 'auto'
      }, {
        id: 'maxlength',
        label: '密码最大长度',
        key: 'maxlength',
        width: 'auto'
      }, {
        id: 'effectivedays',
        label: '有效天数',
        key: 'effectivedays',
        width: 'auto'
      }, {
        id: 'lockmaxnumber',
        label: '密码输错次数',
        key: 'lockmaxnumber',
        width: 'auto'
      }, {
        id: 'canmodified',
        label: '允许修改密码',
        key: 'canmodified',
        width: '100'
      }]
    }
  },
  created () {
    cgiService.pwdList().then(res => {
      this.accessList = res.data
    })
  },
  methods: {
    editAccess (row) {
      this.showDialog = true
      this.dialogTitle = '编辑策略'
      this.form = Object.assign({}, row)
    },
    createAccess () {
      this.form = {}
      this.dialogTitle = '新增策略'
      this.showDialog = true
    },
    delAccess (row) {
      var ids = []
      ids.push(row.id)
      this.$confirm('确定要删除此笔数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cgiService.accessPwdDelData2({ ids: ids }).then(res => {
          this.showDialog = false
          this.queryPageList()
        })
      })
    },
    handleClose () {
      this.showDialog = false
      this.form = {}
    },
    commit () {
      cgiService.accessPwdSaveData2(this.form).then(res => {
        this.showDialog = false
        this.queryPageList()
      })
    },
    queryPageList () {
      cgiService.pwdList().then(res => {
        this.accessList = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.access-table{
    margin-bottom: 20px;
}
.demo-table-expand {
font-size: 0;
}
.demo-table-expand label {
width: 110px;
color: #99a9bf;
}
.demo-table-expand .el-form-item {
margin-right: 0;
margin-bottom: 0;
width: 50%;
}
</style>
