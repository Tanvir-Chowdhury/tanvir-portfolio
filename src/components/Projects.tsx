import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Github, Eye, Code, Database, Palette, BarChart3, Globe, Smartphone } from 'lucide-react';

const Projects = () => {
  const projectCategories = {
    wordpress: {
      title: "WordPress Websites",
      icon: <Globe className="w-5 h-5" />,
      projects: [
        {
          title: "E-commerce Fashion Store",
          description: "Complete online fashion store with payment integration",
          technologies: ["WordPress", "WooCommerce", "PHP", "MySQL"],
          details: "Built a comprehensive e-commerce platform for a fashion brand with custom theme, payment gateway integration, inventory management, and SEO optimization. Features include responsive design, product filtering, and admin dashboard.",
          demo: "#",
          github: "#"
        },
        {
          title: "Restaurant Website",
          description: "Modern restaurant website with online ordering",
          technologies: ["WordPress", "Custom Theme", "JavaScript", "CSS3"],
          details: "Developed a modern restaurant website featuring online menu, reservation system, and location integration. Implemented custom post types for menu items and events with responsive design.",
          demo: "#",
          github: "#"
        },
        {
          title: "Corporate Business Site",
          description: "Professional corporate website with CMS",
          technologies: ["WordPress", "Elementor", "PHP", "Bootstrap"],
          details: "Created a professional corporate website with custom theme development, team management system, service pages, and contact forms. Optimized for speed and SEO.",
          demo: "#",
          github: "#"
        }
      ]
    },
    fullstack: {
      title: "Full Stack Development",
      icon: <Code className="w-5 h-5" />,
      projects: [
        {
          title: "Task Management App",
          description: "React-based project management tool",
          technologies: ["React.js", "Node.js", "MongoDB", "Express"],
          details: "Built a comprehensive task management application with user authentication, real-time updates, drag-and-drop functionality, and team collaboration features. Includes dashboard analytics and notification system.",
          demo: "#",
          github: "#"
        },
        {
          title: "Social Media Dashboard",
          description: "Analytics dashboard for social media",
          technologies: ["React.js", "Python", "Django", "PostgreSQL"],
          details: "Developed a social media analytics dashboard that aggregates data from multiple platforms. Features include real-time analytics, content scheduling, and performance tracking with beautiful visualizations.",
          demo: "#",
          github: "#"
        }
      ]
    },
    marketing: {
      title: "Digital Marketing",
      icon: <BarChart3 className="w-5 h-5" />,
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
      icon: <Database className="w-5 h-5" />,
      projects: [
        {
          title: "Sales Analytics Dashboard",
          description: "Python-based data visualization tool",
          technologies: ["Python", "Pandas", "Matplotlib", "Jupyter"],
          details: "Created an interactive sales analytics dashboard that processes large datasets and provides actionable insights. Features include trend analysis, forecasting, and automated report generation.",
          demo: "#",
          github: "#"
        },
        {
          title: "Customer Behavior Analysis",
          description: "ML-powered customer insights platform",
          technologies: ["Python", "Scikit-learn", "TensorFlow", "Tableau"],
          details: "Developed a machine learning system to analyze customer behavior patterns and predict purchasing decisions. Helped businesses increase conversion rates by 40% through data-driven insights.",
          demo: "#",
          github: "#"
        }
      ]
    },
    programming: {
      title: "Programming Projects",
      icon: <Smartphone className="w-5 h-5" />,
      projects: [
        {
          title: "AI Chatbot System",
          description: "Intelligent customer service bot",
          technologies: ["Python", "NLP", "TensorFlow", "Flask"],
          details: "Built an AI-powered chatbot system with natural language processing capabilities. Features include intent recognition, context management, and integration with business systems.",
          demo: "#",
          github: "#"
        },
        {
          title: "Inventory Management System",
          description: "C-based enterprise solution",
          technologies: ["C", "SQLite", "GTK", "Data Structures"],
          details: "Developed a robust inventory management system using C programming with efficient data structures and algorithms. Features include real-time tracking, automated alerts, and reporting.",
          demo: "#",
          github: "#"
        }
      ]
    }
  };

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing diverse projects across web development, marketing, and technology solutions
          </p>
        </div>

        <Tabs defaultValue="wordpress" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 bg-card/30 backdrop-blur-sm border border-border/30 p-2 rounded-xl">
            {Object.entries(projectCategories).map(([key, category]) => (
              <TabsTrigger 
                key={key} 
                value={key} 
                className="flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 hover:bg-muted/50"
              >
                {category.icon}
                <span className="hidden sm:inline font-medium">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(projectCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.projects.map((project, index) => (
                  <Card 
                    key={index} 
                    className="group relative overflow-hidden bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative p-6 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                            {project.title}
                          </h3>
                          <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <Badge 
                            key={techIndex} 
                            variant="secondary" 
                            className="text-xs bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6">
                              <p className="text-muted-foreground leading-relaxed">
                                {project.details}
                              </p>
                              
                              <div className="space-y-3">
                                <h4 className="font-semibold">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech, techIndex) => (
                                    <Badge 
                                      key={techIndex} 
                                      variant="outline"
                                      className="border-primary/20 bg-primary/5"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <Button asChild className="bg-gradient-primary">
                                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                  </a>
                                </Button>
                                <Button variant="outline" asChild>
                                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    Source Code
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </Card>
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