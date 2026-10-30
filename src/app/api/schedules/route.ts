import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, writeAuditLog } from '@/lib/authz';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');
  const date = searchParams.get('date');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const schedules = await db.schedule.findMany({
    where: {
      ...(employeeId ? { employeeId } : {}),
      ...(date ? { date } : {}),
      ...(startDate && endDate ? { date: { gte: startDate, lte: endDate } } : {}),
    },
    include: { employee: true, shift: true },
    orderBy: { date: 'asc' },
  });
  return NextResponse.json(schedules);
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireRole('admin', 'manager', 'HR');
  if (error) return error;
  try {
    const body = await req.json();
    const existing = await db.schedule.findFirst({
      where: { employeeId: body.employeeId, date: body.date },
    });
    if (existing) {
      return NextResponse.json({ error: 'Already scheduled for this date' }, { status: 400 });
    }
    const schedule = await db.schedule.create({
      data: {
        employeeId: body.employeeId,
        shiftId: body.shiftId,
        date: body.date,
        note: body.note || null,
      },
      include: { employee: true, shift: true },
    });
    await writeAuditLog('CREATE', 'Schedule', schedule.id, user.id, user.fullName, null, schedule, req);
    return NextResponse.json(schedule, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}