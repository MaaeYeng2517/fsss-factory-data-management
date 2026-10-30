import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const orders = await db.salesOrder.findMany({
      include: { customer: true, items: true, quotation: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sales orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, ...data } = body;
    
    const count = await db.salesOrder.count();
    const soNumber = `SO-${String(count + 1).padStart(6, '0')}`;
    
    const order = await db.salesOrder.create({
      data: {
        soNumber,
        quotationId: data.quotationId || null,
        customerId: data.customerId,
        orderDate: data.orderDate,
        deliveryDate: data.deliveryDate,
        status: data.status || 'pending',
        currency: data.currency || 'THB',
        exchangeRate: parseFloat(data.exchangeRate) || 1,
        subtotal: parseFloat(data.subtotal) || 0,
        discountAmount: parseFloat(data.discountAmount) || 0,
        vatAmount: parseFloat(data.vatAmount) || 0,
        totalAmount: parseFloat(data.totalAmount) || 0,
        deliveryAddress: data.deliveryAddress,
        deliveryTerm: data.deliveryTerm,
        paymentTerm: data.paymentTerm,
        notes: data.notes,
        requestedBy: data.requestedBy,
        items: {
          create: items?.map((item: any) => ({
            productId: item.productId || null,
            productCode: item.productCode,
            productName: item.productName,
            quantity: parseFloat(item.quantity),
            unit: item.unit || 'ชิ้น',
            unitPrice: parseFloat(item.unitPrice),
            discount: parseFloat(item.discount) || 0,
            totalPrice: parseFloat(item.totalPrice),
          })) || [],
        },
      },
      include: { items: true, customer: true },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sales order' }, { status: 500 });
  }
}
