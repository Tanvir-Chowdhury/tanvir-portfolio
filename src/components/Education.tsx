import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import * as api from '@/api';

const Education = () => {
  const isMobile = useIsMobile();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [education, setEducation] = useState<any[]>([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.getEducation();
        setEducation(response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      } catch (error) {
        console.error("Failed to fetch education data:", error);
      }
    };
    fetchEducation();
  }, []);

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  const educationData = [
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "North South University",
      duration: "August 2022 - Present",
      status: "Current",
      gpa: "3.40",
      description: "Focusing on software engineering, algorithms, data structures, AI/ML and modern web technologies. Active in programming competitions and tech communities.",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      degree: "Higher Secondary School Certificate",
      institution: "Dhaka Residential Model College",
      duration: "2020 - 2021",
      status: "Completed",
      gpa: "5.00",
      description: "Science Group with focus on Mathematics, Physics and Chemistry. Participated in various science olympiads, competitions and Math club.",
      icon: <Award className="w-6 h-6" />
    },
    {
      degree: "Secondary School Certificate",
      institution: "Dhaka Residential Model College",
      duration: "2018 - 2019",
      status: "Completed",
      gpa: "5.00",
      description: "Science background with excellent performance in Mathematics and Science subjects. Active in extracurricular activities.",
      icon: <Award className="w-6 h-6" />
    }
  ];

  return (
    <section id='education' className="py-16 px-2 md:px-6 bg-background relative overflow-hidden">
      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            Academic Journey
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Education</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The academic milestones that have shaped my technical foundation and problem-solving mindset.
          </p>
        </div>

        <div className="relative md:ml-6">
          {/* Timeline line */}
          <div className="absolute md:left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent hidden md:block"></div>
          
          <div className="space-y-12">
            {education.map((edu, index) => {
              const isExpanded = expandedCards.includes(index);
              const shouldTruncate = isMobile && !isExpanded;
              const icon = <GraduationCap className="w-6 h-6" />;
              const status = edu.duration?.toLowerCase().includes('present') ? 'Current' : 'Completed';
              
              return (
                <div key={edu.id || index} className="relative md:pl-12">
                  {/* Timeline dot */}
                  <div className="absolute md:left-[-8px] w-4 h-4 bg-background rounded-full border-4 border-primary z-10 hidden md:block mt-8 shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>
                  
                  <div className="w-full">
                    <Card className="p-6 md:p-8 bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group relative overflow-hidden rounded-2xl">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex flex-col md:flex-row items-start gap-5">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                            {icon}
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-2">
                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors order-2 md:order-1">
                                {edu.degree}
                              </h3>
                              <Badge 
                                variant={'outline'}
                                className="bg-primary/5 border-primary/20 text-primary whitespace-nowrap md:order-2"
                              >
                                {status}
                              </Badge>
                            </div>
                            <p className="text-lg text-accent font-medium">{edu.institution}</p>
                          </div>
                          
                          <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full">
                              <CalendarDays className="w-4 h-4 text-primary" />
                              <span>{edu.duration}</span>
                            </div>
                            {edu.gpa && (
                              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full">
                                <Award className="w-4 h-4 text-accent" />
                                <span>GPA: {edu.gpa}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className={`text-muted-foreground leading-relaxed ${shouldTruncate ? 'line-clamp-2' : ''}`}>
                            {edu.description}
                          </div>
                          
                          {isMobile && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => toggleExpanded(index)}
                              className="w-full mt-2 text-primary hover:text-primary/80 hover:bg-primary/10"
                            >
                              {isExpanded ? (
                                <span className="flex items-center">Show Less <ChevronUp className="ml-1 w-4 h-4" /></span>
                              ) : (
                                <span className="flex items-center">Read More <ChevronDown className="ml-1 w-4 h-4" /></span>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 
