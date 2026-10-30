import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.shiftId !== undefined) data.shiftId = body.shiftId;
    if (body.date !== undefined) data.date = body.date;
    if (body.note !== undefined) data.note = body.note;

    const schedule = await db.schedule.update({
      where: { id },
      data,
      include: { employee: true, shift: true },
    });
    return NextResponse.json(schedule);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.schedule.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
