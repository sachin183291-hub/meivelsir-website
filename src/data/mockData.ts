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
    publications: 45,
    patents: 20,
    projects: 8,
    students: 150, // Placeholder
    awards: 4,
    citations: 0, // Need accurate data if available
    hIndex: 0,
    i10Index: 0,
  },
  social: {
    googleScholar: "https://scholar.google.com/citations?user=eedV8xUAAAAJ&hl=en&authuser=2",
    orcid: "https://orcid.org/0000-0002-8717-3881",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=57191913735",
    researchGate: "https://www.researchgate.net/profile/S-Meivel",
    linkedIn: "https://www.linkedin.com/in/meivel-s-b1885617a/",
    github: "https://github.com/meivels",
    researchId: "https://researchid.co/meivels",
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
    description: "Awarded Best Faculty in the year 2016-2017 in overall ECE department.",
  },
  {
    id: "awd-5",
    title: "Appreciation of the best academic Achievement",
    organization: "Jayshriram Group of Institutions, Tirupur",
    year: 2013,
    description: "Appreciated for best academic (2012-2013) achievement for four subjects in terms of 100% result.",
  },
  {
    id: "awd-6",
    title: "Appreciation of the best academic Achievement",
    organization: "VELTECH university, Chennai",
    year: 2010,
    description: "Appreciate certification of the best academic (2009-2010) achievement for seven subjects in terms of 100% result.",
  }
];

export const mockEstablishedLabs = [
  "Established B&R PLC lab in R&D campus, embedded system lab and RTOS lab in VEC.",
  "Established Embedded System lab, VLSI lab, & ESD lab in JSRGI & VEC.",
  "Established TBI cell (Technological Incubation Cell) in JSRGI."
];

