import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, writeAuditLog } from '@/lib/authz';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user, error } = await requireRole('admin', 'manager', 'HR');
  if (error) return error;
  try {
    const body = await req.json();
    const status = body.status;
    if (!['approved', 'rejected', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const oldSwap = await db.shiftSwap.findUnique({ where: { id } });
    const swap = await db.shiftSwap.update({
      where: { id },
      data: {
        status,
        reviewedAt: new Date().toISOString(),
        reviewerId: body.reviewerId || user.id,
      },
      include: {
        requester: { select: { id: true, firstName: true, lastName: true } },
        receiver: { select: { id: true, firstName: true, lastName: true } },
      },
    });
    await writeAuditLog('UPDATE', 'ShiftSwap', id, user.id, user.fullName, oldSwap, swap, req);
    return NextResponse.json(swap);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
