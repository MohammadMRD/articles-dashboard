import {
  createFormSchema,
  usernameSchema,
  passwordSchema,
  emailSchema,
  FormSchema,
  validateForm,
} from '@/core/services/validation'
import type { Email, Password, User, Username } from '@/core/entities/user'

export type LoginErrors = {
  email?: string
  password?: string
}

export type RegisterErrors = {
  email?: string
  username?: string
  password?: string
}

export class LoginDTO {
  errors: LoginErrors = {}

  constructor(public email: Email, public password: Password) {}

  static fromUser(user: User): LoginDTO {
    return new LoginDTO(user.email, user.password || '')
  }

  static getSchema(): FormSchema {
    return createFormSchema({ email: emailSchema, password: passwordSchema })
  }

  async validate(): Promise<boolean> {
    const errors = await validateForm(LoginDTO.getSchema(), this)

    this.errors = errors ?? {}

    return !errors
  }
}

export class RegisterDTO {
  errors: RegisterErrors = {}

  constructor(public email: Email, public password: Password, public username: Username) {}

  static fromUser(user: User): RegisterDTO {
    return new RegisterDTO(user.email, user.password || '', user.username)
  }

  static getSchema(): FormSchema {
    return createFormSchema({ email: emailSchema, password: passwordSchema, username: usernameSchema })
  }

  async validate(): Promise<boolean> {
    const errors = await validateForm(RegisterDTO.getSchema(), this)
    this.errors = errors ?? {}

    return !errors
  }
}
