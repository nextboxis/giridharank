import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Users,
  Layers,
} from 'lucide-react'
import {
  projectCategories,
  projects,
  type Project,
  type ProjectCategory,
} from '../data/profile'
import { GithubIcon, TechBadgeIcon } from './BrandIcons'
import { Modal } from './Modal'
import { Section } from './Section'

export function Projects() {
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All')
  const [active, setActive] = useState<Project | null>(null)

  const list = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const tabs: ('All' | ProjectCategory)[] = ['All', ...projectCategories]

  return (
    <Section id="projects" index="03" label="Projects" title="Tools I've built to attack, detect and defend.">
      {/* Filter Bar */}
      <div className="mb-10 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const count = t === 'All' ? projects.length : projects.filter((p) => p.category === t).length
          const on = filter === t
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`relative rounded-full px-4 py-2 text-xs font-medium transition ${
                on ? 'text-white' : 'border border-line bg-surface text-chrome hover:text-ink'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="proj-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">
                {t} <span className={on ? 'text-white/75' : 'text-faint'}>({count})</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Upgraded Detailed Project Cards Grid */}
      <motion.div layout className="grid gap-5 sm:gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActive(p)}
              className="group flex min-w-0 cursor-pointer flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/60 sm:p-6 md:p-8"
            >
              <div className="min-w-0">
                {/* Top Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent sm:px-3 sm:text-[11px]">
                      <Terminal className="h-3 w-3 shrink-0" />
                      <span>{p.tag}</span>
                    </span>
                    <span className="rounded-full border border-line bg-bg px-2.5 py-0.5 font-mono text-[10px] text-faint sm:text-[11px]">
                      {p.period}
                    </span>
                  </div>

                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.name} GitHub Repository`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-chrome/25 bg-bg px-3 py-1 text-xs text-chrome transition hover:border-accent hover:text-ink"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Repo</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>

                {/* Title & Project Type Classification */}
                <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                  {p.name}
                </h3>
                <p className="mt-1 flex items-start gap-1.5 font-mono text-[11px] leading-snug text-accent sm:items-center sm:text-xs">
                  <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:mt-0" />
                  <span className="min-w-0 break-words">{p.projectType}</span>
                </p>

                <p className="mt-3 text-xs leading-relaxed text-ink/90 sm:text-sm">{p.description}</p>

                {/* Key Capability Metrics Bar */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.metrics.map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-accent/25 bg-accent/5 px-2 py-1 font-mono text-[10px] font-medium text-ink/90 sm:px-2.5 sm:text-[11px]"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Problem -> Solution -> Use Cases Breakdown */}
                <div className="mt-5 space-y-3 rounded-xl border border-line bg-bg/60 p-3.5 sm:p-4">
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      <span>Why I Built It · The Problem</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-chrome/90">{p.problem}</p>
                  </div>

                  <div className="border-t border-line/70 pt-3">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
                      <Wrench className="h-3.5 w-3.5 shrink-0" />
                      <span>How It Works · The Solution</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-chrome/90">{p.solution}</p>
                  </div>

                  <div className="border-t border-line/70 pt-3">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
                      <Users className="h-3.5 w-3.5 shrink-0" />
                      <span>Who It's For &amp; Real-World Use Cases</span>
                    </div>
                    <ul className="mt-2 space-y-1.5">
                      {p.useCases.map((u) => (
                        <li key={u.role} className="text-xs leading-relaxed text-chrome/90">
                          <span className="font-semibold text-ink">{u.role}:</span> {u.scenario}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Terminal Execution Preview */}
                <div className="mt-4 overflow-hidden rounded-xl border border-chrome/20 bg-bg p-3 font-mono text-[10px] leading-relaxed text-chrome sm:p-3.5 sm:text-[11px]">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words">{p.snippet}</pre>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-md border border-chrome/20 bg-bg px-2.5 py-1 text-xs text-chrome"
                    >
                      <TechBadgeIcon name={t} className="h-3 w-3 text-accent" />
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setActive(p)
                  }}
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-accent transition group-hover:translate-x-0.5"
                >
                  Full Case Study →
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div className="p-5 sm:p-7 md:p-9">
            <div className="flex flex-wrap items-center gap-2 pr-10">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-0.5 font-mono text-xs uppercase tracking-widest text-accent">
                <Terminal className="h-3.5 w-3.5" />
                {active.tag}
              </span>
              <span className="rounded-full border border-line bg-bg px-3 py-0.5 font-mono text-xs text-faint">
                {active.period}
              </span>
            </div>

            <h3 className="mt-3 pr-10 font-display text-2xl font-bold tracking-tight sm:text-3xl">{active.name}</h3>
            <p className="mt-1 font-mono text-xs text-accent">{active.projectType}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink/90 sm:text-base">{active.description}</p>

            {/* Key Metrics Row */}
            <div className="mt-4 flex flex-wrap gap-2">
              {active.metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-medium text-ink"
                >
                  {m}
                </span>
              ))}
            </div>

            {/* Problem & Solution Cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-line bg-bg p-4">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Why It Was Built (Problem)</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-chrome/90 sm:text-sm">{active.problem}</p>
              </div>

              <div className="rounded-xl border border-line bg-bg p-4">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <Wrench className="h-4 w-4 shrink-0" />
                  <span>How It Solves It (Solution)</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-chrome/90 sm:text-sm">{active.solution}</p>
              </div>
            </div>

            {/* User & Use Cases */}
            <div className="mt-6 rounded-xl border border-line bg-bg p-4 sm:p-5">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                <Users className="h-4 w-4 shrink-0" />
                <span>Who It Helps &amp; Practical Use Cases</span>
              </div>
              <div className="mt-3.5 grid gap-3 sm:grid-cols-3">
                {active.useCases.map((u) => (
                  <div key={u.role} className="rounded-lg border border-line/80 bg-surface p-3.5">
                    <p className="font-display text-sm font-semibold text-ink">{u.role}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-chrome/85">{u.scenario}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal Trace in Modal */}
            <div className="mt-6 rounded-xl border border-chrome/25 bg-bg p-3.5 font-mono text-[11px] text-chrome sm:p-4 sm:text-xs">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-faint">Terminal Output Preview</p>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words">{active.snippet}</pre>
            </div>

            <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-faint">Architecture &amp; Engineering Highlights</p>
            <ul className="mt-3.5 space-y-2.5">
              {active.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-ink/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-faint">Tech Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-chrome/25 bg-elevated px-3 py-1.5 text-xs font-medium text-chrome"
                >
                  <TechBadgeIcon name={t} className="h-3.5 w-3.5 text-accent" />
                  {t}
                </span>
              ))}
            </div>

            {/* Switch Project inside Modal */}
            <div className="mt-7 border-t border-line pt-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-faint">Switch Project</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActive(p)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                      p.id === active.id
                        ? 'bg-accent text-white'
                        : 'border border-line bg-bg text-chrome hover:text-ink'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
              <a
                href={active.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
              >
                <GithubIcon className="h-4 w-4" />
                View on GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => setActive(null)}
                className="rounded-full border border-line px-5 py-2.5 text-sm text-chrome transition hover:text-ink"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
