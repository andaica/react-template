/* eslint-disable import/prefer-default-export */
import axios, { AxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from 'core/config';
import { UserToken, setToken, getToken, excludedList } from './auth';

// declare global {
//   interface Window {
//     API_ENDPOINT: string;
//   }
// }

export const API_NOTIFIER = 'API-NOTIFIER';
const E_INVALID_ACCESS_TOKEN = 'E_INVALID_ACCESS_TOKEN';

const httpClient = axios.create({
  baseURL: API_ENDPOINT,
});

async function reqInterceptors(
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> {
  if (excludedList.includes(config.url || '')) {
    return { ...config, headers: { debugid: 0 } };
  }

  // let authToken = getToken();
  // if (!authToken) {
  //   // required login
  //   throw new Error(E_INVALID_ACCESS_TOKEN);
  // }

  // post/put data modifier
  const data = { ...config.data };
  if (config.method === 'post' || config.method === 'put') {
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (val === '' || (Array.isArray(val) && val.length < 1)) {
        data[key] = null;
        console.log('null req data:', key, val);
      }
    });
  }
  const newConfig = {
    ...config,
    headers: {
      // Authorization: authToken.access_token,
      'Access-Control-Allow-Origin': '*',
    },
    data,
  };

  return newConfig;
}

export async function request(config: AxiosRequestConfig): Promise<any> {
  try {
    const reqConfig = await reqInterceptors(config);
    const res = await httpClient.request(reqConfig);
    return res.data.data;
  } catch (error) {
    console.log('request error: ', error.response, error);
    if (error.response) {
      console.error(error.response);
    } else if (error.message) {
      console.error(error.messages);
    } else {
      console.error(error);
    }

    return Promise.reject(error);
  }
}

export function get(
  url: string,
  params?: any,
  config?: AxiosRequestConfig
): Promise<any> {
  return request({ ...config, url, params });
}

export function post(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<any> {
  console.log(data);
  return request({ ...config, url, method: 'post', data });
}

export function put(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<any> {
  return request({ ...config, url, method: 'put', data });
}

export function del(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<any> {
  return request({ ...config, url, method: 'delete', data });
}
