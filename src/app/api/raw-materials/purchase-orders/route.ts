import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.purchaseOrder.findMany({
      include: {
        supplier: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch purchase orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const poNumber = `PO-${Date.now()}`;

    const totalAmount = body.items.reduce(
      (sum: number, item: any) => sum + (parseFloat(item.quantity) * parseFloat(item.unitPrice)),
      0
    );

    const order = await prisma.purchaseOrder.create({
      data: {
        poNumber,
        supplierId: body.supplierId,
        orderDate: body.orderDate,
        expectedDate: body.expectedDate || null,
        status: 'pending',
        totalAmount,
        notes: body.notes || null,
        requestedBy: body.requestedBy || null,
        items: {
          create: body.items.map((item: any) => ({
            materialId: item.materialId,
            quantity: parseFloat(item.quantity),
            unitPrice: parseFloat(item.unitPrice),
            totalPrice: parseFloat(item.quantity) * parseFloat(item.unitPrice),
          })),
        },
      },
      include: {
        supplier: true,
        items: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create purchase order' }, { status: 500 });
  }
}
