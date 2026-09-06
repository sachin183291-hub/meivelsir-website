import { NextResponse } from "next/server";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { mockProjects } from "@/data/mockData";
import { mockPatents } from "@/data/patentsData";
import { fundingProposals } from "@/data/fundingData";

export async function GET() {
  try {
    const db = getFirestore(app);

    // Seed Projects
    for (const project of mockProjects) {
      await setDoc(doc(db, "projects", project.id), project);
    }

    // Seed Patents
    for (const patent of mockPatents) {
      await setDoc(doc(db, "patents", patent.id), patent);
    }

    // Seed Funding Proposals
    for (const proposal of fundingProposals) {
      await setDoc(doc(db, "funding_proposals", proposal.id), proposal);
    }

    return NextResponse.json({ 
      success: true, 
      message: "Seeded successfully!",
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
