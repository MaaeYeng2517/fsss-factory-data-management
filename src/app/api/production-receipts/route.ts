import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const receipts = await db.productionReceipt.findMany({
      include: { productionOrder: true, warehouse: true, items: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(receipts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch production receipts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const count = await db.productionReceipt.count();
    const prNumber = `PR-${String(count + 1).padStart(6, '0')}`;
    
    const receipt = await db.productionReceipt.create({
      data: {
        prNumber,
        productionOrderId: body.productionOrderId || null,
        warehouseId: body.warehouseId,
        receiptDate: body.receiptDate,
        receivedBy: body.receivedBy,
        inspectedBy: body.inspectedBy,
        status: body.status || 'pending',
        notes: body.notes,
        items: {
          create: body.items?.map((item: any) => ({
            productId: item.productId,
            quantity: parseFloat(item.quantity),
            lotNumber: item.lotNumber,
            manufactureDate: item.manufactureDate,
            expiryDate: item.expiryDate,
            notes: item.notes,
          })) || [],
        },
      },
      include: { items: true },
    });
    return NextResponse.json(receipt, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create production receipt' }, { status: 500 });
  }
}
