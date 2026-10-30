'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/raw-materials', label: 'คลังวัตถุดิบ' },
  { href: '/raw-materials/materials', label: 'ทะเบียนวัตถุดิบ' },
  { href: '/raw-materials/suppliers', label: 'ผู้จำหน่าย' },
  { href: '/raw-materials/warehouses', label: 'คลังสินค้า' },
  { href: '/raw-materials/purchase-orders', label: 'ใบสั่งซื้อ' },
  { href: '/raw-materials/goods-receipts', label: 'รับเข้าคลัง' },
  { href: '/raw-materials/material-issues', label: 'เบิกจ่าย' },
  { href: '/raw-materials/stock-count', label: 'ตรวจนับสต็อก' },
  { href: '/products', label: 'สินค้าสำเร็จรูป' },
  { href: '/customers', label: 'ลูกค้า' },
  { href: '/quotations', label: 'ใบเสนอราคา' },
  { href: '/sales-orders', label: 'ใบสั่งขาย' },
  { href: '/delivery-notes', label: 'ใบส่งสินค้า' },
  { href: '/sales-invoices', label: 'ใบแจ้งหนี้' },
  { href: '/sales-receipts', label: 'รับเงิน' },
  { href: '/accounts-receivable', label: 'ลูกหนี้' },
  { href: '/accounts-payable', label: 'เจ้าหนี้' },
  { href: '/accounts', label: 'ผังบัญชี' },
  { href: '/dashboard', label: 'แดชบอร์ดพนักงาน' },
  { href: '/production-orders', label: 'ใบสั่งผลิต' },
  { href: '/production-receipts', label: 'รับสินค้าจากการผลิต' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-4 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-4 text-sm font-medium whitespace-nowrap ${
                pathname === link.href
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
