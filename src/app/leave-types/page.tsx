'use client';

import { useEffect, useState } from 'react';

export default function LeaveTypesPage() {
  const [types, setTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leave-types').then(res => res.json()).then(data => {
      setTypes(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ประเภทการลา</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รหัส</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อประเภท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หักเงิน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ต้องแนบเอกสาร</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {types.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{t.code}</td>
                <td className="px-6 py-4">{t.name}</td>
                <td className="px-6 py-4">{t.paidLeave ? 'ไม่หัก (ลาพักร้อน)' : 'หักเงิน'}</td>
                <td className="px-6 py-4">{t.requireDoc ? 'ต้องมี' : 'ไม่ต้อง'}</td>
                <td className="px-6 py-4">{t.active ? 'ใช้งาน' : 'ไม่ใช้งาน'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
