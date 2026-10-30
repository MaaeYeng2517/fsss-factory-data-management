import { NextRequest, NextResponse } from 'next/server';
import { Store } from '@/lib/store';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = body.type; // 'employees' | 'schedules'
    const data = body.data || [];
    
    if (type === 'employees') {
      const employees = Store.employees.all();
      let added = 0;
      for (const item of data) {
        const emp = {
          id: randomUUID(),
          employeeCode: item.employeeCode || `EMP${String(employees.length + added + 1).padStart(4, '0')}`,
          firstName: item.firstName || item.first_name || '',
          lastName: item.lastName || item.last_name || '',
          email: item.email,
          phone: item.phone,
          role: item.role || 'employee',
          department: item.department,
          hireDate: item.hireDate || new Date().toISOString().split('T')[0],
          active: item.active !== false,
          hourlyRate: item.hourlyRate || item.hourly_rate || 0,
        };
        employees.push(emp);
        added++;
      }
      Store.employees.save(employees);
      return NextResponse.json({ success: true, added });
    }
    
    if (type === 'schedules') {
      const schedules = Store.schedules.all();
      let added = 0;
      for (const item of data) {
        const schedule = {
          id: randomUUID(),
          employeeId: item.employeeId,
          shiftId: item.shiftId,
          date: item.date,
          note: item.note,
        };
        schedules.push(schedule);
        added++;
      }
      Store.schedules.save(schedules);
      return NextResponse.json({ success: true, added });
    }
    
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
