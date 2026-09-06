"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ExternalLink, ShieldCheck, Plus, Pencil, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import AddContentModal from "@/components/modals/AddContentModal";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";
import { Patent } from "@/types";
import { mockPatents } from "@/data/patentsData";
import { getCollectionData, addDocument, updateDocument, deleteDocument } from "@/lib/firestore";

interface PatentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patent: Patent | null;
  onEdit: () => void;
}

function PatentDetailsModal({ isOpen, onClose, patent, onEdit }: PatentDetailsModalProps) {
  if (!isOpen || !patent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0 bg-accent/30">
          <h2 className="text-2xl font-bold text-foreground font-serif">Patent Details</h2>
          <button onClick={onClose} className="p-2 rounded-full bg-background flex items-center justify-center hover:bg-muted/80 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 rounded-xl inline-block ring-1 ring-primary/20">
              <Lightbulb className="w-6 h-6 text-primary" />
            </div>
            <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border ${
              patent.status === 'Granted' 
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            }`}>
              {patent.status}
            </span>
          </div>

          <h3 className="text-3xl font-bold text-foreground leading-tight">{patent.title}</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-border/50">
            <div>
              <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1 block">Patent No</span>
              <p className="font-semibold text-foreground">{patent.patentNumber}</p>
            </div>
            <div>
              <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1 block">Country</span>
              <p className="font-semibold text-foreground">{patent.country}</p>
            </div>
            <div>
              <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1 block">Date</span>
              <p className="font-semibold text-foreground">{patent.grantDate || patent.filingDate}</p>
            </div>
            <div>
              <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-1 block">Technology Area</span>
              <p className="font-semibold text-foreground">{patent.technologyArea || "N/A"}</p>
            </div>
          </div>

          <div>
            <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-2 block">Inventors</span>
            <div className="flex flex-wrap gap-2">
              {patent.inventors.map((inv, idx) => (
                <span key={idx} className="bg-accent text-foreground px-3 py-1 rounded-md text-sm font-medium border border-border">
                  {inv}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-foreground/50 text-xs uppercase tracking-wider font-bold mb-2 block">Description</span>
            <p className="text-foreground/80 leading-relaxed">
              {patent.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 p-6 border-t border-border shrink-0 bg-accent/30">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold bg-background border border-border text-foreground hover:bg-muted transition-colors">
            Close
          </button>
          <button 
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Pencil className="w-4 h-4" /> Edit Patent
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function PatentsPage() {
  const { isAdmin } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  const [patents, setPatents] = useState<Patent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPatent, setEditingPatent] = useState<Patent | null>(null);
  const [viewingPatent, setViewingPatent] = useState<Patent | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchPatents = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("timeout")), 5000)
        );
        const data = await Promise.race([
          getCollectionData("patents"),
          timeoutPromise
        ]) as Patent[];
        
        if (isMounted) {
          // If Firebase returned empty, fall back to static data
          setPatents(data.length > 0 ? data : mockPatents);
          setLoading(false);
        }
      } catch (err: any) {
        // Firebase not ready - use static data as fallback
        if (isMounted) {
          setPatents(mockPatents);
          setLoading(false);
        }
      }
    };
    fetchPatents();
    return () => { isMounted = false; };
  }, []);

  const handleAddClick = () => {
    if (isAdmin) {
      setEditingPatent(null);
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleEditClick = (patent: Patent) => {
    if (isAdmin) {
      setEditingPatent(patent);
      setIsAddModalOpen(true);
    } else {
      setEditingPatent(patent);
      setIsPasswordModalOpen(true);
    }
  };

  const handleSave = async (data: any) => {
    // Try Firebase, fall back to local state
    const id = data.id || editingPatent?.id;
    const tempId = id || Date.now().toString();
    const newData = { ...data, id: tempId };
    try {
      if (id) {
        await updateDocument("patents", id, data);
        setPatents(prev => prev.map(p => p.id === id ? newData as Patent : p));
      } else {
        const added = await addDocument("patents", data);
        setPatents(prev => [added as Patent, ...prev]);
      }
    } catch {
      // Firebase not ready - save locally for this session
      if (id) {
        setPatents(prev => prev.map(p => p.id === id ? newData as Patent : p));
      } else {
        setPatents(prev => [newData as Patent, ...prev]);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-16"
      >
        <div className="text-center space-y-6 mb-16 relative">
          <div className="flex justify-center sm:justify-end mb-4 sm:mb-0 sm:absolute sm:right-0 sm:top-0">
            <button 
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Patent
            </button>
          </div>
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

                <button 
                  onClick={() => setViewingPatent(patent)}
                  className="mt-4 flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/20">
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

      <AnimatePresence>
        {viewingPatent && (
          <PatentDetailsModal
            isOpen={!!viewingPatent}
            onClose={() => setViewingPatent(null)}
            patent={viewingPatent}
            onEdit={() => handleEditClick(viewingPatent)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
