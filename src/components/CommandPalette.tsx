import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Terminal,
  Award,
  FileDown,
  Mail,
  ArrowUpRight,
  Compass,
  BookOpen,
  X,
} from 'lucide-react'
import { blogPosts, certs, ctfWalkthroughs, profile, projects } from '../data/profile'
import { SocialIcon } from './BrandIcons'

type CommandItem = {
  id: string
  group: 'Navigation' | 'Projects' | 'CTF Walkthroughs' | 'Medium Blog' | 'Certifications' | 'Quick Actions'
  title: string
  subtitle: string
  icon: 'nav' | 'project' | 'blog' | 'cert' | 'resume' | 'mail' | 'social'
  socialLabel?: string
  action: () => void
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (open) onClose()
      } else if (e.key === 'Escape' && open) {
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const items = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      { id: 'nav-about', group: 'Navigation', title: 'Go to About & Live Telemetry', subtitle: '01 / Story, GitHub API & TryHackMe', icon: 'nav', action: () => { location.hash = '#about'; onClose() } },
      { id: 'nav-skills', group: 'Navigation', title: 'Go to Technical Toolkit', subtitle: '02 / 8 Offense, Defense & Build groups', icon: 'nav', action: () => { location.hash = '#skills'; onClose() } },
      { id: 'nav-projects', group: 'Navigation', title: 'Go to Security & AI Projects', subtitle: '03 / 7 Flagship tools & case studies', icon: 'nav', action: () => { location.hash = '#projects'; onClose() } },
      { id: 'nav-walkthroughs', group: 'Navigation', title: 'Go to CTF & Lab Walkthroughs', subtitle: '04 / Step-by-step exploit chains & fixes', icon: 'nav', action: () => { location.hash = '#walkthroughs'; onClose() } },
      { id: 'nav-exp', group: 'Navigation', title: 'Go to Experience', subtitle: '05 / Internship & 5 Simulations', icon: 'nav', action: () => { location.hash = '#experience'; onClose() } },
      { id: 'nav-certs', group: 'Navigation', title: 'Go to Certifications Vault', subtitle: '06 / 25 Verified PDFs & Images', icon: 'nav', action: () => { location.hash = '#certifications'; onClose() } },
      { id: 'nav-blog', group: 'Navigation', title: 'Go to Medium Security Blog', subtitle: '07 / Technical writeups & articles', icon: 'nav', action: () => { location.hash = '#blog'; onClose() } },
      { id: 'nav-contact', group: 'Navigation', title: 'Go to Contact', subtitle: '08 / Direct channels & message form', icon: 'nav', action: () => { location.hash = '#contact'; onClose() } },
    ]

    const actionItems: CommandItem[] = [
      {
        id: 'act-resume',
        group: 'Quick Actions',
        title: 'Download Resume (PDF)',
        subtitle: 'giridharan.pdf',
        icon: 'resume',
        action: () => {
          window.open(profile.resume, '_blank')
          onClose()
        },
      },
      {
        id: 'act-email',
        group: 'Quick Actions',
        title: 'Copy Email Address',
        subtitle: profile.email,
        icon: 'mail',
        action: () => {
          navigator.clipboard?.writeText(profile.email)
          onClose()
        },
      },
      ...profile.socials.map((s) => ({
        id: `soc-${s.label}`,
        group: 'Quick Actions' as const,
        title: `Open ${s.label}`,
        subtitle: `@${s.handle}`,
        icon: 'social' as const,
        socialLabel: s.label,
        action: () => {
          window.open(s.url, '_blank')
          onClose()
        },
      })),
    ]

    const blogItems: CommandItem[] = blogPosts.map((b) => ({
      id: `blog-${b.id}`,
      group: 'Medium Blog',
      title: b.title,
      subtitle: `${b.date} · ${b.readTime}`,
      icon: 'blog',
      action: () => {
        window.open(b.url, '_blank')
        onClose()
      },
    }))

    const projItems: CommandItem[] = projects.map((p) => ({
      id: `proj-${p.id}`,
      group: 'Projects',
      title: p.name,
      subtitle: `${p.tag} · ${p.summary}`,
      icon: 'project',
      action: () => {
        window.open(p.repo, '_blank')
        onClose()
      },
    }))

    const certItems: CommandItem[] = certs.slice(0, 10).map((c) => ({
      id: `cert-${c.file}`,
      group: 'Certifications',
      title: c.title,
      subtitle: `${c.issuer} (${c.category})`,
      icon: 'cert',
      action: () => {
        window.open(`/certificates/${c.file}`, '_blank')
        onClose()
      },
    }))

    const walkthroughItems: CommandItem[] = ctfWalkthroughs.map((w) => ({
      id: `ctf-${w.id}`,
      group: 'CTF Walkthroughs',
      title: w.title,
      subtitle: `${w.platform} · ${w.category}`,
      icon: 'project',
      action: () => {
        location.hash = '#walkthroughs'
        onClose()
      },
    }))

    return [...actionItems, ...walkthroughItems, ...blogItems, ...navItems, ...projItems, ...certItems]
  }, [onClose])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.subtitle.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q),
    )
  }, [items, query])

  const groups = ['Quick Actions', 'CTF Walkthroughs', 'Medium Blog', 'Navigation', 'Projects', 'Certifications'] as const

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 p-4 pt-20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.99 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search className="h-4 w-4 text-accent" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, Medium articles, certificates, or actions..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-faint focus:outline-none"
              />
              <button
                onClick={onClose}
                className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-faint hover:text-ink"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="py-10 text-center text-sm text-faint">No matching commands found.</p>
              ) : (
                groups.map((grp) => {
                  const groupItems = filtered.filter((i) => i.group === grp)
                  if (groupItems.length === 0) return null
                  return (
                    <div key={grp} className="mb-3 last:mb-0">
                      <p className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-faint">
                        {grp}
                      </p>
                      <div className="space-y-0.5">
                        {groupItems.map((item) => (
                          <button
                            key={item.id}
                            onClick={item.action}
                            className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition hover:bg-elevated"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-bg text-muted group-hover:border-accent/40 group-hover:text-accent">
                                {item.icon === 'nav' && <Compass className="h-4 w-4" />}
                                {item.icon === 'project' && <Terminal className="h-4 w-4" />}
                                {item.icon === 'blog' && <BookOpen className="h-4 w-4" />}
                                {item.icon === 'cert' && <Award className="h-4 w-4" />}
                                {item.icon === 'resume' && <FileDown className="h-4 w-4" />}
                                {item.icon === 'mail' && <Mail className="h-4 w-4" />}
                                {item.icon === 'social' && (
                                  <SocialIcon label={item.socialLabel || ''} className="h-4 w-4" />
                                )}
                              </span>
                              <div className="truncate">
                                <p className="truncate text-sm font-medium text-ink">{item.title}</p>
                                <p className="truncate text-xs text-faint">{item.subtitle}</p>
                              </div>
                            </div>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-line bg-bg/60 px-4 py-2.5 font-mono text-[11px] text-faint">
              <span>Press Ctrl+K / ⌘K anytime</span>
              <button onClick={onClose} className="inline-flex items-center gap-1 hover:text-ink">
                <X className="h-3 w-3" /> Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
