"use client";

import { motion } from "framer-motion";
import { Lightbulb, ExternalLink, ShieldCheck } from "lucide-react";
import { mockPatents } from "@/data/patentsData";

export default function PatentsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Patents & Inventions</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPatents.map((patent, index) => (
            <motion.div 
              key={patent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="academic-card p-6 relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -right-10 -top-10 text-primary/5">
                <ShieldCheck className="w-40 h-40" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-primary/10 rounded-lg inline-block">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    patent.status === 'Granted' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {patent.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground">{patent.title}</h3>
                
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <span className="text-foreground/50">Inventors:</span>
                    <p className="font-medium text-foreground">{patent.inventors.join(", ")}</p>
                  </div>
                  <div>
                    <span className="text-foreground/50">Patent No:</span>
                    <p className="font-medium text-foreground">{patent.patentNumber}</p>
                  </div>
                  <div>
                    <span className="text-foreground/50">Country:</span>
                    <p className="font-medium text-foreground">{patent.country}</p>
                  </div>
                  <div>
                    <span className="text-foreground/50">Date:</span>
                    <p className="font-medium text-foreground">{patent.grantDate || patent.filingDate}</p>
                  </div>
                </div>

                <p className="text-sm text-foreground/80 mt-2 line-clamp-3">
                  {patent.description}
                </p>

                <button className="mt-4 flex items-center text-sm font-semibold text-primary hover:underline">
                  <ExternalLink className="w-4 h-4 mr-1" /> View Patent Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
