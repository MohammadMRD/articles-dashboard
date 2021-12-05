import { Router } from 'vue-router'

export function addGuard(router: Router): void {
  router.beforeEach((to, from, next) => {
    if (!to.meta.auth) return next()

    // FIXME: Check status of user using store and cookie
    const token = localStorage.getItem('token')

    if (!token) {
      return next({ name: 'login' })
    }

    next()
  })
}
