<template>
  <!-- 用戶管理 -->
  <div>
    <el-button
      type="primary"
      @click="addMenu()"><i class="el-icon-plus"/> 新增用户</el-button>
    <div class="table-wrapper">
      <el-table
        :data="pageList"
        :row-class-name="'ws-row'"
        style="width: 100%">
        <el-table-column
          type="expand">
          <!-- 下拉显示用户基本信息 -->
          <template slot-scope="props">
            <el-form
              label-position="left"
              inline
              class="demo-table-expand">
              <el-form-item label="activedate">
                <span>{{ props.row.activedate }}</span>
              </el-form-item>
              <el-form-item label="activeflag">
                <span>{{ props.row.activeflag }}</span>
              </el-form-item>
              <el-form-item label="adminflag">
                <span>{{ props.row.adminflag }}</span>
              </el-form-item>
              <el-form-item label="apcode">
                <span>{{ props.row.apcode }}</span>
              </el-form-item>
              <el-form-item label="creator">
                <span>{{ props.row.creator }}</span>
              </el-form-item>
              <el-form-item label="createtime">
                <span>{{ props.row.createtime }}</span>
              </el-form-item>
              <el-form-item label="expireddate">
                <span>{{ props.row.expireddate }}</span>
              </el-form-item>
              <el-form-item label="lastlogin">
                <span>{{ props.row.lastlogin }}</span>
              </el-form-item>
              <el-form-item label="lastmodifiedtime">
                <span>{{ props.row.lastmodifiedtime }}</span>
              </el-form-item>
              <el-form-item label="lockflag">
                <span>{{ props.row.lockflag }}</span>
              </el-form-item>
              <el-form-item label="lastmodifieduser">
                <span>{{ props.row.lastmodifieduser }}</span>
              </el-form-item>
              <el-form-item label="logincount">
                <span>{{ props.row.logincount }}</span>
              </el-form-item>

              <el-form-item label="multilogin">
                <span>{{ props.row.multilogin }}</span>
              </el-form-item>
              <el-form-item label="nextupdatepwd">
                <span>{{ props.row.nextupdatepwd }}</span>
              </el-form-item>
              <el-form-item label="pwdactivedate">
                <span>{{ props.row.pwdactivedate }}</span>
              </el-form-item>
              <el-form-item label="pwdexpireddate">
                <span>{{ props.row.pwdexpireddate }}</span>
              </el-form-item>
              <el-form-item label="pwdtrycount">
                <span>{{ props.row.pwdtrycount }}</span>
              </el-form-item>
              <el-form-item label="usertype">
                <span>{{ props.row.usertype }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        
        <el-table-column
          prop="userid"
          label="用户账号"
          width="180"/>
        <el-table-column
          prop="orgcode"
          label="所属机构"/>
        <el-table-column
          prop="description"
          label="描述"/>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"/>
        <el-table-column
          prop="status"
          label="状态"/>
        <el-table-column
          label="操作"
          align="left"
          width="180">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="readDetail(scope.row)">明细</el-button>
            <el-button
              type="text"
              @click="grantUserRole(scope.row)">角色</el-button>
            <el-button
              type="text"
              @click="editMenu(scope.row)">编辑</el-button>
            <el-button
              type="text"
              @click="delMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 用户概要信息弹窗 -->
    <el-dialog
      title="用户概要信息"
      :visible.sync="detailDialogShow"
      width="800px"
      @close="detailDialogClose()">
      <el-form
        label-position="left"
        inline
        class="demo-table-expand">
        <el-form-item v-for="(val, key) in userProfile" :key="key" v-if="val" :label="`${key}：`">
          <span>{{ val }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 新增及编辑弹窗 -->
    <el-dialog
      :visible.sync="showDialog"
      title="新增用户"
      width="800px"
      @close="closeHandler">
      <el-form
        ref="form"
        :model="metaForm"
        label-width="120px">
        <el-form-item label="用户账号">
          <el-input v-model="metaForm.userid"/>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="metaForm.username"/>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属机构">
              <el-input v-model="metaForm.orgcode"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型">
              <el-input v-model="metaForm.usertype"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否管理员">
              <el-input v-model="metaForm.adminflag"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="账号启用">
              <el-input v-model="metaForm.activeflag"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="账号启用日期">
          <el-input v-model="metaForm.activedate"/>
        </el-form-item>
        <el-form-item label="账号失效日期">
          <el-input v-model="metaForm.expireddate"/>
        </el-form-item>
        <el-form-item label="访问策略编码">
          <el-input v-model="metaForm.apcode"/>
        </el-form-item>
        <el-form-item label="密码策略编码">
          <el-input v-model="metaForm.ppcode"/>
        </el-form-item>
        <el-form-item label="设置密码：">
          <el-switch
            v-model="metaForm.resetpwd"
            active-color="#13ce66"
            active-value="1"
            inactive-value="0"/>
        </el-form-item>
        <el-form-item label="新密码" v-if="metaForm.resetpwd === '1'">
          <el-input type="password" v-model="metaForm.pwd"/>
        </el-form-item>
        <el-form-item label="密码生效日期">
          <el-input v-model="metaForm.pwdactivedate"/>
        </el-form-item>
        <el-form-item label="密码失效日期">
          <el-input v-model="metaForm.pwdexpireddate"/>
        </el-form-item>
        <el-form-item label="下次登录改密">
          <el-input v-model="metaForm.nextupdatepwd"/>
        </el-form-item>
        <el-form-item label="密码错误次数">
          <el-input v-model="metaForm.pwdtrycount"/>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="账号已锁定">
              <el-input v-model="metaForm.lockflag"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="允许多重登录">
              <el-input v-model="metaForm.multilogin"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="描述">
          <el-input v-model="metaForm.description"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="metaForm.status"/>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色授权弹窗 -->
    <el-dialog
      title="角色授权"
      :visible.sync="grantUserRoleShow"
      width="800px"
      @close="grantUserRoleClose()">
        <el-table
          ref="multipleTable"
          :data="roleList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="rolename">
            <template slot-scope="scope">{{ scope.row.rolename }}</template>
          </el-table-column>
          <el-table-column
            prop="roleid"
            label="roleid">
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
        <el-button @click="grantUserRoleShow = false">取 消</el-button>
        <el-button type="primary" @click="grantUserRoleSave()">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import cgiService from "../../api/cgiService";
import { login } from "../../api/loginInfo";
const ACTION_TYPE = {
  CREATE: "create",
  EDIT: "edit",
  CREATE_ROOT_MENU: "root_menu"
};
export default {
  data() {
    return {
      pageList: [],
      showDialog: false,
      actionType: ACTION_TYPE,
      metaForm: {
        id: "0",
        useracoount: "",
        password: "",
        username: "",
        description: "",
        status: ""
      },
      editing: false,
      detailDialogShow: false,
      profileUserId: "",
      userProfile: {},
      grantUserRoleShow: false,
      roleList: [], // 拉取某个用户的角色列表
      multipleSelection: [],
      userid: ""
    };
  },
  created() {
    cgiService.userList().then(res => {
      this.pageList = res.data;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    grantUserRoleSave() {
      let roleid = [];
      this.multipleSelection.map(item => {
        if (item && item.roleid) {
          roleid.push(item.roleid);
        }
      });
      let params = {
        userid: this.userid,
        roleid: roleid
      };
      cgiService.grentUserRole(params).then(res => {
        this.grantUserRoleShow = false;
        this.multipleSelection = [];
      });
    },
    grantUserRoleClose() {
      this.userid = "";
      this.grantUserRoleShow = false;
      this.multipleSelection = [];
      this.$refs.multipleTable.clearSelection();
    },
    grantUserRole(row) {
      this.userid = row.userid;
      console.log(row, "roleid");
      this.grantUserRoleShow = true;
      let params = {
        userid: this.userid
      };
      cgiService.roleList(params).then(res => {
        this.roleList = res.data;
        let selectedList = [];
        this.roleList.map((item, index) => {
          if (String(item.isSetUser) === "1") {
            this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(this.roleList[index]);
            });
          }
        });
      });
    },
    detailDialogClose() {},
    detailDialogSave() {},
    readDetail(row) {
      this.profileUserId = row.userid;
      this.detailDialogShow = true;
      cgiService.getUserProfile(this.profileUserId).then(res => {
        this.userProfile = res.data;
      });
    },
    addMenu(row = null) {
      this.showDialog = true;
      if (!row) {
      } else {
        this.metaForm.id = "0";
        this.metaForm.parentpageid = row.parentpageid;
        this.metaForm.level = String(parseInt(row.level) + 1);
        this.metaForm.status = row.status;
        this.metaForm.description = "";
      }
    },
    editMenu(row) {
      this.showDialog = true;
      this.editing = true;
      this.metaForm = Object.assign({}, row);
      this.metaForm.pwd = "";
    },
    delMenu(row) {
      var ids = [];
      ids.push(row.id);
      this.$confirm("确定要删除此笔数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        cgiService.userRoleDelData({ ids: ids }).then(res => {
          this.showDialog = false;
          this.queryPageList();
        });
      });
    },
    closeHandler() {
      this.metaForm = {};
      this.editing = false;
      this.showDialog = false;
    },
    submit() {
      cgiService.UserRoleSaveData(this.metaForm).then(res => {
        this.showDialog = false;
        this.queryPageList();
      });
    },
    queryPageList() {
      cgiService.userList().then(res => {
        this.pageList = res.data;
      });
    }
  }
};
</script>

<style lang='scss'>
.table-wrapper {
  padding-top: 20px;
}
.profile-item {
  font-size: 16px;
  padding: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
