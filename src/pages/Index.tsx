import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Process from '@/components/Process';
import Toolkit from '@/components/Skills';
import Experience from '@/components/Experience';
import Credentials from '@/components/Credentials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  // The app routes through HashRouter, so in-page anchors must scroll manually
  // instead of letting the browser rewrite location.hash.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('href')!.slice(1);
      if (!id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Preloader onDone={() => setLoaded(true)} />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero start={loaded} />
        <About />
        <Services />
        <Projects />
        <Process />
        <Toolkit />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
