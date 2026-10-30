import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const payments = await db.payment.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const count = await db.payment.count();
    const paymentNumber = `${body.paymentType === 'receive' ? 'RCV' : 'PAY'}-${String(count + 1).padStart(6, '0')}`;
    
    const payment = await db.payment.create({
      data: {
        paymentNumber,
        paymentDate: body.paymentDate,
        paymentType: body.paymentType,
        partyType: body.partyType,
        partyId: body.partyId,
        partyName: body.partyName,
        amount: parseFloat(body.amount) || 0,
        paymentMethod: body.paymentMethod || 'cash',
        bankAccountId: body.bankAccountId || null,
        referenceNo: body.referenceNo,
        referenceType: body.referenceType,
        referenceId: body.referenceId,
        receivedBy: body.receivedBy,
        paidBy: body.paidBy,
        notes: body.notes,
        status: body.status || 'posted',
      },
    });
    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
  }
}
