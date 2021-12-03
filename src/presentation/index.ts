import { createApp } from 'vue'
import App from '@/presentation/App.vue'
import router from '@/presentation/router'
import { registerComponents } from '@/presentation/utils'

const app = createApp(App).use(router)

registerComponents(app)
app.mount('#app')
