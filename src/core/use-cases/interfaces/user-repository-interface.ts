import type { LoginDTO, RegisterDTO } from '@/core/dto/user-dto'
import type { User } from '@/core/entities/user'

export interface IUserRepository {
  login(user: LoginDTO): Promise<User>
  register(user: RegisterDTO): Promise<User>
}
