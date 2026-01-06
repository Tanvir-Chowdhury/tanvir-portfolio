import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, MessageCircle, Send } from 'lucide-react';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "tanvir.chowdhury.us@gmail.com",
      href: "mailto:tanvir.chowdhury.us@gmail.com",
      color: "bg-red-500/10 text-red-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+8801644916069",
      href: "tel:+8801644916069",
      color: "bg-green-500/10 text-green-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Bashundhara R/A, Dhaka, Bangladesh",
      href: "#",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: "linkedin.com/in/tanvir11744",
      href: "https://www.linkedin.com/in/tanvir11744/",
      color: "bg-blue-600/10 text-blue-600"
    }
  ];

  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      label: "Facebook",
      href: "https://www.facebook.com/tanvir.11744",
      color: "hover:text-[#1877F2] hover:bg-[#1877F2]/10"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tanvir11744/",
      color: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/10"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/Tanvir-Chowdhury",
      color: "hover:text-white hover:bg-white/10"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:tanvir.chowdhury.us@gmail.com",
      color: "hover:text-red-500 hover:bg-red-500/10"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/+8801644916069",
      color: "hover:text-green-500 hover:bg-green-500/10"
    }
  ];

  return (
    <section className="py-16 px-6 bg-secondary/5 relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="text-center space-y-6 mb-12">
          <Badge variant="outline" className="px-4 py-1 text-sm border-primary/50 text-primary bg-primary/10 backdrop-blur-sm">
            Get In Touch
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to collaborate on your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <Card 
                  key={index} 
                  className="p-4 bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/5"
                >
                  <a 
                    href={contact.href}
                    className="flex items-center gap-4 group-hover:translate-x-1 transition-transform"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${contact.color} bg-background/50 backdrop-blur-sm shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {contact.icon}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground font-medium mb-0.5">{contact.label}</p>
                      <p className="text-foreground font-semibold truncate group-hover:text-primary transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form / Telegram Button */}
          <Card className="p-8 bg-card/40 backdrop-blur-sm border-border/50 relative overflow-hidden flex flex-col justify-center items-center text-center space-y-6">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6 w-full">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Send a Message</h3>
                <p className="text-muted-foreground">
                  I'm currently available for freelance work and open to full-time opportunities.
                </p>
              </div>
              
              <Button className="w-full max-w-xs mx-auto group" size="lg" asChild>
                <a href="https://t.me/Tanvir11744" target="_blank" rel="noopener noreferrer">
                  Send Message on Telegram
                  <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </Button>

              <div className="pt-8 border-t border-border/30">
                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      className={`w-12 h-12 rounded-xl border-border/50 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/50 ${social.color}`}
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        {social.icon}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
