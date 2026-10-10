import { Link } from 'react-router-dom';

export default function Kage() {
  return (
    <main className="flex h-dvh flex-col bg-background">
      <header className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 text-sm">
        <Link to="/" className="underline">← Back to portfolio</Link>
        <a href={`${import.meta.env.BASE_URL}kage/`} className="underline">Open full screen</a>
      </header>
      <iframe
        title="Kage — interactive Three.js temple experience"
        src={`${import.meta.env.BASE_URL}kage/`}
        className="min-h-0 w-full flex-1 border-0"
      />
    </main>
  );
}
