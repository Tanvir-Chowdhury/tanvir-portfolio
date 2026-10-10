import { useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';

// Below-fold sections are code-split: the hero paints from the small main
// bundle, everything else prefetches in the background right after load.
const Services = lazy(() => import('@/components/Services'));
const Projects = lazy(() => import('@/components/Projects'));
const Process = lazy(() => import('@/components/Process'));
const Toolkit = lazy(() => import('@/components/Skills'));
const Experience = lazy(() => import('@/components/Experience'));
const Credentials = lazy(() => import('@/components/Credentials'));
const Contact = lazy(() => import('@/components/Contact'));
const Footer = lazy(() => import('@/components/Footer'));

const chunkLoaders = [
  () => import('@/components/Services'),
  () => import('@/components/Projects'),
  () => import('@/components/Process'),
  () => import('@/components/Skills'),
  () => import('@/components/Experience'),
  () => import('@/components/Credentials'),
  () => import('@/components/Contact'),
  () => import('@/components/Footer'),
];

/** Invisible stand-in so the page height holds while a chunk parses. */
const SectionFallback = ({ height }: { height: number }) => (
  <div style={{ minHeight: height }} aria-hidden="true" />
);

const Index = () => {
  // The app routes through HashRouter, so in-page anchors must scroll manually
  // instead of letting the browser rewrite location.hash.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.getAttribute('href')?.startsWith('#/')) return;
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

  // Warm the section chunks right after the hero paints, so scrolling
  // feels instant without paying for them during first load.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      chunkLoaders.forEach((load) => {
        load();
      });
    }, 800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Suspense fallback={<SectionFallback height={1400} />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback height={2600} />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback height={1000} />}>
          <Process />
        </Suspense>
        <Suspense fallback={<SectionFallback height={800} />}>
          <Toolkit />
        </Suspense>
        <Suspense fallback={<SectionFallback height={2000} />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback height={700} />}>
          <Credentials />
        </Suspense>
        <Suspense fallback={<SectionFallback height={1000} />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback height={400} />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
