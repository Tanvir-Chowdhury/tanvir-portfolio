import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import bioImage from '@/assets/tanvir-bio.jpg';

const LongBio = () => {
  return (
    <section id='about_me' className="py-16 lg:px-6 bg-secondary/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"></div>

      <div className="container max-w-5xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Bio Content */}
          <div className="lg:col-span-12 space-y-8">
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="outline" className="px-4 py-1 text-sm border-accent/50 text-accent bg-accent/10 backdrop-blur-sm">
                About Me
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                My Journey & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Vision</span>
              </h2>
            </div>

            <Card className="p-4 lg:p-10 bg-card/40 backdrop-blur-md border-border/50 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                  I am Tanvir Chowdhury, a programmer, marketing & branding strategist who loves solving problems and creating solutions that make an impact. I founded <span className="text-foreground font-semibold">Ask for Branding</span>, where I help businesses grow through creative branding, marketing, digital strategies and custom software development solutions. Every project I take on is an opportunity to learn, improve and deliver value to the people I work with.
                </p>

                <p>
                  My skills in branding and marketing are built on experience. From designing websites to running social media campaigns and writing content, I've worked with over <span className="text-accent font-medium">20 clients</span> to bring their visions to life. One of my favorite achievements was leading a marketing campaign that reached <span className="text-accent font-medium">half a million people organically</span>, showing what's possible with the right strategy and effort.
                </p>

                <p>
                  I'm passionate about technology and have built projects ranging from AI chatbots to data analysis tools. Whether it's coding with <span className="text-primary font-medium">Python or JavaScript</span>, I enjoy using technology to solve real-world problems. These skills not only fuel my personal growth but also help me provide better solutions for my clients.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Future Vision</h3>
                    <p className="text-base">
                      In the next 5 to 10 years, I want to grow Ask for Branding into a globally recognized agency while also working on technological solutions that create real change.
                    </p>
                  </div>
                  <div className="p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-accent/30 transition-colors">
                    <h3 className="text-xl font-semibold text-foreground mb-3">Personal Interests</h3>
                    <p className="text-base">
                      I enjoy reading books like "Building a Story Brand" and watching K-dramas. I also love teaching, mentoring and occasionally playing football.
                    </p>
                  </div>
                </div>

                <p className="text-foreground font-medium text-xl border-l-4 border-primary pl-6 italic">
                  "If you're looking for someone who's passionate, hardworking and always ready to take on new challenges, let's connect. I'd love to hear about your goals and how we can work together!"
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LongBio; 
