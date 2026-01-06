import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, MapPin, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useState, useEffect } from 'react';
import * as api from '@/api';

const WorkExperience = () => {
  const isMobile = useIsMobile();
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [experienceData, setExperienceData] = useState<any[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await api.getExperience();
        if (response.data && response.data.length > 0) {
          const formattedData = response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((item: any) => ({
            position: item.position,
            company: item.company,
            location: item.location,
            duration: item.duration || (item.start_date ? `${new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${item.is_current ? 'Present' : (item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}` : ''),
            type: item.type,
            description: item.description,
            achievements: Array.isArray(item.achievements) ? item.achievements : (item.achievements ? item.achievements.split('\n') : [])
          }));
          setExperienceData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch experience:", error);
      }
    };
    fetchExperience();
  }, []);

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

  const displayData = experienceData.length > 0 ? experienceData : workData;

  return (
    <section id='experience' className="py-16 px-6 bg-secondary/10 relative">
      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-1 text-sm border-accent/50 text-accent bg-accent/10 backdrop-blur-sm">
            Career Path
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My professional journey building solutions and creating impact in the digital world.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-primary/50 to-transparent hidden md:block transform -translate-x-1/2"></div>
          
          <div className="space-y-12">
            {displayData.map((work, index) => {
              const isExpanded = expandedCards.includes(index);
              const shouldTruncateDesc = isMobile && !isExpanded;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-background rounded-full border-4 border-accent z-10 hidden md:block transform -translate-x-1/2 mt-8 shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
                  
                  <div className="flex-1 md:w-1/2"></div>
                  
                  <div className="flex-1 md:w-1/2">
                    <Card className="p-6 md:p-8 bg-card/40 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 group relative overflow-hidden rounded-2xl">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-primary opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      
                      <div className="flex items-start gap-5">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300">
                            <Briefcase className="w-6 h-6" />
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                                {work.position}
                              </h3>
                              <Badge 
                                variant={'outline'}
                                className="bg-accent/5 border-accent/20 text-accent whitespace-nowrap"
                              >
                                {work.type}
                              </Badge>
                            </div>
                            
                            <p className="text-lg text-primary font-medium">{work.company}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-1">
                              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full">
                                <Calendar className="w-4 h-4 text-accent" />
                                <span>{work.duration}</span>
                              </div>
                              <div className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1 rounded-full">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{work.location}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <p className={`text-muted-foreground leading-relaxed transition-all duration-300 ${
                              shouldTruncateDesc ? 'line-clamp-2' : ''
                            }`}>
                              {work.description}
                            </p>
                            
                            {/* Achievements section - collapse on mobile when not expanded */}
                            {(!isMobile || isExpanded) && (
                              <div className="space-y-3 pt-2 border-t border-border/30">
                                <div className="flex items-center gap-2 text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                                  <TrendingUp className="w-4 h-4 text-accent" />
                                  Key Achievements
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {work.achievements.map((achievement, achIndex) => (
                                    <Badge 
                                      key={achIndex} 
                                      variant="secondary" 
                                      className="text-xs font-normal bg-secondary/50 hover:bg-secondary transition-colors"
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
                                className="w-full mt-2 text-accent hover:text-accent/80 hover:bg-accent/10"
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
