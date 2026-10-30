import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const accounts = await db.account.findMany({
      orderBy: { code: 'asc' },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const account = await db.account.create({
      data: {
        code: body.code,
        name: body.name,
        nameEn: body.nameEn,
        accountType: body.accountType,
        accountGroup: body.accountGroup,
        parentId: body.parentId || null,
        normalBalance: body.normalBalance || (body.accountType === 'ASSET' || body.accountType === 'EXPENSE' ? 'DEBIT' : 'CREDIT'),
        level: parseInt(body.level) || 1,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isSystem: body.isSystem || false,
        description: body.description,
      },
    });
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
