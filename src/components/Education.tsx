import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, CalendarDays } from 'lucide-react';

const Education = () => {
  const educationData = [
    {
      degree: "BSc in Computer Science & Engineering",
      institution: "North South University",
      duration: "August 2022 - Present",
      status: "Current",
      gpa: "3.43",
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
    <section id='education' className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            My <span className="text-gradient">Education</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Academic journey that shaped my technical foundation and problem-solving mindset
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary hidden md:block"></div>
          
          <div className="space-y-8">
            {educationData.map((edu, index) => (
              <div key={index} className="relative">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"></div>
                
                <div className="md:ml-16">
                  <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-500 group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                          {edu.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {edu.degree}
                          </h3>
                          <Badge 
                            variant={edu.status === 'Current' ? 'default' : 'secondary'}
                            className={edu.status === 'Current' ? 'bg-gradient-primary' : ''}
                          >
                            {edu.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-lg text-primary font-medium">{edu.institution}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {edu.duration}
                            </div>
                            <div className="font-semibold">
                              {edu.status === 'Current' ? 'Current CGPA:' : 'GPA:'} 
                              <span className="text-accent ml-1">{edu.gpa}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {edu.description}
                        </p>
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

export default Education;