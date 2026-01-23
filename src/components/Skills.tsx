import { useState, useEffect, useMemo, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import * as api from '@/api';

const SkillCard = ({ skill }: { skill: any }) => (
  <div 
    className="flex flex-col items-center justify-center p-6 border border-border/40 bg-card/40 backdrop-blur-md rounded-2xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 group/card min-w-[140px] md:min-w-[180px] select-none"
  >
    <span className={`text-lg md:text-xl font-bold tracking-tight mb-1 ${skill.color} group-hover/card:scale-110 transition-transform duration-300`}>
      {skill.name}
    </span>
    <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-widest bg-secondary/50 px-2 py-0.5 rounded-full">
      {skill.category}
    </span>
  </div>
);

const DraggableMarquee = ({ skills, isMobile }: { skills: any[], isMobile: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Speed variable (slower than original 50s animation which is roughly 1-2px per frame depending on screen width, we explicitly set a slow pixel speed)
        const speed = 0.5;

        const animate = () => {
             if (!isDragging && !isPaused) {
                 container.scrollLeft += speed;
             }
             
             // Wrap logic
             if (container.children.length > 0) {
                 const firstSet = container.children[0] as HTMLElement;
                 const setWidth = firstSet.offsetWidth;
                 
                 // If the first set has effectively scrolled out of view, we reset by subtracting its width
                 // This effectively jumps "back" to the start of the second set which looks identical to the start of the first set
                 if (setWidth > 0) {
                      if (container.scrollLeft >= setWidth) {
                          container.scrollLeft -= setWidth;
                      } else if (container.scrollLeft <= 0) {
                           // If dragged too far left (negative scroll not possible usually, but if logic pushed it)
                           // Or if we want to allow left dragging into "previous" loop
                           container.scrollLeft += setWidth;
                      }
                 }
             }
             
             animationFrameId.current = requestAnimationFrame(animate);
        }
        
        animationFrameId.current = requestAnimationFrame(animate);
        
        return () => cancelAnimationFrame(animationFrameId.current);
    }, [isPaused, isDragging]);
    
    // Mouse Events
    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        startX.current = e.pageX;
        if (containerRef.current) {
            scrollLeft.current = containerRef.current.scrollLeft;
        }
    }
    
    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX.current) * 1.5; // Drag multiplier
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    }
    
    const onMouseUp = () => {
        setIsDragging(false);
    }
    
    const onMouseLeave = () => {
        setIsDragging(false);
        setIsPaused(false);
    }

    // Touch Events
    const onTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        startX.current = e.touches[0].pageX;
        if (containerRef.current) {
            scrollLeft.current = containerRef.current.scrollLeft;
        }
    }

    const onTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !containerRef.current) return;
        const x = e.touches[0].pageX;
        const walk = (x - startX.current) * 1.5;
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    }

    const onTouchEnd = () => {
        setIsDragging(false);
        setIsPaused(false);
    }

    return (
        <div 
           ref={containerRef}
           className="flex w-full overflow-hidden cursor-grab active:cursor-grabbing no-scrollbar touch-pan-y"
           onMouseDown={onMouseDown}
           onMouseMove={onMouseMove}
           onMouseUp={onMouseUp}
           onMouseLeave={onMouseLeave}
           onMouseEnter={() => !isMobile && setIsPaused(true)}
           onTouchStart={onTouchStart}
           onTouchMove={onTouchMove}
           onTouchEnd={onTouchEnd}
        >
            {/* Render 4 sets to allow seamless wrapping and wide screens coverage */}
            {[...Array(4)].map((_, idx) => (
                <div key={idx} className="flex shrink-0 items-center gap-6 px-3">
                    {skills.map((skill, i) => <SkillCard key={`s${idx}-${i}`} skill={skill} />)}
                </div>
            ))}
        </div>
    )
}

const Skills = () => {
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.getSkills();
        if (response.data && response.data.length > 0) {
          setSkillsData(response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    fetchSkills();
  }, []);

  const getCategoryColor = (category: string) => {
    const colors: any = {
      Frontend: "text-blue-400",
      Backend: "text-green-400",
      Database: "text-purple-400",
      DevOps: "text-orange-400",
      Mobile: "text-cyan-400",
      Design: "text-pink-400",
      AI: "text-yellow-400",
      Tools: "text-gray-400"
    };
    return colors[category] || "text-foreground";
  };

  const skillsWithCategories = useMemo(() => {
    const initialSkills = [
      // Frontend
      { name: "React", category: "Frontend", color: "text-blue-400" },
      { name: "Next.js", category: "Frontend", color: "text-blue-400" },
      { name: "Vue.js", category: "Frontend", color: "text-blue-400" },
      { name: "HTML/CSS", category: "Frontend", color: "text-blue-400" },
      { name: "Tailwind CSS", category: "Frontend", color: "text-blue-400" },
      { name: "JavaScript", category: "Frontend", color: "text-blue-400" },
      { name: "TypeScript", category: "Frontend", color: "text-blue-400" },
      
      // Backend
      { name: "Node.js", category: "Backend", color: "text-green-400" },
      { name: "Python", category: "Backend", color: "text-green-400" },
      { name: "MongoDB", category: "Database", color: "text-purple-400" },
      { name: "PostgreSQL", category: "Database", color: "text-purple-400" },
      { name: "MySQL", category: "Database", color: "text-purple-400" },
      
      // DevOps & Cloud
      { name: "Docker", category: "DevOps", color: "text-orange-400" },
      { name: "AWS", category: "DevOps", color: "text-orange-400" },
      { name: "Git", category: "Tools", color: "text-gray-400" },
      
      // Mobile & Design
      { name: "Flutter", category: "Mobile", color: "text-cyan-400" },
      { name: "Figma", category: "Design", color: "text-pink-400" },
      
      // AI & Tools
      { name: "Machine Learning", category: "AI", color: "text-yellow-400" },
      
      { name: "Angular", category: "Frontend", color: "text-blue-400" },
      { name: "Express.js", category: "Backend", color: "text-green-400" },
      { name: "UI/UX Design", category: "Design", color: "text-pink-400" },
      { name: "TensorFlow", category: "AI", color: "text-yellow-400" },
      { name: "WordPress", category: "Tools", color: "text-gray-400" }
    ];

    if (skillsData.length > 0) {
      return skillsData.map(s => ({
        name: s.name,
        category: s.category,
        color: getCategoryColor(s.category)
      }));
    }
    
    return initialSkills;
  }, [skillsData]);

  return (
    <section id='skills' className="py-24 bg-secondary/5 overflow-hidden relative">
      <div className="container max-w-6xl mx-auto relative z-10 mb-16 px-6">
        <div className="text-center space-y-6">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            Technical Expertise
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             A blend of creative design, robust engineering, and strategic thinking.
          </p>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full overflow-hidden bg-background/50 backdrop-blur-sm border-y border-border/30 py-10 group">
        <div className="pointer-events-none absolute z-10 box-border grid h-full w-full grid-cols-2 overflow-hidden bg-transparent inset-0 mixed-blend-overlay">
             <div className="w-20 md:w-40 bg-gradient-to-r from-background to-transparent h-full absolute left-0 top-0 z-20"></div>
             <div className="w-20 md:w-40 bg-gradient-to-l from-background to-transparent h-full absolute right-0 top-0 z-20"></div>
        </div>

        <div className="flex w-full group-hover:[animation-play-state:paused]">
            <DraggableMarquee skills={skillsWithCategories} isMobile={isMobile} />
        </div>

      </div>
    </section>
  );
};

export default Skills;
