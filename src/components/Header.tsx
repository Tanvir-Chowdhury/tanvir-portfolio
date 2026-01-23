import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Github, Linkedin, Facebook, Globe, Code, Terminal, Cpu } from 'lucide-react';
import profileImage from '@/assets/profile-pic.png';
import cvFile from '@/assets/cv.pdf';
import * as api from '@/api';

const Header = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [competitiveProfiles, setCompetitiveProfiles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, socialRes, competitiveRes] = await Promise.all([
          api.getProfile().catch(() => ({ data: {} })),
          api.getSocialLinks().catch(() => ({ data: [] })),
          api.getCompetitiveProfiles().catch(() => ({ data: [] }))
        ]);
        
        setProfile(profileRes.data);
        setSocialLinks(socialRes.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
        setCompetitiveProfiles(competitiveRes.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0)));
      } catch (error) {
        console.error("Failed to fetch header data:", error);
      }
    };
    fetchData();
  }, []);

  const getIcon = (iconName: string) => {
    const icons: any = {
      Facebook, Linkedin, Mail, Github, Globe, Code, Terminal, Cpu
    };
    return icons[iconName] || Globe;
  };


  return (
    <header className="min-h-screen flex items-center justify-center px-2 lg:px-6 py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image Section */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative group">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[400px] lg:h-[400px]">
                {/* Animated background rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent p-1 animate-spin-slow opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center z-10">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-background relative">
                    <img
                      src={profile?.profile_image_url || profileImage}
                      alt={profile?.name || "Md Tanvir Chowdhury"}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                      } group-hover:scale-105`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                </div>

                {/* Floating elements - Visible on larger screens */}
                <a href="https://github.com/Tanvir-Chowdhury" className="hidden lg:block absolute -top-4 -right-4 z-20">
                  <div className="w-16 h-16 bg-background/80 backdrop-blur-md rounded-2xl border border-primary/30 flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 hover:rotate-6 transition-all duration-300 cursor-pointer group/icon">
                    <Github className="w-8 h-8 text-primary group-hover/icon:text-accent transition-colors" />
                  </div>
                </a>
                <a href={profile?.email ? `mailto:${profile.email}` : "mailto:tanvir.chowdhury.us@gmail.com"} className="hidden lg:block absolute -bottom-4 -left-4 z-20">
                  <div className="w-16 h-16 bg-background/80 backdrop-blur-md rounded-2xl border border-accent/30 flex items-center justify-center shadow-lg shadow-accent/20 hover:scale-110 hover:-rotate-6 transition-all duration-300 cursor-pointer group/icon">
                    <Mail className="w-8 h-8 text-accent group-hover/icon:text-primary transition-colors" />
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8 order-1 lg:order-2">
            <div className="space-y-4 slide-up">
              <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
                Building Scalable Digital Solutions
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Hi, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent animate-gradient-x">
                  {profile?.name || "Md Tanvir Chowdhury"}
                </span>
              </h1>
              
              <div className="space-y-2">
                <h2 className="text-xl lg:text-1xl font-medium text-muted-foreground">
                  {profile?.title || "Helping Founders & Solopreneurs Scale Efficiently"}
                </h2>
              </div>
            </div>

            {/* Short Bio */}
            <div className="space-y-6 slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl leading-relaxed text-muted-foreground max-w-1xl mx-auto lg:mx-0">
                {profile?.bio || "Full Stack Development (Pro-Code/WP) + AI Automation (n8n/Chatbots/LLMs) + 360° Marketing Strategy to scale revenue on autopilot."}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
                <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider mr-2">
                  Languages:
                </span>
                <Badge variant="secondary" className="px-3 py-1 bg-secondary hover:bg-white hover:text-black transition-colors">
                  Bengali
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 bg-secondary hover:bg-white hover:text-black transition-colors">
                  English
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start slide-up pt-4" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="h-12 px-8 text-base bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all shadow-lg shadow-primary/25 rounded-full" asChild>
                <a href={profile?.cv_url || cvFile} download="Tanvir-Chowdhury-CV.pdf">
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </a>
              </Button>
              
              <div className="flex gap-3 items-center justify-center lg:justify-start">
                {socialLinks.map((social) => {
                  const Icon = getIcon(social.icon_name || 'Globe');
                  return (
                    <Button
                      key={social.id || social.platform}
                      variant="outline"
                      size="icon"
                      className="w-12 h-12 rounded-full border-border/50 bg-background/50 backdrop-blur-sm hover:scale-110 hover:border-primary/50 transition-all hover:text-white"
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                        <Icon className="w-5 h-5" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Programming Profiles */}
            <div className="space-y-4 slide-up pt-6 border-t border-border/30" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Competitive Coding Profiles
              </h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {competitiveProfiles.map((profile) => (
                  <a
                    key={profile.platform}
                    href={profile.profile_link}
                    target="_blank"
                    className="text-sm px-5 py-2 rounded-full bg-secondary/30 border border-border/50 transition-all hover:scale-105 hover:bg-secondary/60 hover:border-primary/30 hover:text-primary"
                  >
                    {profile.platform}
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
