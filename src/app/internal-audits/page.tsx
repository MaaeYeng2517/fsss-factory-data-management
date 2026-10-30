'use client';
import { useEffect, useState } from 'react';
export default function InternalAuditsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', scope: '', auditor: '' });
  const load = () => fetch('/api/internal-audits').then(r => r.json()).then(d => setItems(d.data ?? []));
  useEffect(() => { load(); }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/internal-audits', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) });
    setForm({ title: '', scope: '', auditor: '' });
    load();
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ตรวจสอบภายใน</h1>
      <form onSubmit={submit} className="flex gap-2 flex-wrap">
        <input className="border rounded px-2 py-1" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Scope" value={form.scope} onChange={e=>setForm({...form,scope:e.target.value})} />
        <input className="border rounded px-2 py-1" placeholder="Auditor" value={form.auditor} onChange={e=>setForm({...form,auditor:e.target.value})} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">บันทึก</button>
      </form>
      <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-slate-100"><tr><th className="p-2 text-left">Title</th><th className="p-2 text-left">Scope</th><th className="p-2">Status</th><th className="p-2 text-left">Auditor</th></tr></thead>
        <tbody>{items.map(a => <tr key={a.id} className="border-t"><td className="p-2">{a.title}</td><td className="p-2">{a.scope}</td><td className="p-2 text-center">{a.status}</td><td className="p-2">{a.auditor}</td></tr>)}</tbody>
      </table>
    </div>
  );
}
