import type { Email, Password, User, Username } from '@/core/entities/user'

export class LoginDTO {
  constructor(public email: Email, public password: Password) {}

  static fromUser(user: User): LoginDTO {
    return new LoginDTO(user.email, user.password || '')
  }
}

export class RegisterDTO {
  constructor(public email: Email, public password: Password, public username: Username) {}

  static fromUser(user: User): RegisterDTO {
    return new RegisterDTO(user.email, user.password || '', user.username)
  }
}
