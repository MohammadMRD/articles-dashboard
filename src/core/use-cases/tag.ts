import { Tag, ITagRepository } from '@/core/use-cases/interfaces'

export class GetAllTagsUesUseCase {
  constructor(private tagRepository: ITagRepository) {}

  execute(): Promise<Tag[]> {
    return this.tagRepository.list()
  }
}
