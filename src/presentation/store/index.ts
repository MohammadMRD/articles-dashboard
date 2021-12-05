import { createStore } from 'vuex'
import userModule from './user-store'
import articleModule from './article-store'
import tagModule from './tag-store'

const store = createStore({
  modules: {
    userModule,
    articleModule,
    tagModule,
  },
})

export default store
