export type AuthenData = {
  id: number;
  token: string;
};

const userAuthenKey = "user_authen";

const saveAuthenData = (data: AuthenData) => {
  localStorage.setItem(userAuthenKey, JSON.stringify(data));
};

const getAuthenData = (): AuthenData | null => {
  const authenData = localStorage.getItem(userAuthenKey);
  return authenData ? JSON.parse(authenData) : null;
};

const clearAuthenData = () => {
  localStorage.removeItem(userAuthenKey);
};

const authen = { saveAuthenData, getAuthenData, clearAuthenData };
export default authen;
