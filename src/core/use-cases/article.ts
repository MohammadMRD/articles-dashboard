import {
  IArticleRepository,
  PageNumber,
  IArticleQuery,
} from '@/core/use-cases/interfaces'
import { Article, Slug } from '../entities'

export class GetAllArticlesUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  execute(pageNumber?: PageNumber): Promise<Article[]> {
    return this.articleRepository.list(pageNumber)
  }
}

export class GetArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  execute(query: IArticleQuery): Promise<Article> {
    return this.articleRepository.get(query)
  }
}
