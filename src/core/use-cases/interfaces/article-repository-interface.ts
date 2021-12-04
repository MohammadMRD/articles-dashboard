import { CreateArticleDTO } from '@/core/dto'
import type { Article, Slug } from '@/core/entities'

export type PageNumber = number // Start with 1
export interface IArticleQuery {
  slug: Slug
}

export interface IArticleRepository {
  list(page?: PageNumber): Promise<Article[]>
  get(query: IArticleQuery): Promise<Article>
  create(createArticleDto: CreateArticleDTO): Promise<Article>
}
