import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.productCategory.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const c = await prisma.productCategory.create({ data: { code: body.code, name: body.name, description: body.description } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'ProductCategory', entityId: c.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: c }, { status: 201 });
}
