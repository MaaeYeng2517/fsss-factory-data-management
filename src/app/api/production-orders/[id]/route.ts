import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const m = await prisma.productionOrder.findUnique({ where: { id: id } }); return m ? NextResponse.json({ data: m }) : NextResponse.json({ error: 'not found' }, { status: 404 }); }
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; const body = await req.json(); const m = await prisma.productionOrder.update({ where: { id: id }, data: { status: body.status, notes: body.notes } }); await prisma.auditLog.create({ data: { action: 'UPDATE', entity: 'ProductionOrder', entityId: m.id, newValues: JSON.stringify(body) } }); return NextResponse.json({ data: m }); }
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { const { id } = await params; await prisma.productionOrder.delete({ where: { id: id } }); await prisma.auditLog.create({ data: { action: 'DELETE', entity: 'ProductionOrder', entityId: id } }); return NextResponse.json({ ok: true }); }
