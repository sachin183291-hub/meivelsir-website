"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, FileText, ExternalLink, ChevronDown } from "lucide-react";
import { mockPublications } from "@/data/mockData";

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredPubs = mockPublications.filter(pub => 
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-24"
      >
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground mb-6">
          Selected <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Publications.</span>
        </h1>
        <p className="text-xl md:text-2xl text-foreground/60 max-w-2xl font-light">
          An archive of scholarly articles, journal papers, and conference proceedings advancing the field of computer science.
        </p>
      </motion.div>

      {/* Filters & Search */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex flex-col md:flex-row gap-4 mb-12"
      >
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search publications by title or author..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-card/50 backdrop-blur-md border border-border rounded-2xl py-4 pl-12 pr-4 text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <button className="interactive flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-card border border-border hover:bg-muted transition-colors font-bold">
          <Filter className="w-5 h-5" /> Filter by Year
        </button>
      </motion.div>

      {/* Editorial List */}
      <div className="space-y-4">
        {filteredPubs.map((pub, index) => {
          const isExpanded = expandedId === pub.id;
          
          return (
            <motion.div 
              key={pub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`group overflow-hidden rounded-3xl border transition-all duration-500 cursor-pointer ${isExpanded ? 'bg-card border-primary/50 shadow-[0_0_50px_rgba(14,165,233,0.1)]' : 'bg-transparent border-border hover:border-primary/30 hover:bg-card/30'}`}
              onClick={() => setExpandedId(isExpanded ? null : pub.id)}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start md:items-center gap-6 md:gap-12 flex-grow">
                  <span className={`text-3xl md:text-5xl font-light transition-colors duration-500 ${isExpanded ? 'text-primary' : 'text-foreground/20 group-hover:text-foreground/40'}`}>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className={`text-xl md:text-3xl font-bold transition-colors duration-300 ${isExpanded ? 'text-primary' : 'text-foreground group-hover:text-primary/80'}`}>
                      {pub.title}
                    </h3>
                    <p className="text-foreground/60 mt-2 font-medium flex items-center gap-2 flex-wrap">
                      <span className="text-foreground">{pub.year}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/30"></span>
                      <span>{pub.journalOrConference}</span>
                      <span className="w-1 h-1 rounded-full bg-foreground/30"></span>
                      <span className="text-primary">{pub.type}</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/50">
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-4 border-t border-border/50 flex flex-col md:flex-row gap-8">
                      <div className="flex-grow space-y-6">
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Authors</h4>
                          <p className="text-foreground/80 font-medium">{pub.authors.join(", ")}</p>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Abstract</h4>
                          <p className="text-foreground/70 leading-relaxed max-w-3xl">
                            {pub.abstract}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                          <button className="interactive flex items-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            <FileText className="w-4 h-4 mr-2" /> Download PDF
                          </button>
                          {pub.doi && (
                            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="interactive flex items-center px-6 py-3 rounded-xl bg-muted text-foreground font-bold hover:bg-muted/80 transition-colors">
                              <ExternalLink className="w-4 h-4 mr-2" /> View DOI
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Optional Publication Visual */}
                      <div className="hidden lg:flex w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-white/10 items-center justify-center flex-shrink-0 relative overflow-hidden">
                         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay"></div>
                         <FileText className="w-24 h-24 text-primary/40" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
