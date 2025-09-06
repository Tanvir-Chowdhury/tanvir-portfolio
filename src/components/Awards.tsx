import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Star, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import csoImg from '@/assets/awards/cso.jpg';
import hultImg from '@/assets/awards/hult_prize_semifinal.jpg';
import hultCampus from '@/assets/awards/hultprize_on_campus.png';

const Awards = () => {
  const awards = [
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

  return (
    <section id='awards' className="pt-20 px-4">
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
          {awards.map((award, index) => {
            const hasLink = !!award.link && award.link !== '#' && award.link.trim() !== '';
            return (
              <Card 
                key={index} 
                className="p-6 sm:p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-500 group"
              >
                <div className="flex flex-col">
                  <MobileAwardItem award={award} />

                  {/* Footer with certificate button (full width on mobile) */}
                  <div className="mt-4 flex justify-end">
                    {hasLink ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" className="w-full sm:w-auto" title={`Open certificate: ${award.title}`}>
                            <span className="inline-flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              <span>View Certificate</span>
                            </span>
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-3xl w-[90vw]">
                          <DialogTitle className="mb-2">{award.title} - {award.organization}</DialogTitle>
                          <div className="w-full flex justify-center">
                            {/* Responsive image preview */}
                            <img src={String(award.link)} alt={`${award.title} certificate`} loading="lazy" className="max-h-[70vh] w-auto max-w-full object-contain rounded" onError={(e)=>{ (e.target as HTMLImageElement).style.display = 'none' }} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button variant="secondary" className="w-full sm:w-auto opacity-50" disabled title="No certificate available">
                        <span className="inline-flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>View Certificate</span>
                        </span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Decorative line */}
                <div className="mt-4 sm:mt-6 h-px bg-gradient-primary opacity-20"></div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
};

type AwardItem = {
  title: string;
  organization: string;
  year: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  rank: string;
  link?: string;
}

const MobileAwardItem = ({ award }: { award: AwardItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${award.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
        {award.icon}
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            {award.title}
          </h3>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="default" className="bg-gradient-primary text-xs sm:text-sm px-2 py-1 whitespace-nowrap">
              {award.rank}
            </Badge>
            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-xs sm:text-sm whitespace-nowrap">
              {award.year}
            </Badge>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-primary font-medium mt-2">
          {award.organization}
        </p>

        <div className="mt-3">
          {/* Truncate only on small screens; show full text on sm+ */}
          <div className={`text-muted-foreground leading-relaxed text-sm sm:text-base ${open ? 'max-h-full' : 'max-h-16 overflow-hidden'} sm:max-h-full sm:overflow-visible`}>
            {award.description}
          </div>

          {/* Toggle only visible on mobile */}
          <button
            className="mt-2 text-sm text-primary inline-flex items-center gap-2 sm:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? (
              <>
                <span>Hide</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Read more</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Awards; 
