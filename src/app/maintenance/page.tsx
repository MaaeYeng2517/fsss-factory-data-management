'use client';
import { useEffect, useState } from 'react';
export default function MaintenancePage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ machine: '', issue: '', status: 'open' });
  const load = () => fetch('/api/maintenance-requests').then(r => r.json()).then(d => setItems(d.data ?? []));
  useEffect(() => { load(); }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/maintenance-requests', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) });
    setForm({ machine: '', issue: '', status: 'open' });
    load();
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Maintenance</h1>
      <form onSubmit={submit} className="flex gap-2 flex-wrap">
        <input className="border rounded px-2 py-1" placeholder="Machine" value={form.machine} onChange={e=>setForm({...form,machine:e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Issue" value={form.issue} onChange={e=>setForm({...form,issue:e.target.value})} required />
        <select className="border rounded px-2 py-1" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">บันทึก</button>
      </form>
      <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-slate-100"><tr><th className="p-2 text-left">Machine</th><th className="p-2 text-left">Issue</th><th className="p-2">Status</th></tr></thead>
        <tbody>{items.map(m => <tr key={m.id} className="border-t"><td className="p-2">{m.machine}</td><td className="p-2">{m.issue}</td><td className="p-2 text-center">{m.status}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
