import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const docs = await db.employeeDocument.findMany({
      include: { employee: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(docs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch employee documents' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const doc = await db.employeeDocument.create({
      data: {
        employeeId: body.employeeId,
        docType: body.docType,
        docName: body.docName,
        filePath: body.filePath,
        fileUrl: body.fileUrl,
        issueDate: body.issueDate,
        expiryDate: body.expiryDate,
        notes: body.notes,
        uploadedBy: body.uploadedBy,
      },
      include: { employee: true },
    });
    return NextResponse.json(doc, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create employee document' }, { status: 500 });
  }
}
