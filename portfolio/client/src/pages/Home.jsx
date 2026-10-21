import { useEffect, useState } from 'react';
import {
  ArrowUpRight, Github, Linkedin, Mail, MapPin, Sparkles, Code2, Database, Wrench
} from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import BentoCard from '../components/BentoCard.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import api from '../api.js';
import profile from '../../../public/profile.jpeg'
const SKILL_GROUPS = [
  { icon: Code2,    label: 'Frontend',  items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Tailwind', 'Bootstrap'] },
  { icon: Database, label: 'Backend',   items: ['Node.js', 'Express.js', 'REST APIs', 'CRUD', 'Auth'] },
  { icon: Database, label: 'Database',  items: ['MongoDB', 'Mongoose'] },
  { icon: Wrench,   label: 'Tools',     items: ['Git', 'GitHub', 'VS Code', 'WordPress', 'API Integration'] }
];

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/projects')
      .then((r) => setProjects(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id="top" className="relative min-h-screen">
      {/* ── Ambient background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-indigo-600/20 blur-[140px] animate-float" />
        <div className="absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full bg-purple-600/15 blur-[140px] animate-float [animation-delay:2s]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px] animate-float [animation-delay:4s]" />
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)'
          }}
        />
      </div>

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 pt-8">
        {/* ══════════ BENTO GRID ══════════ */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">

          {/* ── 1. HERO ── */}
          <BentoCard className="col-span-2 lg:col-span-4 flex min-h-[260px] flex-col justify-between">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for new opportunities
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Hello, I'm</p>
              <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
                Naveenkumar VJ.
              </h1>
              <p className="text-gradient mt-3 font-display text-lg font-semibold sm:text-xl">
                Full Stack Developer · MERN
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
                I build modern, responsive, user-focused web applications that turn ideas into
                real-world digital experiences.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="#work"
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/90"
              >
                View My Work <ArrowUpRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:bg-white/5"
              >
                Contact Me
              </a>
            </div>
          </BentoCard>

          {/* ── 2. AVATAR / MONOGRAM ── */}
          <BentoCard delay={0.05} className="col-span-2 lg:col-span-2 flex flex-col items-center justify-center gap-4 py-8">
            {/* <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 blur-xl opacity-60" />
              <div className="relative grid h-28 w-28 place-items-center rounded-full border border-white/15 bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-cyan-400/40 backdrop-blur">
                <span className="font-display text-3xl font-bold tracking-tight">NV</span>
              </div>
            </div> */}
            <div className="relative">
  {/* glow behind the photo */}
  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 blur-xl opacity-60" />
  {/* photo frame */}
  <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-white/20 ring-2 ring-indigo-500/30">
    <img
      src={profile}
      alt="Naveenkumar V"
      loading="lazy"
      className="h-full w-full object-cover"
    />
  </div>
</div>
            <div className="text-center">
              <p className="font-display text-sm font-semibold">Naveenkumar V</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/40">
                <MapPin size={11} /> Tamil Nadu, India
              </p>
            </div>
          </BentoCard>

          {/* ── 3. ABOUT ── */}
          <BentoCard id="about" delay={0.1} className="col-span-2 lg:col-span-3 scroll-mt-24">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-wider text-white/50">
              <Sparkles size={11} /> About me
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              I'm a <span className="text-white/90 font-medium">Senior Associate Software Engineer at Stackly</span>,
              passionate about building modern web applications and solving real-world problems
              through technology.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/45">
              I work across the MERN stack — React.js, Node.js, Express.js and MongoDB — turning ideas
              into functional applications with clean design and great user experience. Beyond coding,
              I enjoy building personal projects and sharing knowledge with other developers.
            </p>
          </BentoCard>

          {/* ── 4. STATS ── */}
          <BentoCard delay={0.15} className="col-span-2 lg:col-span-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: '2024', l: 'B.E. ECE Graduate' },
                { v: '10+',  l: 'Projects Built' },
                { v: 'MERN', l: 'Core Stack' }
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                  <p className="text-gradient font-display text-xl font-bold sm:text-2xl">{s.v}</p>
                  <p className="mt-1 text-[11px] leading-tight text-white/40">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <p className="text-xs text-emerald-300/90">
                Currently building at <span className="font-semibold">Stackly</span>
              </p>
            </div>
          </BentoCard>

          {/* ── 5. SKILLS ── */}
          <BentoCard delay={0.2} className="col-span-2 lg:col-span-4">
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/35">Tech Stack</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {SKILL_GROUPS.map(({ icon: Icon, label, items }) => (
                <div key={label}>
                  <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/70">
                    <Icon size={13} className="text-indigo-400" /> {label}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/55 transition hover:border-indigo-400/40 hover:text-white"
                      >
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* ── 6. EXPERIENCE ── */}
          <BentoCard delay={0.25} className="col-span-2 lg:col-span-2 flex flex-col justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-white/35">Experience</p>
              <p className="font-display text-sm font-semibold leading-snug">
                Senior Associate Software Engineer
              </p>
              <p className="mt-0.5 text-xs text-indigo-400">Stackly</p>
              <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-white/45">
                <li>• Web &amp; application development</li>
                <li>• Modern frontend with JavaScript</li>
                <li>• Responsive, user-focused UI</li>
                <li>• API integration &amp; full-stack work</li>
                <li>• Technical training &amp; knowledge sharing</li>
              </ul>
            </div>
            <div className="mt-4 border-t border-white/[0.06] pt-3">
              <p className="text-[11px] text-white/35">B.E. Electronics &amp; Communication</p>
              <p className="text-[11px] text-white/25">2024 · First Class</p>
            </div>
          </BentoCard>

          {/* ── 7. PROJECTS ── */}
          <div
            id="work"
            className="col-span-2 grid scroll-mt-24 grid-cols-2 gap-3 sm:gap-4 lg:col-span-6 lg:grid-cols-6"
          >
            <div className="col-span-2 mb-1 flex items-end justify-between lg:col-span-6">
              <h2 className="font-display text-lg font-semibold">Selected Work</h2>
              <span className="text-xs text-white/30">{projects.length} projects</span>
            </div>

            {loading &&
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="col-span-2 h-64 animate-pulse rounded-3xl border border-white/[0.06] bg-white/[0.02] lg:col-span-2"
                />
              ))}

            {!loading &&
              projects.map((p, i) => <ProjectCard key={p._id} project={p} index={i} />)}

            {!loading && projects.length === 0 && (
              <p className="col-span-2 py-8 text-center text-sm text-white/30 lg:col-span-6">
                No projects yet — add some from the admin panel.
              </p>
            )}
          </div>

          {/* ── 8. CONTACT ── */}
          <BentoCard id="contact" delay={0.1} className="col-span-2 scroll-mt-24 lg:col-span-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-xl font-bold sm:text-2xl">
                  Let's build something <span className="text-gradient">meaningful</span>.
                </h2>
                <p className="mt-2 max-w-md text-sm text-white/45">
                  Have an idea, a project, or an opportunity to collaborate? I'm always open to
                  connecting with developers and building useful digital products.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <a
                  href="mailto:livnaveen@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-white/90"
                >
                  <Mail size={15} /> Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/naveenkumar-v-a78244240/"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/5"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a
                  href="https://github.com/NAVEENKUMAR2003301"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm text-white/80 transition hover:border-white/30 hover:bg-white/5"
                >
                  <Github size={15} /> GitHub
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.06] pt-4 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
              <p>© {new Date().getFullYear()} Naveenkumar V. Built with the MERN stack.</p>
              <a href="#top" className="transition hover:text-white/60">Back to top ↑</a>
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  );
}