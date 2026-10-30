'use client';
import { useEffect, useState } from 'react';
export default function SalesRepsPage() {
  const [reps, setReps] = useState<any[]>([]);
  useEffect(() => { fetch('/api/sales-reps').then(r => r.json()).then(d => setReps(d.data ?? [])); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ผู้แทนขาย</h1>
      {reps.map(r => <div key={r.id} className="p-4 rounded-xl bg-white border shadow-sm">{r.code} — {r.name} · {r.phone}</div>)}
    </div>
  );
}
