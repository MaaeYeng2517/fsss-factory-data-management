import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const counts = await prisma.stockCount.findMany({
      include: {
        warehouse: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(counts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch stock counts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const scNumber = `SC-${Date.now()}`;

    const count = await prisma.stockCount.create({
      data: {
        scNumber,
        warehouseId: body.warehouseId,
        countDate: body.countDate,
        status: 'draft',
        countedBy: body.countedBy || null,
        notes: body.notes || null,
        items: {
          create: body.items.map((item: any) => ({
            materialCode: item.materialCode,
            materialName: item.materialName,
            systemQuantity: parseFloat(item.systemQuantity) || 0,
            countedQuantity: parseFloat(item.countedQuantity) || 0,
            difference: (parseFloat(item.countedQuantity) || 0) - (parseFloat(item.systemQuantity) || 0),
          })),
        },
      },
      include: {
        warehouse: true,
        items: true,
      },
    });
    return NextResponse.json(count);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create stock count' }, { status: 500 });
  }
}
