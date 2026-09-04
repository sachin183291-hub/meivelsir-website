import React, { useState, useEffect, useCallback } from "react";
import { X, Calendar, MapPin, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import { Event } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface ViewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export default function ViewEventModal({ isOpen, onClose, event }: ViewEventModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Reset state when opened with a new event
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsPlaying(true);
    }
  }, [isOpen, event?.id]);

  const images = event?.images || [];
  const hasImages = images.length > 0;

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = () => {
    setIsPlaying(false);
    nextImage();
  };

  const handlePrev = () => {
    setIsPlaying(false);
    prevImage();
  };

  // Auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && hasImages && isPlaying && !isHovered && images.length > 1) {
      interval = setInterval(() => {
        nextImage();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isOpen, hasImages, isPlaying, isHovered, images.length, nextImage]);

  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden border border-border/50 flex flex-col md:flex-row z-10"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div 
          className={`w-full ${hasImages ? 'md:w-1/2 h-64 md:h-auto' : 'hidden'} relative bg-black/5 flex flex-col`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {hasImages ? (
            <div className="relative w-full h-full flex-1 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={images[currentImageIndex]} 
                    alt={`Event image ${currentImageIndex + 1}`} 
                    fill 
                    className="object-contain p-4" 
                  />
                </motion.div>
              </AnimatePresence>

              {/* Gallery Controls */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  
                  {/* Indicators and Controls */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur transition-colors"
                      title={isPlaying ? "Pause slideshow" : "Play slideshow"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <div className="flex gap-2">
                      {images.map((_, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            setCurrentImageIndex(idx);
                            setIsPlaying(false);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>

        {/* Right Side: Event Details */}
        <div className={`w-full ${hasImages ? 'md:w-1/2' : ''} p-8 md:p-10 overflow-y-auto max-h-[90vh]`}>
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-6 ring-1 ring-primary/20">
            {event.category}
          </span>
          
          <h2 className="text-3xl font-bold text-foreground leading-tight mb-8">
            {event.title}
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-foreground/80 p-4 rounded-xl bg-accent/30 border border-border/50">
              <div className="p-3 bg-background rounded-lg shadow-sm">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground/50 font-semibold uppercase tracking-wider mb-1">Date</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>

            {event.location && (
              <div className="flex items-center gap-4 text-foreground/80 p-4 rounded-xl bg-accent/30 border border-border/50">
                <div className="p-3 bg-background rounded-lg shadow-sm">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-foreground/50 font-semibold uppercase tracking-wider mb-1">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>
            )}

            {event.description && (
              <div className="pt-6 border-t border-border/50">
                <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mb-4">About the Event</h3>
                <p className="text-foreground/70 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
