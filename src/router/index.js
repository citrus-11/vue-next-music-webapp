import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    component: () => import('@/views/Recommend'),
  },
  {
    path: '/search',
    component: () => import('@/views/Search'),
  },
  {
    path: '/singer',
    component: () => import('@/views/Singer'),
  },
  {
    path: '/top-list',
    component: () => import('@/views/TopList'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
