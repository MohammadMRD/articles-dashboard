import { RouteRecordRaw } from 'vue-router'
import Home from '@/presentation/pages/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
]

export default routes
