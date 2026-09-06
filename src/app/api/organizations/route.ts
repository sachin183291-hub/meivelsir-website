import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(orgs);
  } catch (error) {
    console.error("Failed to fetch organizations:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const org = await prisma.organization.create({
      data: {
        name: data.name,
        type: data.type,
        country: data.country || null,
        description: data.description || null,
        website: data.website || null,
      }
    });
    return NextResponse.json(org, { status: 201 });
  } catch (error) {
    console.error("Failed to create organization:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
