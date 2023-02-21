import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Home from "@/views/home.vue"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/msg',
    component: () => import('@/views/pages/msg.vue')
  },
  {
    path: '/imgUpload',
    component: () => import('@/views/pages/imgUpload.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router