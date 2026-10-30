import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supplier = await prisma.supplier.create({
      data: {
        code: body.code || `SUP-${Date.now()}`,
        name: body.name,
        contactPerson: body.contactPerson || null,
        phone: body.phone || null,
        email: body.email || null,
        address: body.address || null,
      },
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
  }
}
