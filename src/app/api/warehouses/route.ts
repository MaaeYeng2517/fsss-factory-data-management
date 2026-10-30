import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.warehouse.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const w = await prisma.warehouse.create({ data: { code: body.code, name: body.name, location: body.location, description: body.description } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'Warehouse', entityId: w.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: w }, { status: 201 });
}
