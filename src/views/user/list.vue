<template>
    <div>
        <el-button type="primary" @click="addMenu()">新增一级菜单</el-button>
        <div class="table-wrapper">
            <el-table
            :data="pageList"
            style="width: 100%" border>
                <el-table-column
                    prop="useracoount"
                    label="用户账号"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="用户名"
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
                    <el-form-item label="用户账号">
                        <el-input v-model="metaForm.useracoount"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="metaForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="metaForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="metaForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="metaForm.mobilenumber"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="metaForm.description"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="metaForm.status"></el-input>
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
import * as cgiService from '../../api/cgiService'
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
                useracoount: '',
                password: '',
                username: '',
                email: '',
                mobilenumber: '',
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
                this.metaForm.level = String(parseInt(row.level) + 1)
                this.metaForm.status = row.status
                this.metaForm.description = ''
            }
        },
        editMenu (row) {
            this.showDialog = true
            this.editing = true
            this.metaForm = Object.assign({}, row)
            console.log(this.metaForm, ': row')
        },
        delMenu (row) {
            var ids = [];
            ids.push(row.id);
            console.log(ids, ':ids')
            this.$confirm("确定要删除此笔数据?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                cgiService.userRoleDelData({ids: ids}).then(res => {
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
            cgiService.UserRoleSaveData(this.metaForm).then(res => {
                this.showDialog = false
                this.queryPageList()
            })
        },
        queryPageList () {
            cgiService.userList().then(res => {
                this.pageList = res.data
            })
        }
    },
    created () {
        cgiService.userList().then(res => {
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