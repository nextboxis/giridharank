import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Terminal, CheckCircle2 } from 'lucide-react'
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

      {/* Upgraded Project Cards Grid */}
      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition hover:-translate-y-1 hover:border-accent/60 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-0.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                    <Terminal className="h-3 w-3" />
                    {p.tag}
                  </span>
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

                <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-ink">
                  {p.name}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-chrome/85">{p.summary}</p>

                {/* Obsidian & Chrome Silver Terminal Execution Preview */}
                <div className="mt-5 overflow-hidden rounded-xl border border-chrome/20 bg-bg p-3.5 font-mono text-[11px] leading-relaxed text-chrome">
                  <pre className="overflow-x-auto whitespace-pre-wrap">{p.snippet}</pre>
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
                  onClick={() => setActive(p)}
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-accent transition group-hover:translate-x-0.5"
                >
                  Case Study →
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <Modal open={!!active} onClose={() => setActive(null)}>
        {active && (
          <div className="p-7 md:p-9">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-0.5 font-mono text-xs uppercase tracking-widest text-accent">
              <Terminal className="h-3.5 w-3.5" />
              {active.tag}
            </span>
            <h3 className="mt-3 pr-10 font-display text-3xl font-bold tracking-tight">{active.name}</h3>
            <p className="mt-3 leading-relaxed text-chrome/85">{active.description}</p>

            {/* Terminal Trace in Modal */}
            <div className="mt-6 rounded-xl border border-chrome/25 bg-bg p-4 font-mono text-xs text-chrome">
              <p className="mb-2 text-[10px] uppercase tracking-widest text-faint">Terminal Output Preview</p>
              <pre className="overflow-x-auto whitespace-pre-wrap">{active.snippet}</pre>
            </div>

            <p className="mt-7 font-mono text-xs uppercase tracking-[0.2em] text-faint">Architecture &amp; Highlights</p>
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
