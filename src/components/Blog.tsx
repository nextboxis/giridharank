import { ArrowUpRight, BookOpen, Calendar, Clock } from 'lucide-react'
import { blogPosts, profile } from '../data/profile'
import { MediumIcon } from './BrandIcons'
import { Reveal, Section } from './Section'

export function Blog() {
  return (
    <Section
      id="blog"
      index="07"
      label="Writing & Security Blog"
      title="Technical writeups on Medium."
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-sm leading-relaxed text-chrome/85">
          Field notes on API security, OWASP exploitation, malware behavior, and the security tools I build along the way.
        </p>

        <a
          href={profile.mediumUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-chrome/30 bg-surface px-4 py-2 text-xs font-semibold text-ink transition hover:border-accent"
        >
          <MediumIcon className="h-4 w-4 text-accent" />
          <span>Follow @giridharank790 on Medium</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-accent" />
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {blogPosts.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.08} className="min-w-0">
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full min-w-0 flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-accent/60 sm:p-7 md:p-8"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-faint">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-3 py-0.5 font-mono text-[11px] text-accent">
                    <MediumIcon className="h-3 w-3" />
                    Medium Article
                  </span>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-chrome/80">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-ink transition group-hover:text-accent sm:mt-5 sm:text-2xl">
                  {post.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-chrome/85 sm:text-sm">{post.summary}</p>

                <div className="mt-4 overflow-hidden rounded-xl border border-chrome/20 bg-bg p-3 font-mono text-[10px] leading-relaxed text-chrome sm:mt-5 sm:p-3.5 sm:text-[11px]">
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words">{post.snippet}</pre>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-chrome/20 bg-bg px-2.5 py-0.5 font-mono text-[11px] text-chrome"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent">
                  <BookOpen className="h-3.5 w-3.5" />
                  Read on Medium
                  <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
