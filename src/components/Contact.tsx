import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowUpRight,
  Calendar,
  Copy,
  Facebook,
  Github,
  Globe,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import SectionHead from '@/components/SectionHead';
import Reveal from '@/components/Reveal';
import { PROFILE, SOCIALS } from '@/data/content';

const SOCIAL_ICONS: Record<string, any> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Facebook: Facebook,
  WhatsApp: MessageCircle,
  Email: Mail,
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      toast({ title: 'Copied', description: PROFILE.email });
    } catch {
      toast({ title: 'Copy failed', description: PROFILE.email });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast({ title: 'Opening your mail app', description: 'Review your draft and send it from your email app.' });
  };

  return (
    <section id="contact" className="relative px-4 md:px-8 py-24 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          num="08"
          label="Contact"
          title={
            <>
              <span className="block">Let&apos;s build</span>
              <span className="block text-outline">something</span>
              <span className="block serif-accent normal-case">real.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
          {/* Left: copy + channels */}
          <Reveal>
            <div className="space-y-8">
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
                A website, an automation, a campaign — or all three. Tell me what you&apos;re working
                on and I&apos;ll reply within 24 hours.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${PROFILE.email}`} className="pill-outline h-12 px-6">
                  <Mail className="h-4 w-4 text-accent" />
                  {PROFILE.email}
                </a>
                <button onClick={copyEmail} className="pill-outline h-12 px-5 uppercase tracking-wider">
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="pill-outline h-11 px-5">
                  <MessageCircle className="h-4 w-4 text-green-500" />
                  WhatsApp
                </a>
                <a href={PROFILE.calendly} target="_blank" rel="noopener noreferrer" className="pill-outline h-11 px-5">
                  <Calendar className="h-4 w-4 text-accent" />
                  Book a free call
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {SOCIALS.map((social) => {
                  const Icon = SOCIAL_ICONS[social.label] || Globe;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/60 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* Right: email-style form */}
          <Reveal delay={100}>
            <form
              onSubmit={onSubmit}
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-black/5"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  New message
                </span>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                </div>
              </div>

              <div className="divide-y divide-border">
                <div className="flex items-center gap-4 px-6 py-3.5">
                  <span className="w-12 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    To
                  </span>
                  <span className="min-w-0 break-all rounded-full bg-secondary px-3.5 py-1.5 text-xs sm:text-sm">
                    Tanvir &lt;{PROFILE.email}&gt;
                  </span>
                </div>
                <div className="flex items-center gap-4 px-6 py-3.5">
                  <label htmlFor="contact-name" className="w-12 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    From
                  </label>
                  <input
                    id="contact-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
                <div className="flex items-center gap-4 px-6 py-3.5">
                  <label htmlFor="contact-email" className="w-12 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                  />
                </div>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={"Hi Tanvir,\n\nI'm working on…"}
                  rows={5}
                  className="w-full resize-none bg-transparent px-6 py-4 text-sm outline-none placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="flex items-center justify-between border-t border-border px-6 py-4">
                <span className="text-xs text-muted-foreground">Opens a draft in your email app.</span>
                <button type="submit" className="pill-solid h-11 px-6 disabled:opacity-60">
                  Open email draft
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
