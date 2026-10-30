'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ReceivablesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/accounts-receivable');
  }, [router]);
  return <div className="p-6">กำลังนำทาง...</div>;
}
