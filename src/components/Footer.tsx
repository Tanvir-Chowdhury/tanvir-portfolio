import { Button } from '@/components/ui/button';
import { Heart, ArrowUp, Mail, Github, Linkedin, Facebook, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/tanvir.11744", label: "Facebook" },
    { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/tanvir11744/", label: "LinkedIn" },
    { icon: <Github className="w-4 h-4" />, href: "https://github.com/Tanvir-Chowdhury", label: "GitHub" },
    { icon: <Mail className="w-4 h-4" />, href: "mailto:tanvir.chowdhury.us@gmail.com", label: "Email" },
    { icon: <MessageCircle className="w-4 h-4" />, href: "https://wa.me/+8801644916069", label: "WhatsApp" }
  ];

  const quickLinks = [
    { name: "About", href: "#about_me" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary/30 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none"></div>
      
      <div className="container max-w-6xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Md Tanvir</span> Chowdhury
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Software Engineer & Marketing Strategist passionate about creating solutions 
              that make a real impact. Always ready for new challenges and opportunities.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full border-border/50 bg-card/50 backdrop-blur-sm hover:scale-110 hover:border-primary/50 hover:text-primary transition-all duration-300"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform duration-200 flex items-center gap-2 w-fit"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground">Contact</h4>
            <div className="space-y-4 text-muted-foreground">
              <a href="mailto:tanvir.chowdhury.us@gmail.com" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                tanvir.chowdhury.us@gmail.com
              </a>
              <a href="tel:+8801644916069" className="flex items-center gap-3 hover:text-primary transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                +8801644916069
              </a>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <MapPin className="w-4 h-4" />
                </div>
                Bashundhara R/A, Dhaka, Bangladesh
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Md Tanvir Chowdhury. All rights reserved.
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-muted-foreground hover:text-primary hover:bg-primary/5 gap-2 group"
            >
              Back to Top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
