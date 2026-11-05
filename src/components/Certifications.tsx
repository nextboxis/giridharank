import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, FileText, Image as ImageIcon, Eye, ExternalLink, Download } from 'lucide-react'
import { certCategories, certs, type Cert, type CertCategory } from '../data/profile'
import { Modal } from './Modal'
import { Section } from './Section'

const isImage = (f: string) => /\.(png|jpe?g|webp|svg)$/i.test(f)
const path = (f: string) => `/certificates/${f}`

export function Certifications() {
  const [filter, setFilter] = useState<'All' | CertCategory>('All')
  const [active, setActive] = useState<Cert | null>(null)

  const list = useMemo(() => (filter === 'All' ? certs : certs.filter((c) => c.category === filter)), [filter])
  const tabs: ('All' | CertCategory)[] = ['All', ...certCategories]

  return (
    <Section id="certifications" index="06" label="Certifications" title={<>{certs.length} certifications, all verifiable.</>}>
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => {
          const count = t === 'All' ? certs.length : certs.filter((c) => c.category === t).length
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
                  layoutId="cert-pill"
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

      <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c) => (
            <motion.button
              layout
              key={c.file + c.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActive(c)}
              className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-accent/60"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-chrome">
                    <Award className="h-3.5 w-3.5 text-accent" />
                    {c.category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded border border-chrome/25 bg-bg px-2 py-0.5 font-mono text-[10px] uppercase text-chrome">
                    {isImage(c.file) ? <ImageIcon className="h-3 w-3" /> : <FileText className="h-3 w-3" />}
                    {isImage(c.file) ? 'IMG' : 'PDF'}
                  </span>
                </div>
                <p className="mt-4 font-display font-semibold leading-snug text-ink">{c.title}</p>
                <p className="mt-1 text-xs text-chrome/80">{c.issuer}</p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-3 text-xs text-faint transition group-hover:text-accent">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <Eye className="h-3.5 w-3.5" />
                  Preview Certificate
                </span>
                <span>→</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Modal open={!!active} onClose={() => setActive(null)} wide>
        {active && (
          <div>
            <div className="border-b border-line p-6 pr-16">
              <p className="inline-flex items-center gap-1.5 text-xs text-accent">
                <Award className="h-3.5 w-3.5" />
                {active.category} · {active.issuer}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold tracking-tight">{active.title}</h3>
            </div>
            <div className="bg-black">
              {isImage(active.file) ? (
                <img src={path(active.file)} alt={active.title} className="mx-auto max-h-[65vh] w-auto object-contain" />
              ) : (
                <iframe src={`${path(active.file)}#view=FitH`} title={active.title} className="h-[65vh] w-full" />
              )}
            </div>
            <div className="flex flex-wrap gap-3 p-6">
              <a
                href={path(active.file)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
              >
                <ExternalLink className="h-4 w-4" />
                Open Full Size
              </a>
              <a
                href={path(active.file)}
                download
                className="inline-flex items-center gap-2 rounded-full border border-chrome/30 px-5 py-2.5 text-sm text-chrome transition hover:text-ink"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
