import { createApp } from 'vue'
import App from '@/presentation/App.vue'
import router from '@/presentation/router'
import store from '@/presentation/store'
import { registerComponents } from '@/presentation/utils'

const app = createApp(App).use(router).use(store)

registerComponents(app)
app.mount('#app')
