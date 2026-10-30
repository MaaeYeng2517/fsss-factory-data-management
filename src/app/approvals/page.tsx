'use client';
import { useEffect, useState } from 'react';
export default function ApprovalsPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { fetch('/api/approvals').then(r => r.json()).then(d => setItems(d.data ?? [])); }, []);
  const decide = async (id: string, status: string) => {
    await fetch('/api/approvals', { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id, status, approvedBy: 'admin' }) });
    setItems(await fetch('/api/approvals').then(r=>r.json()).then(d=>d.data??[]));
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">อนุมัติเอกสาร</h1>
      {items.map(a => (
        <div key={a.id} className="p-4 rounded-xl bg-white border shadow-sm flex justify-between items-center">
          <div>{a.entityType} · {a.entityId} · {a.status}</div>
          {a.status === 'pending' && (
            <div className="flex gap-2">
              <button onClick={() => decide(a.id, 'approved')} className="px-3 py-1 bg-green-600 text-white rounded">อนุมัติ</button>
              <button onClick={() => decide(a.id, 'rejected')} className="px-3 py-1 bg-red-600 text-white rounded">ปฏิเสธ</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
