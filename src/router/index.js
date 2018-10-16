import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import userRouter from './modules/user'
import configManagePage from './modules/configManage'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/setting',
      component: () => import('../views/Layout.vue'),
      children: [{
        path: '',
        name: '个人中心',
        component: () => import('../views/setting.vue')
      }]
    },
    ...configManagePage,
    ...userRouter
  ]
})

export default router
