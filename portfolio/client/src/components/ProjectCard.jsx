import { ArrowUpRight, Github } from 'lucide-react';
import BentoCard from './BentoCard.jsx';
import { resolveImg } from '../api.js';

export default function ProjectCard({ project: p, index = 0 }) {
  return (
    <BentoCard
      delay={index * 0.06}
      padding={false}
      className="col-span-2 lg:col-span-2 group flex flex-col"
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.image ? (
          <img
            src={resolveImg(p.image)}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-indigo-500/25 via-purple-500/15 to-cyan-500/25">
            <span className="font-display text-4xl font-bold text-white/25">
              {p.title?.[0] ?? 'P'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/30 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70 backdrop-blur">
          {p.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-white/50">
          {p.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tech?.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-white/[0.06] pt-3 text-sm">
          {p.liveUrl && (
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-indigo-400 transition hover:text-indigo-300"
            >
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-white/50 transition hover:text-white"
            >
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </BentoCard>
  );
}