import type { Email, Password, User, Username } from '@/core/entities/user'

export class LoginDTO {
  constructor(public email: Email, public password: Password) {}

  fromUser(user: User): void {
    this.email = user.email
    this.password = user.password || ''
  }
}

export class RegisterDTO {
  constructor(
    public email: Email,
    public password: Password,
    public username: Username
  ) {}

  fromUser(user: User): void {
    this.email = user.email
    this.password = user.password || ''
    this.username = user.username
  }
}
