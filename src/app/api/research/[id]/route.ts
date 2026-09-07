import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { title = "", description = "", icon = null } = data;
    
    const researchArea = await prisma.researchArea.update({
      where: { id },
      data: { title, description, icon },
    });
    return NextResponse.json(researchArea);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update research area" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    await prisma.researchArea.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete research area" }, { status: 500 });
  }
}
