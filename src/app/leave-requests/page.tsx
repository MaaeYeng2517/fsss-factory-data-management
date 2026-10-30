'use client';

import { useEffect, useState } from 'react';

export default function LeaveRequestsPage() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leave-requests').then(res => res.json()).then(data => {
      setLeaves(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ใบลางาน</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">พนักงาน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเภทการลา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จำนวนวัน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {leaves.map((l) => (
              <tr key={l.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{l.requestNo}</td>
                <td className="px-6 py-4">{l.employee?.firstName} {l.employee?.lastName}</td>
                <td className="px-6 py-4">{l.leaveType?.name}</td>
                <td className="px-6 py-4">{l.startDate} ถึง {l.endDate}</td>
                <td className="px-6 py-4 text-right">{l.totalDays}</td>
                <td className="px-6 py-4">{l.status === 'pending' ? 'รออนุมัติ' : l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
