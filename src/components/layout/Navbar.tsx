"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Download, Moon, Sun, Home, BookOpen, FlaskConical, Award, Calendar, Lightbulb, Briefcase, Info, Layers } from "lucide-react";
import { profileData } from "@/data/mockData";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Research", path: "/research", icon: FlaskConical },
    { name: "Publications", path: "/publications", icon: BookOpen },
    { name: "Products", path: "/products", icon: Lightbulb },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Patents", path: "/patents", icon: Award },
  ];

  // Bottom nav items for mobile quick-access
  const bottomNavLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Research", path: "/research", icon: FlaskConical },
    { name: "Pubs", path: "/publications", icon: BookOpen },
    { name: "Projects", path: "/projects", icon: Briefcase },
  ];

  return (
    <>
      {/* Top Header */}
      <header className={`sticky top-0 w-full z-40 bg-background/95 backdrop-blur-md border-b border-border transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Name */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl tracking-tight text-foreground flex items-center gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary flex-shrink-0 overflow-hidden shadow-sm">
                  <img
                    src="/profile.jpg"
                    alt="Dr. Meivel S"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-serif text-base md:text-xl leading-none mb-0.5">{profileData.name}</div>
                  <div className="text-[9px] md:text-[10px] text-foreground/50 font-sans tracking-widest uppercase font-semibold">
                    {profileData.designation.split('|')[0].trim()}
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
              {navLinks.filter(l => l.name !== "Home").map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  prefetch={true}
                  className={`px-2 xl:px-4 py-2 rounded text-sm font-medium transition-colors ${
                    pathname === link.path
                      ? "text-primary bg-primary/5 font-bold"
                      : "text-foreground/70 hover:text-primary hover:bg-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Research Profiles Dropdown */}
              <div className="relative group ml-2">
                <button className="flex items-center px-2 xl:px-4 py-2 rounded text-sm font-medium text-foreground/70 hover:text-primary hover:bg-accent transition-colors">
                  Profiles <ChevronDown className="ml-1 w-3 h-3" />
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-card border border-border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <a href={profileData.social.googleScholar} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">Google Scholar</a>
                    <a href={profileData.social.orcid} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">ORCID</a>
                    <a href={profileData.social.linkedIn} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">LinkedIn</a>
                    <a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">GitHub</a>
                  </div>
                </div>
              </div>
            </nav>

            {/* Actions (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 pl-2 xl:pl-4 border-l border-border">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded text-foreground/70 hover:bg-accent hover:text-primary transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                CV <Download className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center lg:hidden gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-xl text-foreground/80 hover:bg-accent transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center justify-center"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile Slide-down Full Navigation Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-background/98 backdrop-blur-xl flex flex-col justify-between overflow-y-auto p-4 border-t border-border">
          <div className="space-y-1 py-2">
            <div className="text-xs font-bold uppercase tracking-widest text-primary px-4 mb-2">Navigation Menu</div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.path === "/" ? pathname === "/" : pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "text-primary bg-primary/15 font-bold shadow-sm"
                      : "text-foreground/80 hover:bg-accent hover:text-primary"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? "bg-primary text-primary-foreground" : "bg-accent text-foreground/60"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom actions inside Drawer */}
          <div className="pt-4 border-t border-border space-y-3 pb-20">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-lg shadow-primary/20"
            >
              <Download className="w-5 h-5" /> Download CV
            </a>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
              <a href={profileData.social.googleScholar} target="_blank" rel="noopener noreferrer" className="py-2 rounded-lg bg-accent text-foreground/70 hover:text-primary">Google Scholar</a>
              <a href={profileData.social.orcid} target="_blank" rel="noopener noreferrer" className="py-2 rounded-lg bg-accent text-foreground/70 hover:text-primary">ORCID</a>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border safe-area-pb shadow-lg">
        <div className="flex items-center justify-around px-2 py-1.5">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.path === "/" ? pathname === "/" : pathname.startsWith(link.path);
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  isActive ? "text-primary" : "text-foreground/50"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? "bg-primary/10" : ""}`}>
                  <Icon className={`w-5 h-5 transition-all ${isActive ? "scale-110 text-primary" : ""}`} />
                </div>
                <span className={`text-[10px] font-semibold ${isActive ? "text-primary font-bold" : "text-foreground/60"}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}

          {/* More Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isOpen ? "text-primary" : "text-foreground/50"
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-all ${isOpen ? "bg-primary/10 text-primary" : ""}`}>
              {isOpen ? <X className="w-5 h-5 text-primary" /> : <Layers className="w-5 h-5" />}
            </div>
            <span className={`text-[10px] font-semibold ${isOpen ? "text-primary font-bold" : "text-foreground/60"}`}>
              Menu
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}

