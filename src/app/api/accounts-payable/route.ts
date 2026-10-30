import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const payables = await db.accountsPayable.findMany({
      include: { supplier: true, purchaseOrder: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(payables);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payables' }, { status: 500 });
  }
}
