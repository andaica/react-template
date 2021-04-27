import { BaseStore } from 'stores/base'
import ArticleObject from './articleObject'
import ArticleModel from 'models/article'

type ArticleCreateParam = {
  title: string
  slug: string
  description: string
  body: string
}
export class ArticleStore extends BaseStore<ArticleObject> {
  newEmptyArticle = (): ArticleObject => {
    if (!this.current) {
      this.current = new ArticleObject()
    }
    return this.current
  }

  getArticle = async () => {
    const res = await ArticleModel.search('')
    // console.log(res)
    this.datas = res.articles.map((art: any) => {
      const artO = new ArticleObject()
      artO.fromData(art)
      return artO
    })
    this.total = res.articleCount
    console.log(this.datas)
  }

  createArticle = async (param: ArticleCreateParam) => {
    console.log('this.current: ', this.current)
    const res = await this.current?.save(param)
    console.log(res)
  }
}

export default new ArticleStore()
