import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireRole, writeAuditLog } from '@/lib/authz';

export async function GET() {
  const employees = await db.employee.findMany({
    orderBy: { employeeCode: 'asc' },
  });
  return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
  const { user, error } = await requireRole('admin', 'manager', 'HR');
  if (error) return error;
  try {
    const body = await req.json();
    const code = body.employeeCode || `EMP${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`;
    const employee = await db.employee.create({
      data: {
        employeeCode: code,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email || null,
        phone: body.phone || null,
        role: body.role || 'employee',
        department: body.department || null,
        hireDate: body.hireDate || new Date().toISOString().split('T')[0],
        active: body.active !== false,
        hourlyRate: body.hourlyRate ? Number(body.hourlyRate) : 0,
      },
    });
    await writeAuditLog('CREATE', 'Employee', employee.id, user.id, user.fullName, null, employee, req);
    return NextResponse.json(employee, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}