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
    <header className="min-h-screen flex items-center justify-center px-2 lg:px-6 py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-center">
          {/* Profile Image Section */}
          <div className="flex justify-center lg:justify-start order-1 lg:order-1">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-[320px] lg:h-[320px] slide-up">
              <div className="absolute -inset-3 rounded-[2rem] border border-primary/20"></div>
              <div className="w-full h-full rounded-[1.75rem] overflow-hidden border border-border/60 shadow-2xl shadow-primary/10 relative">
                <img
                  src={profile?.profile_image_url || profileImage}
                  alt={profile?.name || "Md Tanvir Chowdhury"}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-2xl bg-card border border-border/60 shadow-xl flex items-center justify-center">
                <span className="font-display font-bold text-2xl text-primary">TC</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8 order-1 lg:order-2">
            <div className="space-y-5 slide-up">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="eyebrow">Building Scalable Digital Solutions</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.05]">
                Hi, I'm{' '}
                <span className="text-gradient">
                  {profile?.name || "Md Tanvir Chowdhury"}
                </span>
              </h1>

              <h2 className="text-xl lg:text-2xl font-medium text-muted-foreground">
                {profile?.title || "Helping Founders & Solopreneurs Scale Efficiently"}
              </h2>
            </div>

            {/* Short Bio */}
            <div className="space-y-6 slide-up" style={{ animationDelay: '0.15s' }}>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0">
                {profile?.bio || "Full Stack Development (Pro-Code/WP) + AI Automation (n8n/Chatbots/LLMs) + 360° Marketing Strategy to scale revenue on autopilot."}
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center">
                <span className="text-sm font-semibold text-foreground/70 uppercase tracking-wider mr-2">
                  Languages:
                </span>
                <Badge variant="secondary" className="px-3 py-1">
                  Bengali
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  English
                </Badge>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start slide-up pt-2" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="h-12 px-8 text-base rounded-full shadow-lg shadow-primary/25" asChild>
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
                      className="w-12 h-12 rounded-full hover:scale-105 hover:border-primary/50 hover:text-primary transition-all"
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
            <div className="space-y-4 slide-up pt-6 border-t border-border/50" style={{ animationDelay: '0.45s' }}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Competitive Coding Profiles
              </h3>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {competitiveProfiles.map((profile) => (
                  <a
                    key={profile.platform}
                    href={profile.profile_link}
                    target="_blank"
                    className="text-sm px-5 py-2 rounded-full bg-secondary/40 border border-border/60 transition-all hover:bg-secondary hover:border-primary/30 hover:text-primary"
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
