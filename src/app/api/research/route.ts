export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const researchAreas = await prisma.researchArea.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(researchAreas);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch research areas" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title = "", description = "", icon = null } = data;
    
    const researchArea = await prisma.researchArea.create({
      data: { title, description, icon }
    });
    return NextResponse.json(researchArea, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create research area" }, { status: 500 });
  }
}
