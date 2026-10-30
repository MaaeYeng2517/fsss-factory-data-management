import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      where: { active: true },
      include: {
        category: true,
        inventoryBalances: {
          include: {
            warehouse: true,
            storageLocation: true,
            materialLot: true,
          },
        },
      },
    });

    const totalMaterials = materials.length;

    let lowStock = 0;
    let totalValue = 0;

    materials.forEach((material) => {
      const totalStock = material.inventoryBalances.reduce(
        (sum: number, b: any) => sum + (b.availableQuantity || b.quantity || 0),
        0
      );
      const minStock = material.reorderPoint || material.minStock || 0;
      
      if (minStock > 0 && totalStock <= minStock) {
        lowStock++;
      }

      totalValue += totalStock * material.standardPrice;
    });

    return NextResponse.json({
      totalMaterials,
      lowStock,
      totalValue,
      materials,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
