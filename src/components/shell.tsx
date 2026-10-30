'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'แดชบอร์ด' }, { href: '/master-data', label: 'Master Data' }, { href: '/procurement', label: 'จัดซื้อ' },
  { href: '/production', label: 'การผลิต' }, { href: '/warehouse', label: 'คลัง' }, { href: '/quality', label: 'คุณภาพ' },
  { href: '/maintenance', label: 'ซ่อมบำรุง' }, { href: '/employees', label: 'พนักงาน' }, { href: '/internal-audits', label: 'ตรวจสอบภายใน' },
  { href: '/approvals', label: 'อนุมัติ' }, { href: '/sales-reps', label: 'ผู้แทนขาย' }, { href: '/financial-reports', label: 'รายงานการเงิน' },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200/70">
        <div className="flex gap-1 overflow-x-auto px-4 py-2">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm ${pathname === l.href ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{l.label}</Link>
          ))}
        </div>
      </nav>
      <div className="pt-6 pb-10 px-6 md:pt-8 md:px-8 w-full">{children}</div>
      <footer className="text-center text-xs text-slate-400 py-4 border-t">MMS Factory OS © 2026</footer>
    </>
  );
}
