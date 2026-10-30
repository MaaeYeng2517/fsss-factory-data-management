import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.maintenanceRequest.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const m = await prisma.maintenanceRequest.create({ data: { machine: body.machine, issue: body.issue, status: body.status ?? 'open', requestedBy: body.requestedBy } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'MaintenanceRequest', entityId: m.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: m }, { status: 201 });
}
