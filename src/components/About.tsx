import {
  Crosshair,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Trophy,
  ArrowUpRight,
  Layers,
  GitBranch,
  Activity,
} from 'lucide-react'
import { about, thmBadges, profile } from '../data/profile'
import { TryHackMeIcon, GithubIcon, TechBadgeIcon } from './BrandIcons'
import { useGithubStats } from '../hooks/useGithubStats'
import { Reveal, Section } from './Section'

const primaryStack = ['Python 3.12', 'Rust', 'React', 'TypeScript', 'Linux CLI', 'FastAPI', 'MCP']

export function About() {
  const { stats: gh, isLive } = useGithubStats(profile.githubUsername)

  return (
    <Section
      id="about"
      index="01"
      label="About & Live Operator Telemetry"
      title="Offense-first security, backed by real engineering."
    >
      {/* Obsidian Black / Chrome Silver / Laser Crimson Bento Grid */}
      <div className="grid gap-5 md:grid-cols-5">
        {/* Bento 1 (Span 3): Red Team Narrative + 4-Stage Offensive/Defensive Kill-Chain */}
        <Reveal className="flex min-w-0 flex-col justify-between rounded-2xl border border-line bg-surface p-5 sm:p-7 md:col-span-3 md:p-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              <Crosshair className="h-4 w-4" />
              <span>Methodology &amp; Mindset</span>
            </div>
            <div className="mt-5 space-y-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-chrome/90 sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
              Offensive &amp; Defensive Workflow
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {about.killChain.map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-line bg-bg p-3.5 transition hover:border-accent/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-accent">{item.step}</span>
                    <span className="font-display text-sm font-semibold text-ink">{item.phase}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-chrome/80">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Bento 2 (Span 2): Education Timeline + Core Stack */}
        <Reveal
          delay={0.08}
          className="flex min-w-0 flex-col justify-between rounded-2xl border border-line bg-surface p-5 sm:p-7 md:col-span-2 md:p-8"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <GraduationCap className="h-4 w-4" />
                <span>Academic Nodes</span>
              </span>
              <span className="rounded-full border border-chrome/30 bg-bg px-2.5 py-0.5 font-mono text-[10px] text-chrome">
                M.Sc. + B.Sc.
              </span>
            </div>

            <ol className="mt-6 space-y-6 border-l border-line pl-5">
              {about.education.map((e) => (
                <li key={e.degree} className="relative">
                  <span
                    className={`absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full ${
                      e.current ? 'bg-accent ring-4 ring-accent/25' : 'bg-chrome/40'
                    }`}
                  />
                  <p className="font-mono text-xs text-faint">
                    {e.period}
                    {e.current && <span className="ml-2 font-semibold text-accent">· Active</span>}
                  </p>
                  <p className="mt-1 font-display font-semibold text-ink">{e.degree}</p>
                  <p className="mt-0.5 text-xs text-chrome/80">{e.school}</p>
                </li>
              ))}
            </ol>

            <div className="mt-7 border-t border-line pt-6">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint">
                <Layers className="h-3.5 w-3.5 text-accent" />
                <span>Primary Stack</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {primaryStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-chrome/25 bg-bg px-2.5 py-1 text-xs font-medium text-chrome"
                  >
                    <TechBadgeIcon name={tech} className="h-3.5 w-3.5 text-accent" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-bg px-3.5 py-3 text-xs sm:px-4">
              <span className="inline-flex min-w-0 items-center gap-1.5 truncate text-chrome">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="truncate">{profile.location}</span>
              </span>
              <a
                href={profile.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 font-mono text-[11px] text-accent hover:underline"
              >
                Map ↗
              </a>
            </div>

            <div className="flex items-center justify-between gap-2 rounded-xl border border-accent/35 bg-accent/10 px-3.5 py-3 sm:px-4">
              <div className="flex items-center gap-2 text-xs font-medium text-ink">
                <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                <span>Credentials Vault</span>
              </div>
              <a
                href="#certifications"
                className="shrink-0 font-mono text-xs font-semibold text-chrome hover:text-accent"
              >
                25 Certs →
              </a>
            </div>
          </div>
        </Reveal>

        {/* Bento 3 (Span 3): TryHackMe Verified Live Badge + 7 Badges */}
        <Reveal
          delay={0.12}
          className="flex min-w-0 flex-col justify-between rounded-2xl border border-line bg-surface p-5 sm:p-7 md:col-span-3 md:p-8"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                  <TryHackMeIcon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                      TryHackMe Verified Operator
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      LIVE BADGE
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-chrome/80">
                    Top 260K+ Globally · 40+ Labs Solved · Bronze League (Top 20%)
                  </p>
                </div>
              </div>

              <a
                href={profile.socials[2].url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-chrome/30 bg-bg px-3.5 py-1.5 text-xs font-medium text-chrome transition hover:border-accent hover:text-ink"
              >
                Verify on TryHackMe
                <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
              </a>
            </div>

            {/* Official Live Dynamic TryHackMe S3 Badge */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-bg p-3.5 sm:p-4">
              <a
                href={profile.socials[2].url}
                target="_blank"
                rel="noreferrer"
                className="block max-w-full overflow-hidden rounded-lg transition hover:opacity-95"
                title="Giridharan K Official TryHackMe Live Badge"
              >
                <img
                  src={profile.tryHackMeBadgeUrl}
                  alt="Giridharan K TryHackMe Official Live Badge"
                  loading="lazy"
                  className="h-auto max-w-full sm:max-h-20"
                />
              </a>
              <div className="font-mono text-xs text-chrome/80">
                <p className="font-semibold text-ink">@{profile.socials[2].handle}</p>
                <p className="text-[11px] text-faint">Synced from tryhackme-badges.s3</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {thmBadges.map((b) => (
              <div
                key={b.name}
                className="flex min-w-0 items-start gap-2.5 rounded-xl border border-line bg-bg p-3 transition hover:border-chrome/40"
              >
                <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-ink">{b.name}</p>
                  <p className="truncate text-[11px] text-faint">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Bento 4 (Span 2): Live GitHub API Telemetry Card (github.com/nextboxis) */}
        <Reveal
          delay={0.16}
          className="flex min-w-0 flex-col justify-between rounded-2xl border border-line bg-surface p-5 sm:p-7 md:col-span-2 md:p-8"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <GithubIcon className="h-4 w-4" />
                <span>GitHub Telemetry</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-chrome/25 bg-bg px-2.5 py-0.5 font-mono text-[10px] text-chrome">
                <Activity className="h-3 w-3 text-accent" />
                {isLive ? 'API Live' : 'Verified'} · {gh.publicRepos} Repos
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="truncate font-display text-base font-semibold text-ink sm:text-lg">
                github.com/{gh.username}
              </h3>
              <a
                href={`https://github.com/${gh.username}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-accent hover:underline"
              >
                Explore <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Language Distribution Bar */}
            <div className="mt-4">
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-bg border border-line">
                {gh.topLanguages.map((lang, idx) => (
                  <div
                    key={lang.language}
                    style={{ width: `${lang.percent}%` }}
                    className={
                      idx === 0
                        ? 'bg-accent'
                        : idx === 1
                          ? 'bg-chrome'
                          : idx === 2
                            ? 'bg-chrome/60'
                            : 'bg-chrome/30'
                    }
                    title={`${lang.language}: ${lang.percent}%`}
                  />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-chrome/85">
                {gh.topLanguages.map((lang, idx) => (
                  <span key={lang.language} className="inline-flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        idx === 0
                          ? 'bg-accent'
                          : idx === 1
                            ? 'bg-chrome'
                            : idx === 2
                              ? 'bg-chrome/60'
                              : 'bg-chrome/30'
                      }`}
                    />
                    {lang.language} ({lang.percent}%)
                  </span>
                ))}
              </div>
            </div>

            {/* Recent Repositories Feed */}
            <div className="mt-5 space-y-2">
              {gh.recentRepos.slice(0, 3).map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-line bg-bg px-3.5 py-2.5 transition hover:border-accent/50"
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-3.5 w-3.5 shrink-0 text-accent" />
                      <p className="truncate font-mono text-xs font-semibold text-ink group-hover:text-accent">
                        {repo.name}
                      </p>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-chrome/75">{repo.description}</p>
                  </div>
                  <span className="shrink-0 rounded border border-chrome/25 bg-surface px-2 py-0.5 font-mono text-[10px] text-chrome">
                    {repo.language}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <a
            href="#walkthroughs"
            className="mt-5 flex items-center justify-between rounded-xl border border-line bg-bg px-4 py-2.5 text-xs text-chrome transition hover:border-accent hover:text-ink"
          >
            <span>View CTF &amp; Lab Attack Walkthroughs</span>
            <span className="font-mono text-accent">04 ↓</span>
          </a>
        </Reveal>
      </div>
    </Section>
  )
}
