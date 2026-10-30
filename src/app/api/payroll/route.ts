import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get('employeeId');
  const payroll = await db.payroll.findMany({
    where: employeeId ? { employeeId } : {},
    include: { employee: true },
    orderBy: { generatedAt: 'desc' },
  });
  return NextResponse.json(payroll);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const emp = await db.employee.findUnique({ where: { id: body.employeeId } });
    if (!emp) return NextResponse.json({ error: 'Employee not found' }, { status: 404 });

    const periodStart = body.periodStart;
    const periodEnd = body.periodEnd;
    const rate = emp.hourlyRate || body.hourlyRate || 0;

    const records = await db.attendance.findMany({
      where: {
        employeeId: emp.id,
        date: { gte: periodStart, lte: periodEnd },
        hoursWorked: { gt: 0 },
      },
    });
    const totalHours = Math.round(records.reduce((sum, r) => sum + (r.hoursWorked || 0), 0) * 100) / 100;
    const overtimeHours = body.overtimeHours || 0;
    const deductions = body.deductions || 0;
    const bonuses = body.bonuses || 0;

    const basePay = Math.max(0, totalHours - overtimeHours) * rate;
    const overtimePay = overtimeHours * rate * 1.5;
    const netPay = basePay + overtimePay + bonuses - deductions;

    const payroll = await db.payroll.create({
      data: {
        employeeId: emp.id,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        totalHours,
        overtimeHours,
        hourlyRate: rate,
        basePay: Math.round(basePay * 100) / 100,
        overtimePay: Math.round(overtimePay * 100) / 100,
        deductions,
        bonuses,
        netPay: Math.round(netPay * 100) / 100,
        status: 'draft',
      },
      include: { employee: true },
    });
    return NextResponse.json(payroll, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}