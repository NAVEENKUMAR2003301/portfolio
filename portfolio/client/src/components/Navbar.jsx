import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-ink/60 border-b border-white/[0.06]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3.5">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          VJ<span className="text-gradient">.</span>
        </a>
        <div className="flex items-center gap-1 text-sm">
          <a href="#work"    className="rounded-lg px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/5 transition">Work</a>
          <a href="#about"   className="rounded-lg px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/5 transition">About</a>
          <a href="#contact" className="rounded-lg px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/5 transition">Contact</a>
          <Link to="/admin" className="ml-1 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/40 hover:text-white hover:border-white/25 transition">
            Admin
          </Link>
        </div>
      </nav>
    </header>
  );
}