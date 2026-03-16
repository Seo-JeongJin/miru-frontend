'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAlarmsInfiniteQuery } from '@/entities/alarm/model/useAlarmsInfiniteQuery';
import { useHasUnreadQuery } from '@/entities/alarm/model/useHasUnreadQuery';
import { useReadAllAlarmsMutation } from '@/features/alarm-read-all/model/useReadAllAlarmsMutation';
import { alarmApi } from '@/entities/alarm/api/alarmApi';
import { alarmQueryKeys } from '@/entities/alarm/model/alarmQueryKeys';
import { AlarmList } from './AlarmList';


export const AlarmsPageClient = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, hasNextPage, fetchNextPage } = useAlarmsInfiniteQuery();

  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  const handleDelete = useCallback(
    async (itemId: number) => {
      try {
        await alarmApi.readAlarm(itemId);
        queryClient.setQueryData(alarmQueryKeys.infinite(), (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              items: page.items.filter((item: any) => item.id !== itemId),
            })),
          };
        });
        // 헤더의 빨간 점도 업데이트 (읽지 않은 알람이 남아있으면 true, 없으면 false)
        const remainingAlarms = queryClient.getQueryData(alarmQueryKeys.infinite()) as any;
        const hasUnread = remainingAlarms?.pages?.some((p: any) => p.items.some((item: any) => !item.isRead)) ?? false;
        queryClient.setQueryData(alarmQueryKeys.hasUnread(), { hasUnread });
      } catch (error) {
        console.error('Failed to read alarm:', error);
      }
    },
    [queryClient]
  );

  return (
    <div className="flex flex-col h-full">
      {/* List */}
      <div className="flex-1">
        <AlarmList items={items} isLoading={isLoading} isEmpty={items.length === 0 && !isLoading} onDelete={handleDelete} />
      </div>

      {/* Sentinel for infinite scroll */}
      {hasNextPage && <div ref={sentinelRef} className="h-4" />}
    </div>
  );
};
