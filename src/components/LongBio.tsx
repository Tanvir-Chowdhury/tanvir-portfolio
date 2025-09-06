import { Card } from '@/components/ui/card';
import bioImage from '@/assets/tanvir-bio.jpg';

const LongBio = () => {
  return (
    <section id='about_me' className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">

          {/* Bio Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                About <span className="text-gradient">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm Tanvir Chowdhury, a programmer, marketing & branding strategist who loves solving problems and creating solutions that make an impact. I founded Ask for Branding, where I help businesses grow through creative branding, marketing, and digital strategies. Every project I take on is an opportunity to learn, improve and deliver value to the people I work with.
              </p>

              <p>
                My skills in branding and marketing are built on experience. From designing websites to running social media campaigns and writing content, I've worked with over 20 clients to bring their visions to life. One of my favorite achievements was leading a marketing campaign that reached half a million people organically, showing what's possible with the right strategy and effort.
              </p>

              <p>
                I'm passionate about technology and have built projects ranging from AI chatbots to data analysis tools. Whether it's coding with Python, JavaScript or React.js, I enjoy using technology to solve real-world problems. These skills not only fuel my personal growth but also help me provide better solutions for my clients.
              </p>

              <p>
                In the next 5 to 10 years, I want to grow Ask for Branding into a globally recognized agency while also working on technological solutions that create real change. My dream is to build something that combines my love for technology and creativity, making life easier and better for businesses and people.
              </p>

              <p>
                Outside of work, I enjoy reading books like "Building a Story Brand" by Donald Miller and watching Korean dramas like "Business Proposal" and "Queen of Tears". I also love teaching, mentoring, and occasionally playing football.
              </p>

              <p className="text-foreground font-medium">
                If you're looking for someone who's passionate, hardworking, and always ready to take on new challenges, let's connect. I'd love to hear about your goals and how we can work together!
              </p>
            </div>
          </div>
        
      </div>
    </section>
  );
};

export default LongBio; 
