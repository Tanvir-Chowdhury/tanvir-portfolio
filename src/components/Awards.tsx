import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const Awards = () => {
  const awards = [
    {
      title: "Bronze Prize at Climate Science Olympiad 2023",
      organization: "Climate Science Foundation",
      year: "2023",
      description: "Achieved bronze medal in the national Climate Science Olympiad for innovative solutions to environmental challenges. Developed a comprehensive project on sustainable technology implementations.",
      icon: <Medal className="w-6 h-6" />,
      color: "bg-amber-500/10 text-amber-500",
      rank: "Bronze Medal"
    },
    {
      title: "Regional Winner - Hult Prize Competition",
      organization: "Hult Prize Foundation",
      year: "2023",
      description: "Won the regional round of the prestigious Hult Prize competition with our innovative business solution addressing social challenges. Advanced to the global semifinals representing Bangladesh region.",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-yellow-500/10 text-yellow-500",
      rank: "Regional Winner"
    },
    {
      title: "Semifinalist - Hult Prize Global Competition",
      organization: "Hult Prize Foundation",
      year: "2023",
      description: "Reached the global semifinals of the Hult Prize, competing against thousands of teams worldwide. Presented our social impact startup idea to international judges and investors.",
      icon: <Star className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500",
      rank: "Global Semifinalist"
    },
    {
      title: "OnCampus Winner - Hult Prize NSU",
      organization: "Hult Prize at North South University",
      year: "2023",
      description: "Won the on-campus competition at North South University for the Hult Prize. Our team's innovative approach to solving social problems impressed the judges and earned us the top position.",
      icon: <Award className="w-6 h-6" />,
      color: "bg-green-500/10 text-green-500",
      rank: "Campus Winner"
    },
    {
      title: "2nd Runner Up - DRMC Science Carnival 2020",
      organization: "Dhaka Residential Model College & Evaly",
      year: "2020",
      description: "Secured 2nd runner-up position in the Project Display category of the 13th DRMC-evaly National Science Carnival. Showcased an innovative technology project that demonstrated practical applications of scientific principles.",
      icon: <Trophy className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500",
      rank: "2nd Runner Up"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Honors & <span className="text-gradient">Awards</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition for excellence in competitions, innovation, and academic achievements
          </p>
        </div>

        <div className="space-y-6">
          {awards.map((award, index) => (
            <Card 
              key={index} 
              className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-500 group"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${award.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                  {award.icon}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                        {award.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="default" 
                          className="bg-gradient-primary text-sm px-3 py-1"
                        >
                          {award.rank}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className="border-primary/20 bg-primary/5 text-sm"
                        >
                          {award.year}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-lg text-primary font-medium">
                      {award.organization}
                    </p>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {award.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative line */}
              <div className="mt-6 h-px bg-gradient-primary opacity-20"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;