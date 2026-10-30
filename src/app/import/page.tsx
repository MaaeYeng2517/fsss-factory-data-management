'use client';

import { useState } from 'react';

export default function ImportPage() {
  const [type, setType] = useState('employees');
  const [jsonData, setJsonData] = useState('');
  const [result, setResult] = useState<any>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(jsonData);
      const res = await fetch('/api/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      setResult({ error: 'JSON ไม่ถูกต้อง' });
    }
  };

  const sample = type === 'employees' ? 
`[
  {"employeeCode": "EMP0001", "firstName": "สมชาย", "lastName": "ใจดี", "email": "somchai@example.com", "phone": "0812345678", "role": "employee", "department": "ฝ่ายขาย", "hourlyRate": 50},
  {"employeeCode": "EMP0002", "firstName": "สมหญิง", "lastName": "รักงาน", "hourlyRate": 60}
]` :
`[
  {"employeeId": "xxx", "shiftId": "yyy", "date": "2024-01-01", "note": ""}
]`;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">ระบบนำเข้าข้อมูล</h1>
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ประเภทข้อมูล</label>
          <select value={type} onChange={e => { setType(e.target.value); setJsonData(''); setResult(null); }} className="border p-2 rounded dark:bg-gray-800 dark:border-gray-700">
            <option value="employees">พนักงาน</option>
            <option value="schedules">ตารางกะ</option>
          </select>
        </div>
        <form onSubmit={submit}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON ข้อมูล</label>
          <textarea
            value={jsonData}
            onChange={e => setJsonData(e.target.value)}
            rows={10}
            className="w-full border p-2 rounded font-mono text-sm dark:bg-gray-800 dark:border-gray-700"
            placeholder={sample}
          />
          <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">นำเข้า</button>
        </form>
        {result && (
          <div className="mt-4 p-4 rounded bg-gray-100 dark:bg-gray-800">
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">ตัวอย่างรูปแบบข้อมูล</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm">{sample}</pre>
      </div>
    </div>
  );
}
