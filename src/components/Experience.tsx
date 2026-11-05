import { Briefcase, FileCheck2, ArrowUpRight } from 'lucide-react'
import { experience } from '../data/profile'
import { Reveal, Section } from './Section'

export function Experience() {
  return (
    <Section id="experience" index="05" label="Experience" title="Internship & industry simulations.">
      <div className="divide-y divide-line border-y border-line">
        {experience.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.04}>
            <div className="group grid gap-4 py-8 md:grid-cols-12 md:items-center">
              <div className="md:col-span-4">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-chrome/25 bg-surface text-accent">
                    <Briefcase className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink">{e.company}</p>
                    <p className="text-xs text-faint">{e.type}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6">
                <p className="font-display font-semibold text-ink">{e.role}</p>
                <p className="mt-1 text-sm leading-relaxed text-chrome/85">{e.details}</p>
              </div>

              <div className="md:col-span-2 md:text-right">
                <a
                  href={e.cert}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-chrome/30 bg-surface px-3.5 py-1.5 text-xs font-medium text-chrome transition hover:border-accent hover:text-white"
                >
                  <FileCheck2 className="h-3.5 w-3.5 text-accent" />
                  <span>Verify PDF</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
