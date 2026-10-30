import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.supplier.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const s = await prisma.supplier.create({ data: { code: body.code, name: body.name, phone: body.phone, email: body.email, address: body.address, taxId: body.taxId } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'Supplier', entityId: s.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: s }, { status: 201 });
}
