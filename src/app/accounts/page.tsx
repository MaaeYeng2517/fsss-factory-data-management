'use client';

import { useEffect, useState } from 'react';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/accounts').then(res => res.json()).then(data => {
      setAccounts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ผังบัญชี (Chart of Accounts)</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รหัสบัญชี</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อบัญชี</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเภทบัญชี</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">คงเหลือปกติ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {accounts.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{a.code}</td>
                <td className="px-6 py-4">{a.name}</td>
                <td className="px-6 py-4">{a.accountType}</td>
                <td className="px-6 py-4">{a.normalBalance}</td>
                <td className="px-6 py-4">{a.isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
