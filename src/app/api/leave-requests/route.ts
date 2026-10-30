import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const leaves = await db.leaveRequest.findMany({
      include: { employee: true, leaveType: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(leaves);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leave requests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const count = await db.leaveRequest.count();
    const requestNo = `LR-${String(count + 1).padStart(6, '0')}`;
    
    const leave = await db.leaveRequest.create({
      data: {
        requestNo,
        employeeId: body.employeeId,
        leaveTypeId: body.leaveTypeId,
        startDate: body.startDate,
        endDate: body.endDate,
        totalDays: parseFloat(body.totalDays) || 0,
        reason: body.reason,
        attachment: body.attachment,
        status: 'pending',
      },
      include: { employee: true, leaveType: true },
    });
    return NextResponse.json(leave, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create leave request' }, { status: 500 });
  }
}
