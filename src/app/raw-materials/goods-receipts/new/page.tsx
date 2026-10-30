'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewGoodsReceiptPage() {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [purchaseOrders, setPurchaseOrders] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    purchaseOrderId: '',
    supplierId: '',
    warehouseId: '',
    receiptDate: new Date().toISOString().split('T')[0],
    deliveryNote: '',
    invoiceNo: '',
    receivedBy: '',
    notes: '',
  });
  const [items, setItems] = useState([{ materialId: '', quantity: 0, unitPrice: 0, lotNumber: '', expiryDate: '' }]);

  useEffect(() => {
    fetchSuppliers();
    fetchWarehouses();
    fetchPurchaseOrders();
    fetchMaterials();
  }, []);

  const fetchSuppliers = async () => {
    const res = await fetch('/api/raw-materials/suppliers');
    const data = await res.json();
    setSuppliers(data);
  };

  const fetchWarehouses = async () => {
    const res = await fetch('/api/raw-materials/warehouses');
    const data = await res.json();
    setWarehouses(data);
  };

  const fetchPurchaseOrders = async () => {
    const res = await fetch('/api/raw-materials/purchase-orders');
    const data = await res.json();
    setPurchaseOrders(data.filter((po: any) => po.status === 'approved' || po.status === 'ordered'));
  };

  const fetchMaterials = async () => {
    const res = await fetch('/api/raw-materials/materials');
    const data = await res.json();
    setMaterials(data);
  };

  const addItem = () => {
    setItems([...items, { materialId: '', quantity: 0, unitPrice: 0, lotNumber: '', expiryDate: '' }]);
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/raw-materials/goods-receipts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push('/raw-materials/goods-receipts');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">บันทึกการรับวัตถุดิบเข้าคลัง</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold mb-4">ข้อมูลการรับเข้า</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">อ้างอิงใบสั่งซื้อ (PO)</label>
              <select
                value={formData.purchaseOrderId}
                onChange={(e) => {
                  const po = purchaseOrders.find((p) => p.id === e.target.value);
                  setFormData({ 
                    ...formData, 
                    purchaseOrderId: e.target.value,
                    supplierId: po?.supplierId || formData.supplierId
                  });
                }}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              >
                <option value="">ไม่อ้างอิง PO</option>
                {purchaseOrders.map((po) => (
                  <option key={po.id} value={po.id}>{po.poNumber} - {po.supplier.name}</option>
                ))}
              </select>
            </div>
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
              <label className="block text-sm font-medium mb-1">คลังสินค้า *</label>
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
              <label className="block text-sm font-medium mb-1">วันที่รับเข้า *</label>
              <input
                type="date"
                required
                value={formData.receiptDate}
                onChange={(e) => setFormData({ ...formData, receiptDate: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">เลขที่ใบส่งสินค้า</label>
              <input
                type="text"
                value={formData.deliveryNote}
                onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ผู้รับเข้า</label>
              <input
                type="text"
                value={formData.receivedBy}
                onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
                className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">รายการรับเข้า</h2>
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
                  <th className="px-4 py-2 text-left text-xs font-medium">เลขล็อต</th>
                  <th className="px-4 py-2 text-left text-xs font-medium">วันหมดอายุ</th>
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
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={item.lotNumber}
                        onChange={(e) => updateItem(index, 'lotNumber', e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="date"
                        value={item.expiryDate}
                        onChange={(e) => updateItem(index, 'expiryDate', e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-800 dark:border-gray-700"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex gap-2">
          <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            บันทึกการรับเข้า
          </button>
          <button type="button" onClick={() => router.back()} className="px-6 py-2 bg-gray-300 dark:bg-gray-700 rounded">
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  );
}
