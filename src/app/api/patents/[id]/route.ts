import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const {
      title = "",
      inventors = "",
      patentNumber = "",
      applicationNumber = "",
      filingDate = "",
      grantDate = null,
      country = "",
      status = "Filed",
      technologyArea = "",
      description = "",
      link = null
    } = data;
    
    const patent = await prisma.patent.update({
      where: { id },
      data: { title, inventors, patentNumber, applicationNumber, filingDate, grantDate, country, status, technologyArea, description, link },
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
