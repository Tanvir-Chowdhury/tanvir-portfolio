import type { ProjectArtKey } from '@/data/content';

/* Tiny building blocks -------------------------------------------------- */

const SkelLine = ({ w, className = '' }: { w: string; className?: string }) => (
  <div className={`h-1.5 rounded-full bg-foreground/15 ${className}`} style={{ width: w }} />
);

const Chip = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`rounded-md px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

const Dot = ({ className = '' }: { className?: string }) => (
  <span className={`inline-block h-1.5 w-1.5 rounded-full ${className}`} />
);

/* One animated scene per project ---------------------------------------- */

const Art = ({ kind }: { kind: ProjectArtKey }) => {
  switch (kind) {
    /* NSU Class Schedule Manager — a timetable auto-filling + RAG answer */
    case 'schedule':
      return (
        <div className="flex h-full w-full items-center justify-center gap-5 p-8">
          <div className="grid w-40 grid-cols-3 gap-1.5 rounded-xl border border-foreground/15 bg-card/80 p-2.5">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`art-drop h-4 rounded ${i % 4 === 1 ? 'bg-accent/80' : 'bg-foreground/10'}`}
                style={{ animationDelay: `${i * 0.22}s` }}
              />
            ))}
          </div>
          <div className="art-float relative w-28 rounded-2xl rounded-bl-sm border border-accent/40 bg-accent/10 p-2.5">
            <SkelLine w="90%" className="mb-1.5 bg-accent/60" />
            <SkelLine w="60%" className="bg-accent/40" />
            <span className="absolute -bottom-2 right-3 h-3 w-3 rotate-45 border-b border-r border-accent/40 bg-accent/10" />
          </div>
        </div>
      );

    /* WebShieldAI — radar sweep locking onto an intruder */
    case 'shield':
      return (
        <div className="grid h-full w-full place-items-center p-8">
          <div className="relative grid h-36 w-36 place-items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute rounded-full border border-foreground/15"
                style={{ inset: `${i * 20}px` }}
              />
            ))}
            <span
              className="art-sweep absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, hsl(var(--accent) / 0.55), transparent 70deg)',
                mask: 'radial-gradient(circle, transparent 18%, black 19%)',
                WebkitMask: 'radial-gradient(circle, transparent 18%, black 19%)',
              }}
            />
            <span className="art-shield-blink z-10 grid h-11 w-11 place-items-center rounded-xl bg-accent font-wide text-xs font-extrabold text-accent-foreground">
              AI
            </span>
            <span className="art-ping absolute h-4 w-4 rounded-full border-2 border-red-400/70" style={{ top: 14, right: 22 }} />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-red-400" style={{ top: 20, right: 26 }} />
          </div>
        </div>
      );

    /* NASA research assistant — planet, orbiting moon, cited answer */
    case 'space':
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 p-8">
          <div className="relative h-28 w-28">
            <span className="absolute inset-5 rounded-full bg-gradient-to-br from-primary/80 to-primary/30" />
            <span className="absolute inset-5 rounded-full border border-primary-glow/40" />
            <span className="art-orbit absolute inset-0">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent" />
            </span>
            <span className="art-orbit-rev absolute inset-2">
              <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground/50" />
            </span>
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="art-star-twinkle absolute h-1 w-1 rounded-full bg-foreground/70"
                style={{ top: `${10 + (i * 37) % 80}%`, left: `${8 + (i * 53) % 84}%`, animationDelay: `${i * 0.4}s` }}
              />
            ))}
          </div>
          <div className="art-float w-32 space-y-1.5 rounded-2xl rounded-bl-sm border border-foreground/10 bg-card/90 p-3">
            <div className="flex items-center gap-1.5">
              <Chip className="bg-accent text-accent-foreground">Source</Chip>
              <Chip className="bg-foreground/10 text-muted-foreground">OSDR</Chip>
            </div>
            <SkelLine w="95%" />
            <SkelLine w="70%" />
          </div>
        </div>
      );

    /* Phoenix Telegram Bot — 24/7 chat with typing indicator */
    case 'telegram':
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <div className="art-float w-40 rounded-2xl border-2 border-foreground/12 bg-card/90 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">P</span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">Phoenix Bot</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <div className="mb-2 h-5 w-24 rounded-lg rounded-bl-sm bg-accent/25">
              <div className="art-blink flex h-full items-center justify-center gap-1 pl-2">
                <Dot className="h-1 w-1 bg-accent" />
                <Dot className="h-1 w-1 bg-accent" />
                <Dot className="h-1 w-1 bg-accent" />
              </div>
            </div>
            <div className="h-6 w-32 rounded-lg rounded-br-sm bg-foreground/10 p-1.5">
              <div className="art-typing h-1.5 rounded-full bg-foreground/25" style={{ maxWidth: '100%' }} />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
              <span>24 / 7</span>
              <span className="text-accent">online</span>
            </div>
          </div>
        </div>
      );

    /* StreamFlex — movie player playing */
    case 'stream':
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <div className="art-float w-56 overflow-hidden rounded-xl border border-foreground/15 bg-card/90 shadow-lg">
            <div className="relative h-20 bg-gradient-to-br from-primary/50 via-primary/25 to-accent/30">
              <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-background/85">
                <span className="ml-0.5 border-y-[6px] border-l-[9px] border-y-transparent border-l-accent" />
              </span>
              <span className="absolute right-2 top-2 rounded bg-red-500 px-1.5 py-0.5 font-mono text-[7px] font-bold text-white">HD</span>
            </div>
            <div className="p-2.5">
              <div className="relative mb-2 h-1 overflow-hidden rounded-full bg-foreground/10">
                <span className="art-progress absolute inset-y-0 left-0 w-full" />
              </div>
              <div className="flex justify-between font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
                <span className="text-accent">Now streaming</span>
                <span>Buy · Subscribe</span>
              </div>
            </div>
          </div>
        </div>
      );

    /* Short-flix — vertical short videos swiping up */
    case 'shorts':
      return (
        <div className="flex h-full w-full items-center justify-center gap-3 overflow-hidden p-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="art-rise w-20 rounded-xl border border-foreground/12 bg-card/90 p-1.5"
              style={{ animationDelay: `${i * 0.55}s`, height: `${104 + i * 14}px` }}
            >
              <div className={`h-3/4 rounded-lg ${i === 1 ? 'bg-accent/40' : 'bg-foreground/10'}`} />
              <div className="mt-1.5 space-y-1">
                <SkelLine w="85%" />
                <SkelLine w="55%" />
              </div>
            </div>
          ))}
          <span className="absolute right-1/3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-accent font-bold text-accent-foreground">↑</span>
        </div>
      );

    /* 500K organic reach — counter + climbing graph */
    case 'reach':
      return (
        <div className="flex h-full w-full items-center justify-center gap-7 p-8">
          <div className="text-center">
            <div className="art-pulse-soft font-wide text-4xl font-extrabold text-accent">500K</div>
            <div className="mono-label mt-1">Organic reach</div>
          </div>
          <div className="flex h-24 items-end gap-2">
            {[35, 55, 42, 70, 88].map((h, i) => (
              <div
                key={i}
                className={`art-bar w-6 rounded-t-md ${i === 4 ? 'bg-accent' : 'bg-foreground/15'}`}
                style={{ height: `${h}%`, animationDelay: `${i * 0.16}s` }}
              />
            ))}
          </div>
        </div>
      );

    /* Brand identity studio — color swatches morphing + logo mark */
    case 'brand':
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 p-8">
          <div className="art-wiggle grid h-20 w-20 place-items-center rounded-2xl bg-accent font-wide text-2xl font-extrabold text-accent-foreground">
            A
          </div>
          <div className="space-y-2">
            {['bg-accent', 'bg-primary', 'bg-foreground/60'].map((c, i) => (
              <div
                key={c}
                className="art-drift flex h-7 w-32 items-center gap-2 rounded-full border border-foreground/10 bg-card/80 px-2"
                style={{ animationDelay: `${i * 0.7}s` }}
              >
                <span className={`h-3.5 w-3.5 rounded-full ${c}`} />
                <SkelLine w="60%" />
              </div>
            ))}
          </div>
        </div>
      );

    /* Ad analyzer — creatives scored live */
    case 'ads':
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 p-8">
          {[
            { name: 'Creative A', up: true },
            { name: 'Creative B', up: false },
            { name: 'Audience C', up: true },
          ].map((row, i) => (
            <div
              key={row.name}
              className="flex w-52 items-center justify-between rounded-xl border border-foreground/10 bg-card/85 px-3 py-2"
              style={{ animation: `artFloat 3.6s ease-in-out ${i * 0.4}s infinite` }}
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{row.name}</span>
              <span className={`font-wide text-xs font-extrabold ${row.up ? 'text-green-500' : 'text-red-400'}`}>
                {row.up ? '▲ WIN' : '▼ CUT'}
              </span>
            </div>
          ))}
        </div>
      );

    /* Competitor analyzer — two bars racing + spy lens */
    case 'rival':
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 p-8">
          <span className="art-bob grid h-14 w-14 place-items-center rounded-full border-2 border-accent text-lg">🔍</span>
          <div className="w-44 space-y-3">
            {[
              { label: 'You', w: '78%', c: 'bg-accent' },
              { label: 'Rival', w: '52%', c: 'bg-foreground/25' },
            ].map((b, i) => (
              <div key={b.label}>
                <div className="mb-1 flex justify-between font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
                  <span>{b.label}</span>
                  <span>{b.w}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className={`h-full rounded-full ${b.c}`}
                    style={{ width: b.w, animation: `artBar ${2 + i}s ease-in-out infinite`, transformOrigin: 'left' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    /* Caption writer — typewriter drafting a caption */
    case 'caption':
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <div className="w-60 rounded-2xl border border-foreground/12 bg-card/90 p-4">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">Draft caption</span>
            </div>
            <div className="art-caret font-mono text-[10px] text-foreground/80">
              Just dropped something new…
            </div>
            <div className="mt-3 flex gap-1.5">
              <Chip className="bg-accent text-accent-foreground">Post it</Chip>
              <Chip className="bg-foreground/10 text-muted-foreground">Rewrite</Chip>
            </div>
          </div>
        </div>
      );

    /* Post scraper — posts flying into a collection grid */
    case 'scraper':
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 p-8">
          <div className="relative h-24 w-24">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="art-fly absolute h-8 w-10 rounded-lg border border-foreground/15 bg-card"
                style={{ top: `${i * 26}px`, animationDelay: `${i * 0.8}s` }}
              >
                <span className="absolute inset-1.5 space-y-1">
                  <SkelLine w="100%" />
                  <SkelLine w="60%" />
                </span>
              </span>
            ))}
          </div>
          <div className="grid w-32 grid-cols-2 gap-1.5 rounded-xl border border-accent/40 bg-accent/10 p-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="art-drop h-8 rounded-lg bg-accent/50"
                style={{ animationDelay: `${0.4 + i * 0.5}s` }}
              />
            ))}
          </div>
        </div>
      );

    /* DataLens Olympics — podium rising with medals */
    case 'olympics':
      return (
        <div className="flex h-full w-full items-end justify-center gap-2 p-10">
          {[
            { h: 44, medal: '🥈', c: 'bg-foreground/15' },
            { h: 64, medal: '🥇', c: 'bg-accent/70' },
            { h: 32, medal: '🥉', c: 'bg-foreground/15' },
          ].map((b, i) => (
            <div key={b.medal} className="flex w-16 flex-col items-center">
              <span
                className="art-bob mb-1 text-lg"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {b.medal}
              </span>
              <div
                className={`art-rise w-full rounded-t-lg ${b.c}`}
                style={{ height: `${b.h}px`, animationDelay: `${i * 0.25}s` }}
              />
            </div>
          ))}
          <span className="mono-label ml-3 self-start pt-2">Paris 2024</span>
        </div>
      );

    /* Analytics scope of work — document sections checking off */
    case 'sow':
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <div className="w-48 rounded-xl border border-foreground/12 bg-card/90 p-3.5">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">Scope.pdf</span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </div>
            {['Goals', 'Deliverables', 'Method', 'Timeline'].map((s, i) => (
              <div key={s} className="mb-1.5 flex items-center justify-between">
                <SkelLine w="55%" />
                <span
                  className="art-drop grid h-3.5 w-3.5 place-items-center rounded-full bg-accent text-[7px] font-bold text-accent-foreground"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  ✓
                </span>
              </div>
            ))}
          </div>
        </div>
      );

    /* BizConnect — investor, founder, student nodes connecting */
    case 'connect':
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <div className="relative flex w-56 items-center justify-between">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 224 96" fill="none">
              <path d="M36 48 C 80 10, 144 10, 188 48" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="6 6" className="art-dash" />
              <path d="M36 48 C 80 86, 144 86, 188 48" stroke="hsl(var(--foreground) / 0.25)" strokeWidth="1.5" strokeDasharray="6 6" className="art-dash" />
            </svg>
            {[
              { l: 'VC', c: 'bg-primary text-primary-foreground' },
              { l: '🚀', c: 'bg-accent text-accent-foreground' },
              { l: '🎓', c: 'bg-card border border-foreground/15' },
            ].map((n) => (
              <span key={n.l} className={`art-float relative z-10 grid h-11 w-11 place-items-center rounded-full font-mono text-[9px] font-bold ${n.c}`}>
                {n.l}
              </span>
            ))}
          </div>
        </div>
      );

    /* RAG chatbot backend — pipeline doc → vectors → answer */
    case 'rag':
      return (
        <div className="flex h-full w-full items-center justify-center gap-2.5 p-8">
          <div className="flex h-16 w-12 flex-col justify-center gap-1 rounded-lg border border-foreground/15 bg-card/90 p-1.5">
            <SkelLine w="100%" />
            <SkelLine w="80%" />
            <SkelLine w="90%" />
          </div>
          <span className="text-accent">→</span>
          <div className="grid h-16 w-14 grid-cols-4 content-center gap-1 rounded-lg border border-foreground/15 bg-card/90 p-2">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="art-pulse-soft h-1.5 w-1.5 rounded-full bg-accent"
                style={{ animationDelay: `${i * 0.18}s` }}
              />
            ))}
          </div>
          <span className="text-accent">→</span>
          <div className="art-float h-16 w-20 rounded-lg rounded-bl-sm border border-accent/40 bg-accent/10 p-2">
            <SkelLine w="90%" className="mb-1.5 bg-accent/60" />
            <SkelLine w="65%" className="bg-accent/40" />
          </div>
        </div>
      );

    /* Deep learning lab — neural network firing */
    case 'neural':
      return (
        <div className="flex h-full w-full items-center justify-center p-8">
          <svg viewBox="0 0 200 90" className="h-24 w-52">
            {[20, 45, 70].map((x, col) =>
              [15, 45, 75].slice(0, col === 1 ? 4 : 3).map((y, row) => (
                <circle
                  key={`${x}-${y}`}
                  cx={x + col * 62 - col * 8}
                  cy={y}
                  r="5"
                  className={col === 1 ? 'art-pulse-soft' : ''}
                  fill={col === 1 ? 'hsl(var(--accent))' : 'hsl(var(--foreground) / 0.25)'}
                  style={{ animationDelay: `${(col + row) * 0.3}s` }}
                />
              ))
            )}
            <line x1="28" y1="15" x2="84" y2="15" stroke="hsl(var(--foreground) / 0.15)" />
            <line x1="28" y1="45" x2="84" y2="45" stroke="hsl(var(--accent) / 0.5)" strokeDasharray="4 4" className="art-dash" />
            <line x1="28" y1="75" x2="84" y2="75" stroke="hsl(var(--foreground) / 0.15)" />
            <line x1="90" y1="45" x2="146" y2="45" stroke="hsl(var(--accent) / 0.5)" strokeDasharray="4 4" className="art-dash" />
            <line x1="152" y1="45" x2="182" y2="45" stroke="hsl(var(--foreground) / 0.15)" />
          </svg>
        </div>
      );

    /* Dynamic API dashboard — live numbers ticking */
    case 'live':
      return (
        <div className="flex h-full w-full items-center justify-center gap-4 p-8">
          <div className="w-40 rounded-xl border border-foreground/12 bg-card/90 p-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">API feed</span>
              <span className="art-blink h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <div className="font-wide text-xl font-extrabold tabular-nums text-accent">24°C</div>
            <div className="mt-2 flex items-end gap-1">
              {[40, 65, 50, 80, 60, 90].map((h, i) => (
                <span
                  key={i}
                  className="art-bar w-2 rounded-t-sm bg-primary/50"
                  style={{ height: `${h * 0.35}px`, animationDelay: `${i * 0.14}s` }}
                />
              ))}
            </div>
          </div>
          <div className="art-float space-y-1.5 rounded-2xl rounded-bl-sm border border-foreground/10 bg-card/90 p-2.5">
            <SkelLine w="80px" />
            <SkelLine w="55px" />
          </div>
        </div>
      );

    /* Fruit Burst — fruits bobbing in a basket page */
    case 'fruit':
      return (
        <div className="flex h-full w-full items-end justify-center gap-3 p-10">
          {['🍊', '🍓', '🍇', '🍉'].map((f, i) => (
            <span
              key={f}
              className="art-bob text-3xl"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {f}
            </span>
          ))}
        </div>
      );

    /* Summer sale — swinging price tag with sheen */
    case 'sale':
      return (
        <div className="flex h-full w-full items-center justify-center gap-6 p-8">
          <div className="art-swing relative w-32 overflow-hidden rounded-2xl bg-accent p-4 text-accent-foreground shadow-lg">
            <span className="absolute -left-1.5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-background" />
            <div className="font-wide text-xl font-extrabold">-50%</div>
            <div className="font-mono text-[8px] uppercase tracking-wider opacity-80">Summer sale</div>
            <span className="art-sheen absolute inset-y-0 w-8 bg-white/40" />
          </div>
          <span className="art-ping absolute h-16 w-16 rounded-full border-2 border-accent/50" />
          <span className="font-wide text-3xl">🔥</span>
        </div>
      );

    /* Gamer Zone + Flower Shop — gamepad and blooming flower */
    case 'duo':
      return (
        <div className="flex h-full w-full items-center justify-center gap-8 p-8">
          <div className="art-wiggle text-4xl">🎮</div>
          <div className="relative flex flex-col items-center">
            <span className="art-bloom text-3xl">🌸</span>
            <span className="h-8 w-0.5 bg-green-500/60" />
          </div>
          <div className="space-y-1.5">
            <SkelLine w="70px" className="art-pulse-soft" />
            <SkelLine w="46px" />
          </div>
        </div>
      );

    /* Fallback */
    default:
      return (
        <div className="grid h-full w-full place-items-center p-8">
          <div className="w-48 rounded-xl border border-foreground/12 bg-card/90 p-3">
            <SkelLine w="80%" className="mb-2" />
            <SkelLine w="60%" />
          </div>
        </div>
      );
  }
};

export default Art;
