export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journalOrConference: string;
  year: number;
  type: "Journal" | "Conference" | "Book Chapter" | "Book" | "Review";
  doi?: string;
  publisher?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  citations: number;
  impactFactor?: number;
  abstract: string;
  pdfUrl?: string;
  link?: string;
}

export interface Patent {
  id: string;
  title: string;
  inventors: string[];
  patentNumber: string;
  applicationNumber: string;
  filingDate: string;
  grantDate?: string;
  country: string;
  status: "Granted" | "Published" | "Filed" | "Pending";
  technologyArea: string;
  description: string;
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  role: "Principal Investigator" | "Co-Investigator";
  fundingAgency: string;
  amount: string;
  duration: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  domain: string;
  description: string;
}

export interface ProfileData {
  name: string;
  designation: string;
  department: string;
  university: string;
  intro: string;
  about: {
    summary: string;
    researchPhilosophy: string;
    teachingPhilosophy: string;
  };
  stats: {
    experienceYears: number;
    publications: number;
    patents: number;
    projects: number;
    students: number;
    awards: number;
    citations: number;
    hIndex: number;
    i10Index: number;
  };
  social: {
    googleScholar: string;
    orcid: string;
    scopus: string;
    researchGate: string;
    linkedIn: string;
    github: string;
  };
}

export interface News {
  id: string;
  date: string;
  title: string;
  description: string;
  link?: string;
}

export interface Experience {
  id: string;
  role: string;
  institution: string;
  duration: string;
  description: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: number;
  description: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Event {
  id: string;
  category: "Organized Program" | "Workshop" | "FDP / STC / ISRO Course" | "Seminar & Training";
  title: string;
  date: string;
  location?: string;
  description?: string;
}
