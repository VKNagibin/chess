import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const DEFAULT_API_TIMEOUT = 20000;

export type ApiConfig = {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
};

type RequestData = Record<string, any> | FormData;

export default class ApiService {
  private instance: AxiosInstance;

  constructor(config: ApiConfig) {
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout || DEFAULT_API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        if (error.response) {
          console.error('API Error:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('API No response:', error.request);
        } else {
          console.error('API Request error:', error.message);
        }
        return Promise.reject(error);
      },
    );
  }

  public async get<T = any>(
    path: string,
    config?: AxiosRequestConfig<RequestData>,
  ): Promise<T> {
    return this.instance.get(path, config);
  }

  public async post<T = any>(
    path: string,
    data?: RequestData,
    config?: AxiosRequestConfig<RequestData>,
  ): Promise<T> {
    return this.instance.post(path, data, config);
  }

  public async put<T = any>(
    path: string,
    data?: RequestData,
    config?: AxiosRequestConfig<RequestData>,
  ): Promise<T> {
    return this.instance.put(path, data, config);
  }

  public async patch<T = any>(
    path: string,
    data?: RequestData,
    config?: AxiosRequestConfig<RequestData>,
  ): Promise<T> {
    return this.instance.patch(path, data, config);
  }

  public async delete<T = any>(
    path: string,
    config?: AxiosRequestConfig<RequestData>,
  ): Promise<T> {
    return this.instance.delete(path, config);
  }
}
