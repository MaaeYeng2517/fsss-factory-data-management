import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const entries = await db.journalEntry.findMany({
      include: { lines: { include: { debitAccount: true, creditAccount: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(entries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch journal entries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const count = await db.journalEntry.count();
    const jeNumber = `JE-${String(count + 1).padStart(6, '0')}`;
    
    const totalDebit = body.lines?.reduce((sum: number, l: any) => sum + (parseFloat(l.debitAmount) || 0), 0) || 0;
    const totalCredit = body.lines?.reduce((sum: number, l: any) => sum + (parseFloat(l.creditAmount) || 0), 0) || 0;
    
    const entry = await db.journalEntry.create({
      data: {
        jeNumber,
        entryDate: body.entryDate,
        entryType: body.entryType || 'GENERAL',
        referenceType: body.referenceType,
        referenceId: body.referenceId,
        description: body.description,
        status: body.status || 'draft',
        totalDebit,
        totalCredit,
        lines: {
          create: body.lines?.map((line: any) => ({
            debitAccountId: line.debitAccountId || null,
            creditAccountId: line.creditAccountId || null,
            debitAmount: parseFloat(line.debitAmount) || 0,
            creditAmount: parseFloat(line.creditAmount) || 0,
            description: line.description,
            reference: line.reference,
          })) || [],
        },
      },
      include: { lines: true },
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create journal entry' }, { status: 500 });
  }
}
