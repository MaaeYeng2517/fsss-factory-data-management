import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await prisma.product.findUnique({ where: { id: id }, include: { category: true } });
  return p ? NextResponse.json({ data: p }) : NextResponse.json({ error: 'not found' }, { status: 404 });
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const p = await prisma.product.update({ where: { id: id }, data: { code: body.code, name: body.name, categoryId: body.categoryId, unit: body.unit, standardCost: body.standardCost, sellingPrice: body.sellingPrice } });
  await prisma.auditLog.create({ data: { action: 'UPDATE', entity: 'Product', entityId: p.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: p });
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.product.delete({ where: { id: id } });
  await prisma.auditLog.create({ data: { action: 'DELETE', entity: 'Product', entityId: id } });
  return NextResponse.json({ ok: true });
}
