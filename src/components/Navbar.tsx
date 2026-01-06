// Fixed Navbar component
// - Renders a fixed top navigation bar with a translucent backdrop.
// - Adjust the `pt-16` on pages (or the `py-3` here) to change layout spacing if needed.
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/40 supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">T</div>
            <span className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">Tanvir</span>
          </a>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {['About Me', 'Projects', 'Education', 'Experience', 'Certificates', 'Awards', 'Skills', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase().replace(' ', '_')}`} 
              onClick={(e) => handleScroll(e, item.toLowerCase().replace(' ', '_'))} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
          <a href="mailto:tanvir.chowdhury.us@gmail.com">
            <Button size="sm" className="ml-4 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-md shadow-primary/20 rounded-full px-6">
              Hire me
            </Button>
          </a>
        </div>

        <div className="lg:hidden">
          <Button size="icon" variant="ghost" onClick={() => setOpen(!open)} className="hover:bg-primary/10">
            {open ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl absolute w-full left-0 animate-in slide-in-from-top-5 fade-in duration-200">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {['About Me', 'Education', 'Experience', 'Certificates', 'Awards', 'Projects', 'Skills', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '_')}`} 
                onClick={(e) => handleScroll(e, item.toLowerCase().replace(' ', '_'))} 
                className="text-base font-medium text-foreground/80 hover:text-primary py-2 border-b border-border/50 last:border-0"
              >
                {item}
              </a>
            ))}
            <Button size="lg" asChild className="mt-4 bg-gradient-to-r from-primary to-accent w-full rounded-xl shadow-lg shadow-primary/20">
              <a href="mailto:tanvir.chowdhury.us@gmail.com">Hire me</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

