import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const funding = await prisma.fundingProposal.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(funding);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch funding proposals" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const funding = await prisma.fundingProposal.create({
      data,
    });
    return NextResponse.json(funding, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create funding proposal" }, { status: 500 });
  }
}
