import { Article, Title, Description, ArticleBody, TagList } from '@/core/entities'
import {
  createFormSchema,
  articleTitleSchema,
  articleBodySchema,
  articleDescriptionSchema,
  tagsSchema,
  FormSchema,
  validateForm,
} from '@/core/services/validation'

type ArticleErrors = {
  title?: string
  description?: string
  body?: string
  tagList?: string
}

export class CreateArticleDTO {
  errors: ArticleErrors = {}

  constructor(
    public title: Title,
    public description: Description,
    public body: ArticleBody,
    public tagList: TagList
  ) {}

  static fromArticle(article: Article): CreateArticleDTO {
    return new CreateArticleDTO(article.title, article.description, article.body, article.tagList)
  }

  static getSchema(): FormSchema {
    return createFormSchema({
      title: articleTitleSchema,
      description: articleDescriptionSchema,
      body: articleBodySchema,
      tagList: tagsSchema,
    })
  }

  async validate(): Promise<boolean> {
    const errors = await validateForm(CreateArticleDTO.getSchema(), this)

    this.errors = errors ?? {}

    return !errors
  }
}

export class EditArticleDTO extends CreateArticleDTO {}
