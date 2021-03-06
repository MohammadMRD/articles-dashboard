import type { MutationTree, ActionTree } from 'vuex'
import { provideUserUseCases, User, LoginDTO, RegisterDTO } from '@/core'
import router from '../router'

export type UserState = { user: User | null }

const { loginUseCase, registerUseCase, getCurrentUserUseCase } = provideUserUseCases()

// State
const state = (): UserState => ({ user: null })

// Mutations
export enum UserMutations {
  SET_USER = 'set-user',
}

const mutations: MutationTree<UserState> = {
  [UserMutations.SET_USER](state, payload) {
    state.user = payload
  },
}

//Actions
const actions: ActionTree<UserState, undefined> = {
  async login({ commit }, payload: LoginDTO): Promise<void> {
    const user = await loginUseCase.execute(payload)
    commit(UserMutations.SET_USER, user)
  },

  async register({ commit }, payload: RegisterDTO) {
    const user = await registerUseCase.execute(payload)
    commit(UserMutations.SET_USER, user)
  },

  async getCurrentUser({ commit }) {
    const user = await getCurrentUserUseCase.execute()
    commit(UserMutations.SET_USER, user)
  },

  async logout({ commit }) {
    localStorage.removeItem('token')
    await router.push({ name: 'login' })
    commit(UserMutations.SET_USER, null)
  },
}

// Export
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
