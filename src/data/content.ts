/* Central fallback content for the portfolio.
   Components try the live API first and fall back to these values. */

export const PROFILE = {
  firstName: "Tanvir",
  lastName: "Chowdhury",
  fullName: "Md. Tanvir Chowdhury",
  monogram: "TC",
  role: "Web Developer · AI Automation · Marketing",
  tagline:
    "I design and build websites, AI automations and marketing engines for founders and small businesses — so you can grow without hiring a whole team.",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  email: "tanvir.chowdhury.us@gmail.com",
  phone: "+8801644916069",
  whatsapp: "https://wa.me/+8801644916069",
  calendly: "https://calendly.com/tanvir-chowdhury-us/meet",
  cv: "Tanvir-Chowdhury-CV.pdf",
};

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Tanvir-Chowdhury" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/grow-with-vir/" },
  { label: "Facebook", href: "https://www.facebook.com/tanvir.11744" },
  { label: "WhatsApp", href: "https://wa.me/+8801644916069" },
  { label: "Email", href: "mailto:tanvir.chowdhury.us@gmail.com" },
];

export const STATS = [
  { value: 20, suffix: "+", label: "Clients worked with" },
  { value: 500, suffix: "K+", label: "Organic reach, one campaign" },
  { value: 30, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "x", label: "ROI on an e-commerce venture" },
];

export const MARQUEE_ITEMS = [
  "Web Apps",
  "AI Automation",
  "Branding",
  "E-Commerce",
  "Marketing",
  "Data",
  "WordPress",
  "Chatbots",
];

export interface Service {
  id: string;
  title: string;
  description: string;
  goodFor: string[];
}

export const SERVICES: Service[] = [
  {
    id: "web",
    title: "Web Development",
    description:
      "Fast, modern websites and web apps — from landing pages to full platforms and online stores. Built to look great, load fast, and turn visitors into customers.",
    goodFor: ["Landing pages & portfolios", "Online stores", "Web apps & dashboards", "WordPress sites"],
  },
  {
    id: "ai",
    title: "AI & Automation",
    description:
      "Chatbots, AI assistants and workflow automations that answer your customers and handle repetitive work — around the clock, without hiring.",
    goodFor: ["Customer-support bots", "Assistants trained on your data", "Scrapers & internal tools", "Content generation"],
  },
  {
    id: "marketing",
    title: "Marketing & Growth",
    description:
      "Campaigns, content and branding grounded in real data. From social media to a full brand identity — designed to grow reach and revenue.",
    goodFor: ["Social media campaigns", "Brand identity", "Content engines", "Ad performance analysis"],
  },
  {
    id: "data",
    title: "Data & Analytics",
    description:
      "Dashboards and analysis that show what's actually working — so your next decision is a fact, not a guess.",
    goodFor: ["Performance dashboards", "Competitor research", "Data visualizations", "Reporting automations"],
  },
];

export type ProjectArtKey =
  | 'schedule' | 'shield' | 'space' | 'telegram' | 'stream' | 'shorts'
  | 'reach' | 'brand' | 'ads' | 'rival' | 'caption' | 'scraper'
  | 'olympics' | 'sow' | 'connect' | 'rag' | 'neural' | 'live'
  | 'fruit' | 'sale' | 'duo'
  | 'browser' | 'phone' | 'chart' | 'bot' | 'card'; // fallbacks

export interface Project {
  title: string;
  category: "web" | "ai" | "marketing" | "data";
  categoryLabel: string;
  type: string;
  description: string;
  outcome?: string;
  details?: string;
  technologies: string[];
  demo?: string;
  github?: string;
  art: ProjectArtKey;
}

