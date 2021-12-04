import type { MutationTree, ActionTree } from 'vuex'
import { provideUserUseCases, User, LoginDTO, RegisterDTO } from '@/core'

export type UserState = { user: User | null }

const { loginUseCase, registerUseCase, getCurrentUserUseCase } = provideUserUseCases()

// State
const state = (): { user: User | null } => ({ user: null })

// Mutations
export enum UserMutations {
  SET_USER = 'set-user',
}

const mutations: MutationTree<{ user: User }> = {
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
}

// Export
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
