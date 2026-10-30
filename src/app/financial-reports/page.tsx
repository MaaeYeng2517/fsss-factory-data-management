'use client';
import { useEffect, useState } from 'react';
export default function FinancialReportsPage() {
  const [entries, setEntries] = useState<any[]>([]);
  useEffect(() => { fetch('/api/journal-entries').then(r => r.json()).then(d => setEntries(d.data ?? [])); }, []);
  const totalDebit = entries.reduce((s, e) => s + (e.debit ?? 0), 0);
  const totalCredit = entries.reduce((s, e) => s + (e.credit ?? 0), 0);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">รายงานการเงิน</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border shadow-sm"><div className="text-sm text-slate-500">งบดุล (Debit)</div><div className="text-2xl font-bold">{totalDebit.toLocaleString()}</div></div>
        <div className="p-4 rounded-xl bg-white border shadow-sm"><div className="text-sm text-slate-500">งบดุล (Credit)</div><div className="text-2xl font-bold">{totalCredit.toLocaleString()}</div></div>
        <div className="p-4 rounded-xl bg-white border shadow-sm"><div className="text-sm text-slate-500">กำไร/ขาดทุน</div><div className="text-2xl font-bold">{(totalCredit - totalDebit).toLocaleString()}</div></div>
      </div>
      <div className="p-4 rounded-xl bg-white border shadow-sm">
        <h2 className="font-semibold mb-2">รายการสมุดรายวัน</h2>
        <div className="space-y-1 max-h-96 overflow-y-auto">
          {entries.map(e => <div key={e.id} className="text-sm flex justify-between border-b py-1"><span>{e.description ?? e.account}</span><span>{(e.debit ?? 0) - (e.credit ?? 0)}</span></div>)}
        </div>
      </div>
    </div>
  );
}
