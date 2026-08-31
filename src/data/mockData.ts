import { ProfileData, Project, Education } from "../types";

export const profileData: ProfileData = {
  name: "Dr. S. Meivel",
  designation: "Associate Professor | R&D in Remote Sensing of Drones Design and Testing",
  department: "Department of Electronics and Communication Engineering",
  university: "M.Kumarasamy College of Engineering, Karur",
  intro: "Teaching professional with 17+ years experience in the design and development of drones, IoT, embedded systems, and networking. Excellent at building R&D-level projects.",
  about: {
    summary: "Dr. S. Meivel completed a Ph.D in remote sensing of agricultural drones in January 2023. He has 17 years of teaching experience and 3 years of industrial experience. He coordinates the Texas Instruments Innovation Centre Lab for the business and entrepreneurship development of students. He has published 7 SCI journals and 22 Scopus journals, and has several granted international and Indian patents.",
    researchPhilosophy: "My research focuses on the technical challenges of IoT and drone hardware, remote sensing analysis, multispectral image processing, and drone programming for real-world applications.",
    teachingPhilosophy: "I aim to impart practical knowledge through R&D-level projects and value-added courses, guiding UG and PG students in innovative technologies.",
  },
  stats: {
    experienceYears: 17,
    publications: 29,
    patents: 22,
    projects: 8,
    students: 100, // Placeholder
    awards: 4,
    citations: 0, // Need accurate data if available
    hIndex: 0,
    i10Index: 0,
  },
  social: {
    googleScholar: "#",
    orcid: "#",
    scopus: "#",
    researchGate: "#",
    linkedIn: "#",
    github: "#",
  }
};

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    title: "Production of Atmega328P board for Garments machine operations",
    role: "Consultancy Project Co-Ordinator and Project Guide",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 25,000",
    duration: "2024 - 2025",
    status: "Active",
    domain: "Embedded Systems",
    description: "Production of Atmega328P board for Garments machine operations.",
  },
  {
    id: "proj-2",
    title: "IoT Battery Management System and IoT Thermometer",
    role: "Consultancy Project Co-Ordinator and Project Guide",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 8,000",
    duration: "2020",
    status: "Completed",
    domain: "IoT",
    description: "IoT Battery Management System and IoT Thermometer.",
  },
  {
    id: "proj-3",
    title: "Design and Development of Fire Fighting Drone",
    role: "Research Project Co-Ordinator",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 97,500",
    duration: "2019",
    status: "Completed",
    domain: "Drone Technology",
    description: "Design and Development of Fire Fighting Drone.",
  },
  {
    id: "proj-4",
    title: "Design and Development of Vegetables Delivery Drone using CNN algorithms",
    role: "Research Project Co-Ordinator",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 2,34,200",
    duration: "2019",
    status: "Completed",
    domain: "Drone Delivery & AI",
    description: "Design and Development of Vegetables Delivery Drone using CNN algorithms.",
  },
  {
    id: "proj-5",
    title: "Design of Real Time Pesticide Drone & Sprayer",
    role: "Research Project Co-Ordinator",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 1,87,500",
    duration: "2020",
    status: "Completed",
    domain: "Agricultural Drones",
    description: "Design of Real Time Pesticide Drone & Sprayer.",
  },
  {
    id: "proj-6",
    title: "Real Time Pesticide Drone",
    role: "Research Project Co-Ordinator",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 1,87,500",
    duration: "2017",
    status: "Completed",
    domain: "Agricultural Drones",
    description: "Real Time Pesticide Drone.",
  },
  {
    id: "proj-7",
    title: "Real Time Fertilizer -using Quadcopter",
    role: "Research Project Co-Ordinator",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 92,817",
    duration: "2016",
    status: "Completed",
    domain: "Agricultural Drones",
    description: "Real Time Fertilizer -using Quadcopter.",
  },
  {
    id: "proj-8",
    title: "E-Health Bio Sensor System",
    role: "Research Project Co-Ordinator",
    fundingAgency: "Consultancy / R&D",
    amount: "Rs. 1,26,140",
    duration: "2015",
    status: "Completed",
    domain: "Biomedical Systems",
    description: "E-Health Bio Sensor System.",
  }
];

export const mockNews = [
  {
    id: "news-1",
    date: "January, 2023",
    title: "Ph.D. Awarded",
    description: "Completed Ph.D. in Remote sensing of Agricultural Drone design and development from Anna University.",
  },
  {
    id: "news-2",
    date: "2023",
    title: "Best Faculty Award",
    description: "Awarded Best Faculty (Performer in Journals and Patents) at M.Kumarasamy College of Engineering, Karur.",
  },
  {
    id: "news-3",
    date: "2024",
    title: "Young Scientist Award",
    description: "Received 'Young Scientist' award from IIERD for publishing 5 SCIs and 11 granted patents from 2021 to 2024.",
  }
];

