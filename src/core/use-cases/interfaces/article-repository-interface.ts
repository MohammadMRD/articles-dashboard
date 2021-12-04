import type { Article } from '@/core/entities'

export type PageNumber = number // Start with 1

export interface IArticleRepository {
  list(page?: PageNumber): Promise<Article[]>
}
