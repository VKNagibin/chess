// import OpenAI from 'openai';
import type { ApiConfig } from '@/services/api/index';
import ApiService from '@/services/api/index';

const deepSeekToken = 'sk-rC64EfC12tlhYR4B1uzOParrefdnrptE';
const deepSeekBaseURL = 'https://api.proxyapi.ru/deepseek/v1';

const apiConfig: ApiConfig = {
  // import.meta.env.DEEPSEEK_API_URL ||
  baseURL: deepSeekBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${deepSeekToken}`,
  },
};

const deepSeekApi = new ApiService(apiConfig);

export default deepSeekApi;
