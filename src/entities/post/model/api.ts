import { apiClient } from '@/shared/api/apiClient';
import { PostDetail } from './types';

type ApiPost = {
  id: number;
  type: string;
  title: string;
  writer: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  content?: string;
  comments?: unknown[];
  liked?: boolean;
};

type ApiPostResponse = {
  items?: ApiPost[];
  liked?: boolean;
} & ApiPost;

export const parsePostResponse = (data: ApiPostResponse): PostDetail => {
  // 응답 구조: { data: { items: [...] } } 또는 { data: { ...post } } 또는 { ...post }
  const post: ApiPost = data?.items?.[0] ?? data ?? {};
  return {
    ...(post as PostDetail),
    isLiked: post.liked ?? false,
  };
};

export const fetchPostById = async (id: string): Promise<PostDetail> => {
  const res = await apiClient.get(`/api/boards/${id}`);
  return parsePostResponse(res.data.data || res.data);
};