export const mockMemberships = [
  "Indian Society of Remote Sensing (ISRS), 2019, MISRS Life time Member: L-5335",
  "IET Local Channel Membership: Life time Member, Chennai, IN, 2018",
  "IETE and MISTE Life time Member membership"
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
    id: "conf-23",
    title: "Multispectral image analysis of Agricultural Drone mapping using Biomass Vegetation Indices",
    journalOrConference: "2nd International Conference On Unmanned Aerial Systems In Geomatics",
    year: "2021",
    type: "Conference Proceeding",
    link: "https://iitr.ac.in/uasg2021/session_schedule.html",
    description: "Presented and Published paper on Multispectral image analysis of Agricultural Drone mapping using Biomass Vegetation Indices in India.",
  },
  {
    id: "conf-22",
    title: "Remote sensing analysis of Fever Detection using Multispectral Thermal images of Autonomous Disinfectant Sprayer Drone",
    journalOrConference: "2nd International Conference On Unmanned Aerial Systems In Geomatics",
    year: "2021",
    type: "Conference Proceeding",
    description: "Presented and Published paper on Remote sensing analysis of Fever Detection using Multispectral Thermal images of Autonomous Disinfectant Sprayer Drone in India.",
  },
  {
    id: "conf-21",
    title: "Remote sensing analysis of Transport monitoring drones using methods of the Internet of Vehicle Things (IoVT)",
    journalOrConference: "3rd International Conference on Unmanned Aerial System in Geomatics",
    year: "2023",
    type: "Conference Proceeding",
    description: "Presented and Published paper in Kuala Lumpur, Malaysia.",
  },
  {
    id: "conf-20",
    title: "Research and development of Drone-to-Drone 5G Communication system with security protocols",
    journalOrConference: "3rd International Conference on Unmanned Aerial System in Geomatics",
    year: "2023",
    type: "Conference Proceeding",
    link: "https://www.iitr.ac.in/uasg2023/papers.html",
    description: "Presented and Published paper in Kuala Lumpur, Malaysia.",
  },
  {
    id: "conf-19",
    title: "Technical Design of Agricultural UAV-Frame Mechanism",
    journalOrConference: "Scopus - International Journal of Control Theory and Applications",
    year: "2017",
    type: "Journal Article",
    link: "https://www.researchgate.net/publication/334363277_Technical_Design_of_Agricultural_UAV-Frame_Mechanism",
    description: "Presented and Published paper. Volume 10, Number 33, 2017, ISSN: 0974-5572.",
  },
  {
    id: "conf-18",
    title: "Advanced Liquid Organic Fertilizer Irrigation Management System for Combined Agriculture",
    journalOrConference: "Scopus - International Journal of Control Theory and Applications",
    year: "2017",
    type: "Journal Article",
    link: "https://www.researchgate.net/publication/326157167_Advanced_Liquid_Organic_Fertilizer_Irrigation_Management_System_for_Combined_Agriculture",
    description: "Presented and published paper. Volume 10, Number 33, 2017, ISSN: 0974-5572.",
  },
  {
    id: "conf-17",
    title: "UAV- Real Time Video Stabilization Using OPENCV Technical Analysis",
    journalOrConference: "International Journal of Innovative Research in Computer and Communication Engineering",
    year: "2017",
    type: "Journal Article",
    link: "https://ijircce.com/admin/main/storage/app/pdf/BAG50JI2FwO0wHrCPFrJh07XfjltyAkFPVoe1UVT.pdf",
    description: "Presented and published paper. Vol. 5, Issue 3, March 2017.",
  },
  {
    id: "conf-16",
    title: "Unmanned Agriculture System Model Design Using Programmable logic controller",
    journalOrConference: "International Journal of Innovative Research in Computer and Communication Engineering",
    year: "2017",
    type: "Journal Article",
    link: "https://www.researchgate.net/publication/337260875_Unmanned_Agriculture_System_Model_Design_using_PLC",
    description: "Presented and published paper. Vol. 5, Issue 3, March 2017.",
  },
  {
    id: "conf-15",
    title: "Disease Detection of Paddy Crops Using UAV Image Analysis",
    journalOrConference: "International Journal of Innovative Research in Computer and Communication Engineering",
    year: "2017",
    type: "Journal Article",
    link: "https://www.ijircce.com/article/disease-detection-of-paddy-crops-using-uav-image-analysiss-meivel-g-kalaiarasi-p-brindha-k-kows-1037",
    description: "Presented and Published paper. Vol. 5, Issue 3, March 2017.",
  },
  {
    id: "conf-14",
    title: "Remote sensing for urea spraying Agricultural (UAV) system",
    journalOrConference: "3rd international conference on advanced computing and communication systems (ICACCS)",
    year: "2016",
    type: "Conference Proceeding",
    link: "https://jglobal.jst.go.jp/en/detail?JGLOBAL_ID=201602272824001882",
    description: "Presented and Published IEEE paper.",
  },
  {
    id: "conf-13",
    title: "Wall paint Sprayer using Unmanned Aerial Vehicle",
    journalOrConference: "International Journal of Advanced Research Trends in Engineering and Technology (IJARTET)",
    year: "2016",
    type: "Journal Article",
    description: "Presented and published paper. Vol. 3, Special Issue 3, April 2016.",
  },
  {
    id: "conf-12",
    title: "Wall paint Sprayer using Unmanned Aerial Vehicle",
    journalOrConference: "Recent Trends in Electronics, Communication and Computation Technologies (ICRTECCT’16)",
    year: "2016",
    type: "Conference Proceeding",
    description: "Presented paper at Sri Ramanathan Engineering College, Tirupur.",
  },
  {
    id: "conf-11",
    title: "Flight Data Transmission at AIRPLANE Crash",
    journalOrConference: "Global Innovations in Computing Technology (ICGICT’16)",
    year: "2016",
    type: "Conference Proceeding",
    description: "Presented paper at Samuel College of Engineering, Auburn University, USA.",
  },
  {
    id: "conf-10",
    title: "Big data analytics, e-health network, live security systems",
    journalOrConference: "International conference on electronics and communication systems (ICECS)",
    year: "2016",
    type: "Conference Proceeding",
    description: "Presented papers on big data analytics for telecom, public e-health networks using arduino, and live security for children. Karpagam college of engineering.",
  },
  {
    id: "conf-9",
    title: "Quadcopter UAV based Fertilizer and Pesticide Spraying System",
    journalOrConference: "Multidisciplinary International Academic Research Conference (MIARC-2016)",
    year: "2016",
    type: "Conference Proceeding",
    link: "https://www.researchgate.net/publication/303453010_Quadcopter_UAV_Based_Fertilizer_and_Pesticide_Spraying_System",
    description: "Presented paper at Anna University – PSGIM - ARC, Coimbatore.",
  },
  {
    id: "conf-8",
    title: "Remote Sensing for Urea Spraying Agricultural UAV System",
    journalOrConference: "Recent Advanced Computing & Communication Systems",
    year: "2016",
    type: "Conference Proceeding",
    link: "https://www.researchgate.net/publication/308990115_Remote_sensing_for_UREA_Spraying_Agricultural_UAV_system",
    description: "Presented paper at Sri Eshwar College of Engineering Coimbatore.",
  },
  {
    id: "conf-7",
    title: "Sensorless of BLDC Motor drive using a Hysteresis comparator & back EMF Technique",
    journalOrConference: "Synergistic Evolutions in Engineering",
    year: "2015",
    type: "Conference Proceeding",
    description: "Presented IEEE paper at Surya Engineering College.",
  },
  {
    id: "conf-6",
    title: "Number Plate recognition on an Embedded Hardware",
    journalOrConference: "Recent Innovations in Engineering",
    year: "2014",
    type: "Conference Proceeding",
    description: "Presented paper at Sri Subramanian College of Engineering, Palani.",
  },
  {
    id: "conf-5",
    title: "Efficient MHealth System for Chronic Disease Patient",
    journalOrConference: "Recent innovations in Engineering (ICRIE ’14)",
    year: "2014",
    type: "Conference Proceeding",
    description: "Presented IEEE paper at Sri Subramanya college of Engineering and Technology, Palani.",
  },
  {
    id: "conf-4",
    title: "Number plate recognition system on an embedded hardware",
    journalOrConference: "Advances on Engineering and Technology (ICAET) by IRAJ",
    year: "2014",
    type: "Conference Proceeding",
    description: "Presented IEEE paper in Chennai.",
  },
  {
    id: "conf-3",
    title: "Embedded Networking Management",
    journalOrConference: "Re-visiting Management Changes in the Global Scenario",
    year: "2012",
    type: "Conference Proceeding",
    description: "Presented IEEE paper.",
  },
  {
    id: "conf-2",
    title: "System on chip",
    journalOrConference: "International Conference on System on chip",
    year: "2009",
    type: "Conference Proceeding",
    description: "Presented IEEE paper at MIT campus, Chennai.",
  },
  {
    id: "conf-1",
    title: "Health care Monitoring for mobile patients",
    journalOrConference: "Electronic Design & signal Processing",
    year: "2009",
    type: "Conference Proceeding",
    description: "Presented IEEE Paper at Manipal university, Manipal.",
  }
];
