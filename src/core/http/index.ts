import axios, { AxiosRequestConfig } from "axios";
import { API_ENDPOINT } from "core/config";
import { logger } from "core/logger";

declare global {
  interface Window {
    API_ENDPOINT: string;
  }
}

const httpClient = axios.create({
  baseURL: window.API_ENDPOINT || API_ENDPOINT,
});

async function reqInterceptors(
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> {
  // if (excludedList.includes(config.url || '')) {
  //   return { ...config }
  // }

  // let authToken = getToken()
  // if (!authToken) {
  //   // required login
  //   throw new Error(E_INVALID_ACCESS_TOKEN)
  // }

  // post/put data modifier
  const data = { ...config.data };
  if (config.method === "post" || config.method === "put") {
    Object.keys(data).forEach((key) => {
      const val = data[key];
      if (val === "" || (Array.isArray(val) && val.length < 1)) {
        data[key] = null;
        logger.debug("null req data:", key, val);
      }
    });
  }
  const newConfig = {
    ...config,
    // headers: {
    //   Authorization: authToken.access_token,
    // },
    data,
  };

  return newConfig;
}

export async function request(config: AxiosRequestConfig): Promise<any> {
  try {
    const reqConfig = await reqInterceptors(config);
    const res = await httpClient.request(reqConfig);
    return res.data;
  } catch (error) {
    logger.debug("request error::", error.response, error);
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
  return request({ ...config, url, method: "post", data });
}

export function put(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<any> {
  return request({ ...config, url, method: "put", data });
}

export function del(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<any> {
  return request({ ...config, url, method: "delete", data });
}
