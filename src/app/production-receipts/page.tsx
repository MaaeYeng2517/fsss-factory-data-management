'use client';

import { useEffect, useState } from 'react';

export default function ProductionReceiptsPage() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/production-receipts').then(res => res.json()).then(data => {
      setReceipts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">รับสินค้าจากการผลิต</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ใบสั่งผลิต</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คลัง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่รับ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {receipts.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{r.prNumber}</td>
                <td className="px-6 py-4">{r.productionOrder?.moNumber || '-'}</td>
                <td className="px-6 py-4">{r.warehouse?.name}</td>
                <td className="px-6 py-4">{r.receiptDate}</td>
                <td className="px-6 py-4">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
