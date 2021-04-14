export const excludedList = ['api/users/login', '/user/refresh_token'];

const authKey = 'auth_token_key';

export function getToken(): string | null | undefined {
  const str = localStorage.getItem(authKey);
  if (!str) return null;
  return JSON.parse(str);
}

export function setToken(token: string | null | undefined): void {
  if (token) {
    localStorage.setItem(authKey, token);
  } else {
    localStorage.removeItem(authKey);
  }
}
