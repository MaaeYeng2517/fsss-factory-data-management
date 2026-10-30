'use client';

import { useEffect, useState } from 'react';

export default function ProductionOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ productName: '', quantity: '', startDate: '', dueDate: '', notes: '' });

  const load = async () => {
    const res = await fetch('/api/production-orders');
    const data = await res.json();
    setOrders(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/production-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setShowForm(false);
      setForm({ productName: '', quantity: '', startDate: '', dueDate: '', notes: '' });
      load();
    }
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ใบสั่งผลิต</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          {showForm ? 'ปิด' : 'สร้างใบสั่งผลิต'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="bg-white dark:bg-gray-900 rounded-lg shadow border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border rounded px-3 py-2" placeholder="ชื่อสินค้า" value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} required />
            <input type="number" className="border rounded px-3 py-2" placeholder="จำนวน" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
            <input type="date" className="border rounded px-3 py-2" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} />
            <input type="date" className="border rounded px-3 py-2" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
          </div>
          <textarea className="border rounded px-3 py-2 w-full" placeholder="หมายเหตุ" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">บันทึก</button>
        </form>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สินค้า</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">จำนวน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เริ่ม</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">กำหนดเสร็จ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{o.moNumber}</td>
                <td className="px-6 py-4">{o.productName}</td>
                <td className="px-6 py-4">{o.quantity}</td>
                <td className="px-6 py-4">{o.startDate || '-'}</td>
                <td className="px-6 py-4">{o.dueDate || '-'}</td>
                <td className="px-6 py-4">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
