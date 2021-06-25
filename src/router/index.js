import { createRouter, createWebHashHistory } from 'vue-router'

// 异步组件
const Recommend = () =>
  import('@/views/Recommend' /* webpackChunkName: "Recommend" */)

const Album = () => import('@/views/Album' /* webpackChunkName: "Album" */)

const Singer = () => import('@/views/Singer' /* webpackChunkName: "Singer" */)

const SingerDetail = () =>
  import('@/views/SingerDetail' /* webpackChunkName: "SingerDetail" */)

const TopList = () =>
  import('@/views/TopList' /* webpackChunkName: "TopList" */)

const TopDetail = () =>
  import('@/views/TopDetail' /* webpackChunkName: "TopDetail" */)

const Search = () => import('@/views/Search' /* webpackChunkName: "Search" */)

const UserCenter = () =>
  import('@/views/UserCenter' /* webpackChunkName: "UserCenter" */)

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
    children: [
      {
        path: ':id',
        component: SingerDetail,
      },
    ],
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
    children: [
      {
        path: ':id',
        component: TopDetail,
      },
    ],
  },
  {
    path: '/user',
    components: {
      user: UserCenter,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
