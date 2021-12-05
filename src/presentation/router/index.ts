import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { addGuard } from './middleware'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

addGuard(router)

export default router
