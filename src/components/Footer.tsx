import { Button } from '@/components/ui/button';
import { Heart, ArrowUp, Mail, Github, Linkedin, Facebook, MessageCircle } from 'lucide-react';

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              <span className="text-gradient">Md. Tanvir</span> Chowdhury
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Software Engineer & Marketing Strategist passionate about creating solutions 
              that make a real impact. Always ready for new challenges and opportunities.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="border-border/50 bg-card/30 backdrop-blur-sm hover:scale-110 hover:glow-primary transition-all"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contact</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>📩 tanvir.chowdhury.us@gmail.com</p>
              <p>📞 +8801644916069</p>
              <p>🌏 Bashundhara R/A, Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Â© {currentYear} Md. Tanvir Chowdhury. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>and lots of coffee</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-border/50 bg-card/30 backdrop-blur-sm hover:glow-primary transition-all"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-primary"></div>
    </footer>
  );
};

export default Footer; 
