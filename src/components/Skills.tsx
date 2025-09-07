import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

const Skills = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [autoRotation, setAutoRotation] = useState({ y: 0 });
  const sphereRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const skillsWithCategories = [
    // Frontend
    { name: "React", category: "Frontend", color: "text-blue-400" },
    { name: "Next.js", category: "Frontend", color: "text-blue-400" },
    { name: "Vue.js", category: "Frontend", color: "text-blue-400" },
    { name: "Angular", category: "Frontend", color: "text-blue-400" },
    { name: "HTML/CSS", category: "Frontend", color: "text-blue-400" },
    { name: "Tailwind CSS", category: "Frontend", color: "text-blue-400" },
    { name: "JavaScript", category: "Frontend", color: "text-blue-400" },
    { name: "TypeScript", category: "Frontend", color: "text-blue-400" },
    
    // Backend
    { name: "Node.js", category: "Backend", color: "text-green-400" },
    { name: "Express.js", category: "Backend", color: "text-green-400" },
    { name: "Python", category: "Backend", color: "text-green-400" },
    { name: "Django", category: "Backend", color: "text-green-400" },
    { name: "Laravel", category: "Backend", color: "text-green-400" },
    { name: "Spring Boot", category: "Backend", color: "text-green-400" },
    { name: "GraphQL", category: "Backend", color: "text-green-400" },
    
    // Database
    { name: "MongoDB", category: "Database", color: "text-purple-400" },
    { name: "PostgreSQL", category: "Database", color: "text-purple-400" },
    { name: "MySQL", category: "Database", color: "text-purple-400" },
    { name: "Redis", category: "Database", color: "text-purple-400" },
    { name: "Elasticsearch", category: "Database", color: "text-purple-400" },
    { name: "Firebase", category: "Database", color: "text-purple-400" },
    
    // DevOps & Cloud
    { name: "Docker", category: "DevOps", color: "text-orange-400" },
    { name: "Kubernetes", category: "DevOps", color: "text-orange-400" },
    { name: "AWS", category: "DevOps", color: "text-orange-400" },
    { name: "Jenkins", category: "DevOps", color: "text-orange-400" },
    { name: "Terraform", category: "DevOps", color: "text-orange-400" },
    { name: "Nginx", category: "DevOps", color: "text-orange-400" },
    
    // Mobile & Design
    { name: "Flutter", category: "Mobile", color: "text-cyan-400" },
    { name: "React Native", category: "Mobile", color: "text-cyan-400" },
    { name: "Figma", category: "Design", color: "text-pink-400" },
    { name: "UI/UX Design", category: "Design", color: "text-pink-400" },
    
    // AI & Tools
    { name: "Machine Learning", category: "AI", color: "text-yellow-400" },
    { name: "TensorFlow", category: "AI", color: "text-yellow-400" },
    { name: "Git", category: "Tools", color: "text-gray-400" },
    { name: "WordPress", category: "Tools", color: "text-gray-400" }
  ];

  const skills = skillsWithCategories.map(skill => skill.name);

  // Generate evenly distributed positions on sphere surface
  const generateEvenPositions = () => {
    const positions: Array<{x: number, y: number, z: number, rotationX: number, rotationY: number}> = [];
    const totalSkills = skills.length;
    
    // Create a more even distribution using golden ratio spiral
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const goldenAngle = 2 * Math.PI * (1 - 1/goldenRatio);
    
    for (let i = 0; i < totalSkills; i++) {
      // Even distribution using golden angle spiral
      const y_normalized = 1 - (i / (totalSkills - 1)) * 2; // y goes from 1 to -1
      const radius_at_y = Math.sqrt(1 - y_normalized * y_normalized);
      
      const theta = i * goldenAngle;
      
      // Make globe wider (elliptical) - stretch x and z
      const radiusX = 320; // Wider radius for x
      const radiusY = 260; // Standard radius for y  
      const radiusZ = 320; // Wider radius for z
      
      const x = radiusX * radius_at_y * Math.cos(theta);
      const y = radiusY * y_normalized;
      const z = radiusZ * radius_at_y * Math.sin(theta);

      // Calculate rotation angles for text box to face outward
      const rotationY = Math.atan2(x, z) * (180 / Math.PI);
      const rotationX = -Math.asin(y / Math.sqrt(radiusX * radiusZ)) * (180 / Math.PI);

      positions.push({ x, y, z, rotationX, rotationY });
    }

    return positions;
  };

  const skillPositions = generateEvenPositions();

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouse.x;
    const deltaY = e.clientY - lastMouse.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setLastMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setLastMouse({ x: touch.clientX, y: touch.clientY });
      e.preventDefault();
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastMouse.x;
    const deltaY = touch.clientY - lastMouse.y;

    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setLastMouse({ x: touch.clientX, y: touch.clientY });
    e.preventDefault();
  };

  const handleTouchEnd = (e: TouchEvent) => {
    setIsDragging(false);
    e.preventDefault();
  };

  // Auto-rotation animation
  useEffect(() => {
    const animate = () => {
      if (!isDragging) {
        setAutoRotation(prev => ({
          y: prev.y + 0.3 // Slow continuous rotation
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;

        setRotation(prev => ({
          x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
          y: prev.y + deltaX * 0.5
        }));

        setLastMouse({ x: e.clientX, y: e.clientY });
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    const handleGlobalTouchMove = (e: globalThis.TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastMouse.x;
        const deltaY = touch.clientY - lastMouse.y;

        setRotation(prev => ({
          x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
          y: prev.y + deltaX * 0.5
        }));

        setLastMouse({ x: touch.clientX, y: touch.clientY });
        e.preventDefault();
      }
    };

    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, lastMouse]);

  return (
    <section id='skills' className="py-20 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Auto-rotating skills globe - drag with mouse or swipe with finger to control
          </p>
        </div>

        {/* 3D Sphere Container */}
        <div className="flex justify-center items-center h-[650px] md:h-[650px] sm:h-[450px] relative px-4">
          <div 
            ref={sphereRef}
            className="relative cursor-grab active:cursor-grabbing select-none touch-none"
            style={{ 
              width: 'min(700px, calc(100vw - 2rem))', 
              height: 'min(550px, calc(100vh - 200px), calc(100vw - 2rem))',
              perspective: window.innerWidth < 640 ? '800px' : '1500px'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Sphere */}
            <div 
              className="relative w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y + autoRotation.y}deg)`,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
              }}
            >
              {skills.map((skill, index) => {
                const position = skillPositions[index];
                const { x, y, z, rotationX, rotationY } = position;
                const skillData = skillsWithCategories[index];

                // Calculate current z-position after rotation to determine visibility
                const currentRotY = (rotation.y + autoRotation.y) * (Math.PI / 180);
                const currentRotX = rotation.x * (Math.PI / 180);
                
                // Apply rotations to get current z position
                const rotatedZ = z * Math.cos(currentRotY) - x * Math.sin(currentRotY);
                
                // Only show boxes that are front-facing (positive z after rotation)
                const isVisible = rotatedZ > -50;
                
                if (!isVisible) return null;

                // Calculate opacity and scale based on z-position
                const normalizedZ = (rotatedZ + 320) / 640; // Adjusted for wider globe
                const opacity = Math.max(0.7, normalizedZ * 0.3 + 0.7);
                const scale = Math.max(0.85, normalizedZ * 0.25 + 0.85);

                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-200 pointer-events-auto"
                    style={{
                      transform: `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${scale})`,
                      opacity: opacity,
                      left: '50%',
                      top: '50%',
                      marginLeft: window.innerWidth < 640 ? '-65px' : '-90px',
                      marginTop: '-22px',
                      zIndex: Math.round(rotatedZ + 320),
                      transformStyle: 'preserve-3d',
                    }}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div
                      className={`
                        bg-card/90 backdrop-blur-md border border-border/50
                        rounded-lg px-3 py-2 sm:px-5 sm:py-3 text-center cursor-pointer
                        hover:bg-card hover:border-primary/50 hover:scale-105
                        transition-all duration-300 shadow-lg hover:shadow-xl
                        w-[130px] sm:w-[180px] text-sm sm:text-base font-medium
                        hover:z-50 relative
                        ${hoveredSkill === skill ? 'ring-2 ring-primary/50' : ''}
                        ${skillData.color}
                      `}
                      style={{
                        boxShadow: rotatedZ < 0 
                          ? '0 0 20px rgba(var(--primary-rgb, 59 130 246), 0.25), 0 6px 8px -1px rgba(0, 0, 0, 0.1)' 
                          : '0 6px 8px -1px rgba(0, 0, 0, 0.1), 0 3px 6px -1px rgba(0, 0, 0, 0.06)'
                      }}
                    >
                      {skill}
                      <div className="text-xs text-muted-foreground/70 mt-1">
                        {skillData.category}
                      </div>
                    </div>
                  </div>
                );
              }).filter(Boolean)}

              {/* Elliptical wireframe (optional visual guide) */}
              <div 
                className="absolute inset-0 border border-border/20 pointer-events-none rounded-full"
                style={{
                  width: '640px',
                  height: '520px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-320px',
                  marginTop: '-260px',
                  transform: 'scaleX(1.2)', // Make it wider/elliptical
                }}
              />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-muted-foreground">
            🖱️ Drag with mouse or 👆 swipe with finger to control
          </p>
          <p className="text-xs text-muted-foreground/70">
            All {skillsWithCategories.length} skills are distributed across the entire globe surface
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
