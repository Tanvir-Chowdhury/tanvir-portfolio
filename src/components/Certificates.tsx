import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      title: "React.js Complete Course",
      issuer: "Udemy",
      date: "2023",
      category: "Web Development",
      skills: ["React.js", "JavaScript", "Redux"]
    },
    {
      title: "Digital Marketing Fundamentals",
      issuer: "Google",
      date: "2023",
      category: "Marketing",
      skills: ["SEO", "Google Ads", "Analytics"]
    },
    {
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "2022",
      category: "Data Science",
      skills: ["Python", "Pandas", "NumPy"]
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon",
      date: "2023",
      category: "Cloud Computing",
      skills: ["AWS", "Cloud", "DevOps"]
    },
    {
      title: "JavaScript Algorithms",
      issuer: "freeCodeCamp",
      date: "2022",
      category: "Programming",
      skills: ["JavaScript", "Algorithms", "DSA"]
    },
    {
      title: "Brand Strategy Course",
      issuer: "LinkedIn Learning",
      date: "2023",
      category: "Branding",
      skills: ["Branding", "Strategy", "Marketing"]
    },
    {
      title: "Node.js Backend Development",
      issuer: "Udemy",
      date: "2022",
      category: "Backend",
      skills: ["Node.js", "Express", "MongoDB"]
    },
    {
      title: "Social Media Marketing",
      issuer: "HubSpot",
      date: "2023",
      category: "Marketing",
      skills: ["Social Media", "Content", "Strategy"]
    },
    {
      title: "Machine Learning Basics",
      issuer: "Coursera",
      date: "2022",
      category: "AI/ML",
      skills: ["Python", "ML", "TensorFlow"]
    },
    {
      title: "UI/UX Design Principles",
      issuer: "Adobe",
      date: "2023",
      category: "Design",
      skills: ["UI/UX", "Figma", "Design"]
    },
    {
      title: "WordPress Development",
      issuer: "WPBeginner",
      date: "2021",
      category: "CMS",
      skills: ["WordPress", "PHP", "MySQL"]
    },
    {
      title: "Content Marketing Strategy",
      issuer: "Content Marketing Institute",
      date: "2023",
      category: "Marketing",
      skills: ["Content", "Strategy", "Writing"]
    },
    {
      title: "Git & GitHub Mastery",
      issuer: "GitHub",
      date: "2022",
      category: "Development",
      skills: ["Git", "GitHub", "Version Control"]
    },
    {
      title: "Google Analytics Certified",
      issuer: "Google",
      date: "2023",
      category: "Analytics",
      skills: ["Analytics", "Data", "Insights"]
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2021",
      category: "Web Development",
      skills: ["HTML", "CSS", "Responsive"]
    },
    {
      title: "Email Marketing Automation",
      issuer: "Mailchimp",
      date: "2023",
      category: "Marketing",
      skills: ["Email", "Automation", "CRM"]
    },
    {
      title: "Database Design & SQL",
      issuer: "Oracle",
      date: "2022",
      category: "Database",
      skills: ["SQL", "Database", "MySQL"]
    },
    {
      title: "Project Management",
      issuer: "PMI",
      date: "2023",
      category: "Management",
      skills: ["Project Management", "Agile", "Scrum"]
    },
    {
      title: "Cybersecurity Fundamentals",
      issuer: "IBM",
      date: "2022",
      category: "Security",
      skills: ["Security", "Networking", "Risk"]
    }
  ];

  const categories = [...new Set(certificates.map(cert => cert.category))];

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Certificates & <span className="text-gradient">Courses</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through certified courses and professional development programs
          </p>
        </div>

        {/* Category badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="px-4 py-2 border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-500 group hover:scale-105"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-primary font-medium text-sm">{cert.issuer}</p>
                  
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {cert.category}
                  </Badge>
                  
                  <div className="flex flex-wrap gap-1">
                    {cert.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
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

export default Certificates;