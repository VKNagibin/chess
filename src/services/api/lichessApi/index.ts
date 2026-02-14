import ApiService from '@/shared/services/api';

export const ChessApi = new ApiService({
  baseURL: `${window.location.origin}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});
