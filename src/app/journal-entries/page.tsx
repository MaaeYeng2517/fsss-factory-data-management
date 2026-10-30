'use client';

import { useEffect, useState } from 'react';

export default function JournalEntriesPage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/journal-entries').then(res => res.json()).then(data => {
      setEntries(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">บัญชีแยกประเภท (Journal Entry)</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเภท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รายละเอียด</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">เดบิต</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">เครดิต</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {entries.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{e.jeNumber}</td>
                <td className="px-6 py-4">{e.entryDate}</td>
                <td className="px-6 py-4">{e.entryType}</td>
                <td className="px-6 py-4">{e.description || '-'}</td>
                <td className="px-6 py-4 text-right">{Number(e.totalDebit).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4 text-right">{Number(e.totalCredit).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4">{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
