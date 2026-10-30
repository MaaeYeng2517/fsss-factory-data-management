'use client';

import { useEffect, useState } from 'react';

interface Summary {
  totalMaterials: number;
  lowStock: number;
  totalValue: number;
  materials: Array<{
    id: string;
    code: string;
    name: string;
    unit: string;
    minStock: number;
    reorderPoint: number;
    standardPrice: number;
    balances: Array<{
      quantity: number;
      availableQuantity: number;
    }>;
  }>;
}

export default function RawMaterialsDashboard() {
  const [summary, setSummary] = useState<Summary>({
    totalMaterials: 0,
    lowStock: 0,
    totalValue: 0,
    materials: [],
  });
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'all' | 'low'>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/raw-materials/dashboard');
      const data = await res.json();
      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalStock = (materials: any) => {
    return (materials?.balances ?? []).reduce((sum: number, b: any) => sum + (b.availableQuantity || b.quantity || 0), 0);
  };

  const filteredMaterials = mode === 'low'
    ? (summary?.materials ?? []).filter((m: any) => {
        const total = getTotalStock(m);
        return total <= (m.reorderPoint || m.minStock || 0);
      })
    : (summary?.materials ?? []);

  if (loading) {
    return <div className="p-6">กำลังโหลด...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">คลังวัตถุดิบ</h1>
        <div className="text-sm text-gray-600">ข้อมูลตัวอย่าง</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">รายการวัตถุดิบ</div>
          <div className="text-3xl font-bold mt-2">{summary.totalMaterials}</div>
          <div className="text-xs text-gray-500 mt-1">รายการ</div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-red-200 dark:border-red-900">
          <div className="text-sm text-gray-600 dark:text-gray-400">ต่ำกว่าจุดสั่งซื้อ</div>
          <div className="text-3xl font-bold mt-2 text-red-600">{summary.lowStock}</div>
          <div className="text-xs text-gray-500 mt-1">รายการ</div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">มูลค่าสต็อกตามราคามาตรฐาน</div>
          <div className="text-3xl font-bold mt-2">
            {summary.totalValue.toLocaleString('th-TH')}
          </div>
          <div className="text-xs text-gray-500 mt-1">บาท</div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-blue-200 dark:border-blue-900">
          <div className="text-sm text-gray-600 dark:text-gray-400">คลังที่ใช้งาน</div>
          <div className="text-3xl font-bold mt-2">1</div>
          <div className="text-xs text-gray-500 mt-1">คลัง</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">รายการวัตถุดิบ</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('all')}
              className={`px-3 py-1 text-sm rounded ${
                mode === 'all'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              ทั้งหมด
            </button>
            <button
              onClick={() => setMode('low')}
              className={`px-3 py-1 text-sm rounded ${
                mode === 'low'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              ใกล้หมด / ต่ำกว่าขั้นต่ำ
            </button>
            <button
              onClick={() => setMode('all')}
              className={`px-3 py-1 text-sm rounded ${
                mode === 'all' && false
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              สต็อกปกติ
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  วัตถุดิบ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  คงเหลือ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ขั้นต่ำ
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  สถานะ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {filteredMaterials.map((material) => {
                const total = getTotalStock(material);
                const min = material.reorderPoint || material.minStock || 0;
                const isLow = total <= min && min > 0;
                return (
                  <tr key={material.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {material.name}
                      </div>
                      <div className="text-sm text-gray-500">{material.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-900 dark:text-white">
                      {total.toLocaleString('th-TH')} {material.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-gray-500">
                      {min.toLocaleString('th-TH')} {material.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {isLow ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          ควรสั่งซื้อ
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          ปกติ
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold mb-4">ทดลองบันทึกการเคลื่อนไหวสต็อก</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          เพิ่มรับเข้า หรือจำลองการเบิกออกจากคลัง
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="/raw-materials/materials" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            จัดการทะเบียนวัตถุดิบ
          </a>
          <a href="/raw-materials/goods-receipts" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            รับวัตถุดิบเข้าคลัง
          </a>
          <a href="/raw-materials/material-issues" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
            เบิกจ่ายวัตถุดิบ
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          บันทึกตัวอย่างการเปลี่ยนแปลงมีผลเฉพาะตัวอย่างบนหน้าจอนี้ ไม่ได้บันทึกลงฐานข้อมูลจริง และยังไม่ใช่รายการรับ/เบิกที่ผ่านการอนุมัติ
        </p>
      </div>
    </div>
  );
}
