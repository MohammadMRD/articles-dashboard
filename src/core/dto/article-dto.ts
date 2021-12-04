import {
  Article,
  Title,
  Description,
  ArticleBody,
  TagList,
} from '@/core/entities'

export class CreateArticleDTO {
  constructor(
    public title: Title,
    public description: Description,
    public body: ArticleBody,
    public tagList: TagList
  ) {}

  static fromArticle(article: Article): CreateArticleDTO {
    return new CreateArticleDTO(
      article.title,
      article.description,
      article.body,
      article.tagList
    )
  }
}

export class EditArticleDTO extends CreateArticleDTO {}
