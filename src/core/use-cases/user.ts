import type { LoginDTO } from '@/core/dto/user-dto'
import type { User } from '@/core/entities/user'
import type { IUserRepository } from '@/core/use-cases/interfaces/user-repository-interface'

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(loginDto: LoginDTO): Promise<User> {
    const user = await this.userRepository.login(loginDto)

    return user
  }
}
