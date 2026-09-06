import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { id: _, createdAt, updatedAt, ...updateData } = data;
    
    const funding = await prisma.fundingProposal.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(funding);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update funding proposal" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    await prisma.fundingProposal.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete funding proposal" }, { status: 500 });
  }
}
