import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const notes = await db.deliveryNote.findMany({
      include: { customer: true, items: true, salesOrder: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch delivery notes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const count = await db.deliveryNote.count();
    const dnNumber = `DN-${String(count + 1).padStart(6, '0')}`;
    
    const note = await db.deliveryNote.create({
      data: {
        dnNumber,
        salesOrderId: body.salesOrderId || null,
        customerId: body.customerId,
        deliveryDate: body.deliveryDate,
        deliveryAddress: body.deliveryAddress,
        deliveredBy: body.deliveredBy,
        receivedBy: body.receivedBy,
        status: body.status || 'pending',
        notes: body.notes,
        items: {
          create: body.items?.map((item: any) => ({
            productId: item.productId || null,
            productCode: item.productCode,
            productName: item.productName,
            quantity: parseFloat(item.quantity),
            unit: item.unit || 'ชิ้น',
            lotNumber: item.lotNumber,
            notes: item.notes,
          })) || [],
        },
      },
      include: { items: true, customer: true },
    });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create delivery note' }, { status: 500 });
  }
}
