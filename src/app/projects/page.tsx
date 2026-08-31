"use client";

import { motion } from "framer-motion";
import { Briefcase, Building } from "lucide-react";
import { mockProjects } from "@/data/mockData";

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Funded Projects</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-6">
          {mockProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="academic-card p-6 md:p-8 flex flex-col md:flex-row gap-6"
            >
              <div className="md:w-1/3 space-y-4 border-b md:border-b-0 md:border-r border-border pb-4 md:pb-0 md:pr-6">
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
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                    {project.domain}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
