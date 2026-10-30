import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const quotations = await db.quotation.findMany({
      include: { customer: true, items: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(quotations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, ...data } = body;
    
    const count = await db.quotation.count();
    const qtNumber = `QT-${String(count + 1).padStart(6, '0')}`;
    
    const quotation = await db.quotation.create({
      data: {
        qtNumber,
        customerId: data.customerId,
        quoteDate: data.quoteDate,
        validUntil: data.validUntil,
        status: data.status || 'draft',
        currency: data.currency || 'THB',
        exchangeRate: parseFloat(data.exchangeRate) || 1,
        subtotal: parseFloat(data.subtotal) || 0,
        discountAmount: parseFloat(data.discountAmount) || 0,
        vatAmount: parseFloat(data.vatAmount) || 0,
        totalAmount: parseFloat(data.totalAmount) || 0,
        deliveryTerm: data.deliveryTerm,
        paymentTerm: data.paymentTerm,
        notes: data.notes,
        terms: data.terms,
        preparedBy: data.preparedBy,
        items: {
          create: items?.map((item: any) => ({
            productCode: item.productCode,
            productName: item.productName,
            description: item.description,
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
    return NextResponse.json(quotation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quotation' }, { status: 500 });
  }
}
