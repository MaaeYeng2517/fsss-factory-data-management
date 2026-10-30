import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const c = await prisma.customer.create({ data: { code: body.code, name: body.name, phone: body.phone, email: body.email, address: body.address, taxId: body.taxId, creditLimit: body.creditLimit ?? 0 } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'Customer', entityId: c.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: c }, { status: 201 });
}
