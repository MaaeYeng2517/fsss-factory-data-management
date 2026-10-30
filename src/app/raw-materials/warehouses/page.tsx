'use client';

import { useEffect, useState } from 'react';

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ code: '', name: '', location: '', description: '' });

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const res = await fetch('/api/raw-materials/warehouses');
      const data = await res.json();
      setWarehouses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/raw-materials/warehouses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ code: '', name: '', location: '', description: '' });
        fetchWarehouses();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">คลังสินค้า</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + เพิ่มคลัง
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">รหัสคลัง</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="เว้นว่างจะสร้างอัตโนมัติ"
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ชื่อคลัง *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">ที่ตั้ง</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">บันทึก</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">ยกเลิก</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {warehouses.map((w) => (
          <div key={w.id} className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{w.name}</h3>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">ใช้งาน</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">รหัส: {w.code}</div>
            {w.location && <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">ที่ตั้ง: {w.location}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
