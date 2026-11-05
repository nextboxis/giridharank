import { useEffect, useState } from 'react'

export type GithubRepoItem = {
  name: string
  description: string
  language: string
  url: string
  updatedAt: string
}

export type GithubLanguageStat = {
  language: string
  count: number
  percent: number
}

export type GithubTelemetry = {
  username: string
  publicRepos: number
  followers: number
  topLanguages: GithubLanguageStat[]
  recentRepos: GithubRepoItem[]
}

const FALLBACK_TELEMETRY: GithubTelemetry = {
  username: 'nextboxis',
  publicRepos: 32,
  followers: 10,
  topLanguages: [
    { language: 'Python', count: 14, percent: 44 },
    { language: 'Rust', count: 5, percent: 16 },
    { language: 'TypeScript', count: 7, percent: 22 },
    { language: 'HTML / Shell', count: 6, percent: 18 },
  ],
  recentRepos: [
    {
      name: 'NexShield',
      description: 'Enterprise Data Loss Prevention (DLP) & Behavioral Security Platform',
      language: 'Python',
      url: 'https://github.com/nextboxis/NexShield',
      updatedAt: 'Active',
    },
    {
      name: 'zeno-mcp',
      description: 'Unified 100-Tool AI Agent & Security Orchestration Server',
      language: 'Rust',
      url: 'https://github.com/nextboxis/zeno-mcp',
      updatedAt: 'Active',
    },
    {
      name: 'library-skill-agents',
      description: 'Autonomous Multi-Agent Security & Engineering Skill Suite',
      language: 'Rust',
      url: 'https://github.com/nextboxis/library-skill-agents',
      updatedAt: 'Active',
    },
    {
      name: 'DNS-Sinkhole',
      description: 'Malicious Domain Sinkholing & Threat-Intel Blocker',
      language: 'Python',
      url: 'https://github.com/nextboxis/DNS-Sinkhole',
      updatedAt: 'Active',
    },
  ],
}

export function useGithubStats(username = 'nextboxis') {
  const [stats, setStats] = useState<GithubTelemetry>(FALLBACK_TELEMETRY)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchTelemetry() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
        ])

        if (!userRes.ok || !reposRes.ok) return

        const userData = await userRes.json()
        const reposData = await reposRes.json()

        if (cancelled || !Array.isArray(reposData)) return

        const langCounts: Record<string, number> = {}
        for (const repo of reposData) {
          if (repo?.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
          }
        }

        const totalWithLang = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1
        const topLanguages: GithubLanguageStat[] = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([language, count]) => ({
            language,
            count,
            percent: Math.max(8, Math.round((count / totalWithLang) * 100)),
          }))

        const recentRepos: GithubRepoItem[] = reposData
          .filter((r: any) => !r.fork)
          .slice(0, 4)
          .map((r: any) => ({
            name: r.name,
            description:
              r.description || 'Offensive security tool & engineering repository by Giridharan K.',
            language: r.language || 'Security',
            url: r.html_url,
            updatedAt: r.updated_at
              ? new Date(r.updated_at).toLocaleDateString('en-US', {
                  month: 'short',
                  year: 'numeric',
                })
              : 'Recent',
          }))

        setStats({
          username,
          publicRepos:
            typeof userData.public_repos === 'number'
              ? userData.public_repos
              : FALLBACK_TELEMETRY.publicRepos,
          followers:
            typeof userData.followers === 'number'
              ? userData.followers
              : FALLBACK_TELEMETRY.followers,
          topLanguages: topLanguages.length > 0 ? topLanguages : FALLBACK_TELEMETRY.topLanguages,
          recentRepos: recentRepos.length > 0 ? recentRepos : FALLBACK_TELEMETRY.recentRepos,
        })
        setIsLive(true)
      } catch {
        // Fallback telemetry remains active if offline or rate-limited
      }
    }

    fetchTelemetry()
    return () => {
      cancelled = true
    }
  }, [username])

  return { stats, isLive }
}
