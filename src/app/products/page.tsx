"use client";

import { motion } from "framer-motion";
import { Package, ExternalLink, Plus, Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import AddContentModal from "@/components/modals/AddContentModal";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";
import ViewProductModal from "@/components/modals/ViewProductModal";
import { Product } from "@/types";
import Image from "next/image";

const initialProducts: Product[] = [
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

export default function ProductsPage() {
  const { isAdmin } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const handleAddClick = () => {
    if (isAdmin) {
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    if (isAdmin) {
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4 mb-12 relative">
          <div className="flex justify-center sm:justify-end mb-4 sm:mb-0 sm:absolute sm:right-0 sm:top-0">
            <button 
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Products & Innovations</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="academic-card overflow-hidden flex flex-col h-full group"
            >
              <div className="h-48 bg-accent flex items-center justify-center relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60 z-10"></div>
                
                {product.images && product.images.length > 0 ? (
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <Package className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-500 z-0" />
                )}

                <button 
                  onClick={(e) => { e.stopPropagation(); handleEditClick(product); }}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md text-white hover:bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                  title="Edit Product"
                >
                  <Pencil className="w-4 h-4" />
                </button>
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
                <button 
                  onClick={() => setViewingProduct(product)}
                  className="w-full flex items-center justify-center py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-medium"
                >
                  <ExternalLink className="w-4 h-4 mr-2" /> View Product Demo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AddContentModal 
        isOpen={isAddModalOpen} 
        onClose={() => { setIsAddModalOpen(false); setEditingProduct(null); }} 
        title={editingProduct ? "Edit Product" : "Add New Product"}
        type="product"
        initialData={editingProduct}
        onSave={(data) => {
          if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...data, id: p.id } : p));
          } else {
            setProducts([{ ...data, id: Date.now().toString() }, ...products]);
          }
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
      />

      <PasswordPromptModal
        isOpen={isPasswordModalOpen}
        onClose={() => { setIsPasswordModalOpen(false); setEditingProduct(null); }}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsAddModalOpen(true);
        }}
      />

      <ViewProductModal 
        isOpen={viewingProduct !== null} 
        onClose={() => setViewingProduct(null)} 
        product={viewingProduct} 
      />
    </div>
  );
}
