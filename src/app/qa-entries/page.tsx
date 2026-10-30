'use client';
import { useEffect, useState } from 'react';
export default function QaEntriesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ question_id: '', answer_id: '', answer: '' });
  const load = () => fetch('/api/qa-entries').then(r => r.json()).then(d => setItems(d.data ?? []));
  useEffect(() => { load(); }, []);
  const submit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/qa-entries', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ question_id: form.question_id, answer_id: form.answer_id, answer: form.answer, sources: [], verification: { status: 'verified' } }) });
    setForm({ question_id: '', answer_id: '', answer: '' });
    load();
  };
  const del = async (id: string) => { await fetch('/api/qa-entries', { method: 'DELETE', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id }) }); load(); };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Q&A Entries</h1>
      <form onSubmit={submit} className="flex gap-2 flex-wrap">
        <input className="border rounded px-2 py-1" placeholder="Question ID" value={form.question_id} onChange={e=>setForm({...form,question_id:e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Answer ID" value={form.answer_id} onChange={e=>setForm({...form,answer_id:e.target.value})} required />
        <input className="border rounded px-2 py-1" placeholder="Answer" value={form.answer} onChange={e=>setForm({...form,answer:e.target.value})} required />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">บันทึก</button>
      </form>
      <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow">
        <thead className="bg-slate-100"><tr><th className="p-2 text-left">QID</th><th className="p-2 text-left">AID</th><th className="p-2 text-left">Answer</th><th className="p-2">จัดการ</th></tr></thead>
        <tbody>{items.map(q => <tr key={q.id} className="border-t"><td className="p-2">{q.questionId}</td><td className="p-2">{q.answerId}</td><td className="p-2">{q.answer}</td><td className="p-2 text-center"><button onClick={()=>del(q.id)} className="text-red-600">ลบ</button></td></tr>)}</tbody>
      </table>
    </div>
  );
}
