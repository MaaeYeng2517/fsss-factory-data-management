import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const invoices = await db.salesInvoice.findMany({
      include: { customer: true, items: true, salesOrder: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sales invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, ...data } = body;
    
    const count = await db.salesInvoice.count();
    const invNumber = `INV-${String(count + 1).padStart(6, '0')}`;
    
    const totalAmount = parseFloat(data.totalAmount) || 0;
    
    const invoice = await db.salesInvoice.create({
      data: {
        invNumber,
        salesOrderId: data.salesOrderId || null,
        deliveryNoteId: data.deliveryNoteId || null,
        customerId: data.customerId,
        invoiceDate: data.invoiceDate,
        dueDate: data.dueDate,
        status: data.status || 'unpaid',
        currency: data.currency || 'THB',
        exchangeRate: parseFloat(data.exchangeRate) || 1,
        subtotal: parseFloat(data.subtotal) || 0,
        discountAmount: parseFloat(data.discountAmount) || 0,
        vatRate: parseFloat(data.vatRate) || 7,
        vatAmount: parseFloat(data.vatAmount) || 0,
        totalAmount,
        paidAmount: 0,
        balanceAmount: totalAmount,
        taxInvoiceNo: data.taxInvoiceNo,
        notes: data.notes,
        preparedBy: data.preparedBy,
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

    // Create AR
    const arCount = await db.accountsReceivable.count();
    await db.accountsReceivable.create({
      data: {
        arNumber: `AR-${String(arCount + 1).padStart(6, '0')}`,
        customerId: data.customerId,
        salesInvoiceId: invoice.id,
        invoiceDate: data.invoiceDate,
        dueDate: data.dueDate,
        amount: totalAmount,
        paidAmount: 0,
        balanceAmount: totalAmount,
        status: 'open',
        currency: data.currency || 'THB',
      },
    });

    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sales invoice' }, { status: 500 });
  }
}
