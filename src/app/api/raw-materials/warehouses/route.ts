import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const warehouses = await prisma.warehouse.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(warehouses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch warehouses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const warehouse = await prisma.warehouse.create({
      data: {
        code: body.code || `WH-${Date.now()}`,
        name: body.name,
        location: body.location || null,
        description: body.description || null,
      },
    });
    return NextResponse.json(warehouse);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create warehouse' }, { status: 500 });
  }
}
