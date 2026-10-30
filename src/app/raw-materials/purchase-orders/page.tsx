'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface PurchaseOrder {
  id: string;
  poNumber: string;
  orderDate: string;
  expectedDate: string | null;
  status: string;
  totalAmount: number;
  supplier: { name: string };
  items: any[];
}

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/raw-materials/purchase-orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const map: any = {
      pending: { label: 'รออนุมัติ', color: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'อนุมัติแล้ว', color: 'bg-blue-100 text-blue-800' },
      ordered: { label: 'สั่งซื้อแล้ว', color: 'bg-purple-100 text-purple-800' },
      received: { label: 'รับแล้ว', color: 'bg-green-100 text-green-800' },
      cancelled: { label: 'ยกเลิก', color: 'bg-gray-100 text-gray-800' },
    };
    const s = map[status] || map.pending;
    return <span className={`px-2 py-1 text-xs rounded-full ${s.color}`}>{s.label}</span>;
  };

  if (loading) return <div className="p-6">กำลังโหลด...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">ใบสั่งซื้อ (Purchase Order)</h1>
        <Link href="/raw-materials/purchase-orders/new" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + สร้างใบสั่งซื้อ
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">เลขที่ PO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ผู้จำหน่าย</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่สั่งซื้อ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่คาดรับ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จำนวนรายการ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">ยอดรวม</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 font-mono text-sm font-medium">{order.poNumber}</td>
                  <td className="px-6 py-4">{order.supplier.name}</td>
                  <td className="px-6 py-4">{order.orderDate}</td>
                  <td className="px-6 py-4">{order.expectedDate || '-'}</td>
                  <td className="px-6 py-4 text-right">{order.items.length}</td>
                  <td className="px-6 py-4 text-right">{order.totalAmount.toLocaleString('th-TH')} ฿</td>
                  <td className="px-6 py-4 text-center">{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-500">ยังไม่มีใบสั่งซื้อ</div>
          )}
        </div>
      </div>
    </div>
  );
}
