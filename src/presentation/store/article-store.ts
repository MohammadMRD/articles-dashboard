import type { MutationTree, ActionTree } from 'vuex'
import { provideArticleUseCases, Article, CreateArticleDTO, EditArticleDTO } from '@/core'

export type ArticleState = {
  articles: Article[]
  currentPage: number
  articlesCount: number
}

type EditArticleActionPayload = {
  slug: string
  articleDTO: EditArticleDTO
}

const { getAllArticlesUseCase, getArticleUseCase, createArticleUseCase, deleteArticleUseCase, editArticleUseCase } =
  provideArticleUseCases()

// State
const state = (): ArticleState => ({ articles: [], currentPage: 1, articlesCount: 0 })

// Mutations
export enum ArticleMutations {
  SET_ARTICLES = 'set-articles',
  SET_CURRENT_PAGE = 'set-currentPage',
}

const mutations: MutationTree<ArticleState> = {
  [ArticleMutations.SET_ARTICLES](state, payload) {
    state.articles = payload.articles
    state.articlesCount = payload.articlesCount
  },

  [ArticleMutations.SET_CURRENT_PAGE](state, payload) {
    state.currentPage = payload
  },
}

//Actions
const actions: ActionTree<ArticleState, undefined> = {
  async getAllArticles({ commit, state }, page): Promise<void> {
    page = page ?? state.currentPage
    const { articles, articlesCount } = await getAllArticlesUseCase.execute(page)

    commit(ArticleMutations.SET_CURRENT_PAGE, page)
    commit(ArticleMutations.SET_ARTICLES, { articles, articlesCount })
  },

  getArticle(_, slug: string): Promise<Article> {
    return getArticleUseCase.execute({ slug })
  },

  createArticle(_, articleDTO: CreateArticleDTO): Promise<Article> {
    return createArticleUseCase.execute(articleDTO)
  },

  async deleteArticle({ dispatch }, slug: string): Promise<void> {
    await deleteArticleUseCase.execute({ slug })
    await dispatch('getAllArticles')
  },

  async editArticle({ dispatch }, { slug, articleDTO }: EditArticleActionPayload): Promise<void> {
    await editArticleUseCase.execute({ slug }, articleDTO)
    await dispatch('getAllArticles')
  },
}

// Export
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
