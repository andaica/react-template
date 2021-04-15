import Model from "models/base";
import { AuthenData } from "models/user/authen";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
};

export type LoginParam = {
  email: string;
  password: string;
};

class UserModel extends Model {
  constructor() {
    super("/users");
  }

  getSearchUrl(): string {
    return this.endpoint;
  }

  public async login(params: LoginParam): Promise<AuthenData | null> {
    try {
      const res = await this.http.post("/users/login", params);
      if (res.status === "OK") {
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

export default new UserModel();
