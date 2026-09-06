"use client";

import { motion, AnimatePresence } from "framer-motion";
import { profileData, mockEducation, mockExpertise, mockEstablishedLabs, mockMemberships } from "@/data/mockData";
import { GraduationCap, Award, BookOpen, Lightbulb, CheckCircle2, Plus, Building2, Globe, Pencil, Trash2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";

interface Organization {
  id: string;
  name: string;
  type: string;
  country?: string;
  description?: string;
  website?: string;
}

const ORG_TYPES = ["Industry", "University", "Government", "Research Lab", "Hospital", "NGO", "Other"];

function OrgModal({ org, onClose, onSave }: { org: Organization | null; onClose: () => void; onSave: (data: Omit<Organization, "id">) => void }) {
  const [form, setForm] = useState({ name: org?.name ?? "", type: org?.type ?? "Industry", country: org?.country ?? "", description: org?.description ?? "", website: org?.website ?? "" });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-foreground">{org ? "Edit Organization" : "Add Collaborative Organization"}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-accent transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1 block">Organization Name *</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. DRDO, IIT Madras, ISRO..." className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1 block">Type *</label>
            <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              {ORG_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1 block">Country</label>
            <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="e.g. India, USA..." className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1 block">Description</label>
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} placeholder="Brief description of the collaboration..." className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1 block">Website</label>
            <input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://..." className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-semibold hover:bg-accent transition-colors">Cancel</button>
          <button disabled={!form.name.trim()} onClick={() => { if (form.name.trim()) { onSave(form); onClose(); } }} className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50">Save Organization</button>
        </div>
      </motion.div>
    </div>
  );
}

const DEFAULT_ORGS: Organization[] = [
  { id: "org-1", name: "Rootview Technologies", type: "Industry", country: "India", description: "Collaborative technology partner based in Coimbatore." },
  { id: "org-2", name: "Sun Info Media", type: "Industry", country: "India", description: "Media and information technology collaboration based in Coimbatore." },
];

