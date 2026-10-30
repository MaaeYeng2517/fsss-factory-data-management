'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function GoodsReceiptsPage() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const res = await fetch('/api/raw-materials/goods-receipts');
      const data = await res.json();
      setReceipts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: any = {
      pending: { label: 'รอตรวจสอบ', color: 'bg-yellow-100 text-yellow-800' },
      inspected: { label: 'ตรวจสอบแล้ว', color: 'bg-blue-100 text-blue-800' },
      approved: { label: 'อนุมัติ', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'ไม่ผ่าน', color: 'bg-red-100 text-red-800' },
    };
    const s = map[status] || map.pending;
    return <span className={`px-2 py-1 text-xs rounded-full ${s.color}`}>{s.label}</span>;
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">รับวัตถุดิบเข้าคลัง (Goods Receipt)</h1>
        <Link href="/raw-materials/goods-receipts/new" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          + บันทึกการรับเข้า
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่ GR</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">PO อ้างอิง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้จำหน่าย</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่รับ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ใบส่งสินค้า</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {receipts.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-mono text-sm font-medium">{r.grNumber}</td>
                <td className="px-6 py-4">{r.purchaseOrder?.poNumber || '-'}</td>
                <td className="px-6 py-4">{r.supplier.name}</td>
                <td className="px-6 py-4">{r.receiptDate}</td>
                <td className="px-6 py-4">{r.deliveryNote || '-'}</td>
                <td className="px-6 py-4 text-center">{getStatusBadge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {receipts.length === 0 && (
          <div className="text-center py-12 text-gray-500">ยังไม่มีการรับเข้าคลัง</div>
        )}
      </div>
    </div>
  );
}
