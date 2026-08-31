"use client";

import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  // We keep the component name for compatibility, 
  // but it now acts as a standard, elegant academic button wrapper.
  return (
    <div
      className={`inline-block cursor-pointer ${className}`}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
