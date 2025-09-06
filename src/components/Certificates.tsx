import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Certificates = () => {
  const certificates = [
    {
      title: "React.js Complete Course",
      issuer: "Udemy",
      date: "2023",
      category: "Web Development",
      skills: ["React.js", "JavaScript", "Redux"],
      link: "https://www.udemy.com/certificate/react-course-example"
    },
    {
      title: "Digital Marketing Fundamentals",
      issuer: "Google",
      date: "2023",
      category: "Marketing",
      skills: ["SEO", "Google Ads", "Analytics"],
      link: "https://www.coursera.org/certificate/google-marketing-example"
    },
    {
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "2022",
      category: "Data Science",
      skills: ["Python", "Pandas", "NumPy"],
      link: "https://www.coursera.org/certificate/python-data-science-example"
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon",
      date: "2023",
      category: "Cloud Computing",
      skills: ["AWS", "Cloud", "DevOps"],
      link: "https://www.aws.training/certification/example"
    },
    {
      title: "JavaScript Algorithms",
      issuer: "freeCodeCamp",
      date: "2022",
      category: "Programming",
      skills: ["JavaScript", "Algorithms", "DSA"],
      link: "https://www.freecodecamp.org/certificate/js-algo-example"
    },
    {
      title: "Brand Strategy Course",
      issuer: "LinkedIn Learning",
      date: "2023",
      category: "Branding",
      skills: ["Branding", "Strategy", "Marketing"],
      link: "https://www.linkedin.com/learning/certificate/example"
    },
    {
      title: "Node.js Backend Development",
      issuer: "Udemy",
      date: "2022",
      category: "Backend",
      skills: ["Node.js", "Express", "MongoDB"],
      link: "https://www.udemy.com/certificate/nodejs-example"
    },
    {
      title: "Social Media Marketing",
      issuer: "HubSpot",
      date: "2023",
      category: "Marketing",
      skills: ["Social Media", "Content", "Strategy"],
      link: "https://academy.hubspot.com/certification/example"
    },
    {
      title: "Machine Learning Basics",
      issuer: "Coursera",
      date: "2022",
      category: "AI/ML",
      skills: ["Python", "ML", "TensorFlow"],
      link: "https://www.coursera.org/certificate/ml-example"
    },
    {
      title: "UI/UX Design Principles",
      issuer: "Adobe",
      date: "2023",
      category: "Design",
      skills: ["UI/UX", "Figma", "Design"],
      link: "https://www.adobe.com/certification/example"
    },
    {
      title: "WordPress Development",
      issuer: "WPBeginner",
      date: "2021",
      category: "CMS",
      skills: ["WordPress", "PHP", "MySQL"],
      link: "https://www.wpbeginner.com/certificate/example"
    },
    {
      title: "Content Marketing Strategy",
      issuer: "Content Marketing Institute",
      date: "2023",
      category: "Marketing",
      skills: ["Content", "Strategy", "Writing"],
      link: "https://contentmarketinginstitute.com/certificate/example"
    },
    {
      title: "Git & GitHub Mastery",
      issuer: "GitHub",
      date: "2022",
      category: "Development",
      skills: ["Git", "GitHub", "Version Control"],
      link: "https://www.github.com/certification/example"
    },
    {
      title: "Google Analytics Certified",
      issuer: "Google",
      date: "2023",
      category: "Analytics",
      skills: ["Analytics", "Data", "Insights"],
      link: "https://analytics.google.com/certificate/example"
    },
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "2021",
      category: "Web Development",
      skills: ["HTML", "CSS", "Responsive"],
      link: "https://www.freecodecamp.org/certificate/responsive-web-example"
    },
    {
      title: "Email Marketing Automation",
      issuer: "Mailchimp",
      date: "2023",
      category: "Marketing",
      skills: ["Email", "Automation", "CRM"],
      link: "https://mailchimp.com/certificate/example"
    },
    {
      title: "Database Design & SQL",
      issuer: "Oracle",
      date: "2022",
      category: "Database",
      skills: ["SQL", "Database", "MySQL"],
      link: "https://education.oracle.com/certificate/example"
    },
    {
      title: "Project Management",
      issuer: "PMI",
      date: "2023",
      category: "Management",
      skills: ["Project Management", "Agile", "Scrum"],
      link: "https://www.pmi.org/certificate/example"
    },
    {
      title: "Cybersecurity Fundamentals",
      issuer: "IBM",
      date: "2022",
      category: "Security",
      skills: ["Security", "Networking", "Risk"],
      link: "https://www.ibm.com/certification/example"
    }
  ];

  const categories = [...new Set(certificates.map(cert => cert.category))];

  return (
    <section id='certificates' className="py-20 px-4 bg-secondary/30">
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
              className="relative p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-500 group hover:scale-105"
            >
              {/* Hover-only open link button in top-right */}
              {cert.link && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    title={`Open certificate: ${cert.title}`}
                  >
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" aria-label={`Open ${cert.title} in new tab`}>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              )}

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