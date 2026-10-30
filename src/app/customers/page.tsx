'use client';

import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: '', name: '', nameEn: '', customerType: 'domestic', contactPerson: '', phone: '', email: '', address: '', taxId: '', country: 'TH', currency: 'THB', creditLimit: 0, creditTermDays: 0
  });

  useEffect(() => {
    fetch('/api/customers').then(res => res.json()).then(data => {
      setCustomers(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setCustomers([data, ...customers]);
      setShowForm(false);
      setForm({ code: '', name: '', nameEn: '', customerType: 'domestic', contactPerson: '', phone: '', email: '', address: '', taxId: '', country: 'TH', currency: 'THB', creditLimit: 0, creditTermDays: 0 });
    }
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ทะเบียนลูกค้า</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {showForm ? 'ยกเลิก' : '+ เพิ่มลูกค้า'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="รหัสลูกค้า *" value={form.code} onChange={e => setForm({...form, code: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" required />
          <input placeholder="ชื่อบริษัท/ลูกค้า *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" required />
          <input placeholder="ชื่อภาษาอังกฤษ" value={form.nameEn} onChange={e => setForm({...form, nameEn: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <select value={form.customerType} onChange={e => setForm({...form, customerType: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800">
            <option value="domestic">ภายในประเทศ</option>
            <option value="export">ต่างประเทศ</option>
          </select>
          <input placeholder="ผู้ติดต่อ" value={form.contactPerson} onChange={e => setForm({...form, contactPerson: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input placeholder="เบอร์โทรศัพท์" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input placeholder="อีเมล" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input placeholder="เลขประจำตัวผู้เสียภาษี" value={form.taxId} onChange={e => setForm({...form, taxId: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input placeholder="ประเทศ" value={form.country} onChange={e => setForm({...form, country: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input placeholder="สกุลเงิน" value={form.currency} onChange={e => setForm({...form, currency: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <textarea placeholder="ที่อยู่" value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800 md:col-span-2" />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 md:col-span-2">บันทึก</button>
        </form>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รหัส</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อลูกค้า</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเภท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเทศ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">โทรศัพท์</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{c.code}</td>
                <td className="px-6 py-4">{c.name}</td>
                <td className="px-6 py-4">{c.customerType === 'export' ? 'ต่างประเทศ' : 'ภายในประเทศ'}</td>
                <td className="px-6 py-4">{c.country}</td>
                <td className="px-6 py-4">{c.phone || '-'}</td>
                <td className="px-6 py-4">{c.active ? 'ใช้งาน' : 'ไม่ใช้งาน'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
