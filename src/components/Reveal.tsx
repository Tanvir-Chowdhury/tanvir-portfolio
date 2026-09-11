import { ReactNode } from 'react';
import { useReveal } from '@/hooks/use-reveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const { ref, inView } = useReveal();

  return (
    <div
      ref={ref}
      className={`${inView ? 'reveal-in' : 'reveal-init'} ${className}`}
      style={inView && delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
