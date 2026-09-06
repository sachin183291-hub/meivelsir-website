"use client";

import { useState } from "react";

export default function SeedPage() {
  const [status, setStatus] = useState<string>("Ready to seed");

  const handleSeed = async () => {
    setStatus("Seeding PostgreSQL...");
    try {
      const res = await fetch("/api/seed");
      const data = await res.json();
      if (res.ok) {
        setStatus(`Seeding Complete! ${data.message} (${data.counts.projects} projects, ${data.counts.patents} patents, ${data.counts.fundingProposals} funding proposals)`);
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error seeding", err);
      setStatus("Error during seeding");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <h1 className="text-3xl font-bold text-foreground mb-8">Database Seeder</h1>
      <button 
        onClick={handleSeed}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold mb-4 hover:bg-primary/90 transition-colors shadow-lg"
      >
        Upload Old Data to PostgreSQL
      </button>
      <p className="text-foreground/70">{status}</p>
    </div>
  );
}
