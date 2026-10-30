import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.qualityInspection.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const q = await prisma.qualityInspection.create({ data: { inspectionType: body.inspectionType, status: body.status ?? 'pending', workOrderId: body.workOrderId, materialLotId: body.materialLotId, inspectedBy: body.inspectedBy, notes: body.notes } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'QualityInspection', entityId: q.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: q }, { status: 201 });
}
