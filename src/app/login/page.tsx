'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setSession } from '@/lib/auth';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError('อีเมลหรือTraderส่วนผ่านไม่ถูกต้อง');
        return;
      }
      router.push('/dashboard');
    } catch {
      setError('เกิดข้อผิดพลาด');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950">
      <div className="w-full max-w-md p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
        <div className="text-center mb-6">
          <span className="text-4xl">🏢</span>
          <h1 className="text-xl font-bold mt-2">ระบบจัดกะทำงาน</h1>
          <p className="text-sm text-zinc-500">เข้าสู่ระบบ</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-2 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">อีเมล</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border rounded px-3 py-2 text-sm"
              placeholder="email@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Traderส่วนผ่าน</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900 disabled:opacity-50"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </div>
    </div>
  );
}