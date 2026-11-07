import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FileDown, Menu, Search, X } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#walkthroughs', label: 'Walkthroughs' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 20))

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenCommand()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onOpenCommand])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open
          ? 'bg-gradient-to-b from-bg/95 via-bg/85 to-transparent backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="group inline-flex items-center gap-1.5 font-display text-base font-bold tracking-tight text-ink transition hover:text-chrome sm:text-lg"
        >
          <span>{profile.name}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125" />
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative py-1 text-sm text-chrome/85 transition duration-300 hover:text-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCommand}
            aria-label="Open command menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-chrome transition hover:border-accent hover:text-ink lg:hidden"
          >
            <Search className="h-4 w-4" />
          </button>

          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-ink transition hover:border-accent sm:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5 text-accent" />
            Resume
          </motion.a>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="border-b border-line bg-bg/98 px-5 py-4 shadow-2xl backdrop-blur-md lg:hidden"
        >
          <div className="grid grid-cols-2 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-surface hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              <FileDown className="h-4 w-4" /> Download Resume PDF
            </a>
            <button
              onClick={() => {
                setOpen(false)
                onOpenCommand()
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-xs text-chrome"
            >
              <Search className="h-3.5 w-3.5 text-accent" /> Quick Search
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