export const mockExperience = [
  {
    id: "exp-1",
    role: "Associate Professor / ECE",
    institution: "M.Kumarasamy College of Engineering, Karur",
    duration: "18.06.2018 - Present",
    description: "Teaching, guiding UG/PG students, conducting research in remote sensing analysis, IoT controllers, and drone programming. Coordinating Texas Instruments Innovation Centre Lab.",
  },
  {
    id: "exp-2",
    role: "Assistant Professor / ECE",
    institution: "Jayshriram Group of Institutions, Tirupur",
    duration: "07.11.2011 - 31.10.2017",
    description: "Teaching professional courses and contributing to academic and research activities.",
  },
  {
    id: "exp-3",
    role: "Assistant Professor / ECE",
    institution: "Veltech Dr.RR & Dr.SR Technical University, Chennai",
    duration: "07.07.2008 - 27.09.2011",
    description: "Teaching professional courses and contributing to academic and research activities.",
  },
  {
    id: "exp-4",
    role: "Embedded Software Engineer",
    institution: "ProSys software Private Ltd, Bangalore",
    duration: "07.06.2003 - 06.07.2008",
    description: "Worked as a RTOS Engineer and Embedded Software Engineer developing industrial solutions.",
  }
];

export const mockAwards = [
  {
    id: "awd-1",
    title: "Young Scientist Award",
    organization: "International Institute of Education, Research, and Development (IIERD)",
    year: 2024,
    description: "Awarded for publishing 5 SCIs and 11 granted patents from 2021 to 2024.",
  },
  {
    id: "awd-2",
    title: "Best Performer for Patent and Journals",
    organization: "M.Kumarasamy College of Engineering, Karur",
    year: 2024,
    description: "Recognized as the best performer for Patent and Journals in MKCE.",
  },
  {
    id: "awd-3",
    title: "Best Faculty (Performer in Journals and Patents)",
    organization: "M.Kumarasamy College of Engineering, Karur",
    year: 2023,
    description: "Awarded Best Faculty (Performer in Journals and Patents).",
  },
  {
    id: "awd-4",
    title: "Best Faculty",
    organization: "Jai Shriram Engineering College, Tirupur",
    year: 2016,
    description: "Awarded Best Faculty in the year 2016.",
  }
];

export const mockResearchAreas = [
  {
    id: "ra-1",
    title: "Drone Design & Remote Sensing",
    description: "Designing, developing, and surveying agricultural land using drones and Pix4D mapper. Specializing in multispectral image processing.",
  },
  {
    id: "ra-2",
    title: "Embedded System Design",
    description: "Hardware design of embedded systems using ESP8266, Raspberry Pi, and Atmega328p microcontrollers for various applications.",
  },
  {
    id: "ra-3",
    title: "IoT & AI Controllers",
    description: "Programming in Python for IoT and developing drone flight controllers using Artificial Intelligence and Machine Learning technologies.",
  }
];

export const mockEducation: Education[] = [
  {
    id: "edu-1",
    degree: "Ph.D. in Remote sensing of Agricultural Drone design and development",
    institution: "Kongu Engineering College, Perundurai (Anna University)",
    year: "Jan 2023",
    description: "Ph.D degree Awarded."
  },
  {
    id: "edu-2",
    degree: "ME in Embedded System and technologies",
    institution: "Sriram Engineering College, Avadi, Chennai (Anna University)",
    year: "April 2007",
    description: "75% First class."
  },
  {
    id: "edu-3",
    degree: "BE in Electronics and communication engineering",
    institution: "PGP Engineering College, Namakkal (Periyar University)",
    year: "May 2003",
    description: "74% First class with Distinction."
  },
  {
    id: "edu-4",
    degree: "DECE",
    institution: "SCSM polytechnic college, Mohanur (State board of technical education)",
    year: "April 2000",
    description: "85% First class with Distinction."
  },
  {
    id: "edu-5",
    degree: "SSLC",
    institution: "Govt. Higher Secondary school, Mohanur (State board of Tamilnadu)",
    year: "April 1995",
    description: "77% First class"
  }
];

export const mockExpertise = [
  "Drone Design and Development", 
  "IoT & Embedded Systems (ESP8266, Raspberry Pi, Atmega328p)", 
  "Remote Sensing and Multispectral Image Analysis", 
  "Artificial Intelligence & Machine Learning", 
  "Python Programming",
  "Agricultural Drone Surveying (Pix4D mapper)"
];

export const mockPublications = [
  {
    id: "pub-1",
    title: "Remote sensing of Agricultural Drone design and development",
    journal: "Ph.D. Thesis, Anna University",
    year: "2023",
    type: "Thesis",
    link: "#",
    description: "Design and development of drone for agricultural remote sensing.",
  },
  {
    id: "pub-2",
    title: "Various SCI Journals and Patents",
    journal: "Various SCI Journals",
    year: "2021-2024",
    type: "Journal Article",
    link: "#",
    description: "5 SCIs and 11 granted patents from 2021 to 2024.",
  }
];
