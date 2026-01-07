import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import * as api from '@/api';
import csoImg from '@/assets/awards/cso.jpg';
import hultImg from '@/assets/awards/hult_prize_semifinal.jpg';
import hultCampus from '@/assets/awards/hultprize_on_campus.png';

const Awards = () => {
  const [awardsData, setAwardsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await api.getAwards();
        if (response.data && response.data.length > 0) {
          const formattedData = response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((item: any) => ({
            title: item.title,
            organization: item.organization,
            year: item.date ? new Date(item.date).getFullYear().toString() : (item.year || ""),
            description: item.description,
            icon: <Trophy className="w-6 h-6" />,
            color: "bg-primary/10 text-primary",
            rank: item.rank || "Winner",
            link: item.image_url || item.link || "#"
          }));
          setAwardsData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch awards:", error);
      }
    };
    fetchAwards();
  }, []);

  const staticAwards = [
    {
      title: "Bronze Prize at Climate Science Olympiad 2023",
      organization: "Climate Science Foundation",
      year: "2023",
      description: "I stand among the Top 0.2% of the 50,600 young climate enthusiasts who participated. My accomplishment not only reflects my impressive knowledge but also hints at a future filled with curiosity, critical thinking and boundless potential. I achieved a ranking of 32 and scored an impressive 82/100.",
      icon: <Medal className="w-6 h-6" />,
      color: "bg-amber-500/10 text-amber-500",
      rank: "Bronze Medal",
      link: csoImg
    },
    {
      title: "Regional Winner & Semifinalist - Hult Prize Competition",
      organization: "Hult Prize Foundation",
      year: "2023",
      description: "Won the regional round of the prestigious Hult Prize competition with our innovative business solution addressing social challenges on clothing sector. Advanced to the global semifinals representing Bangladesh.",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-yellow-500/10 text-yellow-500",
      rank: "Regional Winner",
      link: hultImg
    },
    {
      title: "OnCampus Winner - Hult Prize BGCTUB",
      organization: "Hult Prize at BGC Trust University",
      year: "2023",
      description: "Won the on-campus competition at BGC Trust University for the Hult Prize. Our team's innovative approach to solving clothing related social problems impressed the judges and earned us the top position.",
      icon: <Award className="w-6 h-6" />,
      color: "bg-green-500/10 text-green-500",
      rank: "On-Campus Winner",
      link: hultCampus
    },
    {
      title: "2nd Runner Up - Project Display of 13th DRMC-evaly National Science Carnival 2020",
      organization: "Dhaka Residential Model College",
      year: "2020",
      description: "Secured 2nd runner-up position in the Project Display category of the 13th DRMC-evaly National Science Carnival. Showcased an innovative technology project that demonstrated practical applications of scientific principles.",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500",
      rank: "2nd Runner Up",
      link: "#"
    }
  ];

  const awards = awardsData.length > 0 ? awardsData : staticAwards;

  return (
    <section id='awards' className="py-16 px-2 md:px-6 bg-background relative overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            Achievements
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Awards</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Recognition for excellence in competitions, innovation, and academic achievements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {awards.map((award, index) => {
            const hasLink = !!award.link && award.link !== '#' && award.link.trim() !== '';
            return (
              <Card 
                key={index} 
                className="p-8 bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden rounded-2xl flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-10 -mt-10 transition-all group-hover:scale-150 duration-500"></div>
                
                <div className="flex flex-col h-full relative z-10">
                  <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${award.color} bg-background/50 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {award.icon}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {award.title}
                      </h3>
                      <p className="text-primary font-medium">{award.organization}</p>
                      <Badge variant="secondary" className="mt-2 bg-secondary/50">
                        {award.year}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <MobileAwardItem award={award} />
                  </div>

                  {/* Footer with certificate button */}
                  <div className="mt-6 pt-6 border-t border-border/30 flex justify-between items-center">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">
                      {award.rank}
                    </Badge>
                    
                    {hasLink && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10 gap-2 group/btn">
                            <span>View Certificate</span>
                            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-primary/20">
                          <div className="p-6 border-b border-border/50">
                            <DialogTitle className="text-xl font-bold">{award.title}</DialogTitle>
                            <p className="text-muted-foreground">{award.organization}</p>
                          </div>
                          <div className="w-full flex justify-center p-4 bg-black/50">
                            {/* Responsive image preview */}
                            <img src={String(award.link)} alt={`${award.title} certificate`} loading="lazy" className="max-h-[70vh] w-auto max-w-full object-contain rounded shadow-2xl" onError={(e)=>{ (e.target as HTMLImageElement).style.display = 'none' }} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const MobileAwardItem = ({ award }: { award: any }) => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false; // Simple check, ideally use hook
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = isMobile && !isExpanded;

  return (
    <div className="space-y-3">
      <p className={`text-muted-foreground leading-relaxed ${shouldTruncate ? 'line-clamp-3' : ''}`}>
        {award.description}
      </p>
      
      {isMobile && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-0 h-auto text-primary hover:text-primary/80 hover:bg-transparent"
        >
          {isExpanded ? (
            <span className="flex items-center text-xs">Show Less <ChevronUp className="ml-1 w-3 h-3" /></span>
          ) : (
            <span className="flex items-center text-xs">Read More <ChevronDown className="ml-1 w-3 h-3" /></span>
          )}
        </Button>
      )}
    </div>
  );
};

export default Awards;
