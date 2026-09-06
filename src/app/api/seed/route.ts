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

    // Seed Organizations
    const defaultOrgs = [
      { id: "org-1", name: "Rootview Technologies", type: "Industry", country: "India", description: "A prominent technology partner based in Coimbatore, focusing on innovative software solutions, research collaborations in AI/ML, and industry-academia joint projects.", website: null },
      { id: "org-2", name: "Sun Info Media", type: "Industry", country: "India", description: "A media and information technology organization in Coimbatore, collaborating on digital transformation, IT solutions, and student internship programs.", website: null },
      { id: "org-3", name: "Synovers Technologies", type: "Industry", country: "India", description: "An emerging technology company specializing in cutting-edge software development, product engineering, and collaborative research initiatives.", website: null },
    ];
    for (const org of defaultOrgs) {
      await prisma.organization.upsert({
        where: { id: org.id },
        update: { name: org.name, type: org.type, country: org.country, description: org.description },
        create: org,
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Seeded successfully to PostgreSQL!",
      counts: {
        projects: mockProjects.length,
        patents: mockPatents.length,
        fundingProposals: fundingProposals.length,
        organizations: defaultOrgs.length
      }
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
