'use client';

import { useState } from 'react';

type Role = 'admin' | 'manager' | 'employee';

interface EmployeeFormProps {
  onAdd: (emp: { id: string; employeeCode: string; firstName: string; lastName: string; email: string | null; phone: string | null; role: string; department: string | null; hireDate: string; active: boolean; hourlyRate: number }) => void;
}

export default function EmployeeForm({ onAdd }: EmployeeFormProps) {
  const [form, setForm] = useState({
    employeeCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'employee' as Role,
    department: '',
    hireDate: '',
    active: true,
    hourlyRate: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          hourlyRate: form.hourlyRate ? Number(form.hourlyRate) : undefined,
          active: form.active,
        }),
      });
      if (!res.ok) throw new Error('เพิ่มพนักงานไม่สำเร็จ');
      const emp = await res.json();
      onAdd(emp);
      setForm({ employeeCode: '', firstName: '', lastName: '', email: '', phone: '', role: 'employee', department: '', hireDate: '', active: true, hourlyRate: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาด');
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
      <h2 className="font-semibold mb-4">เพิ่มพนักงาน</h2>
      {error && <div className="mb-3 p-2 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">รหัสพนักงาน</label>
          <input
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.employeeCode}
            onChange={(e) => setForm({ ...form, employeeCode: e.target.value })}
            placeholder="เช่น EMP0001"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">ชื่อ</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="ชื่อ" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">นามสกุล</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="นามสกุล" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">อีเมล</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@company.com" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">โทรศัพท์</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="เบอร์โทร" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">ตำแหน่ง</label>
          <select className="w-full border rounded px-3 py-2 text-sm" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
            <option value="employee">พนักงาน</option>
            <option value="manager">หัวหน้างาน</option>
            <option value="admin">ผู้ดูแลระบบ</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">แผนก</label>
          <input className="w-full border rounded px-3 py-2 text-sm" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} placeholder="เช่น แผนกผลิต" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">วันที่เข้าทำงาน</label>
          <input className="w-full border rounded px-3 py-2 text-sm" type="date" value={form.hireDate} onChange={(e) => setForm({ ...form, hireDate: e.target.value })} />
        </div>
        <div className="flex items-center gap-2 mt-8">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          <label className="text-sm text-zinc-600 dark:text-zinc-400">ทำงานอยู่</label>
        </div>
        <button type="submit" className="mt-4 inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900">
          บันทึกพนักงาน
        </button>
      </form>
    </div>
  );
}
