import { db } from '@/lib/db';

export default async function Dashboard() {
  const [employees, shifts, schedules, swaps] = await Promise.all([
    db.employee.findMany({ where: { active: true } }),
    db.shift.findMany(),
    db.schedule.findMany({ take: 10, orderBy: { date: 'asc' }, include: { employee: true, shift: true } }),
    db.shiftSwap.findMany({ where: { status: 'pending' }, take: 5, orderBy: { createdAt: 'desc' }, include: { requester: true } }),
  ]);

  const stats = [
    { label: 'พนักงานทั้งหมด', value: employees.length, color: 'bg-blue-600' },
    { label: 'รูปแบบกะ', value: shifts.length, color: 'bg-indigo-600' },
    { label: 'ตารางกะทั้งหมด', value: schedules.length, color: 'bg-green-600' },
    { label: 'คำขอแลกกะรออนุมัติ', value: swaps.length, color: 'bg-amber-600' },
  ];

  const links = [
    ['คลังวัตถุดิบ', '/raw-materials'],
    ['ทะเบียนวัตถุดิบ', '/raw-materials/materials'],
    ['ผู้จำหน่าย', '/raw-materials/suppliers'],
    ['คลังสินค้า', '/raw-materials/warehouses'],
    ['ใบสั่งซื้อ', '/raw-materials/purchase-orders'],
    ['รับเข้าคลัง', '/raw-materials/goods-receipts'],
    ['เบิกจ่าย', '/raw-materials/material-issues'],
    ['ตรวจนับสต็อก', '/raw-materials/stock-count'],
    ['สินค้าสำเร็จรูป', '/products'],
    ['ลูกค้า', '/customers'],
    ['ใบเสนอราคา', '/quotations'],
    ['ใบสั่งขาย', '/sales-orders'],
    ['ใบส่งสินค้า', '/delivery-notes'],
    ['ใบแจ้งหนี้', '/sales-invoices'],
    ['รับเงิน', '/sales-receipts'],
    ['ลูกหนี้', '/accounts-receivable'],
    ['เจ้าหนี้', '/accounts-payable'],
    ['ผังบัญชี', '/accounts'],
    ['ใบสั่งผลิต', '/production-orders'],
    ['รับสินค้าจากการผลิต', '/production-receipts'],
    ['พนักงาน', '/employees'],
    ['แดชบอร์ดพนักงาน', '/dashboard'],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">ภาพรวมระบบ</h1>
        <p className="text-zinc-500">ติดตามสถานะการจัดกะและพนักงานทั้งหมด</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className={`flex items-center justify-between mb-2 ${s.color}`}>
              <span className="text-white font-medium">{s.value}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
          <h2 className="font-semibold mb-4">ตารางกะล่าสุด</h2>
          {schedules.length === 0 ? (
            <p className="text-sm text-zinc-500">ยังไม่มีตารางกะ</p>
          ) : (
            <div className="space-y-3">
              {schedules.map((s) => (
                <div key={s.id} className="flex items-center justify-between text-sm border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 pb-2">
                  <div>
                    <div className="font-medium">{s.employee.firstName} {s.employee.lastName}</div>
                    <div className="text-xs text-zinc-500">{s.date} &bull; {s.shift.name}</div>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                    s.shift.name.includes('เช้า') ? 'bg-blue-100 text-blue-700' :
                    s.shift.name.includes('บ่าย') ? 'bg-amber-100 text-amber-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>{s.shift.name}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm p-6">
          <h2 className="font-semibold mb-4">คำขอแลกกะรออนุมัติ</h2>
          {swaps.length === 0 ? (
            <p className="text-sm text-zinc-500">ไม่มีคำขอค้างอยู่</p>
          ) : (
            <div className="space-y-3">
              {swaps.map((s) => (
                <div key={s.id} className="text-sm border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 pb-2">
                  <div className="font-medium">{s.requester.firstName} {s.requester.lastName}</div>
                  <div className="text-xs text-zinc-500">{s.reason || 'ไม่มีรายละเอียด'}</div>
                  <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-700 text-xs font-medium">
                    รออนุมัติ
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {links.map(([label, href]) => (
          <a key={href} href={href} className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800">
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}