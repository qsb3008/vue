import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Layout.vue'),
      children: [{
        path: '',
        name: 'about',
        component: () => import('./views/About.vue')
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/user/menu',
      component: () => import('./views/Layout.vue'),
      children: [{
        path: '',
        name: 'userMenu',
        component: () => import('./views/user/menu.vue')
      }]
    },
    {
      path: '/user/group',
      component: () => import('./views/Layout.vue'),
      children: [{
        path: '',
        name: 'userGroup',
        component: () => import('./views/user/group.vue')
      }]
    },
    {
      path: '/user/list',
      component: () => import('./views/Layout.vue'),
      children: [{
        path: '',
        name: 'userList',
        component: () => import('./views/user/list.vue')
      }]
    }
  ]
})
