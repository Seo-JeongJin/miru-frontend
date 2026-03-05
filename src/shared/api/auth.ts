import { apiClient } from './apiClient';

export interface User {
  id: number;
  email: string;
  nickname: string;
  role: string;
  status: string;
}

export const authApi = {
  /** 현재 로그인 유저 정보 조회 - auth */
  getMe: async (): Promise<User> => {
    const res = await apiClient.get<User>('/api/me');
    return res.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/logout');
  },
};
