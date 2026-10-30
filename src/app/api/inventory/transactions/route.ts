import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.inventoryTransaction.findMany({ include: { material: true, materialLot: true }, orderBy: { createdAt: 'desc' }, take: 100 }) }); }
