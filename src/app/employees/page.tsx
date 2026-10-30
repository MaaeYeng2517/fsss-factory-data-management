'use client';

import { useState, useEffect } from 'react';
import EmployeeForm from '@/components/employee-form';

type Employee = {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  role: string;
  department: string | null;
  hireDate: string;
  active: boolean;
  hourlyRate: number;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const load = async () => {
    const res = await fetch('/api/employees');
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => { load(); }, []);

  const onAdd = (emp: Employee) => {
    setEmployees((prev) => [...prev, emp]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">จัดการพนักงาน</h1>
          <p className="text-zinc-500">กำหนดข้อมูลพนักงาน แผนก ตำแหน่ง และทักษะ</p>
        </div>
        <EmployeeForm onAdd={onAdd} />
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/50">
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">โค้ด</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">ชื่อ - สกุล</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">ตำแหน่ง</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">แผนก</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">อัตราค่าจ้าง</th>
              <th className="px-4 py-3 font-medium text-zinc-600 dark:text-zinc-400">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/50">
            {employees.map((e) => (
              <tr key={e.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30">
                <td className="px-4 py-3 font-mono text-xs">{e.employeeCode}</td>
                <td className="px-4 py-3">{e.firstName} {e.lastName}</td>
                <td className="px-4 py-3">{e.role === 'admin' ? 'ผู้ดูแลระบบ' : e.role === 'manager' ? 'หัวหน้างาน' : 'พนักงาน'}</td>
                <td className="px-4 py-3">{e.department || '-'}</td>
                <td className="px-4 py-3">{e.hourlyRate ? e.hourlyRate.toLocaleString() + ' บาท/ชม.' : '-'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                    e.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {e.active ? '●' : '○'} {e.active ? 'ทำงานอยู่' : 'ลาออก'}
                  </span>
                </td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-zinc-500 text-sm">ยังไม่มีข้อมูลพนักงาน</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}