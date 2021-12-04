import { createStore } from 'vuex'
import userModule from './user-store'
import articleModule from './article-store'

const store = createStore({
  modules: {
    userModule,
    articleModule,
  },
})

export default store
