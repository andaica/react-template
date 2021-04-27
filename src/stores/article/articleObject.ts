import { makeObservable, observable } from 'mobx'
import { BaseObject } from 'stores/base'
import ArticleModel, { Article, Author } from 'models/article'
import { updateField } from 'utils/object'

export default class ArticleObject implements BaseObject {
  @observable id = 0
  @observable title = ''
  @observable slug = ''
  @observable description = ''
  @observable body = ''
  @observable created_at = ''
  @observable updated_at = ''

  constructor() {
    makeObservable(this)
  }

  fromData = (data?: Article) => {
    if (!data) return
    updateField(this, data)
  }

  toData = (): Article => {
    return {
      id: this.id,
      title: this.title,
      slug: this.slug,
      body: this.body,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.created_at,
    }
  }

  fetchDetails = async (): Promise<void> => {
    const params = { id: this.id }
    const detail = await ArticleModel.detail(params)
    this.fromData(detail)
  }

  save = async (data: any): Promise<boolean> => {
    // console.log(data)
    if (data.id) {
      return await ArticleModel.update(data)
    } else {
      return await ArticleModel.add(data)
    }
  }

  delete = async (): Promise<void> => {
    const params = { id: this.id }
    return await ArticleModel.delete(params)
  }
}
