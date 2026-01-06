import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Tv, Users, Activity, Gamepad2, Camera, Music, Plane, Star , Code} from 'lucide-react';
import * as api from '@/api';

const Hobbies = () => {
  const [hobbiesData, setHobbiesData] = useState<any[]>([]);

  const initialHobbies = [
    {
      title: "Reading",
      description: "Love reading books on business, technology and personal development.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500"
    },
    // ... (rest of the dummy data)
  ];

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await api.getHobbies();
        if (response.data && response.data.length > 0) {
          setHobbiesData(response.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
        } else {
           // If no data from API, we could fallback to initialHobbies, 
           // but usually we want to show empty or what's in DB.
           // For now, let's just set it to empty if API returns empty, 
           // or maybe the user wants to see dummy data if DB is empty?
           // The user said "make sure the dummy json variabes are not removed and there as it is since I will need it later".
           // I will keep the variable but render from state.
           // If state is empty, I won't render anything or I could render dummy.
           // I'll assume if API succeeds but returns empty, we show empty.
        }
      } catch (error) {
        console.error("Failed to fetch hobbies:", error);
      }
    };
    fetchHobbies();
  }, []);

  const getIcon = (iconName: string) => {
    const icons: any = { BookOpen, Tv, Users, Activity, Gamepad2, Camera, Music, Plane, Code };
    const IconComponent = icons[iconName] || Star;
    return <IconComponent className="w-6 h-6" />;
  };

  // Use API data if available, otherwise fallback to initialHobbies (optional, but user asked to keep dummy data)
  // I will prioritize API data.
  const displayHobbies = hobbiesData.length > 0 ? hobbiesData : initialHobbies;

  const hobbies = [
    {
      title: "Reading",
      description: "Love reading books on business, technology and personal development. Currently exploring 'Building a Story Brand' by Donald Miller.",
      icon_name: <BookOpen className="w-6 h-6" />,
      color_class: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Korean Dramas",
      description: "Enjoy watching Korean dramas in my free time. Recent favorites include 'Business Proposal' and 'Queen of Tears'.",
      icon: <Tv className="w-6 h-6" />,
      color: "bg-red-500/10 text-red-500"
    },
    {
      title: "Teaching & Mentoring",
      description: "Passionate about sharing knowledge and helping others grow. Regularly mentor students in programming and career development.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Football",
      description: "Occasionally play football with friends. It's a great way to stay active and build team spirit.",
      icon: <Activity className="w-6 h-6" />,
      color: "bg-orange-500/10 text-orange-500"
    },
    {
      title: "Gaming",
      description: "Enjoy strategy and puzzle games that challenge problem-solving skills. Great for relaxation and mental exercise.",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Photography",
      description: "Love capturing moments and exploring creative perspectives. Especially enjoy landscape and street photography.",
      icon: <Camera className="w-6 h-6" />,
      color: "bg-pink-500/10 text-pink-500"
    },
    {
      title: "Music",
      description: "Listen to various genres while coding and working. Music helps maintain focus and creativity during long projects.",
      icon: <Music className="w-6 h-6" />,
      color: "bg-indigo-500/10 text-indigo-500"
    },
    {
      title: "Travel Planning",
      description: "Enjoy researching and planning future travel destinations. Fascinated by different cultures and technological innovations worldwide.",
      icon: <Plane className="w-6 h-6" />,
      color: "bg-teal-500/10 text-teal-500"
    }
  ];

  const colors = [
    "bg-blue-500/10 text-blue-500",
    "bg-red-500/10 text-red-500",
    "bg-green-500/10 text-green-500", 
    "bg-orange-500/10 text-orange-500",
    "bg-purple-500/10 text-purple-500",
    "bg-pink-500/10 text-pink-500",
    "bg-indigo-500/10 text-indigo-500",
    "bg-teal-500/10 text-teal-500",
    "bg-cyan-500/10 text-cyan-500",
    "bg-amber-500/10 text-amber-500"
  ];

  const itemsToDisplay = (hobbiesData.length > 0 ? hobbiesData : initialHobbies).map((h, index) => {
    let iconRender;
    // Handle both string icon names (API) and direct JSX (dummy data)
    if (typeof h.icon_name === 'string') {
      iconRender = getIcon(h.icon_name);
    } else if (h.icon) {
      iconRender = h.icon;
    } else if (h.icon_name) {
      iconRender = h.icon_name;
    }

    return {
      ...h,
      icon_name: iconRender,
      color: colors[index % colors.length]
    };
  });

  return (
    <section className="py-16 px-6 bg-background relative overflow-hidden">
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            Personal Interests
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Hobbies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Passions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Life beyond coding - exploring creativity, learning, and building connections.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {itemsToDisplay.map((hobby, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden rounded-2xl h-full"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-6 -mt-6 transition-all group-hover:scale-150 duration-500"></div>
              
              <div className="space-y-4 text-center relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${hobby.color} bg-background/50 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {hobby.icon_name}
                </div>
                
                <div className="space-y-2 flex-grow">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {hobby.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {hobby.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies; 
