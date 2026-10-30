import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() {
  const [materials, products, pos, grs, mos, qis] = await Promise.all([
    prisma.material.count(),
    prisma.product.count(),
    prisma.purchaseOrder.count(),
    prisma.goodsReceipt.count(),
    prisma.productionOrder.count(),
    prisma.qualityInspection.count(),
  ]);
  return NextResponse.json({ data: { materials, products, purchaseOrders: pos, goodsReceipts: grs, productionOrders: mos, qualityInspections: qis } });
}
