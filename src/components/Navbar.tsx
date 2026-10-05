import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy for the active link (hero clears it)
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const hero = document.getElementById('top');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id === 'top' ? '' : `#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-6 pt-3">
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-4 md:px-6 py-2.5 transition-all duration-500 ${
            scrolled || menuOpen
              ? 'bg-background/85 backdrop-blur-xl border border-border shadow-lg shadow-black/5'
              : 'border border-transparent'
          }`}
        >
          {/* Logo */}
          <a href="#top" className="font-wide font-extrabold text-lg tracking-tight">
            TC<span className="text-accent">.</span>
          </a>

          {/* Availability status */}
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Open for new projects
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active === link.href ? 'text-accent' : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2.5">
            <a
              href="#contact"
              className="pill-solid hidden sm:inline-flex h-10 px-5 hover:shadow-primary/30"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-foreground transition-transform duration-300 ${
                    menuOpen ? 'translate-y-[5.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[1.5px] w-full bg-foreground transition-transform duration-300 ${
                    menuOpen ? '-translate-y-[5.5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-background/95 backdrop-blur-xl px-8 transition-all duration-500 lg:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="space-y-1">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`group flex items-baseline gap-4 py-1.5 transition-all duration-500 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${80 + i * 55}ms` : '0ms' }}
            >
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-wide text-4xl font-extrabold uppercase tracking-tight text-foreground transition-colors group-hover:text-accent">
                {link.label}
              </span>
            </a>
          ))}
        </nav>
        <div
          className={`mt-12 flex flex-wrap gap-2.5 transition-all delay-300 duration-500 ${
            menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          {['GitHub', 'LinkedIn', 'Facebook', 'WhatsApp', 'Email'].map((s) => (
            <span key={s} className="rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
