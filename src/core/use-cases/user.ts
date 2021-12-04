import type { LoginDTO, RegisterDTO } from '@/core/dto/user-dto'
import type { User } from '@/core/entities/user'
import type { IUserRepository } from '@/core/use-cases/interfaces/user-repository-interface'

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(loginDto: LoginDTO): Promise<User> {
    return this.userRepository.login(loginDto)
  }
}

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(registerDto: RegisterDTO): Promise<User> {
    return this.userRepository.register(registerDto)
  }
}

export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  execute(): Promise<User> {
    return this.userRepository.currentUser()
  }
}
