'use client';
import { useEffect, useState } from 'react';
export default function AnalyticsPage() {
  const [kpi, setKpi] = useState<any>(null);
  useEffect(() => { fetch('/api/analytics/production-kpis').then(r => r.json()).then(d => setKpi(d.data)); }, []);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Analytics</h1>
      {kpi && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(kpi).map(([k,v]) => (
            <div key={k} className="p-4 rounded-xl bg-white border shadow-sm">
              <div className="text-sm text-slate-500">{k}</div>
              <div className="text-2xl font-bold">{String(v)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
