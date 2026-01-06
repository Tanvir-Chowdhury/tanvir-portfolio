import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Github, Eye, Code, Database, Palette, BarChart3, Globe, Smartphone } from 'lucide-react';
import * as api from '@/api';

const Projects = () => {
  const [projectsData, setProjectsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.getProjects();
        if (response.data && response.data.length > 0) {
          setProjectsData(response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const initialProjectCategories = {
    fullstack: {
      title: "Web Development",
      icon: <Code className="w-4 h-4" />,
      projects: [
{
  title: "WebShieldAI - AI Powered Web Intrusion Detection and Auto-Defense SaaS Platform",
  description: "An AI-powered SaaS platform for real-time website intrusion detection and automated defense against cyber threats such as SQLi, XSS, DOM manipulation, and defacement.",
  technologies: ["Vue.js", "FastAPI", "PostgreSQL", "JavaScript"],
  details: "Developed a scalable SaaS security solution that leverages LSTM models for SQL injection detection and CNN models for website defacement identification. The platform integrates with modern web stacks to provide automated defense mechanisms, delivering better protection against evolving zero-day threats compared to traditional firewalls and IDS.",
  demo: "#",
  github: "https://github.com/Tanvir-Chowdhury/WebShieldAI"
},
{
  title: "StreamFlex - Movie Streaming Platform",
  description: "An online movie streaming platform enabling users to purchase movies or subscribe for unlimited access, supported by secure transactions and admin content management tools.",
  technologies: ["PHP", "JavaScript", "Payment Gateway", "IMDB API", "TMDB API", "Bootstrap"],
  details: "Built a feature-rich streaming platform with user authentication, movie purchase and subscription options, and integrated payment gateways. Includes admin dashboard for content management, movie library integration via IMDB and TMDB APIs, and a responsive Bootstrap-based UI for seamless viewing across devices.",
  demo: "#",
  github: "https://github.com/Tanvir-Chowdhury/StreamFlex_movie_streaming_platform"
},
{
  title: "BizConnect - A Portal to Connect Investors, Students, and Founders",
  description: "A networking platform designed to connect investors, students, and startup founders, helping facilitate funding opportunities and talent acquisition.",
  technologies: ["React.js", "Tailwind CSS", "Daisy UI", "JavaScript"],
  details: "Developed the frontend for a portal aimed at bridging investors with founders and students. The platform enables investors to discover startups, founders to recruit student collaborators, and students to gain real-world exposure. The project includes a modern responsive UI built with Tailwind CSS and Daisy UI but remains incomplete due to the lack of backend integration.",
  demo: "#",
  github: "https://github.com/Tanvir-Chowdhury/BizConnect-frontend"
},
{
  title: "Dynamic Web Page Design with HTML, Tailwind CSS, JavaScript and API Integration",
  description: "A dynamic webpage designed with HTML, Tailwind CSS, and JavaScript that integrates APIs to display real-time data with a responsive and interactive interface.",
  technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
  details: "Created a dynamic and responsive webpage showcasing seamless API integration for real-time data rendering. Tailwind CSS was used for efficient styling and reusable UI components, while JavaScript powered interactivity and dynamic updates. The project highlights the use of modern web technologies to deliver an engaging user experience.",
  demo: "https://64fc5f9c61818b5d2c9fdb82--taupe-scone-4a636f.netlify.app/",
  github: "#"
},
{
  title: "Simple Summer Sale Website with JavaScript",
  description: "A simple and basic web page built with HTML, CSS, and JavaScript to demonstrate interactivity in a summer sale theme.",
  technologies: ["JavaScript", "Tailwind CSS", "HTML"],
  details: "Developed a minimalistic summer sale themed website using HTML and CSS for layout and styling, with JavaScript for interactivity. The project demonstrates the use of front-end basics to create an engaging landing page suitable for beginners.",
  demo: "https://64e498dbcc370e033b488a32--sweet-elf-5cccfa.netlify.app/",
  github: "#"
},
{
  title: "Fruit Burst - A Simple Web Page with HTML and Tailwind CSS",
  description: "A visually engaging webpage crafted with HTML and Tailwind CSS, designed to showcase a fruit-themed concept in a modern and responsive layout.",
  technologies: ["HTML", "Tailwind CSS"],
  details: "Designed and developed a fruit-themed webpage that combines creative design with technical implementation using Tailwind CSS. The project emphasizes responsive design for desktop and mobile, ensuring accessibility across devices. It reflects creativity, attention to detail, and hands-on practice with utility-first CSS frameworks.",
  demo: "https://tanvir-chowdhury.github.io/fruit-burst/",
  github: "https://github.com/Tanvir-Chowdhury/fruit-burst"
},
{
  title: "Gamer Zone - A Simple Web Page",
  description: "A basic website created to connect gamers in a simple yet functional online space.",
  technologies: ["HTML", "CSS"],
  details: "Built a simple static website for gaming enthusiasts using HTML and CSS. The project serves as a basic template for community-driven platforms, with a clean layout and minimal styling focused on accessibility and ease of navigation.",
  demo: "https://tanvir-chowdhury.github.io/gamer-zone/",
  github: "https://github.com/Tanvir-Chowdhury/gamer-zone"
},
{
  title: "Online Flower Shop",
  description: "A simple e-commerce-style website built with HTML and CSS to simulate an online flower shop.",
  technologies: ["HTML", "CSS"],
  details: "Developed a beginner-friendly static website that presents a flower shop concept. The site showcases the use of HTML for structure and CSS for styling, giving a practical example of how to design a product-based website layout.",
  demo: "https://tanvir-chowdhury.github.io/online-flower-shop/",
  github: "https://github.com/Tanvir-Chowdhury/online-flower-shop"
}


      ]
    },
    wordpress: {
      title: "WordPress",
      icon: <Globe className="w-4 h-4" />,
      projects: [
        {
  title: "Edtech LMS System",
  description: "An online learning management platform built for Phoenix Admission Care where students can purchase books, enroll in courses, watch class recordings, and take quizzes.",
  technologies: ["WordPress", "WooCommerce", "CSS", "PHP", "Tutor LMS", "Elementor Pro"],
  details: "Developed a feature-rich LMS website enabling students to access digital learning resources and purchase guidebooks. Integrated Tutor LMS for course management, WooCommerce for e-commerce functionality, and Elementor Pro for custom UI design. The platform supports quizzes, recorded classes, and a smooth student learning experience.",
  demo: "https://phoenixedu.com.bd/",
  github: "#"
},
{
  title: "Ecommerce Shop for Gadgets",
  description: "A responsive e-commerce website built for The Gadget Ghor to sell gadgets with integrated payment solutions.",
  technologies: ["WordPress", "WooCommerce", "PHP", "CSS", "Elementor Pro", "Payment Gateways"],
  details: "Designed and developed a fully functional online gadget shop with WooCommerce integration for inventory and payment processing. The site features modern product display, secure checkout, and mobile-friendly layouts to enhance customer experience and drive sales.",
  demo: "https://thegadgetghor.com/",
  github: "#"
},
{
  title: "Business Website for Construction Service in Canada",
  description: "A professional business website created for Sleekcon, a Canadian construction company, featuring animations and an optimized landing page.",
  technologies: ["WordPress", "Elementor"],
  details: "Built and optimized a corporate website for a construction service company in Canada. Added engaging animations, SEO-focused landing pages, and responsive layouts to highlight the brand’s services and credibility. The project focused on creating a clean, professional online presence.",
  demo: "https://sleekcon.com/",
  github: "#"
},
{
  title: "Agency Website for Video Production House",
  description: "A portfolio-driven website created for Halo & Hues, showcasing their video production services, portfolio, and team members.",
  technologies: ["WordPress", "Elementor"],
  details: "Developed a creative agency website with dedicated sections for portfolio videos, service offerings, and team introductions. The design emphasizes visual storytelling with smooth navigation and a professional layout tailored to highlight the agency’s strengths in video production.",
  demo: "https://haloandhues.com/",
  github: "#"
},
{
  title: "Ecommerce Website for Panjabi Store",
  description: "An e-commerce platform designed for Ezaam Mens Wear to sell Panjabis online with an attractive product showcase.",
  technologies: ["WordPress", "WooCommerce", "Elementor Pro"],
  details: "Created a stylish and responsive e-commerce website tailored for a traditional menswear brand. Integrated WooCommerce for product listings, cart, and checkout, with Elementor Pro for customized layouts. The website highlights product collections in an engaging way, driving sales and brand visibility.",
  demo: "https://www.behance.net/gallery/222587715/Websites-I-made",
  github: "#"
}
]
    },
    marketing: {
      title: "Marketing",
      icon: <BarChart3 className="w-4 h-4" />,
      projects: [
        {
          title: "500K Organic Reach Campaign",
          description: "Viral marketing campaign for tech startup",
          technologies: ["Facebook Ads", "Google Ads", "Analytics", "Content Strategy"],
          details: "Led a comprehensive digital marketing campaign that achieved 500K+ organic reach. Utilized strategic content creation, influencer partnerships, and data-driven optimization to maximize engagement and brand awareness.",
          demo: "#",
          github: "#"
        },
        {
          title: "Brand Identity Development",
          description: "Complete branding solution for multiple clients",
          technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy", "Market Research"],
          details: "Developed comprehensive brand identities for 20+ clients including logo design, brand guidelines, marketing materials, and digital presence strategy. Increased brand recognition by 300% on average.",
          demo: "#",
          github: "#"
        }
      ]
    },
    dataanalytics: {
      title: "Data Analytics",
      icon: <Database className="w-4 h-4" />,
      projects: [
        {
  title: "DataLens - Visual Data Analysis of Paris Olympics 2024",
  description: "A C++ project with Matplotplusplus designed to provide visual analysis of the Paris Olympics 2024 data with user registration and login support.",
  technologies: ["C++", "Matplotplusplus"],
  details: "Built a lightweight data visualization platform where users can register, log in, and explore visual insights about the Paris Olympics 2024. The software leverages Matplotplusplus to generate charts and graphs, enabling intuitive interpretation of sports data for general audiences.",
  demo: "#",
  github: "https://github.com/Tanvir-Chowdhury/DataLens"
},
{
  title: "Scope of Work for a Data Analytics Project",
  description: "A structured scope-of-work document prepared for a data analytics project while completing Google’s Data Analytics course on Coursera.",
  technologies: ["Data Analytics"],
  details: "Developed a comprehensive scope-of-work (SOW) document outlining the objectives, deliverables, methodologies, and expected outcomes of a data analytics project. This document demonstrates proficiency in planning, requirement gathering, and structuring data-driven projects as taught in the Google Data Analytics course.",
  demo: "https://docs.google.com/document/d/1AsfpSiIuYQ6VRTfmJ4THzvnmkh9MwOspyiEWhhQhFjM/edit?usp=sharing&resourcekey=0-w3t4mGtPKYt6-fhToimgpg",
  github: "#"
}

      ]
    },
    // design: {
    //   title: "Design",
    //   icon: <Palette className="w-4 h-4" />,
    //   projects: [
    //     {
    //       title: "UI/UX Design Portfolio",
    //       description: "Modern interface designs for various clients",
    //       technologies: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    //       details: "Created comprehensive UI/UX designs for mobile and web applications. Focused on user experience, accessibility, and modern design principles with interactive prototypes.",
    //       demo: "#",
    //       github: "#"
    //     }
    //   ]
    // }
  };

  const projectCategories = useMemo(() => {
    if (projectsData.length > 0) {
      // Create a shallow copy of the structure to avoid circular dependency issues with React elements (icons)
      const categories: any = {};
      Object.keys(initialProjectCategories).forEach((key) => {
        categories[key] = { 
          ...initialProjectCategories[key as keyof typeof initialProjectCategories], 
          projects: [] 
        };
      });

      projectsData.forEach((project: any) => {
        let categoryKey = 'fullstack'; // Default
        const cat = project.category ? project.category.toLowerCase() : '';
        
        if (cat.includes('wordpress')) categoryKey = 'wordpress';
        else if (cat.includes('marketing')) categoryKey = 'marketing';
        else if (cat.includes('data')) categoryKey = 'dataanalytics';
        else if (cat.includes('design')) categoryKey = 'design';
        
        if (categories[categoryKey]) {
          categories[categoryKey].projects.push({
            title: project.title,
            description: project.description,
            technologies: project.technologies || [],
            details: project.details || project.description,
            demo: project.link || "#",
            github: project.github_link || "#"
          });
        }
      });
      return categories;
    }
    return initialProjectCategories;
  }, [projectsData, initialProjectCategories]);

  return (
    <section id='projects' className="py-16 px-6 bg-background relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            Portfolio
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore a collection of my work across web development, marketing strategies, and data analytics.
          </p>
        </div>

        <Tabs defaultValue="fullstack" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-auto p-1 bg-secondary/30 backdrop-blur-md rounded-full border border-border/40">
              {Object.entries(projectCategories).map(([key, category]: [string, any]) => (
                <TabsTrigger 
                  key={key} 
                  value={key} 
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg hover:text-primary"
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(projectCategories).map(([key, category]: [string, any]) => (
            <TabsContent key={key} value={key} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.projects.map((project, index) => (
                  <div key={index} className="h-full">
                    <Card className="group h-full flex flex-col bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 overflow-hidden rounded-2xl">
                      <div className="p-6 flex flex-col h-full">
                        <div className="mb-4 flex justify-between items-start">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                            {category.icon}
                          </div>
                          {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                              <Github className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                          {project.description}
                        </p>

                        <div className="space-y-4 mt-auto">
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 3).map((tech, techIndex) => (
                              <Badge 
                                key={techIndex} 
                                variant="secondary" 
                                className="text-xs font-normal bg-secondary/50 hover:bg-secondary transition-colors"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="outline" className="text-xs font-normal">
                                +{project.technologies.length - 3}
                              </Badge>
                            )}
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full bg-secondary/50 hover:bg-primary hover:text-primary-foreground text-foreground transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                                View Details
                                <Eye className="w-4 h-4 ml-2" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
                              <DialogHeader>
                                <DialogTitle className="text-2xl font-bold text-gradient">{project.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6 py-4">
                                <p className="text-muted-foreground leading-relaxed text-base">
                                  {project.details}
                                </p>

                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Technologies</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                      <Badge 
                                        key={techIndex} 
                                        variant="outline"
                                        className="px-3 py-1 border-primary/20 bg-primary/5 text-primary"
                                      >
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                  {project.demo && project.demo !== '#' ? (
                                    <Button asChild className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Live Demo
                                      </a>
                                    </Button>
                                  ) : (
                                    <Button disabled className="flex-1 opacity-50">
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Live Demo
                                    </Button>
                                  )}

                                  {project.github && project.github !== '#' ? (
                                    <Button variant="outline" asChild className="flex-1 border-primary/20 hover:bg-primary/5">
                                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4 mr-2" />
                                        Source Code
                                      </a>
                                    </Button>
                                  ) : (
                                    <Button disabled variant="outline" className="flex-1 opacity-50">
                                      <Github className="w-4 h-4 mr-2" />
                                      Source Code
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Projects; 
