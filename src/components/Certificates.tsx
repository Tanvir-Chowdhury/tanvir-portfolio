import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import * as api from '@/api';
import SectionHeading from '@/components/SectionHeading';

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
      title: "NASA Space Apps Challenge 2025 Participation Certificate",
      issuer: "NASA International Space Apps Challenge",
      date: "2025",
      category: "AI/ML",
      skills: ["Project Management", "Back-End Development"],
      link: "#"
    },
    {
      title: "Mastering Machine Learning Fundamentals",
      issuer: "IEEE NSU Student Branch, WIE Affinity Group",
      date: "2025",
      category: "AI/ML",
      skills: ["Machine Learning", "NLP"],
      link: "#"
    },
    {
      title: "Prepare Data for Exploration",
      issuer: "Google",
      date: "2024",
      category: "Data Science",
      skills: ["SQL"],
      link: "#"
    },
    {
      title: "Ask Questions to Make Data-Driven Decisions",
      issuer: "Google",
      date: "2024",
      category: "Data Science",
      skills: ["Data Analytics"],
      link: "#"
    },
    {
      title: "Foundations: Data, Data, Everywhere",
      issuer: "Google",
      date: "2024",
      category: "Data Science",
      skills: ["Data Analytics"],
      link: "#"
    },
    {
      title: "Data Science Short Course by Jennifer Widom",
      issuer: "NSU ACM-W Student Chapter",
      date: "2024",
      category: "Data Science",
      skills: ["Data Science", "Data Analytics"],
      link: "#"
    },
    {
      title: "Digital Marketing Agency: Grow Your Agency with Dekker",
      issuer: "Udemy",
      date: "2024",
      category: "Marketing",
      skills: ["Digital Marketing", "Agency Growth"],
      link: "#"
    },
    {
      title: "Art of Communication",
      issuer: "Grameenphone Academy",
      date: "2025",
      category: "Communication",
      skills: ["Communication"],
      link: "#"
    },
    {
      title: "Corporate Presentation Skills",
      issuer: "Grameenphone Academy",
      date: "2025",
      category: "Communication",
      skills: ["Presentation"],
      link: "#"
    },
    {
      title: "Acing Aptitude Tests",
      issuer: "Grameenphone Academy",
      date: "2025",
      category: "Career Development",
      skills: ["Aptitude"],
      link: "#"
    },
    {
      title: "Smart CV",
      issuer: "Grameenphone Academy",
      date: "2025",
      category: "Career Development",
      skills: ["CV Writing"],
      link: "#"
    },
    {
      title: "LinkedIn 101",
      issuer: "Grameenphone Academy",
      date: "2025",
      category: "Career Development",
      skills: ["Personal Branding"],
      link: "#"
    },
    {
      title: "NSU Startups Next: Certified Skill Lab Workshops",
      issuer: "NSU Startups Next",
      date: "2023",
      category: "Career Development",
      skills: ["Problem Solving", "Communication"],
      link: "#"
    },
    {
      title: "Scientist for a Day",
      issuer: "NASA",
      date: "2021",
      category: "AI/ML",
      skills: ["Critical Thinking"],
      link: "#"
    },
    {
      title: "Mission to Mars Student Challenge",
      issuer: "NASA",
      date: "2021",
      category: "AI/ML",
      skills: ["Problem Solving"],
      link: "#"
    },
    {
      title: "International MUN Certified Internship",
      issuer: "International MUN",
      date: "2021",
      category: "Career Development",
      skills: ["Problem Solving", "Critical Thinking"],
      link: "#"
    },
    {
      title: "International MUN Online Conference 73.0",
      issuer: "International MUN",
      date: "2021",
      category: "Career Development",
      skills: ["Critical Thinking"],
      link: "#"
    },
    {
      title: "Tesla Lab Certified Official Co-ordinator",
      issuer: "Tesla Lab",
      date: "2020",
      category: "Career Development",
      skills: ["Coordination"],
      link: "#"
    },
    {
      title: "Chattagram Chess Club Presents Chess Fiesta 2020",
      issuer: "Chattagram Chess Club",
      date: "2020",
      category: "Career Development",
      skills: ["Critical Thinking"],
      link: "#"
    },
    {
      title: "Communication Hacks",
      issuer: "10 Minute School",
      date: "2023",
      category: "Communication",
      skills: ["Communication"],
      link: "#"
    },
    {
      title: "How to Create a Professional Presentation in PowerPoint",
      issuer: "Udemy",
      date: "2022",
      category: "Career Development",
      skills: ["Microsoft PowerPoint"],
      link: "#"
    }
  ];

  const certificates = certificatesData.length > 0 ? certificatesData : staticCertificates;

  return (
    <section id='certificates' className="py-16 px-6 bg-secondary/5 relative overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <SectionHeading
          index="06"
          eyebrow="Continuous Learning"
          title={<>Professional <span className="text-gradient">Certifications</span></>}
          description="Validating skills and expertise through recognized industry certifications."
        />

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
                  className="p-6 bg-card border-border/60 hover:border-primary/40 transition-colors duration-300 group relative overflow-hidden flex flex-col h-full"
                >
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
                  
                  {cert.link && cert.link !== '#' && (
                    <div className="mt-6 pt-4 border-t border-border/30 relative z-10">
                      <Button variant="ghost" size="sm" className="w-full justify-between text-primary hover:text-primary hover:bg-primary/10 group/btn" asChild>
                        <a href={cert.link} target="_blank" rel="noopener noreferrer">
                          Verify Credential
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  )}
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
