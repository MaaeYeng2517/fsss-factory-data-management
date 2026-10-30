import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.goodsReceipt.findMany({ include: { supplier: true, warehouse: true, items: { include: { material: true } } }, orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const gr = await prisma.goodsReceipt.create({
    data: {
      grNumber: body.grNumber,
      purchaseOrderId: body.purchaseOrderId,
      supplierId: body.supplierId,
      warehouseId: body.warehouseId,
      receiptDate: body.receiptDate ?? new Date().toISOString().slice(0,10),
      deliveryNote: body.deliveryNote,
      invoiceNo: body.invoiceNo,
      receivedBy: body.receivedBy,
      status: 'pending',
      items: { create: (body.items ?? []).map((i: any) => ({ materialId: i.materialId, quantity: i.quantity, unitPrice: i.unitPrice ?? 0, totalPrice: i.quantity * (i.unitPrice ?? 0) })) },
    },
  });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'GoodsReceipt', entityId: gr.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: gr }, { status: 201 });
}
