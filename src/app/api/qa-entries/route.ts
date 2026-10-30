import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function GET() { return NextResponse.json({ data: await prisma.qaEntry.findMany({ orderBy: { createdAt: 'desc' } }) }); }
export async function POST(req: Request) {
  const body = await req.json();
  const q = await prisma.qaEntry.create({ data: { questionId: body.question_id, answerId: body.answer_id, answer: body.answer, sources: body.sources, status: body.verification?.status ?? 'verified' } });
  return NextResponse.json({ data: q }, { status: 201 });
}
export async function PUT(req: Request) {
  const body = await req.json();
  const q = await prisma.qaEntry.update({ where: { id: body.id }, data: { answer: body.answer, status: body.status } });
  return NextResponse.json({ data: q });
}
export async function DELETE(req: Request) {
  const body = await req.json();
  await prisma.qaEntry.delete({ where: { id: body.id } });
  return NextResponse.json({ ok: true });
}
