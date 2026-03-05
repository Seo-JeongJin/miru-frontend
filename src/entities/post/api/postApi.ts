import { apiClient } from '@/shared/api/apiClient';
import type { Post } from '@/entities/post/model/types';

export interface PostListResponse {
  posts: Post[];
  totalCount: number;
}

export interface CreatePostPayload {
  title: string;
  content: string;
}

export const postApi = {
  /** 게시글 목록 조회 (페이지당 10개) */
  getPosts: async (page: number): Promise<PostListResponse> => {
    const { data } = await apiClient.get('/api/boards', {
      params: { page, size: 10 },
    });
    return { posts: data.data.items, totalCount: data.data.totalCount };
  },

  /** 게시글 상세 조회 */
  getPost: async (postId: number): Promise<Post> => {
    const { data } = await apiClient.get(`/api/boards/${postId}`);
    return data;
  },

  /** 게시글 작성 */
  createPost: async (payload: CreatePostPayload): Promise<Post> => {
    const { data } = await apiClient.post('/api/board/posting', payload);
    return data;
  },
};
