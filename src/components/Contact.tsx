import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, MessageCircle } from 'lucide-react';

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
      color: "hover:text-white"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/tanvir11744/",
      color: "hover:text-white"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/Tanvir-Chowdhury",
      color: "hover:text-white"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:tanvir.chowdhury.us@gmail.com",
      color: "hover:text-white"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/+8801644916069",
      color: "hover:text-white"
    }
  ];

  return (
    <section className="py-20 px-4 overflow-hidden" id="contact">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Ready to collaborate on your next project? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-full">
          {/* Contact Information */}
          <div className="space-y-6 min-w-0">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <Card 
                  key={index} 
                  className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:glow-primary transition-all duration-300 group"
                >
                  <a 
                    href={contact.href}
                    className="flex items-center gap-4 group-hover:scale-105 transition-transform min-w-0"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${contact.color}`}>
                      {contact.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-muted-foreground">{contact.label}</p>
                      <p className="font-medium text-foreground break-words">{contact.value}</p>
                    </div>
                  </a>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6 min-w-0">
            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
            
            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm border-border/50 space-y-6">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">
                  Ready to Start a Project?
                </h4>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  Whether you need web development, digital marketing or branding solutions, 
                  I'm here to help turn your vision into reality. Let's discuss your project 
                  and explore how we can achieve your goals together.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-primary hover:scale-105 transition-transform glow-primary text-sm md:text-base"
                  asChild
                >
                  <a href="mailto:tanvir@askforbranding.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Send me an Email
                  </a>
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">Or connect with me on</p>
                  <div className="flex justify-center gap-2 md:gap-3 flex-wrap">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className={`border-border/50 bg-card/30 backdrop-blur-sm hover:scale-110 transition-all ${social.color} w-10 h-10 md:w-12 md:h-12`}
                        asChild
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
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
      </div>
    </section>
  );
};

export default Contact; 
