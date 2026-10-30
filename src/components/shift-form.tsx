'use client';

import { useState } from 'react';

export default function ShiftForm({ onAdd }: { onAdd: (s: { id: string; name: string; startTime: string; endTime: string; breakMinutes: number; color: string }) => void }) {
  const [form, setForm] = useState({ name: '', startTime: '', endTime: '', breakMinutes: '60', color: '#6b7280' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/shifts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, breakMinutes: Number(form.breakMinutes) }),
      });
      if (!res.ok) throw new Error('เพิ่มรูปแบบกะไม่สำเร็จ');
      const s = await res.json();
      onAdd(s);
      setForm({ name: '', startTime: '', endTime: '', breakMinutes: '60', color: '#6b7280' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
      <h2 className="font-semibold mb-4">เพิ่มรูปแบบกะ</h2>
      {error && <div className="mb-3 p-2 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">ชื่อกะ</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="เช่น กะเช้า" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">เวลาเริ่มต้น</label>
          <input className="w-full border rounded px-3 py-2 text-sm" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">เวลาสิ้นสุด</label>
          <input className="w-full border rounded px-3 py-2 text-sm" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">เวลาพัก (นาที)</label>
          <input className="w-full border rounded px-3 py-2 text-sm" type="number" value={form.breakMinutes} onChange={(e) => setForm({ ...form, breakMinutes: e.target.value })} />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">สี</label>
          <input className="w-full border rounded px-3 py-2 text-sm" type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
        </div>
        <button type="submit" className="col-span-2 sm:col-span-1 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
          บันทึกรูปแบบกะ
        </button>
      </form>
    </div>
  );
}
