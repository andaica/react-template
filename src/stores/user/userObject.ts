import { makeObservable, observable } from "mobx";
import userModel, { User } from "models/user";
import authen from "models/user/authen";
import { BaseObject } from "stores/base";
import { updateField } from "utils/object";

export default class UserObject implements BaseObject {
  @observable id = 0;

  @observable username = "";

  @observable email = "";

  @observable password = "";

  @observable avatar?: string;

  constructor() {
    makeObservable(this);
  }

  fromData = (data?: User) => {
    if (!data) return;
    updateField(this, data);
  };

  toData = (): User => {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      avatar: this.avatar,
    };
  };

  fetchDetails(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  save(data: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  login = async (): Promise<boolean> => {
    const res = await userModel.login({
      email: this.email,
      password: this.password,
    });
    if (res) {
      authen.saveAuthenData(res);
    }
    return !!res;
  };
}
