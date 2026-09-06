"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building, Plus, Pencil, Trash2, X, CheckCircle } from "lucide-react";
import { FundingProposal, Project } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";
import AddContentModal from "@/components/modals/AddContentModal";
import { getCollectionData, addDocument, updateDocument, deleteDocument } from "@/lib/firestore";
import { mockProjects } from "@/data/mockData";
import { fundingProposals as staticFundingProposals } from "@/data/fundingData";

interface FundingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FundingProposal) => void;
  initialData?: FundingProposal | null;
}

function FundingModal({ isOpen, onClose, onSave, initialData }: FundingModalProps) {
  const [form, setForm] = useState<Partial<FundingProposal>>(initialData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialData?.id || `fp-${Date.now()}`,
      organization: form.organization || "",
      investigator: form.investigator || "Dr. Meivel S AP/ECE",
      yearsApplied: form.yearsApplied || "",
      applied: form.applied ? Number(form.applied) : undefined,
      confirmed: form.confirmed ?? "-",
      fundedGranted: form.fundedGranted ?? "-",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-lg"
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">{initialData ? "Edit Funding Proposal" : "Add Funding Proposal"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Organization *</label>
            <input
              name="organization"
              value={form.organization || ""}
              onChange={handleChange}
              required
              placeholder="e.g. DRDO"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Principal Investigator</label>
            <input
              name="investigator"
              value={form.investigator || "Dr. Meivel S AP/ECE"}
              onChange={handleChange}
              placeholder="Dr. Meivel S AP/ECE"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Years Applied</label>
            <input
              name="yearsApplied"
              value={form.yearsApplied || ""}
              onChange={handleChange}
              placeholder="e.g. 2020, 2021, 2022"
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-foreground"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Applied</label>
              <input
                name="applied"
                type="number"
                value={form.applied ?? ""}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Confirmed</label>
              <input
                name="confirmed"
                value={String(form.confirmed ?? "")}
                onChange={handleChange}
                placeholder="- or number"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1">Funded</label>
              <input
                name="fundedGranted"
                value={String(form.fundedGranted ?? "")}
                onChange={handleChange}
                placeholder="- or number"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none text-foreground"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button type="button" onClick={onClose} className="px-6 py-2 rounded-xl font-semibold bg-accent text-foreground hover:bg-accent/80 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function ProjectsPage() {
  const { isAdmin } = useAuth();
  const [proposals, setProposals] = useState<FundingProposal[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProposal, setEditingProposal] = useState<FundingProposal | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const requireAuth = (action: () => void) => {
    if (isAdmin) {
      action();
    } else {
      setPendingAction(() => action);
      setIsPasswordModalOpen(true);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("timeout")), 5000)
        );
        
        const fetchPromise = Promise.all([
          getCollectionData("projects"),
          getCollectionData("funding_proposals")
        ]);

        const [fetchedProjects, fetchedProposals] = await Promise.race([fetchPromise, timeoutPromise]) as [Project[], FundingProposal[]];
        
        if (isMounted) {
          setProjects(fetchedProjects.length > 0 ? fetchedProjects : mockProjects);
          setProposals(fetchedProposals.length > 0 ? fetchedProposals : staticFundingProposals);
          setLoading(false);
        }
      } catch (err: any) {
        // Firebase not ready - fall back to static data
        if (isMounted) {
          setProjects(mockProjects);
          setProposals(staticFundingProposals);
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const handleAddFunding = () => {
    requireAuth(() => {
      setEditingProposal(null);
      setIsFundingModalOpen(true);
    });
  };

  const handleEditFunding = (proposal: FundingProposal) => {
    requireAuth(() => {
      setEditingProposal(proposal);
      setIsFundingModalOpen(true);
    });
  };

  const handleDeleteFunding = (id: string) => {
    requireAuth(async () => {
      try {
        if(confirm("Are you sure you want to delete this proposal?")) {
          await deleteDocument("funding_proposals", id);
          setProposals(prev => prev.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete proposal", error);
        alert("Failed to delete from database.");
      }
    });
  };

  const handleSaveFunding = async (data: FundingProposal) => {
    try {
      if (data.id) {
        await updateDocument("funding_proposals", data.id, data);
        setProposals(prev => prev.map(p => p.id === data.id ? { ...data } as FundingProposal : p));
      } else {
        const added = await addDocument("funding_proposals", data) as FundingProposal;
        setProposals(prev => [...prev, added]);
      }
    } catch (error: any) {
      console.error("Failed to save funding proposal:", error);
      alert("Save failed! Please check that Firebase Rules allow writes (set to: allow write: if true) and click Publish.");
    }
  };

  const handleAddProject = () => {
    requireAuth(() => {
      setEditingProject(null);
      setIsProjectModalOpen(true);
    });
  };

  const handleEditProject = (project: Project) => {
    requireAuth(() => {
      setEditingProject(project);
      setIsProjectModalOpen(true);
    });
  };

  const handleDeleteProject = (id: string) => {
    requireAuth(async () => {
      try {
        if(confirm("Are you sure you want to delete this project?")) {
          await deleteDocument("projects", id);
          setProjects(prev => prev.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error("Failed to delete project", error);
        alert("Failed to delete from database.");
      }
    });
  };

  const handleSaveProject = async (data: any) => {
    try {
      if (data.id) {
        await updateDocument("projects", data.id, data);
        setProjects(prev => prev.map(p => p.id === data.id ? { ...data } as Project : p));
      } else {
        const added = await addDocument("projects", data) as Project;
        setProjects(prev => [added, ...prev]);
      }
    } catch (error: any) {
      console.error("Failed to save project:", error);
      alert("Save failed! Please check that Firebase Rules allow writes (set to: allow write: if true) and click Publish.");
    }
  };

  // Totals
  const totalApplied = proposals.reduce((sum, p) => sum + (Number(p.applied) || 0), 0);
  const totalConfirmed = proposals.reduce((sum, p) => sum + (Number(p.confirmed) || 0), 0);
  const totalFunded = proposals.reduce((sum, p) => sum + (Number(p.fundedGranted) || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Funding &amp; Projects</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
          <p className="max-w-2xl mx-auto text-xl text-foreground/70 mt-4">
            An overview of applied funding proposals and completed research projects.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="academic-card p-6 text-center border-t-4 border-t-primary">
            <div className="text-4xl font-black text-foreground">{totalApplied}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground/50 mt-2">Total Applied</div>
          </div>
          <div className="academic-card p-6 text-center border-t-4 border-t-emerald-500">
            <div className="text-4xl font-black text-emerald-500">{totalConfirmed}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground/50 mt-2">Confirmed</div>
          </div>
          <div className="academic-card p-6 text-center border-t-4 border-t-blue-500">
            <div className="text-4xl font-black text-blue-500">{totalFunded}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground/50 mt-2">Funded / Granted</div>
          </div>
        </div>

        {/* Funding Proposals Table */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Building className="text-primary w-6 h-6" /> Funding Proposals Overview
            </h2>
            <button
              onClick={handleAddFunding}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
            >
              <Plus className="w-4 h-4" /> Add Proposal
            </button>
          </div>

          <div className="academic-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/5 border-b border-border">
                    <th className="p-4 font-bold text-xs uppercase tracking-wider text-foreground/60">Sl. No</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-wider text-foreground/60">Organizations</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-wider text-foreground/60 whitespace-nowrap">Years Applied</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-wider text-foreground/60 text-center">Applied</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-wider text-emerald-600 text-center">Confirmed</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-wider text-blue-600 text-center">Funded</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-wider text-foreground/60 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {proposals.map((proposal, index) => (
                    <tr key={proposal.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="p-4 font-semibold text-foreground/40 text-sm">{index + 1}</td>
                      <td className="p-4 font-semibold text-foreground max-w-xs">{proposal.organization}</td>
                      <td className="p-4 text-foreground/70 text-sm whitespace-nowrap">{proposal.yearsApplied}</td>
                      <td className="p-4 text-center font-bold text-foreground">{proposal.applied ?? "-"}</td>
                      <td className="p-4 text-center font-bold text-emerald-500">{String(proposal.confirmed)}</td>
                      <td className="p-4 text-center font-bold text-blue-500">{String(proposal.fundedGranted)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditFunding(proposal)}
                            className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteFunding(proposal.id)}
                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {/* Totals Row */}
                <tfoot>
                  <tr className="bg-primary/10 border-t-2 border-primary/30">
                    <td className="p-4 font-black text-foreground text-sm" colSpan={3}>TOTAL</td>
                    <td className="p-4 text-center font-black text-foreground text-lg">{totalApplied}</td>
                    <td className="p-4 text-center font-black text-emerald-500 text-lg">{totalConfirmed}</td>
                    <td className="p-4 text-center font-black text-blue-500 text-lg">{totalFunded}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>

        {/* Funded Projects Details */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Briefcase className="text-primary w-6 h-6" /> Funded Projects Details
            </h2>
            <button
              onClick={handleAddProject}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="academic-card p-6 md:p-8 flex flex-col md:flex-row gap-6 relative group"
              >
                {/* Edit Action */}
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditProject(project)}
                    className="p-2 bg-background border border-border text-foreground/60 hover:text-primary hover:border-primary/50 rounded-full shadow-sm transition-all"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>

                <div className="md:w-1/3 space-y-4 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-6 mt-4 md:mt-0">
                  <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                    project.status === 'Ongoing' ? 'bg-blue-500/10 text-blue-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {project.status}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                  <div className="flex items-center text-sm font-medium text-primary">
                    <Briefcase className="w-4 h-4 mr-2" /> {project.role}
                  </div>
                </div>
                <div className="md:w-2/3 space-y-4">
                  <div className="flex items-center text-sm text-foreground/70 font-medium">
                    <Building className="w-4 h-4 mr-2 text-foreground/50" /> {project.fundingAgency}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm bg-background p-4 rounded-xl border border-border/50">
                    <div>
                      <span className="text-foreground/50 block text-xs uppercase tracking-wider mb-1">Amount</span>
                      <span className="font-bold text-foreground">{project.amount}</span>
                    </div>
                    <div>
                      <span className="text-foreground/50 block text-xs uppercase tracking-wider mb-1">Duration</span>
                      <span className="font-bold text-foreground">{project.duration}</span>
                    </div>
                  </div>
                  <p className="text-foreground/80 text-sm leading-relaxed">{project.description}</p>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {project.domain}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>

      {/* Funding Modal */}
      <AnimatePresence>
        {isFundingModalOpen && (
          <FundingModal
            isOpen={isFundingModalOpen}
            onClose={() => setIsFundingModalOpen(false)}
            onSave={handleSaveFunding}
            initialData={editingProposal}
          />
        )}
      </AnimatePresence>

      {/* Project Add/Edit Modal */}
      <AddContentModal 
        isOpen={isProjectModalOpen} 
        onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }} 
        title={editingProject ? "Edit Project" : "Add New Project"}
        type="project"
        initialData={editingProject}
        onSave={(data) => {
          handleSaveProject(data);
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
      />

      {/* Password Modal */}
      <PasswordPromptModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setPendingAction(null);
        }}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />
    </div>
  );
}
