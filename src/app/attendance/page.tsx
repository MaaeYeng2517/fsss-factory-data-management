'use client';

import { useState, useEffect } from 'react';

type AttendanceRecord = {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: string;
  hoursWorked: number;
  note: string | null;
  employee?: { firstName: string; lastName: string };
};

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  const load = async () => {
    const res = await fetch('/api/attendance');
    const data = await res.json();
    setRecords(data);
  };

  useEffect(() => { load(); }, []);

  const clockAction = async (employeeId: string, action: 'clockIn' | 'clockOut') => {
    await fetch('/api/attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, action }),
    });
    load();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ลงเวลา</h1>
        <p className="text-zinc-500">บันทึกการเข้า-ออกทำงานของพนักงาน</p>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">พนักงาน</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">วันที่</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">เข้า</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">ออก</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">ชั่วโมง</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">สถานะ</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400"> actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                <td className="px-4 py-3">{r.employee?.firstName} {r.employee?.lastName}</td>
                <td className="px-4 py-3 font-mono text-xs">{r.date}</td>
                <td className="px-4 py-3 font-mono text-xs">
                  {r.clockIn ? new Date(r.clockIn).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : '-'}
                </td>
                <td className="px-4 py-3 font-mono text-xs">
                  {r.clockOut ? new Date(r.clockOut).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) : '-'}
                </td>
                <td className="px-4 py-3">{r.hoursWorked || '-'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    r.status === 'present' ? 'bg-green-100 text-green-700' :
                    r.status === 'absent' ? 'bg-red-100 text-red-700' : 'bg-zinc-100 text-zinc-700'
                  }`}>{r.status}</span>
                </td>
                <td className="px-4 py-3">
                  {!r.clockIn && (
                    <button onClick={() => clockAction(r.employeeId, 'clockIn')} className="px-2 py-1 bg-blue-600 text-white rounded text-xs">เข้า</button>
                  )}
                  {r.clockIn && !r.clockOut && (
                    <button onClick={() => clockAction(r.employeeId, 'clockOut')} className="px-2 py-1 bg-orange-600 text-white rounded text-xs">ออก</button>
                  )}
                </td>
              </tr>
            ))}
            {records.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-zinc-500 text-sm">ยังไม่มีข้อมูลการลงเวลา</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}