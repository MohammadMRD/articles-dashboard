import { IArticleQuery, IArticleRepository } from '@/core/use-cases/interfaces'
import { CreateArticleDTO, EditArticleDTO } from '@/core/dto'
import { Article } from '@/core/entities'
import { Api, IApiOptions } from '@/core/services'

export class ArticleRepository implements IArticleRepository {
  private api: Api
  private baseUrl = 'https://api.realworld.io/api'

  constructor() {
    this.api = new Api({ baseURL: this.baseUrl })
  }

  async list(page = 1): Promise<{ articlesCount: number; articles: Article[] }> {
    const shouldSendPageNumber = page > 1

    const options: IApiOptions = {
      method: 'GET',
      url: '/articles' + (shouldSendPageNumber ? `/page/${page}` : ''),
      withAuth: true,
    }

    const { data } = await this.api.send<{ articlesCount: number; articles: Article[] }>(options)

    return { articlesCount: data.articlesCount, articles: data.articles.map((article) => new Article(article)) }
  }

  async get(query: IArticleQuery): Promise<Article> {
    const options: IApiOptions = {
      method: 'GET',
      url: `/articles/${query.slug}`,
      withAuth: true,
    }

    const { data } = await this.api.send<{ article: Article }>(options)

    return new Article(data.article)
  }

  async create(createArticleDto: CreateArticleDTO): Promise<Article> {
    const options: IApiOptions = {
      method: 'POST',
      url: `/articles`,
      withAuth: true,
      data: { article: createArticleDto },
    }

    const { data } = await this.api.send<{ article: Article }>(options)

    return new Article(data.article)
  }

  async delete(query: IArticleQuery): Promise<void> {
    const options: IApiOptions = {
      method: 'DELETE',
      url: `/articles/${query.slug}`,
      withAuth: true,
    }

    await this.api.send<{ article: Article }>(options)
  }

  async edit(query: IArticleQuery, editArticleDto: EditArticleDTO): Promise<Article> {
    const options: IApiOptions = {
      method: 'PUT',
      url: `/articles/${query.slug}`,
      withAuth: true,
      data: { article: editArticleDto },
    }

    const { data } = await this.api.send<{ article: Article }>(options)

    return new Article(data.article)
  }
}
