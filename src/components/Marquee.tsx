interface MarqueeProps {
  items: string[];
}

/** Full-width scrolling band: alternating outline / solid words with amber asterisks. */
const Marquee = ({ items }: MarqueeProps) => {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <span key={`${key}-${i}`} className="flex items-center">
          <span
            className={`font-wide font-extrabold uppercase whitespace-nowrap text-4xl md:text-6xl leading-none px-4 md:px-6 ${
              i % 2 === 0 ? 'text-outline' : 'text-foreground'
            }`}
          >
            {item}
          </span>
          <span className="text-accent text-3xl md:text-5xl leading-none select-none">✳</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative w-full overflow-hidden border-y border-border py-6 md:py-8 select-none">
      <div className="marquee-track">
        {row('a')}
        {row('b')}
        {row('c')}
        {row('d')}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
};

export default Marquee;
