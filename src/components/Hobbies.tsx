import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { BookOpen, Tv, Users, Activity, Gamepad2, Camera, Music, Plane, Star , Code, CpuIcon, PencilRuler, Lightbulb, CodeXml, Volleyball, Utensils} from 'lucide-react';
import * as api from '@/api';
import SectionHeading from '@/components/SectionHeading';

const Hobbies = () => {
  const [hobbiesData, setHobbiesData] = useState<any[]>([]);

  const initialHobbies = [
    {
      title: "Reading",
      description: "Love reading books on business, technology and personal development.",
      icon_name: <BookOpen className="w-6 h-6" />,
      color_class: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Problem Solving",
      description: "Enjoy tackling coding challenges and puzzles that sharpen logical thinking.",
      icon_name: <Lightbulb className="w-6 h-6" />,
      color_class: "bg-yellow-500/10 text-yellow-500"
    },
    {
      title: "Traveling",
      description: "Love exploring new places and experiencing different cultures.",
      icon_name: <Plane className="w-6 h-6" />,
      color_class: "bg-teal-500/10 text-teal-500"
    },
    {
      title: "Eating",
      description: "Enjoy trying out new foods and exploring different cuisines.",
      icon_name: <Utensils className="w-6 h-6" />,
      color_class: "bg-orange-500/10 text-orange-500"
    }
  ];

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await api.getHobbies();
        if (response.data && response.data.length > 0) {
          setHobbiesData(response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
        }
      } catch (error) {
        console.error("Failed to fetch hobbies:", error);
      }
    };
    fetchHobbies();
  }, []);

  const getIcon = (iconName: string) => {
    const icons: any = { BookOpen, Tv, Users, Activity, Gamepad2, Camera, Music, Plane, Code, CpuIcon, PencilRuler, Lightbulb, CodeXml, Volleyball };
    const IconComponent = icons[iconName] || Star;
    return <IconComponent className="w-6 h-6" />;
  };

  const itemsToDisplay = hobbiesData.length > 0 ? hobbiesData.map((h, index) => ({
    title: h.title,
    description: h.description,
    icon_name: getIcon(h.icon_name),
    color_class: ["bg-blue-500/10 text-blue-500", "bg-red-500/10 text-red-500", "bg-green-500/10 text-green-500", "bg-orange-500/10 text-orange-500", "bg-purple-500/10 text-purple-500"][index % 5]
  })) : initialHobbies;

  return (
    <section id="hobbies" className="py-16 px-2 md:px-6 bg-background relative overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <SectionHeading
          index="09"
          eyebrow="Personal Interests"
          title={<>Hobbies &amp; <span className="text-gradient">Passions</span></>}
          description="Life beyond coding - exploring creativity, learning, and building connections."
        />

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 pt-4">
            {itemsToDisplay.map((hobby, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/4">
                <Card
                  className="py-3 px-1 md:p-6 bg-card border-border/60 hover:border-primary/40 transition-colors duration-300 group relative overflow-hidden h-full"
                >
                  <div className="space-y-4 text-center relative z-10 flex flex-col h-full">
                    <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${hobby.color_class} bg-background/50 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {hobby.icon_name}
                    </div>
                    
                    <div className="space-y-2 flex-grow">
                      <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {hobby.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {hobby.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Hobbies; 
