import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ data: products });
}

export async function POST(req: Request) {
  const body = await req.json();
  const product = await prisma.product.create({
    data: { code: body.code, name: body.name, categoryId: body.categoryId, unit: body.unit ?? 'ชิ้น', standardCost: body.standardCost ?? 0, sellingPrice: body.sellingPrice ?? 0 },
  });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'Product', entityId: product.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: product }, { status: 201 });
}
