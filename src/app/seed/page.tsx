"use client";

import { useState } from "react";
import { mockProjects } from "@/data/mockData";
import { mockPatents } from "@/data/patentsData";
import { fundingProposals } from "@/data/fundingData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SeedPage() {
  const [status, setStatus] = useState<string>("Ready to seed");

  const handleSeed = async () => {
    setStatus("Seeding Projects...");
    for (const project of mockProjects) {
      try {
        await setDoc(doc(db, "projects", project.id), project);
      } catch (err) {
        console.error("Error adding project", err);
      }
    }

    setStatus("Seeding Patents...");
    for (const patent of mockPatents) {
      try {
        await setDoc(doc(db, "patents", patent.id), patent);
      } catch (err) {
        console.error("Error adding patent", err);
      }
    }

    setStatus("Seeding Funding Proposals...");
    for (const proposal of fundingProposals) {
      try {
        await setDoc(doc(db, "funding_proposals", proposal.id), proposal);
      } catch (err) {
        console.error("Error adding proposal", err);
      }
    }

    setStatus("Seeding Complete! You can go back to the app.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <h1 className="text-3xl font-bold text-foreground mb-8">Database Seeder</h1>
      <button 
        onClick={handleSeed}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold mb-4 hover:bg-primary/90 transition-colors shadow-lg"
      >
        Upload Old Data to Firebase
      </button>
      <p className="text-foreground/70">{status}</p>
    </div>
  );
}
