export type Project = {
  title: string;
  shortTitle: string;
  description: string;
  impact?: string;
  stack: string[];
  category: "Featured" | "Web" | "Systems" | "Learning";
  status: "Public" | "Private";
  href?: string;
  featuredImage?: {
    src: string;
    alt: string;
    badge: string;
    fit?: "cover" | "contain";
    position?: string;
  };
};

export const featuredProjects: Project[] = [
  {
    title: "Ontario Crown Land Terrain Finder",
    shortTitle: "CrownLandFinder",
    description:
      "A GIS platform for finding Ontario crown land, exploring 3D terrain, measuring routes, and planning trips.",
    impact:
      "Streams geospatial vector tiles from PostGIS through FastAPI into an interactive Mapbox experience.",
    stack: ["React", "Next.js", "FastAPI", "PostGIS", "Mapbox", "AWS"],
    category: "Featured",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/CrownLandFinder",
    featuredImage: {
      src: "/Images/Featured/CrownLandFinder.png",
      alt: "Ontario Crown Land Open Terrain Finder map interface with crown land overlays across Ontario.",
      badge: "GIS PLATFORM",
      position: "center",
    },
  },
  {
    title: "TMU Baja Racing Website",
    shortTitle: "Toronto Met Baja",
    description:
      "The public web platform for TMU's oldest engineering design team. The team has more than 75 members and designs a new Baja vehicle each year.",
    impact:
      "Built with static generation, automated Firebase deployments, analytics, and a Google Drive workflow so gallery and sponsor updates can be made without code.",
    stack: ["Next.js 15", "React", "TypeScript", "HeroUI", "Firebase", "GA4"],
    category: "Featured",
    status: "Public",
    href: "https://torontometbaja.web.app/home/",
    featuredImage: {
      src: "/Images/Featured/TMBRWeb.png",
      alt: "Toronto Metropolitan Baja Racing website hero section featuring the Baja vehicle and team branding.",
      badge: "LIVE WEBSITE",
      position: "center top",
    },
  },
  {
    title: "Baja Embedded Systems",
    shortTitle: "TMU Baja Electrical",
    description:
      "Embedded telemetry and vehicle electronics for Toronto Metropolitan University's SAE racing team.",
    impact:
      "Leads more than 15 engineers while building custom RPM, gear position, and oil temperature sensing systems.",
    stack: ["C++", "Arduino", "Embedded Systems", "Sensors", "Agile"],
    category: "Featured",
    status: "Private",
    featuredImage: {
      src: "/Images/Featured/TMBREmbedded.png",
      alt: "PCB layout for the TMU Baja embedded systems and vehicle telemetry hardware.",
      badge: "PCB LAYOUT",
      fit: "contain",
    },
  },
];

export const archiveProjects: Project[] = [
  {
    title: "Farm2Cart",
    shortTitle: "Farm2Cart",
    description:
      "A containerized microservices marketplace connecting local producers and customers through a secure commerce platform.",
    impact:
      "Pairs Java and Tomcat services with dedicated MySQL databases, token authentication, Docker, and Kubernetes.",
    stack: ["Java", "Tomcat", "MySQL", "Docker", "Kubernetes", "REST"],
    category: "Web",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/farm2cart",
  },
  {
    title: "Custom Toast Playground",
    shortTitle: "custom-toast",
    description:
      "An interactive playground for creating, editing, and previewing custom toast notifications.",
    stack: ["JavaScript", "React", "CSS"],
    category: "Web",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/custom-toast",
  },
  {
    title: "IceCreamDBMS",
    shortTitle: "IceCreamDBMS",
    description: "Oracle database management system for an ice cream business.",
    stack: ["Oracle", "SQL", "HTML"],
    category: "Web",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/IceCreamDBMS",
  },
  {
    title: "DSA",
    shortTitle: "DSA",
    description: "Data structures and algorithms practice implemented in C.",
    stack: ["C", "Algorithms", "Data Structures"],
    category: "Learning",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/DSA",
  },
  {
    title: "Project Wordle",
    shortTitle: "project-wordle",
    description: "A Wordle clone built with React and supported by a Python backend.",
    stack: ["React", "JavaScript", "Python", "Heroku"],
    category: "Web",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/project-wordle",
  },
  {
    title: "Wordle Backend",
    shortTitle: "project-wordle-backend",
    description: "Backend services for the Wordle clone, deployed through Heroku.",
    stack: ["Python", "REST", "Heroku"],
    category: "Web",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/project-wordle-backend",
  },
  {
    title: "StudyBot",
    shortTitle: "StudyBot",
    description: "A Discord bot that sends reminders based on activity status.",
    stack: ["Python", "Discord API", "Automation"],
    category: "Systems",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/StudyBot",
  },
  {
    title: "Banking Project",
    shortTitle: "BankingProject",
    description: "A desktop banking application created with JavaFX.",
    stack: ["Java", "JavaFX", "OOP"],
    category: "Learning",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/BankingProject",
  },
  {
    title: "Minecraft Mod",
    shortTitle: "TutorialMCMod",
    description: "An early exploration of Java mod development for Minecraft.",
    stack: ["Java", "Minecraft"],
    category: "Learning",
    status: "Private",
  },
  {
    title: "Discord Theme Bot",
    shortTitle: "DiscordThemeBot",
    description:
      "A bot that combines Spotify and Discord APIs to play personal intro songs in voice channels.",
    stack: ["Python", "Spotify API", "Discord API"],
    category: "Systems",
    status: "Private",
  },
  {
    title: "Random Projects",
    shortTitle: "randProjects",
    description: "A collection of smaller Python experiments and prototypes.",
    stack: ["Python", "Prototyping"],
    category: "Learning",
    status: "Public",
    href: "https://github.com/SukhmanAulakh/randProjects",
  },
];

export const skillGroups = [
  {
    label: "Interfaces",
    skills: ["React.js", "Next.js", "TypeScript", "HeroUI", "Tailwind CSS"],
  },
  {
    label: "Backend & data",
    skills: ["FastAPI", "Flask", "PostgreSQL", "PostGIS", "MySQL", "REST APIs"],
  },
  {
    label: "Cloud & delivery",
    skills: ["AWS EC2", "Docker", "Kubernetes", "Nginx", "GitHub Actions", "Firebase"],
  },
  {
    label: "Systems",
    skills: ["C", "C++", "Java", "Python", "Arduino", "Linux"],
  },
];
