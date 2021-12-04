import { IArticleRepository, PageNumber } from '@/core/use-cases/interfaces'
import { Article } from '../entities'

export class GetAllArticlesUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  execute(pageNumber?: PageNumber): Promise<Article[]> {
    return this.articleRepository.list(pageNumber)
  }
}
