import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { id: _, createdAt, updatedAt, ...updateData } = data;
    
    const patent = await prisma.patent.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(patent);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update patent" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    await prisma.patent.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete patent" }, { status: 500 });
  }
}
