import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const receipts = await prisma.goodsReceipt.findMany({
      include: {
        supplier: true,
        purchaseOrder: true,
        warehouse: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(receipts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch goods receipts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const grNumber = `GR-${Date.now()}`;

    const receipt = await prisma.goodsReceipt.create({
      data: {
        grNumber,
        purchaseOrderId: body.purchaseOrderId || null,
        supplierId: body.supplierId,
        warehouseId: body.warehouseId,
        receiptDate: body.receiptDate,
        deliveryNote: body.deliveryNote || null,
        invoiceNo: body.invoiceNo || null,
        receivedBy: body.receivedBy || null,
        status: 'pending',
        notes: body.notes || null,
        items: {
          create: body.items.map((item: any) => ({
            materialId: item.materialId,
            quantity: parseFloat(item.quantity),
            unitPrice: parseFloat(item.unitPrice),
            totalPrice: parseFloat(item.quantity) * parseFloat(item.unitPrice),
            lotNumber: item.lotNumber || null,
            expiryDate: item.expiryDate || null,
          })),
        },
      },
      include: {
        supplier: true,
        items: true,
      },
    });
    return NextResponse.json(receipt);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create goods receipt' }, { status: 500 });
  }
}
