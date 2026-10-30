'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewMaterialIssuePage() {
  const router = useRouter();
  const [warehouses, setWarehouses] = useState<{ id: string; name: string }[]>([]);
  const [materials, setMaterials] = useState<{ id: string; code: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    productionOrderId: '',
    warehouseId: '',
    issueDate: new Date().toISOString().split('T')[0],
    requestedBy: '',
    notes: '',
  });
  const [items, setItems] = useState([{ materialId: '', quantity: 0 }]);

  useEffect(() => {
    fetchWarehouses();
    fetchMaterials();
  }, []);

  const fetchWarehouses = async () => {
    const res = await fetch('/api/raw-materials/warehouses');
    const data = await res.json();
    setWarehouses(data);
  };

  const fetchMaterials = async () => {
    const res = await fetch('/api/raw-materials/materials');
    const data = await res.json();
    setMaterials(data);
  };

  const addItem = () => {
    setItems([...items, { materialId: '', quantity: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/raw-materials/material-issues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/raw-materials/material-issues');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">สร้างใบเบิกวัตถุดิบ</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">ข้อมูลใบเบิก</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">คลังที่เบิก *</label>
              <select
                required
                value={formData.warehouseId}
                onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">เลือกคลัง</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">วันที่เบิก *</label>
              <input
                type="date"
                required
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ผู้ขอเบิก</label>
              <input
                type="text"
                value={formData.requestedBy}
                onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">รายการวัตถุดิบที่เบิก</h2>
            <button type="button" onClick={addItem} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              + เพิ่มรายการ
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium">วัตถุดิบ</th>
                  <th className="px-4 py-2 text-right text-xs font-medium">จำนวนที่เบิก</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">
                      <select
                        required
                        value={item.materialId}
                        onChange={(e) => updateItem(index, 'materialId', e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700"
                      >
                        <option value="">เลือกวัตถุดิบ</option>
                        {materials.map((m) => (
                          <option key={m.id} value={m.id}>{m.code} - {m.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 border rounded text-right dark:bg-gray-800 dark:border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      {items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="text-red-600">ลบ</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
            บันทึกใบเบิก
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
