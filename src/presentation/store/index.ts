import { createStore } from 'vuex'
import userModule from './user-store'

const store = createStore({
  modules: {
    userModule,
  },
})

export default store
