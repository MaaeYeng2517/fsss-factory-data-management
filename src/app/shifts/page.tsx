'use client';

import { useState, useEffect } from 'react';
import ShiftForm from '@/components/shift-form';

type Shift = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakMinutes: number;
  color: string;
};

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  const load = async () => {
    const res = await fetch('/api/shifts');
    const data = await res.json();
    setShifts(data);
  };

  useEffect(() => { load(); }, []);

  const onAdd = (s: Shift) => {
    setShifts((prev) => [...prev, s]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">รูปแบบกะทำงาน</h1>
          <p className="text-zinc-500">กำหนดเวลาเริ่มต้น เวลาสิ้นสุด และวันหยุด</p>
        </div>
        <ShiftForm onAdd={onAdd} />
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">ชื่อกะ</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">เวลาเริ่มต้น</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">เวลาสิ้นสุด</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">พัก (นาที)</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">สี</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
            {shifts.map((s) => (
              <tr key={s.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.startTime}</td>
                <td className="px-4 py-3 font-mono text-xs">{s.endTime}</td>
                <td className="px-4 py-3">{s.breakMinutes}</td>
                <td className="px-4 py-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: s.color }}></span>
                    {s.color}
                  </div>
                </td>
              </tr>
            ))}
            {shifts.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-zinc-500 text-sm">ยังไม่มีรูปแบบกะ</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}