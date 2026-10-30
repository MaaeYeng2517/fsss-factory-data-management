import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const types = await db.leaveType.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json(types);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leave types' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const type = await db.leaveType.create({
      data: {
        code: body.code,
        name: body.name,
        paidLeave: body.paidLeave !== undefined ? body.paidLeave : true,
        maxDays: body.maxDays ? parseInt(body.maxDays) : null,
        requireDoc: body.requireDoc || false,
        active: body.active !== undefined ? body.active : true,
        description: body.description,
      },
    });
    return NextResponse.json(type, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create leave type' }, { status: 500 });
  }
}
