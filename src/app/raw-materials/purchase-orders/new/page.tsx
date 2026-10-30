'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPurchaseOrderPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDate: '',
    notes: '',
    requestedBy: '',
  });
  const [items, setItems] = useState([{ materialId: '', quantity: 0, unitPrice: 0 }]);

  useEffect(() => {
    fetchSuppliers();
    fetchMaterials();
  }, []);

  const fetchSuppliers = async () => {
    const res = await fetch('/api/raw-materials/suppliers');
    const data = await res.json();
    setSuppliers(data);
  };

  const fetchMaterials = async () => {
    const res = await fetch('/api/raw-materials/materials');
    const data = await res.json();
    setMaterials(data);
  };

  const addItem = () => {
    setItems([...items, { materialId: '', quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/raw-materials/purchase-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items }),
      });
      if (res.ok) {
        router.push('/raw-materials/purchase-orders');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">สร้างใบสั่งซื้อใหม่</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">ข้อมูลทั่วไป</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ผู้จำหน่าย *</label>
              <select
                required
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">เลือกผู้จำหน่าย</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ผู้ขอสั่งซื้อ</label>
              <input
                type="text"
                value={formData.requestedBy}
                onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">วันที่สั่งซื้อ *</label>
              <input
                type="date"
                required
                value={formData.orderDate}
                onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">วันที่คาดรับ</label>
              <input
                type="date"
                value={formData.expectedDate}
                onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">หมายเหตุ</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">รายการวัตถุดิบ</h2>
            <button type="button" onClick={addItem} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              + เพิ่มรายการ
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium">วัตถุดิบ</th>
                  <th className="px-4 py-2 text-right text-xs font-medium">จำนวน</th>
                  <th className="px-4 py-2 text-right text-xs font-medium">ราคาต่อหน่วย</th>
                  <th className="px-4 py-2 text-right text-xs font-medium">รวม</th>
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
                        onChange={(e) => {
                          updateItem(index, 'materialId', e.target.value);
                          const mat = materials.find((m) => m.id === e.target.value);
                          if (mat) updateItem(index, 'unitPrice', mat.standardPrice);
                        }}
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
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-2 py-1 border rounded text-right dark:bg-gray-800 dark:border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-2 text-right">
                      {(item.quantity * item.unitPrice).toLocaleString('th-TH')}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="text-red-600">
                          ลบ
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right text-lg font-semibold">
            ยอดรวม: {total.toLocaleString('th-TH')} บาท
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            บันทึกใบสั่งซื้อ
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
