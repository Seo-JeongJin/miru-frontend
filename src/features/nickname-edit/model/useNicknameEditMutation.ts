import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mypageApi } from '@/entities/mypage/api/mypageApi';

export const useNicknameEditMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) => mypageApi.updateNickname(nickname),
    onSuccess: (newNickname) => {
      queryClient.setQueryData(
        ['auth', 'me'],
        (old: { nickname: string } | null | undefined) =>
          old ? { ...old, nickname: newNickname } : old,
      );
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
};
