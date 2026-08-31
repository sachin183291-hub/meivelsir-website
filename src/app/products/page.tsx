"use client";

import { motion } from "framer-motion";
import { Package, ExternalLink } from "lucide-react";

export default function ProductsPage() {
  const mockProducts = [
    {
      id: "prod-1",
      name: "MediVision AI",
      category: "Healthcare Diagnostic Tool",
      description: "An AI-powered diagnostic tool capable of identifying early-stage neurological disorders from MRI scans with 95% accuracy.",
      status: "Commercialized",
      year: 2024,
      tech: ["PyTorch", "React", "Python"],
    },
    {
      id: "prod-2",
      name: "SecureNode IoT",
      category: "Smart City Infrastructure",
      description: "A lightweight hardware-software solution for securing edge sensors in urban environments against cyber-attacks.",
      status: "Research Prototype",
      year: 2025,
      tech: ["C++", "Embedded Linux", "Cryptography"],
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Products & Innovations</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="academic-card overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 bg-accent flex items-center justify-center relative overflow-hidden group">
                <Package className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">
                      {product.category}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground">{product.name}</h3>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full whitespace-nowrap">
                    {product.status}
                  </span>
                </div>
                
                <p className="text-foreground/80 text-sm flex-grow">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {product.tech.map(tech => (
                    <span key={tech} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6 pt-0 mt-auto">
                <button className="w-full flex items-center justify-center py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-medium">
                  <ExternalLink className="w-4 h-4 mr-2" /> View Product Demo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
