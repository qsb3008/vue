<template>
<el-container class="ws-wrapper">
  <el-header>
    <div class="header-wrapper">
      <div class="logo">大管家</div>
      <div class="toggle-sidebar">
        <i class="el-icon-menu" @click="isCollapse = !isCollapse"></i>
      </div>
      <div class="main-menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#01d8ae"
          text-color="#fff"
          active-text-color="#ffffff">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-menu-item index="2">消息中心</el-menu-item>
          <el-menu-item index="3">订单管理</el-menu-item>
        </el-menu>
      </div>
      <div class="user-info">
        <span>admin</span>
        <span>退出</span>
      </div>
    </div>
  </el-header>
  <el-container>
    <el-aside width="auto">
    <el-menu menu-trigger="click" :default-active="defActive" class="el-menu-vertical-demo" :collapse="isCollapse" @select="selectMenu" unique-opened router>
      <template v-for="item in menuData">
        <el-submenu v-if="item.childs.length > 0" :key="item.iId" :index="item.iId">
            <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.szName}}</span>
            </template>
            <el-menu-item v-for="link in item.childs" :key="link.iId" :index="link.szUrl">{{link.szName}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="item.iId" :index="item.szUrl">
            <i class="el-icon-setting"></i>
            <span slot="title">{{item.szName}}</span>
        </el-menu-item>
      </template>
    </el-menu>
    </el-aside>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<style lang="scss">
html,body{
  height: 100%;
  margin: 0;
}
.logo{
  line-height: 60px;
  color: white;
  font-size: 28px;
  padding-right: 20px;
}
.toggle-sidebar{
  line-height: 60px;
  color: white;
  padding-right: 80px;
  & > i {
    cursor: pointer;
  }
}
.user-info{
  line-height: 60px;
  color: white;
  span{
    padding-right: 20px;
  }
}
.el-header{
  background: #01d8ae;
}
.main-menu{
    flex: 1;
}
.el-menu-demo{
  border: none;
}
.header-wrapper{
  display: flex;
}
.ws-wrapper{
  height: 100%;
}
.el-menu-vertical-demo{
  height: 100%;
  background: #354157;
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
      background: #354157;
      color: #b9bdbc;
      border-right: none;
  }
  .el-menu-item,.el-submenu__title{
    color: #909399;
  }
  .el-menu-item.is-active {
      color: #409EFF;
  }
}
</style>

<script>
import * as cgiService from '../api/cgiService'
export default {
  data () {
    return {
      isCollapse: false,
      activeIndex: '1',
      menuData: []
    }
  },
  computed: {
    defActive(){
      return this.$route.path
    }
  },
  methods: {
    selectMenu (index, indexPath) {
      console.log(index, indexPath, 666)
    }
  },
  created () {
    cgiService.getUserMenu().then(res => {
      this.menuData = res.data
    })
  }
}
</script>
