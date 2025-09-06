import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, MapPin, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState } from 'react';

const WorkExperience = () => {
  const isMobile = useIsMobile();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleExpanded = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  const workData = [
    {
  position: "Junior Executive, PR & Marketing",
  company: "Phoenix Education",
  location: "Dhaka, Bangladesh",
  duration: "Dec 2024 - Present",
  type: "Part-time",
  description: "Redesigned the official website from scratch to make it more user-friendly. Created 150+ engaging Facebook posts and designed 50+ poster contents. Increased page followers by over 25% and boosted overall reach to millions.",
  achievements: [
    "Website redesigned for user-friendliness",
    "150+ Facebook contents & 50+ posters",
    "25%+ growth in followers",
    "Millions in page reach"
  ]
},
{
  position: "Founder & CEO",
  company: "Ask for Branding",
  location: "Remote",
  duration: "Sep 2024 - Present",
  type: "Freelance",
  description: "Founded and managing a freelance branding initiative. Worked with 20+ companies and clients, successfully completing diverse projects and achieving organic reach exceeding 500K+.",
  achievements: [
    "20+ client projects completed",
    "500K+ organic reach",
    "Freelance branding success"
  ]
},
{
  position: "Founder",
  company: "Your Gadgets",
  location: "Remote",
  duration: "May 2023 - Feb 2024",
  type: "Full-time",
  description: "Founded and operated an e-commerce business applying self-taught digital marketing skills. Achieved a 3x return on investment through effective campaigns and strategies.",
  achievements: [
    "Self-taught digital marketing applied",
    "3x ROI achieved"
  ]
},
{
  position: "Web Developer",
  company: "Phoenix Admission Care",
  location: "Remote",
  duration: "Aug 2023 - Dec 2023",
  type: "Part-time",
  description: "Collaborated with the content writing and graphics teams to meet organizational goals. Developed a dynamic website using WordPress and custom CSS, ensuring a visually appealing and functional platform.",
  achievements: [
    "Dynamic website built with WordPress + CSS",
    "Cross-team collaboration"
  ]
},
{
  position: "Typist",
  company: "ROOTs Edu",
  location: "Remote",
  duration: "Mar 2022 - Apr 2022",
  type: "Part-time",
  description: "Converted slides into structured, formatted chapters for a book project. Accurately typed text, math equations, and figures to produce clean, professional chapters.",
  achievements: [
    "Slides converted to book chapters",
    "Math equations & figures accurately typed"
  ]
},
{
  position: "Official Campus Ambassador Intern",
  company: "International MUN",
  location: "Remote",
  duration: "Aug 2021 - Oct 2021",
  type: "Part-time",
  description: "Collaborated with the marketing team to influence peers and drive participation in IMUN. Actively promoted IMUN and participated in online conferences.",
  achievements: [
    "Promoted IMUN initiatives",
    "Participated in online conferences"
  ]
},
{
  position: "WordPress Theme Customizer",
  company: "Fiverr",
  location: "Remote",
  duration: "Apr 2019 - May 2024",
  type: "Freelance",
  description: "Customized and delivered WordPress themes for clients with excellence. Successfully completed 5 projects including 2 Telegram bot developments and 3 WordPress projects, all earning 5-star reviews.",
  achievements: [
    "5 successful projects delivered",
    "2 Telegram bots & 3 WordPress projects",
    "5-star client reviews"
  ]
}

  ];

  return (
    <section id='experience' className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional journey building solutions and creating impact in the digital world
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary hidden md:block"></div>
          
          <div className="space-y-8">
            {workData.map((work, index) => {
              const isExpanded = expandedCards.includes(index);
              const shouldTruncateDesc = isMobile && !isExpanded;
              
              return (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-background hidden md:block"></div>
                  
                  <div className="md:ml-16">
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-accent transition-all duration-500 group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                            <Briefcase className="w-6 h-6" />
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h3 className="text-xl font-semibold text-foreground">
                                {work.position}
                              </h3>
                              <Badge 
                                variant={'default'}
                                className={'bg-gradient-primary'}
                              >
                                {work.type}
                              </Badge>
                            </div>
                            
                            <p className="text-lg text-accent font-medium">{work.company}</p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {work.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {work.location}
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <p className={`text-muted-foreground leading-relaxed transition-all duration-300 ${
                              shouldTruncateDesc ? 'line-clamp-2' : ''
                            }`}>
                              {work.description}
                            </p>
                            
                            {/* Achievements section - collapse on mobile when not expanded */}
                            {(!isMobile || isExpanded) && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  <TrendingUp className="w-4 h-4 text-accent" />
                                  Key Achievements
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {work.achievements.map((achievement, achIndex) => (
                                    <Badge 
                                      key={achIndex} 
                                      variant="outline" 
                                      className="text-xs border-accent/20 bg-accent/5"
                                    >
                                      {achievement}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Read More button - only on mobile */}
                            {isMobile && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleExpanded(index)}
                                className="p-0 h-auto font-medium text-accent hover:text-accent/80"
                              >
                                {isExpanded ? (
                                  <>
                                    Read Less <ChevronUp className="ml-1 h-4 w-4" />
                                  </>
                                ) : (
                                  <>
                                    Read More <ChevronDown className="ml-1 h-4 w-4" />
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
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

export default WorkExperience; 
