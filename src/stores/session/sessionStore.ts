import { makeObservable, observable, computed, action } from "mobx";
import authen from "models/user/authen";

class Session {
  @observable id = 0;

  @observable token = "";

  constructor() {
    makeObservable(this);
  }

  init(): void {
    this.loadData();
  }

  @action
  loadData = () => {
    const data = authen.getAuthenData();
    if (data) {
      this.id = data.id;
      this.token = data.token;
    }
  };

  @computed
  public get isLoggedIn(): boolean {
    return !!this.token;
  }
}

export default new Session();
