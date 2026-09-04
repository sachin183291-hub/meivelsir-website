"use client";

import { motion } from "framer-motion";
import { Lightbulb, ExternalLink, ShieldCheck, Plus, Pencil } from "lucide-react";
import { mockPatents } from "@/data/patentsData";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import AddContentModal from "@/components/modals/AddContentModal";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";
import { Patent } from "@/types";

export default function PatentsPage() {
  const { isAdmin } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  const [patents, setPatents] = useState<Patent[]>(mockPatents);
  const [editingPatent, setEditingPatent] = useState<Patent | null>(null);

  const handleAddClick = () => {
    if (isAdmin) {
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleEditClick = (patent: Patent) => {
    setEditingPatent(patent);
    if (isAdmin) {
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen relative">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Patent
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-16"
      >
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground font-serif">Patents & Inventions</h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {patents.map((patent, index) => (
            <motion.div 
              key={patent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="academic-card p-8 relative overflow-hidden flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-300 rounded-2xl border border-border/50 bg-card hover:shadow-2xl shadow-sm hover:border-primary/30"
            >
              {/* Decorative background element */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Edit Button */}
              <button 
                onClick={(e) => { e.stopPropagation(); handleEditClick(patent); }}
                className="absolute top-4 right-4 z-20 p-2 bg-background/80 backdrop-blur border border-border text-foreground/60 hover:text-primary hover:border-primary/50 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                title="Edit Patent"
              >
                <Pencil className="w-4 h-4" />
              </button>
              
              <div className="relative z-10 w-full flex flex-col items-center space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl inline-block ring-1 ring-primary/20 shadow-inner group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Lightbulb className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${
                    patent.status === 'Granted' 
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                  }`}>
                    {patent.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">{patent.title}</h3>
                
                <div className="grid grid-cols-1 gap-y-3 text-sm w-full bg-accent/30 rounded-xl p-5 border border-border/50">
                  <div className="flex flex-col items-center mb-2">
                    <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Inventors</span>
                    <p className="font-medium text-foreground">{patent.inventors.join(", ")}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 justify-center items-center">
                    <div className="flex flex-col items-center">
                      <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Patent No</span>
                      <p className="font-medium text-foreground">{patent.patentNumber}</p>
                    </div>
                    <div className="w-px h-8 bg-border/50 hidden sm:block"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Country</span>
                      <p className="font-medium text-foreground">{patent.country}</p>
                    </div>
                    <div className="w-px h-8 bg-border/50 hidden sm:block"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1">Date</span>
                      <p className="font-medium text-foreground">{patent.grantDate || patent.filingDate}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-foreground/70 italic line-clamp-3 leading-relaxed max-w-[95%]">
                  "{patent.description}"
                </p>

                <button className="mt-4 flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20">
                   View Patent Details <ExternalLink className="w-4 h-4 ml-2" /> 
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AddContentModal 
        isOpen={isAddModalOpen} 
        onClose={() => { setIsAddModalOpen(false); setEditingPatent(null); }} 
        title={editingPatent ? "Edit Patent" : "Add New Patent"}
        type="patent"
        initialData={editingPatent}
        onSave={(data) => {
          if (editingPatent) {
            setPatents(patents.map(p => p.id === editingPatent.id ? { ...data, id: p.id } : p));
          } else {
            setPatents([{ ...data, id: Date.now().toString() }, ...patents]);
          }
          setIsAddModalOpen(false);
          setEditingPatent(null);
        }}
      />

      <PasswordPromptModal
        isOpen={isPasswordModalOpen}
        onClose={() => { setIsPasswordModalOpen(false); setEditingPatent(null); }}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsAddModalOpen(true);
        }}
      />
    </div>
  );
}
