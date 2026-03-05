'use client';

import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createInquiry } from '@/features/inquiry/model/api';
import { Button } from '@/shared/ui/button';
import { TitleInput } from '@/shared/ui/title-input';
import { TiptapEditor } from '@/shared/ui/tiptap-editor';
import { useModalStore } from '@/app/store/useModalStore';

export function InquiryWriteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  // 1. 모달 제어 함수 가져오기
  const { openModal, closeModal } = useModalStore();

  const handleSubmit = async () => {
    if (!title || !content) {
      openModal({
        title: '입력 확인',
        description: '제목과 내용을 모두 입력해주세요.',
        buttons: [{ label: '확인', onClick: closeModal, variant: 'primary' }],
      });
      return;
    }

    try {
      await createInquiry({ title, context: content });
      router.push('/inquiry');
    } catch (error) {
      const message = isAxiosError(error) ? error.response?.data?.message : undefined;
      openModal({
        title: '등록 실패',
        description: message ?? '등록에 실패했습니다.',
        buttons: [{ label: '확인', onClick: closeModal }],
      });
    }
  };
  return (
    <section>
      <TitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <TiptapEditor
        placeholder="문의 내용을 입력해주세요"
        content={content}
        onChange={setContent}
      />
      <div className="flex justify-end w-full mt-4 ">
        <Button className="cursor-pointer px-8 py-2" onClick={handleSubmit}>
          올리기
        </Button>
      </div>
    </section>
  );
}
