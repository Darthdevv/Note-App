import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface APIMethodHandlerConfig {
  GET?: APIMethodConfig;
  POST?: APIMethodConfig;
  PUT?: APIMethodConfig;
  DELETE?: APIMethodConfig;
}

interface APIMethodConfig {
  endpoint: string; // The API endpoint
  body?: object;
  headers?: object;
  credentials?: boolean;
  responseType?: AxiosRequestConfig["responseType"]; // Optional responseType
}

export function apiClientHandler(config: APIMethodHandlerConfig) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  return async function (
    method: keyof APIMethodHandlerConfig,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    const apiMethod = config?.[method];

    // 405 if the method doesn't exist.
    if (!apiMethod) {
      throw new Error(`${method} method not allowed.`);
    }

    const requestConfig: AxiosRequestConfig = {
      method: method.toUpperCase(),
      url: `${baseUrl}/${apiMethod.endpoint}`, // Use the base URL and endpoint
      data: apiMethod.body,
      headers: apiMethod.headers,
      withCredentials: true,
      responseType: apiMethod.responseType, // Include responseType if provided
      ...options, // Merge with additional options, if any
    };

    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios(requestConfig);
      return response;
    } catch (error) {
      // Handle errors as needed
      throw error;
    }
  };
}
