import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.internalAudit.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const a = await prisma.internalAudit.create({ data: { title: body.title, scope: body.scope, status: body.status ?? 'planned', auditor: body.auditor, findings: body.findings } });
  await prisma.auditLog.create({ data: { action: 'CREATE', entity: 'InternalAudit', entityId: a.id, newValues: JSON.stringify(body) } });
  return NextResponse.json({ data: a }, { status: 201 });
}
