'use client';

type Shift = { id: string; name: string; startTime: string; endTime: string };

export default function DashboardClient({
  user,
  stats,
  shifts,
}: {
  user: { id: string; name: string; role: string };
  stats: { employees: number; shifts: number; schedules: number; leaves: number };
  shifts: Shift[];
}) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard — {user.role}</h1>
        <form action="/api/auth/logout" method="POST"><button type="submit" className="text-red-600">ออกจาาระบบ</button></form>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow"><div className="text-gray-500">พนักงาน</div><div className="text-2xl font-bold">{stats.employees}</div></div>
        <div className="bg-white p-4 rounded shadow"><div className="text-gray-500">กะ</div><div className="text-2xl font-bold">{stats.shifts}</div></div>
        <div className="bg-white p-4 rounded shadow"><div className="text-gray-500">การจัดกะ</div><div className="text-2xl font-bold">{stats.schedules}</div></div>
        <div className="bg-white p-4 rounded shadow"><div className="text-gray-500">คำขอลาค้าง</div><div className="text-2xl font-bold">{stats.leaves}</div></div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">การทำงาน</h2>
        <ul>{shifts.map(s => <li key={s.id}>{s.name} {s.startTime}-{s.endTime}</li>)}</ul>
      </div>
      <nav className="flex gap-4 text-blue-600">
        <a href="/schedules">ตารางกะ</a>
        <a href="/employees">พนักงาน</a>
        <a href="/shift-swap">คำขอแลกกะ</a>
        <a href="/attendance">ลงเวลา</a>
      </nav>
    </div>
  );
}