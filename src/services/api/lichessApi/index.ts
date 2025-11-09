import ApiService from '@/shared/services/api';

export const ChessApi = new ApiService({
  baseURL: `https://nagibin-chess.com/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});
