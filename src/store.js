import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tabMenu: {
      '/user/menu': {
        name: '菜单列表',
        path: '/user/menu'
      }
    },
    navList: []
  },
  mutations: {
    addTabMenu (state, menuItem) {
      state.tabMenu[menuItem.path] = menuItem
    },
    removeTabMenuItem (state, menuItem) {
      Vue.delete(state.tabMenu, menuItem.path)
    },
    setNavListMap (state, list) {
      let routerMap = {}
      list.map(item => {
        if (item.szUrl) {
          routerMap[item.szUrl] = item
        } else {
          if (item.childs.length > 0) {
            item.childs.map(val => {
              if (val.szUrl) {
                routerMap[val.szUrl] = val
              }
            })
          }
        }
      })
      state.navList = routerMap
    } 
  },
  actions: {
    addTabMenu (context) {
      context.commit('addTabMenu')
    },
    removeTabMenuItem (context) {
      context.commit('removeTabMenuItem')
    }
  }
})
