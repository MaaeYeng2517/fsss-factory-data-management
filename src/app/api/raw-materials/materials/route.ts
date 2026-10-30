import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      include: {
        category: true,
        inventoryBalances: true,
      },
      orderBy: { code: 'asc' },
    });
    return NextResponse.json(materials);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const material = await prisma.material.create({
      data: {
        code: body.code,
        name: body.name,
        unit: body.unit || 'กก.',
        standardPrice: parseFloat(body.standardPrice) || 0,
        minStock: parseFloat(body.minStock) || 0,
        maxStock: parseFloat(body.maxStock) || 0,
        reorderPoint: parseFloat(body.reorderPoint) || 0,
        description: body.description || null,
        specifications: body.specifications || null,
      },
    });
    return NextResponse.json(material);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 });
  }
}
