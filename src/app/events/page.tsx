"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { eventsData } from "@/data/eventsData";
import { useState } from "react";

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Organized Program", "Workshop", "FDP / STC / ISRO Course", "Seminar & Training"];

  const filteredEvents = activeCategory === "All" 
    ? eventsData 
    : eventsData.filter(event => event.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
      <div className="space-y-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Events & Programs</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4">
            Workshops, Seminars, Training Programs, and FDPs organized and attended over the years.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-card text-foreground/70 hover:bg-accent hover:text-foreground border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="academic-card p-6 flex flex-col gap-4 border-l-4 border-l-primary hover:-translate-y-1 transition-transform"
            >
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-accent rounded text-xs font-bold uppercase tracking-wider text-primary">
                  {event.category}
                </span>
                <h3 className="text-lg font-bold text-foreground leading-snug">{event.title}</h3>
              </div>
              
              <div className="mt-auto space-y-2 text-sm text-foreground/70 pt-4 border-t border-border">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-foreground/50" />
                  <span>{event.date}</span>
                </div>
                {event.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-foreground/50" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.description && (
                  <p className="mt-2 text-foreground/80 font-medium italic">
                    {event.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-16 bg-accent/20 rounded-lg border border-border">
              <p className="text-lg text-foreground/50 font-medium">No events found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
