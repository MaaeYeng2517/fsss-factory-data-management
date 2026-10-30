'use client';
import { useEffect, useState } from 'react';
export default function QualityPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ inspectionType: 'INCOMING', status: 'pending', notes: '' });
  const load = () => fetch('/api/quality-inspections').then(r => r.json()).then(d => setItems(d.data ?? []));
  useEffect(() => { load(); }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/quality-inspections', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) });
    setForm({ inspectionType: 'INCOMING', status: 'pending', notes: '' });
    load();
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Quality</h1>
      <form onSubmit={submit} className="flex gap-2 flex-wrap">
        <select className="border rounded px-2 py-1" value={form.inspectionType} onChange={e=>setForm({...form,inspectionType:e.target.value})}>
          <option value="INCOMING">Incoming</option>
          <option value="IN_PROCESS">In-process</option>
          <option value="FINAL">Final</option>
        </select>
        <select className="border rounded px-2 py-1" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option value="pending">Pending</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
        <input className="border rounded px-2 py-1" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">บันทึก</button>
      </form>
      <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-slate-100"><tr><th className="p-2 text-left">Type</th><th className="p-2">Status</th><th className="p-2 text-left">Notes</th></tr></thead>
        <tbody>{items.map(q => <tr key={q.id} className="border-t"><td className="p-2">{q.inspectionType}</td><td className="p-2 text-center">{q.status}</td><td className="p-2">{q.notes}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
