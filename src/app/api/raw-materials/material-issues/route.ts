import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const issues = await prisma.materialIssue.findMany({
      include: {
        warehouse: true,
        productionOrder: true,
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(issues);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch material issues' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const miNumber = `MI-${Date.now()}`;

    const issue = await prisma.materialIssue.create({
      data: {
        miNumber,
        productionOrderId: body.productionOrderId || null,
        warehouseId: body.warehouseId,
        issueDate: body.issueDate,
        requestedBy: body.requestedBy || null,
        issuedBy: body.issuedBy || null,
        status: 'pending',
        notes: body.notes || null,
        items: {
          create: body.items.map((item: any) => ({
            materialId: item.materialId,
            quantity: parseFloat(item.quantity),
          })),
        },
      },
      include: {
        warehouse: true,
        items: true,
      },
    });
    return NextResponse.json(issue);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create material issue' }, { status: 500 });
  }
}
