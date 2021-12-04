import type { User } from '@/core/entities/user'

export type Slug = string
export type Title = string
export type Description = string
export type ArticleBody = string
export type CreatedAt = Date
export type UpdatedAt = Date
export type TagList = string[]
export type Author = User

// Notice: We can create a builder class for Article
export class Article {
  slug?: Slug
  title: Title
  description: Description
  body: ArticleBody
  createdAt?: CreatedAt
  updatedAt?: UpdatedAt
  tagList: TagList
  author: Author

  constructor(article: Article) {
    this.slug = article.slug
    this.title = article.title
    this.description = article.description
    this.body = article.body
    this.createdAt = article.createdAt
    this.updatedAt = article.updatedAt
    this.tagList = article.tagList
    this.author = article.author
  }
}
