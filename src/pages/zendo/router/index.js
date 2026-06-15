import { createRouter, createWebHashHistory } from 'vue-router'
import { useZendoStore } from '../stores/zendo'
import Layout from '../views/Layout.vue'
import menuList from './menus'
console.log('menuList', menuList);

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: menuList
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/404View.vue'),
    beforeEnter: (to, from) => {
      console.log('路由独享的守卫 - beforeEnter')
      // return false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const zendoStore = useZendoStore()

  if (!zendoStore.sessionReady) {
    await zendoStore.initSession()
  }

  if (zendoStore.isAuthenticated && to.name === 'login') {
    return { name: 'home' }
  }
  if (!zendoStore.isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
})

router.beforeResolve((to, from) => {
  console.log('全局解析守卫 - beforeResolve')
})

router.afterEach((to, from) => {
  console.log('全局后置钩子 - afterEach')
})

export default router
