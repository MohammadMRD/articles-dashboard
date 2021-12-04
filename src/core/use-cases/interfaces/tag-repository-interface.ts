export type Tag = string

export interface ITagRepository {
  list(): Promise<Tag[]>
}
