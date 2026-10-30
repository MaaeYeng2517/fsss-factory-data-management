'use client';
import { useEffect, useState } from 'react';
export default function WarehousePage() {
  const [balances, setBalances] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [form, setForm] = useState({ code: '', name: '', location: '' });
  const load = () => fetch('/api/inventory/balances').then(r => r.json()).then(d => setBalances(d.data ?? []));
  useEffect(() => { load(); fetch('/api/warehouses').then(r=>r.json()).then(d=>setWarehouses(d.data??[])); }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/warehouses', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) });
    setForm({ code: '', name: '', location: '' });
    fetch('/api/warehouses').then(r=>r.json()).then(d=>setWarehouses(d.data??[]));
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Warehouse</h1>
      <form onSubmit={submit} className="flex gap-2 flex-wrap">
        <input className="border rounded px-2 py-1" placeholder="Code" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">บันทึก</button>
      </form>
      <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-slate-100"><tr><th className="p-2 text-left">Material</th><th className="p-2 text-left">Warehouse</th><th className="p-2">Qty</th></tr></thead>
        <tbody>{balances.map(b => <tr key={b.id} className="border-t"><td className="p-2">{b.material?.name}</td><td className="p-2">{b.warehouse?.name}</td><td className="p-2 text-center">{b.quantity}</td></tr>)}</tbody>
      </table>
      <div className="text-sm text-slate-500">คลังที่มี: {warehouses.map(w=>w.name).join(', ')}</div>
    </div>
  );
}