export const PROJECTS: Project[] = [
  {
    title: "NSU Class Schedule Manager",
    category: "ai",
    categoryLabel: "AI & Automation",
    type: "Full-stack platform",
    description:
      "Students at NSU used to untangle conflicting routine PDFs. This platform auto-builds the whole university schedule and answers questions about it in plain language.",
    outcome: "Auto-scheduling + a RAG assistant synced with live data",
    details:
      "Intelligent auto-scheduling (room prioritization, teacher preferences, lab/theory consistency), admin/teacher/student portals, notifications, and a context-aware RAG chatbot backed by Pinecone that stays in sync with the live PostgreSQL data. One-click Google Calendar sync for the full semester.",
    technologies: ["FastAPI", "PostgreSQL", "Pinecone", "Mistral AI", "React", "Tailwind CSS"],
    github: "https://github.com/Tanvir-Chowdhury/NSU-Class-Schedule-Management-System",
    art: 'schedule',
  },
  {
    title: "WebShieldAI",
    category: "ai",
    categoryLabel: "AI & Automation",
    type: "SaaS platform",
    description:
      "Websites get broken into every day. WebShieldAI watches a site in real time, spots intrusions like SQLi, XSS and defacement with ML models, and defends automatically.",
    outcome: "LSTM + CNN defense against zero-day threats",
    details:
      "LSTM models for SQL injection detection, CNN models for defacement identification, and automated defense mechanisms that react faster than traditional firewalls and IDS rules.",
    technologies: ["Vue.js", "FastAPI", "PostgreSQL", "Machine Learning"],
    github: "https://github.com/Tanvir-Chowdhury/WebShieldAI",
    art: 'shield',
  },
  {
    title: "NASA Space Apps — AI Research Assistant",
    category: "ai",
    categoryLabel: "AI & Automation",
    type: "RAG assistant",
    description:
      "Space research is buried in NASA's open data. This assistant reads it for you and answers questions with sources — built live for the NASA Space Apps Challenge 2025.",
    outcome: "Source-attributed answers over NASA's OSDR data",
    details:
      "RAG pipeline combining a Pinecone vector database with NASA's Open Science Data Repository API for dual search, topic extraction, and cited answers about space research and missions. Deployed live on Vercel.",
    technologies: ["FastAPI", "Google Gemini", "Pinecone", "NASA OSDR API"],
    demo: "https://3js-test-theta.vercel.app/",
    github: "https://github.com/Tanvir-Chowdhury/AI-and-RAG-Based-Chatbot-with-Gaming-Experience",
    art: 'space',
  },
  {
    title: "Phoenix Telegram Bot 2.0",
    category: "ai",
    categoryLabel: "AI & Automation",
    type: "Telegram bot",
    description:
      "Admission students had questions at 2am and no one to ask. This bot solves doubts 24/7 in Telegram — text or a photo of the question, it explains step by step.",
    outcome: "Live 24/7 assistant for admission candidates",
    details:
      "Covers Math, English, Analytical Ability and General Knowledge. Students mention the bot in groups or send images of questions and get student-friendly, step-by-step explanations. Deployed live on Vercel for Phoenix Education.",
    technologies: ["Python", "Telegram Bot API", "Vercel"],
    demo: "https://phoenix-telegram-bot-2-0-btt1.vercel.app",
    github: "https://github.com/Tanvir-Chowdhury/Phoenix_Telegram_bot_2.0",
    art: 'telegram',
  },
  {
    title: "StreamFlex",
    category: "web",
    categoryLabel: "Web Development",
    type: "Streaming platform",
    description:
      "A complete movie streaming business in one platform: buy or subscribe, pay securely, and manage the whole catalog from an admin dashboard.",
    outcome: "Payments, subscriptions & admin tools end to end",
    details:
      "User authentication, movie purchase and subscription flows, integrated payment gateways, IMDB/TMDB-powered catalog, and an admin dashboard for content management.",
    technologies: ["PHP", "JavaScript", "Payment Gateway", "IMDB API", "TMDB API"],
    github: "https://github.com/Tanvir-Chowdhury/StreamFlex_movie_streaming_platform",
    art: 'stream',
  },
  {
    title: "Short-flix",
    category: "web",
    categoryLabel: "Web Development",
    type: "Full-stack app",
    description:
      "A Netflix-style home for short videos — search, filter and favorite clips, with the frontend and serverless backend shipped together on Vercel.",
    outcome: "Monorepo deploy: React 19 frontend + Python API",
    details:
      "React 19 + Vite frontend with a Python serverless backend deployed natively on Vercel. Search, filtering and favoriting, combining static frontend and serverless API routes in one deploy.",
    technologies: ["React 19", "Vite", "Tailwind CSS", "Python (Serverless)"],
    github: "https://github.com/Tanvir-Chowdhury/Short-flix",
    art: 'shorts',
  },
  {
    title: "500K Organic Reach Campaign",
    category: "marketing",
    categoryLabel: "Marketing",
    type: "Growth campaign",
    description:
      "Half a million people reached without a taka of ad spend — through strategic content, influencer partnerships and relentless data-driven optimization.",
    outcome: "500K+ organic reach for a tech startup",
    details:
      "Led a comprehensive digital marketing campaign achieving 500K+ organic reach using strategic content creation, influencer partnerships, and data-driven optimization to maximize engagement and brand awareness.",
    technologies: ["Content Strategy", "Facebook", "Analytics", "Influencers"],
    art: 'reach',
  },
  {
    title: "Brand Identity Studio",
    category: "marketing",
    categoryLabel: "Marketing",
    type: "Branding",
    description:
      "Logos, guidelines and a full digital presence for 20+ clients — one consistent identity everywhere their customers look.",
    outcome: "20+ brands built; recognition up ~3x on average",
    details:
      "Comprehensive brand identities including logo design, brand guidelines, marketing materials, and digital presence strategy for 20+ clients.",
    technologies: ["Figma", "Adobe Creative Suite", "Brand Strategy", "Market Research"],
    art: 'brand',
  },
  {
    title: "Ad Analyzer",
    category: "marketing",
    categoryLabel: "Marketing",
    type: "Automation tool",
    description:
      "Reviewing ad performance by hand eats days. This tool pulls the numbers together and shows which creatives and audiences are actually working.",
    outcome: "Budget decisions in minutes, not days",
    details:
      "Built for Automata One / Phoenix Education. Pulls ad metrics together and highlights which campaigns, creatives, and audiences are over- or under-performing.",
    technologies: ["Marketing Automation", "Data Analysis"],
    art: 'ads',
  },
  {
    title: "Competitor Analyzer",
    category: "marketing",
    categoryLabel: "Marketing",
    type: "Automation tool",
    description:
      "Know what your competitors are running before they outflank you — campaigns, content and positioning tracked in one place automatically.",
    outcome: "Live market picture for strategy & planning",
    details:
      "Systematically monitors competitor publishing and campaigns instead of manual checking. Feeds marketing strategy and content planning with a single view of market activity.",
    technologies: ["Marketing Automation", "Data Analysis"],
    art: 'rival',
  },
  {
    title: "Caption Writer",
    category: "marketing",
    categoryLabel: "Marketing",
    type: "Content automation",
    description:
      "A steady content calendar needs a steady flow of captions. This tool drafts them automatically and keeps the team publishing.",
    outcome: "First drafts generated, publishing time cut",
    details:
      "Generates first-draft captions for social media and video posts, reducing time spent writing copy from scratch for high-volume publishing.",
    technologies: ["Marketing Automation", "Content Generation"],
    art: 'caption',
  },
  {
    title: "Post Scraper",
    category: "marketing",
    categoryLabel: "Marketing",
    type: "Automation tool",
    description:
      "Social listening without the copy-paste: posts and engagement numbers collected automatically, ready for analysis.",
    outcome: "Content performance data on autopilot",
    details:
      "Automatically pulls posts and engagement metrics from social platforms, feeding downstream analysis of what content performs best.",
    technologies: ["Marketing Automation", "Data Scraping"],
    art: 'scraper',
  },
  {
    title: "DataLens — Paris Olympics 2024",
    category: "data",
    categoryLabel: "Data & Analytics",
    type: "Data visualization",
    description:
      "Olympic data turned into charts anyone can explore — with accounts, so each visitor keeps their own view of the games.",
    outcome: "C++ + Matplotplusplus visual analysis app",
    details:
      "Lightweight visualization platform where users register, log in, and explore visual insights about the Paris Olympics 2024. Matplotplusplus generates the charts and graphs.",
    technologies: ["C++", "Matplotplusplus"],
    github: "https://github.com/Tanvir-Chowdhury/DataLens",
    art: 'olympics',
  },
  {
    title: "Analytics Scope of Work",
    category: "data",
    categoryLabel: "Data & Analytics",
    type: "Consulting document",
    description:
      "A complete project blueprint for a data analytics engagement — objectives, deliverables, methodology — written the way real projects start.",
    outcome: "Google Data Analytics capstone artifact",
    details:
      "Comprehensive scope-of-work document outlining objectives, deliverables, methodologies and expected outcomes of a data analytics project, completed alongside Google's Data Analytics course.",
    technologies: ["Data Analytics", "Project Scoping"],
    demo: "https://docs.google.com/document/d/1AsfpSiIuYQ6VRTfmJ4THzvnmkh9MwOspyiEWhhQhFjM/edit?usp=sharing&resourcekey=0-w3t4mGtPKYt6-fhToimgpg",
    art: 'sow',
  },
  {
    title: "BizConnect",
    category: "web",
    categoryLabel: "Web Development",
    type: "Portal frontend",
    description:
      "A meeting place where investors discover startups, founders recruit student talent, and students get real-world exposure.",
    outcome: "Modern responsive portal UI",
    details:
      "Frontend for a portal bridging investors, founders and students. Investors discover startups, founders recruit student collaborators, students gain real-world exposure. Built with Tailwind CSS and Daisy UI.",
    technologies: ["React.js", "Tailwind CSS", "Daisy UI", "JavaScript"],
    github: "https://github.com/Tanvir-Chowdhury/BizConnect-frontend",
    art: 'connect',
  },
  {
    title: "RAG Chatbot Backend",
    category: "ai",
    categoryLabel: "AI & Automation",
    type: "Backend system",
    description:
      "The plumbing behind a production AI assistant: retrieval pipeline, auth, chat history and scheduled jobs — ready for any frontend to plug in.",
    outcome: "JWT auth, persistent history, scheduled tasks",
    details:
      "RAG pipeline integrating Pinecone for vector storage and Mistral AI for generation, with JWT authentication, background email verification, persistent chat history, and scheduled maintenance via APScheduler.",
    technologies: ["Django", "DRF", "Pinecone", "Mistral AI", "JWT"],
    github: "https://github.com/Tanvir-Chowdhury/Backend-Only-AI-Chatbot",
    art: 'rag',
  },
  {
    title: "Deep Learning Lab",
    category: "ai",
    categoryLabel: "AI & Automation",
    type: "Neural networks",
    description:
      "Two classic problems, two trained networks: telling tumors benign or malignant, and reading handwritten digits — preprocessing to evaluation, end to end.",
    outcome: "Reproducible Jupyter notebooks",
    details:
      "Neural network models for breast cancer classification and handwritten digit recognition, implemented as self-contained Jupyter notebooks covering data preprocessing, architecture, training, and evaluation.",
    technologies: ["Python", "Jupyter", "Neural Networks"],
    github: "https://github.com/Tanvir-Chowdhury/Deep-Learning-Projects",
    art: 'neural',
  },
  {
    title: "Dynamic API Dashboard",
    category: "web",
    categoryLabel: "Web Development",
    type: "Frontend build",
    description:
      "A live-data page that pulls from external APIs and renders in real time — proof that a fast, interactive frontend doesn't need to be heavy.",
    outcome: "Real-time data with a responsive interface",
    details:
      "Dynamic, responsive webpage showcasing seamless API integration for real-time data rendering, with reusable Tailwind UI components and JavaScript-powered interactivity.",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    demo: "https://64fc5f9c61818b5d2c9fdb82--taupe-scone-4a636f.netlify.app/",
    art: 'live',
  },
  {
    title: "Fruit Burst",
    category: "web",
    categoryLabel: "Web Development",
    type: "Landing page",
    description:
      "A crisp, responsive product landing page — creative layout, mobile-first, and fast.",
    outcome: "Responsive Tailwind showcase page",
    details:
      "Fruit-themed webpage combining creative design with technical implementation using Tailwind CSS, responsive across desktop and mobile.",
    technologies: ["HTML", "Tailwind CSS"],
    demo: "https://tanvir-chowdhury.github.io/fruit-burst/",
    github: "https://github.com/Tanvir-Chowdhury/fruit-burst",
    art: 'fruit',
  },
  {
    title: "Summer Sale Page",
    category: "web",
    categoryLabel: "Web Development",
    type: "Landing page",
    description:
      "A themed campaign page with interactive JavaScript — the kind of page a store needs for every sale season.",
    outcome: "Interactive campaign landing page",
    details:
      "Minimalistic summer-sale themed website using HTML and CSS for layout and JavaScript for interactivity.",
    technologies: ["JavaScript", "Tailwind CSS", "HTML"],
    demo: "https://64e498dbcc370e033b488a32--sweet-elf-5cccfa.netlify.app/",
    art: 'sale',
  },
  {
    title: "Gamer Zone & Flower Shop",
    category: "web",
    categoryLabel: "Web Development",
    type: "Starter sites",
    description:
      "Two clean starter sites — a gaming community page and an e-commerce-style shop — showing clean layout and product-first design.",
    outcome: "Two responsive starter sites",
    details:
      "Static websites focused on accessibility and ease of navigation: a community page for gamers and a product-based flower shop layout.",
    technologies: ["HTML", "CSS"],
    demo: "https://tanvir-chowdhury.github.io/fruit-burst/",
    art: 'duo',
  },
];

