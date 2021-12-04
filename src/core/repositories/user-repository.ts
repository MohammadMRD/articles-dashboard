import type { LoginDTO, RegisterDTO } from '@/core/dto/user-dto'
import type { User } from '@/core/entities/user'
import type { IUserRepository } from '@/core/use-cases/interfaces'
import { Api, IApiOptions } from '@/core/services'

export class UserRepository implements IUserRepository {
  private api: Api
  private baseUrl = 'https://api.realworld.io/api'

  constructor() {
    this.api = new Api({ baseURL: this.baseUrl })
  }

  async login(user: LoginDTO): Promise<User> {
    const options: IApiOptions = {
      url: '/users/login',
      method: 'POST',
      data: { user },
    }

    const { data } = await this.api.send<{ user: User }>(options)
    Api.sharedToken = data.user.token as string

    return data.user
  }

  async register(user: RegisterDTO): Promise<User> {
    const options: IApiOptions = {
      url: '/users',
      method: 'POST',
      data: { user },
    }

    const { data } = await this.api.send<{ user: User }>(options)

    return data.user
  }

  async currentUser(): Promise<User> {
    const options: IApiOptions = {
      url: '/user',
      method: 'GET',
      withAuth: true,
    }

    const { data } = await this.api.send<{ user: User }>(options)

    return data.user
  }
}
