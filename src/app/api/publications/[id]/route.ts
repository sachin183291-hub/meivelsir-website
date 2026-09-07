import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const { 
      title = "", 
      authors = [], 
      journalOrConference = "", 
      year = new Date().getFullYear(), 
      type = "Journal", 
      doi = null, 
      publisher = null, 
      volume = null, 
      issue = null, 
      pages = null, 
      citations = 0, 
      impactFactor = null, 
      abstract = data.description || "", // Fallback to description from generic modal
      pdfUrl = null, 
      link = null 
    } = data;
    
    const publication = await prisma.publication.update({
      where: { id },
      data: { 
        title, authors, journalOrConference, year: Number(year), type, doi, publisher, 
        volume, issue, pages, citations: Number(citations), impactFactor: impactFactor ? Number(impactFactor) : null, abstract, pdfUrl, link 
      },
    });
    return NextResponse.json(publication);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update publication" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    await prisma.publication.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
  }
}
