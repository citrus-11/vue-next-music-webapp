import { createRouter, createWebHashHistory } from 'vue-router'

// 异步组件
const Recommend = () =>
  import('@/views/Recommend' /* webpackChunkName: "recommend" */)

const Singer = () => import('@/views/Singer' /* webpackChunkName: "singer" */)

const TopList = () =>
  import('@/views/TopList' /* webpackChunkName: "top-list" */)

const Search = () => import('@/views/Search' /* webpackChunkName: "search" */)

const SingerDetail = () =>
  import('@/views/SingerDetail' /* webpackChunkName: "singer-detail" */)

const Album = () => import('@/views/Album' /* webpackChunkName: "album" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album,
      },
    ],
  },
  {
    path: '/search',
    component: Search,
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail,
      },
    ],
  },
  {
    path: '/top-list',
    component: TopList,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
