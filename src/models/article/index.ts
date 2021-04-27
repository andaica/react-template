import Model from 'models/base'

export type Article = {
  id: number
  title: string
  slug: string
  description?: string
  body?: string
  author?: Author
  created_at?: string
  updated_at?: string
}

export type Author = {
  username: string
  bio?: string
  image?: string
}

class ArticleModel extends Model {
  constructor(private obj: any = null) {
    super('/articles')
    if (obj) {
      Object.assign(this, obj)
    }
  }

  getSearchUrl = (): string => {
    return this.endpoint
  }

  getDeleteUrl = (): string => {
    return this.endpoint + '/delete'
  }

  getUpdateUrl = (): string => {
    return this.endpoint + '/update'
  }

  getDetailUrl = (): string => {
    return this.endpoint + '/detail'
  }
}

export default new ArticleModel()
