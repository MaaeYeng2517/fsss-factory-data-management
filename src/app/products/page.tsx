'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', name: '', nameEn: '', unit: 'ชิ้น', sellingPrice: 0, standardCost: 0, minStock: 0, reorderPoint: 0 });

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(data => {
      setProducts(Array.isArray(data?.data) ? data.data : (Array.isArray(data) ? data : []));
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setProducts([data?.data ?? data, ...products]);
      setShowForm(false);
      setForm({ code: '', name: '', nameEn: '', unit: 'ชิ้น', sellingPrice: 0, standardCost: 0, minStock: 0, reorderPoint: 0 });
    }
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">สินค้าสำเร็จรูป</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {showForm ? 'ยกเลิก' : '+ เพิ่มสินค้า'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="รหัสสินค้า *" value={form.code} onChange={e => setForm({...form, code: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" required />
          <input placeholder="ชื่อสินค้า *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" required />
          <input placeholder="ชื่อภาษาอังกฤษ" value={form.nameEn} onChange={e => setForm({...form, nameEn: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input placeholder="หน่วยนับ" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input type="number" placeholder="ราคาทุนมาตรฐาน" value={form.standardCost} onChange={e => setForm({...form, standardCost: parseFloat(e.target.value)})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input type="number" placeholder="ราคาขาย" value={form.sellingPrice} onChange={e => setForm({...form, sellingPrice: parseFloat(e.target.value)})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input type="number" placeholder="จุดสั่งซื้อ" value={form.reorderPoint} onChange={e => setForm({...form, reorderPoint: parseFloat(e.target.value)})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <input type="number" placeholder="สต็อกขั้นต่ำ" value={form.minStock} onChange={e => setForm({...form, minStock: parseFloat(e.target.value)})} className="px-3 py-2 border rounded dark:bg-gray-800" />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 md:col-span-2">บันทึก</button>
        </form>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">รหัส</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ชื่อสินค้า</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ราคาทุน</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ราคาขาย</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จุดสั่งซื้อ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 font-medium">{p.code}</td>
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4 text-right">{Number(p.standardCost).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4 text-right">{Number(p.sellingPrice).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4 text-right">{Number(p.reorderPoint).toLocaleString('th-TH')}</td>
                <td className="px-6 py-4">{p.active ? 'ใช้งาน' : 'ไม่ใช้งาน'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
