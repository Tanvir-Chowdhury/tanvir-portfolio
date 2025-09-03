import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Code, Palette, BarChart3, Database, Globe, Smartphone, Brain, Users } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "C/C++", level: 80 },
        { name: "PHP", level: 75 },
        { name: "TypeScript", level: 85 },
        { name: "SQL", level: 80 }
      ]
    },
    {
      title: "Web Development",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-green-500/10 text-green-500",
      skills: [
        { name: "React.js", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "HTML/CSS", level: 95 },
        { name: "WordPress", level: 90 },
        { name: "Express.js", level: 80 },
        { name: "Next.js", level: 75 }
      ]
    },
    {
      title: "Database & Tools",
      icon: <Database className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 70 },
        { name: "AWS", level: 75 }
      ]
    },
    {
      title: "Digital Marketing",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "bg-red-500/10 text-red-500",
      skills: [
        { name: "Social Media Marketing", level: 95 },
        { name: "Google Ads", level: 85 },
        { name: "SEO/SEM", level: 90 },
        { name: "Content Strategy", level: 90 },
        { name: "Email Marketing", level: 85 },
        { name: "Analytics", level: 85 }
      ]
    },
    {
      title: "Design & Branding",
      icon: <Palette className="w-6 h-6" />,
      color: "bg-pink-500/10 text-pink-500",
      skills: [
        { name: "Brand Strategy", level: 95 },
        { name: "Logo Design", level: 85 },
        { name: "UI/UX Design", level: 80 },
        { name: "Adobe Creative Suite", level: 80 },
        { name: "Figma", level: 85 },
        { name: "Canva", level: 90 }
      ]
    },
    {
      title: "Data Science & AI",
      icon: <Brain className="w-6 h-6" />,
      color: "bg-indigo-500/10 text-indigo-500",
      skills: [
        { name: "Data Analysis", level: 80 },
        { name: "Machine Learning", level: 75 },
        { name: "Pandas/NumPy", level: 80 },
        { name: "TensorFlow", level: 70 },
        { name: "Jupyter", level: 85 },
        { name: "Matplotlib", level: 80 }
      ]
    },
    {
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6" />,
      color: "bg-orange-500/10 text-orange-500",
      skills: [
        { name: "React Native", level: 75 },
        { name: "Flutter", level: 70 },
        { name: "Mobile UI/UX", level: 80 },
        { name: "App Store Optimization", level: 75 },
        { name: "Firebase", level: 80 },
        { name: "API Integration", level: 85 }
      ]
    },
    {
      title: "Soft Skills",
      icon: <Users className="w-6 h-6" />,
      color: "bg-teal-500/10 text-teal-500",
      skills: [
        { name: "Leadership", level: 90 },
        { name: "Communication", level: 95 },
        { name: "Project Management", level: 85 },
        { name: "Problem Solving", level: 90 },
        { name: "Team Collaboration", level: 90 },
        { name: "Client Relations", level: 95 }
      ]
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set spanning programming, design, marketing, and leadership
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card 
              key={categoryIndex} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-300 group hover:scale-105"
              style={{ animationDelay: `${categoryIndex * 0.1}s` }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">
                          {skill.name}
                        </span>
                        <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5">
                          {skill.level}%
                        </Badge>
                      </div>
                      
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-primary transition-all duration-700 hover:shadow-lg hover:shadow-primary/30"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${skillIndex * 0.1}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;