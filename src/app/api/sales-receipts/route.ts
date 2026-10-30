import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const receipts = await db.salesReceipt.findMany({
      include: { customer: true, items: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(receipts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sales receipts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const count = await db.salesReceipt.count();
    const receiptNumber = `SR-${String(count + 1).padStart(6, '0')}`;
    
    const receipt = await db.salesReceipt.create({
      data: {
        receiptNumber,
        customerId: body.customerId,
        receiptDate: body.receiptDate,
        paymentMethod: body.paymentMethod || 'cash',
        bankAccountId: body.bankAccountId || null,
        referenceNo: body.referenceNo,
        totalAmount: parseFloat(body.totalAmount) || 0,
        receivedBy: body.receivedBy,
        notes: body.notes,
        status: body.status || 'posted',
        items: {
          create: body.items?.map((item: any) => ({
            salesInvoiceId: item.salesInvoiceId,
            amountPaid: parseFloat(item.amountPaid),
          })) || [],
        },
      },
      include: { items: true, customer: true },
    });

    // Update invoice and AR
    for (const item of body.items || []) {
      const invoice = await db.salesInvoice.findUnique({ where: { id: item.salesInvoiceId } });
      if (invoice) {
        const paidAmount = invoice.paidAmount + parseFloat(item.amountPaid);
        const balanceAmount = invoice.totalAmount - paidAmount;
        await db.salesInvoice.update({
          where: { id: item.salesInvoiceId },
          data: {
            paidAmount,
            balanceAmount,
            status: balanceAmount <= 0 ? 'paid' : paidAmount > 0 ? 'partial' : 'unpaid',
          },
        });
        await db.accountsReceivable.updateMany({
          where: { salesInvoiceId: item.salesInvoiceId },
          data: {
            paidAmount,
            balanceAmount,
            status: balanceAmount <= 0 ? 'closed' : paidAmount > 0 ? 'partial' : 'open',
          },
        });
      }
    }

    return NextResponse.json(receipt, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sales receipt' }, { status: 500 });
  }
}
