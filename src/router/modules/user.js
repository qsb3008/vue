let userPage = [{
  path: '/user/menu',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: 'userMenu',
    meta: { pathName: '菜单列表' },
    component: () => import('../../views/user/menu.vue')
  }]
},
{
  path: '/user/group',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: '用户分组',
    meta: { pathName: '用户分组' },
    component: () => import('../../views/user/group.vue')
  }]
},
{
  path: '/user/list',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: '用户列表',
    meta: { pathName: '用户列表' },
    component: () => import('../../views/user/list.vue')
  }]
},
{
  path: '/user/role2',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: 'userRole2',
    component: () => import('../../views/user/role2.vue')
  }]
},
{
  path: '/user/role3',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: 'userRole3',
    component: () => import('../../views/user/role3.vue')
  }]
},
{
  path: '/user/role',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: 'userRole',
    component: () => import('../../views/user/role.vue')
  }]
}]

export default userPage
