import type { Email, Password, User } from '@/core/entities/user'

export class LoginDTO {
  constructor(public email: Email, public password: Password) {}

  fromUser(user: User): void {
    this.email = user.email
    this.password = user.password || ''
  }
}
