"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Plus, Pencil } from "lucide-react";
import { eventsData } from "@/data/eventsData";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import AddContentModal from "@/components/modals/AddContentModal";
import PasswordPromptModal from "@/components/modals/PasswordPromptModal";
import ViewEventModal from "@/components/modals/ViewEventModal";
import { Event } from "@/types";

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const { isAdmin } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

  const categories = ["All", "Organized Program", "Workshop", "FDP / STC / ISRO Course", "Seminar & Training"];

  const filteredEvents = activeCategory === "All" 
    ? events 
    : events.filter(event => event.category === activeCategory);

  const handleAddClick = () => {
    setEditingEvent(null);
    if (isAdmin) {
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
    if (isAdmin) {
      setIsAddModalOpen(true);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleSaveEvent = (data: any) => {
    if (editingEvent) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? { ...ev, ...data } : ev));
    } else {
      setEvents(prev => [{ ...data, id: `evt-new-${Date.now()}` }, ...prev]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      <div className="space-y-16">
        <div className="text-center space-y-6 mb-16 relative">
          <div className="flex justify-center sm:justify-end mb-4 sm:mb-0 sm:absolute sm:right-0 sm:top-0">
            <button 
              onClick={handleAddClick}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Events & Programs</h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary/50 via-primary to-primary/50 mx-auto rounded-full"></div>
          <p className="text-foreground/70 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Workshops, Seminars, Training Programs, and FDPs organized and attended over the years.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground scale-105 shadow-md shadow-primary/20"
                  : "bg-card text-foreground/70 hover:bg-accent hover:text-foreground border border-border/50 hover:border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Cover Image or Gradient */}
              <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 via-accent to-background overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                {event.images && event.images.length > 0 && (
                  <Image src={event.images[0]} alt={event.title} fill className="object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
                )}
                
                {/* Category Badge over image */}
                <span className="absolute bottom-4 left-4 z-20 px-4 py-1.5 bg-primary/90 text-primary-foreground backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {event.category}
                </span>

                {/* Edit Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); handleEditClick(event); }}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/40 backdrop-blur-md text-white hover:bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                  title="Edit Event"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mt-auto pt-4 border-t border-border/40">
                  <div className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                    <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="line-clamp-1">{event.date}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-3 text-sm text-foreground/70 font-medium">
                      <div className="p-1.5 rounded-md bg-accent text-foreground/70">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setViewingEvent(event)}
                  className="w-full mt-2 py-2.5 rounded-xl border border-primary/20 text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
          
          {filteredEvents.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-border/50 shadow-sm">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 text-foreground/40">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No Events Found</h3>
              <p className="text-foreground/50 text-center max-w-md">There are currently no events matching this category. Please try selecting a different filter.</p>
            </div>
          )}
        </div>
      </div>
      
      <AddContentModal 
        isOpen={isAddModalOpen} 
        onClose={() => { setIsAddModalOpen(false); setEditingEvent(null); }} 
        title={editingEvent ? "Edit Event" : "Add New Event"}
        type="event"
        initialData={editingEvent}
        onSave={handleSaveEvent}
      />

      <PasswordPromptModal
        isOpen={isPasswordModalOpen}
        onClose={() => { setIsPasswordModalOpen(false); setEditingEvent(null); }}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsAddModalOpen(true);
        }}
      />

      <ViewEventModal 
        isOpen={viewingEvent !== null} 
        onClose={() => setViewingEvent(null)} 
        event={viewingEvent} 
      />
    </div>
  );
}
