import { useState } from 'react'
import {
  Crosshair,
  GlobeLock,
  Wifi,
  Binary,
  ShieldCheck,
  KeyRound,
  Code2,
  Cpu,
} from 'lucide-react'
import { skills, type SkillGroup } from '../data/profile'
import { Reveal, Section } from './Section'

const focusLabel = { offense: 'Red Team Offense', defense: 'Defense & Cloud', build: 'Build & AI' } as const

function GroupIcon({ icon }: { icon: string }) {
  const cls = 'h-4 w-4 text-accent'
  switch (icon) {
    case 'crosshair':
      return <Crosshair className={cls} />
    case 'globe-lock':
      return <GlobeLock className={cls} />
    case 'wifi':
      return <Wifi className={cls} />
    case 'binary':
      return <Binary className={cls} />
    case 'shield-check':
      return <ShieldCheck className={cls} />
    case 'key-round':
      return <KeyRound className={cls} />
    case 'code':
      return <Code2 className={cls} />
    default:
      return <Cpu className={cls} />
  }
}

export function Skills() {
  const [filter, setFilter] = useState<'all' | SkillGroup['focus']>('all')
  const filtered = filter === 'all' ? skills : skills.filter((s) => s.focus === filter)

  return (
    <Section id="skills" index="02" label="Skills & Arsenal" title="The technical toolkit.">
      <div className="mb-8 flex flex-wrap gap-2">
        {(
          [
            { id: 'all', label: 'All Domains (8)' },
            { id: 'offense', label: 'Red Team & Offense (4)' },
            { id: 'defense', label: 'Defense & Cloud (2)' },
            { id: 'build', label: 'Full-Stack & AI (2)' },
          ] as const
        ).map((tab) => {
          const active = filter === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                active
                  ? 'bg-accent text-white shadow-sm shadow-accent/30'
                  : 'border border-line bg-surface text-chrome hover:border-chrome/50 hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-chrome/20 bg-line sm:grid-cols-2">
        {filtered.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 0.06} className="group min-w-0 bg-bg p-5 transition-colors hover:bg-surface sm:p-7 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-chrome/25 bg-surface">
                  <GroupIcon icon={g.icon} />
                </span>
                <h3 className="font-display text-base font-semibold text-ink sm:text-lg">{g.title}</h3>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${
                  g.focus === 'offense'
                    ? 'border border-accent/40 bg-accent/10 text-accent'
                    : 'border border-chrome/30 bg-surface text-chrome'
                }`}
              >
                {focusLabel[g.focus]}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-line bg-surface px-2.5 py-1 text-xs font-medium text-chrome transition group-hover:border-chrome/40 group-hover:text-ink sm:px-3"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
