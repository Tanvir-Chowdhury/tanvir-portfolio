import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Globe, Award } from 'lucide-react';

const Volunteering = () => {
  const volunteeringData = [
    {
      role: "Tech Mentor",
      organization: "Local Programming Community",
      duration: "2022 - Present",
      description: "Mentoring aspiring programmers and helping them build their first projects. Conducted workshops on web development and competitive programming.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500",
      impact: "Mentored 25+ students"
    },
    {
      role: "Content Contributor",
      organization: "Open Source Projects",
      duration: "2021 - Present",
      description: "Contributing to open-source projects and creating educational content for the developer community. Focus on React.js and JavaScript libraries.",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-green-500/10 text-green-500",
      impact: "5+ project contributions"
    },
    {
      role: "Workshop Facilitator",
      organization: "University Tech Club",
      duration: "2021 - 2023",
      description: "Organized and facilitated workshops on digital marketing, branding strategies, and web development for university students.",
      icon: <Award className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500",
      impact: "200+ students reached"
    },
    {
      role: "Community Organizer",
      organization: "Local Tech Meetups",
      duration: "2020 - 2022",
      description: "Helped organize tech meetups and networking events for developers and entrepreneurs in Dhaka. Built connections within the tech community.",
      icon: <Heart className="w-6 h-6" />,
      color: "bg-red-500/10 text-red-500",
      impact: "10+ events organized"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Volunteering <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Giving back to the community through mentorship, education, and tech initiatives
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {volunteeringData.map((volunteer, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-500 group hover:scale-105"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${volunteer.color} group-hover:scale-110 transition-transform`}>
                    {volunteer.icon}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {volunteer.role}
                    </h3>
                    <p className="text-primary font-medium">{volunteer.organization}</p>
                    <p className="text-sm text-muted-foreground">{volunteer.duration}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {volunteer.description}
                </p>
                
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="border-primary/20 bg-primary/5">
                    {volunteer.impact}
                  </Badge>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Volunteer
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering;