import { useState, type FormEvent } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  ArrowUpRight,
  MessageSquare,
  KeyRound,
  ShieldCheck,
} from 'lucide-react'
import { profile } from '../data/profile'
import { SocialIcon } from './BrandIcons'
import { Reveal, Section } from './Section'

const PGP_FINGERPRINT = '4F9A 8C2E 71B0 D415 1408  08CD CBCA 9597 3564 85GK'

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [copiedPgp, setCopiedPgp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('Red Team / Offensive Security Role')
  const [message, setMessage] = useState('')
  const [sentMode, setSentMode] = useState<string | null>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const copyPgp = async () => {
    await navigator.clipboard?.writeText(PGP_FINGERPRINT)
    setCopiedPgp(true)
    setTimeout(() => setCopiedPgp(false), 1800)
  }

  const buildPayload = () => {
    const senderName = name.trim() || 'Hiring Team'
    const senderEmail = email.trim() || 'Not provided'
    const msgBody =
      message.trim() || 'Hi Giridharan, I reviewed your security portfolio and would like to connect.'
    const subject = `[Portfolio] ${topic} — from ${senderName}`
    const body = `Name: ${senderName}\nEmail: ${senderEmail}\nTopic: ${topic}\n\n${msgBody}`
    return { subject, body }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const { subject, body } = buildPayload()
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSentMode('Email Client')
    setTimeout(() => setSentMode(null), 4000)
  }

  const openGmailCompose = () => {
    const { subject, body } = buildPayload()
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(gmailUrl, '_blank', 'noopener,noreferrer')
    setSentMode('Gmail Web')
    setTimeout(() => setSentMode(null), 4000)
  }

  const openWhatsAppDirect = () => {
    const { subject, body } = buildPayload()
    const waText = `${subject}\n\n${body}`
    const waUrl = `https://wa.me/919597356485?text=${encodeURIComponent(waText)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    setSentMode('WhatsApp Direct')
    setTimeout(() => setSentMode(null), 4000)
  }

  return (
    <Section id="contact" index="08" label="Contact" title="Let's talk security.">
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Column: Direct Channels, PGP & Social Cards */}
        <Reveal className="space-y-6 lg:col-span-5">
          <p className="text-base leading-relaxed text-chrome/90">
            Hiring for a Red Team, Penetration Testing, SOC Threat Hunting, or Security Engineering role — or want to collaborate on offensive/defensive tooling? Reach out via any channel below.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent/90"
            >
              <Mail className="h-4 w-4" />
              Email Me
            </a>
            <button
              onClick={openWhatsAppDirect}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-chrome/30 bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:border-accent"
            >
              <MessageSquare className="h-4 w-4 text-accent" />
              WhatsApp Ping
            </button>
            <button
              onClick={copy}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-chrome transition hover:border-accent/60 hover:text-ink"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4 text-chrome" />}
              {copied ? 'Copied' : 'Copy Email'}
            </button>
          </div>

          <div className="space-y-2.5 pt-1">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between rounded-xl border border-line bg-surface p-4 transition hover:border-accent/50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-bg text-accent">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-faint">Email</p>
                  <p className="text-sm font-medium text-ink">{profile.email}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-faint transition group-hover:text-accent" />
            </a>

            <a
              href="https://wa.me/919597356485"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-line bg-surface p-4 transition hover:border-accent/50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-bg text-accent">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-faint">Phone &amp; WhatsApp Direct</p>
                  <p className="text-sm font-medium text-ink">{profile.phone}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-faint transition group-hover:text-accent" />
            </a>

            <a
              href={profile.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-line bg-surface p-4 transition hover:border-accent/50"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-bg text-accent">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs text-faint">Location</p>
                  <p className="text-sm font-medium text-ink">{profile.location}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-faint transition group-hover:text-accent" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3 transition hover:border-accent/50"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <SocialIcon label={s.label} className="h-4 w-4 shrink-0 text-accent" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-ink">{s.label}</p>
                    <p className="truncate font-mono text-[11px] text-faint">@{s.handle}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint transition group-hover:text-accent" />
              </a>
            ))}
          </div>

          {/* PGP Fingerprint & RFC 9116 security.txt Card */}
          <div className="rounded-xl border border-line bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                <KeyRound className="h-3.5 w-3.5" />
                <span>PGP &amp; Disclosure Policy</span>
              </span>
              <a
                href="/security.txt"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] text-chrome hover:text-accent"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                security.txt ↗
              </a>
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg border border-line bg-bg px-3 py-2">
              <code className="truncate font-mono text-[11px] text-chrome">{PGP_FINGERPRINT}</code>
              <button
                type="button"
                onClick={copyPgp}
                className="shrink-0 font-mono text-[10px] text-accent hover:underline"
              >
                {copiedPgp ? 'Copied' : 'Copy Key'}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Multi-Channel Interactive Contact Form */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-surface p-7 md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-xl font-bold text-ink">Send a Direct Message</h3>
                <p className="mt-1 text-xs text-chrome/80">
                  Choose your preferred dispatch channel: Desktop Mail Client, 1-Click Gmail Web, or WhatsApp Direct.
                </p>
              </div>
              <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 font-mono text-[10px] text-accent">
                RESPONSE &lt; 24H
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs uppercase tracking-wider text-faint"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-xs uppercase tracking-wider text-faint"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-topic"
                className="block font-mono text-xs uppercase tracking-wider text-faint"
              >
                Subject / Engagement Type
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              >
                <option value="Red Team / Offensive Security Role">
                  Red Team / Offensive Security Role
                </option>
                <option value="Penetration Testing / VAPT Engagement">
                  Penetration Testing / VAPT Engagement
                </option>
                <option value="SOC Analyst / Threat Hunting Role">
                  SOC Analyst / Threat Hunting Role
                </option>
                <option value="Full-Stack & AI (MCP) Security Engineering">
                  Full-Stack &amp; AI (MCP) Security Engineering
                </option>
                <option value="General Security Collaboration">
                  General Security Collaboration
                </option>
              </select>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-msg"
                className="block font-mono text-xs uppercase tracking-wider text-faint"
              >
                Message
              </label>
              <textarea
                id="contact-msg"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about the security role, VAPT scope, or engineering project..."
                className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition hover:bg-accent/90"
              >
                <Send className="h-4 w-4" />
                Send via Email App
              </button>

              <button
                type="button"
                onClick={openGmailCompose}
                className="inline-flex items-center gap-2 rounded-full border border-chrome/30 bg-bg px-5 py-3 text-xs font-semibold text-chrome transition hover:border-accent hover:text-ink"
              >
                <Mail className="h-3.5 w-3.5 text-accent" />
                Open in Gmail Web ↗
              </button>

              <button
                type="button"
                onClick={openWhatsAppDirect}
                className="inline-flex items-center gap-2 rounded-full border border-chrome/30 bg-bg px-5 py-3 text-xs font-semibold text-chrome transition hover:border-accent hover:text-ink"
              >
                <MessageSquare className="h-3.5 w-3.5 text-accent" />
                Send via WhatsApp ↗
              </button>
            </div>

            {sentMode && (
              <p className="mt-4 font-mono text-xs text-accent">
                ✓ Dispatched via {sentMode} to {profile.email}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
