'use client';
import { useEffect, useState } from 'react';
export default function ProductionPage() {
  const [mos, setMos] = useState<any[]>([]);
  const [form, setForm] = useState({ moNumber: '', productName: '', quantity: 1, notes: '' });
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState('');
  const filtered = mos.filter(m => (m.moNumber+m.productName).toLowerCase().includes(search.toLowerCase()));
  const load = () => fetch('/api/production-orders').then(r => r.json()).then(d => setMos(d.data ?? []));
  useEffect(() => { load(); }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/production-orders', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) });
    setForm({ moNumber: '', productName: '', quantity: 1, notes: '' });
    load();
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Production</h1>
      <form onSubmit={submit} className="flex gap-2 flex-wrap">
        <input className="border rounded px-2 py-1" placeholder="MO Number" value={form.moNumber} onChange={e=>setForm({...form,moNumber:e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Product" value={form.productName} onChange={e=>setForm({...form,productName:e.target.value})} required />
        <input type="number" className="border rounded px-2 py-1" value={form.quantity} onChange={e=>setForm({...form,quantity:Number(e.target.value)})} />
        <input className="border rounded px-2 py-1" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
      </form>
      <input className="border rounded px-2 py-1" placeholder="ค้นหา" value={search} onChange={e=>setSearch(e.target.value)} />
<button className="px-4 py-2 bg-blue-600 text-white rounded">บันทึกการผลิต</button>
      <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-slate-100"><tr><th className="p-2 text-left">MO</th><th className="p-2 text-left">Product</th><th className="p-2">Qty</th><th className="p-2">Status</th><th className="p-2">การจัดการ</th></tr></thead>
        <tbody>{filtered.map(m => <tr key={m.id} className="border-t"><td className="p-2">{m.moNumber}</td><td className="p-2">{m.productName}</td><td className="p-2 text-center">{m.quantity}</td><td className="p-2">
  <select value={m.status} onChange={async e=>{await fetch(`/api/production-orders/${m.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({status:e.target.value})});load();}} className="border rounded px-1">
    <option value="pending">เริ่มผลิต</option>
    <option value="in_progress">กำลังผลิต</option>
    <option value="completed">สำเร็จแล้ว</option>
  </select>
</td><td className="p-2 flex gap-2"><button onClick={()=>setSelected(m)} className="text-blue-600">ดู</button><button onClick={async()=>{await fetch(`/api/production-orders/${m.id}`,{method:'DELETE'});load();}} className="text-red-600">ลบ</button></td></tr>)}</tbody>
      </table>
{selected && <div className="p-4 bg-white rounded-xl shadow border"><h2 className="font-bold">รายละเอียด</h2><pre className="text-xs">{JSON.stringify(selected,null,2)}</pre></div>}
    </div>
  );
}
