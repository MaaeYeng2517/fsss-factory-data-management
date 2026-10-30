import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, writeAuditLog } from '@/lib/authz';

export async function GET() {
  const shifts = await db.shift.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(shifts);
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireRole('admin', 'manager', 'HR');
  if (error) return error;
  try {
    const body = await req.json();
    const shift = await db.shift.create({
      data: {
        name: body.name,
        startTime: body.startTime,
        endTime: body.endTime,
        breakMinutes: body.breakMinutes ? Number(body.breakMinutes) : 0,
        color: body.color || '#6b7280',
      },
    });
    await writeAuditLog('CREATE', 'Shift', shift.id, user.id, user.fullName, null, shift, req);
    return NextResponse.json(shift, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}