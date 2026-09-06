import Link from "next/link";
import { profileData } from "@/data/mockData";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">{profileData.name}</h3>
            <p className="text-foreground/80 font-medium">
              {profileData.designation}
            </p>
            <p className="text-sm text-foreground/60 max-w-xs">
              {profileData.intro}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Research", "Publications", "Patents", "Products", "Projects", "Events", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    prefetch={true}
                    className="text-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Research Profiles</h4>
            <ul className="space-y-2">
              <li><a href={profileData.social.googleScholar} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">Google Scholar</a></li>
              <li><a href={profileData.social.orcid} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">ORCID</a></li>
              <li><a href={profileData.social.scopus} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">Scopus</a></li>
              <li><a href={profileData.social.researchGate} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">ResearchGate</a></li>
              <li><a href={profileData.social.linkedIn} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">LinkedIn</a></li>
              <li><a href={profileData.social.github} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">GitHub</a></li>
              <li><a href={profileData.social.researchId} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">ResearchID</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} {profileData.name}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
