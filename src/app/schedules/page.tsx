'use client';

import { useState, useEffect } from 'react';

type Shift = { id: string; name: string; startTime: string; endTime: string; color: string };
type Employee = { id: string; employeeCode: string; firstName: string; lastName: string };
type Schedule = { id: string; employeeId: string; shiftId: string; date: string; note?: string; employee?: any; shift?: any };

const DAYS = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'];

export default function SchedulesPage() {
  const [weekStart, setWeekStart] = useState<string>('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  [employees, shifts, schedules];
  const [form, setForm] = useState({ employeeId: '', shiftId: '', date: '', note: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    setWeekStart(d.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (!weekStart) return;
    const start = weekStart;
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    const endStr = end.toISOString().split('T')[0];
    Promise.all([
      fetch(`/api/schedules?startDate=${start}&endDate=${endStr}`).then((r) => r.json()),
      fetch('/api/employees?active=true').then((r) => r.json()).catch(() => []),
      fetch('/api/shifts').then((r) => r.json()),
    ]).then(([schedules, emps, shs]) => {
      setSchedules(Array.isArray(schedules) ? schedules : []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setShifts(Array.isArray(shs) ? shs : []);
    });
  }, [weekStart]);

  const days = weekStart ? Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  }) : [];

  const cell = (empId: string, date: string) => schedules.find((s) => s.employeeId === empId && s.date === date);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.employeeId || !form.shiftId || !form.date) {
      setError('กรอกข้อมูลให้ครบถ้วน');
      return;
    }
    try {
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('จัดตารางไม่สำเร็จ');
      const s = await res.json();
      setSchedules((prev) => [...prev, s]);
      setForm({ employeeId: '', shiftId: '', date: '', note: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    }
  };

  const shiftColor = (sid: string) => {
    const s = shifts.find((x) => x.id === sid);
    return s ? s.color : '#94a3b8';
  };

  const prevWeek = () => setWeekStart((w) => { const d = new Date(w); d.setDate(d.getDate() - 7); return d.toISOString().split('T')[0]; });
  const nextWeek = () => setWeekStart((w) => { const d = new Date(w); d.setDate(d.getDate() + 7); return d.toISOString().split('T')[0]; });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">ตารางกะทำงาน</h1>
          <p className="text-zinc-500">จัดพนักงานลงกะรายสัปดาห์</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevWeek} className="px-3 py-1.5 border rounded text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">‹ ย้อน</button>
          {weekStart ? (
          <span className="font-medium">{new Date(weekStart).toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</span>
        ) : null}
          <button onClick={nextWeek} className="px-3 py-1.5 border rounded text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">ถัดไป ›</button>
        </div>
      </div>

      {error && <div className="p-2 rounded bg-red-50 text-red-700 text-sm">{error}</div>}

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm text-left border-collapse">
            <thead className="bg-zinc-100 dark:bg-zinc-900/50 sticky top-0 z-10">
              <tr>
                <th className="px-3 py-3 text-left font-medium text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">พนักงาน</th>
                {days.map((date, i) => (
                  <th key={date} className="px-2 py-3 text-center font-medium text-zinc-600 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="text-xs text-zinc-500">{DAYS[i]}</div>
                    <div className="text-xs font-medium">{new Date(date).toLocaleDateString('th-TH', { day: 'numeric', month: 'numeric' }).replace(/\//g, '-')}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td className="px-3 py-3 font-medium border-b border-zinc-100 dark:border-zinc-800/50">
                    {emp.employeeCode} — {emp.firstName} {emp.lastName}
                  </td>
                  {days.map((date) => (
                    <td key={date} className="px-2 py-4 border-b border-zinc-100 dark:border-zinc-800/50 text-center">
                      {cell(emp.id, date) ? (
                        <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border text-white shadow-sm`} style={{ backgroundColor: shiftColor(cell(emp.id, date)!.shiftId), borderColor: shiftColor(cell(emp.id, date)!.shiftId) }}>
                          {cell(emp.id, date)!.shift.name}
                        </div>
                      ) : (
                        <span className="text-[10px] text-zinc-400">OFF</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
        <h2 className="font-semibold mb-4">จัดพนักงานลงกะ</h2>
        {error && <div className="mb-3 p-2 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">พนักงาน</label>
            <select className="w-full border rounded px-3 py-2 text-sm" value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}>
              <option value="">เลือกพนักงาน</option>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.employeeCode} — {e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">รูปแบบกะ</label>
            <select className="w-full border rounded px-3 py-2 text-sm" value={form.shiftId} onChange={(e) => setForm({ ...form, shiftId: e.target.value })}>
              <option value="">เลือกกะ</option>
              {shifts.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.startTime}–{s.endTime})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">วันที่</label>
            <input className="w-full border rounded px-3 py-2 text-sm" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="col-span-4 sm:col-span-1">
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">หมายเหตุ</label>
            <input className="w-full border rounded px-3 py-2 text-sm" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="หมายเหตุ (ถ้ามี)" />
          </div>
          <button type="submit" className="col-span-4 sm:col-span-1 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
            บันทึกตาราง
          </button>
        </form>
      </div>
    </div>
  );
}
