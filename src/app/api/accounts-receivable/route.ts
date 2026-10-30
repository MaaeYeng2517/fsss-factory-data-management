import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const receivables = await db.accountsReceivable.findMany({
      include: { customer: true, salesInvoice: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(receivables);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch receivables' }, { status: 500 });
  }
}
