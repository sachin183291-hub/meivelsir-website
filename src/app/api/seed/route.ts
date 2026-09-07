import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mockProjects, mockResearchAreas, mockPublications } from "@/data/mockData";
import { mockPatents } from "@/data/patentsData";
import { fundingProposals } from "@/data/fundingData";
import { eventsData } from "@/data/eventsData";
import { sciJournals } from "@/data/publicationsData";
import { internationalConferences } from "@/data/conferencesData";

export const dynamic = 'force-dynamic';

const initialProducts = [
  {
    id: "prod-1",
    name: "MediVision AI",
    category: "Healthcare Diagnostic Tool",
    description: "An AI-powered diagnostic tool capable of identifying early-stage neurological disorders from MRI scans with 95% accuracy.",
    status: "Commercialized",
    year: 2024,
    tech: ["PyTorch", "React", "Python"],
  },
  {
    id: "prod-2",
    name: "SecureNode IoT",
    category: "Smart City Infrastructure",
    description: "A lightweight hardware-software solution for securing edge sensors in urban environments against cyber-attacks.",
    status: "Research Prototype",
    year: 2025,
    tech: ["C++", "Embedded Linux", "Cryptography"],
  }
];

export async function GET() {
  try {
    // Seed Projects
    for (const project of mockProjects) {
      await prisma.project.upsert({
        where: { id: project.id },
        update: { ...project, createdAt: undefined, updatedAt: undefined },
        create: project,
      });
    }

    // Seed Patents
    for (const patent of mockPatents) {
      await prisma.patent.upsert({
        where: { id: patent.id },
        update: { ...patent, createdAt: undefined, updatedAt: undefined },
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

    // Seed Events
    for (const event of eventsData) {
      await prisma.event.upsert({
        where: { id: event.id },
        update: { ...event, createdAt: undefined, updatedAt: undefined },
        create: event,
      });
    }

    // Seed Products
    for (const product of initialProducts) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: { ...product, createdAt: undefined, updatedAt: undefined },
        create: product,
      });
    }

    // Seed Publications
    const allPubs = [...sciJournals, ...mockPublications, ...internationalConferences];
    for (const pub of allPubs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pubData = { 
        ...pub, 
        abstract: pub.abstract || "",
        year: Number(pub.year) || new Date().getFullYear(),
        authors: pub.authors || [],
        createdAt: undefined, 
        updatedAt: undefined 
      } as any;
      
      // Remove fields not in Prisma schema for Publication
      delete pubData.description;
      
      await prisma.publication.upsert({
        where: { id: pub.id },
        update: pubData,
        create: pubData,
      });
    }

    // Seed Research Areas
    for (const area of mockResearchAreas) {
      await prisma.researchArea.upsert({
        where: { id: area.id },
        update: { ...area, createdAt: undefined, updatedAt: undefined },
        create: area,
      });
    }

    // Seed Organizations
    const defaultOrgs = [
      { id: "org-1", name: "Rootview Technologies", type: "Industry", country: "Coimbatore", description: "A prominent technology partner based in Coimbatore, focusing on innovative software solutions, research collaborations in AI/ML, and industry-academia joint projects.", website: null },
      { id: "org-2", name: "Sun Info Media", type: "Industry", country: "Coimbatore", description: "A media and information technology organization in Coimbatore, collaborating on digital transformation, IT solutions, and student internship programs.", website: null },
      { id: "org-3", name: "Synovers Technologies", type: "Industry", country: "Coimbatore", description: "An emerging technology company specializing in cutting-edge software development, product engineering, and collaborative research initiatives.", website: null },
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
        organizations: defaultOrgs.length,
        events: eventsData.length,
        products: initialProducts.length,
        publications: allPubs.length,
        researchAreas: mockResearchAreas.length
      }
    });
  } catch (error: unknown) {
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}
