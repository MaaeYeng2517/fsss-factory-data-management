'use client';

import { useEffect, useState } from 'react';
import { Employee, Payroll } from '@/types';
import { formatDate } from '@/lib/utils';

export default function PayrollPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    employeeId: '', periodStart: formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
    periodEnd: formatDate(new Date()), overtimeHours: 0, deductions: 0, bonuses: 0
  });

  const load = async () => {
    const [emps, prs] = await Promise.all([
      fetch('/api/employees').then(r => r.json()),
      fetch('/api/payroll').then(r => r.json()),
    ]);
    setEmployees(emps);
    setPayrolls(prs);
  };
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/payroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    load();
  };

  const getEmp = (id: string) => employees.find(e => e.id === id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ระบบค่าตอบแทน</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {showForm ? 'ยกเลิก' : '+ คำนวณเงินเดือน'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <select required value={form.employeeId} onChange={e => setForm({...form, employeeId: e.target.value})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700 md:col-span-2">
            <option value="">เลือกพนักงาน</option>
            {employees.filter(e => e.active).map(e => (
              <option key={e.id} value={e.id}>{e.firstName} {e.lastName} ({e.employeeCode}) - {e.hourlyRate} บาท/ชม.</option>
            ))}
          </select>
          <input type="date" required value={form.periodStart} onChange={e => setForm({...form, periodStart: e.target.value})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700" />
          <input type="date" required value={form.periodEnd} onChange={e => setForm({...form, periodEnd: e.target.value})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700" />
          <input type="number" placeholder="ชั่วโมง OT" value={form.overtimeHours} onChange={e => setForm({...form, overtimeHours: Number(e.target.value)})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700" />
          <input type="number" placeholder="โบนัส" value={form.bonuses} onChange={e => setForm({...form, bonuses: Number(e.target.value)})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700" />
          <input type="number" placeholder="หัก" value={form.deductions} onChange={e => setForm({...form, deductions: Number(e.target.value)})} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700" />
          <button type="submit" className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">คำนวณและบันทึก</button>
        </form>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">พนักงาน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">รอบเงินเดือน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ชั่วโมงรวม</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">OT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ค่าจ้าง/ชม.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">เงินเดือนพื้นฐาน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">OT</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">โบนัส</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">หัก</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">สุทธิ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {payrolls.sort((a,b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()).map((pay) => {
              const emp = getEmp(pay.employeeId);
              return (
                <tr key={pay.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{emp?.firstName} {emp?.lastName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{formatDate(pay.periodStart)} - {formatDate(pay.periodEnd)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pay.totalHours}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pay.overtimeHours}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pay.hourlyRate}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pay.basePay.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pay.overtimePay.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pay.bonuses.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{pay.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">{pay.netPay.toLocaleString()} บาท</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      pay.status === 'paid' ? 'bg-green-100 text-green-800' :
                      pay.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {pay.status === 'paid' ? 'จ่ายแล้ว' : pay.status === 'approved' ? 'อนุมัติ' : 'ร่าง'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
