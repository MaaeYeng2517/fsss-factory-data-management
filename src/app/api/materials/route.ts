import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const materials = await prisma.material.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ data: materials });
}

export async function POST(req: Request) {
  const body = await req.json();
  const material = await prisma.material.create({
    data: { code: body.code, name: body.name, categoryId: body.categoryId, unit: body.unit ?? 'กก.', reorderPoint: body.reorderPoint ?? 0, standardPrice: body.standardPrice ?? 0 },
  });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'Material', entityId: material.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: material }, { status: 201 });
}
