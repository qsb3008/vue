<template>
    <div>
        <el-button class="access-table" type='primary' @click="createAccess()"><i class="el-icon-plus"></i> 新增策略</el-button>
        <el-table :data="accessList">
            <el-table-column v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label">
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <el-button type="text" @click="editAccess(scope.row)">编辑</el-button>
                    <el-button type="text" @click="delAccess(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="编辑"
            :visible.sync="showDialog"
            width="800px"
            @close="handleClose">
            <el-form :model="form" ref="form" label-width="120px">
                <el-form-item label="访问策略编码：">
                    <el-input v-model="form.apcode"></el-input>
                </el-form-item>
                <el-form-item label="访问策略名称：">
                    <el-input v-model="form.apname"></el-input>
                </el-form-item>
                <el-form-item label="描叙">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="限制IP：">
                            <el-switch
                                v-model="form.checkip"
                                active-color="#13ce66"
                                active-value="1"
                                inactive-value="0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="限制MAC地址：">
                            <el-switch
                                v-model="form.checkmac"
                                active-color="#13ce66"
                                active-value="1"
                                inactive-value="0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <template v-if="form.checkip === '1'">
                    <el-form-item label="允许IP地址/段：">
                        <el-input v-model="form.includeip"></el-input>
                    </el-form-item>
                    <el-form-item label="禁止IP地址/段：">
                        <el-input v-model="form.excludeip"></el-input>
                    </el-form-item>
                </template>
                <template v-if="form.checkmac === '1'">
                    <el-form-item label="允许MAC地址：">
                        <el-input v-model="form.includemac"></el-input>
                    </el-form-item>                
                </template>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="允许外网访问：">
                            <el-switch
                                v-model="form.checkinternet"
                                active-color="#13ce66"
                                active-value="1"
                                inactive-value="0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="限制使用时间：">
                            <el-switch
                                v-model="form.checkusetime"
                                active-color="#13ce66"
                                active-value="1"
                                inactive-value="0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <template v-if="form.checkusetime === '1'">
                    <el-form-item label="时间段定义：">
                        <el-input v-model="form.timedefine"></el-input>
                    </el-form-item>
                </template>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="是否可访问：">
                            <el-switch
                                v-model="form.isaccessable"
                                active-color="#13ce66"
                                active-value="1"
                                inactive-value="0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否缺省策略：">
                            <el-switch
                                v-model="form.isdefault"
                                active-color="#13ce66"
                                active-value="1"
                                inactive-value="0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            
            <span slot="footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="commit">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
import Vue from 'vue'
import cgiService from '../../api/cgiService'
export default {
    data () {
        return {
            form: {},
            showDialog: false,
            accessList: [],
            columns: [{
                id: 'apcode',
                label: '访问策略编码',
                key: 'apcode'
            }, {
                id: 'apname',
                label: '访问策略名称',
                key: 'apname'
            }, {
                id: 'checkinternet',
                label: '允许访问外网',
                key: 'checkinternet'
            }, {
                id: 'checkip',
                label: '限制IP',
                key: 'checkip'
            }, {
                id: 'checkmac',
                label: '限制MAC地址',
                key: 'checkmac'
            }, {
                id: 'isaccessable',
                label: '是否可访问',
                key: 'isaccessable'
            }, {
                id: 'isdefault',
                label: '是否缺省策略',
                key: 'isdefault'
            }, {
                id: 'creator',
                label: '创建者',
                key: 'creator'
            }]
        }
    },
    methods: {
        editAccess (row) {
            this.showDialog = true
            this.form = Object.assign({}, row)
        },
        createAccess () {
            this.form = {}
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
                cgiService.accessPwdDelData1({ ids: ids }).then(res => {
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
            cgiService.accessPwdSaveData(this.form).then(res => {
                this.showDialog = false
                this.queryPageList()
            })
        },
        queryPageList () {
            cgiService.accessList().then(res => {
                this.accessList = res.data
            })
        }
    },
    created () {
        cgiService.accessList().then(res => {
            this.accessList = res.data
        })
    }
}
</script>

<style lang="scss">
.access-table{
    margin-bottom: 20px;
}
</style>