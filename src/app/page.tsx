"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, Lightbulb, Mail, ChevronRight, FileText, Briefcase, Calendar, Trophy, Zap, Stethoscope, Cpu, Activity, Landmark } from "lucide-react";
import { profileData, mockNews, mockExperience, mockAwards, mockResearchAreas, mockProjects } from "@/data/mockData";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <div className="flex flex-col items-center justify-center space-y-8">
          
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight">
                {profileData.name}
              </h1>
              <p className="mt-4 text-xl md:text-2xl text-primary font-medium tracking-wide uppercase text-sm">
                {profileData.designation}
              </p>
            </div>
            
            <div>
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto font-serif">
                {profileData.about.summary}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <MagneticButton>
                <Link href="#research" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold transition-colors hover:bg-primary/90 shadow-sm">
                  Explore Research
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a href="#publications" className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-border bg-card text-foreground font-semibold hover:bg-accent hover:text-primary transition-colors">
                  Publications
                </a>
              </MagneticButton>
            </div>
          </div>
          
        </div>
      </section>

      {/* --- STATS BANNER --- */}
      <div className="border-t border-border bg-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-serif font-bold text-primary">{profileData.stats.publications}+</p>
              <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mt-1">Publications</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-primary">{profileData.stats.patents}</p>
              <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mt-1">Patents</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-primary">{profileData.stats.citations}+</p>
              <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mt-1">Citations</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-primary">{profileData.stats.students}+</p>
              <p className="text-sm font-medium text-foreground/60 uppercase tracking-wider mt-1">Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- ABOUT ME SNIPPET --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-border text-center">
        <div className="flex flex-col items-center">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">About Me</h2>
            <div className="w-16 h-1 bg-primary mt-6 rounded mx-auto"></div>
          </div>
          <div className="space-y-6">
            <p className="text-lg text-foreground/70 leading-relaxed font-serif">
              {profileData.about.summary}
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed font-serif">
              {profileData.intro}
            </p>
            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center text-primary font-bold hover:underline group">
                Read Full Biography <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- LATEST NEWS & UPDATES --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
        <div className="mb-12 flex flex-col items-center text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Latest News</h2>
            <div className="w-16 h-1 bg-primary mt-4 rounded mx-auto"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockNews.map((news) => (
            <div key={news.id} className="academic-card p-6 border-l-4 border-l-primary flex flex-col">
              <span className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2 flex items-center">
                <Calendar className="w-3 h-3 mr-1" /> {news.date}
              </span>
              <h3 className="text-lg font-bold text-foreground mb-3">{news.title}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed flex-grow">{news.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CORE RESEARCH AREAS --- */}
      <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border bg-accent/20">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Core Research Areas</h2>
          <div className="w-16 h-1 bg-primary mt-4 rounded mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockResearchAreas.map((area, idx) => (
            <div key={area.id} className="academic-card p-8 group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                {idx === 0 ? <Stethoscope className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" /> :
                 idx === 1 ? <Activity className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" /> :
                 <Cpu className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />}
              </div>
              <h3 className="text-xl font-bold mb-3">{area.title}</h3>
              <p className="text-foreground/70 leading-relaxed text-sm">{area.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPERIENCE TIMELINE --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Professional Journey</h2>
          <div className="w-24 h-1 bg-primary mt-6 mx-auto rounded"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10"></div>
          
          <div className="space-y-12">
            {mockExperience.map((exp, index) => (
              <div key={exp.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-4 border-background bg-primary items-center justify-center shadow-lg z-10">
                  <Briefcase className="w-5 h-5 text-primary-foreground" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-10' : 'md:pr-10'}`}>
                  <div className="academic-card p-8 group hover:border-primary/50 transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <span className="inline-block px-3 py-1 bg-accent text-foreground/70 text-xs font-bold uppercase tracking-widest rounded mb-4">
                      {exp.duration}
                    </span>
                    <h4 className="font-bold text-foreground text-2xl mb-1">{exp.role}</h4>
                    <p className="text-primary font-semibold text-base mb-4 flex items-center">
                      <Landmark className="w-4 h-4 mr-2" /> {exp.institution}
                    </p>
                    <p className="text-foreground/70 text-base leading-relaxed">{exp.description}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HONORS & AWARDS --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border bg-accent/10">
        <div className="mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Honors & Awards</h2>
          <div className="w-24 h-1 bg-primary mt-6 rounded mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockAwards.map((award) => (
            <div key={award.id} className="academic-card p-8 flex gap-6 hover:shadow-lg transition-shadow border-l-4 border-l-primary bg-background">
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-xl mb-1">{award.title}</h4>
                <p className="text-foreground/50 text-sm font-semibold uppercase tracking-wider mb-3">
                  {award.organization} <span className="mx-2">•</span> {award.year}
                </p>
                <p className="text-foreground/70 text-base leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SELECTED FUNDED PROJECTS --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border bg-accent/20">
        <div className="flex flex-col items-center text-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Selected Projects</h2>
            <div className="w-16 h-1 bg-primary mt-4 rounded mx-auto"></div>
          </div>
          <Link href="/projects" className="hidden md:flex items-center text-primary font-semibold hover:underline mt-4">
            View all projects <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockProjects.map((project) => (
            <div key={project.id} className="academic-card p-8 border-t-4 border-t-primary flex flex-col">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded w-max mb-4">
                {project.fundingAgency}
              </span>
              <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
              <p className="text-foreground/70 text-sm mb-6 flex-grow">{project.description}</p>
              <div className="flex justify-between items-center text-sm border-t border-border pt-4">
                <span className="font-medium text-foreground/70">{project.duration}</span>
                <span className="font-bold text-primary">{project.amount}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 md:hidden">
          <Link href="/projects" className="flex items-center text-primary font-semibold hover:underline">
            View all projects <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>
      
      {/* --- PUBLICATIONS --- */}
      <section id="publications" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border">
        <div className="flex flex-col items-center text-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Selected Publications</h2>
            <div className="w-16 h-1 bg-primary mt-4 rounded mx-auto"></div>
          </div>
          <Link href="/publications" className="hidden md:flex items-center text-primary font-semibold hover:underline mt-4">
            View all publications <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {[
            { title: "AI-Based Smart Monitoring System for Urban Environments", venue: "IEEE Transactions on Artificial Intelligence", year: 2026 },
            { title: "Deep Learning Approaches for Medical Image Processing", venue: "Journal of Medical Informatics", year: 2025 },
            { title: "Energy-Efficient Algorithms for IoT Sensor Networks", venue: "ACM Transactions on Sensor Networks", year: 2024 },
          ].map((item, idx) => (
            <div key={idx} className="academic-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="text-foreground/70 text-sm font-medium">
                    {item.venue} · <span className="text-primary font-bold">{item.year}</span>
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 border border-border rounded text-sm font-semibold hover:bg-accent transition-colors whitespace-nowrap">
                Read Paper
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden">
          <Link href="/publications" className="flex items-center text-primary font-semibold hover:underline">
            View all publications <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center border-t border-border bg-accent/20 rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">Get in Touch</h2>
        <p className="text-lg text-foreground/70 mb-10 font-serif">
          Open to academic collaborations, research discussions, and professional inquiries.
        </p>
        
        <a href="mailto:contact@meivel.edu" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-md font-bold text-lg hover:bg-primary/90 transition-colors shadow-sm">
          <Mail className="w-5 h-5 mr-3" />
          contact@meivel.edu
        </a>
      </section>

    </div>
  );
}
