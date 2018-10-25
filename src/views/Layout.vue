<template>
  <el-container class="ws-wrapper">
    <el-header>
      <div class="header-wrapper">
        <div class="logo">大管家</div>
        <div class="toggle-sidebar">
          <i
            class="el-icon-menu"
            @click="isCollapse = !isCollapse"/>
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
          <span
            class="pointer"
            @click="setting">设置</span>
          <span
            class="pointer"
            @click="quit">退出</span>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="defActive"
          :collapse="isCollapse"
          menu-trigger="click"
          class="el-menu-vertical-demo"
          unique-opened
          router
          @select="selectMenu">
          <template v-for="item in menuData">
            <el-submenu
              v-if="item.childs.length > 0"
              :key="item.iId"
              :index="item.iId">
              <template slot="title">
                <i class="el-icon-setting"/>
                <span slot="title">{{ item.szName }}</span>
              </template>
              <el-menu-item
                v-for="link in item.childs"
                :key="link.iId"
                :index="link.szUrl">{{ link.szName }}</el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :key="item.iId"
              :index="item.szUrl">
              <i class="el-icon-setting"/>
              <span slot="title">{{ item.szName }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="content-wrapper">
        <div class="tab-menu">
          <el-button
            v-for="(item, key) in tabMenu"
            :type="isActive(item) ? '' : 'info'"
            :key="key"
            plain
            size="mini"
            @click="linkTo(item)">{{ item.name }} <i
              class="el-icon-close"
              @click.prevent.stop="closeTheTag(item, key)"/></el-button>
        </div>
        <el-main class="inner-content">
          <router-view/>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import cgiService from '../api/cgiService'

export default {
  data () {
    return {
      isCollapse: false,
      activeIndex: '1',
      menuData: []
    }
  },
  computed: {
    defActive () {
      return this.$route.path
    },
    tabMenu () {
      return this.$store.state.tabMenu
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route () {
      let path = this.$route.path
      let isInTabMenu = Object.values(this.$store.state.tabMenu).some((item) => {
        return item.path === path
      })

      if (!isInTabMenu && path !== '/setting') {
        this.selectMenu(path)
      }
    }
  },
  created () {
    cgiService.getUserMenu().then(res => {
      this.menuData = res.data
      this.$store.commit('setNavListMap', this.menuData)
    })
  },
  methods: {
    linkTo (item) {
      this.$router.replace({ path: item.path })
    },
    closeTheTag (item, index) {
      let tabList = Object.values(this.$store.state.tabMenu)
      if (tabList.length > 1) {
        this.$store.commit('removeTabMenuItem', item)
        tabList = Object.values(this.$store.state.tabMenu)
        if (item.path === this.$route.path) {
          this.$router.push({ path: tabList[0].path })
        }
      }
    },
    isActive (item) {
      return item.path === this.$route.path
    },
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    selectMenu (index) {
      this.$store.commit('addTabMenu', {
        name: this.$store.state.navList[index]['szName'],
        path: index
      })
    },
    quit () {
      cgiService.sendOut().then(res => {
        this.$router.replace('/login')
      })
    },
    setting () {
      this.$router.replace('/setting')
    }
  }
}
</script>

<style lang="scss">
html,body{
  height: 100%;
  margin: 0;
}
.inner-content{
  height: calc(100% - 75px);
}
.logo{
  line-height: 60px;
  color: white;
  font-size: 28px;
  padding-right: 20px;
}
.content-wrapper{
  padding: 0;
}
.tab-menu{
  height: 55px;
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 12px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  i:hover{
    transform: scale(1.2)
  }
  .cur,.cur:hover,.cur:focus,.cur:active{
    background: #409EFF;
    color: white;
    border-color: #409EFF;
  }
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
    padding: 3px;
    margin-right: 20px;
  }
}
.el-header{
  background: #01d8ae;
}
.main-menu{
    flex: 1;
    .is-active{
      background: rgb(1,173,139)!important;
    }
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
