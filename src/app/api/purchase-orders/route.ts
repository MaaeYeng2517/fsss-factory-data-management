import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.purchaseOrder.findMany({ include: { supplier: true, items: { include: { material: true } } }, orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const po = await prisma.purchaseOrder.create({
    data: {
      poNumber: body.poNumber,
      supplierId: body.supplierId,
      orderDate: body.orderDate ?? new Date().toISOString().slice(0,10),
      expectedDate: body.expectedDate,
      status: 'pending',
      notes: body.notes,
      requestedBy: body.requestedBy,
      items: { create: (body.items ?? []).map((i: any) => ({ materialId: i.materialId, quantity: i.quantity, unitPrice: i.unitPrice, totalPrice: i.quantity * i.unitPrice })) },
    },
  });
  const total = (body.items ?? []).reduce((s: number, i: any) => s + i.quantity * i.unitPrice, 0);
  await prisma.purchaseOrder.update({ where: { id: po.id }, data: { totalAmount: total } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'PurchaseOrder', entityId: po.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: po }, { status: 201 });
}
