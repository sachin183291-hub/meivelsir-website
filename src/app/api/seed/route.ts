import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockProjects } from "@/data/mockData";
import { mockPatents } from "@/data/patentsData";
import { fundingProposals } from "@/data/fundingData";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Seed Projects
    for (const project of mockProjects) {
      await prisma.project.upsert({
        where: { id: project.id },
        update: {
          ...project,
          createdAt: undefined,
          updatedAt: undefined,
        },
        create: project,
      });
    }

    // Seed Patents
    for (const patent of mockPatents) {
      await prisma.patent.upsert({
        where: { id: patent.id },
        update: {
          ...patent,
          createdAt: undefined,
          updatedAt: undefined,
        },
        create: patent,
      });
    }

    // Seed Funding Proposals
    for (const proposal of fundingProposals) {
      const p = {
        ...proposal,
        confirmed: String(proposal.confirmed ?? ""),
        fundedGranted: String(proposal.fundedGranted ?? ""),
      };
      
      await prisma.fundingProposal.upsert({
        where: { id: p.id },
        update: p,
        create: p,
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Seeded successfully to PostgreSQL!",
      counts: {
        projects: mockProjects.length,
        patents: mockPatents.length,
        fundingProposals: fundingProposals.length
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
