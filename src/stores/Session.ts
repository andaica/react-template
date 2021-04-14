import { observable, makeObservable, action } from 'mobx';
import UserModel, { UserType } from 'models/user/UserModel';

class Session {
  @observable userProfile?: UserType;

  constructor() {
    makeObservable(this);
  }

  @action
  protected setProfile(user: UserType | undefined) {
    this.userProfile = user;
  }

  async login(username: string, password: string) {
    this.setProfile(undefined);
    const loginRes = await UserModel.login(username, password);
    if (loginRes) {
      const profileRes = await UserModel.getProfile();
      const userProfile: UserType = {
        id: profileRes.id,
        username: profileRes.username,
        email: profileRes.email,
      };
      this.setProfile(userProfile);
    }
  }

  async logout() {
    this.setProfile(undefined);
    await UserModel.logout();
  }
}

export default new Session();