export default function AboutPage() {
  const { isAdmin } = useAuth();
  const [orgs, setOrgs] = useState<Organization[]>(DEFAULT_ORGS);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [isOrgModalOpen, setIsOrgModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    fetch("/api/organizations").then(r => r.ok ? r.json() : []).then(data => { if (Array.isArray(data) && data.length > 0) setOrgs(data); }).catch(() => {});
  }, []);

  const requireAuth = (action: () => void) => { if (isAdmin) { action(); } else { setPendingAction(() => action); setIsPasswordModalOpen(true); } };
  const handleAddOrg = () => requireAuth(() => { setEditingOrg(null); setIsOrgModalOpen(true); });
  const handleEditOrg = (org: Organization) => requireAuth(() => { setEditingOrg(org); setIsOrgModalOpen(true); });

  const handleSaveOrg = async (data: Omit<Organization, "id">) => {
    if (editingOrg) {
      const res = await fetch(`/api/organizations/${editingOrg.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { const updated = await res.json(); setOrgs(prev => prev.map(o => o.id === editingOrg.id ? updated : o)); }
      else alert("Failed to save. Please check your database connection.");
    } else {
      const res = await fetch("/api/organizations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { const added = await res.json(); setOrgs(prev => [added, ...prev]); }
      else alert("Failed to save. Please check your database connection.");
    }
  };

  const handleDeleteOrg = (id: string) => requireAuth(async () => {
    if (confirm("Delete this organization?")) {
      const res = await fetch(`/api/organizations/${id}`, { method: "DELETE" });
      if (res.ok) setOrgs(prev => prev.filter(o => o.id !== id));
    }
  });

  const typeColor: Record<string, string> = { Industry: "bg-blue-500/10 text-blue-600 dark:text-blue-400", University: "bg-purple-500/10 text-purple-600 dark:text-purple-400", Government: "bg-orange-500/10 text-orange-600 dark:text-orange-400", "Research Lab": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", Hospital: "bg-red-500/10 text-red-600 dark:text-red-400", NGO: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400", Other: "bg-muted text-muted-foreground" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">About Me</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6 flex items-center"><BookOpen className="mr-4 w-7 h-7 text-primary" /> Professional Summary</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-foreground/80 leading-relaxed text-lg">{profileData.about.summary}</p>
                <p className="text-foreground/80 leading-relaxed text-lg mt-4">{profileData.intro}</p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 flex items-center"><GraduationCap className="mr-4 w-7 h-7 text-primary" /> Academic Background</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent ml-3 pl-8">
                {mockEducation.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[45px] top-1.5 h-6 w-6 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-sm"></div>
                    <div className="academic-card p-6">
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.degree}</h3>
                      <p className="text-primary font-semibold mb-2">{item.institution}</p>
                      <p className="text-sm text-foreground/50 font-bold uppercase tracking-wider mb-4">{item.year}</p>
                      <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-foreground flex items-center"><Building2 className="mr-4 w-7 h-7 text-primary" /> Collaborative &amp; Research Organizations</h2>
                <button onClick={handleAddOrg} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow hover:shadow-lg hover:scale-105 transition-all"><Plus className="w-4 h-4" /> Add</button>
              </div>
              {orgs.length === 0 ? (
                <div className="academic-card p-12 text-center border-dashed">
                  <Building2 className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                  <p className="text-foreground/50 font-medium">No organizations added yet.</p>
                  <p className="text-foreground/40 text-sm mt-1">Click Add to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {orgs.map((org, idx) => (
                    <motion.div key={org.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="academic-card p-5 group relative">
                      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEditOrg(org)} className="p-1.5 rounded-lg bg-background border border-border hover:text-primary hover:border-primary/50 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDeleteOrg(org.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><Building2 className="w-5 h-5 text-primary" /></div>
                        <div className="flex-grow min-w-0 pr-12">
                          <h4 className="font-bold text-foreground text-base leading-snug">{org.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1.5">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeColor[org.type] ?? typeColor.Other}`}>{org.type}</span>
                            {org.country && <span className="text-xs text-foreground/50 flex items-center gap-1"><Globe className="w-3 h-3" /> {org.country}</span>}
                          </div>
                          {org.description && <p className="text-sm text-foreground/60 mt-2 leading-relaxed line-clamp-2">{org.description}</p>}
                          {org.website && <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1.5 block truncate">{org.website}</a>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="academic-card p-8 border-t-4 border-t-primary">
              <h3 className="text-xl font-serif font-bold flex items-center text-foreground mb-4"><Lightbulb className="mr-3 w-6 h-6 text-primary" /> Research Philosophy</h3>
              <p className="text-foreground/70 leading-relaxed">{profileData.about.researchPhilosophy}</p>
            </div>
            <div className="academic-card p-8 border-t-4 border-t-secondary">
              <h3 className="text-xl font-serif font-bold flex items-center text-foreground mb-4"><Award className="mr-3 w-6 h-6 text-secondary" /> Teaching Philosophy</h3>
              <p className="text-foreground/70 leading-relaxed">{profileData.about.teachingPhilosophy}</p>
            </div>
            <div className="academic-card p-8">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Areas of Expertise</h3>
              <ul className="space-y-3">{mockExpertise.map((skill) => <li key={skill} className="flex items-center text-foreground/80 font-medium"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" />{skill}</li>)}</ul>
            </div>
            <div className="academic-card p-8">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Established Labs</h3>
              <ul className="space-y-4">{mockEstablishedLabs.map((lab, idx) => <li key={idx} className="flex items-start text-foreground/80 font-medium"><CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" /><span>{lab}</span></li>)}</ul>
            </div>
            <div className="academic-card p-8 border-t-4 border-t-secondary">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Professional Memberships</h3>
              <ul className="space-y-4">{mockMemberships.map((membership, idx) => <li key={idx} className="flex items-start text-foreground/80 font-medium"><CheckCircle2 className="w-5 h-5 text-secondary mr-3 shrink-0 mt-0.5" /><span>{membership}</span></li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOrgModalOpen && <OrgModal org={editingOrg} onClose={() => { setIsOrgModalOpen(false); setEditingOrg(null); }} onSave={handleSaveOrg} />}
      </AnimatePresence>
      <PasswordPromptModal isOpen={isPasswordModalOpen} onClose={() => { setIsPasswordModalOpen(false); setPendingAction(null); }} onSuccess={() => { setIsPasswordModalOpen(false); if (pendingAction) { pendingAction(); setPendingAction(null); } }} />
    </div>
  );
}