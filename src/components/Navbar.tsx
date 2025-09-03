// Fixed Navbar component
// - Renders a fixed top navigation bar with a translucent backdrop.
// - Adjust the `pt-16` on pages (or the `py-3` here) to change layout spacing if needed.
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-20 right-20 z-50 backdrop-blur-md bg-card/60 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">T</div>
            <span className="font-semibold">Tanvir</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-4">
            <a href="#about_me" className="text-sm hover:underline">About Me</a>
            <a href="#education" className="text-sm hover:underline">Education</a>
            <a href="#experience" className="text-sm hover:underline">Experiences</a>
            <a href="#certificates" className="text-sm hover:underline">Certificates</a>
            <a href="#awards" className="text-sm hover:underline">Awards</a>
          <a href="#projects" className="text-sm hover:underline">Projects</a>
          <a href="#skills" className="text-sm hover:underline">Skills</a>
          <a href="#contact" className="text-sm hover:underline">Contact</a>
          <a href="mailto:tanvir.chowdhury.us@gmail.com"><Button size="sm" className="ml-2 bg-gradient-to-br from-primary to-accent hover:bg-gradient-to-tl">Hire me</Button></a>
        </div>

        <div className="md:hidden">
          <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/40 bg-card/70 backdrop-blur-md">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-3">
            <a href="#projects" className="text-sm">Projects</a>
            <a href="#skills" className="text-sm">Skills</a>
            <a href="#contact" className="text-sm">Contact</a>
            <Button size="sm">Hire me</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
