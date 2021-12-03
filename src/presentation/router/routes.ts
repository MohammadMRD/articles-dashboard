import { RouteRecordRaw } from 'vue-router'
import Home from '@/presentation/pages/Home.vue'
import AuthLayout from '@/presentation/layouts/auth-layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  // Auth pages
  {
    path: '/auth',
    redirect: { name: 'login' },
    component: () => import('@/presentation/pages/_default.vue'),
    meta: {
      layout: AuthLayout,
    },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/presentation/pages/auth/login.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/presentation/pages/auth/register.vue'),
      },
    ],
  },
]

export default routes
