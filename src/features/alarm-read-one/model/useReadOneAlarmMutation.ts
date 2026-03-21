'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { alarmApi } from '@/entities/alarm/api/alarmApi';
import { alarmQueryKeys } from '@/entities/alarm/model/alarmQueryKeys';

export function useReadOneAlarmMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: number) => alarmApi.readAlarm(itemId),
    onSuccess: () => {
      // Invalidate both list and infinite queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: alarmQueryKeys.items() });
      // Update hasUnread state
      const allAlarms = queryClient.getQueriesData({ queryKey: alarmQueryKeys.items() });
      const hasUnread = allAlarms.some(([, data]: any) =>
        data?.items?.some((item: any) => !item.isRead) ||
        data?.pages?.some((p: any) => p.items.some((item: any) => !item.isRead))
      );
      queryClient.setQueryData(alarmQueryKeys.hasUnread(), { hasUnread });
    },
  });
}
