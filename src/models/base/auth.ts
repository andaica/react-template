export const excludedList = ['/user/login', '/user/refresh_token'];

const authKey = 'auth_token_key';

export interface UserToken {
  access_token: string;
}

export function getToken(): UserToken | null | undefined {
  const str = localStorage.getItem(authKey);
  if (!str) return null;
  return JSON.parse(str);
}

// export function getRoleAlias(): string | null {
//   const str = localStorage.getItem(authKey);
//   if (str) {
//     const userToken: UserToken = JSON.parse(str);
//     const roleId = userToken.role_id;
//     if (RoleAlias[roleId]) {
//       return RoleAlias[roleId];
//     }
//   }
//   return null;
// }

export function setToken(token: UserToken | null | undefined): void {
  if (token) {
    localStorage.setItem(authKey, JSON.stringify(token));
  } else {
    localStorage.removeItem(authKey);
  }
}
