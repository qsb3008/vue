let configManagePage = [ {
  path: '/org/list',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: '/org/list',
    component: () => import('../../views/access/seek.vue')
  }]
},
{
  path: '/group/list',
  component: () => import('../../views/Layout.vue'),
  children: [{
    path: '',
    name: '/group/list',
    component: () => import('../../views/access/seek.vue')
  }]
}]

export default configManagePage
