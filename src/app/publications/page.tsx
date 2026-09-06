"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FileText, ExternalLink, ChevronDown, Plus, BookOpen, Quote } from "lucide-react";
import { mockPublications, sciJournals } from "@/data/publicationsData";
import { internationalConferences } from "@/data/conferencesData";
import { useAuth } from "@/context/AuthContext";
import AddContentModal from "@/components/modals/AddContentModal";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"sci" | "journals" | "conferences">("sci");
  
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

  const currentData = useMemo(() => {
    return activeTab === "sci" 
      ? sciJournals 
      : activeTab === "journals" 
      ? mockPublications 
      : internationalConferences;
  }, [activeTab]);

  // Extract available years for filter
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(currentData.map(p => p.year))).sort((a, b) => b - a);
    return ["All", ...years.map(String)];
  }, [currentData]);

  const filteredPubs = useMemo(() => {
    return currentData.filter(pub => {
      const matchesSearch = 
        pub.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors?.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
        pub.journalOrConference?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear = selectedYear === "All" || String(pub.year) === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [currentData, searchTerm, selectedYear]);

  return (
    <div className="min-h-screen pt-6 sm:pt-10 md:pt-14 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 md:mb-14 relative"
      >
        <div className="flex justify-start sm:justify-end mb-4 sm:mb-0 sm:absolute sm:right-0 sm:top-0">
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Publication
          </button>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-4 font-serif">
          Publications &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-secondary">Patents</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl font-light">
          An extensive archive of SCI Journals, Scopus indexed papers, and International Conference proceedings.
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex flex-wrap gap-3 mb-8 relative z-10"
      >
        <button
          type="button"
          onClick={() => { setActiveTab("sci"); setSelectedYear("All"); }}
          className={`px-5 sm:px-7 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex-grow md:flex-grow-0 flex items-center justify-center gap-2 ${
            activeTab === "sci" 
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
            : "bg-card border border-border text-foreground/70 hover:bg-accent"
          }`}
        >
          <span>SCI Journals</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "sci" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {sciJournals.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("journals"); setSelectedYear("All"); }}
          className={`px-5 sm:px-7 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex-grow md:flex-grow-0 flex items-center justify-center gap-2 ${
            activeTab === "journals" 
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
            : "bg-card border border-border text-foreground/70 hover:bg-accent"
          }`}
        >
          <span>Scopus Journals</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "journals" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {mockPublications.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => { setActiveTab("conferences"); setSelectedYear("All"); }}
          className={`px-5 sm:px-7 py-3 rounded-xl font-bold text-sm sm:text-base transition-all flex-grow md:flex-grow-0 flex items-center justify-center gap-2 ${
            activeTab === "conferences" 
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
            : "bg-card border border-border text-foreground/70 hover:bg-accent"
          }`}
        >
          <span>Conferences</span>
          <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === "conferences" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {internationalConferences.length}
          </span>
        </button>
      </motion.div>

      {/* Filters & Search */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        {/* Search input */}
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search by title, author, or journal..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base transition-all shadow-sm"
          />
        </div>

        {/* Year Filter Dropdown */}
        <div className="relative shrink-0 flex items-center">
          <Filter className="absolute left-3 w-4 h-4 text-foreground/50 pointer-events-none" />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-card border border-border text-foreground font-semibold rounded-xl py-3 pl-9 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none cursor-pointer shadow-sm w-full sm:w-auto"
          >
            <option value="All">All Years</option>
            {availableYears.filter(y => y !== "All").map(year => (
              <option key={year} value={year}>Year {year}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 w-4 h-4 text-foreground/50 pointer-events-none" />
        </div>
      </motion.div>

      {/* Editorial List */}
      <div className="space-y-4">
        {filteredPubs.map((pub, index) => {
          const isExpanded = expandedId === pub.id;
          const doiUrl = pub.doi ? `https://doi.org/${pub.doi}` : null;
          const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`;
          const paperUrl = doiUrl || pub.link || scholarUrl;

          return (
            <motion.div 
              key={pub.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
              className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                isExpanded 
                  ? 'bg-card border-primary/50 shadow-md ring-1 ring-primary/20' 
                  : 'bg-card/70 border-border/60 hover:border-primary/40 hover:bg-card shadow-sm'
              }`}
            >
              <div 
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : pub.id)}
              >
                <div className="flex items-start gap-4 flex-grow">
                  <span className={`text-2xl sm:text-3xl font-black transition-colors shrink-0 ${
                    isExpanded ? 'text-primary' : 'text-foreground/30 group-hover:text-primary/70'
                  }`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  
                  <div className="space-y-1.5 flex-grow">
                    <h3 className={`text-base sm:text-xl font-bold leading-snug transition-colors ${
                      isExpanded ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {pub.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-foreground/70 font-medium">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary font-bold rounded">
                        {pub.year}
                      </span>
                      <span>•</span>
                      <span className="text-foreground/80 line-clamp-1">{pub.journalOrConference}</span>
                      {pub.volume && (
                        <>
                          <span>•</span>
                          <span className="text-foreground/60">Vol. {pub.volume}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side Action Buttons - ALWAYS VISIBLE ON MOBILE */}
                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40 justify-between sm:justify-end">
                  <a 
                    href={paperUrl}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold shadow-sm hover:bg-primary/90 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{pub.doi ? "DOI" : "View"}</span>
                  </a>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(isExpanded ? null : pub.id);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent text-foreground/70 hover:text-foreground text-xs font-semibold transition-colors"
                  >
                    <span>{isExpanded ? "Hide" : "Details"}</span>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Expandable Details Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-border/40 bg-accent/20 space-y-4 text-sm">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Authors</h4>
                        <p className="text-foreground/90 font-medium leading-relaxed">
                          {pub.authors?.join(", ") || "Authors not listed"}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Journal / Publication Venue</h4>
                        <p className="text-foreground/80 font-medium">
                          {pub.journalOrConference} {pub.pages ? `(Pages: ${pub.pages})` : ""}
                        </p>
                      </div>

                      {pub.abstract && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Abstract</h4>
                          <p className="text-foreground/75 leading-relaxed text-xs sm:text-sm">
                            {pub.abstract}
                          </p>
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex flex-wrap gap-2.5 pt-2 border-t border-border/40">
                        {doiUrl && (
                          <a 
                            href={doiUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:bg-primary/90 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> View Publisher DOI
                          </a>
                        )}

                        <a 
                          href={scholarUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-foreground font-bold text-xs hover:bg-accent transition-colors"
                        >
                          <Search className="w-3.5 h-3.5 text-primary" /> Google Scholar Search
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        {filteredPubs.length === 0 && (
          <div className="text-center py-16 bg-card rounded-2xl border border-border p-8">
            <BookOpen className="w-12 h-12 text-primary/40 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-foreground mb-1">No Publications Found</h3>
            <p className="text-foreground/60 text-sm max-w-md mx-auto">
              No matching publications were found for "{searchTerm}" in {selectedYear === "All" ? "all years" : selectedYear}. Please try clearing filters.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedYear("All"); }}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-xs"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <AddContentModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        title="Add New Publication"
        type="publication"
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

