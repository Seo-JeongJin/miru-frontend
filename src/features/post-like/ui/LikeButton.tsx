'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { toggleLike } from '../model/api';
import { postQueryKeys } from '@/entities/post/model/usePostsQuery';
import type { PostDetail } from '@/entities/post/model/types';
import { cn } from '@/lib/utils';
import { useLoginRequired } from '@/shared/lib/hooks/useLoginRequired';

interface LikeButtonProps {
  postId: string;
  likeCount: number;
  isLiked: boolean;
}

export function LikeButton({ postId, likeCount: initialLikeCount, isLiked: initialIsLiked }: LikeButtonProps) {
  const queryClient = useQueryClient();
  const { checkAuth } = useLoginRequired();
  const detailKey = postQueryKeys.detail(parseInt(postId));

  const [likeState, setLikeState] = useState({
    isLiked: initialIsLiked,
    likeCount: initialLikeCount,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleLike(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: detailKey });
      const previous = queryClient.getQueryData<PostDetail>(detailKey);

      const newIsLiked = !likeState.isLiked;
      const newLikeCount = newIsLiked ? likeState.likeCount + 1 : likeState.likeCount - 1;

      setLikeState({ isLiked: newIsLiked, likeCount: newLikeCount });

      queryClient.setQueryData<PostDetail>(detailKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          isLiked: newIsLiked,
          likeCount: newLikeCount,
        };
      });

      return { previous };
    },
    onSuccess: (data) => {
      setLikeState({ isLiked: data.isLiked, likeCount: data.likeCount });
      queryClient.setQueryData<PostDetail>(detailKey, (old) => ({
        ...old,
        ...data,
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: detailKey });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.lists });
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        setLikeState({ isLiked: context.previous.isLiked, likeCount: context.previous.likeCount });
        queryClient.setQueryData(detailKey, context.previous);
      }
    },
  });

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => !isPending && checkAuth(() => mutate())}
      className={cn('cursor-pointer', likeState.isLiked && 'text-red-500 border-red-300')}
    >
      <Heart className={cn('size-4', likeState.isLiked && 'fill-red-500')} />
      {likeState.likeCount}
    </Button>
  );
}
