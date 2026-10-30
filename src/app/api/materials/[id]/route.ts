import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const m = await prisma.material.findUnique({ where: { id: id }, include: { category: true } });
  return m ? NextResponse.json({ data: m }) : NextResponse.json({ error: 'not found' }, { status: 404 });
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const m = await prisma.material.update({ where: { id: id }, data: { code: body.code, name: body.name, categoryId: body.categoryId, unit: body.unit, reorderPoint: body.reorderPoint, standardPrice: body.standardPrice } });
  await prisma.auditLog.create({ data: { action: 'UPDATE', entity: 'Material', entityId: m.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: m });
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.material.delete({ where: { id: id } });
  await prisma.auditLog.create({ data: { action: 'DELETE', entity: 'Material', entityId: id } });
  return NextResponse.json({ ok: true });
}
