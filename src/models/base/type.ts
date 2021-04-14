export type ApiRes<T> = {
  code: 'SUCCESS' | string; // result code
  data?: T; // response data
  msg?: string; // error message
};
