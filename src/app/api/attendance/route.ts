import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, writeAuditLog } from '@/lib/authz';
import { calculateHours } from '@/lib/utils';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');
  const date = searchParams.get('date');

  const attendance = await db.attendance.findMany({
    where: {
      ...(employeeId ? { employeeId } : {}),
      ...(date ? { date } : {}),
    },
    include: { employee: true },
    orderBy: { date: 'asc' },
  });
  return NextResponse.json(attendance);
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireRole('admin', 'manager', 'HR', 'employee');
  if (error) return error;
  try {
    const body = await req.json();
    const today = new Date().toISOString().split('T')[0];
    const date = body.date || today;
    const existing = await db.attendance.findFirst({
      where: { employeeId: body.employeeId, date },
    });

    if (body.action === 'clockIn') {
      if (existing?.clockIn) {
        return NextResponse.json({ error: 'Already clocked in' }, { status: 400 });
      }
      const now = new Date().toISOString();
      const record = existing
        ? await db.attendance.update({
            where: { id: existing.id },
            data: { clockIn: now, status: existing.status === 'absent' ? 'present' : existing.status },
            include: { employee: true },
          })
        : await db.attendance.create({
            data: {
              employeeId: body.employeeId,
              date,
              clockIn: now,
              status: 'present',
            },
            include: { employee: true },
          });
      await writeAuditLog('CLOCK_IN', 'Attendance', record.id, user.id, user.fullName, null, record, req);
      return NextResponse.json(record, existing ? { status: 200 } : { status: 201 });
    }

    if (body.action === 'clockOut') {
      if (!existing?.clockIn) {
        return NextResponse.json({ error: 'Not clocked in' }, { status: 400 });
      }
      if (existing.clockOut) {
        return NextResponse.json({ error: 'Already clocked out' }, { status: 400 });
      }
      const now = new Date().toISOString();
      const hours = calculateHours(existing.clockIn.toISOString(), now);
      const record = await db.attendance.update({
        where: { id: existing.id },
        data: { clockOut: now, hoursWorked: hours },
        include: { employee: true },
      });
      await writeAuditLog('CLOCK_OUT', 'Attendance', record.id, user.id, user.fullName, null, record, req);
      return NextResponse.json(record);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}