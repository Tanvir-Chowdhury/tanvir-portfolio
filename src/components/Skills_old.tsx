import { Badge } from '@/components/ui/badge';
import { useState, use  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <section id='skills' className="py-20 px-4 overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            My <span className="text-gradient">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set spanning programming, design, marketing, and leadership
          </p>
        </div>om 'react';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const skillCategories = [
    {
      title: "Programming Languages",
      color: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/30",
      skills: ["JavaScript", "Python", "C/C++", "PHP", "TypeScript", "SQL"]
    },
    {
      title: "Web Development", 
      color: "from-green-500 to-green-600",
      shadowColor: "shadow-green-500/30",
      skills: ["React.js", "Node.js", "HTML/CSS", "WordPress", "Express.js", "Next.js"]
    },
    {
      title: "Database & Tools",
      color: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/30",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Git/GitHub", "Docker", "AWS"]
    },
    {
      title: "Digital Marketing",
      color: "from-red-500 to-red-600", 
      shadowColor: "shadow-red-500/30",
      skills: ["Social Media Marketing", "Google Ads", "SEO/SEM", "Content Strategy", "Email Marketing", "Analytics"]
    },
    {
      title: "Design & Branding",
      color: "from-pink-500 to-pink-600",
      shadowColor: "shadow-pink-500/30", 
      skills: ["Brand Strategy", "Logo Design", "UI/UX Design", "Adobe Creative Suite", "Figma", "Canva"]
    },
    {
      title: "Data Science & AI",
      color: "from-indigo-500 to-indigo-600",
      shadowColor: "shadow-indigo-500/30",
      skills: ["Data Analysis", "Machine Learning", "Pandas/NumPy", "TensorFlow", "Jupyter", "Matplotlib"]
    },
    {
      title: "Mobile Development",
      color: "from-orange-500 to-orange-600",
      shadowColor: "shadow-orange-500/30",
      skills: ["React Native", "Flutter", "Mobile UI/UX", "App Store Optimization", "Firebase", "API Integration"]
    },
    {
      title: "Soft Skills",
      color: "from-teal-500 to-teal-600",
      shadowColor: "shadow-teal-500/30", 
      skills: ["Leadership", "Communication", "Project Management", "Problem Solving", "Team Collaboration", "Client Relations"]
    }
  ];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, skillName: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <section id='skills' className="py-20 px-4">
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

  return (
    <section id='skills' className="py-20 px-4 overflow-hidden">
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

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              {/* Category Title */}
              <div className="text-center">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                  {category.title}
                </h3>
                <div className={`w-16 h-1 bg-gradient-to-r ${category.color} rounded-full mx-auto mt-2`}></div>
              </div>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`
                      relative group cursor-pointer
                      bg-gradient-to-br ${category.color}
                      rounded-xl px-4 py-3 text-center
                      transform transition-all duration-300 ease-out
                      hover:scale-105 ${category.shadowColor} hover:shadow-2xl
                      before:absolute before:inset-0 before:rounded-xl
                      before:bg-gradient-to-br before:${category.color}
                      before:opacity-0 before:transition-opacity before:duration-300
                      hover:before:opacity-20
                      after:absolute after:inset-0 after:rounded-xl
                      after:bg-white/10 after:backdrop-blur-sm
                      after:border after:border-white/20
                    `}
                    style={{
                      transformStyle: 'preserve-3d',
                      animationDelay: `${skillIndex * 0.1}s`
                    }}
                    onMouseMove={(e) => handleMouseMove(e, skill)}
                    onMouseLeave={handleMouseLeave}
                    onMouseEnter={() => setHoveredSkill(skill)}
                  >
                    <div className="relative z-10">
                      <span className="text-white font-semibold text-sm lg:text-base drop-shadow-lg">
                        {skill}
                      </span>
                    </div>
                    
                    {/* 3D Depth Effect */}
                    <div 
                      className={`
                        absolute inset-0 rounded-xl
                        bg-gradient-to-br ${category.color}
                        transform translate-x-1 translate-y-1 -z-10
                        opacity-60 group-hover:opacity-80
                        transition-all duration-300
                      `}
                    ></div>
                    
                    {/* Bottom Shadow */}
                    <div 
                      className={`
                        absolute inset-0 rounded-xl
                        bg-gradient-to-br ${category.color}
                        transform translate-x-2 translate-y-2 -z-20
                        opacity-30 group-hover:opacity-50
                        blur-sm transition-all duration-300
                      `}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating indicator for hovered skill */}
        {hoveredSkill && (
          <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-lg pointer-events-none z-50 animate-fade-in">
            <span className="text-sm font-medium">{hoveredSkill}</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills; 
