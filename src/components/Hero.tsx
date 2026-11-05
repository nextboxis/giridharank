import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Download,
  Terminal,
  Award,
  ShieldAlert,
  Briefcase,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { profile, stats } from '../data/profile'
import { useTyping } from '../hooks/useTyping'
import { SocialIcon } from './BrandIcons'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as const },
})

const statIcons = [ShieldAlert, Terminal, Award, Briefcase]

const portraitModes = [
  {
    id: 'noir',
    label: 'Crimson Noir',
    filterClass: 'contrast-105 brightness-95 saturate-[0.82]',
  },
  {
    id: 'chrome',
    label: 'Chrome Silver',
    filterClass: 'grayscale contrast-115 brightness-100',
  },
  {
    id: 'clean',
    label: 'Dark Studio',
    filterClass: 'contrast-105 brightness-100',
  },
] as const

export function Hero() {
  const typed = useTyping(profile.roles)
  const [modeId, setModeId] = useState<(typeof portraitModes)[number]['id']>('noir')
  const activePortrait = portraitModes.find((m) => m.id === modeId) ?? portraitModes[0]

  return (
    <section id="top" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* Locked-in Crimson Laser Grid Atmosphere */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 65% 8%, rgba(212, 21, 20, 0.13), transparent 70%), radial-gradient(ellipse 50% 35% at 25% 15%, rgba(205, 203, 202, 0.08), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Operator Identity & Actions */}
          <div className="min-w-0 lg:col-span-7">
            <motion.div
              {...fadeUp(0)}
              className="chrome-bezel inline-flex max-w-full items-center gap-2.5 rounded-full border border-chrome/25 bg-surface px-3.5 py-1.5 text-[11px] text-chrome sm:text-xs"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-65" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="truncate">
                Open to Red Team, Penetration Testing &amp; Security Engineering roles
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="hero-fluid-title mt-6 font-display font-bold tracking-tight text-ink sm:mt-7"
            >
              {profile.name}
              <span className="hero-fluid-subtitle text-metallic-chrome mt-2 block font-semibold">
                {profile.headline}.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-7 flex h-8 items-center gap-2 font-mono text-base text-ink sm:text-lg md:text-xl"
            >
              <Terminal className="h-5 w-5 shrink-0 text-accent" />
              <span className="truncate text-chrome">{typed}</span>
              <span className="caret inline-block h-5 w-[2px] shrink-0 bg-accent" />
            </motion.p>

            <motion.p
              {...fadeUp(0.3)}
              className="mt-5 max-w-2xl text-base leading-relaxed text-chrome/85 md:text-lg"
            >
              {profile.intro}
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center gap-3.5">
              <motion.a
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
              >
                Explore Security Tools
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={profile.resume}
                download
                className="chrome-bezel inline-flex items-center gap-2 rounded-full border border-chrome/35 bg-surface px-6 py-3 text-sm font-medium text-chrome transition hover:border-chrome hover:text-ink"
              >
                <Download className="h-4 w-4 text-accent" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Pills with Smooth Spring Hover */}
            <motion.div {...fadeUp(0.48)} className="mt-8 flex flex-wrap items-center gap-2.5">
              {profile.socials.map((s) => (
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-chrome transition hover:border-chrome/60 hover:text-ink"
                >
                  <SocialIcon
                    label={s.label}
                    className="h-3.5 w-3.5 text-chrome transition group-hover:text-accent"
                  />
                  <span className="font-medium text-ink">{s.label}</span>
                  <span className="font-mono text-[11px] text-faint">/{s.handle}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Aesthetic Psychological-Color Portrait Frame */}
          <motion.div
            {...fadeUp(0.22)}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:col-span-5 lg:max-w-none"
          >
            {/* Tight Precision Chrome + Crimson Specular Rim */}
            <div
              className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-80"
              style={{
                background:
                  'linear-gradient(135deg, rgba(205, 203, 202, 0.35) 0%, rgba(34, 33, 33, 0.2) 50%, rgba(212, 21, 20, 0.45) 100%)',
              }}
            />

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="chrome-bezel group relative overflow-hidden rounded-3xl border border-chrome/25 bg-surface p-2.5"
            >
              {/* Top Specular Laser Line on Portrait Card */}
              <div className="laser-top-line pointer-events-none absolute inset-x-6 top-0 z-20 h-[1.5px]" />

              {/* Corner Tactical Reticle Accents */}
              <span className="pointer-events-none absolute left-4 top-4 z-20 h-4 w-4 border-l-2 border-t-2 border-accent" />
              <span className="pointer-events-none absolute right-4 top-4 z-20 h-4 w-4 border-r-2 border-t-2 border-chrome/60" />
              <span className="pointer-events-none absolute bottom-16 left-4 z-20 h-4 w-4 border-b-2 border-l-2 border-chrome/60" />
              <span className="pointer-events-none absolute bottom-16 right-4 z-20 h-4 w-4 border-b-2 border-r-2 border-accent" />

              {/* Top Operator Status Pill */}
              <div className="absolute left-6 top-6 z-20 inline-flex items-center gap-1.5 rounded-full border border-chrome/25 bg-bg/85 px-3 py-1 font-mono text-[10px] tracking-widest text-chrome backdrop-blur-md">
                <ShieldCheck className="h-3 w-3 text-accent" />
                <span>OPERATOR // GK-01</span>
              </div>

              {/* Portrait Image with Obsidian Vignette & Crimson/Chrome Duotone Grade */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-bg">
                <motion.div
                  key={activePortrait.id}
                  initial={{ opacity: 0.4, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative h-full w-full transition duration-700 group-hover:scale-[1.03] ${activePortrait.filterClass}`}
                >
                  <img
                    src="/giridharan-hero-top.svg"
                    alt={`${profile.name} — Red Team & Offensive Security Specialist`}
                    className="block h-[34%] w-full object-cover"
                  />
                  <img
                    src="/giridharan-hero-bot.svg"
                    alt=""
                    aria-hidden="true"
                    className="-mt-px block h-[66.2%] w-full object-cover"
                  />
                  {activePortrait.id === 'noir' && (
                    <div
                      className="pointer-events-none absolute inset-0 mix-blend-color"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 42%, transparent 35%, rgba(212, 21, 20, 0.22) 100%)',
                      }}
                    />
                  )}
                </motion.div>

                {/* Subtle Psychological Color Overlay (Obsidian bottom gradient + Chrome inner ring) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-90" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-chrome/15" />

                {/* Bottom Caption Inside Portrait */}
                <div className="absolute inset-x-4 bottom-4 z-20 flex items-end justify-between gap-2">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      Red Team &amp; Offensive Security
                    </p>
                    <p className="font-display text-lg font-bold text-ink">{profile.name}</p>
                  </div>
                  <span className="rounded-lg border border-chrome/25 bg-bg/85 px-2.5 py-1 font-mono text-[10px] text-chrome backdrop-blur-md">
                    Erode · TN
                  </span>
                </div>
              </div>

              {/* Psychological Color Grade Switcher Bar */}
              <div className="mt-2.5 flex items-center justify-between gap-2 rounded-xl border border-line bg-bg px-3 py-2">
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-faint">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <span>Photo Grade</span>
                </span>
                <div className="flex items-center gap-1">
                  {portraitModes.map((m) => {
                    const active = m.id === modeId
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setModeId(m.id)}
                        className={`rounded-lg px-2.5 py-1 font-mono text-[10px] font-medium transition ${
                          active
                            ? 'bg-accent text-white shadow-sm shadow-accent/30'
                            : 'text-chrome hover:bg-surface hover:text-ink'
                        }`}
                      >
                        {m.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 4-Column Stat Strip with Smooth Stagger & Specular Bezel */}
        <motion.dl
          {...fadeUp(0.55)}
          className="chrome-bezel mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-chrome/25 bg-line sm:mt-16 md:grid-cols-4"
        >
          {stats.map((s, idx) => {
            const Icon = statIcons[idx % statIcons.length]
            return (
              <div
                key={s.label}
                className="group bg-surface p-5 transition duration-300 hover:bg-elevated sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <dt className="text-xs font-medium uppercase tracking-wider text-faint">
                    {s.label}
                  </dt>
                  <Icon className="h-4 w-4 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <dd className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                  {s.value}
                </dd>
                <p className="mt-1 font-mono text-[11px] text-chrome">{s.sub}</p>
              </div>
            )
          })}
        </motion.dl>
      </div>
    </section>
  )
}
