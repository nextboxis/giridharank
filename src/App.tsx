import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Walkthroughs } from './components/Walkthroughs'
import { Experience } from './components/Experience'
import { Certifications } from './components/Certifications'
import { Blog } from './components/Blog'
import { Contact } from './components/Contact'
import { ScrollProgress } from './components/ScrollProgress'
import { CommandPalette } from './components/CommandPalette'
import { profile } from './data/profile'

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false)

  return (
    <>
      <ScrollProgress />
      <Navbar onOpenCommand={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Walkthroughs />
        <Experience />
        <Certifications />
        <Blog />
        <Contact />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · Red Team &amp; Offensive Security
          </p>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setCmdOpen(true)}
              className="font-mono text-xs text-faint transition hover:text-accent"
            >
              Command Menu (Ctrl+K)
            </button>
            <a href="#top" className="transition hover:text-ink">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
