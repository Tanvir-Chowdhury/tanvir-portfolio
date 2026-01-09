import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import * as api from '@/api';

const Certificates = () => {
  const [certificatesData, setCertificatesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await api.getCertificates();
        if (response.data && response.data.length > 0) {
          const formattedData = response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((item: any) => ({
            title: item.title,
            issuer: item.issuer,
            date: item.issue_date ? new Date(item.issue_date).getFullYear().toString() : (item.date || ""),
            category: item.category || "General",
            skills: item.skills || [],
            link: item.credential_url || item.link || "#"
          }));
          setCertificatesData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      }
    };
    fetchCertificates();
  }, []);

  const staticCertificates = [
    {
      title: "React.js Complete Course",
      issuer: "Udemy",
      date: "2023",
      category: "Web Development",
      skills: ["React.js", "JavaScript", "Redux"],
      link: "https://www.udemy.com/certificate/react-course-example"
    },
    {
      title: "Digital Marketing Fundamentals",
      issuer: "Google",
      date: "2023",
      category: "Marketing",
      skills: ["SEO", "Google Ads", "Analytics"],
      link: "https://www.coursera.org/certificate/google-marketing-example"
    },
    {
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "2022",
      category: "Data Science",
      skills: ["Python", "Pandas", "NumPy"],
      link: "https://www.coursera.org/certificate/python-data-science-example"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon",
      date: "2023",
      category: "Cloud Computing",
      skills: ["AWS", "Cloud", "DevOps"],
      link: "https://www.aws.training/certification/example"
    },
    {
      title: "JavaScript Algorithms",
      issuer: "freeCodeCamp",
      date: "2022",
      category: "Programming",
      skills: ["JavaScript", "Algorithms", "DSA"],
      link: "https://www.freecodecamp.org/certificate/js-algo-example"
    },
    {
      title: "Brand Strategy Course",
      issuer: "LinkedIn Learning",
      date: "2023",
      category: "Branding",
      skills: ["Branding", "Strategy", "Marketing"],
      link: "https://www.linkedin.com/learning/certificate/example"
    },
    {
      title: "Node.js Backend Development",
      issuer: "Udemy",
      date: "2022",
      category: "Backend",
      skills: ["Node.js", "Express", "MongoDB"],
      link: "https://www.udemy.com/certificate/nodejs-example"
    },
    {
      title: "Social Media Marketing",
      issuer: "HubSpot",
      date: "2023",
      category: "Marketing",
      skills: ["Social Media", "Content", "Strategy"],
      link: "https://academy.hubspot.com/certification/example"
    },
    {
      title: "Machine Learning Basics",
      issuer: "Coursera",
      date: "2022",
      category: "AI/ML",
      skills: ["Python", "ML", "TensorFlow"],
      link: "https://www.coursera.org/certificate/ml-example"
    },
    {
      title: "UI/UX Design Principles",
      issuer: "Adobe",
      date: "2023",
      category: "Design",
      skills: ["UI/UX", "Figma", "Design"],
      link: "https://www.adobe.com/certification/example"
    },
    {
      title: "WordPress Development",
      issuer: "WPBeginner",
      date: "2021",
      category: "CMS",
      skills: ["WordPress", "PHP", "MySQL"],
      link: "https://www.wpbeginner.com/certificate/example"
    },
    {
      title: "Content Marketing Strategy",
      issuer: "Content Marketing Institute",
      date: "2023",
      category: "Marketing",
      skills: ["Content", "Strategy", "Writing"],
      link: "https://www.contentmarketinginstitute.com/certificate/example"
    }
  ];

  const certificates = certificatesData;

  return (
    <section id='certificates' className="py-16 px-6 bg-secondary/5 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            Continuous Learning
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Validating skills and expertise through recognized industry certifications.
          </p>
        </div>

        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {certificates.map((cert, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/4">
                <Card 
                  className="p-6 bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150 duration-500"></div>
                  
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary/50 backdrop-blur-sm">
                      {cert.date}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3 flex-grow relative z-10">
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1" title={cert.title}>
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cert.skills.slice(0, 3).map((skill: string, i: number) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-secondary/30 text-muted-foreground border border-border/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-primary/70" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border/30 relative z-10">
                    <Button variant="ghost" size="sm" className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 group/btn" asChild>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer">
                        Verify Credential
                        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Certificates;
