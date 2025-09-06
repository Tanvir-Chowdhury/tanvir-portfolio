import { Card } from '@/components/ui/card';
import { BookOpen, Tv, Users, Activity, Gamepad2, Camera, Music, Plane } from 'lucide-react';

const Hobbies = () => {
  const hobbies = [
    {
      title: "Reading",
      description: "Love reading books on business, technology and personal development. Currently exploring 'Building a Story Brand' by Donald Miller.",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-blue-500/10 text-blue-500"
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

  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Hobbies & <span className="text-gradient">Interests</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Life beyond coding - exploring creativity, learning, and building connections
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => (
            <Card 
              key={index} 
              className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-500 group hover:scale-105"
            >
              <div className="space-y-4 text-center">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${hobby.color} group-hover:scale-110 transition-transform`}>
                  {hobby.icon}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
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
