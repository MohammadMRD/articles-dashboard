import {
  IArticleRepository,
  PageNumber,
  IArticleQuery,
} from '@/core/use-cases/interfaces'
import { Article } from '@/core/entities'
import { CreateArticleDTO } from '@/core/dto'

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

export class CreateArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  execute(articleDto: CreateArticleDTO): Promise<Article> {
    return this.articleRepository.create(articleDto)
  }
}
