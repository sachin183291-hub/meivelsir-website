import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const patents = await prisma.patent.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(patents);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch patents" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const patent = await prisma.patent.create({
      data,
    });
    return NextResponse.json(patent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create patent" }, { status: 500 });
  }
}
