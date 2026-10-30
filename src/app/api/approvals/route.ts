import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.approval.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const a = await prisma.approval.create({ data: { entityType: body.entityType, entityId: body.entityId, status: 'pending', requestedBy: body.requestedBy, notes: body.notes } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'Approval', entityId: a.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: a }, { status: 201 });
}
export async function PUT(req: Request) {
  const body = await req.json();
  const a = await prisma.approval.update({ where: { id: body.id }, data: { status: body.status, approvedBy: body.approvedBy, approvedAt: body.status === 'approved' ? new Date() : null, notes: body.notes } });
  await prisma.auditLog.create({ data: { action: 'UPDATE', entity: 'Approval', entityId: a.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: a });
}
