import { apiClient } from '@/shared/api/apiClient';
import type { PostDetail } from '@/entities/post/model/types';
import { parsePostResponse } from '@/entities/post';

export const toggleLike = async (id: string): Promise<PostDetail> => {
  const res = await apiClient.post(`/api/boards/${id}/like`);
  return parsePostResponse(res.data.data || res.data);
};
