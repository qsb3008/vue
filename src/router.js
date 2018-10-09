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
        meta: {pathName: '菜单列表'},
        component: () => import('./views/user/menu.vue')
      }]
    },
    {
      path: '/user/group',
      component: () => import('./views/Layout.vue'),
      children: [{
        path: '',
        name: '用户分组',
        meta: {pathName: '用户分组'},
        component: () => import('./views/user/group.vue')
      }]
    },
    {
      path: '/user/list',
      component: () => import('./views/Layout.vue'),
      children: [{
        path: '',
        name: '用户列表',
        meta: {pathName: '用户列表'},
        component: () => import('./views/user/list.vue')
      }]
    },
    {
      path: '/user/role',
      component: () => import('./views/Layout.vue'),
      children: [{
        path: '',
        name: 'userRole',
        component: () => import('./views/user/role.vue')
      }]
    }
  ]
})
