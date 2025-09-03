import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Github, Linkedin, Facebook } from 'lucide-react';
import profileImage from '@/assets/tanvir-profile.jpg';

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: 'mailto:tanvir@example.com', label: 'Gmail', color: 'hover:text-red-400' },
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
  ];

  const programmingProfiles = [
    { name: 'Codeforces', href: '#', color: 'hover:text-red-500' },
    { name: 'HackerRank', href: '#', color: 'hover:text-green-500' },
    { name: 'LeetCode', href: '#', color: 'hover:text-yellow-500' },
  ];

  return (
    <header className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Section */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative transform-3d">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Animated background rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-primary p-1 float">
                  <div className="w-full h-full rounded-full bg-background/20 backdrop-blur-sm"></div>
                </div>
                
                {/* Main profile image */}
                <div className="absolute inset-4 rounded-full overflow-hidden glow-primary">
                  <img
                    src={profileImage}
                    alt="Tanvir Chowdhury"
                    className={`w-full h-full object-cover transition-all duration-1000 ${
                      imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full backdrop-blur-sm border border-primary/30 flex items-center justify-center float">
                  <Github className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full backdrop-blur-sm border border-accent/30 flex items-center justify-center float" style={{ animationDelay: '1s' }}>
                  <Mail className="w-8 h-8 text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4 slide-up">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Badge variant="secondary" className="text-xs">
                  🇧🇩 Bengali
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  🇺🇸 English
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="text-gradient">Tanvir</span>
                <br />
                <span>Chowdhury</span>
              </h1>
              
              <div className="space-y-2">
                <h2 className="text-xl lg:text-2xl text-muted-foreground">
                  Programmer & Marketing Strategist
                </h2>
                <p className="text-lg text-accent">Founder of Ask for Branding</p>
              </div>
            </div>

            {/* Contact Info */}
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">📧 tanvir@example.com</p>
                <p className="text-sm text-muted-foreground">📱 +880 123 456 789</p>
                <p className="text-sm text-muted-foreground">📍 Dhaka, Bangladesh</p>
              </div>
            </Card>

            {/* Short Bio */}
            <div className="space-y-4 slide-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Passionate about solving problems through technology and creative marketing strategies. 
                Building solutions that make a real impact in the digital world.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 slide-up" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-transform glow-primary">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
              
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    className={`border-border/50 bg-card/30 backdrop-blur-sm hover:scale-110 transition-all ${social.color}`}
                    asChild
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Programming Profiles */}
            <div className="space-y-3 slide-up" style={{ animationDelay: '0.8s' }}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Programming Profiles
              </h3>
              <div className="flex flex-wrap gap-3">
                {programmingProfiles.map((profile, index) => (
                  <a
                    key={profile.name}
                    href={profile.href}
                    className={`text-sm px-4 py-2 rounded-full bg-secondary/50 border border-border/50 transition-all hover:scale-105 ${profile.color}`}
                  >
                    {profile.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;