'use client';
import { useEffect, useState } from 'react';

export default function MasterDataPage() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/materials').then(r => r.json()).then(d => setMaterials(d.data ?? []));
    fetch('/api/products').then(r => r.json()).then(d => setProducts(d.data ?? []));
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Master Data</h1>
      <section>
        <h2 className="text-lg font-semibold mb-2">Materials ({materials.length})</h2>
        <div className="grid gap-2">
          {materials.map(m => <div key={m.id} className="p-3 rounded-xl bg-white border shadow-sm">{m.code} — {m.name}</div>)}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Products ({products.length})</h2>
        <div className="grid gap-2">
          {products.map(p => <div key={p.id} className="p-3 rounded-xl bg-white border shadow-sm">{p.code} — {p.name}</div>)}
        </div>
      </section>
    </div>
  );
}
