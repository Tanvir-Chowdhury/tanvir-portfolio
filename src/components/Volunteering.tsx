import { Card } from '@/components/ui/card';
import { Heart, Users, Globe, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import * as api from '@/api';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';

const Volunteering = () => {
  const [fetchedVolunteeringData, setFetchedVolunteeringData] = useState<any[]>([]);

  useEffect(() => {
    const fetchVolunteering = async () => {
      try {
        const response = await api.getVolunteering();
        if (response.data && response.data.length > 0) {
          const formattedData = response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)).map((item: any) => ({
            role: item.role,
            organization: item.organization,
            duration: item.duration || (item.start_date ? `${new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${item.is_current ? 'Present' : (item.end_date ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}` : ''),
            description: item.description,
            icon: <Users className="w-6 h-6" />,
            color: "bg-primary/10 text-primary",
            impact: item.impact || item.description
          }));
          setFetchedVolunteeringData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch volunteering:", error);
      }
    };
    fetchVolunteering();
  }, []);

  const staticVolunteeringData = [
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
  description: "Managed a graphics design team of 10+ members and supervised a messenger group of 100+ participants. Actively contributed to the IT teamâ€™s goals by helping volunteers and members solve technical issues and supporting the development of the organizationâ€™s website.",
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

  const volunteeringData = fetchedVolunteeringData;

  return (
    <section className="py-16 px-2 md:px-6 bg-background relative overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <SectionHeading
          index="05"
          eyebrow="Community Impact"
          title={<>Volunteering <span className="text-gradient">Experience</span></>}
          description="Giving back to the community through mentorship, education and tech initiatives."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {volunteeringData.map((volunteer, index) => (
            <Reveal key={index} delay={Math.min(index, 3) * 80}>
            <Card
              className="p-8 h-full bg-card border-border/60 hover:border-primary/40 transition-colors duration-300 group relative overflow-hidden"
            >
              <div className="space-y-6 relative z-10">
                <div className="flex flex-col md:flex-row items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${volunteer.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    {volunteer.icon}
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {volunteer.role}
                    </h3>
                    <p className="text-lg text-primary font-medium">{volunteer.organization}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {volunteer.duration}
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-base">
                  {volunteer.description}
                </p>
                
                <div className="pt-4 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground/80">Key Impact:</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border/30">
                    {volunteer.impact}
                  </p>
                </div>
              </div>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Volunteering; 
