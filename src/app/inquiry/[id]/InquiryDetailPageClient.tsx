'use client';

import dynamic from 'next/dynamic';

const InquiryDetailWidget = dynamic(
  () => import('@/widgets/inquiry/ui/InquiryDetailWidget').then(m => ({ default: m.InquiryDetailWidget })),
  { ssr: false }
);

export function InquiryDetailPageClient({ id }: { id: string }) {
  return <InquiryDetailWidget id={id} />;
}
