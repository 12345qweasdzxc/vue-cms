import { createRouter, createWebHistory } from 'vue-router'
import studentManage from './modules/student'
import courseManage from './modules/course'
import articleManage from './modules/article'

const routes = [

  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/layout/Layout.vue'),
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        name: 'profile',
        meta: {
          title: '个人中心',
        },
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile'),
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
  },
  studentManage,
  courseManage,
  articleManage
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
