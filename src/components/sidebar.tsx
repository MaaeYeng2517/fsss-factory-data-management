'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const groups = [
  { title: 'ภาพรวม', links: [{ href: '/', label: 'แดชบอร์ด', icon: '🏠' }, { href: '/analytics', label: 'Analytics', icon: '📊' }, { href: '/approvals', label: 'อนุมัติ', icon: '✅' }] },
  { title: 'ข้อมูลหลัก', links: [{ href: '/master-data', label: 'Master Data', icon: '📦' }, { href: '/employees', label: 'พนักงาน', icon: '👥' }, { href: '/products', label: 'สินค้า', icon: '🏷️' }, { href: '/raw-materials', label: 'วัตถุดิบ', icon: '🧱' }, { href: '/customers', label: 'ลูกค้า', icon: '🤝' }] },
  { title: 'จัดซื้อ', links: [{ href: '/procurement', label: 'ใบสั่งซื้อ', icon: '🛒' }] },
  { title: 'การผลิต', links: [{ href: '/production', label: 'คำสั่งผลิต', icon: '🏭' }, { href: '/production-orders', label: 'MO', icon: '📋' }, { href: '/production-receipts', label: 'รับผลิต', icon: '📥' }] },
  { title: 'คลัง', links: [{ href: '/warehouse', label: 'คลังสินค้า', icon: '📦' }] },
  { title: 'คุณภาพ', links: [{ href: '/quality', label: 'ตรวจสอบ', icon: '🔍' }] },
  { title: 'ซ่อมบำรุง', links: [{ href: '/maintenance', label: 'ซ่อมบำรุง', icon: '🔧' }] },
  { title: 'HR', links: [{ href: '/shifts', label: 'กะ', icon: '🕒' }, { href: '/schedules', label: 'ตารางกะ', icon: '📅' }, { href: '/attendance', label: 'ลงเวลา', icon: '⏱️' }, { href: '/leave-requests', label: 'ลางาน', icon: '📝' }, { href: '/payroll', label: 'เงินเดือน', icon: '💰' }] },
  { title: 'ขาย', links: [  { href: '/sales-reps', label: 'ผู้แทนขาย', icon: '🧳' },
  { href: '/sales-orders', label: 'คำสั่งขาย', icon: '🧾' }, { href: '/quotations', label: 'ใบเสนอราคา', icon: '📄' }, { href: '/delivery-notes', label: 'ใบส่งของ', icon: '🚚' }] },
  { title: 'การเงิน', links: [{ href: '/sales-invoices', label: 'ใบแจ้งหนี้', icon: '🧾' }, { href: '/sales-receipts', label: 'รับชำระ', icon: '💵' },   { href: '/financial-reports', label: 'รายงานการเงิน', icon: '📈' },
  { href: '/accounts', label: 'บัญชี', icon: '📒' }, { href: '/journal-entries', label: 'สมุดรายวัน', icon: '📓' }] },
];

export default function Sidebar({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  if (!open) return null;
  return (
    <aside className="fixed inset-y-0 left-0 z-20 w-64 border-r border-slate-200/70 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-800 overflow-y-auto">
      <div className="flex h-16 items-center gap-3 px-5 border-b border-slate-200/70 dark:border-slate-800">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/30">M</div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-slate-900 dark:text-white">MMS</span>
          <span className="text-[11px] text-slate-500">Factory OS</span>
        </div>
      </div>
      <nav className="mt-4 px-3 pb-6 space-y-4">
        {groups.map(g => (
          <div key={g.title}>
            <div className="px-3 mb-1 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{g.title}</div>
            <div className="space-y-1">
              {g.links.map(link => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className={`group flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${active ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
                    <span className={`text-base transition-transform ${active ? '' : 'group-hover:scale-110'}`}>{link.icon}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
