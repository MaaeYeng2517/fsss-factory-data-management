import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employee = await db.employee.findUnique({ where: { id } });
  if (!employee) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(employee);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.firstName !== undefined) data.firstName = body.firstName;
    if (body.lastName !== undefined) data.lastName = body.lastName;
    if (body.email !== undefined) data.email = body.email;
    if (body.phone !== undefined) data.phone = body.phone;
    if (body.role !== undefined) data.role = body.role;
    if (body.department !== undefined) data.department = body.department;
    if (body.hireDate !== undefined) data.hireDate = body.hireDate;
    if (body.active !== undefined) data.active = body.active;
    if (body.hourlyRate !== undefined) data.hourlyRate = Number(body.hourlyRate);

    const employee = await db.employee.update({ where: { id }, data });
    return NextResponse.json(employee);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.employee.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
