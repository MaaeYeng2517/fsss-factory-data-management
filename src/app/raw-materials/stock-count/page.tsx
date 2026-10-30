'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function StockCountPage() {
  const [counts, setCounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const res = await fetch('/api/raw-materials/stock-count');
      const data = await res.json();
      setCounts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: any = {
      draft: { label: 'ร่าง', color: 'bg-gray-100 text-gray-800' },
      in_progress: { label: 'กำลังตรวจนับ', color: 'bg-yellow-100 text-yellow-800' },
      completed: { label: 'เสร็จสิ้น', color: 'bg-blue-100 text-blue-800' },
      approved: { label: 'อนุมัติแล้ว', color: 'bg-green-100 text-green-800' },
    };
    const s = map[status] || map.draft;
    return <span className={`px-2 py-1 text-xs rounded-full ${s.color}`}>{s.label}</span>;
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ตรวจนับสต็อก (Stock Count)</h1>
        <Link href="/raw-materials/stock-count/new" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
          + สร้างรายการตรวจนับ
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่ SC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คลัง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่ตรวจนับ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">รายการ</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {counts.map((count) => (
              <tr key={count.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-mono text-sm font-medium">{count.scNumber}</td>
                <td className="px-6 py-4">{count.warehouse?.name}</td>
                <td className="px-6 py-4">{count.countDate}</td>
                <td className="px-6 py-4 text-right">{count.items.length}</td>
                <td className="px-6 py-4 text-center">{getStatusBadge(count.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {counts.length === 0 && (
          <div className="text-center py-12 text-gray-500">ยังไม่มีรายการตรวจนับ</div>
        )}
      </div>
    </div>
  );
}
