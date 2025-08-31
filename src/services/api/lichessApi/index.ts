import ApiService from '@/shared/services/api';

export const ChessApi = new ApiService({
  baseURL: 'http://localhost:3005/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
