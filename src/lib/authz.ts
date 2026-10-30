import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from './db';

export async function requireAuth() {
  const c = await cookies();
  const id = c.get('userId')?.value;
  if (!id) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  const user = await db.user.findUnique({ where: { id } });
  if (!user || !user.isActive) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  return { user };
}

export async function requireRole(...allowedRoles: string[]) {
  const c = await cookies();
  const id = c.get('userId')?.value;
  if (!id) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  const user = await db.user.findUnique({ where: { id } });
  if (!user || !user.isActive) return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  if (!allowedRoles.includes(user.role)) return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
  return { user };
}

export async function writeAuditLog(
  action: string,
  entity: string,
  entityId: string,
  userId: string | null,
  userName: string | null,
  oldValues?: unknown,
  newValues?: unknown,
  req?: Request
) {
  try {
    let ipAddress: string | undefined;
    let userAgent: string | undefined;
    if (req) {
      ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined;
      userAgent = req.headers.get('user-agent') || undefined;
    }
    await db.auditLog.create({
      data: {
        action,
        entity,
        entityId,
        userId,
        userName,
        oldValues: oldValues ? JSON.stringify(oldValues) : null,
        newValues: newValues ? JSON.stringify(newValues) : null,
        ipAddress,
        userAgent,
      },
    });
  } catch {
    // Silently fail audit logging
  }
}