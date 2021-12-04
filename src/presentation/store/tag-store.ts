import type { MutationTree, ActionTree } from 'vuex'
import { provideTagUseCases, TagList } from '@/core'

export type TagState = {
  tags: TagList | null
}

const { getAllTagsUseCase } = provideTagUseCases()

// State
const state = (): TagState => ({ tags: null })

// Mutations
export enum TagMutations {
  SET_Tags = 'set-tags',
}

const mutations: MutationTree<TagState> = {
  [TagMutations.SET_Tags](state, payload) {
    state.tags = payload
  },
}

//Actions
const actions: ActionTree<TagState, undefined> = {
  async getAllTags({ commit }): Promise<void> {
    const tags = await getAllTagsUseCase.execute()
    commit(TagMutations.SET_Tags, tags)
  },
}

// Export
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
