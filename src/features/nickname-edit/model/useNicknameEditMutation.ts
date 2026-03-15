import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mypageApi } from '@/entities/mypage/api/mypageApi';

export const useNicknameEditMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (nickname: string) => mypageApi.updateNickname(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['mypage'] });
    },
  });
};
