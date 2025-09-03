import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

const WorkExperience = () => {
  const workData = [
    {
      position: "Founder & CEO",
      company: "Ask for Branding",
      location: "Dhaka, Bangladesh",
      duration: "2022 - Present",
      type: "Full-time",
      description: "Founded and leading a branding agency that helps businesses grow through creative marketing strategies. Successfully managed 20+ client projects and achieved organic reach of 500K+ people.",
      achievements: [
        "Built agency from ground up",
        "500K+ organic reach campaign",
        "20+ satisfied clients"
      ]
    },
    {
      position: "Freelance Full Stack Developer",
      company: "Various Clients",
      location: "Remote",
      duration: "2021 - Present",
      type: "Freelance",
      description: "Developing custom web applications using React.js, Node.js, and Python. Created 10+ WordPress websites and various full-stack solutions for diverse clients.",
      achievements: [
        "10+ WordPress websites",
        "Custom web applications",
        "99% client satisfaction"
      ]
    },
    {
      position: "Digital Marketing Specialist",
      company: "Tech Startup",
      location: "Dhaka, Bangladesh",
      duration: "2021 - 2022",
      type: "Part-time",
      description: "Led digital marketing campaigns, social media management, and content creation. Increased brand awareness by 300% and generated qualified leads through strategic campaigns.",
      achievements: [
        "300% brand awareness increase",
        "Qualified lead generation",
        "Social media growth"
      ]
    },
    {
      position: "Web Development Intern",
      company: "Software Company",
      location: "Dhaka, Bangladesh",
      duration: "2021 - 2021",
      type: "Internship",
      description: "Worked on front-end development projects using React.js and modern JavaScript. Gained hands-on experience in version control, agile development, and team collaboration.",
      achievements: [
        "React.js proficiency",
        "Agile methodology",
        "Team collaboration"
      ]
    },
    {
      position: "Programming Tutor",
      company: "Private Tutoring",
      location: "Dhaka, Bangladesh",
      duration: "2020 - 2022",
      type: "Part-time",
      description: "Taught programming fundamentals including C, Python, and basic algorithms to university students. Helped 15+ students improve their coding skills and academic performance.",
      achievements: [
        "15+ students mentored",
        "Improved academic performance",
        "Programming fundamentals"
      ]
    },
    {
      position: "Content Creator",
      company: "Tech Blog",
      location: "Remote",
      duration: "2020 - 2021",
      type: "Freelance",
      description: "Created technical content about programming, web development, and digital marketing. Published 50+ articles that received significant engagement from the tech community.",
      achievements: [
        "50+ published articles",
        "High community engagement",
        "Technical writing expertise"
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
            {workData.map((work, index) => (
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
                              variant={work.type === 'Full-time' ? 'default' : 'secondary'}
                              className={work.type === 'Full-time' ? 'bg-gradient-primary' : ''}
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
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {work.description}
                        </p>
                        
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
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;