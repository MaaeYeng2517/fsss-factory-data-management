'use client';
import { useEffect, useState } from 'react';
export default function ProcurementPage() {
  const [pos, setPos] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [materials, setMaterials] = useState<any[]>([]);
  const [form, setForm] = useState({ poNumber: '', supplierId: '', notes: '' });
  const load = () => fetch('/api/purchase-orders').then(r => r.json()).then(d => setPos(d.data ?? []));
  useEffect(() => { load(); fetch('/api/suppliers').then(r=>r.json()).then(d=>setSuppliers(d.data??[])); fetch('/api/materials').then(r=>r.json()).then(d=>setMaterials(d.data??[])); }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/purchase-orders', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ ...form, items: materials.slice(0,1).map(m=>({materialId:m.id, quantity:1, unitPrice:m.standardPrice??0})) }) });
    setForm({ poNumber: '', supplierId: '', notes: '' });
    load();
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Procurement</h1>
      <form onSubmit={submit} className="p-4 rounded-xl bg-white border shadow-sm space-y-2">
        <input className="border rounded px-2 py-1 w-full" placeholder="PO Number" value={form.poNumber} onChange={e=>setForm({...form,poNumber:e.target.value})} required />
        <select className="border rounded px-2 py-1 w-full" value={form.supplierId} onChange={e=>setForm({...form,supplierId:e.target.value})} required>
          <option value="">-- supplier --</option>
          {suppliers.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <input className="border rounded px-2 py-1 w-full" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">สร้าง PO</button>
      </form>
      {pos.map(p => (
        <div key={p.id} className="p-4 rounded-xl bg-white border shadow-sm">
          <div className="font-semibold">{p.poNumber}</div>
          <div className="text-sm text-slate-500">{p.supplier?.name} · {p.status} · {p.totalAmount}</div>
        </div>
      ))}
    </div>
  );
}
