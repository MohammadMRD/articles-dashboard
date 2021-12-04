export type Password = string
export type Username = string
export type Email = string
export type Bio = string | null
export type Image = string | null
export type Token = string | null

export class User {
  username: Username
  email: Email
  password?: Password
  bio?: Bio
  image?: Image
  token?: Token

  constructor(user: User) {
    this.username = user.username
    this.email = user.email
    this.password = user.password
    this.bio = user.bio
    this.image = user.image
    this.token = user.token
  }
}
