'use client';

import { Suspense, useState } from 'react';
import { isAxiosError } from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import { useAuth } from '@/entities/auth/useAuth';
import { Container } from '@/shared/ui/container';
import { useModalStore } from '@/app/store/useModalStore';
import { MyPageBoardsContent } from './MyPageBoardsContent';
import { MyPostListSkeleton } from './MyPostListSkeleton';

export function MyPageBoardsMain() {
  const { data: user } = useAuth();
  const { openModal, closeModal } = useModalStore();
  const [page, setPage] = useState(1);

  return (
    <Container>
      <div className="py-10">
        <ErrorBoundary
          onError={(error) => {
            if (isAxiosError(error) && error.response?.status === 401) return;
            const message = isAxiosError(error) ? error.response?.data?.message : undefined;
            openModal({
              title: '불러오기 실패',
              description: message ?? '작성글 목록을 불러오지 못했습니다.',
              buttons: [{ label: '확인', onClick: closeModal }],
            });
          }}
          fallback={<div />}
        >
          <Suspense fallback={<MyPostListSkeleton />}>
            <MyPageBoardsContent
              page={page}
              setPage={setPage}
              nickname={user?.nickname ?? ''}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Container>
  );
}
