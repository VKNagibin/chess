import ApiService from '@/shared/services/api';

export const ChessApi = new ApiService({
  baseURL: `http://92.63.106.114/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});
