import { ITagRepository, Tag } from '@/core/use-cases/interfaces'
import { Api, IApiOptions } from '@/core/services'

export class TagRepository implements ITagRepository {
  private api: Api
  private baseUrl = 'https://api.realworld.io/api'

  constructor() {
    this.api = new Api({ baseURL: this.baseUrl })
  }

  async list(): Promise<Tag[]> {
    const options: IApiOptions = {
      method: 'GET',
      url: '/tags',
      withAuth: true,
    }

    const { data } = await this.api.send<{ tags: Tag[] }>(options)

    return data.tags
  }
}
