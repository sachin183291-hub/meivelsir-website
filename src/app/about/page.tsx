"use client";

import { motion } from "framer-motion";
import { profileData, mockEducation, mockExpertise } from "@/data/mockData";
import { GraduationCap, Award, BookOpen, Lightbulb, CheckCircle2 } from "lucide-react";

export default function AboutPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">About Me</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Main Content (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-16">
            
            <section>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6 flex items-center">
                <BookOpen className="mr-4 w-7 h-7 text-primary" /> Professional Summary
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {profileData.about.summary}
                </p>
                <p className="text-foreground/80 leading-relaxed text-lg mt-4">
                  {profileData.intro}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8 flex items-center">
                <GraduationCap className="mr-4 w-7 h-7 text-primary" /> Academic Background
              </h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent ml-3 pl-8">
                {mockEducation.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[45px] top-1.5 h-6 w-6 rounded-full bg-primary border-4 border-background flex items-center justify-center shadow-sm"></div>
                    <div className="academic-card p-6">
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.degree}</h3>
                      <p className="text-primary font-semibold mb-2">{item.institution}</p>
                      <p className="text-sm text-foreground/50 font-bold uppercase tracking-wider mb-4">{item.year}</p>
                      <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar (Right 1 column) */}
          <div className="space-y-8 lg:sticky lg:top-28">
            
            <div className="academic-card p-8 border-t-4 border-t-primary">
              <h3 className="text-xl font-serif font-bold flex items-center text-foreground mb-4">
                <Lightbulb className="mr-3 w-6 h-6 text-primary" /> Research Philosophy
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {profileData.about.researchPhilosophy}
              </p>
            </div>

            <div className="academic-card p-8 border-t-4 border-t-secondary">
              <h3 className="text-xl font-serif font-bold flex items-center text-foreground mb-4">
                <Award className="mr-3 w-6 h-6 text-secondary" /> Teaching Philosophy
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {profileData.about.teachingPhilosophy}
              </p>
            </div>

            <div className="academic-card p-8">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Areas of Expertise</h3>
              <ul className="space-y-3">
                {mockExpertise.map((skill) => (
                  <li key={skill} className="flex items-center text-foreground/80 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
