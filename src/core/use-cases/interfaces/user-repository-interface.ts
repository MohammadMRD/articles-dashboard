import type { LoginDTO } from '@/core/dto/user-dto'
import type { User } from '@/core/entities/user'

export interface IUserRepository {
  login(user: LoginDTO): Promise<User>
}
