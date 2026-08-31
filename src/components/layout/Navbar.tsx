"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Download, Moon, Sun } from "lucide-react";
import { profileData } from "@/data/mockData";
import { useTheme } from "@/components/ThemeProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Research", path: "/research" },
    { name: "Publications", path: "/publications" },
    { name: "Products", path: "/products" },
    { name: "Projects", path: "/projects" },
    { name: "Events", path: "/events" },
    { name: "Patents", path: "/patents" },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl tracking-tight text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground font-serif text-lg">
                M
              </div>
              <div>
                <div className="font-serif leading-tight">{profileData.name}</div>
                <div className="text-xs text-foreground/60 font-sans tracking-wide uppercase">{profileData.designation}</div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-2 xl:px-4 py-2 rounded text-sm font-medium transition-colors ${
                  pathname === link.path
                    ? "text-primary bg-primary/5"
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
                  <a href={profileData.social.googleScholar} className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">Google Scholar</a>
                  <a href={profileData.social.orcid} className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">ORCID</a>
                  <a href={profileData.social.linkedIn} className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">LinkedIn</a>
                  <a href={profileData.social.github} className="block px-4 py-2 text-sm text-foreground/80 hover:bg-accent hover:text-primary">GitHub</a>
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

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-4">
             <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded text-foreground/70 hover:bg-accent hover:text-primary transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded text-foreground/70 hover:bg-accent transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`block px-3 py-2 rounded text-base font-medium ${
                  pathname === link.path
                    ? "text-primary bg-primary/5"
                    : "text-foreground/80 hover:bg-accent hover:text-primary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="/cv.pdf"
              className="block px-3 py-2 mt-4 text-center rounded bg-primary text-primary-foreground font-medium"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
