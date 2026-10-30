'use client';

import { useEffect, useState } from 'react';

export default function SalesInvoicesPage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sales-invoices').then(res => res.json()).then(data => {
      setInvoices(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ใบแจ้งหนี้/ใบกำกับภาษี</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่ใบแจ้งหนี้</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ลูกค้า</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ครบกำหนด</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ยอดรวม</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">คงเหลือ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{inv.invNumber}</td>
                <td className="px-6 py-4">{inv.customer?.name}</td>
                <td className="px-6 py-4">{inv.invoiceDate}</td>
                <td className="px-6 py-4">{inv.dueDate || '-'}</td>
                <td className="px-6 py-4 text-right">{Number(inv.totalAmount).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4 text-right">{Number(inv.balanceAmount).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4">{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
