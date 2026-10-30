'use client';

import { useEffect, useState } from 'react';
import { Employee, Schedule, ShiftSwap } from '@/types';

export default function ShiftSwapPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [swaps, setSwaps] = useState<ShiftSwap[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ requesterId: '', receiverId: '', fromScheduleId: '', reason: '' });

  const load = async () => {
    const [emps, sws, schs] = await Promise.all([
      fetch('/api/employees').then(r => r.json()),
      fetch('/api/shift-swap').then(r => r.json()),
      fetch('/api/schedules').then(r => r.json()),
    ]);
    setEmployees(emps);
    setSwaps(sws);
    setSchedules(schs);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/shift-swap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setForm({ requesterId: '', receiverId: '', fromScheduleId: '', reason: '' });
    load();
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/shift-swap/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    load();
  };

  const getEmp = (id: string) => employees.find(e => e.id === id);
  const getSch = (id: string) => schedules.find(s => s.id === id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ระบบแลกกะ</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {showForm ? 'ยกเลิก' : '+ ขอแลกกะ'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <select required value={form.requesterId} onChange={e => setForm({...form, requesterId: e.target.value})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700">
            <option value="">ผู้ขอแลก</option>
            {employees.filter(e => e.active).map(e => (
              <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
            ))}
          </select>
          <select value={form.receiverId} onChange={e => setForm({...form, receiverId: e.target.value})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700">
            <option value="">ผู้รับแลก (ไม่บังคับ)</option>
            {employees.filter(e => e.active && e.id !== form.requesterId).map(e => (
              <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>
            ))}
          </select>
          <select required value={form.fromScheduleId} onChange={e => setForm({...form, fromScheduleId: e.target.value})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 md:col-span-2">
            <option value="">เลือกตารางกะที่ต้องการแลก</option>
            {schedules.map(s => {
              const emp = getEmp(s.employeeId);
              return (
                <option key={s.id} value={s.id}>{emp?.firstName} {emp?.lastName} - {s.date}</option>
              );
            })}
          </select>
          <input required placeholder="เหตุผล" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 md:col-span-2" />
          <button type="submit" className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">ส่งคำขอ</button>
        </form>
      )}

      <div className="space-y-4">
        {swaps.map((swap) => (
          <div key={swap.id} className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  คำขอแลกกะ #{swap.id.slice(0,8)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">สร้างเมื่อ: {new Date(swap.createdAt).toLocaleString('th-TH')}</p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                swap.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                swap.status === 'approved' ? 'bg-green-100 text-green-800' :
                swap.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {swap.status === 'pending' ? 'รออนุมัติ' : swap.status === 'approved' ? 'อนุมัติ' : swap.status === 'rejected' ? 'ไม่อนุมัติ' : 'ยกเลิก'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ผู้ขอแลก</p>
                <p className="text-gray-900 dark:text-white">{getEmp(swap.requesterId)?.firstName} {getEmp(swap.requesterId)?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">ผู้รับแลก</p>
                <p className="text-gray-900 dark:text-white">{swap.receiverId ? getEmp(swap.receiverId)?.firstName + ' ' + getEmp(swap.receiverId)?.lastName : 'เปิดให้ทุกคน'}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">กะที่ต้องการแลก</p>
            <p className="text-gray-900 dark:text-white mb-2">{getSch(swap.fromScheduleId)?.date}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">เหตุผล</p>
            <p className="text-gray-900 dark:text-white mb-4">{swap.reason}</p>
            {swap.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => updateStatus(swap.id, 'approved')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">อนุมัติ</button>
                <button onClick={() => updateStatus(swap.id, 'rejected')} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">ไม่อนุมัติ</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
