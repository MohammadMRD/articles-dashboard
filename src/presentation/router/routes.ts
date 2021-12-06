import { RouteRecordRaw } from 'vue-router'
import AuthLayout from '@/presentation/layouts/auth-layout.vue'
import DashboardLayout from '@/presentation/layouts/dashboard-layout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'articles' },
    component: () => import('@/presentation/pages/_default.vue'),
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

  // Dashboard Pages
  {
    path: '/dashboard',
    redirect: { name: 'articles' },
    component: () => import('@/presentation/pages/_default.vue'),
    meta: {
      layout: DashboardLayout,
      auth: true,
    },
    children: [
      {
        path: 'articles',
        name: 'articles',
        component: () => import('@/presentation/pages/dashboard/articles.vue'),
      },
      {
        path: 'articles/create',
        name: 'create-article',
        component: () => import('@/presentation/pages/dashboard/create-edit-article.vue'),
      },
      {
        path: 'articles/edit/:slug',
        name: 'edit-article',
        component: () => import('@/presentation/pages/dashboard/create-edit-article.vue'),
      },
    ],
  },
]

export default routes
