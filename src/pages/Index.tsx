import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import LongBio from '@/components/LongBio';
import Education from '@/components/Education';
import WorkExperience from '@/components/WorkExperience';
import Volunteering from '@/components/Volunteering';
import Certificates from '@/components/Certificates';
import Awards from '@/components/Awards';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Hobbies from '@/components/Hobbies';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />
      <Header />
      <Projects />
      <LongBio />
      <Education />
      <WorkExperience />
      <Volunteering />
      <Certificates />
      <Awards />
      <Skills />
      <Hobbies />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
