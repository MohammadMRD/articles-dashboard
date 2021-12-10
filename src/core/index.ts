import { UserRepository, ArticleRepository, TagRepository } from '@/core/repositories'
import { UserUseCases, ArticleUseCases, TagUseCases } from '@/core/use-cases'

export * from './entities'
export * from './dto'
export * from './services/validation'

type ProvideUserUseCases = {
  getCurrentUserUseCase: UserUseCases.GetCurrentUserUseCase
  loginUseCase: UserUseCases.LoginUseCase
  registerUseCase: UserUseCases.RegisterUseCase
}

type ProvideArticleUseCases = {
  getAllArticlesUseCase: ArticleUseCases.GetAllArticlesUseCase
  getArticleUseCase: ArticleUseCases.GetArticleUseCase
  createArticleUseCase: ArticleUseCases.CreateArticleUseCase
  editArticleUseCase: ArticleUseCases.EditArticleUseCase
  deleteArticleUseCase: ArticleUseCases.DeleteArticleUseCase
}

type ProvideTagUseCases = {
  getAllTagsUseCase: TagUseCases.GetAllTagsUesUseCase
}

export function provideUserUseCases(): ProvideUserUseCases {
  const userRepository = new UserRepository()
  const getCurrentUserUseCase = new UserUseCases.GetCurrentUserUseCase(userRepository)
  const loginUseCase = new UserUseCases.LoginUseCase(userRepository)
  const registerUseCase = new UserUseCases.RegisterUseCase(userRepository)

  return { getCurrentUserUseCase, loginUseCase, registerUseCase }
}

export function provideArticleUseCases(): ProvideArticleUseCases {
  const articleRepository = new ArticleRepository()
  const getAllArticlesUseCase = new ArticleUseCases.GetAllArticlesUseCase(articleRepository)
  const getArticleUseCase = new ArticleUseCases.GetArticleUseCase(articleRepository)
  const createArticleUseCase = new ArticleUseCases.CreateArticleUseCase(articleRepository)
  const editArticleUseCase = new ArticleUseCases.EditArticleUseCase(articleRepository)
  const deleteArticleUseCase = new ArticleUseCases.DeleteArticleUseCase(articleRepository)

  return { getAllArticlesUseCase, getArticleUseCase, createArticleUseCase, editArticleUseCase, deleteArticleUseCase }
}

export function provideTagUseCases(): ProvideTagUseCases {
  const tagRepository = new TagRepository()
  const getAllTagsUseCase = new TagUseCases.GetAllTagsUesUseCase(tagRepository)

  return { getAllTagsUseCase }
}
