import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, writeAuditLog } from '@/lib/authz';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');
  const status = searchParams.get('status');

  const swaps = await db.shiftSwap.findMany({
    where: {
      ...(employeeId
        ? { OR: [{ requesterId: employeeId }, { receiverId: employeeId }] }
        : {}),
      ...(status ? { status } : {}),
    },
    include: {
      requester: { select: { id: true, employeeCode: true, firstName: true, lastName: true } },
      receiver: { select: { id: true, employeeCode: true, firstName: true, lastName: true } },
      fromSchedule: { include: { employee: true, shift: true } },
      toSchedule: { include: { employee: true, shift: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(swaps);
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireRole('admin', 'manager', 'HR', 'employee');
  if (error) return error;
  try {
    const body = await req.json();
    const swap = await db.shiftSwap.create({
      data: {
        requesterId: body.requesterId,
        receiverId: body.receiverId || null,
        fromScheduleId: body.fromScheduleId || null,
        toScheduleId: body.toScheduleId || null,
        desiredDate: body.desiredDate || null,
        reason: body.reason || '',
        status: 'pending',
      },
      include: {
        requester: { select: { id: true, employeeCode: true, firstName: true, lastName: true } },
        receiver: { select: { id: true, employeeCode: true, firstName: true, lastName: true } },
      },
    });
    await writeAuditLog('CREATE', 'ShiftSwap', swap.id, user.id, user.fullName, null, swap, req);
    return NextResponse.json(swap, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}