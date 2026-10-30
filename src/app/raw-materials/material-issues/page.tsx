'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MaterialIssuesPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await fetch('/api/raw-materials/material-issues');
      const data = await res.json();
      setIssues(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: any = {
      pending: { label: 'รออนุมัติ', color: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'อนุมัติแล้ว', color: 'bg-blue-100 text-blue-800' },
      issued: { label: 'จ่ายแล้ว', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'ยกเลิก', color: 'bg-gray-100 text-gray-800' },
    };
    const s = map[status] || map.pending;
    return <span className={`px-2 py-1 text-xs rounded-full ${s.color}`}>{s.label}</span>;
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">เบิกจ่ายวัตถุดิบ (Material Issue)</h1>
        <Link href="/raw-materials/material-issues/new" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
          + สร้างใบเบิก
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่ MI</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">อ้างอิง MO</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คลัง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่เบิก</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">รายการ</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {issues.map((issue) => (
              <tr key={issue.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-mono text-sm font-medium">{issue.miNumber}</td>
                <td className="px-6 py-4">{issue.productionOrder?.moNumber || '-'}</td>
                <td className="px-6 py-4">{issue.warehouse?.name}</td>
                <td className="px-6 py-4">{issue.issueDate}</td>
                <td className="px-6 py-4 text-right">{issue.items.length}</td>
                <td className="px-6 py-4 text-center">{getStatusBadge(issue.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {issues.length === 0 && (
          <div className="text-center py-12 text-gray-500">ยังไม่มีใบเบิกวัตถุดิบ</div>
        )}
      </div>
    </div>
  );
}
