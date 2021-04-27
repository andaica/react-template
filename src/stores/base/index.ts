import { action, makeObservable, observable } from 'mobx'

export interface BaseObject {
  fromData(data?: any): void
  toData(): any
  fetchDetails(): Promise<void>
  save(data: any): Promise<boolean>
  delete(): Promise<void>
}

export abstract class BaseStore<T> {
  @observable datas: T[] = []
  @observable current?: T
  @observable total?: number

  constructor() {
    makeObservable(this)
  }

  @action
  clear = (): void => {
    this.datas.splice(0, this.datas.length)
    this.total = undefined
  }

  @action
  selectItem = (item: T): T | null => {
    const index = this.findItemIndex(item)
    if (index >= 0) {
      this.current = this.datas[index]
      return this.current
    }
    return null
  }

  @action
  addItem = (item: T): T | null => {
    const index = this.findItemIndex(item)
    if (index < 0) {
      this.datas.push(item)
      return item
    }
    return null
  }

  @action
  deleteItem = (item: T) => {
    // ;(item as any).delete()
    const index = this.findItemIndex(item)
    this.datas.splice(index, 1)
  }

  findItemIndex = (item: T): number => {
    return this.datas.findIndex(
      (_item: T) => (item as any).id === (_item as any).id
    )
  }
}
