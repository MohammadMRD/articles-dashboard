import { IArticleRepository, PageNumber, IArticleQuery } from '@/core/use-cases/interfaces'
import { Article } from '@/core/entities'
import { CreateArticleDTO, EditArticleDTO } from '@/core/dto'

export class GetAllArticlesUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  execute(pageNumber?: PageNumber): Promise<{ articlesCount: number; articles: Article[] }> {
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

export class DeleteArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  execute(
    query: IArticleQuery,
    pageNumber?: PageNumber
  ): Promise<{ articlesCount: number; articles: Article[] }> | undefined {
    this.articleRepository.delete(query)

    return pageNumber ? this.articleRepository.list(pageNumber) : undefined
  }
}

export class EditArticleUseCase {
  constructor(private articleRepository: IArticleRepository) {}

  execute(query: IArticleQuery, articleDto: EditArticleDTO): Promise<Article> {
    return this.articleRepository.edit(query, articleDto)
  }
}
