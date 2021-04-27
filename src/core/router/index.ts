import { action, observable, makeObservable } from 'mobx'

export type RouterItem = {
  path: string
  view: React.ReactNode
  exact?: boolean
}

export class Router {
  @observable routerList: RouterItem[] = []

  constructor() {
    makeObservable(this)
  }

  @action addRouter = (router: RouterItem) => {
    this.routerList.push(router)
  }

  getAll = (): RouterItem[] => {
    return this.routerList
  }
}

export default new Router()
