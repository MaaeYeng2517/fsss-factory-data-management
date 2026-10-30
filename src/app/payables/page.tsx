'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PayablesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/accounts-payable');
  }, [router]);
  return <div className="p-6">กำลังนำทาง...</div>;
}
