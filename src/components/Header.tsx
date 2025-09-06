import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Github, Linkedin, Facebook } from 'lucide-react';
import profileImage from '@/assets/profile-pic.png';
import cvFile from '@/assets/cv.pdf';

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/tanvir.11744', label: 'Facebook', color: 'hover:text-white' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/tanvir11744/', label: 'LinkedIn', color: 'hover:text-text-white' },
    { icon: Mail, href: 'mailto:tanvir.chowdhury.us@gmail.com', label: 'Gmail', color: 'hover:text-text-white' },
    { icon: Github, href: 'https://github.com/Tanvir-Chowdhury', label: 'GitHub', color: 'hover:text-text-white' },
  ];

  const programmingProfiles = [
    { name: 'Codeforces', href: 'https://codeforces.com/profile/tanvir11744', color: 'hover:text-red-500' },
    { name: 'HackerRank', href: 'https://www.hackerrank.com/profile/codinxter', color: 'hover:text-green-500' },
    { name: 'LeetCode', href: 'https://leetcode.com/u/Your_Vir/', color: 'hover:text-yellow-500' },
  ];

  return (
    <header className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-hero relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Decorative glows - hidden on very small screens to avoid overflow */}
        <div className="absolute top-1/4 left-1/4 hidden sm:block w-64 sm:w-72 md:w-96 h-64 sm:h-72 md:h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 hidden sm:block w-64 sm:w-72 md:w-96 h-64 sm:h-72 md:h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Section */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative transform-3d">
              <div className="relative w-60 h-60 lg:w-96 lg:h-96">
                {/* Animated background rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-primary p-1 float hover:scale-110 transition-transform duration-1000">
                  <div className="w-full h-full rounded-full bg-background/20 backdrop-blur-sm">
                    {/* Main profile image - moves with the circle */}
                    <div className="absolute inset-4 rounded-full overflow-hidden glow-primary hover:glow-accent transition-all duration-1000">
                      <img
                        src={profileImage}
                        alt="Tanvir Chowdhury"
                        className={`w-full h-full object-cover transition-all duration-1000 ${
                          imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                        }`}
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                {/* Floating action icons - hide on small screens to avoid off-screen overflow */}
                <a href="https://github.com/Tanvir-Chowdhury" className="hidden sm:block">
                  <div className="absolute lg:-top-4 lg:-right-4 -top-2 -right-2 w-10 h-10 lg:w-16 lg:h-16 bg-primary/20 rounded-full backdrop-blur-sm border border-primary/30 flex items-center justify-center float hover:scale-125 hover:bg-primary/40 transition-all duration-700 cursor-pointer">
                    <Github className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                </a>
                <a href="mailto:tanvir.chowdhury.us@gmail.com" className="hidden sm:block">
                  <div className="absolute lg:-bottom-4 lg:-left-4 -bottom-2 -left-2 w-10 h-10 lg:w-16 lg:h-16 bg-accent/20 rounded-full backdrop-blur-sm border border-accent/30 flex items-center justify-center float hover:scale-125 hover:bg-accent/40 transition-all duration-700 cursor-pointer" style={{ animationDelay: '1s' }}>
                    <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4 slide-up">
              
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="text-gradient"> Md. Tanvir </span>
                {/* <br /> */}
                <span>Chowdhury</span>
              </h1>
              
              <div className="space-y-2">
                <h2 className="text-xl lg:text-2xl text-muted-foreground">
                  Software Engineer & Marketing Strategist
                </h2>
                {/* <p className="text-lg text-accent">Founder of Ask for Branding</p> */}
              </div>
            </div>


            {/* Short Bio */}
            <div className="space-y-4 slide-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Passionate about solving problems through technology and creative marketing strategies. 
                I love building solutions that make a real impact in the digital world.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Languages I Speak:
              </h3>
                <Badge variant="secondary" className="text-xs">
                  Bengali
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  English
                </Badge>
              </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 slide-up" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-transform glow-primary" asChild>
                <a href={cvFile} download="Tanvir-Chowdhury-CV.pdf">
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </a>
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
                Competitive Coding Profiles
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
