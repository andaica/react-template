import { BaseStore } from 'stores/base'
import UserObject from './userObject'
import sessionStore from 'stores/session/sessionStore'

export class UserStore extends BaseStore<UserObject> {
  newEmptyUser = (): UserObject => {
    if (!this.current) {
      this.current = new UserObject()
    }
    return this.current
  }

  login = async () => {
    const res = await this.current?.login()
    if (res) {
      sessionStore.loadData()
    }
    return !!res
  }
}

export default new UserStore()
