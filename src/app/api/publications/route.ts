export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const publications = await prisma.publication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(publications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
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
    
    const publication = await prisma.publication.create({
      data: { 
        title, authors, journalOrConference, year: Number(year), type, doi, publisher, 
        volume, issue, pages, citations: Number(citations), impactFactor: impactFactor ? Number(impactFactor) : null, abstract, pdfUrl, link 
      }
    });
    return NextResponse.json(publication, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create publication" }, { status: 500 });
  }
}
