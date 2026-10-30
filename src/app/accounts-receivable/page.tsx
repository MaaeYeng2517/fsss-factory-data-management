'use client';

import { useEffect, useState } from 'react';

export default function AccountsReceivablePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/accounts-receivable').then(res => res.json()).then(data => {
      setItems(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ลูกหนี้ (Accounts Receivable)</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ลูกค้า</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ใบแจ้งหนี้</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ครบกำหนด</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จำนวนเงิน</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ชำระแล้ว</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">คงเหลือ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {items.map((ar) => (
              <tr key={ar.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{ar.arNumber}</td>
                <td className="px-6 py-4">{ar.customer?.name}</td>
                <td className="px-6 py-4">{ar.salesInvoice?.invNumber}</td>
                <td className="px-6 py-4">{ar.invoiceDate}</td>
                <td className="px-6 py-4">{ar.dueDate || '-'}</td>
                <td className="px-6 py-4 text-right">{Number(ar.amount).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4 text-right">{Number(ar.paidAmount).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4 text-right">{Number(ar.balanceAmount).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4">{ar.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
