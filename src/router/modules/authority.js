let authority = [{
    path: '/sys/access',
    component: () => import('../../views/Layout.vue'),
    children: [{
        path: '',
        name: 'sysAccess',
        component: () => import('../../views/sys/access.vue')
    }]
}, {
    path: '/sys/pwd',
    component: () => import('../../views/Layout.vue'),
    children: [{
        path: '',
        name: 'sysPwd',
        component: () => import('../../views/sys/pwd')
    }]
}]

export default authority