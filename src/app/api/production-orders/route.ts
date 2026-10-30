import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.productionOrder.findMany({ include: { billOfMaterials: { include: { material: true } }, materialIssues: true, productionReceipts: true }, orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const po = await prisma.productionOrder.create({ data: { moNumber: body.moNumber, productName: body.productName, quantity: body.quantity, startDate: body.startDate, dueDate: body.dueDate, status: 'pending', requestedBy: body.requestedBy, notes: body.notes } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'ProductionOrder', entityId: po.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: po }, { status: 201 });
}
