import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Globe, Award } from 'lucide-react';

const Volunteering = () => {
  const volunteeringData = [
    {
  role: "Team Lead",
  organization: "Graphics Team, IEEE WIE",
  duration: "Feb 2024 - Present",
  description: "Leading the graphics design team by creating 100+ professional designs including posters, banners, and certificates. Coordinated with event organizers to successfully support 20+ events while mentoring and managing 6 volunteers.",
  icon: <Users className="w-6 h-6" />,
  color: "bg-purple-500/10 text-purple-500",
  impact: "100+ designs created, 20+ events supported, leading 6 volunteers"
},
{
  role: "Co-ordinator",
  organization: "Tesla Lab",
  duration: "May 2020",
  description: "Successfully coordinated and managed a large-scale online national event, ensuring smooth execution and engagement from participants across the country.",
  icon: <Users className="w-6 h-6" />,
  color: "bg-green-500/10 text-green-500",
  impact: "Managed and executed a national-level online event"
},
{
  role: "Assistant IT Manager",
  organization: "Ongko.org",
  duration: "Jan 2020 - Jan 2021",
  description: "Managed a graphics design team of 10+ members and supervised a messenger group of 100+ participants. Actively contributed to the IT team’s goals by helping volunteers and members solve technical issues and supporting the development of the organization’s website.",
  icon: <Users className="w-6 h-6" />,
  color: "bg-orange-500/10 text-orange-500",
  impact: "10+ designers managed, 100+ members supported, contributed to IT team & website"
},
{
  role: "Graphics Designing Executive",
  organization: "DRMC Math Club",
  duration: "Mar 2019 - Dec 2021",
  description: "Led a graphics team of 8 designers to create 100+ posters, banners, ID cards, and certificates for various events. Collaborated with 60+ volunteers to launch 20+ successful online and offline sessions, including Olympiads and workshops.",
  icon: <Users className="w-6 h-6" />,
  color: "bg-blue-500/10 text-blue-500",
  impact: "100+ designs delivered, 60+ volunteers managed, 20+ sessions and Olympiads launched"
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
            Giving back to the community through mentorship, education and tech initiatives
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