export interface SkillGroup {
  area: string;
  skills: { name: string; weight: number }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    area: "Frontend",
    skills: [
      { name: "React", weight: 1.5 },
      { name: "Next.js", weight: 1.2 },
      { name: "Vue.js", weight: 1 },
      { name: "Angular", weight: 0.9 },
      { name: "TypeScript", weight: 1.3 },
      { name: "JavaScript", weight: 1.4 },
      { name: "HTML/CSS", weight: 1.2 },
      { name: "Tailwind CSS", weight: 1.3 },
      { name: "Flutter", weight: 0.9 },
    ],
  },
  {
    area: "Backend",
    skills: [
      { name: "Node.js", weight: 1.2 },
      { name: "Express.js", weight: 1 },
      { name: "Python", weight: 1.5 },
      { name: "FastAPI", weight: 1.4 },
      { name: "Django", weight: 1.1 },
      { name: "PHP", weight: 1 },
    ],
  },
  {
    area: "Database",
    skills: [
      { name: "PostgreSQL", weight: 1.3 },
      { name: "MySQL", weight: 1 },
      { name: "MongoDB", weight: 1.1 },
      { name: "Pinecone", weight: 1.2 },
    ],
  },
  {
    area: "AI & ML",
    skills: [
      { name: "Machine Learning", weight: 1.2 },
      { name: "RAG / LLMs", weight: 1.5 },
      { name: "TensorFlow", weight: 1 },
    ],
  },
  {
    area: "DevOps & Cloud",
    skills: [
      { name: "Docker", weight: 1 },
      { name: "AWS", weight: 1 },
      { name: "Git", weight: 1.2 },
    ],
  },
  {
    area: "Design & Tools",
    skills: [
      { name: "Figma", weight: 1.1 },
      { name: "UI/UX Design", weight: 1.1 },
      { name: "WordPress", weight: 1.3 },
    ],
  },
];

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  line: string;
  achievements?: string[];
  current?: boolean;
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "2026 —",
    role: "Marketing Growth & Automation Specialist",
    company: "Automata One",
    location: "Dhaka · Hybrid",
    line: "Building the automation behind a marketing team: ad analyzer, competitor tracker, post scraper — plus leading full marketing for Phoenix Education.",
    achievements: ["Ad analyzer tool", "Competitor analyzer", "Post scraper", "Leading Phoenix Education marketing"],
    current: true,
  },
  {
    period: "2025",
    role: "Sub-Team Lead, Marketing",
    company: "Phoenix Education",
    location: "Dhaka · Part-time",
    line: "Led a sub-team inside the marketing department — planning, management and delivery.",
    achievements: ["Team management", "Team leadership"],
  },
  {
    period: "2025",
    role: "Junior Executive, PR & Marketing",
    company: "Phoenix Education",
    location: "Dhaka · Part-time",
    line: "Rebuilt the official website from scratch, created 150+ posts and 50+ posters, and grew page followers by 25%+ with reach in the millions.",
    achievements: ["Website redesign", "150+ posts, 50+ posters", "25%+ follower growth", "Millions in reach"],
  },
  {
    period: "2024",
    role: "Social Media Content Writer",
    company: "Phoenix Education",
    location: "Dhaka · Part-time",
    line: "Wrote and produced the brand's social media content.",
    achievements: ["Social media marketing", "Branding"],
  },
  {
    period: "2024",
    role: "Founder & CEO",
    company: "Ask for Branding",
    location: "Remote · Freelance",
    line: "Founded a branding studio serving 20+ companies and clients — with organic reach past 500K.",
    achievements: ["20+ client projects", "500K+ organic reach"],
    current: true,
  },
  {
    period: "2023",
    role: "Founder",
    company: "Your Gadgets",
    location: "Remote · Full-time",
    line: "Built and ran an e-commerce store on self-taught marketing — a 3x return on investment.",
    achievements: ["3x ROI"],
  },
  {
    period: "2023",
    role: "Web Developer",
    company: "Phoenix Admission Care",
    location: "Remote · Part-time",
    line: "Built a dynamic WordPress website with custom CSS for an education business.",
    achievements: ["WordPress + custom CSS site"],
  },
  {
    period: "2022",
    role: "Typist",
    company: "ROOTs Edu",
    location: "Remote · Part-time",
    line: "Turned lecture slides into clean, print-ready book chapters — math and figures included.",
  },
  {
    period: "2021",
    role: "Campus Ambassador Intern",
    company: "International MUN",
    location: "Remote · Part-time",
    line: "Promoted IMUN on campus and joined online conferences.",
  },
  {
    period: "2019",
    role: "WordPress Theme Customizer",
    company: "Fiverr",
    location: "Remote · Freelance",
    line: "Five projects, five-star reviews — two Telegram bots and three WordPress builds. Where it all started.",
    achievements: ["5-star reviews"],
  },
];

export const EDUCATION = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "North South University",
    period: "2022 — Present",
    extra: "GPA 3.40",
  },
  {
    degree: "HSC · Science",
    institution: "Dhaka Residential Model College",
    period: "2020 — 2021",
    extra: "GPA 5.00",
  },
];

export const AWARDS = [
  { title: "Bronze Prize — Climate Science Olympiad", year: "2023", note: "Top 0.2% of 50,600 participants" },
  { title: "Regional Winner & Semifinalist — Hult Prize", year: "2023", note: "Represented Bangladesh in the global semifinals" },
  { title: "On-Campus Winner — Hult Prize BGCTUB", year: "2023", note: "" },
  { title: "2nd Runner-Up — DRMC National Science Carnival", year: "2020", note: "Project Display" },
];

export const CERTIFICATES = [
  { title: "NASA Space Apps Challenge 2025", issuer: "NASA" },
  { title: "Mastering Machine Learning Fundamentals", issuer: "IEEE NSU" },
  { title: "Prepare Data for Exploration", issuer: "Google" },
  { title: "Ask Questions to Make Data-Driven Decisions", issuer: "Google" },
  { title: "Foundations: Data, Data, Everywhere", issuer: "Google" },
  { title: "Digital Marketing Agency", issuer: "Udemy" },
  { title: "Data Science Short Course", issuer: "NSU ACM-W" },
  { title: "Corporate Presentation Skills", issuer: "Grameenphone Academy" },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    text: "We talk about your goals — a quick, free call. You explain the problem in plain words; I ask the right questions.",
  },
  {
    step: "02",
    title: "Plan & quote",
    text: "You get a clear scope, timeline and price before anything starts. No jargon, no surprises later.",
  },
  {
    step: "03",
    title: "Build & review",
    text: "I build in small pieces you can actually see and try. Your feedback shapes it as we go.",
  },
  {
    step: "04",
    title: "Launch & support",
    text: "We ship, you get everything handed over — and I stay available after launch.",
  },
];

