import * as HTTPClient from 'models/base/http_client';
import { setToken } from 'models/base/auth';

export type UserType = {
  id: string;
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  displayName?: string;
};

class UserModel {
  public async login(username: string, password: string): Promise<any> {
    try {
      const res = await HTTPClient.post('api/users/login', {
        username,
        password,
      });
      if (res) {
        setToken(res.token);
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  }

  public async logout(): Promise<any> {
    try {
      const res = await HTTPClient.post('api/users/logout');
      setToken(undefined);
      return res;
    } catch (error) {
      console.error('Logout error: ', error);
    }
  }

  public async getProfile(): Promise<any> {
    try {
      const res = await HTTPClient.get('api/users/profile');
      return res;
    } catch (error) {
      console.error('Get user profile error: ', error);
      return;
    }
  }
}

export default new UserModel();
