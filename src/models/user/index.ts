import Model from "models/base";
import authen, { AuthenData } from "models/user/authen";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type LoginParam = {
  email: string;
  password: string;
};

export class UserModel extends Model {
  constructor() {
    super("/users");
  }

  getSearchUrl(): string {
    return this.endpoint;
  }

  public async login(params: LoginParam): Promise<AuthenData | null> {
    try {
      const res = await this.http.post("/users/login", params);
      if (res.status == "OK") {
        authen.saveAuthenData(res.user);
        return res.user;
      } else {
        return null;
      }
    } catch (error) {
      this.logger.error("search error:", error);
      return null;
    }
  }
}
