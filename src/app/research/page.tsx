"use client";

import { motion } from "framer-motion";
import { Cpu, Brain, Wifi, Eye, Database, Shield, Radio, Activity, BookOpen, Quote, Plus } from "lucide-react";
import { profileData } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import AddContentModal from "@/components/modals/AddContentModal";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";

export default function ResearchPage() {
  const { isAdmin } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleAddClick = () => {
    if (isAdmin) {
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const domains = [
    { name: "Artificial Intelligence", icon: Brain, color: "text-blue-600", bg: "bg-blue-600/10", pubs: 45 },
    { name: "Internet of Things", icon: Wifi, color: "text-emerald-600", bg: "bg-emerald-600/10", pubs: 32 },
    { name: "Computer Vision", icon: Eye, color: "text-purple-600", bg: "bg-purple-600/10", pubs: 28 },
    { name: "Embedded Systems", icon: Cpu, color: "text-orange-600", bg: "bg-orange-600/10", pubs: 20 },
    { name: "Data Science", icon: Database, color: "text-indigo-600", bg: "bg-indigo-600/10", pubs: 18 },
    { name: "Cyber Security", icon: Shield, color: "text-red-600", bg: "bg-red-600/10", pubs: 12 },
    { name: "Robotics", icon: Activity, color: "text-pink-600", bg: "bg-pink-600/10", pubs: 10 },
    { name: "Wireless Comm.", icon: Radio, color: "text-cyan-600", bg: "bg-cyan-600/10", pubs: 15 },
  ];

  const rdWorkStats = [
    { label: "SCI Journals published", value: "7" },
    { label: "Scopus Journals published", value: "20" },
    { label: "Patents Granted & Published", value: "16 & 6" },
    { label: "Presented International Conferences", value: "24" },
    { label: "Funding Proposals Applied & Selected", value: "43 & 7" },
    { label: "Consultancy work Funded", value: "2" },
    { label: "Research projects completed", value: "6" },
    { label: "Makeathon Contest organised & participated", value: "3 & 2" },
    { label: "Workshop/Internship programs (Texas CoE)", value: "10" },
    { label: "FDP & IPR programs attended", value: "43" },
    { label: "FDP organized", value: "7" },
    { label: "Labs Established", value: "3" },
    { label: "MoU Organized (B&R Automation)", value: "1" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
      >
        {/* Header */}
        <div className="text-center space-y-4 relative">
          <div className="flex justify-center sm:justify-end mb-4 sm:mb-0 sm:absolute sm:right-0 sm:top-0">
            <button 
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Research Domain
            </button>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Research & Innovation</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded"></div>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/70 font-serif mt-6">
            Exploring the frontiers of technology to build intelligent, secure, and connected systems.
          </p>
        </div>

        {/* Research Impact Dashboard */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-foreground">Research Impact Dashboard</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="academic-card p-8 text-center space-y-3 border-t-4 border-t-primary">
              <BookOpen className="w-10 h-10 text-primary mx-auto mb-2 opacity-80" />
              <div className="text-5xl font-serif font-bold text-foreground">{profileData.stats.publications}</div>
              <div className="text-sm font-bold text-foreground/50 uppercase tracking-widest">Publications</div>
            </div>
            
            <div className="academic-card p-8 text-center space-y-3 border-t-4 border-t-secondary">
              <Quote className="w-10 h-10 text-secondary mx-auto mb-2 opacity-80" />
              <div className="text-5xl font-serif font-bold text-foreground">{profileData.stats.citations}</div>
              <div className="text-sm font-bold text-foreground/50 uppercase tracking-widest">Citations</div>
            </div>
            
            <div className="academic-card p-8 text-center space-y-3 border-t-4 border-t-primary">
              <Activity className="w-10 h-10 text-primary mx-auto mb-2 opacity-80" />
              <div className="text-5xl font-serif font-bold text-foreground">{profileData.stats.hIndex}</div>
              <div className="text-sm font-bold text-foreground/50 uppercase tracking-widest">h-index</div>
            </div>
            
            <div className="academic-card p-8 text-center space-y-3 border-t-4 border-t-secondary">
              <Activity className="w-10 h-10 text-secondary mx-auto mb-2 opacity-80" />
              <div className="text-5xl font-serif font-bold text-foreground">{profileData.stats.i10Index}</div>
              <div className="text-sm font-bold text-foreground/50 uppercase tracking-widest">i10-index</div>
            </div>
          </div>
        </section>

        {/* R&D Work Milestones */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-serif font-bold text-foreground">Completed R&D Tasks</h2>
            <div className="h-1 w-16 bg-primary mt-4 rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {rdWorkStats.map((stat, idx) => (
              <div 
                key={idx}
                className="academic-card p-6 flex flex-col justify-between border-l-4 hover:border-l-primary transition-all duration-300"
              >
                <p className="text-sm font-bold text-foreground/60 uppercase tracking-wide mb-4 leading-snug">
                  {stat.label}
                </p>
                <div className="text-3xl font-serif font-black text-foreground">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research Domains Grid */}
        <section>
          <div className="mb-10">
            <h2 className="text-3xl font-serif font-bold text-foreground">Research Domains</h2>
            <div className="h-1 w-16 bg-primary mt-4 rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="academic-card p-8 group hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className={`w-14 h-14 rounded flex items-center justify-center mb-6 ${domain.bg}`}>
                  <domain.icon className={`w-7 h-7 ${domain.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {domain.name}
                </h3>
                <p className="text-sm text-foreground/60 font-semibold uppercase tracking-wider mt-4">
                  {domain.pubs} Publications
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </motion.div>

      <AddContentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add Research Domain"
        type="research"
      />

      <PasswordPromptModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsAddModalOpen(true);
        }}
      />
    </div>
  );
}
