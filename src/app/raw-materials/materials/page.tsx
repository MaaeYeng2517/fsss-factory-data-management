'use client';

import { useEffect, useState } from 'react';

interface Material {
  id: string;
  code: string;
  name: string;
  unit: string;
  standardPrice: number;
  minStock: number;
  reorderPoint: number;
  category?: { name: string };
  active: boolean;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    unit: 'กก.',
    standardPrice: 0,
    minStock: 0,
    reorderPoint: 0,
    description: '',
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await fetch('/api/raw-materials/materials');
      const data = await res.json();
      setMaterials(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/raw-materials/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({
          code: '',
          name: '',
          unit: 'กก.',
          standardPrice: 0,
          minStock: 0,
          reorderPoint: 0,
          description: '',
        });
        fetchMaterials();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-6">กำลังโหลด...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ทะเบียนวัตถุดิบ</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + เพิ่มวัตถุดิบ
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">เพิ่มวัตถุดิบใหม่</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">รหัสวัตถุดิบ *</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ชื่อวัตถุดิบ *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">หน่วยนับ</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="กก.">กก.</option>
                <option value="กรัม">กรัม</option>
                <option value="ลิตร">ลิตร</option>
                <option value="มิลลิลิตร">มิลลิลิตร</option>
                <option value="ชิ้น">ชิ้น</option>
                <option value="ใบ">ใบ</option>
                <option value="ม้วน">ม้วน</option>
                <option value="กล่อง">กล่อง</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ราคามาตรฐาน (บาท)</label>
              <input
                type="number"
                step="0.01"
                value={formData.standardPrice}
                onChange={(e) => setFormData({ ...formData, standardPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">จุดสั่งซื้อขั้นต่ำ</label>
              <input
                type="number"
                step="0.01"
                value={formData.reorderPoint}
                onChange={(e) => setFormData({ ...formData, reorderPoint: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">สต็อกขั้นต่ำ</label>
              <input
                type="number"
                step="0.01"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  รหัส
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  ชื่อวัตถุดิบ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  หน่วยนับ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  ราคามาตรฐาน
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  จุดสั่งซื้อ
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                    {material.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {material.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{material.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {material.standardPrice.toLocaleString('th-TH')} ฿
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {material.reorderPoint.toLocaleString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {material.active ? (
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        ใช้งาน
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        ไม่ใช้งาน
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
